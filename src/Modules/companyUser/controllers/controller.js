const CompanyModel = require("../../../Database/models/companys");
const CompanyUser = require("../../../Database/models/companyUser");
const { sendResult } = require("../../../Utils/helper");

async function createCompanyUser(req, res){
    const { companyId, role } = req.body;

    const companyUser = await CompanyUser.create({
        userId : req.userId, companyId, role
    });
    if(companyUser){
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

module.exports = {
    createCompanyUser,
    getCurrentCompanyUser,
    getCompanyUsersByCompany
}