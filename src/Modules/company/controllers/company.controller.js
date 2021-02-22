const CompanyModel = require("../../../Database/models/companys");
const { sendResult } = require("../../../Utils/helper");

async function createCompany(req, res){
    const { name, adress, type, rccm, numImpot, idNat, tel1, tel2, tel3, icon } = req.body;
    const userId = req.user.id;

    const company = await CompanyModel.create({
        name, adress, type, rccm, idNat, numImpot, icon, tel1, tel2, tel3, userId
    });
    if(company){
        sendResult(res, 201, null, "enregistrement de l'entreprise effectué avec succès", company)
    }
};

module.exports = {
    createCompany,
}