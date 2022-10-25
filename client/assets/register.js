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

  console.log('username', formMsg.get('username'));

  const results = await fetch('http://localhost:3000/users/register', options);
  const data = await results.json();
  console.log(data);

  if (results.status == 201) {
    alert(`User ${data['username']} created!`);
    window.location.assign('./login.html');
  }
}

const form = document.getElementById('register-form');
form.addEventListener('submit', handleSubmit);
//loadPosts();
