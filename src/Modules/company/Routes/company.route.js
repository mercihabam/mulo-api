const express = require("express");
const { checkToken } = require("../../../Utils/authentication");
const { createCompany } = require("../controllers/company.controller");
const { checkCompanyName, checkCompanyTel, checkRequiredFields } = require("../Validation/company.validation");
const companyRouter = express.Router();

companyRouter.post("/create-company", checkToken, checkRequiredFields, checkCompanyName, checkCompanyTel, createCompany);

module.exports = companyRouter;