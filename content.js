// Sending msg from content script to background script
const msg = 'Hello from content Script ⚡';
chrome.runtime.sendMessage(
  { from: 'content', subject: 'inital', message: msg },
  function (response) {
    console.log(response);
  }
);

// // Listening to messages
// chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
//   console.log(msg);
//   //   Directly respond to the sender (background script)
//   sendResponse({ message: 'Content script has received that message ⚡' });
// });

// Listening to messages
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  // Msg validation
  if (msg.from === 'popup' && msg.subject === 'DOMInfo') {
    // var domInfo = 'test';
    console.log(msg);
    // Directly respond to the sender (popup script)
    sendResponse({
      from: 'content',
      subject: 'verification',
      message: 'Content script has received that message ⚡',
    });
  } else if (msg.from === 'background' && msg.subject === 'inital') {
    console.log(msg);
    // Directly respond to the sender (background script)
    // this doesn't need to be in the if ... else, but for now it's m0re clear
    sendResponse({
      from: 'content',
      subject: 'verification',
      message: 'Content script has received that message ⚡',
    });
  } else {
    console.log(msg);
  }
});
