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

// Listening to commands
// As the manifest key name implies, suggested_key is only a suggestion for key binding.
// That suggestion will be taken into consideration only if the key is not already assigned
// to another command.
// Another thing to have in mind is that suggested keys are only considered when an extension is
// first installed. Disabling and enabling, updating, or reloading won't have any effect. So if
// you just changed the suggested key in your manifest and want to test it, you have to uninstall
// the extension and install it again.
// Works for me tho ^ just updating works
// But you do have to re-install the whole thing if you didn't had commands before
chrome.commands.onCommand.addListener(function (command) {
  console.log('Command:', command);
});
