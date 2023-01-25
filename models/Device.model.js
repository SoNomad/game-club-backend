const mongoose = require("mongoose");

const deviceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  periods: {
    type: String,
    required: true,
  },
});

const Device = mongoose.model("Device", deviceSchema);

module.exports = Device;
