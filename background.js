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
    console.log(msg);
    if (msg.message.detected.percentage >= 50) {
      if (msg.message.detected.lang != msg.message.langSetting) {
        // var buttons = [
        //   {
        //     title: 'Chocolate',
        //   },
        //   {
        //     title: 'Battenberg',
        //   },
        // ];
        var dLang;
        var sLang;
        if (msg.message.detected.lang == 'en') {
          dLang = 'Engels';
        } else if (msg.message.detected.lang == 'nl') {
          dLang = 'Nederlands';
        }
        if (msg.message.langSetting == 'en') {
          sLang = 'Engels';
        } else if (msg.message.langSetting == 'nl') {
          sLang = 'Nederlands';
        }
        chrome.notifications.create(
          'incorrect-language',
          {
            title: 'Waarschijnlijk foutieve taal instelling',
            message: `De taal van deze website staat ingesteld in het ${sLang}, ik heb ${dLang} gedetecteerd.`,
            type: 'basic',
            // buttons: buttons,
            iconUrl: 'icons/icon128.png',
          },
          function () {
            console.log('ik ben een callback'); // dit logt
          }
        );
        chrome.notifications.onButtonClicked.addListener((id, index) => {
          chrome.notifications.clear(id);
          console.log('You chose: ' + buttons[index].title);
        });
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

  // sendResponse({
  //   from: 'background',
  //   subject: 'verification',
  //   message: 'background has received message from popup',
  // });
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
  // document.addEventListener('keydown', function (event) {
  //   console.log(event);
  // });
  // if (command === 'toggle-feature-tabs') {
  //   // CMD/CTRL + SHIFT + I
  //   chrome.notifications.create(
  //     'ik ben een naam',
  //     {
  //       title: 'Dit is een test titel',
  //       message: 'Dit is een test.',
  //       type: 'basic',
  //       iconUrl:
  //         'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/How_to_use_icon.svg/1200px-How_to_use_icon.svg.png',
  //     },
  //     function () {
  //       console.log('ik ben een callback'); // dit logt
  //     }
  //   );
  // }
});

// chrome.notifications.create(notificationId?: String,
//    options: NotifcationOptions, callback: function)

function _getLangAlltabs() {
  chrome.tabs.query({ windowId: chrome.windows.WINDOW_ID_Current }, (tabs) => {
    tabs.forEach((_tab) => {
      // console.log(_tab);
      // console.log(_tab.id);
      chrome.tabs.detectLanguage(_tab.id, function (_language) {
        console.log({
          id: _tab.id,
          lang: _language,
          url: _tab.url,
        });
      });
    });
  });
  // chrome.tabs.detectLanguage(tabId, callback);
}
function _getLang(tabId) {
  return chrome.tabs.detectLanguage(tabId, function (l) {
    console.log(l);
    return l;
  });
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
    const detLang = _getLang(tabId);
    if (detLang == undefined) {
      console.log('detLang === und');
      chrome.tabs.query({ active: true }, function (tabs) {
        const msg = 'Cant detect language...';
        chrome.tabs.sendMessage(tabs[0].id, {
          from: 'background',
          subject: 'noLang',
          message: msg,
        });
      });
    }
  }
});
