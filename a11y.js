console.clear();
console.log('a11y.js is activated'); // logs in main website console

// const allNavs = document.querySelectorAll('nav');
// console.log(allNavs);

// UTILITY FUNCTIONS

function make(element) {
  return document.createElement(element);
}

function getPopup() {
  return document.getElementById('zichtbaar-popup');
}

function setId(element, id) {
  return element.setAttribute('id', `zichtbaar-${id}`);
}

function getElementInsidePopupById(id) {
  return document.getElementById(`zichtbaar-${id}`);
}

function checkPopup() {
  const popup = getPopup();
  return popup ? true : false;
}

// --------

function createPopup() {
  // prevent for creating a new one when there is already one
  const popupExists = checkPopup();
  if (!popupExists) {
    const div = make('div');
    setId(div, 'popup');
    div.style.height = '100vh';
    div.style.width = '300px';
    div.style.backgroundColor = 'rgba(170, 170, 170, .5)';
    div.style.position = 'fixed';
    div.style.top = '0';
    div.style.left = '0';
    div.style.zIndex = '99999999';
    document.body.append(div);
  }
}

function getLang() {
  const htmlTag = document.querySelector('html');
  const lang = htmlTag.getAttribute('lang');
  return lang;
}

function checkLang() {
  // language array = options
  const langShort = getLang();
  var langFull;
  // console.log(options);
  options['langList'].forEach((langObj) => {
    if (langShort === langObj.alpha2) {
      langFull = langObj.English;
    }
  });
  return langFull;
}

function notifyLang() {
  const popup = getPopup();
  const div = make('div');
  setId(div, 'lang');
  popup.append(div);

  const langDiv = getElementInsidePopupById('lang');
  const p = make('p');
  const lang = checkLang();
  p.innerText = `Deze pagina staat ingesteld in het ${lang}.`;
  langDiv.append(p);
}

function renderLangOptions() {
  const popup = getPopup();
  const div = make('div');
  setId(div, 'langOptions');
  popup.append(div);

  const langOptions = getElementInsidePopupById('langOptions');
  const btnEn = make('button');
  const btnNl = make('button');
  btnEn.innerText = 'Engels';
  btnNl.innerText = 'Nederlands';
  langOptions.append(btnEn);
  langOptions.append(btnNl);
}

function createFavoriteLang() {
  const htmlTag = document.querySelector('html');
  const popup = getPopup();
  const div = make('div');
  setId(div, 'langFavorites');
  popup.append(div);

  const langFavElement = getElementInsidePopupById('langFavorites');
  const title = make('h2');
  title.innerText = 'Favoriete talen';
  langFavElement.append(title);

  options['langFav'].forEach(function (lang) {
    const btn = make('button');
    btn.setAttribute('type', 'button');
    btn.innerText = lang.full;
    btn.value = lang.short;
    btn.addEventListener('click', function (e) {
      console.log('you pressed a btn');
      // change html lang
      const chosenLang = e.target.value;
      htmlTag.setAttribute('lang', chosenLang);
      console.log('HTML language is changed to ' + chosenLang);
      // change lang in popup
      const msg = document.querySelector('#zichtbaar-lang > p');
      msg.innerText = `De taal van deze pagina is gewijzigd naar ${chosenLang}.`;
    });
    langFavElement.append(btn);
  });
}

function init() {
  createPopup();
  notifyLang();
  createFavoriteLang();
}

init();
