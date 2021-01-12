const setDOMInfo = (info) => {
  // happens in popup
  console.log('Ik heb iets gedaan');
  console.log(info);
};

window.addEventListener('DOMContentLoaded', () => {
  // Get active tab
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (tabs) => {
      const msg = 'Hello from popup ✨';
      // send msg from popup script to content script
      chrome.tabs.sendMessage(
        tabs[0].id,
        { from: 'popup', subject: 'DOMInfo', message: msg },

        // do this:
        setDOMInfo
      );
    }
  );
});
