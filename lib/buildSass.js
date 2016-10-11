const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const pixrem = require('pixrem');

exports.basic = (paths) => {
  return {
    module: {
      loaders: [
        {
          test: /\.scss$/,
          loaders: ['style', 'css?sourceMap!sass?sourceMap'],
          include: paths
        }
      ]
    }
  };
};

// Runs PostCSS plugins and extracts the output into a separate CSS file.
// TODO: Split code into `main.css` and `critical.css`
exports.andExtract = (paths) => {
  return {
    module: {
      loaders: [
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('style', 'css!postcss?sourceMap!sass?sourceMap'),
          include: paths
        }
      ]
    },
    // Plugins listed here must be required at top of file.
    postcss: [autoprefixer, pixrem, cssnano],
    plugins: [
      new ExtractTextPlugin('[name].[chunkhash].css')
    ]
  };
};
