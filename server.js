const dotenv = require("dotenv");
const express = require("express");
const { connectDatabase, getDatabase } = require("./app/models");
const userRoute = require("./app/routes/user.routes");
const authRoute = require("./app/routes/auth.routes");
const app =  express();

dotenv.config();

connectDatabase(() => {
    initial();
    console.log(`[v] Successfully added some documentation to ${process.env.DB_NAME} database`);
    app.listen(5038, () => {
        console.log("[v] [connectDatabase] Backend server is running on port 5038");
    });
});

app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

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
            console.error("[x] Error fetching data:", err);
            res.status(500).send("Internal Server Error");
            return;
        }
        console.log("[>] /api/GetALL");
        res.send(result);
    });
});

function initial() {
    // const database = getDatabase();
    // const collection = database.collection(process.env.DB_COLLECTION_MAIN);

    // // Insert some initial documents
    // const docs = [
    //     { name: 'Grace', age: 30, company: 'EVA AIR' },
    //     { name: 'Chieko YM', age: 25, company: 'Cathay Pacific' },
    //     { name: 'Ann', age: 35, company: 'China Airlines' }
    // ];

    // collection.insertMany(docs, (err, result) => {
    //     if (err) {
    //         console.error("Error inserting documents:", err);
    //     } else {
    //         console.log("Initial documents added successfully");
    //     }
    // });
    console.log("[v] Initial function is called");
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`[v] Backend server is running on port ${PORT}`);
})