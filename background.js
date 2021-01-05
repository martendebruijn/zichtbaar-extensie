chrome.runtime.onInstalled.addListener(function () {
  // eventlistener on Installed
  chrome.storage.sync.set({ color: '#3aa757' }, function () {
    // set color to green in storage
    console.log('The color is green.'); // log 'The color is green.'
  });

  chrome.storage.sync.set({ textColor: '#e8453c' }, function () {
    console.log('The textColor is #e8453c.');
  });

  chrome.storage.sync.set({ navColor: '#ff577f' }, function () {
    console.log('The navColor is #ff577f.');
  });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    // onPageChanged remove rules
    chrome.declarativeContent.onPageChanged.addRules([
      // onPageChanged add rules
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: 'developer.chrome.com' }, // tells that the extention can be used on developer.chrome.com
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()], // tells to show the pop-up
      },
    ]);
  });
});
