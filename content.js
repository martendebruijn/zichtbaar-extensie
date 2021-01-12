// --- LANGUAGE ---
function getLang() {
  const htmlTag = document.querySelector('html');
  const lang = htmlTag.getAttribute('lang');
  return lang;
}

// --- MESSAGES ---
// Sending msg from content script to background script
const msg = 'Hello from content Script ⚡';
chrome.runtime.sendMessage(
  { from: 'content', subject: 'inital', message: msg },
  function (response) {
    console.log(response);
  }
);

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
  }
  if (msg.from === 'background' && msg.subject === 'inital') {
    console.log(msg);
    // Directly respond to the sender (background script)
    sendResponse({
      from: 'content',
      subject: 'verification',
      message: 'Content script has received that message ⚡',
    });
  }
  if (msg.from === 'popup' && msg.subject === 'language') {
    console.log(msg);
    const lang = getLang();
    sendResponse({
      from: 'content',
      subject: 'lang',
      msg: lang,
    });
  }
});
