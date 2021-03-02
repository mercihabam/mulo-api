const cartItem = require("../../../Database/models/cartItems");
const Cart = require("../../../Database/models/cart");
const Menu = require("../../../Database/models/menus");
const { sendResult } = require("../../../Utils/helper");
const uuid = require("uuid");

async function addTocart(req, res){
    const { quantity } = req.body;
    const item = await cartItem.create({
        id: uuid.v4(),
        menuId: req.params.menuId,
        quantity,
        userId: req.user.id,
        cartId: req.cartId
    });
    if(item){
        sendResult(res, 201, null, "ajout au panier effectué", item)
    }
};

async function editItem(req, res){
    const { quantity } = req.body;
    const item = await cartItem.findOne({ where: { id: req.params.id } });
    if(item){
        const updated = await item.update({ quantity: quantity });
        sendResult(res, 200, null, "quantité modifiée", updated)
    }else{ sendResult(res, 404, "item not found", null, null) }
};

async function getItemByUserAndCompany(req, res){
    // const items = await cartItem.findAndCountAll({ where: { userId: req.user.id, ordered: false }, 
    //     limit: parseInt(req.query.limit) || 10, offset: parseInt(req.query.offset) || 0 });
    const items = await Cart.findOne({ where: { userId: req.user.id, ordered: false, companyId: req.params.companyId }, include: [ { model: cartItem, where: {ordered: false}, as: "Items", include: "Menu" } ] });
    sendResult(res, 200, null, null, items);
};

async function deleteItem(req, res){
    const item = await cartItem.findOne({ where: { id: req.params.id } });
    if(item){
        await item.destroy();
        sendResult(res, 200, null, "article rétiré du panier", null)
    }else{ sendResult(res, 404, "item not found", null, null) }
};

module.exports = {
    addTocart,
    editItem,
    getItemByUserAndCompany,
    deleteItem
}