const CompanyModel = require("../../../Database/models/companys");
const CompanyUser = require("../../../Database/models/companyUser");
const { createCompanyCookie, createToken, comparePassword, hashPassword } = require("../../../Utils/authentication");
const { sendResult } = require("../../../Utils/helper");
const { checkIsCompanyUser } = require("../Validation/company.validation");

async function createCompany(req, res){
    const { name, adress, type, rccm, numImpot, password, idNat, tel1, tel2, tel3, email } = req.body;
    const userId = req.user.id;
    const hashed = hashPassword(password);
    const company = await CompanyModel.create({
        name, adress, type, rccm, idNat, numImpot, tel1, tel2, tel3, email, icon: req.file.filename,
        password: hashed
    });
    if(company){
        const companyUser = await CompanyUser.create({ userId: userId, companyId: company.id, role: "ADMIN" });
        if(companyUser){
            sendResult(res, 201, null, "enregistrement de l'entreprise effectué avec succès", company)
        }
    }
};

async function signCompany(req, res){
    const { name, password } = req.body;
    const company = await CompanyModel.findOne({ where: { name: name }});
    if(company){
        const passwordMatch = comparePassword(password, company.password);
        if(passwordMatch){
            const companyUser = await checkIsCompanyUser({ userId: req.user.id, companyId: company.id });
            if(companyUser){
                const token = createToken(company.id);
                createCompanyCookie(res, token);
                sendResult(res, 200, null, "vous avez été connecté", company)
            }else{ sendResult(res, 401, "Vous devez etre membre de cette entrepse pour s'y connecter", null, null) }
        }else{
            sendResult(res, 401, "mot de passe incorrect", null, null)
        }
    }else{
        sendResult(res, 401, "Nom d'entreprise incorrect", null, null)
    }
};

async function signOut(req, res){
    res.clearCookie("companyCookie");
    sendResult(res, 200, null, "vous avez été deconnecté", null)
};

async function updateCompany(req, res){
    const { name, adress, type, rccm, numImpot, idNat, tel1, tel2, tel3, icon, email } = req.body;
    const company = await CompanyModel.findOne({ where: { id: req.params.id } });
    if(company){
        const updated = await CompanyModel.update({
            name: name || company.name,
            adress: adress || company.adress,
            type: type || company.type,
            rccm: rccm || company.rccm,
            numImpot: numImpot || company.numImpot,
            idNat: idNat || company.idNat,
            tel1: tel1 || company.tel1,
            tel2: tel2 || company.tel2,
            tel3: tel3 || company.tel3,
            icon: icon || company.icon,
            email: email || company.email
        });
        if(updated){
            sendResult(res, 200, null, "informations de l'entreprise mises à jour")
        }
    }else{
        sendResult(res, 404, "company not found", null, null)
    }
};

async function deleteCompany(req, res){
    const company = await CompanyModel.findOne({ where: { id: req.params.id } });
    if(company){
        const deleted = await company.update({ deletedAt: new Date() });
        if(deleted){
            sendResult(res, 200, null, "entreprise supprimée")
        }
    }else{
        sendResult(res, 404, "company not found", null, null)
    }
};

async function getCompanys(req, res){
    const companys = await CompanyModel.findAndCountAll({ where: { deletedAt: null }, limit: parseInt(req.query.limit) || 10, offset: parseInt(req.query.offset) || 0 });
    sendResult(res, 200, null, null, companys);
};

async function getCompanyById(req, res){
    const company = await CompanyModel.findOne({ where: { id: req.params.id }, include: "Menus" });
    if(company){
        sendResult(res, 200, null, null, company);
    }else{
        sendResult(res, 404, "company not found", null, null);
    }
};

async function getCurrentCompany(req, res){
    const company = req.company;
    sendResult(res, 200, null, null, company)
};

module.exports = {
    createCompany,
    updateCompany,
    deleteCompany,
    getCompanys,
    getCompanyById,
    signCompany,
    signOut,
    getCurrentCompany,
}