const express = require("express");
const { checkToken } = require("../../../Utils/authentication");
const { createCompany, updateCompany } = require("../controllers/company.controller");
const { checkCompanyName, checkCompanyTel, checkRequiredFields } = require("../Validation/company.validation");
const companyRouter = express.Router();

companyRouter.post("/create-company", checkToken, checkRequiredFields, checkCompanyName, checkCompanyTel, createCompany);
companyRouter.post("/update-company/:id", checkToken, updateCompany);

module.exports = companyRouter;