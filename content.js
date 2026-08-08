console.log('Running AutoPause');

let languages = [];

async function loadLanguages() {
  // try {
  //   const response = await fetch(chrome.runtime.getURL('languages.json'));
  //   const data = await response.json();

  //   languages = data.languages;

  //   console.log('Languages:', languages);
  // } catch (error) {
  //   console.error('Erro ao carregar languages.json:', error);
  // }
  languages =
  [
    {
      "portuguese": {
        "pause": "Pausar",
        "play": "Play"
      }
    },
    {
      "english": {
        "pause": "Pause",
        "play": "Play"
      }
    }
  ]
}

loadLanguages();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message) {
    case 'pause':
      pauseMedia()
      break;
    case 'play':
      playMedia()
      break;
    default:
      console.error("Error: Unknown option present in message received");
      break;
  }
});

function pauseMedia() {
  for (const language of languages) {
    const button = document.querySelector(
      `[aria-label="${Object.values(language)[0].pause}"]`
    );

    if (button) {
      button.click();
      return;
    }
  }

  console.error('Error: Pause button not found');
}

function playMedia() {
  for (const language of languages) {
    const button = document.querySelector(
      `[aria-label="${Object.values(language)[0].play}"]`
    );

    if (button) {
      button.click();
      return;
    }
  }

  console.error('Error: Pause button not found');
}