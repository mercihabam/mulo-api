const { checkToken, checkIsAdmin } = require("../../../Utils/authentication");
const { createOrder, getOrders, getOrdersByCompany, getOrderDetail } = require("../controllers/order.controller");
const { checkRequiredFields } = require("../validation/order.validation");

const orderRouter = require("express").Router();

orderRouter.post("/create-order", checkToken, checkRequiredFields, createOrder);
orderRouter.get("/all", checkToken, checkIsAdmin, getOrders);
orderRouter.get("/find-by-company/:companyId", checkToken, getOrdersByCompany);
orderRouter.get("/find-one/:cartId", checkToken, checkIsAdmin, getOrderDetail);

module.exports = orderRouter;