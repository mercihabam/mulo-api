const express = require("express");
const { uploadMenuImage } = require("../../../Middlwares/upload");
const { checkToken, checkIsAdmin } = require("../../../Utils/authentication");
const { createMenu, deleteMenu, updateMenu, getMenus, getMenusByCompany, getMenuById, getMenuReady } = require("../controllers/menu.controller");
const { checkRequiredFields, checkMenuNameExist } = require("../validation/menu.validation");
const menuRouter = express.Router();

menuRouter.post("/create-menu", checkRequiredFields, checkMenuNameExist, checkToken, checkIsAdmin, createMenu);
menuRouter.get("/delete-menu/:id", checkToken, deleteMenu);
menuRouter.post("/update-menu/:id", checkToken, updateMenu);
menuRouter.get("/all", getMenus);
menuRouter.get("/menusByCompany/:companyId", getMenusByCompany);
menuRouter.get("/find-one/:id", getMenuById);
menuRouter.get("/menus-ready", getMenuReady);
menuRouter.get("/menus-ready-by-company/:companyId", getMenusByCompany)

module.exports = menuRouter;