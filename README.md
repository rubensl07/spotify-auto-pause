# Spotify Auto Pause

A browser extension that automatically manages **Spotify Web** playback based on media activity in other browser tabs.

> **Current version: V2**

## 🎯 About

Spotify Web does not automatically pause when another browser tab starts playing media.

This extension solves that problem by monitoring the audio state of browser tabs and synchronizing Spotify's playback state accordingly.

The project was also created as a learning exercise in developing browser extensions with **Manifest V3**, including service workers, content scripts, the Chrome Tabs API, and communication between extension components.

## ⚙️ How V2 works

V2 uses the browser's audio state information to determine what Spotify should be doing instead of sending separate `play` and `pause` commands from the background service worker.

The main components are:

* **Background service worker** — monitors changes in the audio state of browser tabs and determines the appropriate Spotify playback state.
* **Content script** — runs on Spotify Web and interacts with the Spotify playback controls.

The basic flow is:

```text
Other browser tab changes audio state
              ↓
       background.js
              ↓
    Checks tab audio state
              ↓
       Finds Spotify tab
              ↓
    Determines desired state
              ↓
         content.js
              ↓
    Checks Spotify playback state
              ↓
      Pauses / resumes / does nothing
```

Instead of treating `play` and `pause` as independent commands, V2 uses the current state of the browser and Spotify to decide whether an action is actually necessary.

## 🧠 V2 Architecture

One of the main changes from V1 to V2 is the way playback commands are handled.

### V1

The background service worker explicitly sent separate commands:

```text
"pause"
"play"
```

The content script then executed the corresponding action.

### V2

The background service worker determines the desired state based on the information provided by the browser, particularly:

* `changeInfo.audible`
* the current Spotify tab's `audible` state

The content script is responsible for applying the required state to Spotify rather than simply receiving an arbitrary play/pause command.

This makes the communication more state-oriented and reduces unnecessary playback actions.

## 🧩 Current limitations

* Audio state detection relies on the browser's `audible` property.
* Changes to the browser's audio state may not be detected immediately, particularly when media stops playing.
* Spotify's interface and accessibility labels may change, potentially requiring updates to the content script.
* The extension currently targets Spotify Web.
* The extension depends on the Spotify Web interface to control playback.

## 🛠️ Technologies

* JavaScript
* Chrome Extensions API
* Manifest V3
* Content Scripts
* Service Workers
* Chrome Tabs API

## 🌐 Browser compatibility

The extension requires Chrome 45 or later because Chrome 45 introduced support for the `tabs.Tab.audible` property used to detect whether a tab is producing audio.

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
6. Open Spotify Web.
7. Play media in another browser tab to test the extension.

## 🔖 Versioning

The project uses **Git tags** to identify stable versions.

Current release:

```text
v2.0.0
```

The V2 release represents a significant architectural change from V1 rather than a simple incremental update.

## 📄 License

License not yet defined.