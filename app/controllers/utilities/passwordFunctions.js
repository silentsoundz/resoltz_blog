const bcrypt = require('bcrypt');

const saltRounds = Number(process.env.SALT_ROUNDS);

const newPassword = password => bcrypt.hash(password, saltRounds);

const passwordCompare = (password, hashedPassword) => bcrypt.compare(password, hashedPassword);

module.exports = { newPassword, passwordCompare };
