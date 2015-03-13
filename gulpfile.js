var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserify = require('gulp-browserify');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

var rev = require('gulp-rev');
var replace = require('gulp-rev-manifest-replace');

/* Development Tasks */

gulp.task('compile:css', function() {
  return gulp.src('./src/scss/*.scss')
    .pipe(sass()) 
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      remove: false
    }))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('compile:js', function() {
  return gulp.src('./src/js/*.js')
    .pipe(browserify({
      debug: true,
      insertGlobals: true
    }))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/js'));
});

// TODO: Build Tasks

gulp.task('watch', function() {
  gulp.watch('src/js/*.js', ['compile:js']);
  gulp.watch('src/scss/*.scss', ['compile:css']);
});

gulp.task('default', ['compile:js', 'compile:css', 'watch']);
gulp.task('build', ['compile:js', 'compile:css']);
