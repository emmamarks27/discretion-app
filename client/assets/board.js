function createPostElement (data) {
    const post = document.createElement("div");
    post.className = "post";

    const header = document.createElement("h2");
    header.textContent = data["title"];
    post.appendChild(header);

    const content = document.createElement("p");
    content.textContent = data["content"];
    post.appendChild(content);

    const sender = document.createElement("em");
    sender.textContent = data["sender_name"];
    post.appendChild(sender);

    return post;
}

async function loadPosts () {
    const response = await fetch("http://localhost:3000/posts");
    const posts = await response.json();
    console.log(posts);
    
    const container = document.getElementById("posts");

    posts.forEach(p => {
        const elem = createPostElement(p);
        console.log(elem)
        container.appendChild(elem);
    })
}

loadPosts();