require('dotenv').config();

const AGE = process.env.AGE;
const SEAVISION_API_KEY = process.env.SEAVISION_API_KEY;
const MMSI_LIST = process.env.MMSI_LIST;

const getVesselHistory = async (mmsi, age) => {
  // fetch vessel history from seavision api
  const response = await fetch(`https://api.seavision.volpe.dot.gov/v1/vessels/${mmsi}/history?age=${age}`,
    {
      headers: {
        'x-api-key': `${SEAVISION_API_KEY}`,
        'accept': 'application/json'
      }
    }
  );
  // console.log(await response.json())
  if(response.status == 200) {
    console.log(`Request for MMSI: ${mmsi} and age: ${age} was successful`);
    let r = await response.json();
    return r;
  }
  throw new Error(`Request for MMSI: ${mmsi} and age: ${age} failed`);
}

const getVesselHistories = async (mmsiList) => {
  let mmsiListArray = mmsiList.split(',');
  const responses = mmsiListArray.map(async mmsi => await getVesselHistory(mmsi, `${AGE}`));
  return Promise.all(responses);
}

module.exports = { getVesselHistory, getVesselHistories };