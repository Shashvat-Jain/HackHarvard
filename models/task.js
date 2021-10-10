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
    user: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    completed: {
        type: Boolean,
        default: false,
        required: true
    }
});

schema.plugin(passport);

module.exports = mongoose.model('Task', schema);