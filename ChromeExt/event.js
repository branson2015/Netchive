function getPageDetails(callback) {
    // Inject the content script into the current page
    chrome.tabs.executeScript({ file: 'content.js' });
    // When a message is received from the content script
    chrome.runtime.onMessage.addListener(function(message) {
        // Call the callback function
        callback(message);
    });
};