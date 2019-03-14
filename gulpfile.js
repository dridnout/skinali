var gulp           = require('gulp'),
		// gutil          = require('gulp-util' ),
		sass           = require('gulp-sass'),
		// concat         = require('gulp-concat'),
		// uglify         = require('gulp-uglify'),
		// cleanCSS       = require('gulp-clean-css'),
		rename         = require('gulp-rename'),
		del            = require('del'),
		imagemin       = require('gulp-imagemin'),
		cache          = require('gulp-cache'),
		autoprefixer   = require('gulp-autoprefixer'),
		// ftp            = require('vinyl-ftp'),
		rigger         = require('gulp-rigger'),
		notify         = require("gulp-notify");
		connect        = require("gulp-connect");

// Static server

gulp.task('connect', function(){
	connect.server({
		root: 'app',
		livereload: true
	});
});

/* Указываем путь к скриптам дополнительных библиотек из папки libs */

gulp.task('js', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js'
		])
	.pipe(gulp.dest('app/js'))
	.pipe(connect.reload());
});

/* Указываем путь к стилям дополнительных библиотек из папки libs */

gulp.task('css', function() {
	return gulp.src([
		'app/libs/normalize/normalize.css',
		])
	.pipe(gulp.dest('app/css'))
	.pipe(connect.reload());
});


gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(gulp.dest('app/css'))
	.pipe(connect.reload());
});

gulp.task('html', function() {
	return gulp.src('app/view/*.html')
	.pipe(rigger())
	.pipe(gulp.dest('app/'))
	.pipe(connect.reload());
});



gulp.task('watch', ['sass', 'js', 'html', 'css'], function() {
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch(['app/js/*.js'], ['js']);
	gulp.watch(['app/**/*.html'], ['html']);
	gulp.watch(['app/css/*.css'], ['css']);
});

gulp.task('imagemin', function() {
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin()))
	.pipe(gulp.dest('dist/img'));
});

gulp.task('build', ['removedist', 'imagemin', 'html', 'sass', 'js', 'css'], function() {

	var buildFiles = gulp.src([
		'app/*.html',
		'app/.htaccess',
		])
		.pipe(gulp.dest('dist'));

	var buildCss = gulp.src([
		'app/css/*',
		]).pipe(gulp.dest('dist/css'));

	var buildJs = gulp.src([
		'app/js/*.js',
		]).pipe(gulp.dest('dist/js'));

	var buildFonts = gulp.src([
		'app/fonts/**/*',
		]).pipe(gulp.dest('dist/fonts'));

	var buildPGS = gulp.src([
		'app/libs/pgs-panel/**/*'
		]).pipe(gulp.dest('dist/libs/pgs-panel/'));

});

/*gulp.task('deploy', function() {

	var conn = ftp.create({
		host:      '188.120.237.166',
		user:      'admin',
		password:  'MU82ejBENXU=',
		parallel:  10,
		log: gutil.log
	});

	var globs = [
	'dist/**',
	'dist/.htaccess',
	];
	return gulp.src(globs, {buffer: false})
	.pipe(conn.dest('/www/fea.givesale.ru'));

});*/

gulp.task('removedist', function() { return del.sync('dist'); });
gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', ['connect', 'watch']);
