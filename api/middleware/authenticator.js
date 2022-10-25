const Token = require('../models/token');

async function authenticator(req, res, next) {
  try {
    //const userCookie = req.cookies.discretionUser;
    const userToken = req.headers['authorization'];
    console.log(userToken);
    if (userToken === 'null') {
      throw new Error('User not authenticated.');
    } else {
      //Can we find a token matching it?
      const validToken = await Token.getOneByToken(userToken);

      next();
    }
  } catch (err) {
    res.status(403).json({ error: err.message });
  }

  console.log('COOKIES:', req.cookies);
}

module.exports = authenticator;
