const { DIST_FOLDER } = require('./helpers/config');
const { src, dest } = require('gulp');
const autoprefixer = require('autoprefixer');
const browserSync = require('./browser-sync');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass')(require('sass'));

module.exports = function css(cb) {
  return src([
    `src/assets/scss/*.scss`,
  ], {
    cwd: '.',
  })
    .pipe(sass.sync())
    .pipe(postcss([
      autoprefixer(),
    ]))
    .pipe(dest(`${DIST_FOLDER}assets/css/`))
    .pipe(browserSync.stream());
}
