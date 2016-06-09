module.exports.getPercent = function (reference, value, key) {
  var ref = null;
  var val = null;

  if (typeof reference === 'object') {
    ref = Math.max(reference.previous, reference.current);
  } else {
    ref = reference;
  }

  if (typeof value === 'object') {
    val = Math.max(value.previous, value.current);
  } else {
    val = value;
  }

  return ((val / ref) * 100).toFixed(1);
};
