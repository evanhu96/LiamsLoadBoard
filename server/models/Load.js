const mongoose = require("mongoose");

const loadSchema = new mongoose.Schema({
  hash: {
    type: String,
    required: true,
    unique: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  profit: {
    type: Number,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  dates: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  LastRepostAge: {
    type: Number,
    required: true,
  },
  contact: {
    type: String,
  },
});

const Load = mongoose.model("Load", loadSchema);

module.exports = Load;
