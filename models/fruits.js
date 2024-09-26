const mongoose = require("mongoose")
const fruitSchema = new mongoose.Schema({
    name: String, 
    ripe: Boolean,
}) // This is defining the Schema for Mongoose

const Fruit = mongoose.model("Fruits", fruitSchema) // Creates model

module.exports = Fruit // This is exporting the Fruit variable above ^^^