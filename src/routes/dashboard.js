const express = require('express');
const router = express.Router();

// router.get('/', (req, res, next) => {
//   res.render('tak');
// });

router.get('/', (req, res, next) => {
  if(!req.user) { return res.render('login');}
  next();
}, function(req, res, next) {
  res.locals.filter = null;
  console.log(req.user);
  res.render('dashboard', { user: req.user });
});


module.exports = router;