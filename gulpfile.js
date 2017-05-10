const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const sass = require('gulp-sass');


gulp.task('concat-js', () => {
  return gulp.src('js/*.js')
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('js/build/'));
});

gulp.task('babel-js', () => {
  return gulp.src('js/*.js')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest('js/dist/'));
});

gulp.task('sass', function () {
  return gulp.src('./style/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./style/dist'));
});

gulp.task('watch', () => {
  // gulp.watch("js/*.js", ['concat-js']);
  gulp.watch("js/*.js", ['babel-js']);
  gulp.watch('./style/*.scss', ['sass']);
});

gulp.task('default', ['watch']);
