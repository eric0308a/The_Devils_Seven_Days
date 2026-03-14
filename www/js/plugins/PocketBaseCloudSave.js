//=============================================================================
// PocketBaseCloudSave.js
//=============================================================================

/*:
 * @plugindesc v1.0 PocketBase 雲端存檔系統（同步碼認證 + 自動同步）
 * @author Generated
 *
 * @param PocketBase URL
 * @type string
 * @default https://pocketbase.flanderic.dpdns.org/
 * @desc PocketBase 伺服器網址（不含尾斜線）
 *
 * @param Collection Name
 * @type string
 * @default The_Devils_Seven_Days
 * @desc PocketBase 存檔 Collection 名稱
 *
 * @param Auto Sync
 * @type boolean
 * @default true
 * @desc 是否在儲存後自動上傳到雲端
 *
 * @param Sync Menu Text
 * @type string
 * @default 雲端同步碼
 * @desc 選項選單中顯示的同步碼文字
 *
 * @help
 * PocketBaseCloudSave.js
 *
 * 使用說明：
 * 1. 在 PocketBase 建立 Collection：The_Devils_Seven_Days
 *    欄位：
 *      - user     (relation → users)
 *      - slot_id  (number)
 *      - save_data (text)
 *      - save_info (json, optional)
 *      - snap_image (file, optional)
 *    規則：
 *      List/View/Update: @request.auth.id = user.id
 *      Create: @request.auth.id != "" && @request.data.user = @request.auth.id
 *
 * 2. 首次執行時，玩家輸入或建立同步碼（6位英數字）
 * 3. 存檔後自動同步到雲端
 * 4. 啟動時自動對比雲端與本地存檔，以較新者為準
 */

