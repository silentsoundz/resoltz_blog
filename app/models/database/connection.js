const pgp = require('pg-promise')()

// const CONNECTION_STRING = process.env.DATABASE_URL
const CONNECTION_STRING = `pg://${process.env.USER}@localhost:5432/resoltz-blog`
const db = pgp(CONNECTION_STRING)

module.exports = db
