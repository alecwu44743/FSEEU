const router = require("express").Router();
const mainService = require("../services/main.service");
const { authJwt, verifyPost } = require("../middleware");

router.get("/", mainService.home);

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

router.post(
    "/comment/:param",
    [authJwt.verifyToken, verifyPost.checkCommentAuthor],
    mainService.submitComment
)

module.exports = router;