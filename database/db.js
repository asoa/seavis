const sqlite3 = require('sqlite3');
const mkdirp = require('mkdirp');
const crypto = require('crypto');

mkdirp.sync('var/db');

const db = new sqlite3.Database('var/db/seavision.db');

db.serialize(function() {
  // create the database schema for the todos app
  db.run("CREATE TABLE IF NOT EXISTS users ( \
    id INTEGER PRIMARY KEY, \
    username TEXT UNIQUE, \
    hashed_password BLOB, \
    salt BLOB, \
    name TEXT, \
    email TEXT UNIQUE, \
    email_verified INTEGER \
  )");
  
  // create an initial user (username: asoa, password: letmein)
  // TODO: development only, remove this in production
  var salt = crypto.randomBytes(16);
  db.run('INSERT OR IGNORE INTO users (username, hashed_password, salt) VALUES (?, ?, ?)', [
    'asoa',
    crypto.pbkdf2Sync('letmein', salt, 310000, 32, 'sha256'),
    salt
  ]);
});

module.exports = db;
