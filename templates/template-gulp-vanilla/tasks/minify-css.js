const { DIST_FOLDER } = require('./helpers/config');
const { src, dest } = require('gulp');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');

module.exports = function minifyCss(cb) {
  return src([
    `*.css`,
    '!*.min.css',
  ], {
    cwd: `${DIST_FOLDER}assets/css/`,
  })
    .pipe(postcss([cssnano()]))
    .pipe(
      rename({
        suffix: '.min'
      })
    )
    .pipe(dest(`${DIST_FOLDER}assets/css/`));
}
