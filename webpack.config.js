'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',

  entry: [path.resolve(__dirname, 'src', 'index.js')],

  externals: ['waddup'],

  mode: 'development',

  module: {
    rules: [
      {
        enforce: 'pre',
        include: [path.resolve(__dirname, 'src')],
        loader: 'eslint-loader',
        options: {
          configFile: '.eslintrc',
          emitError: true,
          failOnError: true,
          failOnWarning: true,
          formatter: require('eslint-friendly-formatter'),
        },
        test: /\.js$/,
      },
      {
        include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'DEV_ONLY')],
        loader: 'babel-loader',
        test: /\.js$/,
      },
    ],
  },

  output: {
    filename: 'qonductor.js',
    library: 'Qonductor',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
    umdNamedDefine: true,
  },

  plugins: [new webpack.EnvironmentPlugin(['NODE_ENV'])],
};
