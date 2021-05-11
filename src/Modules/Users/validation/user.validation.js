const UserModel = require("../../../Database/models/users");
const { sendResult } = require("../../../Utils/helper");

async function checkEmailExist(req, res, next){
    const { email } = req.body;
    const user = await UserModel.findOne({ where: { email: email } });
    if(user){
        sendResult(res, 500, "utilisateur avec cet adresse mail existe déjà", null, null)
    }else{
        next();
    }
};

async function checkUpdateEmailExist(req, res, next){
    const { email } = req.body;
    if(email){
        const user = await UserModel.findOne({ where: { email: email } });
        if(user && user.id !== req.params.id){
            sendResult(res, 500, "utilisateur avec cet adresse mail existe déjà", null, null)
        }else{
            next();
        }
    }else{ next() }
};

async function checkRequiredFields(req, res, next){
    const { firstName, lastName, email, password, confirmPassword, avatar } = req.body;
    if(firstName && lastName && email && password && confirmPassword){
        next();
    }else{
        sendResult(res, 500, "vous devez remplir tous les champs obligatoires", null, null)
    }
};

async function checkLoginFields(req, res, next){
    const { email, password } = req.body;
    if( email && password){
        next();
    }else{
        sendResult(res, 500, "vous devez remplir tous les champs obligatoires", null, null);
    }
};

async function checkPasswordMatch(req, res, next){
    const {password, confirmPassword} = req.body;
    if(password !== confirmPassword){
        sendResult(res, 500, "les mot de passes ne correspondent pas", null, null)
    }else{
        next();
    }
};

async function checkPasswordIsValid(req, res, next){
    const {password} = req.body;
    if(password.length < 6){
        sendResult(res, 500, "le mot de passe est trop court", null, null)
    }else{
        next();
    }
};

module.exports = {
    checkEmailExist,
    checkRequiredFields,
    checkPasswordMatch,
    checkPasswordIsValid,
    checkLoginFields,
    checkUpdateEmailExist
}