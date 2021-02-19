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
    .pipe(dest('build'))
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
    .pipe(dest('build/css'))
    .pipe(browserSync.stream())
}

function js () {
  return src('src/js/main.js')
    .pipe(dest('build/js'))
}

function libsJS () {
  return src('src/libs/**/*')
    .pipe(dest('build/libs'))
}

function images () {
  return src('src/images/*')
    .pipe(dest('build/images'))
}

function fonts () {
  return src('src/fonts/*')
    .pipe(dest('build/fonts'))
}

function clear () {
  return del('build');
}

// Watch

function watchFiles () {
  browserSync.init({
    server: {
      baseDir: 'src'
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
exports.clear = clear

task('build', series(clear, parallel(html, style, js, libsJS, images, fonts)));

exports.default = series(
  parallel(style),
  watchFiles
)