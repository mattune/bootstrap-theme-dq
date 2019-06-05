const gulp = require('gulp');
const plumber = require('gulp-plumber');
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');


/**************************************************
 * path
 *************************************************/
const paths = {
  'scss': 'develop/**/*.scss',
  'exScss': '!develop/**/_*.scss',
  'css': 'release/'
};



/**************************************************
 * tasks
 *************************************************/
// sass
gulp.task('sass-compile', () => {
  return gulp.src([paths.scss, paths.exScss])
    .pipe(plumber({
      errorHandler: function (err) {
        console.log(err.message);
        this.emit('end');
      }
    }))
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(postcss([
      autoprefixer({ grid: true })
    ]))
    .pipe(gulp.dest(paths.css));
});


// watch
gulp.task('watch', () => {
  gulp.watch(paths.scss, gulp.task('sass-compile'));
});


// default
gulp.task('default', gulp.series('watch'));