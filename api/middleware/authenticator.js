const Token = require('../models/token');

function authenticator(req, res, next) {
  console.log('calling authenticator');
  try {
    const userToken = req.headers['authorization'];
    console.log('user Token is:', userToken);
    if (userToken === 'null') {
      throw new Error('User not authenticated.');
    } else {
      //Can we find a token matching it?
      const validToken = Token.getOneByToken(userToken);

      next();
    }
  } catch (err) {
    res.status(403).json({ error: err.message });
  }

  console.log('COOKIES:', req.cookies);
}

module.exports = authenticator;
