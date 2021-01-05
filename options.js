let page = document.getElementById('buttonDiv'); // get button div
const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1']; // different colors
function constructOptions(kButtonColors) {
  // construct options with the above colors
  for (let item of kButtonColors) {
    // for every color in kButtonColors
    let button = document.createElement('button'); // create a button
    button.style.backgroundColor = item; // set background color to the color in kButtonColors
    button.addEventListener('click', function () {
      // set event listener click on every button
      chrome.storage.sync.set({ color: item }, function () {
        // set the color in storage to the chosen color
        console.log('color is ' + item); // log the new color
      });
    });
    page.appendChild(button); // append all the buttons
  }
}
constructOptions(kButtonColors); // fire the constructOptions() function
