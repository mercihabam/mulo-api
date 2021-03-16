const express = require("express");
const { uploadCompanyImage } = require("../../../Middlwares/upload");
const { checkToken, checkCompanyToken } = require("../../../Utils/authentication");
const { createCompany, updateCompany, deleteCompany, getCompanys, getCompanyById, signCompany, getCurrentCompany } = require("../controllers/company.controller");
const { checkCompanyName, checkCompanyTel, checkRequiredFields, checkCompanyEmail } = require("../Validation/company.validation");
const companyRouter = express.Router();

companyRouter.post("/create-company", checkToken, uploadCompanyImage.single("file"), checkRequiredFields, checkCompanyName, checkCompanyEmail, checkCompanyTel, createCompany);
companyRouter.post("/update-company/:id", checkToken, updateCompany);
companyRouter.get("/delete-company/:id", checkToken, deleteCompany);
companyRouter.get("/all", getCompanys);
companyRouter.get("/find-by-id/:id", getCompanyById);
companyRouter.post("/sign-company", checkToken, signCompany);
companyRouter.get("/current-company", checkToken, checkCompanyToken, getCurrentCompany);

module.exports = companyRouter;