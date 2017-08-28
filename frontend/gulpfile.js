const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
var copy = require('gulp-contrib-copy');

gulp.task('imagemin', () =>
    gulp.src('images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/images'))
);

gulp.task('copy', () => 
    gulp.src('style/*.css')
        .pipe(copy())
        .pipe(gulp.dest('build/style'))
);

gulp.task('build', ['copy', 'imagemin']);