# ZoomPic Chrome Extension

A Chrome extension that shows a floating preview window when hovering over images or videos.

## Features

- Auto-preview images and videos on hover
- Original size display with smart scaling
- Mouse-following preview window
- Automatic hide on mouse out
- Supports both images and videos

## Directory Structure

```
media-preview-extension
├── src
│   ├── background.js       # Background script for managing events and communication
│   ├── content.js         # Content script for detecting mouse movements over media
│   └── popup.js           # Logic for the floating media display window
├── css
│   └── styles.css         # Styles for the floating window and UI elements
├── manifest.json          # Configuration file for the Chrome extension
└── README.md              # Documentation for the project
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/zoompic.git
cd zoompic
```
2. Navigate to the project directory:
   ```
   cd media-preview-extension
   ```
3. Open Chrome and go to `chrome://extensions/`.
4. Enable "Developer mode" in the top right corner.
5. Click on "Load unpacked" and select the `media-preview-extension` directory.

## Usage

- Hover over any image or video on a webpage to see the floating window displaying the media.
- The floating window will adjust its size to match the dimensions of the media, ensuring optimal viewing.

## Contributing

Feel free to submit issues or pull requests for improvements and bug fixes.