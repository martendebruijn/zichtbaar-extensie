# zichtbaar-extensie

<div style="display:flex;">
  <img src="https://img.shields.io/github/license/martendebruijn/zichtbaar-extentie" />
</div>

## Introduction
This Chrome extension is part of my ([Marten de Bruijn](https://marten.work/)) graduation project of Communication Multimedia and Design @Avans university of applied science, Breda. This extension adds accessibility enhancements to websites for blind people (who can't see their screens).

## Development
This extension is currently **in development**. 

### TODO

<details>
<summary>To Do List</summary>

- [x] ~~language feature~~
- [ ] quick nav feature
  - [x] ~~find navigation~~
  - [ ] do the same thing for ols as for uls
  - [x] ~~Send msg from popup (which element has to have focus)~~
  - [x] ~~focus on that element~~
  - [x] ~~make an array/obj that contains the site structure:~~
  
  ```js
    site: {
      header: header,
      navigation: nav,
      main: main,
      footer: footer  
    }
  ```
- [ ] add popup banner etc
- [ ] add 128(?)px icon
- [ ] add shortcuts
- [x] ~~pageInfo.main gets empty nodelist instead of null (FE: nu.nl)~~ **fixed**
- [x] ~~Language doesn't change inside the popup~~
- [ ] tabs
  - [x] add placeholder favicon (only the icon itself)
  - [x] add muted/unmuted icon (with alt) (only the icon itself)
  - [ ] add sort function based on the active tab
  - [ ] let user go to tab, mute/unmute and close tabs
- [ ] change theme colors (icon, hover etc...) to the orange color I used on the product page

</details>

## Table of contents
- [zichtbaar-extensie](#zichtbaar-extensie)
  - [Introduction](#introduction)
  - [Development](#development)
    - [TODO](#todo)
  - [Table of contents](#table-of-contents)
  - [Usage](#usage)
    - [Background script](#background-script)
      - [On installed event](#on-installed-event)
      - [On page changed](#on-page-changed)
    - [Popup page](#popup-page)
    - [Options page](#options-page)
    - [Development](#development-1)
      - [Logging](#logging)
  - [Welcome message](#welcome-message)
  - [Website language](#website-language)
    - [Finding the current language](#finding-the-current-language)
    - [Change the current language](#change-the-current-language)
    - [Change which languages are displayed](#change-which-languages-are-displayed)
  - [Quick navigation](#quick-navigation)
  - [WIKI](#wiki)
  - [Sources](#sources)

## Usage
1. Clone this repository.

```zsh
git clone https://github.com/martendebruijn/zichtbaar-extentie.git
```

2. Go to [chrome://extensions/](chrome://extensions/)
3. Make sure developer mode is on.
4. Press "Load unpacked" in the top right.
5. Load the directory.
6. Enjoy :)

### Background script
All tasks that have to run in the background go inside the background script. You can inspect the background page by clicking on ‘Inspect views background page’ in the manage extensions page.

#### On installed event
```js
chrome.runtime.onInstalled.addListener(function () {
  ...
});
```

#### On page changed

I'm not entirely sure what this code does, but it is in the Google documentation.

```js
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
```

### Popup page
You can declare a popup page. This page will open when the user clicks on the extension. The popup page needs to be called popup.html. The popup will be treated as a whole different page next to the visited webpage. This means that it has its own styles and console. To inspect this page, press right click on the popup and then on ‘Inspect’.

### Options page
You also can declare an options page. This page is used to give the user options to change the extension. The options page can be found on the manage extensions page in Chrome:
1. Go to manage extensions
2. Go to the extension
3. Click on details
4. Click on Extension options

### Development
There are a couple of steps you have to do before you can go coding your extension. Firstly you have to turn on the developer mode. You can do this by going to the manage extensions page and turn the switch on in the top-right corner. \n

Now you can load your extension. This can be done by clicking ‘load unpacked’ in the top-left corner. Every time there are changes made to the extension, it has to be updated to add these changes.

#### Logging
It’s very important to understand that the extension consist out multiple – and different – pages, each with its own scope (and thus console). This means you probably have to send data across the different pages. 


## Welcome message
The user gets a greeting on the popup page. Depending on the time it will give a different greeting. 

```html
<!-- popup.html 
Welcome! -->
<p><span id="welcomeMsg">Welkom</span><span id="userName"></span>!</p> 
```

```js
// popup.js
function welcomeMessage() {
     getTime();
     getUser();
}
function getTime() {
 const currentDate = new Date();
 const time = currentDate.toLocaleTimeString(); // => 13:01:42
 const welcomeMsg = document.getElementById('welcomeMsg');
 if (time >= '17:00:00') {
   welcomeMsg.innerText = 'Goedemorgen '; // Goodmorning
 } else if (time >= '12:00:00') {
   welcomeMsg.innerText = 'Goedemiddag '; // Goodafternoon
 } else if (time >= '06:00:00') {
   welcomeMsg.innerText = 'Goedeavond '; // Goodevening
 } else if (time >= '00:00:00') {
   welcomeMsg.innerText = 'Goedenacht '; // Goodnight
 }
}
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

## Website language
### Finding the current language
### Change the current language
### Change which languages are displayed

## Quick navigation


## WIKI
| Title | Description | 
| ---- | ----- | 
| [Home](https://github.com/martendebruijn/zichtbaar-extentie/wiki) | Description |
| [How to build an extension](https://github.com/martendebruijn/zichtbaar-extentie/wiki/how-to-extension) | Description |
| [Send Script from popup to content](https://github.com/martendebruijn/zichtbaar-extentie/wiki/send-script-popup-to-content) | Description |
| [Communicating between background, content and popup](https://github.com/martendebruijn/zichtbaar-extentie/wiki/communicating) | Description |
| [Chrome APIS overview](https://github.com/martendebruijn/zichtbaar-extentie/wiki/overview) | Description |
| [chrome.commands](https://github.com/martendebruijn/zichtbaar-extentie/wiki/chrome-api-commands) | Description |

## Sources

| Icon | Category                |
| ---- | ----------------------- |
| 📹   | Video                   |
| 📖   | Documentation / Article |
| ⚙️   | Code / Resource         |
| 🛠    | Tool                   |

| Cat. | Title | Author | Origin | Used for |
| ---- | ----- | ------ | ------ | ------ |
| 📖   | How to Build a Chrome Extention | Sarah Drasner | [CSS TRICKS](https://css-tricks.com/how-to-build-a-chrome-extension/) | This was the article that actually got me started, it's also where [Send JS code from popup to content](#Send-JS-code-from-popup-to-content) is based on. However the code in the article gave me – and others in the comment section - errors and it confuses the background and content scripts. |
| 📖   | Chrome Developers Manifest V2 Getting started | Google | [Google Develop](https://developer.chrome.com/docs/extensions/mv2/getstarted/) | Building a first extension.
| 📖   | The Definitive Guide to DateTime Manipulation | Punit Jajodia | [Toptal](https://www.toptal.com/software/definitive-guide-to-datetime-manipulation#:~:text=Getting%20the%20Current%20Time%20Stamp,passed%20since%20January%201,%201970) | For refreshing my memory of how date and time in JavaScript works again.
| ⚙️   | ISO Language Codes (639-1 and 693-2) and IETF Language Types | Data Hub | [Data Hub](https://datahub.io/core/language-codes) | `.csv` of all the language codes with correspondending English names
| 🛠   | Title | Author | [https://csvjson.com/](https://csvjson.com/) | used for
| ⚙️   | Title | Author | [#](https://codyhouse.co/blog/post/accessible-language-picker)  | used for
| ⚙️   | Title | Author | [#](https://developer.mozilla.org/en-US/) | used for
| 🛠   | RegEx | Author | [#](#) | used for

<!-- https://stackoverflow.com/questions/31111721/pass-a-variable-from-content-script-to-popup/31112456 -->