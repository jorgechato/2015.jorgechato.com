var gulp = require('gulp'),
gutil = require('gulp-util'),
concat = require('gulp-concat'),
rename = require("gulp-rename"),
stylus = require('gulp-stylus'),
uglify = require('gulp-uglify'),
Filter = require('gulp-filter'),
nib = require('nib'),
cssmin = require('gulp-cssmin'),
nodemon = require('gulp-nodemon');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('css-min',function(){
  var filter = Filter('**/*.styl');

  return gulp.src([
'./src/style/import.styl',
'./src/style/**/*.css'
  ])
  .pipe(filter)
  .pipe(sourcemaps.init())
  .pipe(stylus({
use:nib(),
sourcemap: {inline: true},
compress: true
  }))
  .pipe(filter.restore())
  .pipe(cssmin())
  .pipe(concat('base.css'))
  .pipe(rename({
suffix: '.min'
  }))
  .pipe(gulp.dest('./dist/style'));
});

gulp.task('unifyjs',function(){
  return gulp.src('./src/scripts/**/*.js')
  .pipe(concat('app.js'))
  .pipe(uglify({mangle: false}))
  .pipe(rename({
suffix: '.min'
  }))
  .pipe(gulp.dest('./dist/scripts'));
});

gulp.task('vendor',function(){
  return gulp.src([
'./src/vendor/scripts/jquery-1.11.3.min.js',
'./src/vendor/scripts/angular.min.js',
'./src/vendor/scripts/angular-route.min.js',
'./src/vendor/scripts/angular-ui-router.min.js',
'./src/vendor/scripts/angular-sanitize.min.js',
'./src/vendor/scripts/angular-animate.min.js'
  ])
  .pipe(concat('vendor.js'))
  .pipe(uglify({mangle: false}))
  .pipe(rename({
suffix: '.min'
  }))
  .pipe(gulp.dest('./dist/scripts'));
});

gulp.task('copy-html', function(){
  return gulp.src('./src/views/**/*.html')
  .pipe(gulp.dest('./dist/views'));
});

gulp.task('start',function () {
  nodemon({
script: 'index.js',
env: {
  'NODE_ENV': 'development'
}
  })
  .on('restart', function () {
console.log('restarted!');
  });
});

gulp.task('compile',['copy-html','css-min','unifyjs']);

gulp.task('serve',['copy-html','css-min','unifyjs','start'],function(){
  gulp.watch('./src/views/**/*.html', ['copy-html']);
  gulp.watch([
'./src/style/**/*.styl',
'./src/style/**/*.css'
  ],['css-min']);
  gulp.watch('./src/scripts/**/*.js', ['unifyjs']);
});
