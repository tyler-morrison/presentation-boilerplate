const HtmlWebpackPlugin = require('html-webpack-plugin');

exports.indexTemplate = function(options) {
  return {
    plugins: [
      new HtmlWebpackPlugin({
        template: require('html-webpack-template'),
        title: options.title,
        appMountId: options.appMountId,
        inject: false
      })
    ]
  };
}
