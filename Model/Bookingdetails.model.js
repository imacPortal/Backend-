const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    slots: { type: [String], required: true },
    lab: { type: String, required: true },
    system: { type: String, required: true },

}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
