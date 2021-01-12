// chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
//   console.log(tabs[0]);
// });

// chrome.runtime.onMessage.addListener((msg, sender) => {
//   if (msg.from === 'content' && msg.subject === 'showPageAction') {
//     // chrome.browserAction.show(sender.tab.id);
//   }
// });

// chrome.tabs.detectLanguage(tabId?: number, callback: function)
// chrome.browserAction.onClicked.addListener((tab) => {
//   chrome.browserAction.disable(tab.id);
//   console.log(tab.url);
// });

// Sending messages from background / event page
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
    chrome.tabs.query({ active: true }, function (tabs) {
      const msg = 'Hello from background 🔥';
      chrome.tabs.sendMessage(tabs[0].id, { message: msg });
    });
  }
});

// Listening to messages page
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request);
  // Callback for that request
  sendResponse({ message: 'Background has received that message 🔥' });
});
