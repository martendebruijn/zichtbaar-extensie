// chrome.runtime.sendMessage({
//   from: 'content',
//   subject: 'showPageAction',
// });

// function getLang() {
//   const htmlTag = document.querySelector('html');
//   const lang = htmlTag.getAttribute('lang');
//   return lang ? lang : null;
// }

// chrome.runtime.onMessage.addListener((msg, sender, response) => {
//   if (msg.from === 'popup' && msg.subject === 'DOMInfo') {
//     var domInfo = {
//       lang: getLang(),
//     };

//     response(domInfo);
//   }
// });

// Sending messages from Content Script
const msg = 'Hello from content Script ⚡';
chrome.runtime.sendMessage({ message: msg }, function (response) {
  console.log(response);
});

// Listening to messages in Context Script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request);
  // Callback
  sendResponse({ message: 'Content script has received that message ⚡' });
});

// Listen for messages from the popup.
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  // First, validate the message's structure.
  if (msg.from === 'popup' && msg.subject === 'DOMInfo') {
    // Collect the necessary data.
    // (For your specific requirements `document.querySelectorAll(...)`
    //  should be equivalent to jquery's `$(...)`.)
    // var domInfo = {
    //   total: document.querySelectorAll('*').length,
    //   inputs: document.querySelectorAll('input').length,
    //   buttons: document.querySelectorAll('button').length,
    //   language: getLang(),
    // };
    var domInfo = 'test';

    // Directly respond to the sender (popup),
    // through the specified callback.
    response(domInfo);
  }
});
