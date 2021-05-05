const cartItems = require("../../../Database/models/cartItems");
const Cart = require("../../../Database/models/cart");
const User = require("../../../Database/models/users");
const { hashPassword, createCookie, createToken, comparePassword, deleteCookie } = require("../../../Utils/authentication");
const { sendResult } = require("../../../Utils/helper");
const uuid = require("uuid");
const { Op } = require("sequelize");

async function signup(req, res){
    const { firstName, lastName, email, password, avatar } = req.body;
    const hashed = hashPassword(password);;

    const user = await User.create({
        id: uuid.v4(),
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

async function logout(req, res){
    deleteCookie(res);
    sendResult(res, 200, null, "cookie deleted", null);
};

async function currentUser(req, res){
    const user1 = await User.findOne({ where: { id: req.user.id }, include: [ { model: Cart, where: {
        [ Op.or ] : [
            { ordered: null },
            { ordered: false }
        ]
    }, as: "Cart", include: "Items" } ]});
    if(user1){
        sendResult(res, 200, null, null, user1)
    }else{
        const userm = await User.findOne({ where: { id: req.user.id }});
        const user = { id: userm.id, firstName: userm.firstName, email: userm.email, lastName: userm.lastName, Cart: { Items: [ ] } }
        sendResult(res, 200, null, null, user);
        console.log(user1);
    }
};

async function getAllUsers(req, res){
    const users = await User.findAndCountAll({ where: { deletedAt: null }, offset: parseInt(req.query.offset) || 0, limit: parseInt(req.query.limit) || 10000 });
    sendResult(res, 200, null, null, users);
};

async function currentAdmin(req, res){
    const user = req.user
    sendResult(res, 200, null, null, user)
};

module.exports = {
    signup,
    login,
    currentUser,
    logout,
    getAllUsers,
    currentAdmin
}