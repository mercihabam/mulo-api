const express = require("express");
const { checkToken } = require("../../../Utils/authentication");
const { createCompany, updateCompany, deleteCompany, getCompanys, getCompanyById } = require("../controllers/company.controller");
const { checkCompanyName, checkCompanyTel, checkRequiredFields } = require("../Validation/company.validation");
const companyRouter = express.Router();

companyRouter.post("/create-company", checkToken, checkRequiredFields, checkCompanyName, checkCompanyTel, createCompany);
companyRouter.post("/update-company/:id", checkToken, updateCompany);
companyRouter.get("/delete-company/:id", checkToken, deleteCompany);
companyRouter.get("/all", getCompanys);
companyRouter.get("/find-by-id/:id", getCompanyById);

module.exports = companyRouter;