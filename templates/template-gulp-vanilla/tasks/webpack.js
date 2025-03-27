const { ENV_DEVELOPMENT } = require('./helpers/config');
const bundler = require('webpack');
const Logger = require('./helpers/logger');
const path = require('path');

const log = new Logger({
  namespace: 'webpack',
});

module.exports = function webpack (cb) {
  log.info(`env: ${process.env.NODE_ENV}`);

  let isReady = false;

  const settings = {
    mode: process.env.NODE_ENV || ENV_DEVELOPMENT,

    entry: {
      homepage: path.resolve(__dirname, '../src/assets/js/homepage.js')
    },

    output: {
      path: path.resolve(__dirname, '../dist/assets/js'),
      filename: '[name].bundle.js',
      chunkFilename: '[name].chunk.js?v=[contenthash:10]',
      publicPath: '/assets/js/',
    },

    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
      },
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          include: [path.resolve(__dirname, '../src')],
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.svg$/,
          include: [path.resolve(__dirname, '../src')],
          use: {
            loader: 'html-loader',
          },
        }
      ]
    },
  };

  if (process.env.NODE_ENV === ENV_DEVELOPMENT) {
    settings.devtool = 'eval-source-map';
  }

  const bundle = bundler(settings, function (error, stats) {
    const jsonStats = stats.toJson();
    const { errors, warnings } = jsonStats;

    if (error) {
      log.error(error);
    } else if (errors.length > 0) {
      log.error(errors.toString());
    } else if (warnings.length > 0) {
      log.warning(warnings.toString());
    } else {
      log.custom({
        type: 'Stats',
      }, stats.toString({
        colors: true,
        hash: false,
        timings: true,
        assets: true,
        chunks: false,
        chunkModules: false,
        modules: false,
        children: true,
        version: false,
      }));
    }

    if (!isReady) {
      cb();
    }

    return isReady = true;
  });

  return bundle;
};
