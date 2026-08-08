const spotifyUrls = [
    "open.spotify.com"
];

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    const audibleChange = ("audible" in changeInfo)
    if (!audibleChange) return

    const urlTab = tab.url;

    const isSpotify = spotifyUrls.some(url => urlTab?.includes(url));
    if(isSpotify) return;
    
    const activeAudio = changeInfo.audible;
    if(!activeAudio) {
        playSpotify();
    } else {
        pauseSpotify();
    }
})

async function pauseSpotify(){
    const spotifyTab = await locateSpotifyTab();

    if (!spotifyTab)
        return;

    const tabId = spotifyTab.id;

    chrome.tabs.sendMessage(tabId, "pause", {});
}

async function playSpotify(){
    const spotifyTab = await locateSpotifyTab();

    if (!spotifyTab)
        return;

    const tabId = spotifyTab.id;

    chrome.tabs.sendMessage(tabId, "play", {});
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