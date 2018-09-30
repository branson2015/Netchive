function getPageDetails(callback) {
    // Inject the content script into the current page
    chrome.tabs.executeScript({ file: 'content.js' }, function(){
        if (chrome.runtime.lastError) {
            var errorMsg = chrome.runtime.lastError
            if (errorMsg == "Cannot access a chrome:// URL") {
                console.log("Chrome:// is not supported");
            }
         }
    });
    // When a message is received from the content script
    chrome.runtime.onMessage.addListener(function(message) {
        // Call the callback function
        callback(message);
    });
};