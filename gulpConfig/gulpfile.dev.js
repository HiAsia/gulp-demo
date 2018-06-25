'use strict';

const gulp = require('gulp'),
      sass = require('gulp-sass'),
      pug = require('gulp-pug'),
      babel = require('gulp-babel'),
      browserSync = require("browser-sync"),
      plumber = require('gulp-plumber'),
      notify = require('gulp-notify');


const paths = {
  pug: {
    src: 'src/pug/**/*.pug',
    dest: 'dev/html/',
    watch: 'src/pug/**/*.pug'
  },
  sass: {
    src: 'src/sass/**/*.scss',
    dest: 'dev/css/',
    watch: 'src/sass/**/*.scss'
  },
  js: {
    src: 'src/js/**/*.js',
    dest: 'dev/js/',
    watch: 'src/js/**/*.js'
  },
  images: {
    src: 'src/images/**/*',
    dest: 'dev/images',
    watch: 'src/images/**/*'
  }
}

const dev = () => {


gulp.task('browserSync', () => {
    return browserSync.init({
      server: {
        baseDir: './'
      },
      files: './dev/**/*'
    })
})

gulp.task('pug', () => {
  return gulp.src(paths.pug.src)
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(paths.pug.dest))
})

gulp.task('sass', () => {
  return gulp.src(paths.sass.src)
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.sass.dest))
})

gulp.task('js', () => {
  return gulp.src(paths.js.src)
    .pipe(babel())
    .pipe(gulp.dest(paths.js.dest))
})

gulp.task('img', () => {
  return gulp.src(paths.iamges.src)
    .pipe(gulp.dest(paths.iamges.dest))
})

gulp.task('watch', () => {
  gulp.watch(paths.pug.watch, ['pug'])
  gulp.watch(paths.sass.watch, ['sass'])
  gulp.watch(paths.js.watch, ['js'])
  gulp.watch(paths.images.watch, ['img'])
})

gulp.task('dev', ['watch', 'browserSync', 'pug', 'sass', 'js'])

}

module.exports = dev;
