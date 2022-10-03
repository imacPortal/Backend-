const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const labSchema = new Schema({
    labNo: { type: Number, required: true },
    systemNo: { type: Number, required: true },
    serialNo: { type: String, required: true },
},
{
    timestamps: true,
});
const Lab = mongoose.model('Lab', labSchema);
module.exports = Lab;