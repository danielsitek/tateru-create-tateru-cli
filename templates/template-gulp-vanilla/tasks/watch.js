const { DIST_FOLDER } = require('./helpers/config');
const { watch: watchGulp } = require('gulp');
const browserSync = require('./browser-sync');
const css = require('./css');
const images = require('./images');
const publicAssets = require('./public-assets');
const tateru = require('./tateru');
const webpack = require('./webpack');

/**
 * @link https://gulpjs.com/docs/en/getting-started/watching-files
 */
module.exports = function watch () {
  browserSync.init({
    server: DIST_FOLDER,
    open: false,
    reloadDebounce: 1000,
  });

  watchGulp([
    `src/assets/css/**/*.css`,
  ], css);

  watchGulp([
    `src/assets/images/**/*`,
  ], images);

  watchGulp([
    `public/**/*`,
  ], publicAssets);

  watchGulp([
    `src/twig/**/*`,
    `src/translations/**/*`,
    `config.json`,
  ], tateru);

  watchGulp([
    `src/assets/js/**/*`,
  ], webpack);

  watchGulp([
    `${DIST_FOLDER}**/*`,
  ]).on('change', browserSync.reload);
};
