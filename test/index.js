const { Main, Request } = require('../dist/index')
const fetch = require('node-fetch')
const creds = require('./credential')
const https = require('https')
let agent
if (https.Agent) { agent = new https.Agent({ keepAlive: true }) }

/**
 * @type
 */
const dbn = new Main(creds.token, 475225954101231626, 337028800929857536)

dbn.fetchUser('290159952784392202').then(data => {
  console.log(data)
})

// const req = new Request('discordbots.xyz', {
//   'Content-Type': 'application/json',
//   'User-Agent': 'dbnapi/' + '1.0-SNAPSHOT'
// })

// function PromisedFunction() {
//   return new Promise((resolve, reject) => {
//     fetch(`https://discordbots.xyz/api/tokenValidator`, {
//       method: 'post',
//       body: JSON.stringify({ 'token': creds.token.toString() }),
//       headers: {
//         'Content-Type': 'application/json',
//         'User-Agent': 'dbnapi/' + '1.0-SNAPSHOT'
//       },
//       agent
//     }).then((res) => resolve(res.json()))
//     .catch((err) => reject(err))
//   })
// }

// async function test() {
//   const response = await req.post('tokenValidator', { 'token': creds.token.toString() })
//   console.log(response)
//   const fetched = await PromisedFunction()
//   console.log(fetched)
// }
// test()
