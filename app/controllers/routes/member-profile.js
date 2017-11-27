const router = require('express').Router();
const db = require('../../models/member-profile');
const { newPassword, passwordCompare } = require('../utilities/passwordFunctions');
// const { isLoggedIn } = require('../utilities/middlewares');

router.get('/', (request, response) => {
  response.status(200).render('pages/member/authentication', { errorMsg: '' });
});

router.post('/signup', (request, response) => {
  const {
    fname, lname, username, email, password, password2,
  } = request.body;
  if (password !== password2) {
    response.status(200).render('pages/member/authentication', {
      errorMsg: 'Your passwords do not match',
    });
  } else {
    db.findUsername(username)
      .then((existingUsername) => {
        if (existingUsername.length > 0) {
          if (existingUsername[0].username === username) {
            response.status(200).render('pages/member/authentication', {
              errorMsg: 'That username already exists',
            });
          }
        } else {
          db.findEmail(email)
            .then((existingEmail) => {
              if (existingEmail.length > 0) {
                if (existingEmail[0].email === email) {
                  response.status(200).render('pages/member/authentication', {
                    errorMsg: 'That user already exists',
                  });
                }
              } else {
                newPassword(password)
                  .then((hashedPassword) => {
                    db.createUser(fname, lname, username, email, hashedPassword)
                      .then((newUser) => {
                        const member = {
                        id:newUser[0].id,
                        fname:newUser[0].fname,
                        lname:newUser[0].lname,
                        username:newUser[0].username,
                        email:newUser[0].email,
                        pic_url:newUser[0].pic_url,
                        date_joined:newUser[0].date_joined,
                      };
                      request.session.member = member;
                        response.status(200).redirect('/');
                      });
                  });
              }
            });
        }
      });
  }
});

router.post('/login', (request, response) => {
  const { username, email, password } = request.body;
  Promise.all([db.findUsername(username), db.findEmail(email)])
    .then((rows) => {
      const existingUsername = rows[0];
      const existingEmail = rows[1];
      if (existingUsername.length === 0 || existingEmail.length === 0) {
        response.status(200).render('pages/member/authentication', {
          errorMsg: 'Please check your username or password',
        });
      } else {
        passwordCompare(password, existingUsername[0].password)
          .then((didPasswordMatch) => {
            if (!didPasswordMatch) {
              response.status(200).render('pages/member/authentication', {
                errorMsg: 'Please check your username or password',
              });
            } else {
              const member = {
                id: existingUsername[0].id,
                username: existingUsername[0].username,
                email: existingUsername[0].email,
                pic_url: existingUsername[0].pic_url,
                date_joined: existingUsername[0].date_joined,
              };
              request.session.member = member;
              console.log('this is the member', request.session);
              response.status(200).redirect('/');
            }
          });
      }
    });
});

module.exports = router;
