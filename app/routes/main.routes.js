const router = require("express").Router();
const mainService = require("../services/main.service");
const { authJwt, verifyPost } = require("../middleware");

router.get("/", mainService.home);

router.get("/helloworld", mainService.helloworld);

router.get("/feeds", mainService.feeds);

router.post(
    "/submit", 
    [authJwt.verifyToken, verifyPost.checkAuthor],
    mainService.submit
);

router.get(
    "/post/:param",
    mainService.post
);

router.post(
    "/comment/:param",
    [authJwt.verifyToken, verifyPost.checkAuthor],
    mainService.submitComment
)

router.get(
    "/comments/:param",
    mainService.getComment
)

router.post(
    "/like/:param",
    [authJwt.verifyToken, verifyPost.checkAuthor],
    mainService.like
)

router.get(
    "/numlike/:param",
    mainService.countLike
)

router.post(
    "/d/comment/:param",
    [authJwt.verifyToken, verifyPost.checkAuthor],
    mainService.deleteComment
)

router.post(
    "/d/post/:param",
    [authJwt.verifyToken, verifyPost.checkAuthor, verifyPost.checkModerator],
    mainService.deletePost
)

module.exports = router;