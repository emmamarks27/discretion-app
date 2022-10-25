async function handleSubmit(e) {
  e.preventDefault();

  const formMsg = new FormData(e.target);

  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: formMsg.get('username'),
      password: formMsg.get('password'),
      //   sender_id: formMsg.get('sender_id'),
      //   recipient_id: formMsg.get('recipient_id'),
    }),
  };

  console.log(formMsg.get('username'));

  const results = await fetch('http://localhost:3000/users/login', options);
  const data = await results.json();
  console.log(data);

  if (results.status == 200) {
    localStorage.setItem('discretionUser', data['token']);
    window.location.assign('./board.html');
  } else {
    alert(`Error: ${data['error']}.`);
  }
}

const form = document.getElementById('login-form');
form.addEventListener('submit', handleSubmit);
//loadPosts();
