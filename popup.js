function sendMsg(tabs, subject, _msg) {
  chrome.tabs.sendMessage(tabs[0].id, {
    from: 'popup',
    subject: subject,
    message: _msg,
  });
}

var lang;
function getLang(tabs) {
  chrome.tabs.detectLanguage(function (language) {
    if (language === 'und' || language === undefined) {
      // undefined
      console.log("Can't detect language...");
      lang = null;
      // get lang attribute
      sendMsg(tabs, 'language', "we don't have it");
    } else {
      // is goood
      console.log(`Detected language is ${language}.`);
      lang = language;
      sendMsg(tabs, 'language', 'we have it');
    }
  });
}

const setDOMInfo = (info) => {
  // happens in popup
  console.log('Ik heb iets gedaan');
  console.log(info);
};

window.addEventListener('DOMContentLoaded', () => {
  getLang();
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
      getLang(tabs); // detect language of the page
    }
  );
});
