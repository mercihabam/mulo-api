const express = require("express");
const { checkToken } = require("../../../Utils/authentication");
const { signup, login, currentUser } = require("../controllers/users.controllers");
const { checkRequiredFields, checkEmailExist, checkPasswordIsValid, checkPasswordMatch, checkLoginFields } = require("../validation/user.validation");
const router = express.Router();

router.post("/signup", checkRequiredFields, checkEmailExist, checkPasswordIsValid, checkPasswordMatch, signup);
router.post("/login", checkLoginFields, login);
router.get("/currentUser", checkToken, currentUser);

module.exports = router;