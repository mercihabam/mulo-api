const express = require("express");
const { signup, login } = require("../controllers/users.controllers");
const { checkRequiredFields, checkEmailExist, checkPasswordIsValid, checkPasswordMatch, checkLoginFields } = require("../validation/user.validation");
const router = express.Router();

router.post("/signup", checkRequiredFields, checkEmailExist, checkPasswordIsValid, checkPasswordMatch, signup);
router.post("/login", checkLoginFields, login);

module.exports = router;