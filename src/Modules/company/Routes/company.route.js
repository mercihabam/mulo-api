const express = require("express");
const { uploadCompanyImage } = require("../../../Middlwares/upload");
const { checkToken, checkCompanyToken } = require("../../../Utils/authentication");
const { checkIsCompanyAdmin, checkIsCompanyUser } = require("../../companyUser/Validation/companyUser.validation");
const { createCompany, updateCompany, deleteCompany, getCompanys, getCompanyById, signCompany, getCurrentCompany, signOut } = require("../controllers/company.controller");
const { checkCompanyName, checkCompanyTel, checkRequiredFields, checkCompanyEmail, checkCompanyNameToUpdate, checkCompanyEmailToUpdate, checkCompanyTelToUpdate } = require("../Validation/company.validation");
const companyRouter = express.Router();

companyRouter.post("/create-company", checkToken, checkRequiredFields, checkCompanyName, checkCompanyEmail, checkCompanyTel, createCompany);
companyRouter.post("/update-company/:id", checkToken, checkCompanyToken, checkIsCompanyAdmin, checkCompanyNameToUpdate, checkCompanyEmailToUpdate, checkCompanyTelToUpdate, updateCompany);
companyRouter.get("/delete-company/:id", checkToken, deleteCompany);
companyRouter.get("/all", getCompanys);
companyRouter.get("/find-by-id/:id", getCompanyById);
companyRouter.post("/sign-company", checkToken, signCompany);
companyRouter.get("/sign-out-company", checkToken, signOut);
companyRouter.get("/current-company", checkToken, checkCompanyToken, checkIsCompanyUser, getCurrentCompany);

module.exports = companyRouter;