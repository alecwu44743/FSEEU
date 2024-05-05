const router = require("express").Router();
const authService = require("../services/auth.service");

// sign up
router.post("/signup", authService.signup);
// sign in
router.post("/signin", authService.signin);

module.exports = router;
