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
  }
  if (msg.from === 'content' && msg.subject === 'langg') {
    // verify the message
    if (msg.message.detected.percentage >= 50) {
      // only accept it if it is equal or more than 50%
      var dLang; // detected language
      var sLang; // language of <html lang="">
      if (
        msg.message.detected.lang == 'en' ||
        msg.message.detected.lang == 'en-US' ||
        msg.message.detected.lang == 'en-GB'
      ) {
        // make sure en, en-US and en-GB are all detected as English
        dLang = 'Engels'; // make dLang English
      } else if (msg.message.detected.lang == 'nl') {
        // make dLang dutch if the detected lang code is "nl"
        dLang = 'Nederlands';
      }
      if (
        msg.message.langSetting == 'en' ||
        msg.message.langSetting == 'en-US' ||
        msg.message.langSetting == 'en-GB'
      ) {
        // same as above but for the set language attribute of the html element
        sLang = 'Engels';
      } else if (msg.message.langSetting == 'nl') {
        sLang = 'Nederlands';
      }
      if (dLang != sLang) {
        // when the detected language doesn't equal the set language do this...
        var buttons = [
          // define the buttons of the notification
          {
            title: 'Ja, wijzig de taal.', // Yes button
          },
          {
            title: 'Nee, wijzig de taal niet.', // No button
          },
        ];
        if (dLang !== undefined && sLang !== undefined) {
          // don't fire the notification if one of the language values is undefined
          chrome.notifications.create(
            // create a notification
            'incorrect-language', // name of the notification
            {
              title: 'Waarschijnlijk foutieve taal instelling', // title (in bold)
              message: `De taal van deze website staat ingesteld in het ${sLang}, ik heb ${dLang} gedetecteerd. Zal ik het aanpassen?`,
              type: 'basic',
              buttons: buttons,
              iconUrl: 'icons/icon128.png',
            },
            function () {
              console.log('ik ben een callback'); // callback
            }
          );
          chrome.notifications.onButtonClicked.addListener((id, index) => {
            // add eventlistener for the buttons of the notification
            chrome.notifications.clear(id); // ? clear notifications
            if (index == 0) {
              // buttons[0] = yes, change the language
              chrome.tabs.query({ active: true }, function (tabs) {
                // get the active tab
                chrome.tabs.sendMessage(tabs[0].id, {
                  // send message to content.js of this tab with the detected language (which is the language it has to change to)
                  from: 'background',
                  subject: 'changeLangg',
                  message: dLang,
                });
              });
            }
          });
        }
      }
    }
  }
  if (msg.from === 'popup' && msg.subject === 'tabTask') {
    console.log(msg.message);
    const _tabId = Number(msg.message.tabId);
    // {name, value, tabId}
    // open || muted || close
    if (msg.message.name === 'open') {
      // make tab active
      // chrome.tabs.update(142, { active: true });
      chrome.tabs.update(_tabId, { active: true });
      chrome.tabs.query({ active: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          from: 'background',
          subject: 'switched',
          message: 'press tab',
        });
      });
      sendResponse({
        from: 'background',
        subject: 'open',
        message: `Tab with id: ${_tabId} is now avtive.`,
      });
    } else if (msg.message.name === 'muted') {
      const _muted = msg.message.value === 'true';
      chrome.tabs.update(_tabId, { muted: _muted });
      const mutedConfermationMsg = {
        tabId: _tabId,
        muted: _muted,
        name: msg.message.name,
      };
      sendResponse({
        from: 'background',
        subject: 'muted',
        message: mutedConfermationMsg,
      });
    } else {
      // if close do this...
      // closes tab
      // chrome.tabs.remove(142);
      chrome.tabs.remove(_tabId);

      sendResponse({
        from: 'background',
        subject: 'close',
        message: _tabId,
      });
    }
  }
});

function _getLangAlltabs() {
  // detects language of all open tabs
  chrome.tabs.query({ windowId: chrome.windows.WINDOW_ID_Current }, (tabs) => {
    // gets all tabs in window
    tabs.forEach((_tab) => {
      // loop over tabs
      chrome.tabs.detectLanguage(_tab.id, function (_language) {
        // detect the language of each tab
        console.log({
          id: _tab.id,
          lang: _language,
          url: _tab.url,
        });
      });
    });
  });
}
function _getLang(tabId) {
  // detect the language of one tab
  return chrome.tabs.detectLanguage(tabId, function (l) {
    console.log(l);
    return l;
  });
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // listen if a tab is updated
  if (!tab.url.includes('google')) {
    if (changeInfo.status == 'complete') {
      // wait till the tab is finished updating
      const detLang = _getLang(tabId); // detect the language of the tab
      if (detLang == undefined) {
        // if it can't detect the language
        const msg = 'Cant detect language...';
        chrome.tabs.sendMessage(tabId, {
          // send message to content.js to see if it can find out the language
          from: 'background',
          subject: 'noLang',
          message: msg,
        });
      }
    }
  }
});
