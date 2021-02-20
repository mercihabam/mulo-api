const User = require("../../../Database/models/users");
const { hashPassword, createCookie, createToken } = require("../../../Utils/authentication");
const { sendResult } = require("../../../Utils/helper");

async function signup(req, res){
    const { firstName, lastName, email, password, avatar } = req.body;
    const hashed = hashPassword(password);;

    const user = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashed,
        avatar: avatar
    });
    if(user){
        const token = createToken(user.id);
        createCookie(res, token);
        sendResult(res, 201, null, "inscription réussi", user);
    }else{
        sendResult(res, 500, "inscription echoue", null, user);
    }
};

module.exports = {
    signup
}