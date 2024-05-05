const router = require("express").Router();

router.get("/usertest", (req, res) => {
    console.log("[>] [routes] /usertest");
	res.send("userroutes test is successful");
});

router.post("/userposttest", (req, res) => {
    console.log("[>] [routes] /userposttest");
    const username = req.body.username;
    res.send("your username is: " + username)
})

module.exports = router;