var gulp        = require('gulp');
var concatCss   = require('gulp-concat-css');
var minifyCss   = require('gulp-minify-css');
var rename      = require('gulp-rename');
var less    	= require('gulp-less');
var notify      = require('gulp-notify');
var livereload  = require('gulp-livereload');
var connect     = require('gulp-connect');
var wiredep     = require('wiredep').stream;
var open    = require('open');

// Default task
gulp.task('default', ['connect', 'html', 'js', 'less', 'bower', 'serve', 'watch']);

gulp.task('watch', function () {
    gulp.watch('./src/index.html',  ['html']);
    gulp.watch('./src/**/*.js',     ['js']);
    gulp.watch('./src/**/*.less',   ['less']);
});

// Connect
gulp.task('connect', function() {
    connect.server({
        port: 9001,
        root: './public',
        livereload: true
    });
});
 
// Open
gulp.task('serve', function() {
    open("http://localhost:9001");
});

// Less
gulp.task('less', function () {
	gulp.src('./src/assets/less/*.less')
		.pipe(less())
		.pipe(concatCss('build.css'))
        .pipe(minifyCss())
		.pipe(rename('bundle.min.css'))
		.pipe(gulp.dest('./public/assets/css/'))
		.pipe(connect.reload())	
		;
});

// JS
gulp.task('js', function() {
    gulp.src('./src/**/*.js')
        .pipe(gulp.dest('./public'))
        .pipe(connect.reload()) 
        ;
});

// Html
gulp.task('html', function() {
    gulp.src('./src/index.html')
        .pipe(gulp.dest('./public'))
        .pipe(connect.reload()) 
        ;
});

// Bower
gulp.task('bower', function () {
    gulp.src('./public/index.html')
        .pipe(wiredep({
            directory: './public/components'
        }))
        .pipe(gulp.dest('./public'))
        ;
});
