const CompanyModel = require("../../../Database/models/companys");
const CompanyUser = require("../../../Database/models/companyUser");
const { sendResult } = require("../../../Utils/helper");

async function checkIsCompanyAdmin(req, res, next){
    const companyUser = await CompanyUser.findOne({ where: { userId: req.user.id, companyId: req.company.id } });
    if(companyUser){
        if(companyUser.role === "ADMIN"){ next() }else{
            sendResult(res, 401, "seul l'administrateur de cette entreprise peut executer cette action", null, null)
        }
    }else{
        sendResult(res, 404, "invalid user", null, null)
    }
};

async function checkIsCompanyUser(req, res, next){
    const companyUser = await CompanyUser.findOne({ where: { userId: req.user.id, companyId: req.company.id } });
    if(companyUser){
        next()
    }else{
        sendResult(res, 401, "unhautorised", null, null)
    }
};

async function checkRequiredFields(req, res, next){
    const { firstName, lastName, email, companyId, role } = req.body;
    if(firstName && lastName && email && companyId && role){
        next();
    }else{
        sendResult(res, 500, "vous devez remplir tous les champs obligatoires", null, null)
    }
};

module.exports = {
    checkIsCompanyAdmin,
    checkRequiredFields,
    checkIsCompanyUser
}