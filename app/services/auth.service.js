const { connectDatabase, getDatabase } = require("../models");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const signup = (req, res) => {
    console.log("[>] [services] Sign up");

    const database = getDatabase();
    const userinfo_collection = database.collection(process.env.DB_COLLECTION_USERINFO);

    // Save User to Database
    var newUser = {
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.JWT_SEC).toString()
    };

    if (!req.body.roles) {
        newUser.roles = "user";
    }
    else {
        newUser.roles = req.body.roles;
    }

    // If roles are specified, assign them to the user
    console.log(`[+] username: ${req.body.username}\n` +
    `    email: ${req.body.email}\n` +
    `    password: ${req.body.password}\n` +
    `    roles: ${req.body.roles}`);

    userinfo_collection.insertOne(newUser, (err, user) => {
        if (err) {
            console.error("[x] Error inserting documents: ", err);
            res.status(500).send({ message: "Error inserting documents: " + err });
        }
        else{
            console.log(`[v] ${req.body.username}'s documents added successfully`);
            res.send({ message: `${req.body.username}'s documents added successfully` });
        }
    });
};

const signin = (req, res) => {
    console.log("[>] [services] Sign in");

    const database = getDatabase();
    const userinfo_collection = database.collection(process.env.DB_COLLECTION_USERINFO);
    const usertoken_collection = database.collection(process.env.DB_COLLECTION_USERTOKEN);
    const moderatortoken_collection = database.collection(process.env.DB_COLLECTION_MODERATORTOKEN);
    
    _username = req.body.username;
    _password = req.body.password;

    userinfo_collection.findOne({ username: _username }, (err, user) => {
        if (err) {
            console.error("[x] Error finding user:", err);
            res.status(500).send({ message: "Error finding user: " + err });
        } else {
            if (user) {
                console.log("[v] User found:", user);
                const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.JWT_SEC);
                const orginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
                
                orginalPassword !== _password && res.status(401).json("Wrong Credentials");
                
                const accessToken = jwt.sign(
                    {id: user._id}, 
                    process.env.JWT_SEC,
                    { expiresIn: "3d" }
                )
                
                _userrole = user.roles;
                
                if(_userrole == "user"){
                    usertoken_collection.insertOne({
                        username: user.username,
                        token: accessToken
                    }, (err, token) => {
                        if (err) {
                            console.error("[x] Error inserting documents: ", err);
                            res.status(500).send({ message: "Error inserting documents: " + err });
                        }
                        else{
                            console.log(`[v] ${user.username}'s documents added successfully`);
                            console.log(`[v] ${user.username}'s token added successfully`);
                            res.status(200).send({
                                id: user._id,
                                username: user.username,
                                email: user.email,
                                roles: user.roles,
                                accessToken: accessToken
                            });
                        }
                    });
                }
                else if(_userrole == "moderator"){
                    moderatortoken_collection.insertOne({
                        username: user.username,
                        token: accessToken
                    }, (err, token) => {
                        if (err) {
                            console.error("[x] Error inserting documents: ", err);
                            res.status(500).send({ message: "Error inserting documents: " + err });
                        }
                        else{
                            console.log(`[v] ${user.username}'s documents added successfully`);
                            console.log(`[v] ${user.username}'s token added successfully`);
                            res.status(200).send({
                                id: user._id,
                                username: user.username,
                                email: user.email,
                                roles: user.roles,
                                accessToken: accessToken
                            });
                        }
                    });
                }
                else{
                    console.log("[x] Error: User role not found");
                    console.log(`[x] ${_username}'s documents will be deleted`);
                    userinfo_collection.deleteOne({ username: _username }, (err, user) => {
                        if (err) {
                            console.error("[x] Error deleting documents: ", err);
                            res.status(500).send({ message: "Error deleting documents: " + err });
                        }
                        else{
                            console.log(`[v] ${_username}'s documents deleted successfully`);
                            res.status(404).send({ message: `Error: User/role-[${_userrole}] not found and we have deleted ${_username}'s documents` });
                        }
                    });
                }
            } else {
                console.log("[x] Error: User not found");
                res.status(404).send({ message: `Error: User:${_username} not found` });
            }
        }
    });
};

module.exports = { signup, signin };