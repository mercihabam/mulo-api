const { checkToken, checkIsAdmin } = require("../../../Utils/authentication");
const { createOrder, getOrders, getOrder, markAsDelivered, getDeliveredOrders, deleteOrder, getOrdersByUser, getOrderItemsByOrder, getOrderItemsByCompany, getUnDeliveredOrders } = require("../controllers/order.controller");
const { checkRequiredFields, checkCode } = require("../validation/order.validation");

const orderRouter = require("express").Router();

orderRouter.post("/create-order", checkToken, checkRequiredFields, createOrder);
orderRouter.get("/all", checkToken, checkIsAdmin, getOrders);
orderRouter.get("/find-by-company/:companyId", checkToken, getOrderItemsByCompany);
orderRouter.get("/find-by-user/:userId", checkToken, getOrdersByUser);
orderRouter.get("/find-order/:orderId", checkToken, getOrder);
orderRouter.get("/find-by-order/:orderId", checkToken, getOrderItemsByOrder);
orderRouter.post("/mark-as-delivered/:orderId", checkToken, checkIsAdmin, checkCode, markAsDelivered);
orderRouter.get("/delivered-orders", checkToken, checkIsAdmin, getDeliveredOrders);
orderRouter.get("/undelivered-orders", checkToken, checkIsAdmin, getUnDeliveredOrders);
orderRouter.get("/delete-order/:orderId", checkToken, checkIsAdmin, deleteOrder);

module.exports = orderRouter;