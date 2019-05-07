const { Client, Request } = require('../dist/index')
const creds = require('./credential')

/**
 * @type {Typings}
 */
const dbn = new Client(creds.token, '475225954101231626', '337028800929857536')

dbn.fetchUser('290159952784392202').then(data => {
  console.log(data)
})
