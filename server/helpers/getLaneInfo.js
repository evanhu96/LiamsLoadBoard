const { get_travel_time, get_coordinates } = require("../api");
const add_to_json = require("./add_to_json");
const lanes = require("C:/Users/evanh/OneDrive/Desktop/liams-load-board/seeder/MasterDat/dbs/lanes.json");
const getLaneInfo = async (origin, destination) => {
  console.log(origin, destination, "oG");
  origin = origin.replace(/\n/g, "");
  destination = destination.replace(/\n/g, "");
  if (lanes[origin] && lanes[origin][destination]) {
    const lane = lanes[origin][destination];
    return lane;
  } else {
    var { latitude, longitude } = await get_coordinates(origin);
    const origin_latitude = latitude;
    const origin_longitude = longitude;
    const originCoordinates = `${origin_latitude},${origin_longitude}`;
    var { latitude, longitude } = await get_coordinates(destination);
    const destination_latitude = latitude;
    const destination_longitude = longitude;
    const destinationCoordinates = `${destination_latitude},${destination_longitude}`;
    const { distance, travelTime } = await get_travel_time(
      originCoordinates,
      destinationCoordinates
    );
    const radiusInMiles = "";
    const newLane = {
      origin,
      destination,
      travelTime,
      distance,
      origin_latitude,
      origin_longitude,
      destination_latitude,
      destination_longitude,
    };
    if (!lanes[origin]) {
      lanes[origin] = {};
    }
    lanes[origin][destination] = newLane;
    const outputPath =
      "C:/Users/evanh/OneDrive/Desktop/liams-load-board/seeder/MasterDat/dbs/lanes.json";
    if (Object.keys(lanes).length > 10) {
      await add_to_json(outputPath, lanes);
    }
    return newLane;
  }
};
module.exports = getLaneInfo;
