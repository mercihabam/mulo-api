const express = require("express");
const userRoutes = require("./Modules/Users/Routes/user.route");

const app = express.Router();

app.use("/users", userRoutes);

module.exports = app;