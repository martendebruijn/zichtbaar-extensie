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
  console.log('Setting quick nav...');
  console.log(info);
  const list = document.querySelector('.quicknav-ul');
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
        _btn.innerText = entry[0];
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
      chrome.tabs.sendMessage(
        tabs[0].id,
        { from: 'popup', subject: 'DOMInfo', message: msg }
        // do this when response comes through:
        // setDOMInfo
      );
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
// addQuickNavBtnsEventListeners();
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
