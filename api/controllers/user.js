const User = require('../models/user');
const Token = require('../models/token');

//Gives us access to cryptography.
//package.json not included in github - cryptography happens at a lower level. Mac and Windows are not compatible
const bcrypt = require('bcrypt');

//Bcrypt is not fully under our control (cost function) so this needs to be async
async function register(req, res) {
  try {
    const data = req.body;
    //Need to hash and salt the password to be safe.

    //Generate a salt with a specific cost, parse in the number of rounds.
    //Need to set it to an integer otherwise bcrypt would complain.
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYTP_SALT_ROUNDS));

    //Hash the password. Someone submits us their password in plain text, we switch it out for hash'd and salted password.
    data['password'] = await bcrypt.hash(data['password'], salt);

    const result = await User.create(data);
    res.status(201).send(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function show(req, res) {
  try {
    const id = parseInt(req.params.id);
    const user = await User.getOneById(id);
    res.json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function login(req, res) {
  try {
    //gets the user's information which includes a hash'd password from the database
    const user = await User.getOneByUsername(req.body.username);
    //takes the password, works out encrypted and salt, uses those to compare
    //Bcrypt compares the two and then stores the result in authenticated
    const authenticated = await bcrypt.compare(
      req.body.password,
      user['password']
    );

    if (!authenticated) {
      //Throw means nothing has gone wrong with the code. Thrown errors get caught by the catch block.
      throw new Error('Incorrect credentials.');
    } else {
      //send them a token
      const token = await Token.create(user['id']);
      //Once someone logs into the machine, we send this as a cookie to the machine
      //Cookie is stored on user's machine
      //Every request sent back to this server will carry this cookie
      //Next request, the user will give back the cookie.

      //Three arguments - name, token and duration.
      res.cookie('discretionUser', token.token, { maxAge: 360000 });

      //This ⬇️ would be a browser session - only as long as the browser is open
      //res.cookie('discretionUser', token.token, { maxAge: 360000 });

      res.status(200).json({ authenticated: true, token });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

function logout(req, res) {
  res.clearCookie('discretionUser');
  res.status(204).end();
}

module.exports = {
  register,
  show,
  login,
  logout,
};
