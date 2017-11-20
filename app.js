const dotenv = require('dotenv')
const result = dotenv.config();
if (result.error) {
  throw result.error;
}
// console.log(result.parsed);

const express = require('express');
const config = require('./config/config');

const app = express();

module.exports = require('./config/express')(app, config);

app.listen(config.port, () => {
  console.log(`Express server listening on port ${config.port}`);
});
