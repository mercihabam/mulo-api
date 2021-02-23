const menuModel = require("../../../Database/models/menus");
const { sendResult } = require("../../../Utils/helper");

function checkRequiredFields(req, res, next){
    const { name, type, image, price, currency, companyId, ingredients} = req.body;
    if(name && type && image && price && currency && companyId && ingredients){next()}else{
        sendResult(res, 403, "vous devez remplir tous les champs obligatoires", null, null)
    }
};

async function checkMenuNameExist(req, res, next){
    const { name } = req.body;
    const menu = await menuModel.findOne({ where: { name: name } });
    if(menu){
        sendResult(res, 403, "un menu existe déjà avec ce nom", null, null);
    }else{ next() };
}

module.exports = {
    checkRequiredFields,
    checkMenuNameExist
}