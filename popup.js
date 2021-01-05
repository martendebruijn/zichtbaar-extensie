let changeColor = document.getElementById('changeColor'); // get element #changeColor
chrome.storage.sync.get('color', function (data) {
  // set the default color to the color in storage (green)
  changeColor.style.backgroundColor = data.color; // changeColor background-color = data.color
  changeColor.setAttribute('value', data.color); //  sets value to data.color
});
changeColor.onclick = function (element) {
  // fires when changeColor is clicked
  let color = element.target.value; // sets color to target.value
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // use the active tab
    chrome.tabs.executeScript(tabs[0].id, {
      // execute the following code on this tab
      code: 'document.body.style.backgroundColor = "' + color + '";', // set color of body of the active tab
    });
  });
};

let changeTextColor = document.getElementById('changeTextColor');
chrome.storage.sync.get('textColor', function (data) {
  changeTextColor.style.backgroundColor = data.textColor;
  changeTextColor.setAttribute('value', data.textColor);
});
changeTextColor.onclick = function (element) {
  let color = element.target.value;
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
      code: 'document.body.style.color = "' + color + '";',
    });
  });
};

let changeNavColor = document.getElementById('changeNavColor');
chrome.storage.sync.get('navColor', function (data) {
  changeNavColor.style.backgroundColor = data.navColor;
  changeNavColor.setAttribute('value', data.navColor);
});
changeNavColor.onclick = function (element) {
  let color = element.target.value;
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
      code:
        'document.querySelector("nav").style.backgroundColor = "' +
        color +
        '";',
    });
  });
};

// DON'T
// let allNavs = document.querySelectorAll('nav');
// console.log('hallo'); // logs in popup console
// console.log(allNavs); // returnes an empty nodeList because we reference to popup.html

// DO
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.tabs.executeScript(tabs[0].id, {
    code: 'console.log(document.querySelectorAll("nav"));', // logs all the navs on the page when the extention is clicked
  });
});
