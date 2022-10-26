const Post = require('../models/post');

async function index(req, res) {
  try {
    const posts = await Post.getAll();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getByRecipientId(req, res) {
  console.log('get by recipient called');
  console.log('This is the controller request', req.headers['username']);
  try {
    const posts = await Post.getByRecipient(req.headers.username);
    // const filtered = posts.filter(
    //   (post) => post.recipient_id === req.recipient_id
    // );
    res.send(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function create(req, res) {
  try {
    const data = req.body;
    const result = await Post.create(data);
    res.status(201).send(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function show(req, res) {
  try {
    const id = parseInt(req.params.id);
    const post = await Post.getOneById(id);
    res.json(post);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function destroy(req, res) {
  try {
    const id = parseInt(req.params.id);
    const post = await Post.getOneById(id);
    const result = await post.destroy();
    res.status(204).end();
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

module.exports = {
  index,
  create,
  show,
  destroy,
  getByRecipientId,
};
