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

module.exports = {
    createCompanyUser,
}