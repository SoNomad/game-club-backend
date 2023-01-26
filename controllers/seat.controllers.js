const Booking = require("../models/Booking.model");
const Seat = require("../models/Seat.model");

module.exports.seatControllers = {
  addSeat: async (req, res) => {
    try {
      const platformType = req.body.platformType;

      const isExists = await Seat.find({ platformType });
      if (isExists) {
        return res.json(`${platformType} уже существует!`);
      }

      const seat = await Seat.create({
        platformType,
      });

      return res.json(seat);
    } catch (error) {
      res.json(error.message);
    }
  },
  getSeats: async (req, res) => {
    try {
      const seats = await Seat.find();
      res.json(seats);
    } catch (error) {
      res.json(error.message);
    }
  },

  getSeat: async (req, res) => {
    try {
      const seat = await Seat.findById(req.params.id);
      const bookings = await Booking.find({ seat: req.params.id });

      const result = { seat, bookings };

      res.json(result);
    } catch (error) {
      res.json(error.message);
    }
  },
  deleteSeat: async (req, res) => {
    try {
      await Booking.deleteMany({ seat: req.params.id });
      await Seat.findByIdAndDelete(req.params.id);

      res.json("succes");
    } catch (error) {
      res.json(error.message);
    }
  },
};
