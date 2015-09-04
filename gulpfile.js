var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
	gulp.src('./static/css/scss/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./static/css'))
});

gulp.task('sass:watch', function() {
	gulp.watch('./static/css/scss/*.scss', ['sass'])
});

gulp.task('default', ['sass', 'sass:watch'], function() {});