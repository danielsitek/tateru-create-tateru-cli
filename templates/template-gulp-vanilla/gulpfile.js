'use strict';

/**
 * @link https://github.com/gulpjs/gulp/tree/master/docs/recipes
 */

const { ENV_DEVELOPMENT, ENV_PRODUCTION } = require('./tasks/helpers/config');
const { parallel, series } = require('gulp');
const clean = require('./tasks/clean');
const css = require('./tasks/css');
const images = require('./tasks/images');
const minifyCss = require('./tasks/minify-css');
const publicAssets = require('./tasks/public-assets');
const tateru = require('./tasks/tateru');
const watch = require('./tasks/watch');
const webpack = require('./tasks/webpack');

process.env.NODE_ENV = ENV_DEVELOPMENT;

const js = function js(cb) {
  return series(
    webpack,
  )(cb);
}

const templates = function templates(cb) {
  return series(
    publicAssets,
    tateru,
  )(cb);
}

const build = function build(cb) {
  return series(
    clean,
    parallel(
      css,
      images,
      js,
      templates,
    ),
  )(cb);
}

const dev = function dev(cb) {
  process.env.NODE_ENV = ENV_DEVELOPMENT;

  return series(
    build,
    watch,
  )(cb);
};

const prod = function prod(cb) {
  process.env.NODE_ENV = ENV_PRODUCTION;

  return series(
    build,
    minifyCss,
  )(cb);
};

module.exports = {
  build,
  clean,
  css,
  default: dev,
  images,
  js,
  prod,
  publicAssets,
  templates,
  watch,
}
