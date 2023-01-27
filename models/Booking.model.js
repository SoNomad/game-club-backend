const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  seat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "seat",
  },
  player: { type: String },
  date: {
    type: Date,
  },
  hours: {
    type: String,
  },
});

const Booking = mongoose.model("booking", bookingSchema);

module.exports = Booking;

