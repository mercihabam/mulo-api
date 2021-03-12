const { checkToken } = require("../../../Utils/authentication");
const { addTocart, editItem, deleteItem, getItemByUserAndCompany, getAllItemsByUser } = require("../controllers/cart.controller");
const { validQuantity, checkMenuExist, checkCartExist } = require("../validation/cart.validation");

const cartRouter = require("express").Router();

cartRouter.post("/add-to-cart/:menuId", checkToken, validQuantity, checkMenuExist, addTocart);
cartRouter.post("/edit-item/:id", checkToken, validQuantity, editItem);
cartRouter.get("/get-items/:companyId", checkToken, getItemByUserAndCompany);
cartRouter.get("/get-all-items", checkToken, getAllItemsByUser);
cartRouter.get("/delete-item/:id", checkToken, deleteItem);

module.exports = cartRouter;