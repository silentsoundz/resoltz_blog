const sessionChecker = (request, response, next) => {
  const sid = request.sesssionID
};
const isLoggedIn = (request, response, next) => {
  if (!request.session.member) {
    response.redirect('/login');
  } else {
    next();
  }
};

module.exports = { isLoggedIn, sessionChecker };
