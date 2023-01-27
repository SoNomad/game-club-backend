const { Router } = require("express");
const { seatControllers } = require("../controllers/seat.controllers");
const authorization = require("../auth");

const router = Router();

router.post("/add", seatControllers.addSeat);
router.get("/seat", seatControllers.getSeats);
router.get("/seat/:id", seatControllers.getSeat);
router.delete("/seat/:id", seatControllers.deleteSeat);

module.exports = router;
