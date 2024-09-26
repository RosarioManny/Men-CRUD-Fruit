// DOTENV
const dotenv = require("dotenv");
dotenv.config();
// EXPRESS
const express = require("express"); // Using the Express server
const app = express();
app.use(express.urlencoded({ extended: false })); // This middleware parses request bodies, extracting form data into a JavaScript object.
// MONGO
const mongoose = require("mongoose"); 
mongoose.connect(process.env.MONGODB_URI); // Looks at the .env/MONGODB_URI for the route to connect
// MONGO MODEL
const Fruit = require("./models/fruits.js");
// MORGAN & METHOD OVERRIDE
const methodOverride = require("method-override");
const morgan = require("morgan");
app.use(methodOverride("_method"));
app.use(morgan("dev"));
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Imports / Const ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

mongoose.connection.on("connected", () => {
    console.log(`Conneted to MongoDB ${mongoose.connection.name}.`) // Test the Mongoose connection
});

app.get("/", async (req, res) => { // ROOT/MAIN ROUTE
    res.render("index.ejs");
});

app.post("/fruits", async (req, res) => { // Creation of Fruits
    if(req.body.ripe === "on") { // This is done because the check box used, isn't a true or false value. So if checked it will be set to a boolean of true.
        req.body.ripe = true; 
        } else {
            req.body.ripe = false;
         }
    
    await Fruit.create(req.body);

    res.redirect("/fruits");
});

app.get("/fruits", async (req, res) => { // FRUITS LISTS
    const allFruits = await Fruit.find();
    res.render("fruits/index.ejs", { fruits: allFruits })
});

app.get("/fruits/new", (req, res) => { // NEW FRUITS ROUTE
    res.render("fruits/new.ejs")
});
// REMEMBER ORDER MATTERS. Don't put routes with slugs above others with a similar path. 

app.get("/fruits/:fruitId", async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render("fruits/show.ejs", { fruit: foundFruit });
});

app.listen(3000, () => {
    console.log("Listening on port 3000"); // Validate correct server
});
