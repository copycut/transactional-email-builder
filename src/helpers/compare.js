function handleBool (bool, options) {
  if (bool === true) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
}

function eq (lhs, rhs, options) { return handleBool.call(this, lhs === rhs, options); }
function eqz (lhs, options) { return eq.call(this, lhs, 0, options); }
function gt (lhs, rhs, options) { return handleBool.call(this, lhs > rhs, options); }
function gtz (lhs, options) { return gt.call(this, lhs, 0, options); }
function lt (lhs, rhs, options) { return handleBool.call(this, lhs < rhs, options); }
function ltz (lhs, options) { return lt.call(this, lhs, 0, options); }

module.exports = {
  eq: eq,
  eqz: eqz,
  gt: gt,
  gtz: gtz,
  lt: lt,
  ltz: ltz
};
