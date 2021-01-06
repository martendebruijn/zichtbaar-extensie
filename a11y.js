console.clear();
console.log('a11y.js is activated'); // logs in main website console

// const allNavs = document.querySelectorAll('nav');
// console.log(allNavs);

function make(element) {
  return document.createElement(element);
}

function checkPopup() {
  const div = document.getElementById('zichtbaar-popup');
  return div ? true : false;
}

function createPopup() {
  // prevent for creating a new one when there is already one
  const popupExists = checkPopup();
  if (!popupExists) {
    const div = make('div');
    div.setAttribute('id', 'zichtbaar-popup');
    div.style.height = '100vh';
    div.style.width = '300px';
    div.style.backgroundColor = 'rgba(170, 170, 170, .5)';
    div.style.position = 'fixed';
    div.style.top = '0';
    div.style.left = '0';
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
  options.forEach((langObj) => {
    if (langShort === langObj.alpha2) {
      langFull = langObj.English;
    }
  });
  return langFull;
}

function notifyLang() {
  const popup = document.getElementById('zichtbaar-popup');
  const div = make('div');
  div.setAttribute('id', 'zichtbaar-lang');
  popup.append(div);

  const langDiv = document.getElementById('zichtbaar-lang');
  const p = make('p');
  const lang = checkLang();
  p.innerText = `Deze pagina staat ingesteld in het ${lang}.`;
  langDiv.append(p);
}

function renderLangOptions() {
  const popup = document.getElementById('zichtbaar-popup');
  const div = make('div');
  div.setAttribute('id', 'zichtbaar-langOptions');
  popup.append(div);

  const langOptions = document.getElementById('zichtbaar-langOptions');
  const btnEn = make('button');
  const btnNl = make('button');
  btnEn.innerText = 'Engels';
  btnNl.innerText = 'Nederlands';
  langOptions.append(btnEn);
  langOptions.append(btnNl);
}

createPopup();
notifyLang();
renderLangOptions();