(function () {
  'use strict';

  if (window.__PocketBaseCloudSaveLoaded) {
    console.warn('[CloudSave] PocketBaseCloudSave already loaded. Skip duplicate initialization.');
    return;
  }
  window.__PocketBaseCloudSaveLoaded = true;

  var params = PluginManager.parameters('PocketBaseCloudSave');
  var PB_URL = String(params['PocketBase URL'] || 'https://pocketbase.flanderic.dpdns.org/').replace(/\/$/, '');
  var PB_COLLECTION = String(params['Collection Name'] || 'The_Devils_Seven_Days');
  var AUTO_SYNC = String(params['Auto Sync'] || 'true') === 'true';
  var SYNC_MENU_TEXT = String(params['Sync Menu Text'] || '雲端同步碼');

  // =========================================================================
  // Internal State
  // =========================================================================
  var _syncCode = null;
  var _authToken = null;
  var _userId = null;
  var _isDownloading = false;
  var _uploadTimers = {}; // per-slot debounce timers
  var _initialized = false;
  var _authFlowPromise = null;
  var _authPromptOpen = false;
  var _authInitializing = false;
  var _bootInitScheduled = false;
  var _resolvedCollectionRoute = null;

  // =========================================================================
  // Storage helpers (localStorage for auth persistence)
  // =========================================================================
  function loadAuthState() {
    try {
      _syncCode = localStorage.getItem('pb_sync_code') || null;
      _authToken = localStorage.getItem('pb_auth_token') || null;
      _userId = localStorage.getItem('pb_user_id') || null;
    } catch (e) {
      console.error('[CloudSave] Failed to read auth state:', e);
    }
  }

  function saveAuthState() {
    try {
      if (_syncCode) localStorage.setItem('pb_sync_code', _syncCode);
      if (_authToken) localStorage.setItem('pb_auth_token', _authToken);
      if (_userId) localStorage.setItem('pb_user_id', _userId);
    } catch (e) {
      console.error('[CloudSave] Failed to save auth state:', e);
    }
  }

  function clearAuthState() {
    localStorage.removeItem('pb_sync_code');
    localStorage.removeItem('pb_auth_token');
    localStorage.removeItem('pb_user_id');
    _syncCode = null;
    _authToken = null;
    _userId = null;
  }

  // =========================================================================
  // PocketBase API helpers
  // =========================================================================
  function pbFetch(path, options) {
    options = options || {};
    options.headers = options.headers || {};
    if (_authToken) {
      options.headers['Authorization'] = _authToken;
    }
    if (options.json) {
      options.headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(options.json);
      delete options.json;
    }
    return fetch(PB_URL + '/api/' + path, options);
  }

  function encodeCollectionSegment(name) {
    return encodeURIComponent(String(name || '')).replace(/'/g, '%27');
  }

  function getCollectionRouteCandidates() {
    var seen = {};
    var candidates = [];

    function push(value) {
      if (!value || seen[value]) return;
      seen[value] = true;
      candidates.push(value);
    }

    if (_resolvedCollectionRoute) {
      push(_resolvedCollectionRoute);
    }

    push(PB_COLLECTION);
    push(PB_COLLECTION.replace(/'/g, ''));
    push(PB_COLLECTION.replace(/'/g, '_'));
    push(PB_COLLECTION.replace(/[^A-Za-z0-9_]/g, '_'));

    return candidates;
  }

  async function pbFetchCollection(recordPath, options) {
    var candidates = getCollectionRouteCandidates();
    var lastResponse = null;

    for (var i = 0; i < candidates.length; i++) {
      var candidate = candidates[i];
      var response = await pbFetch('collections/' + encodeCollectionSegment(candidate) + recordPath, options);
      if (response.status !== 404) {
        _resolvedCollectionRoute = candidate;
        return response;
      }
      lastResponse = response;
    }

    return lastResponse;
  }

  // Create user account with syncCode as username and password
  async function createAccount(syncCode) {
    var password = syncCode + '_devil7days';
    var res = await pbFetch('collections/users/records', {
      method: 'POST',
      json: {
        username: syncCode,
        password: password,
        passwordConfirm: password,
        name: syncCode
      }
    });
    if (!res.ok) {
      var body = await res.json().catch(() => ({}));
      // User may already exist
      if (body.code === 400 && body.data && body.data.username) {
        return null; // username taken
      }
      throw new Error('Create account failed: ' + JSON.stringify(body));
    }
    return await res.json();
  }

  // Authenticate with syncCode
  async function authenticate(syncCode) {
    var password = syncCode + '_devil7days';
    var res = await pbFetch('collections/users/auth-with-password', {
      method: 'POST',
      json: { identity: syncCode, password: password }
    });
    if (!res.ok) {
      var body = await res.json().catch(() => ({}));
      throw new Error('Auth failed: ' + JSON.stringify(body));
    }
    var data = await res.json();
    _authToken = data.token;
    _userId = data.record.id;
    saveAuthState();
    return data;
  }

  // =========================================================================
  // Extended metadata helpers (for MOG_SceneFile snapUrl etc.)
  // =========================================================================
  function isDataUrl(value) {
    return typeof value === 'string' && value.indexOf('data:image/') === 0;
  }

  function tryParseJson(value) {
    if (!value) return null;
    if (typeof value === 'object') return value;
    try { return JSON.parse(value); } catch (e) { return null; }
  }

  function sanitizeSaveInfo(info) {
    if (!info) return null;
    var cleaned = Object.assign({}, info);
    if (cleaned.snapUrl) delete cleaned.snapUrl;
    return cleaned;
  }

  function stripSnapshotsFromGlobalInfo(jsonStr) {
    var parsed = tryParseJson(jsonStr);
    if (!parsed || !Array.isArray(parsed)) return jsonStr;
    var cleaned = parsed.map(function (entry) {
      if (!entry || typeof entry !== 'object') return entry;
      var copy = Object.assign({}, entry);
      if (copy.snapUrl) delete copy.snapUrl;
      return copy;
    });
    return JSON.stringify(cleaned);
  }

  function dataUrlToFile(dataUrl, filename) {
    if (!isDataUrl(dataUrl)) return null;
    try {
      var parts = dataUrl.split(',');
      if (parts.length < 2) return null;
      var mimeMatch = parts[0].match(/data:(image\/[^;]+);/);
      var mimeType = mimeMatch ? mimeMatch[1] : 'image/png';
      var binary = atob(parts[1]);
      var len = binary.length;
      var bytes = new Uint8Array(len);
      for (var i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
      var blob = new Blob([bytes], { type: mimeType });
      return new File([blob], filename, { type: mimeType });
    } catch (e) {
      console.error('[CloudSave] dataUrlToFile error:', e);
      return null;
    }
  }

  async function fetchImageAsDataUrl(url) {
    if (!url) return null;
    try {
      var res = await fetch(url);
      if (!res.ok) return null;
      var blob = await res.blob();
      return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.onloadend = function () { resolve(reader.result); };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (e) {
      console.error('[CloudSave] fetchImageAsDataUrl error:', e);
      return null;
    }
  }

  // =========================================================================
  // Cloud operations
  // =========================================================================
  function getLocalTimestamp() {
    var globalInfo = DataManager.loadGlobalInfo ? DataManager.loadGlobalInfo() : null;
    if (!globalInfo || !Array.isArray(globalInfo)) return 0;
    var maxTs = 0;
    for (var i = 0; i < globalInfo.length; i++) {
      var info = globalInfo[i];
      if (info && info.timestamp && info.timestamp > maxTs) {
        maxTs = info.timestamp;
      }
    }
    return maxTs;
  }

  async function getCloudLatestTimestamp() {
    if (!_userId || !_authToken) return 0;
    try {
      var encodedFilter = encodeURIComponent('user = "' + _userId + '"');
      var res = await pbFetchCollection('/records?filter=' + encodedFilter + '&sort=-updated&perPage=1', {
        method: 'GET'
      });
      if (!res.ok) return 0;
      var data = await res.json();
      if (data.items && data.items.length > 0) {
        var updatedStr = data.items[0].updated;
        return new Date(updatedStr).getTime();
      }
      return 0;
    } catch (e) {
      console.error('[CloudSave] getCloudLatestTimestamp error:', e);
      return 0;
    }
  }

  async function uploadSlot(slotId) {
    if (!_userId || !_authToken) return;
    var saveData = StorageManager.load(slotId);
    if (!saveData) return;

    // Strip snapUrls from slot 0 (global info) to avoid payload bloat
    var uploadData = slotId === 0 ? stripSnapshotsFromGlobalInfo(saveData) : saveData;

    // Gather metadata for slot 1+
    var saveInfo = null;
    var snapFile = null;
    if (slotId > 0) {
      var info = DataManager.loadSavefileInfo ? DataManager.loadSavefileInfo(slotId) : null;
      if (info) {
        saveInfo = sanitizeSaveInfo(info);
        if (isDataUrl(info.snapUrl)) {
          snapFile = dataUrlToFile(info.snapUrl, 'slot_' + slotId + '.png');
        }
      }
    }

    try {
      // Check if record already exists
      var encodedFilter = encodeURIComponent('user = "' + _userId + '" && slot_id = ' + slotId);
      var existRes = await pbFetchCollection('/records?filter=' + encodedFilter + '&perPage=1', {
        method: 'GET'
      });
      var existData = existRes.ok ? await existRes.json() : { items: [] };
      var existing = existData.items && existData.items.length > 0 ? existData.items[0] : null;

      var form = new FormData();
      form.append('user', _userId);
      form.append('slot_id', String(slotId));
      form.append('save_data', uploadData);
      if (saveInfo) form.append('save_info', JSON.stringify(saveInfo));
      if (snapFile) form.append('snap_image', snapFile);

      var method = existing ? 'PATCH' : 'POST';
      var saveRes = await pbFetchCollection('/records' + (existing ? '/' + existing.id : ''), {
        method: method,
        body: form
      });

      if (!saveRes.ok) {
        var errBody = await saveRes.json().catch(() => ({}));
        if (saveRes.status === 404) {
          console.error('[CloudSave] Collection route not found. Tried:', getCollectionRouteCandidates());
        }
        console.error('[CloudSave] Upload slot ' + slotId + ' failed:', errBody);
      } else {
        console.log('[CloudSave] Uploaded slot ' + slotId);
      }
    } catch (e) {
      console.error('[CloudSave] Upload slot ' + slotId + ' error:', e);
    }
  }

  async function downloadAllSlots() {
    if (!_userId || !_authToken) return;
    _isDownloading = true;
    try {
      var encodedFilter = encodeURIComponent('user = "' + _userId + '"');
      var res = await pbFetchCollection('/records?filter=' + encodedFilter + '&sort=slot_id&perPage=200', {
        method: 'GET'
      });
      if (!res.ok) {
        console.warn('[CloudSave] Download failed:', res.status);
        return;
      }
      var data = await res.json();
      var records = data.items || [];
      console.log('[CloudSave] Downloaded ' + records.length + ' records');

      // First pass: write save_data locally
      for (var i = 0; i < records.length; i++) {
        var record = records[i];
        if (record.slot_id !== undefined && record.save_data) {
          StorageManager.save(record.slot_id, record.save_data);
        }
      }

      // Second pass: restore snap images and metadata for slot 1+
      for (var j = 0; j < records.length; j++) {
        var rec = records[j];
        if (rec.slot_id > 0 && rec.save_info) {
          var slotInfo = tryParseJson(rec.save_info);
          if (slotInfo && rec.snap_image) {
            var collectionFileSegment = rec.collectionId || rec.collectionName || _resolvedCollectionRoute || PB_COLLECTION;
            var snapUrl = PB_URL + '/api/files/' + encodeCollectionSegment(collectionFileSegment) + '/' + rec.id + '/' + rec.snap_image;
            var dataUrl = await fetchImageAsDataUrl(snapUrl);
            if (dataUrl) slotInfo.snapUrl = dataUrl;
          }
          // Merge back into global info
          if (slotInfo) {
            var globalInfo = DataManager.loadGlobalInfo ? DataManager.loadGlobalInfo() : [];
            if (!Array.isArray(globalInfo)) globalInfo = [];
            while (globalInfo.length <= rec.slot_id) globalInfo.push(null);
            globalInfo[rec.slot_id] = Object.assign(globalInfo[rec.slot_id] || {}, slotInfo);
            if (DataManager.saveGlobalInfo) DataManager.saveGlobalInfo(globalInfo);
          }
        }
      }

      console.log('[CloudSave] Sync complete. Slot count:', records.filter(function (r) { return r.slot_id > 0; }).length);
    } catch (e) {
      console.error('[CloudSave] Download error:', e);
    } finally {
      _isDownloading = false;
    }
  }

  async function startupSync() {
    if (!_userId || !_authToken) return;
    try {
      var localTs = getLocalTimestamp();
      var cloudTs = await getCloudLatestTimestamp();
      console.log('[CloudSave] Local timestamp:', localTs, 'Cloud timestamp:', cloudTs);

      if (cloudTs > localTs) {
        console.log('[CloudSave] Cloud is newer, downloading...');
        await downloadAllSlots();
      } else if (localTs > 0) {
        console.log('[CloudSave] Local is newer (or equal), uploading...');
        var maxSlot = DataManager.maxSavefiles ? DataManager.maxSavefiles() : 20;
        for (var s = 0; s <= maxSlot; s++) {
          if (StorageManager.exists(s)) {
            await uploadSlot(s);
          }
        }
      } else {
        // No local saves, download from cloud
        await downloadAllSlots();
      }
    } catch (e) {
      console.error('[CloudSave] Startup sync error:', e);
    }
  }

  // =========================================================================
  // Debounced auto-upload after save
  // =========================================================================
  function scheduleUpload(slotId) {
    if (!AUTO_SYNC || !_authToken || _isDownloading) return;
    if (_uploadTimers[slotId]) clearTimeout(_uploadTimers[slotId]);
    _uploadTimers[slotId] = setTimeout(function () {
      delete _uploadTimers[slotId];
      uploadSlot(slotId).catch(function (e) {
        console.error('[CloudSave] Auto-upload error slot ' + slotId + ':', e);
      });
      // Always upload slot 0 (global info) after any save
      if (slotId !== 0 && StorageManager.exists(0)) {
        if (_uploadTimers[0]) clearTimeout(_uploadTimers[0]);
        _uploadTimers[0] = setTimeout(function () {
          delete _uploadTimers[0];
          uploadSlot(0).catch(function (e) {
            console.error('[CloudSave] Auto-upload error slot 0:', e);
          });
        }, 500);
      }
    }, 1000);
  }

  // =========================================================================
  // Hook StorageManager.save for auto-upload
  // =========================================================================
  var _original_sm_save = StorageManager.save;
  StorageManager.save = function (savefileId, json) {
    _original_sm_save.call(this, savefileId, json);
    scheduleUpload(savefileId);
  };

  // =========================================================================
  // Auth flow: prompt for sync code
  // =========================================================================
  async function initializeAuth() {
    if (_authInitializing) {
      return;
    }
    _authInitializing = true;
    loadAuthState();

    if (_syncCode && _authToken) {
      // Already have credentials, verify by re-auth
      try {
        await authenticate(_syncCode);
        console.log('[CloudSave] Re-authenticated sync code:', _syncCode);
        _initialized = true;
        await startupSync();
        _authInitializing = false;
        return;
      } catch (e) {
        console.warn('[CloudSave] Re-auth failed, clearing credentials:', e);
        clearAuthState();
      }
    }

    // No valid credentials – prompt user
    _authInitializing = false;
    promptForSyncCode();
  }

  function promptForSyncCode() {
    if (_authPromptOpen || _authFlowPromise) {
      return;
    }
    _authPromptOpen = true;
    var code = prompt(
      '【雲端同步】\n請輸入您的同步碼（6位英數字）\n若沒有同步碼，直接按確定將自動產生新碼\n若不使用雲端存檔，請按取消',
      ''
    );

    _authPromptOpen = false;

    if (code === null) {
      console.log('[CloudSave] User cancelled sync code prompt. Cloud save disabled.');
      return;
    }

    code = code.trim().replace(/[^a-zA-Z0-9]/g, '').substring(0, 12);

    if (!code) {
      // Generate random 6-char code
      code = Math.random().toString(36).substring(2, 8).toUpperCase();
      alert('您的新同步碼是：\n\n' + code + '\n\n請記住此碼，以便在其他設備上繼續遊戲！');
    }

    _syncCode = code;
    loginOrRegister(code);
  }

  async function loginOrRegister(code) {
    if (_authFlowPromise) {
      return _authFlowPromise;
    }

    _authFlowPromise = (async function() {
      try {
        // Try to log in first
        await authenticate(code);
        console.log('[CloudSave] Logged in with sync code:', code);
      } catch (e) {
        // Login failed → create new account
        try {
          await createAccount(code);
          await authenticate(code);
          console.log('[CloudSave] Created and logged in with sync code:', code);
        } catch (e2) {
          console.error('[CloudSave] Failed to create account:', e2);
          alert('無法連接到雲端伺服器，或 The_Devils_Seven_Days collection 路徑不存在。本次遊戲將使用本地存檔。');
          return;
        }
      }

      _initialized = true;
      await startupSync();
    })();

    try {
      await _authFlowPromise;
    } finally {
      _authFlowPromise = null;
    }
  }

  // =========================================================================
  // Options Menu Integration
  // =========================================================================
  var _Window_Options_makeCommandList = Window_Options.prototype.makeCommandList;
  Window_Options.prototype.makeCommandList = function () {
    _Window_Options_makeCommandList.call(this);
    this.addCommand(SYNC_MENU_TEXT, 'cloudSyncCode');
  };

  var _Window_Options_statusText = Window_Options.prototype.statusText;
  Window_Options.prototype.statusText = function (index) {
    var symbol = this.commandSymbol(index);
    if (symbol === 'cloudSyncCode') {
      return _syncCode || '未設定';
    }
    return _Window_Options_statusText.call(this, index);
  };

  var _Window_Options_processOk = Window_Options.prototype.processOk;
  Window_Options.prototype.processOk = function () {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    if (symbol === 'cloudSyncCode') {
      this.showSyncCodeDialog();
      return;
    }
    _Window_Options_processOk.call(this);
  };

  Window_Options.prototype.showSyncCodeDialog = function () {
    var current = _syncCode || '';
    var newCode = prompt(
      '目前同步碼：' + (current || '未設定') + '\n\n輸入新同步碼，或留空以保持現有設定：',
      current
    );
    if (newCode === null) return;
    newCode = newCode.trim().replace(/[^a-zA-Z0-9]/g, '').substring(0, 12);
    if (!newCode) return;
    if (newCode !== _syncCode) {
      clearAuthState();
      _syncCode = newCode;
      loginOrRegister(newCode);
    }
    this.redrawCurrentItem();
  };

  // =========================================================================
  // Plugin Command: ManualSync
  // =========================================================================
  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'CloudSave') {
      var action = args[0];
      if (action === 'Upload') {
        var maxSlot = DataManager.maxSavefiles ? DataManager.maxSavefiles() : 20;
        for (var s = 0; s <= maxSlot; s++) {
          if (StorageManager.exists(s)) scheduleUpload(s);
        }
      } else if (action === 'Download') {
        downloadAllSlots();
      } else if (action === 'Prompt') {
        promptForSyncCode();
      }
    }
  };

  // =========================================================================
  // Game startup: initialize auth after scene load
  // =========================================================================
  var _Scene_Boot_start = Scene_Boot.prototype.start;
  Scene_Boot.prototype.start = function () {
    _Scene_Boot_start.call(this);
    if (_bootInitScheduled) {
      return;
    }
    _bootInitScheduled = true;
    // Delay auth init so game loads first, then we connect cloud
    setTimeout(function () {
      initializeAuth().catch(function (e) {
        console.error('[CloudSave] initializeAuth error:', e);
      });
    }, 1500);
  };

  console.log('[CloudSave] PocketBaseCloudSave plugin loaded. URL:', PB_URL);

})();
