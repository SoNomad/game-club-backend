const Booking = require('../models/Booking.model')

const BookingController = {
  printBooking: async (req, res) => {
    try {
      const booking = await Booking.find()
      res.json(booking)
    } catch (err) {
      res.json({ error: err.message })
    }
  },

  createBooking: async (req, res) => {
    try {
      const booking = await Booking.create({
        userId: req.body.userId,
        numberDevice: req.body.numberDevice,
        nameUser: req.body.nameUser,
        numberUser: req.body.numberUser,
        date: req.body.date,
        time: req.body.time,
      })
      res.json(booking)
    } catch (err) {
      res.json({ error: err.message })
    }
  },
}

module.exports = BookingController
