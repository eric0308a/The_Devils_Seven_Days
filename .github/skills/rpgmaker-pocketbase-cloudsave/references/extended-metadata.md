# Extended Save Metadata Handling

This document provides detailed implementation patterns for handling extended save metadata (screenshots, location, level, etc.) in RPG Maker cloud save plugins.

## Detection

Check if the game extends `DataManager.makeSavefileInfo()`:

```javascript
// In rpg_managers.js or plugin files
DataManager.makeSavefileInfo = function() {
    var info = {};
    info.globalId   = this._globalId;
    info.title      = $dataSystem.gameTitle;
    info.characters = $gameParty.charactersForSavefile();
    info.faces      = $gameParty.facesForSavefile();
    info.playtime   = $gameSystem.playtimeText();
    info.timestamp  = Date.now();
    
    // Extended fields below indicate custom metadata
    info.location = $dataMap.displayName;  // map name
    info.level = $gameParty.members()[0].level;  // leader level
    info.gold = $gameParty.gold();  // party gold
    info.savetime = new Date().toLocaleDateString();  // formatted date
    info.snapUrl = bitmap.toDataURL();  // screenshot as data URL
    
    return info;
};
```

Common plugin patterns:
- `sai_Scenefile.js` - Adds snapUrl (screenshot), location, level, gold, savetime, map_id
- `CustomSaveTitle.js` - Adds custom title from game variable
- Check plugins list for "save", "file", "snapshot", "screenshot" keywords

## Implementation Pattern

### Helper Functions

```javascript
// Check if value is a data URL
function isDataUrl(value) {
    return typeof value === 'string' && value.startsWith('data:image/');
}

// Parse JSON safely
function tryParseJson(value) {
    if (!value) return null;
    if (typeof value === 'object') return value;
    try {
        return JSON.parse(value);
    } catch (e) {
        return null;
    }
}

// Remove snapUrl from info object to reduce payload
function sanitizeSaveInfo(info) {
    if (!info) return null;
    const cleaned = Object.assign({}, info);
    if (cleaned.snapUrl) {
        delete cleaned.snapUrl;
    }
    return cleaned;
}

// Strip all snapUrls from global info array
function stripSnapshotsFromGlobalInfo(json) {
    const parsed = tryParseJson(json);
    if (!parsed || !Array.isArray(parsed)) return json;
    const cleaned = parsed.map((entry) => {
        if (!entry || typeof entry !== 'object') return entry;
        const copy = Object.assign({}, entry);
        if (copy.snapUrl) {
            delete copy.snapUrl;
        }
        return copy;
    });
    return JSON.stringify(cleaned);
}

// Convert data URL to File object for FormData upload
function dataUrlToFile(dataUrl, filename) {
    if (!isDataUrl(dataUrl)) return null;
    const parts = dataUrl.split(',');
    if (parts.length < 2) return null;
    const mimeMatch = parts[0].match(/data:(image\/[^;]+);/);
    const mimeType = mimeMatch ? mimeMatch[1] : 'image/png';
    const binary = atob(parts[1]);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: mimeType });
    return new File([blob], filename, { type: mimeType });
}

// Fetch cloud image and convert to data URL (avoids CORS issues)
async function fetchImageAsDataUrl(url) {
    if (!url) return null;
    try {
        const response = await fetch(url);
        if (!response.ok) return null;
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch (e) {
        console.error('[CloudSave] Error fetching image:', e);
        return null;
    }
}
```

### Upload Pattern

