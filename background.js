const spotifyUrls = [
    "open.spotify.com"
];

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    const isExtensionActive = await getExtensionActiveStatus()
    if (!isExtensionActive) return;

    const audibleChange = ("audible" in changeInfo)
    if (!audibleChange) return

    const urlTab = tab.url;

    const isSpotify = spotifyUrls.some(url => urlTab?.includes(url));
    if(isSpotify) return;

    const activeAudioInCurrentTab = changeInfo.audible;
    const spotifyTab = await locateSpotifyTab();

    if (!spotifyTab)
        return;

    const activeAudioInOtherTabs = await verifyAudioInOtherTabs(tabId);

    let isMediaPlaying = activeAudioInCurrentTab || activeAudioInOtherTabs;
    let isSpotifyPlaying = spotifyTab.audible;

    if (isMediaPlaying === isSpotifyPlaying) {
        switchSpotifyMusicState(spotifyTab.id);
    }
})

async function switchSpotifyMusicState(tabId) {
    chrome.tabs.sendMessage(tabId, "", {});
}

async function verifyAudioInOtherTabs(currentTabId) {
    const tabs = await chrome.tabs.query({ audible: true });
    return tabs.some(tab => tab.id !== currentTabId);
}

async function locateSpotifyTab() {
    const tabs = await chrome.tabs.query({});
    const spotifyTabs = tabs.filter(item =>
    item.url.includes('open.spotify.com')
    );

    if (spotifyTabs.length > 0)
        return spotifyTabs[0];
    return null
}

async function getExtensionActiveStatus(){
    const result = await chrome.storage.local.get(["autopauseEnabled"]);
    return result.autopauseEnabled ?? true;
}