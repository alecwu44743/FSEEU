const router = require("express").Router();
const { authJwt } = require("../middleware");
const userService = require("../services/user.service");

// router.get("/usertest", (req, res) => {
//     console.log("[>] [routes] /usertest");
// 	res.send("userroutes test is successful");
// });

// router.post("/userposttest", 
//     authJwt.verifyToken,
//     (req, res) => {
//     console.log("[>] [routes] /userposttest");
//     const username = req.body.username;
//     res.send("your username is: " + username)
// })

router.get("/test/all", userService.allAccess);

router.get(
    "/test/user",
    [authJwt.verifyToken],
    userService.userBoard
);


router.get(
    "/test/userplus",
    [authJwt.verifyToken, authJwt.isUserAuthenticated],
    userService.userplusBoard
);

router.get(
    "/test/moderator",
    [authJwt.verifyToken, authJwt.isModeratorAuthenticated],
    userService.moderatorBoard
);

module.exports = router;