```javascript
async function uploadSaveSlot(userId, slotId) {
    const saveData = StorageManager.load(slotId);
    if (!saveData) return;
    
    // For slot 0 (global info), strip snapUrls to reduce size
    const uploadData = slotId === 0 
        ? stripSnapshotsFromGlobalInfo(saveData)
        : saveData;
    
    // For slot 1+, upload metadata separately
    let saveInfo = null;
    let snapFile = null;
    if (slotId > 0) {
        const info = DataManager.loadSavefileInfo(slotId);
        if (info) {
            saveInfo = sanitizeSaveInfo(info);  // removes snapUrl
            if (isDataUrl(info.snapUrl)) {
                snapFile = dataUrlToFile(info.snapUrl, `slot_${slotId}.png`);
            }
        }
    }
    
    // Build FormData if uploading files
    if (snapFile || saveInfo) {
        const form = new FormData();
        form.append('user', userId);
        form.append('slot_id', String(slotId));
        form.append('save_data', uploadData);
        if (saveInfo) {
            form.append('save_info', JSON.stringify(saveInfo));
        }
        if (snapFile) {
            form.append('snap_image', snapFile);
        }
        await pb.collection('game_saves_pray').create(form);
    } else {
        // Simple JSON upload
        await pb.collection('game_saves_pray').create({
            user: userId,
            slot_id: slotId,
            save_data: uploadData
        });
    }
}
```

### Download Pattern

```javascript
async function downloadCloudSaves() {
    const records = await pb.collection('game_saves_pray')
        .getFullList(200, { 
            filter: `user = "${pb.authStore.model.id}"`,
            sort: 'slot_id'
        });
    
    // First pass: download and write save_data
    for (const record of records) {
        if (record.slot_id !== undefined && record.save_data) {
            StorageManager.save(record.slot_id, record.save_data);
        }
    }
    
    // Second pass: collect metadata for slot 1+
    const cloudInfoBySlot = {};
    for (const record of records) {
        if (record.slot_id > 0) {
            const info = tryParseJson(record.save_info);
            if (info) {
                cloudInfoBySlot[record.slot_id] = info;
            }
            
            // Get snap_image URL if exists
            if (record.snap_image) {
                const snapUrl = pb.files.getURL(record, record.snap_image);
                // Convert to data URL to avoid CORS
                const dataUrl = await fetchImageAsDataUrl(snapUrl);
                if (dataUrl && cloudInfoBySlot[record.slot_id]) {
                    cloudInfoBySlot[record.slot_id].snapUrl = dataUrl;
                }
            }
        }
    }
    
    // Merge metadata into global info
    if (Object.keys(cloudInfoBySlot).length > 0) {
        const globalInfo = DataManager.loadGlobalInfo() || [];
        for (const [slotId, info] of Object.entries(cloudInfoBySlot)) {
            globalInfo[slotId] = info;
        }
        DataManager.saveGlobalInfo(globalInfo);
    }
}
```

## Common Issues

### Issue: Save list shows no thumbnails after download
**Cause**: cloud image URLs are from different origin, causing CORS restrictions  
**Solution**: Use `fetchImageAsDataUrl()` to convert cloud URLs to data URLs before writing to global info

### Issue: Slot 0 upload fails with "too large" error
**Cause**: base64 snapUrl in global info exceeds text field limits  
**Solution**: Use `stripSnapshotsFromGlobalInfo()` before uploading slot 0; store images in snap_image file field

### Issue: Tainted canvas error in WebGL
**Cause**: RPG Maker tries to render images from external URLs without CORS headers  
**Solution**: Always convert cloud URLs to data URLs before merging into global info

### Issue: Save metadata (location, level, etc.) not showing after sync
**Cause**: save_info field missing in PocketBase or not merged into global info  
**Solution**: Verify PocketBase schema includes save_info (json) field; ensure download merges save_info into global info array

## Testing Checklist

1. Add console.log in makeSavefileInfo to confirm extended fields exist
2. Verify PocketBase collection has save_info (json) and snap_image (file) fields
3. Save game and check PocketBase record has populated save_info and snap_image
4. Clear local storage and re-download saves
5. Verify global info contains all metadata (location, level, gold, etc.) and snapUrl as data URL
6. Open save/load screen and confirm thumbnails render correctly
7. Use browser dev tools to verify no CORS errors or tainted canvas warnings
