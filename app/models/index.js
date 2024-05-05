const dotenv = require("dotenv");
const MongoClient = require('mongodb').MongoClient;

dotenv.config();

const DBCONNECT = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}`;

let database;
function connectDatabase(callback) {
    MongoClient.connect(DBCONNECT, (error, client) => {
        if (error) {
            console.error("Error connecting to database:", error);
            return;
        }
        database = client.db(process.env.DB_NAME);
        console.log("Connected to database");
        callback();
    });
}

module.exports = {
    connectDatabase,
    getDatabase: () => database
};