chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "FETCH_IMAGE") {
    // Extract images from product page or gallery
    const imageContainer =
      document.querySelectorAll(".ad-image-wrapper .ad-image img") ||
      document.querySelectorAll("imagebox-thumbnail img");
    // Get all image sources
    const imageArray = Array.from(imageContainer);
    const imageSource =
      imageArray.length && imageArray.map(src => src.getAttribute("src"));

    // Listener
    chrome.runtime.sendMessage({
      message: "SHOW_RESULTS",
      results: {
        status: imageSource ? true : false,
        imageSource: imageSource
      }
    });
  }
});
