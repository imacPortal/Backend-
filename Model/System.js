const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const systemSchema = new Schema({
    systemSpacs: { type: Number, required: true },
    bookedSlots: { type: [String], required: true },
}, {
    timestamps: true,
});

const System = mongoose.model('System', SystemSchema);

module.exports = System;
