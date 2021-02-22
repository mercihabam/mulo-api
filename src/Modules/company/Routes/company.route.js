const express = require("express");
const { createCompany } = require("../controllers/company.controller");
const companyRouter = express.Router();

companyRouter.post("/create-company", createCompany);

module.exports = companyRouter;