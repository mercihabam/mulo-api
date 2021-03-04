const { checkToken } = require("../../../Utils/authentication");
const { createOrder } = require("../controllers/order.controller");

const orderRouter = require("express").Router();

orderRouter.post("/create-order", checkToken, createOrder);

module.exports = orderRouter;