'use strict'

const gulp = require('gulp')
const gulpTS = require('gulp-typescript')
const gulpTSLint = require('gulp-tslint').default
const jsdoc = require('jsdoc-to-markdown')
const tsLint = require('tslint')
const webpack = require('webpack')
const gangsing = require('ora')
const { default: chalk } = require('chalk')
const webpackConfig = require('./webpack.config.js')
const path = require('path')
const rm = require('rimraf')

const project = gulpTS.createProject('tsconfig.json')
const typeCheck = tsLint.Linter.createProgram('tsconfig.json')

const docsOptions = {
  files: './src/**/*.ts',
  'example-lang': 'ts',
  noCache: true
}

gulp.task('tslint', () => {
  return gulp.src('./src/**/*.ts')
    .pipe(gulpTSLint({
      configuration: 'tslint.json',
      formatter: 'verbose',
      program: typeCheck
    }))
    .pipe(gulpTSLint.report())
})

gulp.task('docs', gulp.series(gulp.parallel('tslint'), (done) => {
  rm('./docs', (err) => {
    if (err) throw err
    fs.mkdirSync('./docs')
    jsdoc.render(docsOptions).then(data => {
      fs.writeFileSync('./docs/README.md', data)
      return done()
    })
  })
}))

gulp.task('webpack', gulp.series(gulp.parallel('tslint'), (done) => {
  const spinner = gangsing('building for production...')
  spinner.start()
  rm(webpackConfig.output.path, (err) => {
    if (err) done(err)
    webpack(webpackConfig, (webpackErr, stats) => {
      spinner.stop()
      if (webpackErr) done(webpackErr)
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: true,
        chunks: false,
        chunkModules: false
      }) + '\n\n')

      if (stats.hasErrors()) {
        console.log(chalk.red('  Build failed with errors.\n'))
        process.exit(1)
      }

      console.log(chalk.cyan('  Build complete.\n'))
      console.log(chalk.yellow(
        '  Tip: Module files are served in one index.js file\n' +
        '  Point the main at dist/index.js to access the module'
      ))
    })
  })
}))
