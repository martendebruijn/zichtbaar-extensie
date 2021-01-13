// --- NAV ---
function getMainNav() {
  const header = document.querySelector('header');
  if (header) {
    gotHeader = true;
    return navInHeader(header);
  } else {
    gotHeader = false;
    return getAllNavs(false);
  }
}
function navInHeader(header) {
  const navs = header.querySelectorAll('header nav');
  return navs.length > 0 ? navs : getAllNavs(true);
}
function getAllNavs(scopeHeader) {
  const navs = document.querySelectorAll('nav');
  const arr = Array.from(navs);
  if (arr.length > 0) {
    return getFooterNavs(arr);
  } else if (scopeHeader) {
    return getUlInHeader();
  } else {
    return getAllUls();
  }
}
function getFooterNavs(allNavs) {
  const navsInFooter = document.querySelectorAll('footer nav');
  const arr = Array.from(navsInFooter);
  return arr.length > 0 ? filterNavs(allNavs, arr) : allNavs;
}
function filterNavs(allNavs, footerNavs) {
  // Source: https://stackoverflow.com/questions/34901593/how-to-filter-an-array-from-all-elements-of-another-array
  const filtered = allNavs.filter(function (e) {
    return this.indexOf(e) < 0;
  }, footerNavs);
  return filtered.length > 0 ? filtered : noNav();
}
function getAllUls() {
  const uls = document.querySelectorAll('ul');
  const arr = Array.from(uls);
  return arr.length > 0 ? checkUlForLinks(arr, false) : noNav();
}
function getUlInHeader() {
  const uls = document.querySelectorAll('header ul');
  const arr = Array.from(uls);
  return arr.length > 0 ? checkUlForLinks(arr, true) : getAllUls();
}
function checkUlForLinks(uls, scopeHeader) {
  const filtered = uls.filter(function (ul) {
    const gotLinks = ul.querySelector('a');
    if (gotLinks) return ul;
  });

  if (filtered.length > 0 && scopeHeader) {
    return filtered;
  } else if (filtered.length === 0 && scopeHeader) {
    return getAllUls();
  } else if (filtered.length > 0 && !scopeHeader) {
    return filterUl();
  }
}
function getFooterUls(allUls) {
  const ulsInFooter = document.querySelectorAll('footer ul');
  const arr = Array.from(ulsInFooter);
  return arr.length > 0 ? filterUl(ulsInFooter, arr) : allUls;
}
function filterUl(uls, footerUls) {
  const filtered = uls.filter(function (e) {
    return this.indexOf(e) < 0;
  }, footerUls);
  return filtered.length > 0 ? filtered : noNav();
}
function noNav() {
  console.log("Can't find navigation...");
}
function removeHidden() {
  const mainNav = getMainNav();
  let index = mainNav.length - 1;
  while (index >= 0) {
    var style = window.getComputedStyle(mainNav[index]);
    let display = style.getPropertyValue('display'),
      visibility = style.getPropertyValue('visibility'),
      opacity = style.getPropertyValue('opacity');
    if (display === 'none' || visibility === 'hidden' || opacity === 0) {
      mainNav.splice(index, 1);
    }
    index -= 1;
  }
  return mainNav;
}
const __nav = removeHidden();
console.log(__nav[0]);
__nav[0].focus();
// .focus() only works when the element is focusable.
//  to make a non-focusable element focusable we have to use tabindex SO =>
// first check tabindex (why? if we want it to be focusable, it is going to be focusable)
// add/change tabindex (tabindex = -1 , i believe?)

// --- LANGUAGE ---
function getLang() {
  const htmlTag = document.querySelector('html');
  const lang = htmlTag.getAttribute('lang');
  return lang;
}

function setLang(langCode) {
  const htmlTag = document.querySelector('html');
  htmlTag.setAttribute('lang', langCode);
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
  if (msg.from === 'popup' && msg.subject === 'changeLanguageTo') {
    console.log(msg);
    // change lang attr
    setLang(msg.message);
  }
});
