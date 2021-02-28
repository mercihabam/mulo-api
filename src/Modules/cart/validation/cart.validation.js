const cartItem = require("../../../Database/models/cartItems");
const Cart = require("../../../Database/models/cart");
const { sendResult } = require("../../../Utils/helper");

async function checkMenuExist(req, res, next){
    const { quantity } = req.body;
    const item = await cartItem.findOne({ where: { userId: req.user.id, menuId: req.params.menuId, ordered: false } });
    if(item){
        const updated = await item.update({
            quantity: parseInt(item.quantity) + parseInt(quantity)
        });
        sendResult(res, 200, null, "quantité ajoutée au panier", updated)
    }else{ next() }
};

async function validQuantity(req, res, next){
    const { quantity } = req.body;

    if(quantity >= 1){
        next();
    }else{
        sendResult(res, 403, "veuillez entrer une quantité valide", null, null)
    }
};

async function checkCartExist(req, res, next){
    const cart = await Cart.findOne({ where: { userId: req.user.id, ordered: false } });
    if(cart){
        req.cartId = cart.id;
        next();
    }else{
        const created = await Cart.create({
            userId: req.user.id
        });
        req.cartId = created.id;
        next()
    }
};

module.exports = {
    checkMenuExist,
    validQuantity,
    checkCartExist
};