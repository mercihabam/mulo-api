const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../Database/models/users");
const { sendResult } = require("./helper");
const companys = require("../Database/models/companys");
const CompanyUser = require("../Database/models/companyUser");

function createToken(userId) {
    return jwt.sign({ userId: userId }, process.env.PRIVATE_KEY);
};

function createCookie(res, token){
    res.cookie("authCookie", token, { maxAge: 86400000, httpOnly: true, secure: true, sameSite: "None" });
};

function createCompanyCookie(res, token){
    res.cookie("companyCookie", token, { maxAge: 86400000, httpOnly: true, secure: true, sameSite: "None" });
};

function deleteCookie(res){
    res.clearCookie("authCookie")
};

function deleteCompanyCookie(res){
    res.clearCookie("companyCookie")
};

function hashPassword(password){
    return bcrypt.hashSync(password, 10, (err, hash) =>hash);
};

function comparePassword(password, hash){
    return bcrypt.compareSync(password, hash, (err, isMatch) =>isMatch);
};

function checkToken(req, res, next){
    const authCookie = req.cookies.authCookie;

    jwt.verify(authCookie, process.env.PRIVATE_KEY, async(err, data) =>{
        if(err){
            sendResult(res, 401, "vous devez posseder un jeton d'accès")
        }else if(data){
            const userId = data.userId;
            const user = await userModel.findOne({ where: { id: userId } });
            if(user){
                req.user = user;
                next();
            }else{
                sendResult(res, 403, "jeton d'accès incorrect", null, null);
            }
        }
    })
};

function checkCompanyToken(req, res, next){
    const companyCookie = req.cookies.companyCookie;

    jwt.verify(companyCookie, process.env.PRIVATE_KEY, async(err, data) =>{
        if(err){
            sendResult(res, 402, "vous devez posseder un jeton d'accès", null, null)
        }else if(data){
            const userId = data.userId;
            const company = await companys.findOne({ where: { id: userId } });
            if(company){
                const companyUser = CompanyUser.findOne({ where: { userId: req.user.id, companyId: company.id } });
                if(companyUser){
                    req.company = company;
                    next();
                }else{
                    sendResult(res, 402, "not authorised", null, null);
                }
            }else{
                sendResult(res, 403, "jeton d'accès incorrect", null, null);
            }
        }
    })
};

function checkIsAdmin(req, res, next){
    if(req.user.isAdmin){
        next();
    }else{
        sendResult(res, 401, "vous n'etes pas autorisé à éxecuter cette action", null, null)
    }
};

module.exports = {
    createToken,
    hashPassword,
    createCookie,
    comparePassword,
    checkToken,
    checkIsAdmin,
    deleteCookie,
    createCompanyCookie,
    deleteCompanyCookie,
    checkCompanyToken,
}