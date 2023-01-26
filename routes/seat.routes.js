const { Router } = require("express");
const { seatControllers } = require("../controllers/seat.controllers");
const authorization = require("../auth");

const router = Router();

router.post("/add", seatControllers.addSeat);
router.get("/seats", seatControllers.getSeats);
router.patch("/bookingSeat/:id", seatControllers.bookingSeat);

module.exports = router;
