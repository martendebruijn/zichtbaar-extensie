// --- NAV ---
// check if <header> exist
function getHeader() {
  const header = document.querySelector('header');
  // ga ervan uit dat de 1e gevonden header element, de header is van de pagina
  if (header) {
    console.log({ State: 'header found', data: header });
    navInHeader(header);
  } else {
    console.log({ State: 'header NOT found', data: null });
    filterNavs();
  }
}
getHeader();

// check if <nav> exist in <header>
function navInHeader(header) {
  const navs = header.querySelectorAll('header nav');
  if (navs.length > 0) {
    console.log({ State: 'navs found in header', data: navs });
  } else {
    console.log({ State: 'navs NOT found in header', data: null });
    filterNavs();
  }
}

// check if <nav> exist outside <header>
function getAllNavs() {
  const navs = document.querySelectorAll('nav');
  const arr = Array.from(navs);
  return arr.length > 0 ? arr : null;
}

function getFooterNavs() {
  const navsInFooter = document.querySelectorAll('footer nav');
  const arr = Array.from(navsInFooter);
  return arr.length > 0 ? arr : null;
}

function filterNavs() {
  const navs = getAllNavs();
  if (navs) {
    const footerNavs = getFooterNavs();
    if (footerNavs) {
      // https://stackoverflow.com/questions/34901593/how-to-filter-an-array-from-all-elements-of-another-array
      const filtered = navs.filter(function (e) {
        return this.indexOf(e) < 0;
      }, footerNavs);
      console.log({
        State: 'navs found on page, filtered out footer navs',
        data: filtered,
      });
    } else {
      console.log({
        State: 'no navs found in footer',
        data: null,
      });
    }
  } else {
    console.log({
      State: 'no navs found',
      data: null,
    });
  }
}

// get footers elements
function getFooters() {
  const footers = document.querySelectorAll('footer');
  if (footers.length < 2) {
    console.log({ State: 'one footer found', data: footers });
  } else {
    console.log({ State: 'multiple footers found', data: footers });
    // check which one is the one of the page
    // commonly the one at the bottom / not inside an article
  }
}

// 1. nav in header
// checkHeader() => checkHeaderNav()
// 2. nav outside header (and not in footer)
// checkHeader() => checkNav()
// 3. list in header
// checkHeader() => checkHeaderNav() => checkHeaderLinkList()
// 4. list outside header
// checkHeader() => checkNav() => checkLinkList()
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
