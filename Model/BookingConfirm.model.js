const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const bookingSchema = new Schema({
    date:{ type: String, required: true },
    slots: { type: Number, required: true },
    lab: { type: Number, required: true },
    system: { type: [String], required: true },
}, {
    timestamps: true,
});

const booking = mongoose.model('BookingConfirm', bookingSchema);

module.exports = booking;
