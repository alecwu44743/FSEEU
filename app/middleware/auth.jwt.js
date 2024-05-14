const jwt = require("jsonwebtoken");
const { connectDatabase, getDatabase } = require("../models");

const verifyToken = (req, res, next) => {
    let authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(403).send({
            message: "Your are not authenticated!"
        });
    }
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SEC, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Token is not valid!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

const isUserAuthenticated = (req, res, next) => {
    const database = getDatabase();
    const usertoken_collection = database.collection(process.env.DB_COLLECTION_USERTOKEN);

    let authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(403).send({
            message: "Your are not authenticated!"
        });
    }
    const token = authHeader.split(" ")[1];

    usertoken_collection.findOne({ token: token }, (err, token) => {
        if (err) {
            console.error("[x] Error finding user:", err);
            res.status(500).send({ message: "Error finding user: " + err });
        } else {
            if (token.roles == "user") {
                console.log("[v] User found:", token);
                next();
            } else {
                res.status(401).send({ message: "Unauthorized!" });
            }
        }
    });
}

const isModeratorAuthenticated = (req, res, next) => {
    const database = getDatabase();
    const usertoken_collection = database.collection(process.env.DB_COLLECTION_USERTOKEN);

    let authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(403).send({
            message: "Your are not authenticated!"
        });
    }
    const token = authHeader.split(" ")[1];

    usertoken_collection.findOne({ token: token }, (err, token) => {
        if (err) {
            console.error("[x] Error finding user:", err);
            res.status(500).send({ message: "Error finding user: " + err });
        } else {
            if (token.roles == "moderator") {
                console.log("[v] User found:", token);
                next();
            } else {
                res.status(401).send({ message: "Unauthorized!" });
            }
        }
    });
}

const authJwt = {
    verifyToken: verifyToken,
    isUserAuthenticated: isUserAuthenticated,
    isModeratorAuthenticated: isModeratorAuthenticated
};
module.exports = authJwt;