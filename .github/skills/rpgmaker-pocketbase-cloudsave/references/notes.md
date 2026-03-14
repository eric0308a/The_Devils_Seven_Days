# RPG Maker PocketBase Cloud Save Notes

## Core Concepts

- RPG Maker uses StorageManager for saves.
- Slot 0 is global info, slots 1..N are actual saves.
- The title scene caches save availability at scene creation.

## Required Sync Behavior

1. Login
   - Use sync code (username) to auth.

2. Startup sync decision
   - Compare cloud updated timestamp with latest local timestamp.

3. Download
   - Fetch all records for the user.
   - Write slot 0 and slot 1..N locally.
   - Set a flag to disable auto-upload while writing.

4. Upload
   - Upload slot 0 and slot 1..N.
   - Use per-slot debounce timers.

## Common Fixes

- Continue disabled: ensure slot 0 exists and is written locally.
- Download immediately re-uploads: gate with isDownloading flag.
- Only one of slot 0/1 uploads: per-slot debounce timers.

## Suggested Logging

- Log download count and slot ids.
- Log upload of slot 0 explicitly.
- Log when global info is rebuilt.
