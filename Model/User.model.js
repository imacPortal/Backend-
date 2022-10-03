const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    regno: { type: String, required: true },
    dept: { type: String, required: true },
    designation: { type: String, required: true },
    email: { type: String, required: true },
    phno: { type: String, required: true },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
