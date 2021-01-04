const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const categorieSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    subcategories: {
        type: [String],
        required: true
    },
});




module.exports = mongoose.model("Categorie", categorieSchema);
categorieSchema.plugin(uniqueValidator, {
    message: '{PATH} Already in use'
});
