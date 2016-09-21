var gulp = require('gulp'),
    sass = require('gulp-sass'),
    inky = require('inky'),
    inlineCss = require('gulp-inline-css');
var browserSync = require('browser-sync').create();

//STYLES
gulp.task('styles', function () {
  return gulp.src('./scss/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist'))
    .on('end', browserSync.reload);
});

//CONVERTE INKY
gulp.task('inky', function() {
  return gulp.src('./templates/**/*.html')
    .pipe(inky())
    .pipe(gulp.dest('./dist'))
    .on('end', browserSync.reload);
});

//INLINE CSS
gulp.task('build', function () {
  return gulp.src('./dist/*.html')
        .pipe(inlineCss())
        .pipe(gulp.dest('./dist/inlined'));
});

//LiveReload
gulp.task('serve', function () {
    browserSync.init({
        notify: false,
        reloadDelay: 500,
        server: {
            baseDir: "./dist/",
        }
    });
    
});

//WATCH
gulp.task('see',function(){
        gulp.watch('./scss/**/*.scss',['styles']);
        gulp.watch('./templates/**/*.html',['inky']);
})
gulp.task('default',['see','serve'] );