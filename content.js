chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "FETCH_IMAGE") {
    // open gallery 
    document.querySelector("#viewad-image") && 
    document.querySelector("#viewad-image").click()
    
    // settimeout to prevent side effects
    setTimeout(() => {
      // extract images
      const imageContainer =
        document.querySelectorAll(".ad-image-wrapper .ad-image img") ||
        document.querySelectorAll("imagebox-thumbnail img") || false;

    
      // create images array
      const imageArray = Array.from(imageContainer) || null;
      const imageSource = 
        imageArray.length && 
        imageArray.map(src => src.getAttribute("src"));

      // send results to background listener
      chrome.runtime.sendMessage({
        message: "SHOW_RESULTS",
        results: {
          imageSource: imageSource
        }
      });

      // close gallery
      imageSource ? document.querySelector(".mfp-close").click() : null

    }, 1000)
  }
});
