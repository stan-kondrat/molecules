var CopyWebpackPlugin = require('copy-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  context: __dirname + "/examples",
  entry: {
      examples: "./examples.js",
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].bundle.js",
  },
  plugins: [
      new CopyWebpackPlugin([
        { from: '*.html' },
        { from: '*.svg' },
        { from: '*.css' },
      ]),
      new webpack.SourceMapDevToolPlugin(),
  ],
};
