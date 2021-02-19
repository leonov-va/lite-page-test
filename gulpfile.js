const {
  src,
  dest,
  watch,
  series,
  parallel,
  task
} = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber');
const del = require('del');

function html () {
  return src('src/**/*.html')
    .pipe(dest('docs'))
}


// Style

function style () {
  return src('src/scss/style.scss')
    .pipe(plumber())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(dest('docs/css'))
    .pipe(browserSync.stream())
}

function js () {
  return src('src/js/main.js')
    .pipe(dest('docs/js'))
}

function libsJS () {
  return src('src/libs/**/*')
    .pipe(dest('docs/libs'))
}

function images () {
  return src('src/images/*')
    .pipe(dest('docs/images'))
}

function fonts () {
  return src('src/fonts/*')
    .pipe(dest('docs/fonts'))
}

function clear () {
  return del('docs');
}

// Watch

function watchFiles () {
  browserSync.init({
    server: {
      baseDir: 'src'
    },
    notify: false
  })

  watch('src/*.html').on('change', browserSync.reload)
  watch('src/scss/**/*.scss', style)
  watch('src/js/**/*.js').on('change', browserSync.reload)
}

// Exports

exports.style = style
exports.watch = watchFiles
exports.clear = clear

task('build', series(clear, parallel(html, style, js, libsJS, images, fonts)));

exports.default = series(
  parallel(style),
  watchFiles
)