const express = require("express");
const { checkToken, checkCompanyToken } = require("../../../Utils/authentication");
const { checkIsCompanyAdmin } = require("../../companyUser/Validation/companyUser.validation");
const { createMenu, deleteMenu, updateMenu, getMenus, getMenusByCompany, getMenuById, getMenuReady, searchMenusByName } = require("../controllers/menu.controller");
const { checkRequiredFields, checkMenuNameExist } = require("../validation/menu.validation");
const menuRouter = express.Router();

menuRouter.post("/create-menu", checkRequiredFields, checkToken, checkCompanyToken, checkIsCompanyAdmin, checkMenuNameExist, createMenu);
menuRouter.get("/delete-menu/:id", checkToken, checkCompanyToken, checkIsCompanyAdmin, deleteMenu);
menuRouter.post("/update-menu/:id", checkToken, checkCompanyToken, checkIsCompanyAdmin, updateMenu);
menuRouter.get("/all", getMenus);
menuRouter.get("/search-by-name", searchMenusByName);
menuRouter.get("/menusByCompany/:companyId", getMenusByCompany);
menuRouter.get("/find-one/:id", getMenuById);
menuRouter.get("/menus-ready", getMenuReady);
menuRouter.get("/menus-ready-by-company/:companyId", getMenusByCompany)

module.exports = menuRouter;