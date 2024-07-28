const { readFile, writeFile, removeOldLoads } = require("../helpers");

const main = () => {
  const { loads, date } = readFile();
  const cleanedLoads = removeOldLoads({ loads, date });
  writeFile({
    filePath:
      "C:/Users/evanh/OneDrive/Desktop/liams-load-board/seeder/MasterDat/currentLoads.json",
    data: cleanedLoads,
  });
  return cleanedLoads;  
};
module.exports = main;
