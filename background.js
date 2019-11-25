// Run script each time Chrome extension icon clicked
document.addEventListener("DOMContentLoaded", function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {
      message: "FETCH_IMAGE"
    });
  });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "SHOW_RESULTS") {
    const status = request.results.status;
    const app = document.querySelector(".ebay-klein__result");
    const noImageMsg = document.querySelector(".ebay-klein__no-image");

    status ? (noImageMsg.style.display = "none") : null;

    app.innerHTML = status
      ? request.results.imageSource.map(
          img => `<a href="${img}" target="_blank"><img src="${img}"/></a>`
        )
      : null;
  }
});
