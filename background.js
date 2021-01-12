// Sending messages from background script to content script
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
    chrome.tabs.query({ active: true }, function (tabs) {
      const msg = 'Hello from background 🔥';
      chrome.tabs.sendMessage(tabs[0].id, {
        from: 'background',
        subject: 'inital',
        message: msg,
      });
    });
  }
});

// Listening to messages page
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.from === 'content' && msg.subject === 'inital') {
    console.log(msg);
    // Directly respond to the sender (content script)
    sendResponse({
      from: 'background',
      subject: 'verification',
      message: 'Background has received that message 🔥',
    });
  } else {
    console.log(msg);
  }
});
