const dotenv = require("dotenv");
dotenv.config();

const express = require("express"); // Using the Express server
const app = express();

const mongoose = require("mongoose"); 
mongoose.connect(process.env.MONGODB_URI); // Looks at the .env/MONGODB_URI for the route to connect


mongoose.connection.on("connected", () => {
    console.log(`Conneted to MongoDB ${mongoose.connection.name}.`) // Test the Mongoose connection
});
const Fruit = require("./models/fruits.js");

app.get("/", async (req, res) => {
    res.render("index.ejs");
});
app.get("/fruits/new", (req, res) => {
    res.render("fruits/new.ejs")
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
