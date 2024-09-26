const mongoose = require("mongoose") // Connects to Mongoose
const fruitSchema = new mongoose.Schema({
    name: String, 
    ripe: Boolean,
}) // ^^^ This is defining the Schema for Mongoose

const Fruit = mongoose.model("Fruits", fruitSchema) // Registers the Model (Attach to a variable)

module.exports = Fruit // This exports the variable above ^^^ It can be used in various files 