import { langList } from './lang.js';

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

function welcomeMessage() {
  getTime();
  getUser();
}

function connectJS(file) {
  // connect a JS file
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
      file: file,
    });
  });
}

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

chrome.storage.sync.get('langFav', function (data) {
  connectJSwithOptions(
    { langList: langList, langFav: data.langFav },
    'a11y.js'
  );
});

welcomeMessage();

// ----
