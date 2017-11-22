const pgp = require('pg-promise')();
const config = require('../../../config/config');

const db = pgp('pg://stephanimcgrath@localhost:5432/resoltz-blog');
// console.log( "config:", config )
// const db = pgp(config);

module.exports = db;
