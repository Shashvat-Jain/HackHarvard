const mongoose = require('mongoose');
const passport = require('passport-local-mongoose');

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
});

schema.plugin(passport);

module.exports = mongoose.model('User', schema);