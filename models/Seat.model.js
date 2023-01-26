const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  platformType: {
    type: String,
    required: true,
    unique: true,
  },
  booking: [
    {
      player: { type: String },
      date: {
        type: Date,
      },
      hours: {
        type: String,
      },
      price: Number,
    },
  ],
});

const Seat = mongoose.model("Seats", seatSchema);

module.exports = Seat;
