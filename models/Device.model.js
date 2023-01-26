const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  periods: [
    {
      time: {
        type: String,
      },
      user: {
        ref: "Users",
        type: mongoose.Schema.Types.ObjectId,
      },
    },
  ],
});

const Device = mongoose.model("Devices", deviceSchema);

module.exports = Device;
