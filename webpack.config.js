'use strict'

const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const DtsBundlerPlugin = require('dtsbundler-webpack-plugin')

const config = {
	entry: './src/index.ts',
	target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  externals: [ nodeExternals() ],
  plugins: [
    new DtsBundlerPlugin({
      out: './declaration/index.d.ts'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }
    ]
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
