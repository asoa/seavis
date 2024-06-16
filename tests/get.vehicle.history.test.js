const { getVesselHistory, getVesselHistories } = require('../src/getVesselHistory.js');

const MMSI = process.env.MMSI;
const MMSI_LIST = process.env.MMSI_LIST;
const AGE = process.env.AGE;

test('test that getVesselHistory() returns a promise', async () => {
  // check that fetch returned a promise
  expect(await getVesselHistory(`${MMSI}`,`${AGE}`)).toBeInstanceOf(Response);
})

// test that getVesselHistory() returns a 200 status code
test('test that getVesselHistory() returns a 200 status code', async () => {
  const response = await getVesselHistory(`${MMSI}`,`${AGE}`);
  expect(response.status).toBe(200);
})

// test that getVesselHistory() JSON.parse(response.text) returns a javascript array object
test('test that getVesselHistory().response.json() returns a javascript object', async () => {
  const response = await getVesselHistory(`${MMSI}`,`${AGE}`);
  const data = await response.json();
  expect(Array.isArray(data)).toBeTruthy();
})

test('test getVesselHistories() returns an Array ', async () => {
  const response = await getVesselHistories(`${MMSI_LIST}`);
  expect(Array.isArray(response)).toBeTruthy();
})