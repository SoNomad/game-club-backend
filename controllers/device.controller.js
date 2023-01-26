const Device = require("../models/Device.model");
const { create } = require("../models/User.model");

module.exports.deviceControllers = () => {
  addDevice: async (req, res) => {
    const Device = await create({
      name: req.body.name,
      periods: req.body.periods,
    });
  };
};
