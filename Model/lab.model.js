const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const labSchema = new Schema({
    labNo: { type: Number, requared: true },
    SystemNumber: { type: Number, requared: true },
    SerialNumber: { type: String, requared: true },
},
{
    timestamps: true,
});
const Lab = mongoose.model('Lab', labSchema);
module.exports = Lab;