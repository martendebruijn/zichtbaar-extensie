# zichtbaar-extensie

<div style="display:flex; justify-content=center; align-items:center">
  <img src="https://img.shields.io/github/license/martendebruijn/zichtbaar-extentie" />
  <img src="https://img.shields.io/github/languages/count/martendebruijn/zichtbaar-extensie" />
  <img src="https://img.shields.io/github/languages/top/martendebruijn/zichtbaar-extensie" />
  <img src="https://img.shields.io/github/languages/code-size/martendebruijn/zichtbaar-extensie" />
  <img src="https://img.shields.io/github/repo-size/martendebruijn/zichtbaar-extensie" />
  <img src="https://img.shields.io/github/last-commit/martendebruijn/zichtbaar-extensie" />
  <img src="https://img.shields.io/badge/-chrome%20extension-blue" />
  <img src="https://img.shields.io/badge/-a11y-blue" />
  <img src="https://img.shields.io/badge/chrome%20extension%20manifest-v2-blue" />
</div>

<!-- comment for testing purpose -->

## Introduction
This Chrome extension is part of my ([Marten de Bruijn](https://marten.work/)) graduation project of Communication Multimedia and Design @Avans university of applied science, Breda. This extension adds accessibility enhancements to websites for blind people (who can't see their screens).

<img src="./README_ASSETS/thumb.png" alt="">

## Table of contents
- [zichtbaar-extensie](#zichtbaar-extensie)
  - [Introduction](#introduction)
  - [Table of contents](#table-of-contents)
  - [Usage](#usage)
  - [Features](#features)
    - [Quick navigation](#quick-navigation)
    - [Language](#language)
    - [Tabs](#tabs)
  - [WIKI](#wiki)
    - [Chrome APIS](#chrome-apis)
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

## Features
<img width="15px" src="https://zichtbaar.net/icons/flash.svg" alt="">

### Quick navigation

<img width="15px" src="https://zichtbaar.net/icons/global.svg" alt="">

### Language

<img width="15px" src="https://zichtbaar.net/icons/tabs.svg" alt="">

### Tabs

## WIKI
| Title | Description | 
| ---- | ----- | 
| [Home](https://github.com/martendebruijn/zichtbaar-extentie/wiki) | Description |
| [How to build an extension](https://github.com/martendebruijn/zichtbaar-extentie/wiki/how-to-extension) | Description |
| [Send Script from popup to content](https://github.com/martendebruijn/zichtbaar-extentie/wiki/send-script-popup-to-content) | Description |
| [Communicating between background, content and popup](https://github.com/martendebruijn/zichtbaar-extentie/wiki/communicating) | Description |
| [Searching for navigation](https://github.com/martendebruijn/zichtbaar-extentie/wiki/nav) | Description |
| [Finding and changing the language](https://github.com/martendebruijn/zichtbaar-extentie/wiki/lang) | Description |
| [A11Y enhancements](https://github.com/martendebruijn/zichtbaar-extentie/wiki/a11y) | Description |
| [Chrome APIS overview](https://github.com/martendebruijn/zichtbaar-extentie/wiki/overview) | Description |

### Chrome APIS
| API | Description | 
| ---- | ----- | 
| [chrome.windows](https://github.com/martendebruijn/zichtbaar-extentie/chrome-api-windows) | Description |
| [chrome.tabs](https://github.com/martendebruijn/zichtbaar-extentie/chrome-api-tabs) | Description |
| [chrome.runtime](https://github.com/martendebruijn/zichtbaar-extentie/chrome-api-runtime) | Description |
| [chrome.notifications](https://github.com/martendebruijn/zichtbaar-extentie/chrome-api-notifications) | Description |
| [chrome.commands](https://github.com/martendebruijn/zichtbaar-extentie/chrome-api-commands) | Description |

## Sources

| Icon | Category                |
| ---- | ----------------------- |
| 📹   | Video                   |
| 📖   | Documentation / Article |
| ⚙️   | Code / Resource         |
| 🛠   | Tool                   |

| Cat. | Title | Author | Origin | used for |
| ---- | ----- | ------ | ------ | ------ |
| 📖   | How to Build a Chrome Extention | Sarah Drasner | [CSS TRICKS](https://css-tricks.com/how-to-build-a-chrome-extension/) | This was the article that actually got me started, it's also where [Send JS code from popup to content](#Send-JS-code-from-popup-to-content) is based on. However the code in the article gave me – and others in the comment section - errors and it confuses the background and content scripts. |
| 📖   | Chrome Developers Manifest V2 Getting started | Google | [Google Develop](https://developer.chrome.com/docs/extensions/mv2/getstarted/) | Building a first extension.
| 📖   | The Definitive Guide to DateTime Manipulation | Punit Jajodia | [Toptal](https://www.toptal.com/software/definitive-guide-to-datetime-manipulation#:~:text=Getting%20the%20Current%20Time%20Stamp,passed%20since%20January%201,%201970) | For refreshing my memory of how date and time in JavaScript works again.
| ⚙️   | ISO Language Codes (639-1 and 693-2) and IETF Language Types | Data Hub | [Data Hub](https://datahub.io/core/language-codes) | `.csv` of all the language codes with correspondending English names
| 🛠   | Title | Author | [CSV to JSON](https://csvjson.com/) | used for |
| ⚙️   | Creating an accessible language picker | Claudia Romano | [Codyhouse](https://codyhouse.co/blog/post/accessible-language-picker)  | used for |
| ⚙️   | Pass a variable from content script to popup | - | [Stack overflow](https://stackoverflow.com/questions/31111721/pass-a-variable-from-content-script-to-popup/31112456) | used for |
| 📖    | Using Messaging in Chrome Extension | Gil Fink | [Medium](https://medium.com/@gilfink/using-messaging-in-chrome-extension-4ae65c0622f6) | used for |
| ⚙️    | Chrome extension communicate | AshikNesin | [GitHub](https://github.com/AshikNesin/chrome-extension-communicate/blob/master/contentScript.js) | used for |
| 📖   | Sending & Listening to Messages within Chrome Extension | Ashik Nesin | [Ashiknesin](https://ashiknesin.com/blog/sending-listening-to-messages-within-chrome-extension) | used for |
| ⚙️    | Chrome extension popup not showing anymore | - | [StackOverflow](https://stackoverflow.com/questions/43055526/chrome-extension-popup-not-showing-anymore) | used for |
| 📖   | API Reference | Google | [Chrome developer](https://developer.chrome.com/docs/extensions/reference/) | used for |
| 📖   | chrome.commands | Google | [Chrome developer](https://developer.chrome.com/docs/extensions/reference/commands/) | used for |
| 📖    | chrome.notifications | Google | [Chrome developer](https://developer.chrome.com/docs/extensions/reference/notifications/) | used for |
| 📖    | getComputedStyle | Mozilla | [Mozilla developer](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle) | used for |
| ⚙️   | Chrome Extension how to send data from content script to popup.html | - | [Stack overflow](https://stackoverflow.com/questions/20019958/chrome-extension-how-to-send-data-from-content-script-to-popup-html) | used for |
| ⚙️    | How to filter an array from all elements of another array | - | [Stack overflow](https://stackoverflow.com/questions/34901593/how-to-filter-an-array-from-all-elements-of-another-array) | used for |
| ⚙️   | Make a screen reader talk with the help of JavaScript and ARIA (Accessible Rich Internet Applications) | Orange | [a11y guidelines orange](https://a11y-guidelines.orange.com/en/web/components-examples/make-a-screen-reader-talk/) | used for |
| ⚙️    | CSS Reset | Meyerweb | [Meyerweb](http://meyerweb.com/eric/tools/css/reset/ ) | used for |
