'use strict';

var webpack           = require('webpack');
var reworkVars        = require('rework-vars');
var reworkImport      = require('rework-import');
var reworkColor       = require('rework-color-function');
var reworkCustomMedia = require('rework-custom-media');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './scripts/index'
  ],
  output: {
    path: __dirname + '/scripts/',
    filename: 'bundle.js',
    publicPath: '/scripts/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  },
  module: {
    loaders: [
      { test: /\.jsx$/, loaders: ['react-hot', 'jsx?harmony'], exclude: /node_modules/ },
      { test: /\.css$/, loaders: [
        'style-loader',
        'css-loader',
        'autoprefixer-loader',
        'rework-loader',
      ], exclude: /node_modules/ },
    ]
  },
  rework: {
    use: [
      reworkImport({path: ['./scripts/']}),
      reworkVars(),
      reworkColor,
      reworkCustomMedia(),
    ],
  },
};
