const { connectDatabase, getDatabase } = require("../models");

const serverStatus = (req, res) => {
    console.log("[>] [services] Server status :)");
    res.status(200).send("Server is OK");
}

const databaseStatus = (req, res) => {
    const database = getDatabase();
    database.collection(process.env.DB_COLLECTION_MAIN).find({}).toArray((err, result) => {
        if (err) {
            console.error("[x] Error fetching data:", err);
            res.status(500).send("Internal Server Error");
            return;
        }
        console.log("[>] [services] Database status :)");
        res.status(200).send("Database is OK");
    });
}

const statusService = {
    serverStatus: serverStatus,
    databaseStatus: databaseStatus
};

module.exports = statusService;