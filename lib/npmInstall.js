/**
 * Speed up development by automatically installing & saving dependencies with Webpack.
 * Use `require` or `import` how you normally would and npm install will happen
 * automatically to install & save missing dependencies while you work!
 */
const NpmInstallPlugin = require('npm-install-webpack-plugin');

module.exports = (options) => {
  options = options || {};

  return {
    plugins: [
      new NpmInstallPlugin(options)
    ]
  };
}
