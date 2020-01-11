// Run script each time Chrome extension icon clicked
document.addEventListener("DOMContentLoaded", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {
      message: "FETCH_IMAGE"
    });
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "SHOW_RESULTS") {
    const status = request.results.imageSource.length;
    const app = document.querySelector(".ebay-klein__result");
    const noImageMsg = document.querySelector(".ebay-klein__no-image");
    const spinner = document.querySelector(".ebay-klein__spinner");

    if (status) {
      spinner.style.display = "none";
      noImageMsg.style.display = "none";

      app.innerHTML = request.results.imageSource
        .map(img => `<a href="${img}" target="_blank"><img src="${img}"/></a>`)
        .join(" ");
    } else {
      spinner.style.display = "none";
      noImageMsg.style.display = "block";
    }
  }
});