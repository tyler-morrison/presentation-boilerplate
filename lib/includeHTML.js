const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = (options) => {
  return {
    module: {
      loaders: [
          {
          test: /\.jade$/,
          loader: 'jade'
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: options.template,
        title: options.title,
        appMountId: options.appMountId,
        inject: false
      })
    ]
  };
}
