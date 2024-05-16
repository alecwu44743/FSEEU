const router = require("express").Router();
const mainService = require("../services/main.service");
const { authJwt } = require("../middleware");

router.get("/",
[
    authJwt.isUserAuthenticated,
],
mainService.home);

router.get("/helloworld", mainService.helloworld);

router.get("/feeds", mainService.feeds);

router.post(
    "/submit", 
    [authJwt.verifyToken],
    mainService.submit
);

router.get(
    "/post/:param",
    mainService.post
);

module.exports = router;