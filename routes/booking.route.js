const { Router } = require('express')
const BookingController = require('../controllers/booking.controller')

const router = Router()

router.get('/booking', BookingController.printBooking)
router.post('/booking', BookingController.createBooking)

module.exports = router
