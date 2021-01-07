function changeUsername() {
  const form = document.getElementById('username-form');
  const usernameInput = document.getElementById('username');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = usernameInput.value; // get username
    chrome.storage.sync.set({ user: name }); // sets username in storage
    alert('Username succesfully changed!'); // temporarly success feedback
  });
}
function checkFavorite() {
  const checkboxes = document.querySelectorAll(
    '#language-form input[type="checkbox"]'
  );
  chrome.storage.sync.get('langFav', function (data) {
    const fav = data.langFav;
    fav.forEach(function (favorite) {
      checkboxes.forEach(function (checkbox) {
        if (favorite.short === checkbox.id) {
          checkbox.checked = true;
        }
      });
    });
  });
}

function favoriteLanguages() {
  const form = document.getElementById('language-form');
  const checkboxes = document.querySelectorAll(
    '#language-form input[type="checkbox"]'
  );
  // console.log(checkboxes);
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let fav = [];
    checkboxes.forEach(function (checkbox) {
      if (checkbox.checked) {
        fav.push({ short: checkbox.id, full: checkbox.value });
      }
    });
    chrome.storage.sync.set({
      langFav: fav,
    });
    alert('Favorite languages succesfully changed!');
  });
}

changeUsername();
checkFavorite();
favoriteLanguages();
