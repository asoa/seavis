const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const crypto = require('crypto');
const db = require('../../database/db'); // TODO: use path package to simplify

passport.use(new LocalStrategy(
  function verify(username, password, cb) {
    db.get('SELECT * FROM users WHERE username = ?', username, function(err, row) {
      if (err) return cb(err);
      if (!row) return cb(null, false, { message: 'Invalid username or password' });
      
      // use the crypto module to compute the hash and compare with the stored hash
      crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
        if (err) { return cb(err); }
        if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
          return cb(null, false, { message: 'Incorrect username or password.' });
        }
        
        // if hashes match, return null as first argument indicating success and the row from db
        return cb(null, row);
      });
    })
  }
));

function createUser(username, password, name, email) {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16);
    try {
      db.run('INSERT OR IGNORE INTO users (username, hashed_password, salt, name, email) VALUES (?, ?, ?, ?, ?)', [
        username,
        crypto.pbkdf2Sync(password, salt, 310000, 32, 'sha256'),
        salt,
        name,
        email
        ]);
      resolve('user created successfully');
    } catch (err) {
      reject(err);
    }
  });
}

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

router.post('/login/password', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
}));

router.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

router.get('/login', (req, res, next) => {
  res.render('login')
});

router.get('/login/registration', (req, res, next) => {
  res.render('registration');
});

router.post('/login/registration', async (req, res, next) => {
  const { username, password, password2, name, email } = req.body;
  const user = await createUser(username, password, name, email);
  if (user) {
    return res.redirect('/login');
  }
  res.redirect('/login/registration');
});



module.exports =  router;