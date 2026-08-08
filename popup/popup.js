const spotifyUrls = [
    "open.spotify.com"
];

let isExtensionEnabled = true;

const spotifyStatus = document.querySelector("#spotify-status");
const mediaStatus = document.querySelector("#media-status");
const autoPauseToggle = document.querySelector("#autopause-toggle");

const extensionStatus = document.querySelector("#extension-status");
const statusIndicator = document.querySelector("#status-indicator");
const extensionStatusTitle = document.querySelector("#extension-status-title");
const extensionStatusDescription = document.querySelector("#extension-status-description");

spotifyStatus.textContent = "-";
mediaStatus.textContent = "-";

function updateExtensionStatus() {
    if (isExtensionEnabled) {
        extensionStatusTitle.textContent = "Extension active";
        extensionStatusDescription.textContent = "Monitoring media playback";

        statusIndicator.classList.remove("inactive");
        extensionStatus.classList.remove("inactive");
    } else {
        extensionStatusTitle.textContent = "Extension inactive";
        extensionStatusDescription.textContent = "Media monitoring is disabled";

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
    const spotifyTabs = tabs.filter(item => item.url.includes('open.spotify.com'));
    const mediaTabs = tabs.filter(item => !item.url?.includes('open.spotify.com'));
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

loadExtensionStatus();
loadMediaContent();