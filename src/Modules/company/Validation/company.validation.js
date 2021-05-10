const { sendResult } = require("../../../Utils/helper");
const CompanyModel = require("../../../Database/models/companys");
const CompanyUser = require("../../../Database/models/companyUser");

async function checkRequiredFields(req, res, next){
    const { name, adress, type, password, rccm, numImpot, idNat, tel1, tel2, tel3 } = req.body;
    if(name && adress && type && tel1 && password){
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

async function checkCompanyNameToUpdate(req, res, next){
    const { name } = req.body;

    if(name){
        const company = await CompanyModel.findOne({ where: { name: name } });
        if(company && company.id !== req.params.id){
            sendResult(res, 403, "une autre entreprise utilise déjà ce nom", null, null)
        }else{
            next();
        }
    }else{ next() }
};

async function checkCompanyTelToUpdate(req, res, next){
    const { tel1 } = req.body;

    if(tel1){
        const company = await CompanyModel.findOne({ where: { tel1: tel1 } });
        if(company && company.id !== req.params.id){
            sendResult(res, 403, "une autre entreprise utilise déjà ce numéro de téléphone", null, null)
        }else{
            next();
        }
    }else{ next() }
};

async function checkCompanyEmailToUpdate(req, res, next){
    const { email } = req.body;

    if(email){
        const company = await CompanyModel.findOne({ where: { email: email } });
        if(company && company.id !== req.params.id){
            sendResult(res, 403, "une autre entreprise utilise déjà cet adresse mail", null, null)
        }else{
            next();
        }
    }else{
        next()
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

function checkIsCompanyUser(data){
    return CompanyUser.findOne({ where: data });
}

module.exports = {
    checkRequiredFields,
    checkCompanyName,
    checkCompanyTel,
    checkCompanyEmail,
    checkIsCompanyUser,
    checkCompanyNameToUpdate,
    checkCompanyEmailToUpdate,
    checkCompanyTelToUpdate
}