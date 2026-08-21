# YouTube Video Rotation

Chrome extension (Manifest V3) that adds **rotate** and **flip** controls to the YouTube HTML5 player on watch pages.

## Features

- **Rotate 90° clockwise** — one button; each click advances 90° (0°, 90°, 180°, 270°). At 90° and 270°, the video is scaled so it stays roughly inside the player.
- **Flip horizontal / vertical** — toggles mirror on each axis; works together with rotation.
- **SPA-aware** — controls are re-injected after in-site navigation; transform state resets when you open another video (`yt-navigate-finish`).

## Requirements

- Google Chrome (or another Chromium browser that supports unpacked Manifest V3 extensions)
- A normal **desktop** watch URL: `https://www.youtube.com/watch?...`

The extension does **not** run on `m.youtube.com`, embeds, or Shorts unless you extend [`manifest.json`](manifest.json) `content_scripts.matches`.

## Install (developer / unpacked)

1. Open **`chrome://extensions`**
2. Enable **Developer mode** (top right)
3. Click **Load unpacked**
4. Select this repository folder (the one containing `manifest.json`)

After editing `content.js` or `manifest.json`, click **Reload** on the extension card, then refresh your YouTube tab.

## Usage

1. Open any YouTube **watch** page and start playback.
2. In the player bar, to the left of **Settings**, use the new buttons:
   - Rotate 90° (clockwise)  
   - Flip horizontal / flip vertical (click again to turn off)

## Project layout

| Path | Purpose |
|------|--------|
| [`manifest.json`](manifest.json) | Extension manifest and content script entry |
| [`content.js`](content.js) | Injects controls and applies CSS `transform` on the main video element |
| [`icons/`](icons/) | Extension icons (16, 48, 128) |

## How it works (brief)

- Targets `video.video-stream.html5-main-video` inside `.html5-video-player` / `#movie_player`.
- Injects buttons into `.ytp-right-controls-left` next to the native settings control.
- Uses `transform` (`rotate`, uniform `scale` for sideways fit, `scaleX` / `scaleY` for flips) with a short CSS transition.

## Docs in this repo

- [`docs/requirement.md`](docs/requirement.md) — original intent  
- [`docs/YouTube.html`](docs/YouTube.html) — saved page sample for DOM reference (optional)

## License

Add a license file if you plan to distribute the extension publicly.
