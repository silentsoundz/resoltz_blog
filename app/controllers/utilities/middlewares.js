const isLoggedIn = (request, response, next) => {
  if (!request.session.user) {
    response.redirect('/login');
  } else {
    next();
  }
};

module.exports = { isLoggedIn };
