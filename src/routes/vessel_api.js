const express = require('express');
const router = express.Router();
const getData = require('../../utils/init_vessels');


router.get('/:mmsi', (req, res) => {
  (async () => {
    _data = await getData();
    let r = await _data.filter(vessel => vessel[req.params.mmsi]);
    console.log(r);
    res.send(r);
  })();
  // res.send('vessel api');
});


module.exports = router;