const Cart = require("../../../Database/models/cart");
const CartItems = require("../../../Database/models/cartItems");
const Menus = require("../../../Database/models/menus");
const Orders = require("../../../Database/models/orders");
const { sendResult } = require("../../../Utils/helper");

async function createOrder(req, res){
    const { cartArray, adress, adress2, tel } = req.body;
    const codeDelivery = Math.round(Math.random() * (90000000-10000000) + 10000000);

    if( cartArray ){
        const cart = await Cart.create({ userId: req.user.id, ordered: true })
        cartArray.forEach(async(item) => {
            const cartItem = await CartItems.findOne({ where: { id: item } });
            if(cartItem){
                await cartItem.update({
                    cartId: cart.id,
                    ordered: true
                })
            }
        });
        const order = await Orders.create({ userId: req.user.id, cartId: cart.id, adress: adress, adress2: adress2, phoneNumber: tel, codeDelivery: codeDelivery });
        if(order){
            sendResult(res, 201, null, "opération effectuée", order);
        }
    }
};

async function getOrders(req, res){
    const orders = await Orders.findAndCountAll({ where: { deletedAt : null },
        limit: parseInt(req.query.limt) || 10, offset: parseInt(req.query.offset) || 0 });
    sendResult(res, 200, null, null, orders);
};

async function getDeliveredOrders(req, res){
    const orders = await Orders.findAndCountAll({ where: { deletedAt : null, delivered: true },
        limit: parseInt(req.query.limt) || 10, offset: parseInt(req.query.offset) || 0 });
    sendResult(res, 200, null, null, orders);
};

async function getOrderDetail(req, res){
    const order = await Orders.findOne({ where: { id : req.params.cartId }, 
        include: [{ model: Cart, as: "Cart", 
        include: [{ model: CartItems, as: "Items", include: "Menu"  }] }],
        limit: parseInt(req.query.limt) || 10, offset: parseInt(req.query.offset) || 0 });
    if(order){ sendResult(res, 200, null, null, order); }else{ sendResult(res, 404, "order not found", null, null) }
}

async function getOrdersByCompany(req, res){
    const orders = await Orders.findAll({ where: { deletedAt : null }, 
        include: [{ model: Cart, as: "Cart", 
        include: [{ model: CartItems, as: "Items", include: [{ model: Menus, as:"Menu", where: { companyId: req.params.companyId } }]  }] }],
        limit: parseInt(req.query.limt) || 10, offset: parseInt(req.query.offset) || 0 });
        if(orders[0].Cart.Items.length > 0){
            sendResult(res, 200, null, null, orders);
        }else{
            sendResult(res, 200, null, null, orders[0].Cart.Items)
        }
};

async function getDeliveredOrdersByCompany(req, res){
    const orders = await Orders.findAll({ where: { deletedAt : null, delivered: true }, 
        include: [{ model: Cart, as: "Cart", 
        include: [{ model: CartItems, as: "Items", include: [{ model: Menus, as:"Menu", where: { companyId: req.params.companyId } }]  }] }],
        limit: parseInt(req.query.limt) || 10, offset: parseInt(req.query.offset) || 0 });
        if(orders[0].Cart.Items.length > 0){
            sendResult(res, 200, null, null, orders);
        }else{
            sendResult(res, 200, null, null, orders[0].Cart.Items)
        }
};

async function markAsDelivered(req, res){
    const { codeDelivery } = req.body;

    const order = await Orders.findOne({ where: { id: req.params.orderId } });
    if(order){
        if(order.codeDelivery === codeDelivery){
            const updated = await order.update({ delivered: true, deliveredAt: new Date() });
            if(updated){ sendResult(res, 200, null, "commande marqué comme livré", updated) }
        }else{ sendResult(res, 403, " code de livraison incorrect ") }
    }else{
        sendResult(res, 404, " order not found ", null, null)
    }
};

async function deleteOrder(req, res){
    const order = await Orders.findOne({ where: { id : req.params.orderId } });
    if(order){
        const updated = await order.update({ deletedAt: new Date() });
        if(updated){ sendResult(res, 200, null, "commande supprimé", order); };
    }else{ sendResult(res, 404, "order not found", null, null) }
}

module.exports = {
    createOrder,
    getOrders,
    getDeliveredOrders,
    getOrdersByCompany,
    getDeliveredOrdersByCompany,
    getOrderDetail,
    markAsDelivered,
    deleteOrder,
}