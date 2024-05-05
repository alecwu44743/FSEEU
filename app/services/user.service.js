const allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

const userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

const userplusBoard = (req, res) => {
    res.status(200).send("User+ Content.");
};

const moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};

module.exports = { allAccess, userBoard, userplusBoard, moderatorBoard };