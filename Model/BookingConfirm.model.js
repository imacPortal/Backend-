const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const bookingSchema = new Schema({
    date:{ type: String, required: true },
    slots: { type: String, required: true },
    lab: { type: String, required: true },
    system: { type: [String], required: true },
}, {
    timestamps: true,
});

const booking = mongoose.model('BookingConfirm', bookingSchema);

module.exports = booking;
