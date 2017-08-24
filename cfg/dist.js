'use strict';

let path = require('path');
let webpack = require('webpack');

let baseConfig = require('./base');
let defaultSettings = require('./defaults');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');

let config = Object.assign({}, baseConfig, {
  entry: path.join(__dirname, '../src/index'),
  cache: false,
  devtool: 'sourcemap',
  plugins: [
    new webpack.optimize.DedupePlugin(),//用来检查相似的文件，或者文件中重复的内容，然后将这些冗余再输出时消除
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    }),
    new webpack.optimize.UglifyJsPlugin(), //压缩输出js代码
    new webpack.optimize.OccurenceOrderPlugin(), //按照引用频度来排序各个模块，bundle的id，引用越频繁，其id值就越短，以便达到减小代码的效果
    new webpack.optimize.AggressiveMergingPlugin(), //用来优化生成的代码段，合并代码track，汲取公共部分
    new webpack.NoErrorsPlugin() //保证编译过程不能出错
  ],
  module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel',
  include: [].concat(
    config.additionalPaths,
    [ path.join(__dirname, '/../src') ]
  )
});

module.exports = config;
