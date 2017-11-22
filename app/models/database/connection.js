const pgp = require('pg-promise')();
const config = require('../../../config/config');

const db = pgp(process.env.TEST_DATABASE_URL);
// console.log( "config:", config )
// const db = pgp(config);

module.exports = db;
