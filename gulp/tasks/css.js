var path =        require('path');
var gulp =        require('gulp');
var sass =        require('gulp-sass');
var rename =      require('gulp-rename');
var postcss   =   require('gulp-postcss');
var clip =        require('gulp-clip-empty-files');
var bemLinter =   require('postcss-bem-linter');
var atImport  =   require('postcss-import');
var cssnext   =   require('cssnext');
var del =         require('del');
var notifyError = require('../notifyError');
var paths =       require('../paths');

/**
 * Compile all Sass into CSS files, placed in a temp directory
 */
gulp.task('sass', function() {
  return gulp.src(paths.css.sassSrc)
    .pipe(sass().on('error', notifyError))
    .pipe(gulp.dest(paths.css.tmpDir));
});

/**
 * Lint all built CSS files individually
 */
gulp.task('bemlint', ['sass'], function() {
  return gulp.src(path.join(paths.css.tmpDir, '**/*.css'))
    .pipe(clip())
    .pipe(postcss([
      bemLinter(),
    ]).on('error', notifyError))
});

/**
 * Process CSS files with PostCSS and generate built file
 */
gulp.task('postcss', ['sass', 'bemlint'], function() {
  return gulp.src(path.join(paths.css.tmpDir, paths.css.mainFile))
    .pipe(postcss([
      atImport(),
      cssnext()
    ]).on('error', notifyError))
    .pipe(rename(paths.css.builtFile))
    .pipe(gulp.dest(paths.css.dest));
});

/**
 * Nuke temp CSS files
 * */
gulp.task('clean', ['sass', 'bemlint', 'postcss'], function(cb) {
  del([paths.css.tmpDir], cb);
});

gulp.task('css', ['sass', 'bemlint', 'postcss', 'clean']);
