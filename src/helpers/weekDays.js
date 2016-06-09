var dayOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

module.exports.weekDays = function (index) {
  return dayOfWeek[index] || '';
};
