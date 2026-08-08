console.log(`Running Spotify Auto Pause\nBy rubensl07 (GitHub)`);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  pressButton();
});

function pressButton() {
  document.querySelector('[data-testid="control-button-playpause"]').click()
}