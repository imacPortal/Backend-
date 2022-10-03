const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const labSchema = new Schema({
    systemConfigs: { type: String, required: true },
    admin: { type: String, required: true },
    slots: { type: String, required: true },
    systems: { type: [String], required: true },
},
{
    timestamps: true,
});
const Lab = mongoose.model('labMain', labSchema);
module.exports = Lab;