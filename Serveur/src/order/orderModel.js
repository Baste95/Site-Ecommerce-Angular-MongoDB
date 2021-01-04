const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const orderSchema = new Schema({
    user:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true
    },
    product:{
        id_product: {
                type: [String],
                required: true,
        },
        price_product: {
                type: [Number],
                required: true,
        }
    },
    finalprice: {
        type: Number,
        required: true,
    },
    cart:{
        lastnumber: {
            type: String,
            required: true,
        },
        typecart: {
            type: String,
            required: true,
        }
    },
    fulladress:{
        adress: {
            type: String,
            required: true
        },
        adress2: {
            type: String,
        },
        zip: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        county: {
            type: String,
            required: true
        }
    }

}, {timestamps: true});


module.exports = mongoose.model("Order", orderSchema);
orderSchema.plugin(uniqueValidator, {
    message: '{PATH} Already in use'
});
