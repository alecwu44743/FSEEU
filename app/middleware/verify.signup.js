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
            res.status(400).send({ message: "Failed! Username is already in use!" });
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
                res.status(400).send({ message: "Failed! Email is already in use!" });
                return;
            }

            next();
        });
    });
}

const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail
};

module.exports = verifySignUp;