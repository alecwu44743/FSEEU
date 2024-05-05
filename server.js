const dotenv = require("dotenv");
const express = require("express");
const { connectDatabase, getDatabase } = require("./app/models");
const app =  express();

dotenv.config();

connectDatabase(() => {
    app.listen(5038, () => {
        console.log("[connectDatabase] Backend server is running on port 5038");
    });
});

app.get('/', function (req, res) {
    res.send('Hello World')
});

app.get("/api/test", (req, res) => {
	console.log("test is successful");
    res.send("test is successful");
});

app.get('/api/GetALL', (req, res) => {
    const database = getDatabase();
    database.collection(process.env.DB_COLLECTION_MAIN).find({}).toArray((err, result) => {
        if (err) {
            console.error("Error fetching data:", err);
            res.status(500).send("Internal Server Error");
            return;
        }
        console.log("> /api/GetALL");
        res.send(result);
    });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}`);
})