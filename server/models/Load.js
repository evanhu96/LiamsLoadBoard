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
  contact: {
    type: String,
  },
  trip: {
    type: Number,
  },
  lastScene: {
    type: Number,
  },
  lastPosted: {
    type: Number,
  },
  postEpoch: {
    type: Number,
    required: true,
  },
  favorites: {
    type: Boolean,
  },
  deadhead: {
    type: Number,
  },
  load: {
    type: String,
  },
  truck: {
    type: String,
  },
  weight: {
    type: String,
  },
  commodity: {
    type: String,
  },
  referenceID: {
    type: String,
  },
  comments: {
    type: String,
  },
  clickDetails: {
    type: String,
  },
  age: {
    type: String,
  },
  newData: {
    type: Boolean,
  },
  currentDeadhead: {
    type: Number,
  },
  hotspot: {
    type: String,
  },
  hotspotDistance: {
    type: Number,
  },
});

const Load = mongoose.model("Load", loadSchema);

module.exports = Load;
