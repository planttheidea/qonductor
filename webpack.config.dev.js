'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const defaultConfig = require('./webpack.config');

const PORT = 3000;

module.exports = Object.assign({}, defaultConfig, {
  devServer: {
    contentBase: './dist',
    host: 'localhost',
    inline: true,
    lazy: false,
    noInfo: false,
    port: PORT,
    quiet: false,
    stats: {
      colors: true,
      progress: true,
    },
  },

  entry: [path.resolve(__dirname, 'DEV_ONLY', 'App.js')],

  externals: undefined,

  module: Object.assign({}, defaultConfig.module, {
    rules: defaultConfig.module.rules.map((rule) =>
      rule.loader === 'eslint-loader'
        ? Object.assign({}, rule, {
          options: Object.assign({}, rule.options, {
            emitError: undefined,
            failOnWarning: false,
          }),
        })
        : rule
    ),
  }),

  plugins: [...defaultConfig.plugins, new HtmlWebpackPlugin()],
});
