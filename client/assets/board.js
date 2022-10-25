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

document.getElementById('post-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = new FormData(e.target);

  console.log(target);

  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
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
  }
});

async function loadPosts() {
  const response = await fetch('http://localhost:3000/posts', {
    credentials: 'include',
  });

  if (response.status == 200) {
    const posts = await response.json();

    const container = document.getElementById('posts');

    posts.forEach((p) => {
      const elem = createPostElement(p);
      container.appendChild(elem);
    });
  } else {
    console.log('bad!');
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
