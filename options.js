function changeUsername() {
  const form = document.querySelector('form');
  const usernameInput = document.getElementById('username');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = usernameInput.value; // get username
    chrome.storage.sync.set({ user: name }); // sets username in storage
    alert('Username succesfully changed!'); // temporarly success feedback
  });
}
changeUsername();

// function validateUsername(username) {
//   const pattern = /^[A-Za-z]+(?:\s[A-Za-z]+)*/gm;
//   const valid = pattern.test(username);
//   if (!valid) {
//     // not valid
//   }
// }
