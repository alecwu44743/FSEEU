const authJwt = require("./auth.jwt");
const verifySignUp = require("./verify.signup");
const verifyPost = require("./verify.post");

module.exports = {
    authJwt,
    verifySignUp,
    verifyPost
};