const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const callReadFile = async function() {
  const data = await readFile('./src/data/map-vessels-2024-06-11_01-08.json', 'utf8');
  // console.log(data);
  let json = await JSON.parse(data);
  let jsonWithMMSIKey = json.map(vessel => {
    let mmsi = vessel.mmsi;
    return { [mmsi] : vessel };
  })
  // console.log(jsonWithMMSIKey);
  return jsonWithMMSIKey;
};

// callReadFile();

module.exports = callReadFile;
