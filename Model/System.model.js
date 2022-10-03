const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const systemSchema = new Schema({
    ram: { type: String, required: true },
    storage: { type: String, required: true },
    processor: { type: String, required: true },
    serialNo: { type: String, required: true },
}, {
    timestamps: true,
});

const System = mongoose.model('System', systemSchema);

module.exports = System;
