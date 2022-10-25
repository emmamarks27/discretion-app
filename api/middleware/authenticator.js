const Token = require('../models/token');

function authenticator(req, res, next) {
  try {
    const userCookie = req.cookies.discretionUser;
    if (!userCookie) {
      throw new Error('User not authenticated.');
    } else {
      //Can we find a token matching it?
      const validToken = Token.getOneByToken(userCookie);

      next();
    }
  } catch (err) {
    res.status(403).json({ error: err.message });
  }

  console.log('COOKIES:', req.cookies);
}

module.exports = authenticator;
