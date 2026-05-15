# DGS YouTube Focus Blocker

A lightweight Google Chrome extension designed to eliminate distractions and boost productivity during exam preparation (specifically for DGS). 

## Features
- Blocks the YouTube homepage, trending feeds, and search results.
- Redirects non-educational or distracting pages to a custom study page.
- Hides video recommendations, comments, and descriptions to keep you laser-focused.
- Whitelists only the specified educational channel (e.g., "Benim Hocam") so you can only watch relevant lectures.

## How to Install
1. Download or clone this repository.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** (top-right toggle).
4. Click **Load unpacked** (top-left button) and select the project folder.

## How to Customize (Changing or Adding Channels)
If you want to use this extension for a different YouTube channel or change the redirect website, open the `content.js` file and modify the variables at the very top of the script:

```javascript
const targetUrl = "https://exam-countdown-dgs.vercel.app/"; // Change to your custom redirect website
const allowedChannel = "Benim Hocam";                  // Change to the exact name of the channel you want to allow
const allowedChannelHandle = "@BenimHocam";            // Change to the exact handle (URL name) of the channel
