const express = require('express');
const router = express.Router();
const api = require('../api/getVesselHistory');

router.get('/:mmsi', (req, res, next) => {
  if(!req.user) { return res.render('login');}
  next();
}, function(req, res) {
  res.locals.filter = null;
  console.log(req.user);
  const api_call = async () => {
    try {
      let r = await api.getVesselHistory(req.params.mmsi, 1);
      let { latitude, longitude, heading, SOG, timeOfFix } = r[0];
      let vessel = {
        mmsi: req.params.mmsi,
        latitude,
        longitude,
        heading,
        SOG,
        timeOfFix
      };
      return vessel;
    } catch (error) {
      
    }
  }
  api_call().then(vessel => {
    res.render('vessel', { vessel: vessel });
  });
});

module.exports = router;