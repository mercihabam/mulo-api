const express = require("express");
const { checkToken, checkIsAdmin } = require("../../../Utils/authentication");
const { signup, login, currentUser, logout, getAllUsers, currentAdmin, updateUser, forgotPassword, resetPassword } = require("../controllers/users.controllers");
const { checkRequiredFields, checkEmailExist, checkUpdateEmailExist, checkPasswordIsValid, checkPasswordMatch, checkLoginFields } = require("../validation/user.validation");
const router = express.Router();

router.post("/signup", checkRequiredFields, checkEmailExist, checkPasswordIsValid, checkPasswordMatch, signup);
router.post("/login", checkLoginFields, login);
router.post("/update-user/:id", checkToken, checkUpdateEmailExist, updateUser);
router.get("/forgot-password/:email", forgotPassword);
router.post("/reset-password/:id/:token", checkPasswordIsValid, checkPasswordMatch, resetPassword);
router.get("/currentUser", checkToken, currentUser);
router.get("/current-admin", checkToken, checkIsAdmin, currentAdmin);
router.get("/logout", checkToken, logout);
router.get("/all-users", checkToken, checkIsAdmin, getAllUsers);

module.exports = router;