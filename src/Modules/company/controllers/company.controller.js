const CompanyModel = require("../../../Database/models/companys");
const CompanyUser = require("../../../Database/models/companyUser");
const { sendResult } = require("../../../Utils/helper");
const fs = require("fs");

async function createCompany(req, res){
    const { name, adress, type, rccm, numImpot, idNat, tel1, tel2, tel3, email } = req.body;
    const userId = req.user.id;
    const company = await CompanyModel.create({
        name, adress, type, rccm, idNat, numImpot, tel1, tel2, tel3, email, icon: req.file.filename
    });
    if(company){
        const companyUser = await CompanyUser.create({ userId: userId, companyId: company.id, role: "ADMIN" });
        if(companyUser){
            sendResult(res, 201, null, "enregistrement de l'entreprise effectué avec succès", company)
        }
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

async function getCompanyByUser(req, res){
    const companys = await CompanyModel.findAndCountAll({ where: { deletedAt: null, userId: req.user.id }, limit: 10, offset: parseInt(req.query.offset) || 0 });
    sendResult(res, 200, null, null, companys);
};

module.exports = {
    createCompany,
    updateCompany,
    deleteCompany,
    getCompanys,
    getCompanyById,
    getCompanyByUser,
}