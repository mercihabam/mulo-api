const { checkToken } = require("../../../Utils/authentication");
const { addTocart, editItem, deleteItem, getAllItemsByUser, getCartByUser, deleteCart } = require("../controllers/cart.controller");
const { validQuantity, checkMenuExist, checkCartExist, checkNoCart } = require("../validation/cart.validation");

const cartRouter = require("express").Router();

cartRouter.post("/add-to-cart/:menuId", checkToken, validQuantity, checkNoCart, checkCartExist, checkMenuExist, addTocart);
cartRouter.post("/edit-item/:id", checkToken, validQuantity, editItem);
cartRouter.get("/get-cart-items/:cartId", checkToken, getAllItemsByUser);
cartRouter.get("/get-cart", checkToken, getCartByUser);
cartRouter.get("/delete-item/:id", checkToken, deleteItem);
cartRouter.get("/delete-cart/:cartId", checkToken, deleteCart);

module.exports = cartRouter;