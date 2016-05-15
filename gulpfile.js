"use strict";
var babelify       = require('babelify'),
        browserify = require('browserify'),
        buffer     = require('vinyl-buffer'),
        gulp       = require('gulp'),
        rename     = require('gulp-rename'),
        source     = require('vinyl-source-stream'),
        nodemon    = require('gulp-nodemon'),
        sass       = require('gulp-sass');


gulp.task('bundle', function () {
    browserify("src/javascripts/app.js")
      .transform(babelify, {presets: ['es2015']})
      .bundle()
      .pipe(source("src/javascripts/app.js"))
      .pipe(buffer())
      .pipe(rename("app.js"))
      .pipe(gulp.dest("public/javascripts/"));
});

gulp.task('watch', ['bundle', 'test', 'sass'], function(){
  gulp.watch('src/javascripts/**/*.js', ['bundle', 'test']);
  gulp.watch('test/*.js', ['test']);
  gulp.watch('sass/**/*.scss', ['sass']);
});

gulp.task('dev', ['watch'], function(){
  nodemon({
    script: 'bin/www',
    ext: 'js',
    env: { 'NODE_ENV': 'development' },
    verbose: false,
    ignore: []
  })
});

gulp.task('sass', function(){
  return gulp.src('sass/**/*.scss')
   .pipe(sass().on('error', sass.logError))
   .pipe(gulp.dest('public/stylesheets/'));
})

gulp.task('test', function () {
  browserify("test/appSpec.js")
    .bundle()
    .pipe(source("test/appSpec.js"))
    .pipe(buffer())
    .pipe(rename("appSpec.js"))
    .pipe(gulp.dest("public/javascripts/test/spec"))
});
