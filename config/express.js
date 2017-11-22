const express = require('express');
const glob = require('glob');
const config = require('./config');

const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const compress = require('compression');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

module.exports = function (app) {
  const env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env === 'development';

  app.set('views', `${config.root}/app/views`);
  app.set('view engine', 'ejs');

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true,
  }));

  app.use(session({
    name: process.env.KEY,
    store: new pgSession({
      conString: process.env.TEST_DATABASE_URL,
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 3600000,
    },
  }));

  app.use(compress());
  app.use(express.static(`${config.root}/public`));

  const controllers = glob.sync(`${config.root}/app/controllers/*.js`);
  controllers.forEach((controller) => {
    require(controller)(app);
  });

  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.render('utilities/error', {
        message: err.message,
        error: err,
        title: 'error',
      });
    });
  }

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('utilities/error', {
      message: err.message,
      error: {},
      title: 'error',
    });
  });

  return app;
};
