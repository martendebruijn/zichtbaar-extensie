# zichtbaar-extentie

# Architecture

- Manifest

    `manifest.json` is het bestand waar alle informatie opgeslagen staat.

    - `manifest_version` = versie van manifest
    - `name` = naam van de extensie
    - `version` = versie van de extensie
    - `description` = beschrijving van de extensie
    - `short_name` = verkorte naam als er te weinig ruimte is om de volledige naam weer te geven
    - `permissions` = array met waar de extensie toegang tot moet hebben
    - `background` = url naar background script
    - `options_page` = url naar de options pagina
    - `browser_action` = ...
        - `default_title` = tekst die zichtbaar is in de tooltip als men over de extensie hovert
        - `default_popup` = url naar de popup pagina
        - `default_icon` = Object met te gebruiken icons (16, 32 en 128) zijn verplicht

    ```json
    {
        "manifest_version": 2,
        "name": "Zichtbaar.net",
        "version": "1.0.0",
        "description": "This is a sample description",
        "short_name": "Zichtbaar",
        "permissions": [
            "activeTab",
            "declarativeContent",
            "storage"
        ],
        "background": {
            "scripts": [
                "background.js"
            ],
            "persistent": false
        },
        "options_page": "options.html",
        "browser_action": {
            "default_title": "Does a thing when you do a thing",
            "default_popup": "popup.html",
            "default_icon": {
                "16": "icons/favicon-16x16.png",
                "32": "icons/favicon-32x32.png",
                "96": "icons/favicon-96x96.png",
                "57": "icons/apple-icon-57x57.png",
                "60": "icons/apple-icon-60x60.png",
                "72": "icons/apple-icon-72x72.png",
                "76": "icons/apple-icon-76x76.png",
                "114": "icons/apple-icon-114x114.png",
                "120": "icons/apple-icon-120x120.png",
                "144": "icons/apple-icon-144x144.png",
                "152": "icons/apple-icon-152x152.png",
                "180": "icons/apple-icon-180x180.png",
                "192": "icons/android-icon-192x192.png"
            }
        }
    }
    ```

- Background Script

    In het background script kan men verschillende taken beschrijven, zoals het aanmaken van variabelen in de storage API.

    Dit stond in de Google Extentions docs, weet niet precies wat het doet.

    ```jsx
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([
          {
            conditions: [
              new chrome.declarativeContent.PageStateMatcher({
                pageUrl: { hostEquals: 'developer.chrome.com' },
              }),
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()],
          },
        ]);
      });
    });
    ```

- Popup page

    De popup pagina is de pagina (pop-up) die opent wanneer de gebruiker op de extensie in de Chrome bar drukt.

    De pagina wordt geschreven in HTML. Links naar stylesheets en scripts werken.

- Options page

    De options page is de pagina die weergegeven wordt wanneer men bij 'extenties beheren' → 'details' bij de extentie → 'Opties voor extenties'.

    Op deze pagina kan de gebruiker de extensie aanpassen.

- Development

    Om een Chrome extensie te bouwen moet men op de extensie beheer pagina van Chrome 'Ontwikkelaarmodus' aanzetten. Vervolgens kan men een extensie toevoegen door op 'Uitgepakte extensie laden'. Iedere keer als er veranderingen zijn gemaakt moet men de extentie herladen.

    ## Loggen

    Iedere pagina heeft haar eigen console. De volgende hebben hun eigen console:

    - background.js
    - popup page
    - options page
    - Scripts die in de website omgeving afspeelt loggen in de console van de website.

---

# Send JS code from popup to website

## Activate a file

```jsx
function connectJS(file) {
  // connect a JS file
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
      file: file,
    });
  });
}
// hierbij moet het JS bestand in dezelfde folder staan.
// Anders moet de link aangepast worden, FE:
// file: `./scripts/${file}`
```

## Send code

Dit probeer ik niet te doen, omdat alle code in een string moet staan. Het kan wel, maar durf niet met zekerheid hier nu een voorbeeld van te geven.

## Activate a file with options

```jsx
function connectJSwithOptions(options, file) {
  // connect a JS file with data ('options')
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {
        code: 'const options = ' + JSON.stringify(options),
      },
      function () {
        chrome.tabs.executeScript({
          file: file,
        });
      }
    );
  });
}
// hierbij kan men data meesturen door deze als options mee te geven
// hierbij moet het JS bestand in dezelfde folder staan.
// Anders moet de link aangepast worden, FE:
// file: `./scripts/${file}`
```

## Linking a11y.js

**popup.js**

```jsx
import { langList } from './lang.js';
...
connectJSwithOptions(langList, 'a11y.js');
```

**popup.html**

```html
<script type="module" src="lang.js"></script>
<script type="module" src="popup.js"></script>
```

**lang.js**

```jsx
export const langList = [
  {
    alpha2: 'aa',
    English: 'Afar',
  },
  {
    alpha2: 'ab',
    English: 'Abkhazian',
  },
  {
    alpha2: 'ae',
    English: 'Avestan',
  },
...
];
```

---

# Welcome message

