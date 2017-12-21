'use strict';

// dynamic script and link
const HTMLPlugin = require('html-webpack-plugin');
// create a separate css bundle
const ExtractPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: `${__dirname}/src/main.js`,
  // configured the sourceMap with the devtool prop
  // it maps errors to their appropriate modules and line number
  devtool: 'cheap-eval-source-map',
  // bundle output
  output: {
    filename: 'bundle.[hash].js',
    path: `${__dirname}/build`,
  },
  // plugins
  plugins: [
    // generates an index.html with dynamic script and link tags
    new HTMLPlugin({
      template: `${__dirname}/src/index.html`,
    }),
    // generates a css bundle from the output of the style loader
    new ExtractPlugin('bundle.[hash].css'),
  ],
  module: {
    // loaders (runs from the bottom up, similar to pop loaders off stack)
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // runs third and last
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        // runs second
        loader: ExtractPlugin.extract({
          use: [
            'css-loader',
            'resolve-url-loader',
            {
              // runs first
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                includePaths: [`${__dirname}/src/style`],
              },
            },
          ],
        })
      },
    ],
  }
}