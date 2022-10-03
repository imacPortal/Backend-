const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const labSchema = new Schema({
    systemConfigs: { type: String, requared: true },
    admin: { type: String, requared: true },
    slots: { type: String, requared: true },
    systems: { type: [String], requared: true },
},
{
    timestamps: true,
});
const Lab = mongoose.model('labMain', labSchema);
module.exports = Lab;