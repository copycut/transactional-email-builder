module.exports.i18nVar = function (tag, variable) {
  if (!variable) {
    return tag;
  }
  if (tag) {
    return tag.replace('%s', variable);
  }
  return '';
};
