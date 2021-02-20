const express = require("express");
const { signup } = require("../controllers/users.controllers");
const { checkRequiredFields, checkEmailExist, checkPasswordIsValid, checkPasswordMatch } = require("../validation/user.validation");
const router = express.Router();

router.post("/signup", checkRequiredFields, checkEmailExist, checkPasswordIsValid, checkPasswordMatch, signup);

module.exports = router;