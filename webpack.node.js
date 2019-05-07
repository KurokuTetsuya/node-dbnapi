const merge = require('webpack-merge')
const webpack = require('webpack')
const baseconfig = require('./webpack.config.js')
const path = require('path')

module.exports = merge(baseconfig, {
  entry: './src/index.ts',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'DBNApi',
    libraryTarget: 'umd'
  }
})
