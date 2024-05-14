const { connectDatabase, getDatabase } = require("../models");

const checkDuplicateUsernameOrEmail = (req, res, next) => {
    console.log("[>] [services] Check duplicate username or email");

    const database = getDatabase();
    const userinfo_collection = database.collection(process.env.DB_COLLECTION_USERINFO);

    // check duplicate username
    userinfo_collection.findOne({ username: req.body.username }, (err, user) => {
        if (err) {
            console.error("[x] Error finding user:", err);
            res.status(500).send({ message: "Error finding user: " + err });
            return;
        }

        if (user) {
            // res.status(400).send({ message: "Failed! Username is already in use!" });
            res.send("帳號重複註冊！");
            return;
        }

        // check duplicate email
        userinfo_collection.findOne({ email: req.body.email }, (err, user) => {
            if (err) {
                console.error("[x] Error finding user:", err);
                res.status(500).send({ message: "Error finding user: " + err });
                return;
            }

            if (user) {
                // res.status(400).send({ message: "Failed! Email is already in use!" });
                res.send("email重複註冊！");
                return;
            }

            next();
        });
    });
}

const checkRolesExisted = (req, res, next) => {
    console.log("[>] [services] Check roles existed");

    if(req.body.roles) {
        if(req.body.roles == "user" || req.body.roles == "moderator" || req.body.roles == "admin") {
            console.log("[v] Role found:", req.body.roles);
            next();
        }
        else {
            console.log("[x] Role not found:", req.body.roles);
            res.status(400).send({ message: "Failed! Role does not exist = " + req.body.roles });
            return;
        }
    }
    else{
        console.log("[v] Role not specified, default to user");
        req.body.roles = "user";
        next();
    }
}

const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;