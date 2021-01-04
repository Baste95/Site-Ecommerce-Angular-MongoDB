const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    shortdescription: {
        type: String,
        required: true,
    },
    features: {
        type: [String],
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    reduction: {
        type: Number
    },
    mainimage: {
        type: String,
        required: true,
    },
    secondaryimage: {
        type: String
    },
    categorie: {
        type: String,
        required: true,
    },

    subcategorie: {
        type: String,
        required: true
    },
    note: {
        type: [Number]
    },
    notelength: {
        type: Number
    }
});




module.exports = mongoose.model("Product", productSchema);
productSchema.plugin(uniqueValidator, {
    message: '{PATH} Already in use'
});
