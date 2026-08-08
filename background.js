const spotifyUrls = [
    "open.spotify.com"
];

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    const audibleChange = ("audible" in changeInfo)
    if (!audibleChange) return

    const urlTab = tab.url;

    const isSpotify = spotifyUrls.some(url => urlTab?.includes(url));
    if(isSpotify) return;

    const activeAudio = changeInfo.audible;
    const spotifyTab = await locateSpotifyTab();

    if (!spotifyTab)
        return;

    let isTabPlaying = activeAudio;
    let isSpotifyPlaying = spotifyTab.audible;

    if (isTabPlaying === isSpotifyPlaying) {
        switchSpotifyMusicState(spotifyTab.id);
    }
})

async function switchSpotifyMusicState(tabId) {
    chrome.tabs.sendMessage(tabId, "", {});
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