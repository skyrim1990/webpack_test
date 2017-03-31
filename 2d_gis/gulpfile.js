var gulp = require('gulp');
var server = require('gulp-server-livereload');

var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');

var browserSync = require("browser-sync").create();

var sass = require('gulp-ruby-sass');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');

var sourcemaps = require("gulp-sourcemaps");
var babel = require('gulp-babel');
var concat = require("gulp-concat");

var sd = require('silly-datetime');

function log(){
	var fs = require("fs");
	
	var current_date = sd.format(new Date(), 'YYYY-MM-DD HH:mm');
	var message = "console.log(\"" + " last log at: " +  current_date + "\")";

	fs.writeFile('app/mark.js', message, 
															{encoding: 'utf-8', mode: 0666, flag: 'w'},
															function(){}
															);

}

gulp.task('default', function(){

});

gulp.task('log', function(){
	log();
});

var compile_js = function(loc){

	gulp.src("app/dev/es6/**/*.js")
		.pipe(sourcemaps.init())
		.pipe( 
			babel({presets: ['es2015']})
		)
		.pipe(concat("all.js")) .pipe(sourcemaps.write(".")) .pipe(gulp.dest(loc))

	console.log("finish compile js");
}

var compress_js = function(loc){
	gulp.src("app/dev/compiled_js/*.js")
		.pipe(uglify())
		.pipe(gulp.dest(loc))
}

var compile_sass = function(){
	return sass('app/dev/scss/**/*.scss')
					.on('error',sass.logError)
					.pipe(cleanCSS())
					.pipe(gulp.dest("app/dist/css/"))
}

var compress_html = function(){
	return gulp.src('app/dev/*.html')
							.pipe(htmlmin({collapseWhitespace: true}))
							.pipe(gulp.dest('app/dist'))
}

var base = function(){
	compile_sass();
	compress_html();
	
	gulp.watch('app/dev/scss/**/*.scss').on('change', function(){
		console.log("reconpile scss");
		compile_sass();
	});

	gulp.watch('app/dev/*.html').on('change', function(){
		compress_html();
	});

}

gulp.task('test', function(){
	log();
	base();
	compile_js("app/dev/compiled_js/");
	gulp.src('app').pipe(server({
		defaultFile: '/dev/index.html',
		port: 4000 
	}));

	gulp.watch('app/dev/es6/**/*.js').on('change', function(){
		compile_js("app/dev/compiled_js/");
	});

});

gulp.task('serve', function(){
	base();
	compress_js("app/dist/js");
	gulp.src('app').pipe(server({
		defaultFile: '/dist/index.html',
		port: 4000 
	}));
});

