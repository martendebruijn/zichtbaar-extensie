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
  document.getElementById('jsSrLang').textContent = fullLang;
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
  console.log('asidjklaslk');
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
        btn.setAttribute('value', entry[0]);
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
      console.log(value);
      sendFocusMsg(value);
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
// chrome.tabs.query({ windowId: chrome.windows.WINDOW_ID_CURRENT }, (tabs) => {
//   console.log(tabs);
//   document.write(`<h3>The tabs you're on are:</h3>`);
//   document.write('<ul>');
//   for (let i = 0; i < tabs.length; i++) {
//     document.write(`<li>${tabs[i].url}</li>`);
//   }
//   document.write('</ul>');
// });

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
        index: tab.index || null,
        muted: tab.mutedInfo || null,
        audible: tab.audible || null,
      };
    });
    setTabInfo(filtered);
  });
}
function setTabInfo(tabs) {
  const resultEl = document.querySelector('.tabs-ul');
  tabs.forEach(function (item, index) {
    const listItem = document.createElement('li');
    listItem.id = `tabs-list-item-${index}`;
    resultEl.append(listItem);
    const btn = document.createElement('button');
    btn.id = `tabs-btn-${index}`;
    const resultListItem = document.getElementById(`tabs-list-item-${index}`);
    resultListItem.append(btn);
    const appendedBtn = document.getElementById(`tabs-btn-${index}`);
    // we want: icon <> title <> muted
    // so we will append icon first, then title, and lastly muted

    if (item.favIcon !== null) {
      const img = document.createElement('img');
      img.setAttribute('src', item.favIcon);
      img.setAttribute('alt', "''");
      appendedBtn.append(img);
    } else {
      const placeholder = document.createElement('img');
      placeholder.setAttribute('src', '/popup-icons/flash.svg');
      placeholder.setAttribute('alt', "''");
      appendedBtn.append(placeholder);
    }

    const titleSpan = document.createElement('span');
    titleSpan.id = `tab-title-${index}`;
    appendedBtn.append(titleSpan);
    const appendedTitle = document.getElementById(`tab-title-${index}`);
    appendedTitle.innerText = item.title;

    if (item.muted.muted) {
      // change this to an icon with alt
      const mutedIcon = document.createElement('img');
      mutedIcon.setAttribute('src', '/popup-icons/flash.svg');
      mutedIcon.setAttribute('alt', "'Dit tabblad is gemuted.'");
      appendedBtn.append(mutedIcon);
    } else {
      // audio icon with alt
      const unmutedIcon = document.createElement('img');
      unmutedIcon.setAttribute('src', '/popup-icons/flash.svg');
      unmutedIcon.setAttribute('alt', "'Dit tabblad mag audio afspelen.'");
      appendedBtn.append(unmutedIcon);
    }
  });
}
getTabs();
// active: true
// audible: false
// autoDiscardable: true
// discarded: false
// favIconUrl: "https://www.blokker.nl/on/demandware.static/Sites-blokker-nl-Site/-/default/dwc2dbeef3/images/favicon/favicon.ico"
// height: 689
// highlighted: true
// id: 256
// incognito: false
// index: 3
// mutedInfo: {muted: false}
// pinned: false
// selected: true
// status: "complete"
// title: "Welkom bij Blokker, de huishoudwinkel van Nederland"
// url: "https://www.blokker.nl/"
// width: 1280
// windowId: 1
