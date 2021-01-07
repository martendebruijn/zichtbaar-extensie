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
changeUsername();

function favoriteLanguages() {
  const form = document.getElementById('language-form');
  const checkboxes = document.querySelectorAll(
    '#language-form input[type="checkbox"]'
  );
  console.log(checkboxes);
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    checkboxes.forEach((checkbox) => console.log(checkbox.checked));
  });
}

favoriteLanguages();
