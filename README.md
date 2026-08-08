# Spotify Auto Pause

A browser extension that automatically pauses **Spotify Web** when media starts playing in another browser tab, and resumes Spotify when that media stops.

> **Current version: V1**

## 🎯 About

Spotify Web does not automatically pause when another browser tab starts playing media.

This extension was created to solve that problem by monitoring the audio state of browser tabs and communicating with the Spotify Web tab to control its playback.

The project was also created as a learning exercise in developing browser extensions with **Manifest V3**, including communication between background service workers and content scripts.

## ⚙️ How V1 works

The current version uses two main components:

* **Background service worker** — monitors browser tabs and detects changes in their audio state.
* **Content script** — runs on Spotify Web and controls the Spotify playback button.

The basic flow is:

```text
Other browser tab starts playing audio
              ↓
       background.js
              ↓
    Finds Spotify Web tab
              ↓
       Sends "pause"
              ↓
         content.js
              ↓
    Finds Spotify's Pause button
              ↓
           Pauses
```

When the other tab stops playing media, the reverse process is used to resume Spotify.

## 🧩 Current limitations

V1 is a functional prototype and has some known limitations.

* Audio state detection relies on the browser's `audible` property.
* Detection of audio stopping may have a small delay.
* Spotify's interface and accessibility labels may change, potentially requiring updates to the content script.
* The extension currently targets Spotify Web.
* V1 uses separate `play` and `pause` messages between the background service worker and content script.

These limitations are intentional for the current version and will be addressed as the project evolves.

## 🛠️ Technologies

* JavaScript
* Chrome Extensions API
* Manifest V3
* Content Scripts
* Service Workers
* Chrome Tabs API

## 📁 Project structure

```text
spotify-auto-pause/
│
├── assets/
│   └── logo.png
│
├── background.js
├── content.js
└── manifest.json
```

## 🚀 Installation

This project is currently intended to be loaded as an unpacked browser extension.

1. Clone or download this repository.
2. Open the browser's extensions page.
3. Enable **Developer mode**.
4. Select **Load unpacked**.
5. Select the project directory.
6. Open Spotify Web and start playing music.
7. Play media in another browser tab to test the extension.

## 🔖 Versioning

The project uses **Git tags** to identify stable versions.

The current implementation is **V1**.

Future versions may introduce significant architectural changes rather than simply extending the existing implementation.

## 🔮 Future development

V2 is planned to substantially change the way playback state is handled.

The planned architecture will reduce the dependency on separate `play` and `pause` messages between the background service worker and content script. Instead, the background will use information from `changeInfo` and the current Spotify tab's audio state to determine whether Spotify should be paused, resumed, or left unchanged.

## 📄 License

License not yet defined.
