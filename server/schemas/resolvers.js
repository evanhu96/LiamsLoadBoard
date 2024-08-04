const Inputs = require("../models/Inputs");
const Load = require("../models/Load");

fs = require("fs");
var currentLoads = require("../../currentLoads.json");
// import fresh
// find new current loads every 10 second

const resolvers = {
  Query: {
    loadInputs: async (
      _,
      { location, arrivalDate, dates, deadhead, distance, combined }
    ) => {

      console.log("inputs resolver");
      // delete old inputs
      await Inputs.deleteMany({});
      Inputs.create({
        location,
        arrivalDate,
        dates,
        deadhead,
        distance,
        combined,
      });

      return {
        hash: "hash",
        company: "company",
        contact: "contact",
        origin: "origin",
        destination: "destination",
        travelTime: 1.5,
        hotSpot: "hotSpot",
        distanceFromHotSpot: "distanceFromHotSpot",
        age: "age",
        notes: "notes",
      };
    },
    loads: async (_) => {
      // check for new loads every 15 seconds
      const loads = await Load.find({});
      return loads;

      // return JSON.parse(loads);
    },
  },
};

module.exports = resolvers;
