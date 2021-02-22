const express = require("express");
const companyRouter = require("./Modules/company/Routes/company.route");
const userRoutes = require("./Modules/Users/Routes/user.route");

const app = express.Router();

app.use("/users", userRoutes);
app.use("/companys", companyRouter);

module.exports = app;