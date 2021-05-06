const cartItem = require("../../../Database/models/cartItems");
const Cart = require("../../../Database/models/cart");
const Menu = require("../../../Database/models/menus");
const { sendResult } = require("../../../Utils/helper");
const uuid = require("uuid");
const { Op } = require("sequelize");

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

async function deleteItem(req, res){
    const item = await cartItem.findOne({ where: { id: req.params.id } });
    if(item){
        await item.destroy();
        sendResult(res, 200, null, "article rétiré du panier", null)
    }else{ sendResult(res, 404, "item not found", null, null) }
};

async function getAllItemsByUser(req, res){
    const items = await cartItem.findAndCountAll({ where: { cartId: req.params.cartId }, 
        limit: parseInt(req.query.limit) || 10, offset: parseInt(req.query.offset) || 0, include: "Menu" });
        sendResult(res, 200, null, null, items);
};

async function getCartByUser(req, res){
    const cart = await Cart.findOne({ where: { userId: req.user.id,
    [ Op.or ]: [
        { ordered: false },
        { ordered: null }
    ],
    deletedAt: null
    }, include: "Resto" });
    sendResult(res, 200, null, null, cart)
};

async function deleteCart(req, res){
    const cart = await Cart.findOne({ where: { id: req.params.cartId } });
    if(cart){
        const items = await cartItem.findAll({ where: { cartId: cart.id } });
        items.forEach(async(item) => {
            await item.destroy()
        });
        const updated = await cart.destroy();
        if(updated){
            sendResult(res, 200, null, "panier supprimer", null)
        }
    }
};

module.exports = {
    addTocart,
    editItem,
    deleteItem,
    getAllItemsByUser,
    getCartByUser,
    deleteCart
}