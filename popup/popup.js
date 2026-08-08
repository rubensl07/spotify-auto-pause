console.log("Popup loaded");

const spotifyStatus = document.querySelector("#spotify-status");
const mediaStatus = document.querySelector("#media-status");

spotifyStatus.textContent = "-";
mediaStatus.textContent = "-";

const autoPauseToggle = document.getElementById("autopause-toggle");

autoPauseToggle.addEventListener("change", () => {
    if (autoPauseToggle.checked) {
        console.log("Auto Pause: ativado");
    } else {
        console.log("Auto Pause: desativado");
    }
});