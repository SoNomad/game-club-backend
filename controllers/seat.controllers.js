const Seat = require("../models/Seat.model");

module.exports.seatControllers = {
  addSeat: async (req, res) => {
    try {
      const seat = await Seat.create({
        platformType: req.body.platformType,
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

  bookingSeat: async (req, res) => {
    const id = req.params.id;
    const { player, date, hours } = req.body;

    try {
      const seat = await Seat.findById(id);

      if (
        seat.booking.some(
          (item) => item.date.toISOString().slice(0, 10) === date && item.hours === hours
        )
      )
        return res.json(`Время ${hours} в дату ${date} занято`);

      Seat.findByIdAndUpdate(
        { _id: id },
        { $addToSet: { booking: { player, date, hours } } },
        { returnDocument: "after" },
        (err, doc) => {
          if (err) {
            return res.status(501).json(error.toString());
          }
          if (!doc) {
            return res.status(403).json("Место не найдено");
          }
          res.json(doc);
        }
      );
    } catch (error) {
      res.json(error.message);
    }
  },

  // removeBooking: async (req, res) => {
  //   const id = req.params.id;
  //   const { booking_id } = req.body;

  //   try {
  //     await Seat.findOneAndUpdate(
  //       { _id: id },
  //       { $pull: { booking: "date" } },
  //       { returnDocument: "after" },

  //       (err, doc) => {
  //         if (err) {
  //           return res.status(501).json(error.toString());
  //         }
  //         if (!doc) {
  //           return res.status(403).json("Место не найдено");
  //         }
  //         res.json(doc);
  //       }
  //     );
  //   } catch (error) {
  //     res.json(error.message);
  //   }
  // },
};
