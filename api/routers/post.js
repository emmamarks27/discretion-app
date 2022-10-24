const { Router } = require('express');

const postController = require('../controllers/post.js');
const authenticator = require('../middleware/authenticator');
const postRouter = Router();

//PUt the middleware on top of index - you can only see posts if you have a cookie - are logged in .
postRouter.get('/', authenticator, postController.index);
postRouter.post('/', postController.create);
postRouter.get('/:id', postController.show);
postRouter.delete('/:id', postController.destroy);

module.exports = postRouter;
