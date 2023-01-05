const mongoose = require('mongoose')

const Schema = mongoose.Schema

const reqSchema = new Schema({
    email: { type: String, required: true },
    department: { type: String, required: true },
    type: { type: String, required: true },
    reason: {type: String, required: true}
}, {
    timestamps: true,
});

const req = mongoose.model('SignupReq', reqSchema);

module.exports = req;