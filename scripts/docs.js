const fs = require('fs')
const jsdoc = require('jsdoc-to-markdown')
const rm = require('rimraf')
const gangsing = require('ora')
const { default: chalk } = require('chalk')
const spinner = gangsing('Building documentation...')
spinner.start()

const docsOptions = {
  files: '../src/**/*.ts',
  'example-lang': 'ts',
  noCache: true
}

rm('../docs', (err) => {
  if (err) {
    console.log(chalk.red(
      '  Docs Generation failed with errors.\n' +
      '  Err stack: ' + err
    ))
    process.exit(1)
  }
  fs.mkdirSync('../docs')
  jsdoc.render(docsOptions).then(data => {
    spinner.stop()
    fs.writeFileSync('../docs/README.md', data)

    console.log(chalk.cyan('  Docs Generation complete.\n'))
    console.log(chalk.yellow(
      '  Tip: Module files are served in one README.js file\n' +
      '  Push to git or use Live Display to check the result'
    ))
  })
})