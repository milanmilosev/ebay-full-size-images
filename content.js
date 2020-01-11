chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "FETCH_IMAGE") {

    updateBackground = (results) => {
      console.log('running update')
      // send results to background listener
      chrome.runtime.sendMessage({
        message: "SHOW_RESULTS",
        results: {
          imageSource: results
        }
      });
    }

    // check storage
    let resultsFromStorage = null;
    const adElement = 
      document.querySelector('.boxedarticle--details--full .align-right') && 
      document.querySelector('.boxedarticle--details--full .align-right').innerText ||
      false;
    
    const adNumber = adElement && adElement.match(/[0-9]+/g) || false
    
    if(adNumber.length) {
      resultsFromStorage = sessionStorage.getItem(adNumber);
    }

    if(resultsFromStorage) {
      updateBackground(JSON.parse(resultsFromStorage))

    } else {
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
        
        sessionStorage.setItem(adNumber, JSON.stringify(imageSource));
        console.log(imageSource)
        updateBackground(imageSource);
        // close gallery
        imageSource ? document.querySelector(".mfp-close").click() : null

      }, 1000)
    }
  }
});
