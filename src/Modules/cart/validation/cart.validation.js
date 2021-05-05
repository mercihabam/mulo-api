const cartItem = require("../../../Database/models/cartItems");
const Cart = require("../../../Database/models/cart");
const { sendResult } = require("../../../Utils/helper");
const uuid = require("uuid");

async function checkMenuExist(req, res, next){
    const { quantity } = req.body;
    const item = await cartItem.findOne({ where: { userId: req.user.id, menuId: req.params.menuId, cartId: req.cartId } });
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
    if(req.body.companyId){
        const cart = await Cart.findOne({ where: { userId: req.user.id, companyId: req.body.companyId, ordered: false } });
        if(cart){
            req.cartId = cart.id;
            next();
        }else{
            const created = await Cart.create({
                id: uuid.v4(),
                userId: req.user.id,
                companyId: req.body.companyId
            });
            req.cartId = created.id;
            next()
        }
    }else{
        sendResult(res, 403, "the company field must be provided", null, null)
    }
};

async function checkNoCart(req, res, next){
    const { companyId } = req.body;
    if(companyId){
        const cart = await Cart.findOne({ where: { userId: req.user.id, ordered: false, deletedAt: null }, include: "Resto" });
        if(cart && cart.companyId !== companyId){
            sendResult(res, 403, `votre panier est occupé par le restaurant ${cart.Resto.name} pour le moment, veuillez vider votre panier pour continuer vos opérations`, null, cart)
        }else{
            next();
        }
    }else{
        sendResult(res, 403, "the company field must be provided", null, null)
    }
}

module.exports = {
    checkMenuExist,
    validQuantity,
    checkCartExist,
    checkNoCart
};