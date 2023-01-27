const Booking = require("../models/Booking.model");
const Seat = require("../models/Seat.model");

module.exports.seatControllers = {
  addSeat: async (req, res) => {
    try {
      const platformType = req.body.platformType;

      //проверка на наличие устройства с таким именем*****************//
      const isExists = await Seat.find({ platformType });
      if (isExists.length > 0) {
        return res.json(`${platformType} уже существует!`);
      }
      //**************************************************************//
      const seat = await Seat.create({
        platformType,
      });

      return res.json(seat);
    } catch (error) {
      res.json(error.message);
    }
  },
  //получить список всех платформ в клубе
  getSeats: async (req, res) => {
    try {
      const seats = await Seat.find();
      res.json(seats);
    } catch (error) {
      res.json(error.message);
    }
  },
  //получить определнную платформу со списком броней на нее
  getSeat: async (req, res) => {
    try {
      const seat = await Seat.findById(req.params.id);

      if (seat.length === 0) {
        return res.json("Платформа с таким именем не добавлена!");
      }

      const bookings = await Booking.find({ seat: req.params.id });

      const result = { seat, bookings };

      res.json(result);
    } catch (error) {
      res.json(error.message);
    }
  },
  //удалить платформу со всеми ее бронями
  deleteSeat: async (req, res) => {
    try {
      await Booking.deleteMany({ seat: req.params.id });
      await Seat.findByIdAndDelete(req.params.id);

      res.json("success");
    } catch (error) {
      res.json(error.message);
    }
  },
};
