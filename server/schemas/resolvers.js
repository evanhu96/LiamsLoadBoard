const Inputs = require("../models/Inputs");

fs = require("fs");
var currentLoads = require("../../currentLoads.json");
// import fresh
const importFresh = require("import-fresh");
const check4Loads = require("../helpers/check4Loads");
const { Load } = require("../models");
// find new current loads every 10 second
setInterval(() => {
  currentLoads = importFresh("../../currentLoads.json");
  currentInputs = importFresh("../../currentInputs.json");
}, 1000);
const resolvers = {
  Query: {
    loadInputs: async (
      _,
      { location, arrivalDate, dates, deadhead, distance, combined }
    ) => {
      fs.writeFileSync(
        "../currentInputs.json",
        JSON.stringify({
          location:"New York",
          arrivalDate,
          dates,
          deadhead,
          distance,
          combined,
        })
      );
      console.log("inputs resolver");
      // delete old inputs
      await Inputs.deleteMany({});
      Inputs.create({
        location:"New York",
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
      const loads = await check4Loads(currentLoads, currentInputs);
      console.log(loads);
      console.log(loads.length);
      return loads;

      // return JSON.parse(loads);
    },
  },
};

module.exports = resolvers;
