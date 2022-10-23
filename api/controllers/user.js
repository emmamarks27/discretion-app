const bcrypt = require('bcrypt');

const User = require("../models/user");
const Token = require("../models/token");

async function create(req, res) {
    try {
        const data = req.body;
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
        data["password"] = await bcrypt.hash(data["password"], salt);
        const result = await User.create(data);
        res.status(201).send(result);
    } catch (err) {
        res.status(400).json({"error": err.message})
    }
};

async function show(req, res) {
    try {
        const id = parseInt(req.params.id);
        const user = await User.getOneById(id);
        res.json(user);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
};

async function login(req, res) {
    try {
        const data = req.body;
        const user = await User.getOneByUsername(data["username"]);
        const authenticated = await bcrypt.compare(data["password"], user["password"]);
        if (authenticated) {
            const token = await Token.create(user.id);
            res.cookie("discretionUser", token.token, { maxAge: 3600000 });
            res.send({ user, authenticated: true });
        } else {
            throw new Error("Unable to authenticate user.");
        }
    } catch (err) {
        res.status(401).json({"error": err.message})
    }
};

async function logout(req, res) {
    try {
        res.clearCookie('discretionUser');
        res.status(204).end();
    } catch (err) {
        res.status(400).json({"error": err.message});
    }
};

module.exports = {
    create, show, login, logout
}