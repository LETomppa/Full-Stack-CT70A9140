const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Link Schema
const LinkSchema = mongoose.Schema({
    url: {
        type: String,
        required: true
    }
});

const Link = module.exports = mongoose.model('Link', LinkSchema);