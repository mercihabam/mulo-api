const { checkToken, checkIsAdmin } = require("../../../Utils/authentication");
const { createOrder, getOrders, getOrder, markAsDelivered, getDeliveredOrders, deleteOrder, getOrdersByUser, getOrderItemsByOrder, getUnDeliveredOrders, getRecentOrders, getOrdersByCompany, getUnDeliveredOrdersByComapny, getDeliveredOrdersByCompany } = require("../controllers/order.controller");
const { checkRequiredFields, checkCode, checkValidCart } = require("../validation/order.validation");
const { checkIsCompanyAdmin } = require("../../companyUser/Validation/companyUser.validation");

const orderRouter = require("express").Router();

orderRouter.post("/create-order", checkToken, checkRequiredFields, checkValidCart, createOrder);
orderRouter.get("/all", checkToken, checkIsAdmin, getOrders);
orderRouter.get("/find-by-company/:companyId", checkToken, getOrdersByCompany);
orderRouter.get("/find-by-user/:userId", checkToken, getOrdersByUser);
orderRouter.get("/find-order/:orderId", checkToken, getOrder);
orderRouter.get("/find-by-order/:orderId", checkToken, getOrderItemsByOrder);
orderRouter.post("/mark-as-delivered/:orderId", checkToken, checkIsAdmin, checkCode, markAsDelivered);
orderRouter.get("/delivered-orders", checkToken, checkIsAdmin, getDeliveredOrders);
orderRouter.get("/delivered-orders-by-company/:id", checkToken, getDeliveredOrdersByCompany);
orderRouter.get("/undelivered-orders-by-company/:id", checkToken, getUnDeliveredOrdersByComapny);
orderRouter.get("/undelivered-orders", checkToken, checkIsAdmin, getUnDeliveredOrders);
orderRouter.get("/recent-orders", checkToken, checkIsAdmin, getRecentOrders);
orderRouter.get("/delete-order/:orderId", checkToken, checkIsAdmin, deleteOrder);

module.exports = orderRouter;