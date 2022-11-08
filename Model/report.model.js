const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reportSchema = new Schema({
    name:{ type: String, required: true },
    regNo:{ type: String, required: true },
    date:{ type: String, required: true },
    slots: { type: Number, required: true },
    lab: { type: Number, required: true },
    noOfStuds: { type: String, required: true },
    subject: { type: String, required: true },
    reason: { type: String, required: true },
    system: { type: [String], required: true },
}, {
    timestamps: true,
});

const report = mongoose.model('report', reportSchema);

module.exports = report;
