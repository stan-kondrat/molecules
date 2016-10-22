var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: __dirname + "/examples",
  entry: {
      example1: "./example1.js",
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].bundle.js",
  },
  plugins: [
      new CopyWebpackPlugin([
        { from: '*.html' }
      ]),
  ],
};
