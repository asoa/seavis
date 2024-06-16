const express = require('express');
const session = require('express-session');
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const vessels = require('./src/routes/vessel_api');
const getData = require('./utils/init_vessels');
require('dotenv').config(); 

// enable local user/password authentication
const LocalStrategy = require('passport-local').Strategy;

const SQLiteStore = require('connect-sqlite3')(session);

// routers
const indexRouter = require('./src/routes/index');
const authRouter = require('./src/routes/auth');
const dashBoardRouter = require('./src/routes/dashboard');
const apiRouter = require('./src/routes/seavis_api');

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// add session middleware 
app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 *60 * 24, secure: false, sameSite: "none" },
    resave: false,
    saveUninitialized: false,
    store: new SQLiteStore({ db: 'sessions.db', dir: './var/db'}),
  }));
app.use(passport.authenticate('session'));


// initialize and add passport to middleware request/response cycle
// app.use(passport.initialize());
// app.use(passport.session());

// add the vessels router
app.use('/', indexRouter)
app.use('/', authRouter);
app.use('/dashboard', dashBoardRouter);
app.use('/api', vessels);
app.use('/', apiRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

// (async () => {
//   _data = await getData();
//   console.log(_data)
// })();

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
