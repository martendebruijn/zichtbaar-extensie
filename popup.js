function getTime() {
  const currentDate = new Date();
  const time = currentDate.toLocaleTimeString(); // => 13:01:42
  const welcomeMsg = document.getElementById('welcomeMsg');
  if (time >= '17:00:00') {
    welcomeMsg.innerText = 'Goedemorgen!';
  } else if (time >= '12:00:00') {
    welcomeMsg.innerText = 'Goedemiddag!';
  } else if (time >= '06:00:00') {
    welcomeMsg.innerText = 'Goedeavond!';
  } else if (time >= '00:00:00') {
    welcomeMsg.innerText = 'Goedenacht!';
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
welcomeMessage();

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.tabs.executeScript(tabs[0].id, {
    file: 'a11y.js',
  });
});
