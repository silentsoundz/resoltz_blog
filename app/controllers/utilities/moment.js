const moment = require('moment');

const normalizeDate = date => moment(date).format('MMMM Do YYYY');

const normalizeDay = date => moment(date).format('dddd');

const normalizeDayNum = date => moment(date).format('do');

const normalizeMonth = date => moment(date).format('MMMM');

const normalizeYear = date => moment(date).format('YYYY');

module.exports = {
  normalizeDate,
  normalizeDay,
  normalizeDayNum,
  normalizeMonth,
  normalizeYear,
};
