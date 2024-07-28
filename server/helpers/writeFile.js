const fs = require("fs");
const main = ({ filePath, data }) => {
  fs.writeFileSync(filePath, JSON.stringify(data));
};
module.exports = main;
