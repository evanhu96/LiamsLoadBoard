const Inputs = require("../models/Inputs");
const Load = require("../models/Load");
const City = require("../models/City");
fs = require("fs");
var currentLoads = require("../../currentLoads.json");
const { de } = require("date-fns/locale");
// import fresh
// find new current loads every 10 second

const resolvers = {
  Query: {
    loadInputs: async (
      _,
      { location, arrivalDate, dates, deadhead, distance, combined }
    ) => {
      // console.log("inputs resolver");
      // console.log(location);
      let inputs;
      if (location !== "") {
        // if no inputs exist, create new inputs
        const inputsCheck = await Inputs.findOne({});
        if (!inputsCheck)
          inputs = await Inputs.create({
            location,
            arrivalDate,
            dates,
            deadhead,
            distance,
            combined,
          });
        else
          inputs = await Inputs.updateOne(
            {},
            {
              $set: {
                location,
                arrivalDate,
                dates,
                deadhead,
                distance,
                combined,
              },
            }
          );
      } else inputs = await Inputs.findOne({}).lean();
      return inputs;
    },
    notificationInputs: async (
      _,
      {
        notificationDistance,
        notificationDeadhead,
        notificationProfit,
        notificationTime,
      }
    ) => {
      var inputs;
      const inputsCheck = await Inputs.findOne({});
      console.log(inputsCheck);
      if (!inputsCheck) {
        console.log("creating inputs");
        inputs = await Inputs.create({
          notificationDistance,
          notificationDeadhead,
          notificationProfit,
          notificationTime,
        });
      } else {
        console.log("updating inputs");
        console.log(notificationDistance);
        console.log(notificationDeadhead);
        console.log(notificationProfit);
        console.log(notificationTime);
        inputs = await Inputs.updateOne(
          {},
          {
            $set: {
              notificationDistance,
              notificationDeadhead,
              notificationProfit,
              notificationTime,
            },
          }
        );
      }

      return 1;
    },

    loads: async (_) => {
      // check for new loads every 15 seconds
      var { distance, deadhead } = await Inputs.findOne({});
      distance = parseFloat(distance);
      deadhead = parseFloat(deadhead);
      const loads = await Load.find({
        trip: { $lt: distance },
        currentDeadhead: { $lt: deadhead +100},
      });

      return loads;

      // return JSON.parse(loads);
    },
    cities: async (_) => {
      // find distinct cities sorted by count
      const citiesData = await City.find({}).sort({ count: -1 });
      const cities = citiesData.map((city) => city.city);

      return cities;
    },
  },
};

module.exports = resolvers;
