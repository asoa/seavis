const data = require('./init_vessels');
const fs = require('fs');

const outstream = fs.createWriteStream('./public/markers.js');
outstream.write('const vessels = {\n');

 data().then(async (_data) => {
  // console.log(data);
  // outstream.write(JSON.stringify(data));
  await _data.forEach(element => {
    let k = Object.keys(element)[0];
    let { mmsi, lat, lng } = element[k];
    outstream.write(`${mmsi}: {mmsi: "${mmsi}", lat: "${lat}", lng: "${lng}"},` + '\n');
  });
  outstream.write('};\n\n');
  outstream.write('module.exports = vessels;');
  outstream.end();
});

