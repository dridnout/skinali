/* Подключение плагинов */
const gulp = require('gulp');
const browserSync = require('browser-sync');
const gulpSass = require('gulp-sass');
const rename = require('gulp-rename');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const rigger = require('gulp-rigger');

const server = browserSync.create();

/* Инициализация сервера */
function serverSync(done){
	server.init({
		server:{
			baseDir: 'src/'
		}
	});
	done();
};

/* Перезагрузка сервера */
function reload(done){
	server.reload();
	done();
}

/* Удаление папки dist */
function removeDist(){
	return del.sync('dist/');
}

/* Sass */
function sass(){
	return gulp.src('src/sass/*.sass')
	.pipe(gulpSass())
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(gulp.dest('src/css/'))
	.pipe(server.stream());
}

/* Следим за изменениями */
function watch(){
	gulp.watch('src/*.html', gulp.series(reload));
	gulp.watch('src/sass/**/*.sass', sass);
	gulp.watch('src/js/**/*.js', gulp.series(reload));
}

/* Сборка проекта */
gulp.task('build', function(cb) {
	gulp.series(removeDist);

	var buildFiles = gulp.src([
		'src/*.html',
		])
		.pipe(rigger())
		.pipe(gulp.dest('dist'));

	var buildCss = gulp.src([
		'src/css/*',
		])
		.pipe(cssmin())
		.pipe(gulp.dest('dist/css'));

	var buildJs = gulp.src([
		'src/js/*.js',
		]).pipe(gulp.dest('dist/js'));

	var buildImg = gulp.src([
		'src/img/**/*',
		]).pipe(gulp.dest('dist/img'));
	cb();
});

/* Запуск gulp */
gulp.task('default', function(cb){
	gulp.series(serverSync, reload, watch)(cb);
});
