const dotenv = require("dotenv");
const express = require("express");
const { connectDatabase, getDatabase } = require("./app/models");
const serverRoute = require("./app/routes/server.routes");
const userRoute = require("./app/routes/user.routes");
const authRoute = require("./app/routes/auth.routes");
const app =  express();

dotenv.config();

app.use(express.json());
app.use("/status", serverRoute);
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

connectDatabase(() => {
    initial();
    // console.log(`[v] Successfully added some documentation to ${process.env.DB_NAME} database`);
    app.listen(5038, () => {
        console.log("[v] [connectDatabase] Backend server is running on port 5038");
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

app.get('/', function (req, res) {
    res.send('Hello World，噗呲噗呲，咚噠噠噠')
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`[v] Backend server is running on port ${PORT}`);
})