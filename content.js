// --- NAV ---
// check if <header> exist
// function getHeader() {
//   const header = document.querySelector('header');
//   // ga ervan uit dat de 1e gevonden header element, de header is van de pagina
//   if (header) {
//     console.log({ State: 'header found', data: header });
//     navInHeader(header);
//   } else {
//     console.log({ State: 'header NOT found', data: null });
//     filterNavs();
//   }
// }
var gotHeader;
function getHeader() {
  const header = document.querySelector('header');
  if (header) {
    gotHeader = true;
    return navInHeader(header);
  } else {
    gotHeader = false;
    return getAllNavs();
  }
}

// check if <nav> exist in <header>
// function navInHeader(header) {
//   const navs = header.querySelectorAll('header nav');
//   if (navs.length > 0) {
//     console.log({ State: 'navs found in header', data: navs });
//   } else {
//     console.log({ State: 'navs NOT found in header', data: null });
//     filterNavs();
//   }
// }
function navInHeader(header) {
  const navs = header.querySelectorAll('header nav');
  // false => ul in header
  return navs.length > 0 ? navs : getAllNavs();
}

// check if <nav> exist outside <header>
function getAllNavs() {
  const navs = document.querySelectorAll('nav');
  const arr = Array.from(navs);
  if (arr.length > 0) {
    return getFooterNavs(arr);
  } else if (gotHeader) {
    getUlInHeader();
  } else {
    getAllUls();
  }

  return arr.length > 0 ? getFooterNavs(arr) : null;
}

// get Navs in Footer
function getFooterNavs(allNavs) {
  const navsInFooter = document.querySelectorAll('footer nav');
  const arr = Array.from(navsInFooter);
  return arr.length > 0 ? filterNavs(allNavs, arr) : allNavs;
}

// filter out footer navs
function filterNavs(allNavs, footerNavs) {
  // https://stackoverflow.com/questions/34901593/how-to-filter-an-array-from-all-elements-of-another-array
  const filtered = allNavs.filter(function (e) {
    return this.indexOf(e) < 0;
  }, footerNavs);
  // null => give err
  return filtered.length > 0 ? filtered : null;
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

function getAllUls() {
  const uls = document.querySelectorAll('ul');
  const arr = Array.from(uls);
  // null => give error
  return arr.length > 0 ? checkUlForLinks(arr) : null;
}
function getUlInHeader() {
  const uls = document.querySelectorAll('header ul');
  const arr = Array.from(uls);
  return arr.length > 0 ? checkUlForLinks(arr) : getAllUls();
}
function checkUlForLinks(uls) {
  const filtered = uls.filter(function (ul) {
    const gotLinks = ul.querySelector('a');
    if (gotLinks) {
      return ul;
    }
  });
  // null => give error
  return filtered.length > 0 ? filtered : null;
}

function getUlInFooter() {
  const uls = document.querySelectorAll('footer ul');
  console.log(uls);
}

// 1. nav in header
// checkHeader() => checkHeaderNav()
// 2. nav outside header (and not in footer)
// checkHeader() => checkNav()
// 3. list in header
// checkHeader() => checkHeaderNav() => checkHeaderLinkList()
// 4. list outside header
// checkHeader() => checkNav() => checkLinkList()
function getMainNav() {
  const header = getHeader();

  console.log(header);
}
getMainNav();

function _getMainNav() {
  if (getHeader()) {
    if (navInHeader()) {
      console.log('navs in header');
    } else {
      if (filteredNavs()) {
        console.log('navs found on page, filtered out footer-navs');
      } else {
        const uls = getUlInHeader();
        const gotLinks = checkUlForLinks(uls);
        if (gotLinks) {
          console.log('Ul link list found in header');
        } else {
          const allUls = getAllUls();
          const _gotLinks = checkUlForLinks(allUls);
          if (_gotLinks) {
            console.log('found link list on page');
            // filter out footer ones
          } else {
            console.log("can't find navigation");
          }
        }
      }
    }
  } else {
    if (filteredNavs()) {
      console.log('found navs on page (filtered out the ones in the footer)');
    } else {
      const uls = getAllUls();
      const gotLinks = checkUlForLinks(uls);
      if (gotLinks) {
        console.log('found ul link list on page');
      } else {
        console.log("can't find navigation");
      }
    }
  }
}
// _getMainNav();

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
