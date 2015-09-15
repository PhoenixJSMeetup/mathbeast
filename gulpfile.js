var gulp = require('gulp')
var less = require('gulp-less');
var path = require('path');
var browserSync = require('browser-sync');
 
gulp.task('less', function () {
  return gulp.src('./less/style.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());;
});


gulp.task('serve', ['less'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("less/**/*.less", ['less']);
    gulp.watch(["index.html", "./templates/**/*.html"]).on('change', browserSync.reload);
});
