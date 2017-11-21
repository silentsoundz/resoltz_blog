const db = require('./database/member-profile');

module.exports = {
  createUser: db.createUser,
  editUser: db.editUser,
  removeUser: db.removeUser,
  findUsername: db.findUsername,
  findEmail: db.findEmail,
};
