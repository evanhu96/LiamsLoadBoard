const main = ({ loads, date }) => {
  // remove old
  const oneDayEpoch = 86400000;
  for (const load of loads) {
    if (date - loadDate > oneDayEpoch) {
      const index = loads.indexOf(load);
      loads.splice(index, 1);
    }
    load.epoch = date;
  }
  return loads;
};
module.exports = main;
