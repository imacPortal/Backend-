const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    date:{ type: String, required: true },
    slots: { type: String, required: true },
    lab: { type: String, required: true },
    noOfStuds: { type: String, required: true },
    subject: { type: String, required: true },
    reason: { type: String, required: true },
    system: { type: [String], required: true },
}, {
    timestamps: true,
});

const booking = mongoose.model('BookingReq', bookingSchema);

module.exports = booking;
