const merge = require('webpack-merge')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const baseconfig = require('./webpack.config.js')
const path = require('path')

module.exports = merge(baseconfig, {
  entry: './src/browser/index.ts',
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist/browser'),
    filename: 'index.js',
    library: 'DBNApi-Browser',
    libraryTarget: 'umd'
  },
  externals: ['cross-fetch', 'es6-promise', nodeExternals()],
})
