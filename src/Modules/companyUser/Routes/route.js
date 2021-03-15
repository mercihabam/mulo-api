const { checkToken } = require("../../../Utils/authentication");
const { checkEmailExist } = require("../../Users/validation/user.validation");
const { createCompanyUser } = require("../controllers/controller");
const { createUser } = require("../Middlewares/middlewares");
const { checkIsCompanyAdmin, checkRequiredFields } = require("../Validation/companyUser.validation");

const companyUserRoutes = require("express").Router();

companyUserRoutes.post("/create-company-user", checkRequiredFields, checkToken, checkEmailExist, checkIsCompanyAdmin, createUser, createCompanyUser);

module.exports = companyUserRoutes;