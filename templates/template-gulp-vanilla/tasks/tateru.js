const { src, dest } = require('gulp');
const { gulpTateruCli } = require('gulp-tateru-cli');
const { ENV_PRODUCTION } = require('./helpers/config');

const TATERU_ENV_PRODUCTION = 'prod';
const TATERU_ENV_DEVELOPMENT = 'dev';

module.exports = function tateru() {
  /** @type {import('gulp-tateru-cli').GulpTateruCliOptions} */
  const options = {
    env:
      process.env.NODE_ENV === ENV_PRODUCTION
        ? TATERU_ENV_PRODUCTION
        : TATERU_ENV_DEVELOPMENT,
  };

  return src(['tateru.config.json'], {
    cwd: '.',
  })
    .pipe(gulpTateruCli(options))
    .pipe(dest('dist'));
};
