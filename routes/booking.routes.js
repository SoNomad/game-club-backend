const { Router } = require("express");
const { bookingControllers } = require("../controllers/booking.controller");

const router = Router();

router.post("/booking/:id", bookingControllers.addBooking);
router.get("/booking", bookingControllers.getBooking);
router.delete("/booking", bookingControllers.deleteBooking);

module.exports = router;
