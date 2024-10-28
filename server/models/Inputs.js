const mongoose = require("mongoose");

const inputsSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
  },
  deadhead: {
    type: Number,
  },
  dates: {
    type: String,
  },
  notificationDistance: {
    type: Number,
  },
  notificationDeadhead: {
    type: Number,
  },
  notificationProfit: {
    type: Number,
  },
  notificationTime: {
    type: Number,
  },
  textDistance: {
    type: Number,
  },
  textDeadhead: {
    type: Number,
  },
  textProfit: {
    type: Number,
  },
  textTime: {
    type: Number,
  },
});

const Inputs = mongoose.model("Inputs", inputsSchema);

module.exports = Inputs;
