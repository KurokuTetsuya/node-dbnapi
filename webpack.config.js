'use strict'

const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const os = require('os')
const meta = require('./package.json')

const config = {
	entry: './src/index.ts',
	target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'Main',
    libraryTarget: 'umd'
  },
  externals: [ nodeExternals() ],
  plugins: [],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  optimization: {
    minimize: false
  },
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.js'
    ]
  }
}

module.exports = config
