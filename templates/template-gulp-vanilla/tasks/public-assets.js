const { DIST_FOLDER } = require('./helpers/config');
const { src, dest } = require('gulp');

module.exports = function publicAssets(cb) {
  return src([
    `**/*`,
  ], {
    cwd: 'public/',
    encoding: false,
  })
    .pipe(dest(`${DIST_FOLDER}`));
}
