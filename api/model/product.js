const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

// Export the productSchema for use in applicaiton anywhere
module.exports = mongoose.model("Product", productSchema);