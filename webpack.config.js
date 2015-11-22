'use strict';

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

// define paths
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var entryPath = path.resolve(__dirname, 'client', 'app');
var templatePath = path.resolve(__dirname, 'client', 'index.tpl.html');
var distPath = path.resolve(__dirname, 'dist');
var bower_modules_dir = path.resolve(__dirname, 'bower_components');

// console.log(require(__dirname + '/webpack.clientdeps'));

module.exports = {
  // devtool: 'eval',
  // devtool: "#inline-source-map",
  devtool: 'source-map',
  entry: {
    // define webpack hot server to push changes automatically
    hotserver: 'webpack-hot-middleware/client?reload=true',

    // application entry path
    mainApp: entryPath + '/main.js',

    vendor: require(__dirname + '/webpack.clientdeps')
    // vendor: [ 'angular',
    //           'angular-resource',
    //           'angular-ui-bootstrap',
    //           'angular-ui-router',
    //           'lodash',
    //           'lr-infinite-scroll',
    //           'promise' 
    //           ]

  },

  // output generated bundled files
  output: {
    path: distPath,
    filename: '[name]/[name]-[hash].js',
    publicPath: '/'
  },

  plugins: [
    // automatically inject dependencies for minification
    new ngAnnotatePlugin({add: true}),

    // output vendor common chunck
    // new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor/vendor.js'),

    new webpack.optimize.OccurenceOrderPlugin(),

    // load index.html template and inject CSS and JS files
    new HtmlWebpackPlugin({
      template: templatePath,
      inject: 'body',
      filename: 'index.html',
      chunks: ['vendor', 'hotserver', 'mainApp']
    }),

    // define second entry path
    /*new HtmlWebpackPlugin({
      template: templatePath,
      inject: 'body',
      filename: 'section2/index.html',
      chunks: ['vendor','hotserver','section2']
    }),*/

    // new webpack.ProvidePlugin({
    //   $: "jquery",
    //   jQuery: "jquery"
    // }),

    // webpack server for development
    new webpack.HotModuleReplacementPlugin(),

    // skip the emitting phase
    new webpack.NoErrorsPlugin()

  ],

  module: {
    preLoaders: [
      // lint js files
      // {test: /\.js$/, exclude: /node_modules/, loader: "jshint-loader"}
    ],
    loaders: [
      // transpile ES6 -> ES5
      // {test: /\.js?$/, exclude: /node_modules/, loader: 'babel'},
      // {test: /\.js?$/, exclude: /bower_components/, loader: 'babel'},

      // loader for JSON files
      {test: /\.json?$/, loader: 'json'},

      // loader for CSS files
      {test: /\.css$/, loader: 'style!css'},

      // {
      //     test: /\.css$/,
      //     loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      // },

      // {test: /\.html$/, loader: "ng-cache?prefix=[dir]/[dir]" }

      // loader for HTML files
      // {test: /\.html$/, loader: 'html-loader'},

      // loader for images. Inline base64 URLs for images less than 8k, but use direct URLs for the rest
      {test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/, loader: 'url-loader?limit=8192&name=img/img-[hash:6].[ext]'}

    ]
  }
};
