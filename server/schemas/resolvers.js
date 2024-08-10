const Inputs = require("../models/Inputs");
const Load = require("../models/Load");
const City = require("../models/City");
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
    cities: async (_) => {
      // find distinct cities sorted by count
      const citiesData = await City.find({}).sort({ count: -1 })
      const cities = citiesData.map(city => city.city);
      
      return cities;
    },
  },
};

module.exports = resolvers;
