function getDiff (previous, current) {
  if (previous > current) {
    return previous - current;
  }
  return 0;
}

module.exports.getPercentProportional = function (items, item, key) {
  var ref = null;
  var percent = null;
  var value = null;
  var BEST = 0;
  var CURRENT = 1;
  var PREVIOUS = 2;
  var DIFF = 3;

  switch (key) {
    case BEST:
      {
        value = Math.max(item.previous, item.current);
      }
      break;
    case CURRENT:
      {
        value = item.current;
      }
      break;
    case PREVIOUS:
      {
        value = item.previous;
      }
      break;
    case DIFF:
      {
        value = getDiff(item.previous, item.current);
      }
      break;
  }

  if (key === DIFF && value <= 0) {
    return 0.01; // Tables don't render weel with width: 0.0%;
  }

  items.forEach(item => {
    var max = Math.max(item.previous, item.current);
    if (max > ref) {
      ref = max;
    }
  });

  percent = ((value / ref) * 100);

  return percent.toFixed(1);
};
