'use strict';

// * Paths To Folders - variables
const paths = {
  app: './app',
  dist: './dist',
}

// * Gulp Requires - variables
const
  gulp = require('gulp'),
  sass = require('gulp-sass'),
  pug = require('gulp-pug'),
  prefixer = require('gulp-autoprefixer'),
  prettyHTML = require('gulp-pretty-html'),
  rename = require('gulp-rename'),
  minifierCSS = require('gulp-clean-css'),
  minifierJS = require('gulp-uglify'),
  babel = require('gulp-babel'),
  plumber = require('gulp-plumber'),
  imagemin = require('gulp-imagemin'),
  browserSync = require('browser-sync');

// * Pug Compile - task
gulp.task('hypertexts', () => {
  return gulp.src(`${paths.app}/pages/**/*.pug`)
    .pipe(plumber())
    .pipe(pug( {pretty: true} ))
    .pipe(prettyHTML( {indent_size: 2, indent_char: ' '} ))
    .pipe(gulp.dest(`${paths.dist}`))
    .pipe(browserSync.reload( {stream: true} ))
})

// * Sass Compile - task
gulp.task('styles', () => {
  return gulp.src(`${paths.app}/sass/**/*+(scss|sass)`)
    .pipe(browserSync.reload( {stream: true} ))
    .pipe(sass( {outputStyle: "expanded"} ))
    .pipe(prefixer( {grid: true} ))
    // ! First File (__name.css) Expanded
    .pipe(rename( {suffix: '', extname: '.css'} ))
    .pipe(gulp.dest(`${paths.dist}/css`))
    // ! Second File (__name.min.css) Minifier
    .pipe(minifierCSS())
    .pipe(rename( {suffix: '.min', extname: '.css'} ))
    .pipe(gulp.dest(`${paths.dist}/css`))
})

// * Javascript Minifify - task
gulp.task('scripts', () => {
  return gulp.src(`${paths.app}/js/**/*.js`)
    .pipe(browserSync.reload( {stream: true} ))
    .pipe(babel( {presets: ['env']} ))
    // ! First File (__name.js) Expanded
    .pipe(rename( {basename: 'script', suffix: '', extname: '.js'} ))
    .pipe(gulp.dest(`${paths.dist}/js`))
    // ! Second File (__name.min.js) Minifier
    .pipe(minifierJS())
    .pipe(rename( {basename: 'script', suffix: '.min', extname: '.js'} ))
    .pipe(gulp.dest(`${paths.dist}/js`))
})

// * Image Compress - task
gulp.task('imgs', () => {
  return gulp.src(`${paths.app}/img/**/*`)
    .pipe(imagemin( {progressive: true} ))
    .pipe(gulp.dest(`${paths.dist}/img`))
})

// * All Watches
gulp.task('watch', () => {
  // * Browser Sync - server
  browserSync.init({
    server: {baseDir: paths.dist},
    notify: false,
  })
  // * Image compress
  gulp.watch(`${paths.app}/img/**/*`, gulp.series('imgs'))
  // * Pug - Watch Files
  gulp.watch(`${paths.app}/pages/**/*.pug`, gulp.series('hypertexts'))
  // * Sass - Watch Files
  gulp.watch(`${paths.app}/sass/**/*+(scss|sass)`, gulp.series('styles'))
  // * JavaScript - Watch Files
  gulp.watch(`${paths.app}/js/**/*.js`, gulp.series('scripts'))
})

// * Default Task - task
gulp.task('default', gulp.series(gulp.parallel('hypertexts', 'styles', 'scripts'), 'watch'))