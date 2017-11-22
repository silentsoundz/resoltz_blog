const router = require('express').Router();
// const moment = require('./utilities/moment');

const member = require('./routes/member-profile');
const posts = require('./routes/posts');
const app = require('express');

router.use('/auth', member);
router.use('/', posts);

router.get('/logout', (request, response) => {
  request.session.destroy(() => {
    response.redirect('/');
  });
});

module.exports = (app) => {
  app.use('/', router);
  return app;
};
