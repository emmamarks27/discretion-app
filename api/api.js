const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");

const logRoutes = require('./middleware/logger');

const postRouter = require('./routers/post');
const userRouter = require('./routers/user');

const api = express();

//Dan stacks other people's code before his own. If you used authenticator before cookie-parser it would fail
//needs to access cookie-parser before you can use the authenticator
api.use(cors());
api.use(express.json());
api.use(cookieParser());
api.use(logRoutes);

api.get('/', (req, res) => {
  res.json({
    name: 'Discretion',
    description: 'Send and receive private messages.',
  });
});

api.use('/posts', postRouter);
api.use('/users', userRouter);

module.exports = api;
