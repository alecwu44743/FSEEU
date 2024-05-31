const { ObjectId } = require('mongodb');
const { connectDatabase, getDatabase } = require("../models");


const checkAuthor = (req, res, next) => {
    console.log("[>] [services] Check comment's author :)");

    let authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(403).send({
            message: "Your are not authenticated!"
        });
    }
    const token = authHeader.split(" ")[1];

    const database = getDatabase();
    const usertoken_collection = database.collection(process.env.DB_COLLECTION_USERTOKEN);

    usertoken_collection.findOne({ token: token }, (err, token) => {
        if (err) {
            console.error("[x] Error finding user:", err);
            res.status(500).send({ message: "Error finding user: " + err });
        } else {
            if (token.roles == "user") {
                console.log("[v] User found:", token);
                req.body.author = token.username;
                next();
            } else {
                res.status(401).send({ message: "Unauthorized!" });
            }
        }
    });
}


const verifyPost = {
    checkAuthor: checkAuthor
};

module.exports = verifyPost;