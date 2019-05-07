const webpacknode = require('./webpack.node.js')
const webpackbrowser = require('./webpack.browser.js')
const webpackbrowsermin = require('./webpack.browsermin.js')
const merge = require('webpack-merge')

module.exports = [ webpacknode, webpackbrowser, webpackbrowsermin ]
