const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  platformType: {
    type: String,
    required: true,
    unique: true,
  },
});

const Seat = mongoose.model("seat", seatSchema);

module.exports = Seat;
