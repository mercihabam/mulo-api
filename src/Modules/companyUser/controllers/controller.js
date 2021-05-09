const CompanyModel = require("../../../Database/models/companys");
const CompanyUser = require("../../../Database/models/companyUser");
const { sendResult } = require("../../../Utils/helper");
const { sendPassToUser } = require("../../Mail/mail.service");

async function createCompanyUser(req, res){
    const { companyId, role, firstName, lastName, email } = req.body;

    const companyUser = await CompanyUser.create({
        userId : req.userId, companyId, role
    });
    if(companyUser){
        sendPassToUser({ firstName: firstName, lastName: lastName, company: req.company.name }, email)
        sendResult(res, 201, null, "employée enregistré", companyUser)
    }
};

async function getCurrentCompanyUser(req, res){
    const user = await CompanyUser.findOne({ where: { companyId: req.company.id, userId: req.user.id } });
    if(user){
        sendResult(res, 200, null, null, user)
    }else{
        sendResult(res, 404, "user not found", null, null)
    }
};

async function getCompanyUsersByCompany(req, res){
    const users = await CompanyUser.findAndCountAll({ where: { companyId: req.params.companyId, deletedAt: null },
    offset: parseInt(req.query.offset) || 0, limit: parseInt(req.query.limit) || 10 });
    sendResult(res, 200, null, null, users)
};

async function deleteCompanyUser(req, res){
    const comapnyUser = await CompanyUser.findOne({ where: { id: req.params.id } });
    if(comapnyUser){
        await comapnyUser.update({ deletedAt: new Date() });
        sendResult(res, 200, null, "employée supprimé", null)
    }else{
        sendResult(res, 404, "user not found", null, null)
    }
};

async function updateCompanyUser(req, res){
    const comapnyUser = await CompanyUser.findOne({ where: { id: req.params.id } });
    if(comapnyUser){
        await comapnyUser.update({ role: req.body.role || comapnyUser.role });
        sendResult(res, 200, null, "modification enregistreé", null)
    }else{
        sendResult(res, 404, "user not found", null, null)
    }
};

module.exports = {
    createCompanyUser,
    getCurrentCompanyUser,
    getCompanyUsersByCompany,
    deleteCompanyUser,
    updateCompanyUser
}