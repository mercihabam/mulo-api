const User = require("../../../Database/models/users");
const { hashPassword } = require("../../../Utils/authentication");
const { sendResult } = require("../../../Utils/helper");

async function createUser(req, res, next){
    const { firstName,lastName, email } = req.body;
    const password = Math.round(Math.random() * (900000-100000) + 100000);
    const hashed = hashPassword(password.toString());

    const user = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashed,
    });
    if(user){
        req.userId = user.id
        next();
    }else{
        sendResult(res, 403, "impossible de créer l'utilisateur", null, null);
    }
};

module.exports = {
    createUser
}