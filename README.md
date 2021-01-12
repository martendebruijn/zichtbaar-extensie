# zichtbaar-extensie

<div style="display:flex;">
  <img src="https://img.shields.io/github/license/martendebruijn/zichtbaar-extentie" />
</div>

## Introduction
This Chrome extension is part of my ([Marten de Bruijn](https://marten.work/)) graduation project of Communication Multimedia and Design @Avans university of applied science, Breda. This extension adds accessibility enhancements to websites for blind people (who can't see their screens).

## Development
This extension is currently **in development**. 

### TODO

- [x] language feature
- [ ] quick nav feature
- [ ] add popup banner etc
- [ ] add 128(?)px icon
- [ ] add shortcuts

## Table of contents
- [zichtbaar-extensie](#zichtbaar-extensie)
  - [Introduction](#introduction)
  - [Development](#development)
    - [TODO](#todo)
  - [Table of contents](#table-of-contents)
  - [Usage](#usage)
  - [How to make a Chrome extension](#how-to-make-a-chrome-extension)
    - [Manifest](#manifest)
      - [Example of a manifest:](#example-of-a-manifest)
      - [The keys](#the-keys)
    - [Chrome API's](#chrome-apis)
      - [chrome.commands](#chromecommands)
        - [Supported keys](#supported-keys)
        - [Scope](#scope)
        - [Summary](#summary)
    - [Background script](#background-script)
      - [On installed event](#on-installed-event)
      - [On page changed](#on-page-changed)
    - [Popup page](#popup-page)
    - [Options page](#options-page)
    - [Development](#development-1)
      - [Logging](#logging)
  - [Send JS code from popup to content](#send-js-code-from-popup-to-content)
    - [Activate a separate file](#activate-a-separate-file)
    - [Send code directly](#send-code-directly)
    - [Activate a file with data](#activate-a-file-with-data)
  - [Welcome message](#welcome-message)
  - [Website language](#website-language)
    - [Finding the current language](#finding-the-current-language)
    - [Change the current language](#change-the-current-language)
    - [Change which languages are displayed](#change-which-languages-are-displayed)
  - [Quick navigation](#quick-navigation)
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

## How to make a Chrome extension
### Manifest
Firstly I had to find out how you make an extension in the first place. The base of every extension is the manifest. Inside the manifest, you will find all the important details of the extension. 

#### Example of a manifest:
I've used version 2 of the manifest. 

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
            "128": "icons/favicon-128x128.png",
        }
    }
}

```

#### The keys

| Key         | Description                                    |
| ------------------ | --------------------------------------- |
| `manifest_version` | the version of the manifest                                  |
| `name`        | the full name of the extension                |
| `version`      | the version of the extension |
| `description`      | the description of the extension |
| `short_name`      | a short name of the extension. When there is not sufficient space to display the full name, this will be displayed  |
| `permissions`      | an array with all the permissions the extension needs |
| `background`      | information about the background script |
| `options_page`      | link to the options page |
| `browser_action`      | whole browser (vs. page only `page_action`) |
| (Inside `browser_action`) `default_title`      | text that is visible when the user hovers over the extension |
| (Inside `browser_action`) `default_popup`      | link to the popup page |
| (Inside `browser_action`) `default_icon`      | an object with the icons Chrome needs to use (16, 32 and 128px are needed) |

There are many more keys you can use. These can be found in the Google documentation.

### Chrome API's

| API         | Description                                    |
| ------------------ | --------------------------------------- |
| `browserAction` | ...                                  |
| `commands`        | ...                |
| `events`      | ... |
| `notifications`      | ... |
| `pageAction`      | ... |
| `storage`      | ... |
| `tabs`      | ... |
| `windows`      | ... |

#### chrome.commands
`"manifest_version" >= 2`
 The commands API allows you to define specific commands, and bind them to a default key combination. Each command your extension accepts **must** be listed in the manifest as an attribute of the `'commands'` manifest key. An extension can have many commands but **only 4 suggested keys can be specified**. The user can manually add more shortcuts from the [configure commands](chrome://extensions/configureCommands) dialog. \n

 ##### Supported keys
 - `A-Z`
 - `0-9`
 - Comma
 - Period
 - Home
 - End
 - PageUp
 - PageDown
 - Space
 - Insert
 - Delete
 - Arrow keys
 - Media Keys
   - MediaNextTrack
   - MediaPlayPause
   - MediaPrevTrack
   - MediaStop

All key combinations **must** include either `Ctrl` or `Alt`. Combinations that involve `Ctrl+Alt` are **not** permitted in order to avoid conflicts with the `AltGr` key. `Shift` can be used in addition to `Alt` or `Ctrl`, but is not required. Modifiers (such as `Ctrl`) can not be used in combination with the Media Keys. `Tab` is removed in Chrome `>=v33` for accessibility reasons. \n

On Mac `Ctrl` is automatically converted to `CMD`. If you want `Ctrl` instead, specify `MacCtrl` under `"mac"`. Specifying `MacCtrl` under `"default"` will cause the extension to be **uninstallable**. \n

On Chrome OS, you can specify `Search` as an modifier. \n

Certain Chrome shortcuts always take priority over Extension Command shortcuts and can **not** be overwritten.

```json
// manifest.json 

{ "commands": {    
  "toggle-feature-foo": {      
    "suggested_key": {        
      "default": "Ctrl+Shift+Y",        
      "mac": "Command+Shift+Y"      
      },      
      "description": "Toggle feature foo"    
      },    "_execute_browser_action": {      
        "suggested_key": {        
          "windows": "Ctrl+Shift+Y",        
          "mac": "Command+Shift+Y",        
          "chromeos": "Ctrl+Shift+U",        
          "linux": "Ctrl+Shift+J"      
          }    
          },    
          "_execute_page_action": {      
            "suggested_key": {        
              "default": "Ctrl+Shift+E",        
              "windows": "Alt+Shift+P",        
              "mac": "Alt+Shift+P"      
              }   
               } 
                }, 
}
```

In your background page, you can bind a handler to each of the commands defined in the manifest (except for `_execute_browser_action` and `_execute_page_action`) via `onCommand.addListener`. 

```js
// background.js

chrome.commands.onCommand.addListener(function(command) {  
  console.log('Command:', command);});
```

`_execute_browser_action` and `_execute_page_action` commands are reserved for the action of opening your extension's popups. They won't normally generate events that you can handle. If you need to take action based on your popup opening, consider listening for an `onDomReady` event inside your popup's code (what I – at time of writing – already do).

##### Scope

By default, Commands are scoped to the Chrome browser, which means that while the browser does not have focus, the shortcut will be inactive. On desktop Chrome, Commands can instead have global scope (Chrome `>=v35`, except on Chrome OS). \n

The user is free to designate any shortcut as global using the UI in chrome://extensions \ Keyboard Shortcuts, but the extension developer is limited to specifying only `Ctrl+Shift+[0..9]` as global shortcuts. This is to minimize the risk of overriding shortcuts in other applications since if, for example, Alt+P were to be allowed as global, the printing shortcut might not work in other applications.

```json

// manifest.json

{  
  "commands": {    
    "toggle-feature-foo": {      
      "suggested_key": {        
        "default": "Ctrl+Shift+5"      
        },      
        "description": "Toggle feature foo",      
        "global": true    
        }  
        },  
}
```

##### Summary
- **Types**
  - Command
- **Methods**
  - getAll
- **Events**
  - onCommand


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

## Send JS code from popup to content
You can do all kind of fun stuff with the content of a webpage with your extension. To do this you will have to send code from the popup page to the webpage. You can do this either immediately by opening the popup or if you rather want to wait when the user does a specific action, you can send the code when the user presses a button for example.
There are three – as I know of – ways to do this:

1. activate a separate file
2. send code directly
3. activate a separate file with some data 
   
### Activate a separate file
To activate a separate file you can use this function:
```js
function connectJS(pathToFile) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
      file: pathToFile,
    });
  });
}
```

### Send code directly
This can be done by changing ‘file’ to ‘code’ and put all the code inside a string. I tend to not do this because you have to put everything inside a string. That’s also why there isn’t an example of this method (however, this method is being used in the next method combined with the first one).

### Activate a file with data
To activate a separate file and send data from the popup page to the content, you can use the following (the data is called options).

```js
function connectJSwithOptions(options, pathToFile) {
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
```
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