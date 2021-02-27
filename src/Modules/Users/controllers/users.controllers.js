const User = require("../../../Database/models/users");
const { hashPassword, createCookie, createToken, comparePassword } = require("../../../Utils/authentication");
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

async function login(req, res){
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email }});
    if(user){
        const passwordMatch = comparePassword(password, user.password);
        if(passwordMatch){
            const token = createToken(user.id);
            createCookie(res, token);
            sendResult(res, 200, null, "vous avez été connecté", user)
        }else
        {
            sendResult(res, 403, "mot de passe incorrect", null, null)
        }
    }else{
        sendResult(res, 401, "utilisateur inconnu", null, null)
    }
};

async function currentUser(req, res){
    sendResult(res, 200, null, null, req.user)
};

module.exports = {
    signup,
    login,
    currentUser,
}