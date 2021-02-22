const CompanyModel = require("../../../Database/models/companys");
const { sendResult } = require("../../../Utils/helper");

async function createCompany(req, res){
    const { name, adress, type, rccm, numImpot, idNat, tel1, tel2, tel3, icon, email } = req.body;
    const userId = req.user.id;

    const company = await CompanyModel.create({
        name, adress, type, rccm, idNat, numImpot, icon, tel1, tel2, tel3, userId, email
    });
    if(company){
        sendResult(res, 201, null, "enregistrement de l'entreprise effectué avec succès", company)
    }
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
        sendResult(res, 500, "company not found", null, null)
    }
};

module.exports = {
    createCompany,
    updateCompany,
}