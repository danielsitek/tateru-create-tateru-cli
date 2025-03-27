const { DIST_FOLDER } = require('./helpers/config');
const del = require('del');

module.exports = function clean() {
  return del([
    `${DIST_FOLDER}`,
  ], {
    force: true,
  });
};
