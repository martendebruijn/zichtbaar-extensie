# zichtbaar-extensie

<div style="display:flex;">
  <img src="https://img.shields.io/github/license/martendebruijn/template-node-express" />
</div>

## Introduction
This Chrome extension is part of my ([Marten de Bruijn](https://marten.work/)) graduation project of Communication Multimedia and Design @Avans university of applied sciences, Breda. This extension adds accessibility enhancements to websites for blind people (who can't see their screens).

## Table of contents
- [zichtbaar-extensie](#zichtbaar-extensie)
  - [Introduction](#introduction)
  - [Table of contents](#table-of-contents)
  - [Usage](#usage)
  - [How to make a Chrome extension](#how-to-make-a-chrome-extension)
    - [Manifest](#manifest)
      - [Example of a manifest:](#example-of-a-manifest)
      - [The keys](#the-keys)
    - [Background script](#background-script)
    - [Popup page](#popup-page)
    - [Options page](#options-page)
    - [Development](#development)
      - [Logging](#logging)

## Usage
1. Clone this repository.
2. Go to chrome://extensions/
3. Make sure developer mode is on.
4. Press "Load unpacked" in the top right.
5. Load the directory.
6. Enjoy :)

## How to make a Chrome extension
### Manifest
Firstly I had to find out how you make an extension in the first place. The base of every extension is the manifest. Inside the manifest, you will find all the important details of the extension. 

#### Example of a manifest:

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
| `browser_action`      | ... |
| (Inside `browser_action`) `default_title`      | text that is visible when the user hovers over the extension |
| (Inside `browser_action`) `default_popup`      | link to the popup page |
| (Inside `browser_action`) `default_icon`      | an object with the icons Chrome needs to use (16, 32 and 128px are needed) |

### Background script
### Popup page
### Options page
### Development
#### Logging