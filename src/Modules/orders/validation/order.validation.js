const { sendResult } = require("../../../Utils/helper");

function checkRequiredFields(req, res, next){
    const { cartArray, adress, tel } = req.body;
    if(cartArray, adress, tel){
        if(cartArray.length){
            next();
        }else{
            sendResult(res, 403, `cartArray must be type of array but is ${ typeof(cartArray) }`, null, null)
        }
    }else{
        sendResult(res, 403, "vous devez rewmplir tous les champs obligatoires")
    }
};

function checkCode(req, res, next){
    const { codeDelivery } = req.body;
    if(codeDelivery){
        next();
    }else{ sendResult(res, 403, "vous devez fournir le code de livraison", null, null) }
};

module.exports = {
    checkRequiredFields,
    checkCode,
}