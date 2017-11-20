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
  console.log(email);
  if (password !== password2) {
    response.status(200).render('pages/member/authentication', {
      errorMsg: 'Your passwords do not match',
    });
  }

  db.findUser(username)
    .then((existingMember) => {
      if (existingMember) {
        console.log("member exists:",existingMember);
        response.status(200).render('pages/member/authentication', {
          errorMsg: 'This user already exists',
        });
      } else {
        newPassword(password)
          .then((hashedPassword) => {
            console.log("hashed password",hashedPassword);
            db.createUser(fname, lname, username, email, hashedPassword)
              .then((newUser) => {
                console.log('newUser:', newUser);
                response.status(200).redirect('/');
              });
          });
      }
    });
});

router.post('/login', (request, response) => {
  const { username, email, password } = request.body;
  db.findUser(username)
    .then((existingMember) => {
      if (!existingMember) {
        console.log('username does not match:', existingMember);
        response.status(200).render('pages/member/authentication', {
          errorMsg: 'Please check your username or password',
        });
      } else if (existingMember.email !== email) {
        console.log('email does not match:', existingMember);
        response.status(200).render('pages/member/authentication', {
          errorMsg: 'Please check your username or password',
        });
      } else {
        console.log('existing member:', existingMember);
        console.log('entered password:', password);
        passwordCompare(password, existingMember.password)
          .then((didPasswordMatch) => {
            console.log('did password match:', didPasswordMatch);
            if (!didPasswordMatch) {
              response.status(200).render('pages/member/authentication', {
                errorMsg: 'Please check your username or password',
              });
            } else {
              // request.session.member = existingMember;
              response.status(200).redirect('/');
            }
          });
      }
    });
});

module.exports = router;
