const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const systemdata = new Schema({
    sysNo: { type: String, required: true },
    RAM: { type: Number, required: true },
    processor: { type: String, required: true },
    status: { type: String, required: true },
    Lab: { type: Number, required: true },
    serialNo: { type: Number, required: true },
})
const systemSchema = new Schema({
    systemSpacs: { type: systemdata, required: true },
    bookedSlots: { type: [String], required: true },
}, {
    timestamps: true,
});

const System = mongoose.model('System', systemSchema);

module.exports = System;
