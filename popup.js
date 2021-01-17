import { langList } from './langCodes.js';
var lang;

function getFullLang(langCode) {
  const langObj = langList.find((item) => {
    return item.code === langCode;
  });
  if (!langObj) {
    return null;
  } else {
    if (!langObj.Dutch) {
      return langObj.English;
    } else {
      return langObj.Dutch;
    }
  }
}

function setLanguage(fullLang) {
  document.getElementById('jsDisplayLang').textContent = fullLang;
  document.getElementById(
    'jsSrLang'
  ).textContent = `De taal van deze website staat momenteel ingesteld in het ${fullLang}.`;
}

const showLanguage = (_lang) => {
  console.log(`Var lang = ${lang}`);
  var full;
  // happens in popup
  if (typeof _lang === 'object' && _lang !== null) {
    console.log(
      `Detected language (from lang attr) got this language code: ${_lang.msg}.`
    );
    full = getFullLang(_lang.msg);
  } else {
    console.log(
      `Detected language (from detection) got this language code: ${_lang}.`
    );
    full = getFullLang(_lang);
  }
  console.log(full);
  // srSpeak(`De taal van de pagina is nu gewijzigd naar ${full}`);
  full
    ? setLanguage(full)
    : console.log('Error: no lang found (in showLanguage() in popup.js)');
};

function getLang(tabs) {
  chrome.tabs.detectLanguage(function (language) {
    if (language === 'und' || language === undefined) {
      // undefined
      console.log("Can't detect language...");
      lang = null;
      const msg = "We don't have the language...";
      // send msg from popup script to content script
      chrome.tabs.sendMessage(
        tabs[0].id,
        { from: 'popup', subject: 'language', message: msg },
        // do this when response comes through:
        showLanguage
      );
    } else {
      // is goood
      console.log(`Detected language is ${language}.`);
      lang = language;
      showLanguage(lang);
    }
  });
}

const setQuickNav = (info) => {
  // just to be sure that the extension doesn't completely breaks when info = undefined:
  if (info === null || info === undefined) {
    info = { footer: 0, header: 0, main: 0, nav: 0 };
    console.log(
      'Error: Something went wrong with sending information about the page from content Script to Popup Script. (setQuickNav())'
    );
  }

  const list = document.querySelector('.quicknav-ul');
  console.log(info);
  const entries = Object.entries(info);
  entries.forEach(function (entry) {
    if (entry[1] !== null) {
      const listItem = document.createElement('li');
      listItem.id = `listitem-${entry[0]}`;
      list.append(listItem);
      for (let index = 0; index < entry[1]; index++) {
        const btn = document.createElement('button');
        btn.id = `btn${entry[0]}${index + 1}`;
        btn.value = entry[0];
        const _listItem = document.getElementById(`listitem-${entry[0]}`);
        _listItem.append(btn);
        const _btn = document.getElementById(`btn${entry[0]}${index + 1}`);
        if (entry[0] === 'nav') {
          _btn.innerText = `Menu ${index + 1}`;
        }
        if (entry[0] === 'header') {
          _btn.innerText = 'Header';
        }
        if (entry[0] === 'main') {
          _btn.innerText = 'Hoofdgedeelte';
        }
        if (entry[0] === 'footer') {
          _btn.innerText = `Footer`;
        }
      }
    }
  });
  addQuickNavBtnsEventListeners();
};

window.addEventListener('DOMContentLoaded', () => {
  // getLang();
  // Get active tab
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (tabs) => {
      const msg = 'Hello from popup ✨';
      // send msg from popup script to content script
      chrome.tabs.sendMessage(tabs[0].id, {
        from: 'popup',
        subject: 'DOMInfo',
        message: msg,
      });
      getLang(tabs); // detect language of the page
      chrome.tabs.sendMessage(
        tabs[0].id,
        { from: 'popup', subject: 'pageInfo', message: 'Received page Info' },
        setQuickNav
      );
    }
  );
});

function addLangBtnsEventListener() {
  const langBtns = document.querySelectorAll('.details-lang-btns button');
  langBtns.forEach((item) =>
    item.addEventListener('click', function (e) {
      const langCode = e.target.value;
      console.log(langCode);
      changeLang(langCode);
      if (langCode === 'nl') {
        srSpeak('De taal van deze pagina is gewijzigd naar het Nederlands');
      } else if (langCode === 'en') {
        srSpeak('De taal van deze pagina is gewijzigd naar het Engels');
      }
    })
  );
}
addLangBtnsEventListener();

