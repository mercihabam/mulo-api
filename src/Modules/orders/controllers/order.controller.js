const CartItems = require("../../../Database/models/cartItems");
const Menus = require("../../../Database/models/menus");
const Orders = require("../../../Database/models/orders");
const Users = require("../../../Database/models/users");
const OrderItems = require("../../../Database/models/orderItems");
const { sendResult } = require("../../../Utils/helper");
const uuid = require("uuid");
const { sendOrderToAdmin } = require("../../Mail/mail.service");

async function createOrder(req, res){
    const { adress, adress2, tel } = req.body;
    const codeDelivery = Math.round(Math.random() * (90000000-10000000) + 10000000);
    console.log(req.cart);

    const order = await Orders.create({ id: uuid.v4(), userId: req.user.id, adress: adress, adress2: adress2, phoneNumber: tel, codeDelivery: codeDelivery,
    companyId: req.cart.companyId, cartId: req.cart.id });
    if(order){
        req.cart.update({ ordered: true });
        sendResult(res, 201, null, "opération effectuée", order);
        sendOrderToAdmin(order.codeDelivery, req.user, "mercihabam@gmail.com");
    }
};

async function getOrders(req, res){
    const orders = await Orders.findAndCountAll({ where: { deletedAt : null },
        limit: parseInt(req.query.limit) || 10, offset: parseInt(req.query.offset) || 0,
        // orderBy: "-createdAt",
        include: "User"  });
    sendResult(res, 200, null, null, orders);
};

async function getOrder(req, res){
    const order = await Orders.findOne({ where: { id: req.params.orderId } });
    sendResult(res, 200, null, null, order);
};

async function getOrderItemsByOrder(req, res){
    const orders = await OrderItems.findAndCountAll({ where: { deletedAt : null, orderId: req.params.orderId },
        limit: parseInt(req.query.limit) || 10, offset: parseInt(req.query.offset) || 0,
        include: [ { model: CartItems, as: "Item", include: [{ model: Menus, as: "Menu", include: "Resto" }] } ] });
    sendResult(res, 200, null, null, orders);
};

async function getDeliveredOrders(req, res){
    const orders = await Orders.findAndCountAll({ where: { deletedAt : null, delivered: true },
        limit: parseInt(req.query.limit) || 10, offset: parseInt(req.query.offset) || 0,
        include: "User"  });
    sendResult(res, 200, null, null, orders);
};

async function getUnDeliveredOrders(req, res){
    const orders = await Orders.findAndCountAll({ where: { deletedAt : null, delivered: false },
        limit: parseInt(req.query.limit) || 10, offset: parseInt(req.query.offset) || 0,
        include: "User"  });
    sendResult(res, 200, null, null, orders);
};

async function getRecentOrders(req, res){
    let date = new Date();
    const orders = await Orders.findAndCountAll({ where: { deletedAt : null, createdAt : date },
        limit: parseInt(req.query.limit) || 10, offset: parseInt(req.query.offset) || 0,
        include: "User"  });
    sendResult(res, 200, null, null, orders);
};



async function getOrdersByCompany(req, res){
    const orders = await Orders.findAndCountAll({ where: { companyId: req.params.companyId, deletedAt: null }, 
        limit: parseInt(req.query.limt) || 10, offset: parseInt(req.query.offset) || 0, include: "User"});
    sendResult(res, 200, null, null, orders);
};

async function getDeliveredOrdersByCompany(req, res){
    const orders = await Orders.findAndCountAll({ where: { companyId: req.params.id, delivered: true, deletedAt: null },
        limit: parseInt(req.query.limt) || 10, offset: parseInt(req.query.offset) || 0, include: "User"});
    sendResult(res, 200, null, null, orders);
};

async function getUnDeliveredOrdersByComapny(req, res){
    const orders = await Orders.findAndCountAll({ where: { deletedAt : null, delivered: false, companyId: req.params.id },
        limit: parseInt(req.query.limit) || 10, offset: parseInt(req.query.offset) || 0, include: "User"  });
    sendResult(res, 200, null, null, orders);
};

async function getOrdersByUser(req, res){
    const orders = await Orders.findAndCountAll({ where: { deletedAt : null, userId: req.params.userId },
        limit: parseInt(req.query.limt) || 10, offset: parseInt(req.query.offset) || 0 });
    sendResult(res, 200, null, null, orders);
};


async function markAsDelivered(req, res){
    const { codeDelivery } = req.body;

    const order = await Orders.findOne({ where: { id: req.params.orderId } });
    if(order){
        if(order.codeDelivery === parseInt(codeDelivery)){
            const updated = await order.update({ delivered: true, deliveredAt: new Date() });
            if(updated){ sendResult(res, 200, null, "commande marqué comme livré", updated) }
        }else{ sendResult(res, 403, " code de livraison incorrect ", null, null) }
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
    getOrder,
    getDeliveredOrders,
    getUnDeliveredOrders,
    getOrdersByCompany,
    getOrderItemsByOrder,
    markAsDelivered,
    deleteOrder,
    getOrdersByUser,
    getRecentOrders,
    getDeliveredOrdersByCompany,
    getUnDeliveredOrdersByComapny
}