'use strict';

// External Dependencies
const join     = require('path').join;
const merge    = require('webpack-merge');
const validate = require('webpack-validator');

// Internal Dependencies
const parts  = require('require-all')(__dirname + '/lib');

const TARGET = process.env.npm_lifecycle_event;

const PATHS  = {
  app: join(__dirname, 'app'),
  slides: join(__dirname, 'slides'),
  style: [
    join(__dirname, 'assets', 'styles', 'main.scss')
  ],
  build: join(__dirname, 'build')
};

const common = {
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: '[name].js'
  }
};

let config;

// Detect how npm is run and branch based on that
switch (TARGET) {
  case 'build':
    config = merge(
      common,
      {
        devtool: 'source-map',
        entry: {
          style: PATHS.style
        },
        output: {
          path: PATHS.build,
          filename: '[name].[chunkhash].js',
          chunkFilename: '[chunkhash].js'
        }
      },
      parts.buildSass.andExtract(PATHS.style)
    );
    break;
  default: config = merge(
    common,
    {
      devtool: 'eval-source-map',
      entry: {
        style: PATHS.style
      }
    },
    parts.includeHTML.indexTemplate({
      title: 'New Application',
      appMountId: 'app'
    }),
    parts.devServer({
      // Customize host/port here if needed
      host: process.env.HOST,
      port: process.env.PORT
    }),
    parts.buildSass.basic(PATHS.style),
    parts.npmInstall({ dev: true })
  );
}


module.exports = validate(config, {
  quiet: true
});