Aan de hand van de tijd en de naam van de gebruiker wordt er een welkomstbericht weergegeven in de popup.

**Popup.html**

```html
<p><span id="welcomeMsg">Welkom</span><span id="userName"></span>!</p>
```

**Popup.js**

- welcomeMessage

    ```jsx
    function welcomeMessage() {
      getTime();
      getUser();
    }
    ```

- getTime

    ```jsx
    function getTime() {
      const currentDate = new Date();
      const time = currentDate.toLocaleTimeString(); // => 13:01:42
      const welcomeMsg = document.getElementById('welcomeMsg');
      if (time >= '17:00:00') {
        welcomeMsg.innerText = 'Goedemorgen ';
      } else if (time >= '12:00:00') {
        welcomeMsg.innerText = 'Goedemiddag ';
      } else if (time >= '06:00:00') {
        welcomeMsg.innerText = 'Goedeavond ';
      } else if (time >= '00:00:00') {
        welcomeMsg.innerText = 'Goedenacht ';
      }
    }
    ```

- getUser

    ```jsx
    function getUser() {
      const username = document.getElementById('userName');
      chrome.storage.sync.get('user', function (data) {
        // gets username
        if (data.user) {
          // if username exist do:
          username.innerText = data.user; // insert username in popup
        } else {
          username.remove(); // if username doesn't exist (null) => remove span#userName
        }
      });
    }
    ```

**Background.js**

```jsx
chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.get('user', function (data) {
    // set only user to null when it hasen't been changed
    // don't know if I need this <> it could just been reset because I updated the extention
    if (!data.user) {
      chrome.storage.sync.set({ user: null });
    }
  });

...

});
```

**Options**

- HTML

    ```html
    <form action="">
                    <label for="username">Set username:</label>
                    <input type="text" name="username" id="username" required autocomplete="off" pattern="^[A-Za-z]+(?:\s[A-Za-z]+)*" placeholder="John Doe">
                    <input type="submit" value="submit">

                    <ul class="hints">
                        <p>Toegestane tekens:</p>
                        <li>a-z of A-Z</li>
                        <li>spatie</li>
                    </ul>
                </form>
    ```

- JS

    ```jsx
    function changeUsername() {
      const form = document.querySelector('form');
      const usernameInput = document.getElementById('username');
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = usernameInput.value; // get username
        chrome.storage.sync.set({ user: name }); // sets username in storage
        alert('Username succesfully changed!'); // temporarly success feedback
      });
    }
    changeUsername();
    ```

- CSS

    ```css
    #username:valid {
      /* makes input green when input is valid */
      background: lightgreen;
    }

    #username:not(:placeholder-shown):invalid {
      /* makes input red if input is invalid and the placeholder is not shown */
      background: lightcoral;
    }

    .hints {
      /* hide the hints by default */
      display: none;
    }

    #username:not(:placeholder-shown):invalid ~ ul {
      /* show hints when input is invalid and placeholder is not shown */
      display: block;
    }
    ```

---

# a11y.js

```jsx
function init() {
  createPopup();
  notifyLang();
  renderLangOptions();
}

init();
```

## Utility functions

### Create element

```jsx
function make(element) {
  return document.createElement(element);
}
```

### Get popup

```jsx
function getPopup() {
  return document.getElementById('zichtbaar-popup');
}
```

### Check if popup exists

```jsx
function checkPopup() {
  const popup = getPopup();
  return popup ? true : false;
}
```

### Set ID

```jsx
function setId(element, id) {
  return element.setAttribute('id', `zichtbaar-${id}`);
}
```

### Get element inside popup with ID

```jsx
function getElementInsidePopupById(id) {
  return document.getElementById(`zichtbaar-${id}`);
}
```

## Create pop-up

```jsx
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
    document.body.append(div);
  }
}
```

## Language

### getLang

```jsx
function getLang() {
  const htmlTag = document.querySelector('html');
  const lang = htmlTag.getAttribute('lang');
  return lang;
}
```

### checkLang

```jsx
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
```

### notifyLang

```jsx
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
```

---

# Source dump

- [https://css-tricks.com/how-to-build-a-chrome-extension/](https://css-tricks.com/how-to-build-a-chrome-extension/)
- [https://developer.chrome.com/docs/extensions/mv2/getstarted/](https://developer.chrome.com/docs/extensions/mv2/getstarted/)
- [https://developer.chrome.com/docs/extensions/mv2/getstarted/](https://developer.chrome.com/docs/extensions/mv2/getstarted/)
- [https://www.toptal.com/software/definitive-guide-to-datetime-manipulation#:~:text=Getting the Current Time Stamp,passed since January 1%2C 1970](https://www.toptal.com/software/definitive-guide-to-datetime-manipulation#:~:text=Getting%20the%20Current%20Time%20Stamp,passed%20since%20January%201%2C%201970)
- lang list: [https://datahub.io/core/language-codes](https://datahub.io/core/language-codes)
- [https://csvjson.com/](https://csvjson.com/)
- [https://codyhouse.co/blog/post/accessible-language-picker](https://codyhouse.co/blog/post/accessible-language-picker) -->