---
name: rpgmaker-pocketbase-cloudsave
description: Build and debug RPG Maker MV/MZ cloud save plugins backed by PocketBase. Use when implementing sync-code auth, PocketBase JS SDK integration, StorageManager hooks, startup smart sync, Options menu integration, handling extended save metadata (screenshots, location, level, gold), and when troubleshooting missing local saves, title-screen Continue button issues, tainted canvas errors, or missing save thumbnails after cloud sync.
---

# RPG Maker PocketBase Cloud Save Skill

Follow these steps to implement or debug a PocketBase cloud-save plugin for RPG Maker MV/MZ.

## Workflow

1. Confirm engine and storage mode
   - MV uses StorageManager in rpg_managers.js and localStorage for web builds.
   - NW.js uses file-based saves in save/ directory.

2. Detect extended save metadata
   - Check if game uses custom save plugins (e.g., sai_Scenefile.js, CustomSaveTitle.js).
   - Inspect DataManager.makeSavefileInfo() to see if it adds fields beyond standard (globalId, title, characters, faces, playtime, timestamp).
   - Common extensions: snapUrl (screenshot), location (map name), level, gold, savetime, map_id.
   - If present, proceed to step 2a. If not, skip to step 3.

2a. Configure PocketBase with extended fields (if extended metadata detected)
   - Collection: game_saves_pray
   - Fields: 
     - user (relation to users)
     - slot_id (number)
     - save_data (text) - core save JSON
     - save_info (json, optional) - per-slot metadata (location, level, gold, savetime, etc.)
     - snap_image (file, optional) - per-slot screenshot/thumbnail
   - Rules:
     - List/View/Update: @request.auth.id = user.id
     - Create: @request.auth.id != "" && @request.data.user = @request.auth.id

2b. Configure PocketBase without extended fields (if no extended metadata)
   - Collection: game_saves_pray
   - Fields: user (relation to users), slot_id (number), save_data (text)
   - Rules:
     - List/View/Update: @request.auth.id = user.id
     - Create: @request.auth.id != "" && @request.data.user = @request.auth.id

3. Initialize SDK once and disable auto-cancel
   - Use PocketBase JS SDK.
   - Create a single client instance and set pb.autoCancellation(false).

4. Handle extended save metadata (if present)
   - Strip snapUrl from global info (slot 0) before upload to avoid payload bloat.
   - Extract snapUrl data URLs and convert to File objects for upload to snap_image field.
   - Extract other metadata (location, level, gold, etc.) into save_info JSON field.
   - On download, fetch snap_image URLs and convert to data URLs to avoid CORS/tainted canvas errors.
   - Merge save_info and converted snapUrl back into global info after download.
   - **For detailed implementation**: See [references/extended-metadata.md](references/extended-metadata.md) for helper functions, upload/download patterns, and common issues.

5. Implement sync-code auth
   - Persist username (sync code) locally.
   - On first run, prompt to create or input existing code.
   - Create a PocketBase user when generating a new code.
   - Login with authWithPassword on startup.

6. Startup smart sync
   - Fetch latest cloud record by updated timestamp.
   - Compare to local timestamp from DataManager.loadGlobalInfo().
   - If cloud newer, download and write local saves.
   - If local newer, upload all local saves.

7. Hook StorageManager.save for auto-upload
   - Upload after successful local save.
   - Use per-slot debounce timers to avoid slot 0/slot 1 race.
   - Skip auto-upload while downloading from cloud.
   - If extended metadata present, extract and upload save_info and snap_image alongside save_data.

8. Options menu integration
   - Add a menu item in Window_Options.
   - Show current sync code and allow change.

9. Validate title-screen behavior
   - Ensure global info (slot 0) is uploaded and downloaded.
   - If Continue stays disabled after download, trigger return to title or rebuild global info.

## Known Pitfalls

- **Missing slot 0**: The Continue button relies on global info stored in slot 0. Always upload/download slot 0.
- **Debounce collision**: A single global debounce timer can cancel slot 0 or slot 1 uploads. Use per-slot timers.
- **Download triggers upload**: Calling StorageManager.save during download triggers auto-upload. Gate with an isDownloading flag.
- **Title screen cache**: The title scene evaluates save availability at initialization. After download, prompt user to return to title or re-enter the scene.
- **snapUrl bloat**: If game stores base64 screenshots in snapUrl, global info (slot 0) can exceed text field limits. Strip snapUrl before uploading slot 0; store images in separate snap_image file field.
- **CORS tainted canvas**: Loading images from PocketBase URLs directly causes "tainted canvas" errors in WebGL. Fetch images as blobs and convert to data URLs before writing to global info.
- **Missing save metadata after download**: If save_info and snap_image fields don't exist in PocketBase, or aren't merged back into global info, save list shows only timestamps. Always merge cloud metadata into local global info after download.
- **Boot stack misdiagnosis**: If stack includes PocketBase title hooks but the first failing frame is `rpg_managers.js` audio path (`AudioManager.createBuffer`/`checkWebAudioError`), handle audio startup first. See [../rpgmaker-audio-ios-fix/SKILL.md](../rpgmaker-audio-ios-fix/SKILL.md).

## Debug Checklist

- Verify slot 0 exists in PocketBase for the user.
- Check that downloaded saves write localStorage (web) or save/ files (NW.js).
- Confirm logs show slot 0 and slot 1 downloads.
- If Continue is disabled, rebuild global info or re-open the title scene.
- If save list shows no screenshots or metadata, inspect DataManager.makeSavefileInfo() for extended fields, then verify save_info and snap_image exist in PocketBase schema and are populated.
- If "tainted canvas" error appears, ensure cloud image URLs are converted to data URLs via fetch + FileReader before writing to global info.
- If slot 0 upload fails or is truncated, check if snapUrl is being stripped before upload.

## References

- [references/notes.md](references/notes.md) - Step-by-step implementation guide and debugging fixes
- [references/extended-metadata.md](references/extended-metadata.md) - Handling screenshots, location, level, and other custom save metadata
