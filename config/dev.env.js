'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  API_ROOT: '127.0.0.1',
  NODE_ENV: '"development"'
})
