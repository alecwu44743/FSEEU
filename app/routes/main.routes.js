const router = require("express").Router();
const mainService = require("../services/main.service");

router.get("/helloworld", mainService.helloworld);

module.exports = router;