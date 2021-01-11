chrome.runtime.onMessage.addListener((msg, sender) => {
  // First, validate the message's structure.
  if (msg.from === 'content' && msg.subject === 'showPageAction') {
    // Enable the page-action for the requesting tab.
    chrome.pageAction.show(sender.tab.id);
  }
});
// chrome.runtime.onInstalled.addListener(function () {
// chrome.storage.sync.get('user', function (data) {
//   // set only user to null when it hasen't been changed
//   // don't know if I need this <> it could just been reset because I updated the extention
//   if (!data.user) {
//     chrome.storage.sync.set({ user: null });
//   }
// });

// chrome.storage.sync.set({
//   langFav: [
//     { short: 'nl', full: 'Nederlands' },
//     { short: 'en', full: 'Engels' },
//   ],
// });

//   chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
//     chrome.declarativeContent.onPageChanged.addRules([
//       {
//         conditions: [
//           new chrome.declarativeContent.PageStateMatcher({
//             pageUrl: { hostEquals: 'developer.chrome.com' },
//           }),
//         ],
//         actions: [new chrome.declarativeContent.ShowPageAction()],
//       },
//     ]);
//   });
// });
