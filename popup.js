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
  if (_lang.msg) {
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

const setDOMInfo = (info) => {
  // happens in popup
  console.log('Ik heb iets gedaan');
  console.log(info);
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
        { from: 'popup', subject: 'DOMInfo', message: msg },
        // do this when response comes through:
        setDOMInfo
      );
      getLang(tabs); // detect language of the page
    }
  );
});
