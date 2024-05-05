const router = require("express").Router();
const authService = require("../services/auth.service");
const { verifySignUp } = require("../middleware");

// sign up
router.post("/signup",
[
    verifySignUp.checkDuplicateUsernameOrEmail
],
authService.signup);
// sign in
router.post("/signin", authService.signin);

module.exports = router;
