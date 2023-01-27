const Booking = require("../models/Booking.model");

module.exports.bookingControllers = {
  addBooking: async (req, res) => {
    const seat_id = req.params.id;
    const { player, date, hours } = req.body;

    //проверка на наличие брони на данную дату и время*****************//
    const isExsist = await Booking.find({ seat: seat_id });
    if (
      isExsist.some((item) => item.date.toISOString().slice(0, 10) === date && item.hours === hours)
    )
      return res.json(`Время ${hours} в дату ${date} занято`);
    //**************************************************************//
    try {
      const bookingData = await Booking.create({
        seat: seat_id,
        player,
        date,
        hours,
      });
      res.json(bookingData);
    } catch (error) {
      res.json(error.message);
    }
  },

  //получение всех броней
  getBooking: async (req, res) => {
    try {
      const booking = await Booking.find().populate("seat", "platformType");
      res.json(booking);
    } catch (error) {
      res.json(error.message);
    }
  },

  //удаление брони
  deleteBooking: async (req, res) => {
    try {
      await Booking.findByIdAndRemove({ _id: req.body.id });
      res.json("Запись на очередь удалена");
    } catch (error) {
      res.json(error.message);
    }
  },
};
