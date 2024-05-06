const allAccess = (req, res) => {
    console.log("[>] [services] All Access :)");
    res.status(200).send("Public Content.");
};

const userBoard = (req, res) => {
    console.log("[>] [services] User Board :)");
    res.status(200).send("User Content.");
};

const userplusBoard = (req, res) => {
    console.log("[>] [services] User+ Board :)");
    res.status(200).send("User+ Content.");
};

const moderatorBoard = (req, res) => {
    console.log("[>] [services] Moderator Board :)");
    res.status(200).send("Moderator Content.");
};

module.exports = { allAccess, userBoard, userplusBoard, moderatorBoard };