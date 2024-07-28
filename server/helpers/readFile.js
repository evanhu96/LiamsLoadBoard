const fs = require("fs");
const main = () => {
  const filePath =
    "C:/Users/evanh/OneDrive/Desktop/liams-load-board/seeder/MasterDat/currentLoads.json";
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};
module.exports = main;
