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
  sender.textContent = data['sender_name'];
  post.appendChild(sender);

  return post;
}

async function loadPosts() {
  const options = {
    headers: {
      Authorization: localStorage.getItem('discretionUser'),
    },
  };
  const response = await fetch('http://localhost:3000/posts', options);

  if (response.status == 200) {
    const posts = await response.json();
    console.log(posts);

    const container = document.getElementById('posts');

    posts.forEach((p) => {
      const elem = createPostElement(p);
      console.log(elem);
      container.appendChild(elem);
    });
  } else {
    window.location.assign('./index.html');
  }
}

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
      title: formMsg.get('title'),
      content: formMsg.get('content'),
      sender_id: formMsg.get('sender_id'),
      recipient_id: formMsg.get('recipient_id'),
    }),
  };

  const results = await fetch('http://localhost:3000/posts', options);

  if (results.status == 201) {
    window.location.reload();
  }
}

const form = document.getElementById('submit-message');
form.addEventListener('submit', handleSubmit);
loadPosts();

//  body: JSON.stringify({
//       title: e.target.title.value,
//       content: e.target.content.value,
//       sender_id: e.target.sender_id.value,
//       recipient_id: e.target.recipient_id.value,
//     }),
