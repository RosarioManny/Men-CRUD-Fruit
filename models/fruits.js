const mongoose = require("mongoose")
const fruitSchema = new mongoose.Schema({
    name: String,
    ripe: Boolean,
})

const Fruit = mongoose.model("Fruits", fruitSchema) // creates model

module.exports = Fruit // This is exporting the Fruit variable above ^^^