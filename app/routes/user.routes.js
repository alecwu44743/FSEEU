const router = require("express").Router();
const { authJwt } = require("../middleware");

router.get("/usertest", (req, res) => {
    console.log("[>] [routes] /usertest");
	res.send("userroutes test is successful");
});

router.post("/userposttest", 
    authJwt.verifyToken,
    (req, res) => {
    console.log("[>] [routes] /userposttest");
    const username = req.body.username;
    res.send("your username is: " + username)
})

module.exports = router;