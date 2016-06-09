module.exports.getPercentStacked = function (items, value) {
  var ref = items.reduce((acc, item) => {
    return acc + item.current;
  }, 0);

  return ((value / ref) * 100).toFixed(1);
};
