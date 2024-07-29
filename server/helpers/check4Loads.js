const getLaneInfo = require("./getLaneInfo");
const fs = require("fs");
const fuelCost = (distance1, distance2) => {
  distance1 = parseFloat(distance1);
  distance2 = parseFloat(distance2);
  return (distance1 + distance2) * 0.74;
};
const check4Loads = async (
  loads,
  { dates, deadhead, combined, distance, location }
) => {

  const keys = Object.keys(loads);
  const goodLoads = [];
  for (const key of keys) {
    const load = loads[key];
    const origin = load.origin;
    const destination = load.destination;
    const deadLane = await getLaneInfo(location, origin);
    if (deadLane.distance > deadhead) continue;
    const lane = await getLaneInfo(origin, destination);
    if (lane.distance > distance) continue;

    load.profit = load.rate - fuelCost(lane.distance, deadLane.distance);
    const totalTravelTime = lane.travelTime + deadLane.travelTime;
    // check hotspots distances
    const philadelphia = await getLaneInfo(destination, "Philadelphia, PA");
    const baltimore = await getLaneInfo(destination, "Baltimore, MD");
    const pittsburgh = await getLaneInfo(destination, "Pittsburgh, PA");
    const youngstown = await getLaneInfo(destination, "Youngstown, OH");
    // if any distance is greater than 75 miles, continue

    if (
      parseFloat(philadelphia.distance) > 100 &&
      parseFloat(baltimore.distance) > 100 &&
      parseFloat(pittsburgh.distance) > 100 &&
      parseFloat(youngstown.distance) > 100
    ) {
      continue;
    }
    // add closest hotspot to load
    const hotspots = [philadelphia, baltimore, pittsburgh, youngstown];
    hotspots.sort((a, b) => a.distance - b.distance);
    // city of hotspot
    const city = hotspots[0].destination;
    load.hotspot = city;

    const totalDistance =
      parseFloat(deadLane.distance) + parseFloat(lane.distance);
    load.totalDistance = totalDistance;
    if (totalDistance > combined) continue;
    load.totalTravelTime;
    goodLoads.push(load);
  }
  return goodLoads;
};
module.exports = check4Loads;
