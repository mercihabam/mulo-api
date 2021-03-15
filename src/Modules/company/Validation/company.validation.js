const { sendResult } = require("../../../Utils/helper");
const CompanyModel = require("../../../Database/models/companys");
const CompanyUser = require("../../../Database/models/companyUser");

async function checkRequiredFields(req, res, next){
    const { name, adress, type, rccm, numImpot, idNat, tel1, tel2, tel3 } = req.body;
    if(name && adress && type && tel1){
        next();
    }else{
        sendResult(res, 403, "vous devez remplir tous les champs obligatoires", null, null);
    }
};

async function checkCompanyName(req, res, next){
    const { name } = req.body;

    const company = await CompanyModel.findOne({ where: { name: name } });
    if(company){
        sendResult(res, 403, "une autre entreprise utilise déjà ce nom", null, null)
    }else{
        next();
    }
};

async function checkCompanyTel(req, res, next){
    const { tel1 } = req.body;

    const company = await CompanyModel.findOne({ where: { tel1: tel1 } });
    if(company){
        sendResult(res, 403, "une autre entreprise utilise déjà ce numéro de téléphone", null, null)
    }else{
        next();
    }
};

async function checkCompanyEmail(req, res, next){
    const { email } = req.body;

    const company = await CompanyModel.findOne({ where: { email: email } });
    if(company){
        sendResult(res, 403, "une autre entreprise utilise déjà cet adresse mail", null, null)
    }else{
        next();
    }
};

// function checkCompanyAdmin(data){
//     return CompanyUser.findOne({ where: data });
// }

module.exports = {
    checkRequiredFields,
    checkCompanyName,
    checkCompanyTel,
    checkCompanyEmail,
    // checkCompanyAdmin
}