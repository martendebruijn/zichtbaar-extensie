let pageInfo = {
  header: null,
  nav: null,
  main: null,
  footer: null,
};

// --- NAV ---
function getMainNav() {
  const header = document.querySelector('header');
  if (header) {
    pageInfo.header = header;
    navInHeader(header);
  } else {
    getAllNavs(false);
  }

  return header ? navInHeader(header) : getAllNavs(false);
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
    return filterUls(filtered);
  } else {
    return noNav();
  }
}
// filter out uls inside articles
// for medium.com: filter out ul a[href="/tag/..."]
function getArticleUls(allUls) {
  const ulsInArticle = document.querySelectorAll('article ul');
  const arr = Array.from(ulsInArticle);
  return arr.length > 0 ? filterUl(allUls, arr) : allUls;
}
function filterUls(allUls) {
  const filtered = getFooterUls(allUls);
  return getArticleUls(filtered);
}
function getFooterUls(allUls) {
  const ulsInFooter = document.querySelectorAll('footer ul');
  const arr = Array.from(ulsInFooter);
  return arr.length > 0 ? filterUl(allUls, arr) : allUls;
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
    // check if width / height === 0 => not visible
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
function addTabIndex() {
  const navs = removeHidden();
  pageInfo.nav = navs;
  console.log(navs);
  if (navs.length >= 1) {
    navs.forEach(function (nav) {
      nav.setAttribute('tabindex', 0);
    });
  }
}
addTabIndex();

// --- HEADER ---
console.log(pageInfo);
function makeHeaderFocusable() {
  if (pageInfo.header !== null) {
    pageInfo.header.setAttribute('tabindex', 0);
  }
}
makeHeaderFocusable();
// --- MAIN ---
function getMain() {
  const mains = document.querySelectorAll('main');
  console.log(mains);
  // filter out article ones
  if (mains.length >= 1) {
    pageInfo.main = mains;
  }
}
getMain();
function makeMainFocusable() {
  if (pageInfo.main !== null) {
    pageInfo.main[0].setAttribute('tabindex', 0);
  }
}
makeMainFocusable();
// --- FOOTER ---
function getFooter() {
  const footers = document.querySelectorAll('footer');
  console.log(footers);
  // filter out article ones
  pageInfo.footer = footers;
}
getFooter();
function makeFooterFocusable() {
  if (pageInfo.footer !== null) {
    pageInfo.footer[0].setAttribute('tabindex', 0);
  }
}
makeFooterFocusable();

// --- ARTICLES ---
function getArticles() {
  const articles = document.querySelectorAll('article');
  console.log(articles);
}
getArticles();
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
function sendHello() {
  const msg = 'Hello from content Script ⚡';
  chrome.runtime.sendMessage(
    { from: 'content', subject: 'inital', message: msg },
    function (response) {
      console.log(response);
    }
  );
}
sendHello();

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
  if (msg.from === 'popup' && msg.subject === 'pageInfo') {
    console.log(msg);
    // cannot read property length of null (this works, but is ugly => refactor)
    if (pageInfo.nav === null) {
      pageInfo.nav = [];
    }
    if (pageInfo.header === null) {
      pageInfo.header = [];
    }
    if (pageInfo.main === null) {
      pageInfo.main = [];
    }
    if (pageInfo.footer === null) {
      pageInfo.footer = [];
    }
    const _pageInfo = {
      nav: pageInfo.nav.length || null,
      header: pageInfo.header.length || null,
      main: pageInfo.main.length || null,
      footer: pageInfo.footer.length || null,
    };
    sendResponse(_pageInfo);
    console.log({ pageInfo: pageInfo, _pageInfo: _pageInfo });
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
    console.log(`lang = ${lang}`);
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
  if (msg.from === 'popup' && msg.subject === 'Focus') {
    console.log(msg);
    if (msg.message === 'nav') {
      pageInfo.nav[0].focus();
    }
    if (msg.message === 'header') {
      pageInfo.header.focus();
    }
    if (msg.message === 'main') {
      pageInfo.main[0].focus();
    }
    if (msg.message === 'footer') {
      pageInfo.footer[0].focus();
    }
  }
});
