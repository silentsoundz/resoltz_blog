const pgp = require('pg-promise')()
const CONNECTION_STRING = require( '../../../config/config' )

const db = pgp(CONNECTION_STRING)

console.log( CONNECTION_STRING )
module.exports = db
