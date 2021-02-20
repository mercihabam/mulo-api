const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

function createToken(userId) {
    return jwt.sign({ userId: userId }, process.env.PRIVATE_KEY);
};

function createCookie(res, token){
    res.cookie("authCookie", token, { maxAge: 86400000, httpOnly: true, secure: false });
};

function hashPassword(password){
    return bcrypt.hashSync(password, 10, (err, hash) =>hash);
}

module.exports = {
    createToken,
    hashPassword,
    createCookie,
}