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
- [ ] add 128(?)px icon (change icon color to orange)
- [ ] add shortcuts
- [x] ~~pageInfo.main gets empty nodelist instead of null (FE: nu.nl)~~ **fixed**
- [x] ~~Language doesn't change inside the popup~~
- [x] ~~tabs~~
  - [x] ~~add placeholder favicon (only the icon itself)~~
  - [x] ~~add muted/unmuted icon (with alt) (only the icon itself)~~
  - [x] ~~add sort function based on the active tab~~
  - [x] ~~let user go to tab, mute/unmute and close tabs~~
- [x] change theme colors (icon, hover etc...) to the orange color I used on the product page
- [ ] hide items when they are empty
- [ ] test with screenreader
- [ ] remove options page
- [ ] set for production (minimize, delete commands etc.)
- [ ] fix tab sequences (when it goes back to 0 it's in the wrong dir)

</details>

## Table of contents
- [zichtbaar-extensie](#zichtbaar-extensie)
  - [Introduction](#introduction)
  - [Development](#development)
    - [TODO](#todo)
  - [Table of contents](#table-of-contents)
  - [Usage](#usage)
  - [Features](#features)
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
Stuff about how cool my extension is :)


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