const fs = require("fs");
const add_to_json = async (path, data) => {
  if (!data) return console.log("no data");
  const loadsJsonString = JSON.stringify(data, null, 2); // The second argument (null) is for replacer, and the third (2) is for indentation.
  if (!loadsJsonString) return console.log("no loadsJsonString");
  console.log("writing file");
  // console.log(loadsJsonString);
  fs.writeFile(path, loadsJsonString, "utf8", (err) => {
    if (err) {
      console.error("Error writing the file: ", err);
    } else {
      console.log("File saved successfully.");
    }
  });
};

module.exports = add_to_json;
