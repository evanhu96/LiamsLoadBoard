const mongoose = require("mongoose");

const inputsSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  deadhead: {
    type: Number,
  },
  distance: {
    type: Number,
  },
  combined: {
    type: Number,
  },
  dates: {
    type: String,
  },
});

const Inputs = mongoose.model("Inputs", inputsSchema);

module.exports = Inputs;
