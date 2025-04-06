const { DIST_FOLDER } = require('./helpers/config');
const { src, dest } = require('gulp');
const browserSync = require('./browser-sync');
const postcss = require('gulp-postcss');

module.exports = function css(cb) {
  return src([
    `src/assets/css/*.css`,
  ], {
    cwd: '.',
  })
    .pipe(postcss([
      require('postcss-import'),
      require('autoprefixer'),
    ]))
    .pipe(dest(`${DIST_FOLDER}assets/css/`))
    .pipe(browserSync.stream());
}
