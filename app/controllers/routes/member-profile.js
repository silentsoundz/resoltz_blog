const router = require('express').Router();
const db = require('../../models/member-profile');
const { newPassword, passwordCompare } = require('../utilities/passwordFunctions');
// const { isLoggedIn } = require('../utilities/middlewares');

router.get('/', (request, response) => {
  response.status(200).render('pages/member/authentication', { errorMsg: '' });
});

router.post('/signup', (request, response) => {
  const member = request.body;
  request.session.member = member;
  console.log('this is the request', request.session);
  const {
    fname, lname, username, email, password, password2,
  } = member;
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
                        member.fname = fname;
                        member.lname = lname;
                        member.username = username;
                        member.email = email;
                        member.password = password;
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
  const member = request.body;
  request.session.member = member;
  const { username, email, password } = member;
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
              member.username = username;
              member.email = email;
              member.password = password;
              console.log('this is the member', member);
              // request.session.member = existingMember;
              response.status(200).redirect('/');
            }
          });
      }
    });
});

module.exports = router;
