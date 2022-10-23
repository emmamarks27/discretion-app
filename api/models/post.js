const db = require('../database/connect');

class Post {

    constructor({ post_id, title, content, sender_id, sender, recipient_id, recipient }) {
        this.id = post_id;
        this.title = title;
        this.content = content;
        this.sender_id = sender_id;
        this.sender_name = sender;
        this.recipient_id = recipient_id;
        this.recipient = recipient;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM post");
        return response.rows.map(p => new Post(p));
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM post WHERE post_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate post.")
        }
        return new Post(response.rows[0]);
    }

    static async create(data) {
        const {title, content, sender_id, recipient_id} = data;
        let response = await db.query("INSERT INTO post (title, content, sender_id, recipient_id) VALUES ($1, $2, $3, $4) RETURNING post_id;",
            [title, content, sender_id, recipient_id]);
        const newId = response.rows[0].post_id;
        const newPost = await Post.getOneById(newId);
        return newPost;
    }

    async destroy() {
        let response = await db.query("DELETE FROM post WHERE post_id = $1 RETURNING *;", [this.id]);
        return new Post(response.rows[0]);
    }

}

module.exports = Post;