var moment = require('moment');

function day (date) {
  return moment.utc(date).get('day');
}

function week (date) {
  return moment.utc(date).get('week');
}

function month (date) {
  return moment.utc(date).get('month');
}

function year (date) {
  return moment.utc(date).get('year');
}

function weekDay (index, lang) {
  moment.locale(lang);
  return moment.utc().day(index).format('dddd');
}

module.exports = {
  day: day,
  week: week,
  month: month,
  year: year,
  weekDay: weekDay
};
