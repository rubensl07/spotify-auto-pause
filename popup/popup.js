loadMessagesText();
loadVersion();

let isExtensionEnabled = true;

const spotifyStatus = document.querySelector("#spotify-status");
const mediaStatus = document.querySelector("#media-status");
const autoPauseToggle = document.querySelector("#autopause-toggle");

const extensionStatus = document.querySelector("#extension-status");
const statusIndicator = document.querySelector("#status-indicator");
const extensionStatusTitle = document.querySelector("#extension-status-title");
const extensionStatusDescription = document.querySelector("#extension-status-description");

function updateExtensionStatus() {
    if (isExtensionEnabled) {
        extensionStatusTitle.textContent = chrome.i18n.getMessage("extensionActive");
        extensionStatusDescription.textContent = chrome.i18n.getMessage("monitoringEnabled");

        statusIndicator.classList.remove("inactive");
        extensionStatus.classList.remove("inactive");
    } else {
        chrome.i18n.getMessage("nomeDaMensagem");
        extensionStatusTitle.textContent = chrome.i18n.getMessage("extensionInactive");
        extensionStatusDescription.textContent = chrome.i18n.getMessage("monitoringDisabled");

        statusIndicator.classList.add("inactive");
        extensionStatus.classList.add("inactive");
    }
}

async function loadExtensionStatus() {
    const result = await chrome.storage.local.get(["autopauseEnabled"]);

    isExtensionEnabled = result.autopauseEnabled ?? true;

    autoPauseToggle.checked = isExtensionEnabled;

    updateExtensionStatus();

}

autoPauseToggle.addEventListener("change", async () => {
    isExtensionEnabled = autoPauseToggle.checked;

    await chrome.storage.local.set({
        autopauseEnabled: isExtensionEnabled
    });

    updateExtensionStatus();
});

async function getMediaStatus() {
    const tabs = await chrome.tabs.query({ audible: true });
    const spotifyTabs = tabs.filter(item => spotifyUrls.some(url => item.url?.includes(url)));
    const mediaTabs = tabs.filter(item => !spotifyUrls.some(url => item.url?.includes(url)));
    const tabsObject = {
        spotify: spotifyTabs[0]?.title,
        media: mediaTabs[0]?.title
    }
    return tabsObject;
}

async function loadMediaContent() {
    const mediaContent = await getMediaStatus();
    mediaStatus.textContent = mediaContent.media ?? "-";
    spotifyStatus.textContent = mediaContent.spotify ?? "-";
}

function loadMessagesText() {
document.querySelector("#extension-status-title").textContent = chrome.i18n.getMessage("extensionActive");
document.querySelector("#extension-status-description").textContent = chrome.i18n.getMessage("monitoringEnabled");
document.querySelector("#autopause-title").textContent = chrome.i18n.getMessage("autoPause");
document.querySelector("#autopause-description").textContent = chrome.i18n.getMessage("autoPauseText");
document.querySelector("#spotify-label").textContent = "Spotify";
document.querySelector("#media-label").textContent = chrome.i18n.getMessage("otherMediaLabel");
document.querySelector("#spotify-status").textContent = chrome.i18n.getMessage("-");
document.querySelector("#media-status").textContent = chrome.i18n.getMessage("-");
}

function loadVersion() {
    const manifest = chrome.runtime.getManifest();
    const versionElement = document.querySelector("#extension-version");
    versionElement.textContent = `v${manifest.version}`;
}

loadExtensionStatus();
loadMediaContent();