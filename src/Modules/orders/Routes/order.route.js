const { checkToken, checkIsAdmin } = require("../../../Utils/authentication");
const { createOrder, getOrders, getOrdersByCompany, getOrderDetail, markAsDelivered, getDeliveredOrders, deleteOrder, getOrdersByUser } = require("../controllers/order.controller");
const { checkRequiredFields, checkCode } = require("../validation/order.validation");

const orderRouter = require("express").Router();

orderRouter.post("/create-order", checkToken, checkRequiredFields, createOrder);
orderRouter.get("/all", checkToken, checkIsAdmin, getOrders);
orderRouter.get("/find-by-company/:companyId", checkToken, getOrdersByCompany);
orderRouter.get("/find-by-user/:userId", checkToken, getOrdersByUser);
orderRouter.get("/delivred-orders-by-company/:companyId", checkToken, getOrdersByCompany);
orderRouter.get("/find-one/:cartId", checkToken, getOrderDetail);
orderRouter.post("/mark-as-delivered/:orderId", checkToken, checkIsAdmin, checkCode, markAsDelivered);
orderRouter.get("/delivered-orders", checkToken, checkIsAdmin, getDeliveredOrders);
orderRouter.get("/delete-order/:orderId", checkToken, checkIsAdmin, deleteOrder);

module.exports = orderRouter;