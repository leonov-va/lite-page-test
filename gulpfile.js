const {
  src,
  dest,
  watch,
  series,
  parallel
} = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber');
const stylus = require('stylus');

// Style

function style() {
  return src('app/scss/style.scss')
    .pipe(plumber())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

// Watch

function watchFiles() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
    notify: false
  })

  watch('app/*.html').on('change', browserSync.reload)
  watch('app/scss/**/*.scss', style)
  watch('app/js/**/*.js').on('change', browserSync.reload)
}

// Exports

exports.style = style
exports.watch = watchFiles

exports.default = series(
  parallel(style),
  watchFiles
)