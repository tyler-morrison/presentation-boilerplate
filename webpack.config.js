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
  template: join(__dirname, 'app', 'template.jade'),
  build: join(__dirname, 'build')
};

const common = merge(
  {
    entry: {
      app: PATHS.app
    },
    output: {
      path: PATHS.build,
      filename: '[name].js'
    },
    resolve: {
      // NOTE: Do not remove ''. If you do, imports w/o an extension won't function!
      extensions: ['', '.js'],
      modulesDirectories: [ 'node_modules' ]
    }
  },
  parts.includeBabel.load(),
  parts.includeBabel.lint(),
  parts.includeHTML({
    template: PATHS.template,
    title: 'New Application',
    appMountId: 'app'
  })
);

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
    parts.devServer({
      // Customize host/port here if needed
      host: process.env.HOST,
      port: process.env.PORT
    }),
    parts.buildSass.basic(PATHS.style),
    parts.npmInstall({
      dev: true,
      peerDependencies: true
    })
  );
}


module.exports = validate(config, {
  quiet: true
});
