const mongoose = require('mongoose')

const Schema = mongoose.Schema

const authSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    userId: {type: String, required: true}
}, {
    timestamps: true,
});

const User = mongoose.model('Auth', authSchema);

module.exports = User;