// import controllers
const { getCleanData } = require("./controllers");

const main = () => {
  var lastTimeStamp;
  while (true) {
    // clean data
    const data = getCleanData();
    // check largest epoch prop
    const largestEpoch = Math.max(
      ...data.map((load) => load.pickup.epoch)
    );
    // check if largest epoch is the same as the last timestamp
    if(largestEpoch === lastTimeStamp) {
      // no new data
      continue;
    }
    

    setTimeout(() => {
      // wait 30 seconds
    }, 30000);
  }
};
module.exports = main;
