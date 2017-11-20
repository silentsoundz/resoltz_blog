const router = require('express').Router();
// const moment = require('./utilities/moment');

const member = require('./routes/member-profile');
const posts = require('./routes/posts');
const app = require('express')
router.use('/auth', member);
router.use('/', posts);

module.exports = (app) => {
  app.use('/', router);
  return app
};

// const router = require( 'express' ).Router()
// const albums = require( './albums')
// const signup = require('./signup')
// const login = require('./login')
// const profile = require('./member-profile')
//
// router.use('/signup', signup)
// router.use('/login', login)
// router.use('/profile', profile)
//
// router.get('/logout', (req, res) => {
//   req.session.destroy( () => {
//     res.redirect('/')
//   })
// })

// module.exports = app
