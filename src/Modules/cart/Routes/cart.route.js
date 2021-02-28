const { checkToken } = require("../../../Utils/authentication");
const { addTocart, editItem, getItemByUser, deleteItem } = require("../controllers/cart.controller");
const { validQuantity, checkMenuExist, checkCartExist } = require("../validation/cart.validation");

const cartRouter = require("express").Router();

cartRouter.post("/add-to-cart/:menuId", checkToken, validQuantity, checkMenuExist, checkCartExist, addTocart);
cartRouter.post("/edit-item/:id", checkToken, validQuantity, editItem);
cartRouter.get("/get-items", checkToken, getItemByUser);
cartRouter.get("/delete-item/:id", checkToken, deleteItem);

module.exports = cartRouter;