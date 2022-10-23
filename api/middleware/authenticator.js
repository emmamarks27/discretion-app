const e = require('express');
const Token = require('../models/token');

async function authenticator (req, res, next) {
    try {
        const userCookie = req.cookies.discretionUser;

        if (!userCookie) {
            throw new Error("User not authenticated.");
        }
        console.log(userCookie);
        
        const validToken = await Token.getOneByToken(userCookie);

        next();

    } catch (err) {
        res.status(403).json({error: err.message});
    }
}

module.exports = authenticator;