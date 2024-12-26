function handleMessage(request, sender, sendResponse) {
    if (request.action === "showPreview") {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "displayPreview", mediaUrl: request.mediaUrl});
        });
    }
}

chrome.runtime.onMessage.addListener(handleMessage);