const changeLangVerification = (info) => {
  // happens in popup
  console.log('changeLanguageTo callback received');
  console.log(info);
};

function changeLang(langCode) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      from: 'popup',
      subject: 'changeLanguageTo',
      message: langCode,
    });
  });
  showLanguage(langCode);
}
function addQuickNavBtnsEventListeners() {
  const quickNavBtns = document.querySelectorAll('.details-quickNav button');
  quickNavBtns.forEach((item) =>
    item.addEventListener('click', function (e) {
      const value = e.target.value;
      // console.log(e.target.innerText);
      // console.log(value);
      sendFocusMsg(value);
      srSpeak(`${e.target.innerText} heeft nu focus`);
    })
  );
}
function sendFocusMsg(msg) {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (tabs) => {
      // send msg from popup script to content script
      chrome.tabs.sendMessage(tabs[0].id, {
        from: 'popup',
        subject: 'Focus',
        message: msg,
      });
    }
  );
}
function getTabs() {
  chrome.tabs.query({ windowId: chrome.windows.WINDOW_ID_Current }, (tabs) => {
    console.log(tabs);
    const filtered = tabs.map(function (tab) {
      return {
        title: tab.title || null,
        url: tab.url || null,
        active: tab.active || null,
        favIcon: tab.favIconUrl || null,
        id: tab.id || null,
        index: tab.index,
        muted: tab.mutedInfo || null,
        audible: tab.audible || null,
      };
    });
    setTabInfo(filtered);
  });
}
function setTabInfo(tabs) {
  const resultEl = document.querySelector('.tabs-ul');
  const startingTab = tabs.filter(function (tab) {
    return tab.active === true;
  });
  const startingIndex = startingTab[0].index;
  const startingId = startingTab[0].id;
  let amountSorted = 0;
  for (let index = startingIndex; index < tabs.length; index++) {
    console.log(tabs[index]);
    tabs[index].position = index - startingIndex;
    amountSorted++;
  }
  if (startingIndex !== 0 && startingIndex !== tabs.length - 1) {
    for (let index = 0; index < startingIndex; index++) {
      tabs[index].position = amountSorted;
    }
  }
  tabs.sort((a, b) => {
    return a.position - b.position;
  });
  tabs.forEach(function (item, index) {
    const listItem = document.createElement('li');
    listItem.id = `tabs-list-item-${index}`;
    resultEl.append(listItem);
    const btn = document.createElement('button');
    const mutedBtn = document.createElement('button');
    const closeBtn = document.createElement('button');
    btn.id = `tabs-btn-${index}`;
    mutedBtn.id = `tabs-mutedBtn-${index}`;
    closeBtn.id = `tabs-closeBtn-${index}`;
    btn.setAttribute('name', 'open');
    btn.value = item.id;
    btn.setAttribute('data-tabid', item.id);
    mutedBtn.setAttribute('name', 'muted');
    closeBtn.setAttribute('name', 'close');
    closeBtn.value = item.id;
    closeBtn.setAttribute('data-tabid', item.id);

    const resultListItem = document.getElementById(`tabs-list-item-${index}`);
    resultListItem.append(btn);
    resultListItem.append(mutedBtn);
    resultListItem.append(closeBtn);
    const appendedBtn = document.getElementById(`tabs-btn-${index}`);
    // if page is in English (or another language other then Dutch) set lang attr to that lang
    appendedBtn.setAttribute('aria-label', item.title);
    const appendedMutedBtn = document.getElementById(`tabs-mutedBtn-${index}`);
    const appendedCloseBtn = document.getElementById(`tabs-closeBtn-${index}`);

    // we want: icon <> title <> muted
    // so we will append icon first, then title, and lastly muted

    if (item.favIcon !== null) {
      const img = document.createElement('img');
      img.setAttribute('src', item.favIcon);
      img.setAttribute('alt', '');
      appendedBtn.append(img);
    } else {
      const placeholder = document.createElement('img');
      placeholder.setAttribute('src', '/popup-icons/tabs.svg');
      placeholder.setAttribute('alt', '');
      appendedBtn.append(placeholder);
    }

    const titleSpan = document.createElement('span');
    titleSpan.id = `tab-title-${index}`;
    appendedBtn.append(titleSpan);
    const appendedTitle = document.getElementById(`tab-title-${index}`);
    appendedBtn.setAttribute('aria-label', 'Open dit tabblad');
    appendedTitle.innerText = item.title;
    // appendedTitle.setAttribute('role', 'presentation');

    if (item.muted.muted) {
      // change this to an icon with alt
      // if tab is muted (true) then we want to send false to the background Script
      // because we want to unmute the page (and vice versa)
      appendedMutedBtn.value = false;
      appendedMutedBtn.setAttribute('data-tabid', item.id);
      const mutedIcon = document.createElement('img');
      mutedIcon.setAttribute('src', '/popup-icons/mute.svg');
      appendedMutedBtn.setAttribute(
        'aria-label',
        'Dit tabblad is gedempt, druk om dempen op te heffen'
      );
      mutedIcon.setAttribute('alt', '');
      mutedIcon.setAttribute('role', 'presentation');
      appendedMutedBtn.append(mutedIcon);
    } else {
      // audio icon with alt
      appendedMutedBtn.value = true;
      appendedMutedBtn.setAttribute('data-tabid', item.id);
      const unmutedIcon = document.createElement('img');
      unmutedIcon.setAttribute('src', '/popup-icons/audio.svg');
      appendedMutedBtn.setAttribute(
        'aria-label',
        'Dit tabblad is niet gedempt, druk om te dempen'
      );
      unmutedIcon.setAttribute('alt', '');
      unmutedIcon.setAttribute('role', 'presentation');
      appendedMutedBtn.append(unmutedIcon);
    }
    const closeIcon = document.createElement('img');
    closeIcon.setAttribute('src', '/popup-icons/cancel.svg');
    closeIcon.setAttribute('role', 'presentation');
    // closeIcon.setAttribute('alt', 'Sluit dit tabblad');
    appendedCloseBtn.setAttribute(
      'aria-label',
      'Druk om dit tabblad te sluiten'
    );
    appendedCloseBtn.append(closeIcon);
  });
  // console.log(startingId);
  addEventsToTabs(startingId);
}
getTabs();
function addEventsToTabs(startingId) {
  const tabsList = document.querySelectorAll('ul.tabs-ul li');
  tabsList.forEach(function (listItem) {
    const btns = listItem.querySelectorAll('button');
    btns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        const msg = {
          name: this.name,
          value: this.value,
          tabId: this.dataset.tabid,
        };
        console.log(msg);
        sendTabTasks(msg, btn, startingId);
      });
    });
  });
}
function srSpeak(text, priority) {
  // https://a11y-guidelines.orange.com/en/web/components-examples/make-a-screen-reader-talk/
  var el = document.createElement('div');
  var id = 'speak-' + Date.now();
  el.id = id;
  el.setAttribute('aria-live', 'polite');
  el.classList.add('sr-only');
  document.body.appendChild(el);
  window.setTimeout(function () {
    document.getElementById(id).innerHTML = text;
  }, 100);

  window.setTimeout(function () {
    document.body.removeChild(document.getElementById(id));
  }, 1000);
}
function sendTabTasks(msg, btn, startingId) {
  chrome.runtime.sendMessage(
    { from: 'popup', subject: 'tabTask', message: msg },
    function (res) {
      const _tabId = Number(res.message);
      if (res.subject === 'muted') {
        if (res.message.muted) {
          btn.value = false;
          const img = btn.querySelector('img');
          img.setAttribute('src', './popup-icons/mute.svg');
          srSpeak('Dit tabblad is nu gedempt');
        } else {
          btn.value = true;
          const img = btn.querySelector('img');
          img.setAttribute('src', './popup-icons/audio.svg');
          srSpeak('Dit tabblad is nu niet gedempt');
        }
        res.message.muted ? (btn.value = false) : (btn.value = true);
        // => {name: muted, muted: true, tabId: #}
        // when muted = true, the tab is muted and the value of the button has to be changed
        // to false (and vice verca)
      } else if (res.subject === 'close' && _tabId != startingId) {
        const parent = btn.parentNode;
        parent.remove();
        srSpeak('Het tabblad is gesloten');
      }
    }
  );
}
// function onLanguageDetected(url, lang) {
//   console.log(`Language in ${url} is: ${lang}`);
// }

// function onError(error) {
//   console.log(`Error: ${error}`);
// }

// function detectLanguages(tabs) {
//   for (tab of tabs) {
//     var onFulfilled = onLanguageDetected.bind(null, tab.url);
//     var detecting = browser.tabs.detectLanguage(tab.id);
//     detecting.then(onFulfilled, onError);
//   }
// }

// // onclicked doesn't work when you have a popup
// browser.browserAction.onClicked.addListener(function () {
//   var querying = browser.tabs.query({});
//   querying.then(detectLanguages, onError);
// });
