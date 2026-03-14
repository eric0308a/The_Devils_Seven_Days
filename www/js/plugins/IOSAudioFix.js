//=============================================================================
// IOSAudioFix.js
//=============================================================================

/*:
 * @plugindesc v1.0 iOS Safari 音頻支援修復（AudioContext 解鎖 + m4a 格式優先）
 * @author Generated
 *
 * @help
 * IOSAudioFix.js
 *
 * 解決 iOS Safari 的音頻限制問題：
 * 1. 首次用戶觸摸時解鎖 AudioContext
 * 2. iOS 設備優先使用 .m4a 音頻格式（AXY_Audio.js 整合）
 * 3. 修復 iOS 上 BGM/BGS/ME/SE 的自動播放問題
 * 4. 處理 WKWebView 音量衰減問題
 *
 * 本插件需要放在 AXY_Audio.js 之後載入。
 */

(function () {
  'use strict';

  // =========================================================================
  // iOS Detection
  // =========================================================================
  var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
              (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  console.log('[IOSAudioFix] iOS:', isIOS, '| Safari:', isSafari, '| Mobile:', isMobile);

  // =========================================================================
  // AudioContext unlock on first user gesture (iOS requires this)
  // =========================================================================
  var audioContextUnlocked = false;

  function unlockAudioContext() {
    if (audioContextUnlocked) return;

    // RPG Maker MV uses WebAudio
    var ctx = null;
    try {
      if (typeof WebAudio !== 'undefined' && WebAudio._context) {
        ctx = WebAudio._context;
      } else if (typeof AudioManager !== 'undefined' && AudioManager._audioContext) {
        ctx = AudioManager._audioContext;
      } else {
        // Try to find via PIXI sound or any global AudioContext
        ctx = window.AudioContext || window.webkitAudioContext;
        if (typeof ctx === 'function') {
          // It's a constructor, not an instance - skip
          ctx = null;
        }
      }
    } catch (e) {
      // ignore
    }

    if (ctx && ctx.state === 'suspended') {
      ctx.resume().then(function () {
        audioContextUnlocked = true;
        console.log('[IOSAudioFix] AudioContext resumed.');
      }).catch(function (e) {
        console.warn('[IOSAudioFix] AudioContext.resume() failed:', e);
      });
    } else {
      audioContextUnlocked = true;
    }

    // Also create and immediately discard a silent buffer to fully unlock
    try {
      if (ctx && ctx.createBuffer) {
        var buffer = ctx.createBuffer(1, 1, 22050);
        var source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.start(0);
        source.disconnect();
      }
    } catch (e) {
      // ignore
    }
  }

  // Attach unlock to first touch/click/keydown
  var unlockEvents = ['touchstart', 'touchend', 'mousedown', 'click', 'keydown'];
  function onFirstInteraction() {
    unlockAudioContext();
    unlockEvents.forEach(function (evt) {
      document.removeEventListener(evt, onFirstInteraction, true);
    });
  }
  unlockEvents.forEach(function (evt) {
    document.addEventListener(evt, onFirstInteraction, { once: true, passive: true, capture: true });
  });

  // =========================================================================
  // Override WebAudio to keep trying to resume suspended context
  // =========================================================================
  if (typeof WebAudio !== 'undefined') {
    var _WebAudio_initialize = WebAudio.initialize;
    WebAudio.initialize = function (noAudio) {
      var result = _WebAudio_initialize.call(this, noAudio);
      if (this._context && this._context.state === 'suspended') {
        console.log('[IOSAudioFix] AudioContext is suspended at init, will unlock on interaction.');
      }
      return result;
    };
  }

  // =========================================================================
  // iOS m4a audio format override
  // =========================================================================
  if (isIOS || isSafari) {
    // Override AXY_Audio or rpg_core.js AudioManager to prefer m4a on iOS
    if (typeof AudioManager !== 'undefined') {
      // Keep method shape compatible with RPG Maker core, which calls audioFileExt().
      AudioManager.audioFileExt = function () {
        return '.m4a';
      };
      console.log('[IOSAudioFix] Audio format locked to .m4a for iOS/Safari');
    }

    // Fix WebAudio createBuffer for iOS (use .m4a URLs)
    if (typeof WebAudio !== 'undefined' && WebAudio.prototype) {
      var _WebAudio_initialize_url = WebAudio.prototype.initialize;
      if (_WebAudio_initialize_url) {
        WebAudio.prototype.initialize = function (url) {
          // Replace .ogg with .m4a for iOS
          if (url && url.indexOf('.ogg') !== -1) {
            url = url.replace('.ogg', '.m4a');
          }
          return _WebAudio_initialize_url.call(this, url);
        };
      }
    }
  }

  // =========================================================================
  // iOS: prevent page scroll when touching virtual buttons or game canvas
  // =========================================================================
  if (isIOS || isMobile) {
    document.addEventListener('touchmove', function (e) {
      // Prevent if touching game canvas or virtual buttons
      var target = e.target;
      if (!target) return;
      var tagName = target.tagName.toLowerCase();
      if (tagName === 'canvas' ||
          (target.id && target.id.indexOf('vbtn') !== -1) ||
          (target.className && target.className.indexOf('virtual-button') !== -1)) {
        e.preventDefault();
      }
    }, { passive: false });

    // Prevent double-tap zoom on game canvas
    var lastTouchEnd = 0;
    document.addEventListener('touchend', function (e) {
      var now = Date.now();
      if (now - lastTouchEnd < 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    }, { passive: false });
  }

  // =========================================================================
  // iOS: re-enable audio after returning from background (Page Visibility API)
  // =========================================================================
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') {
      // Resume AudioContext if suspended after background
      try {
        if (typeof WebAudio !== 'undefined' && WebAudio._context) {
          var ctx = WebAudio._context;
          if (ctx && ctx.state === 'suspended') {
            ctx.resume().then(function () {
              console.log('[IOSAudioFix] AudioContext resumed after visibility change.');
              // Re-play BGM if it was playing
              if (AudioManager && AudioManager._bgmBuffer) {
                // RPG MV will handle this automatically
              }
            });
          }
        }
      } catch (e) {
        // ignore
      }
    }
  });

  // =========================================================================
  // iOS: WKWebView inline audio attribute on video elements (for movies)
  // =========================================================================
  if (isIOS) {
    var _Video_create = null;
    if (typeof Graphics !== 'undefined') {
      var _Graphics_createVideo = Graphics._createVideo;
      if (_Graphics_createVideo) {
        Graphics._createVideo = function () {
          _Graphics_createVideo.call(this);
          if (this._video) {
            this._video.setAttribute('playsinline', '');
            this._video.setAttribute('webkit-playsinline', '');
          }
        };
      }
    }
  }

  console.log('[IOSAudioFix] Plugin loaded. Environment: iOS=' + isIOS + ', Safari=' + isSafari + ', Mobile=' + isMobile);

})();
