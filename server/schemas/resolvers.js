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
      { location, arrivalDate, dates, deadhead, distance }
    ) => {
      let inputs;
      if (location !== "") {
        // format location as city, state
        const cityWithoutSpaces = location.split(",")[0].trim();
        const state = location.split(",")[1].trim();
        location = cityWithoutSpaces + ", " + state;
        // if no inputs exist, create new inputs
        const inputsCheck = await Inputs.findOne({});
        // if any props are null set them equal to inputsCheck
        location = location || inputsCheck.location;
        arrivalDate = arrivalDate || inputsCheck.arrivalDate;
        dates = dates || inputsCheck.dates;
        deadhead = deadhead || inputsCheck.deadhead;
        distance = distance || inputsCheck.distance;

        if (!inputsCheck)
          inputs = await Inputs.create({
            location,
            arrivalDate,
            dates,
            deadhead,
            distance,
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
              },
            }
          );
        inputs = await Inputs.findOne({}).lean();
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
      notificationDistance =
        notificationDistance || inputsCheck.notificationDistance;
      notificationDeadhead =
        notificationDeadhead || inputsCheck.notificationDeadhead;
      notificationProfit = notificationProfit || inputsCheck.notificationProfit;
      notificationTime = notificationTime || inputsCheck.notificationTime;

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

      return inputs;
    },
    textInputs: async (
      _,
      { textDistance, textDeadhead, textProfit, textTime }
    ) => {
      var inputs;
      const inputsCheck = await Inputs.findOne({});
      console.log(inputsCheck);
      textDistance = textDistance || inputsCheck.textDistance;
      textDeadhead = textDeadhead || inputsCheck.textDeadhead;
      textProfit = textProfit || inputsCheck.textProfit;
      textTime = textTime || inputsCheck.textTime;

      if (!inputsCheck) {
        console.log("creating inputs");
        inputs = await Inputs.create({
          textDistance,
          textDeadhead,
          textProfit,
          textTime,
        });
      } else {
        console.log("updating inputs");
        inputs = await Inputs.updateOne(
          {},
          {
            $set: {
              textDistance,
              textDeadhead,
              textProfit,
              textTime,
            },
          }
        );
      }

      return inputs;
    },

    loads: async (_) => {
      // check for new loads every 15 seconds
      var { distance, deadhead } = await Inputs.findOne({});
      distance = parseFloat(distance);
      deadhead = parseFloat(deadhead);
      const loads = await Load.find({
        trip: { $lt: distance },
        currentDeadhead: { $lt: deadhead + 100 },
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
