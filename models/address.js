const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    long_url: {
        type: String,
        required: true,
    },
    short_url : {
        type: String,
        required: true,
    },
    visits : {
        type: Number,
        required: true,
    }
}, {timestamps: true });

module.exports = mongoose.model('Address', AddressSchema);
