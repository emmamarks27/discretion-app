function createPostElement(data) {
  const post = document.createElement('div');
  post.className = 'post';

  const header = document.createElement('h2');
  header.textContent = data['title'];
  post.appendChild(header);

  const content = document.createElement('p');
  content.textContent = data['content'];
  post.appendChild(content);

  const sender = document.createElement('em');
  sender.textContent = `sender id: ${data['sender_id']}`;
  post.appendChild(sender);

  const recipient = document.createElement('em');
  recipient.textContent = `recipient id: ${data['recipient_id']}`;
  post.appendChild(recipient);

  return post;
}

document.getElementById('post-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = new FormData(e.target);

  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('discretionUser'),
      userName: localStorage.getItem('userName'),
    },

    body: JSON.stringify({
      title: form.get('title'),
      content: form.get('content'),
      sender_id: form.get('sender_id'),
      recipient_id: form.get('recipient_id'),
    }),
  };

  const result = await fetch('http://localhost:3000/posts', options);

  if (result.status == 201) {
    window.location.reload();
  } else {
    let alert = `<h2>Sorry, you need to be logged in to post a message ☹️</h2>`;
    updateMsg.innerHTML = alert;
  }
});

async function loadPosts() {
  console.log('This is the auth token', localStorage);
  const options = {
    headers: {
      Authorization: localStorage.getItem('discretionUser'),
      userName: localStorage.getItem('userName'),
    },
  };

  const response = await fetch('http://localhost:3000/posts', options);

  if (response.status == 200) {
    const posts = await response.json();
    console.log('Here is the post', posts);

    const container = document.getElementById('posts');

    posts.forEach((p) => {
      const elem = createPostElement(p);
      container.appendChild(elem);
    });
  } else {
    console.log('bad!');
  }
}

const updateMsg = document.querySelector('#alert-msg');

// const form = document.getElementById('submit-message');
// form.addEventListener('submit', handleSubmit);
loadPosts();

//  body: JSON.stringify({
//       title: e.target.title.value,
//       content: e.target.content.value,
//       sender_id: e.target.sender_id.value,
//       recipient_id: e.target.recipient_id.value,
//     }),
