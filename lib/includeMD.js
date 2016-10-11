const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (paths) => {
  return {
    module: {
      loaders: [
        {
          test: /\.md$/,
          loader: ExtractTextPlugin.extract('raw'),
          include: paths
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('[name].md')
    ]
  };
};
