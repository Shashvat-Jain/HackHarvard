const mongoose = require('mongoose');
const passport = require('passport-local-mongoose');

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    media: {
        type: String,
        required: true
    }
});

schema.plugin(passport);

module.exports = mongoose.model('Exercise', schema);