const pgp = require('pg-promise')()

const CONNECTION_STRING = process.env.DATABASE_URL
const db = pgp(CONNECTION_STRING)

module.exports = db
