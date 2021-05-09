const { checkToken, checkCompanyToken } = require("../../../Utils/authentication");
const { checkEmailExist } = require("../../Users/validation/user.validation");
const { createCompanyUser, getCurrentCompanyUser, getCompanyUsersByCompany, deleteCompanyUser, updateCompanyUser } = require("../controllers/controller");
const { createUser } = require("../Middlewares/middlewares");
const { checkIsCompanyAdmin, checkRequiredFields, checkIsValidCompany } = require("../Validation/companyUser.validation");

const companyUserRoutes = require("express").Router();

companyUserRoutes.post("/create-company-user", checkRequiredFields, checkIsValidCompany, checkToken, checkEmailExist, checkCompanyToken, checkIsCompanyAdmin, createUser, createCompanyUser);
companyUserRoutes.get("/delete-company-user/:id", checkToken, checkCompanyToken, checkIsCompanyAdmin, deleteCompanyUser);
companyUserRoutes.post("/update-company-user/:id", checkToken, checkCompanyToken, checkIsCompanyAdmin, updateCompanyUser);
companyUserRoutes.get("/current-company-user", checkToken, checkCompanyToken, getCurrentCompanyUser);
companyUserRoutes.get("/get-company-users/:companyId", checkToken, checkCompanyToken, getCompanyUsersByCompany);

module.exports = companyUserRoutes;