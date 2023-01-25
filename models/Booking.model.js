const mongoose = require('mongoose')

const bookingSchema = mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
  },
  numberDevice: Number,
  nameUser: String,
  numberUser: String,
  date: String,
  time: String,
})

const Booking = mongoose.model('Booking', bookingSchema)

module.exports = Booking
