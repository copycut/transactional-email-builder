module.exports.raw = function (params) {
  return params.replace('[[', '{{').replace(']]', '}}');
};
