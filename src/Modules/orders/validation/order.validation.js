const { sendResult } = require("../../../Utils/helper");
const Cart = require("../../../Database/models/cart");

function checkRequiredFields(req, res, next){
    const { cartId, adress, tel } = req.body;
    if(cartId, adress, tel){
        next();
    }else{
        sendResult(res, 403, "vous devez remplir tous les champs obligatoires")
    }
};

function checkCode(req, res, next){
    const { codeDelivery } = req.body;
    if(codeDelivery){
        next();
    }else{ sendResult(res, 403, "vous devez fournir le code de livraison", null, null) }
};

async function checkValidCart(req, res, next){
    const { cartId } = req.body;
    if(cartId){
        const cart = await Cart.findOne({ where: { id: cartId, ordered: false } });
        if(cart){
            req.cart = cart;
            next();
        }else{
            sendResult(res, 404, "invalid cart", null, null)
        }
    }else{
        sendResult(res, 403, "veuillez fournir le champ cart", null, null)
    }
}

module.exports = {
    checkRequiredFields,
    checkCode,
    checkValidCart
}