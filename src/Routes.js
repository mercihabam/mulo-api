const express = require("express");
const cartRouter = require("./Modules/cart/Routes/cart.route");
const companyRouter = require("./Modules/company/Routes/company.route");
const companyUserRoutes = require("./Modules/companyUser/Routes/route");
const menuRouter = require("./Modules/menus/Routes/menu.routes");
const orderRouter = require("./Modules/orders/Routes/order.route");
const userRoutes = require("./Modules/Users/Routes/user.route");

const app = express.Router();

app.use("/users", userRoutes);
app.use("/companys", companyRouter);
app.use("/menus", menuRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);
app.use("/company-user", companyUserRoutes);

module.exports = app;