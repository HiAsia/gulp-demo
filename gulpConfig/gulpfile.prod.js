const 
	gulp = require('gulp'),
	pug = require('gulp-pug'),
	sass = require('gulp-sass'),
	cache = require('gulp-cache'),
	uglify = require('gulp-uglify'),
	cssmin = require('gulp-cssmin'),
	babel = require('gulp-babel'),
	concat = require('gulp-concat'),
	imagemin  = require('gulp-imagemin'),
    pngquant = require('gulp-pngquant');

let paths = {
	pug: {
	    src: 'src/pug/**/*.pug',
	    dest: 'dist/html/'
	},
	sass: {
	    src: 'src/sass/**/*.scss',
	    dest: 'dist/css/'
	},
	js: {
	    // src: 'src/js/**/*.js',
	    src: ['src/js/b.js', 'src/js/index.js', 'src/js/a.js'],
	    dest: 'dist/js/'
	},
	images: {
	    src: 'src/images/**/*',
	    dest: 'dist/images'
	}
}

function prod() {
	gulp.task('pug:prod', () => {
		return gulp.src(paths.pug.src)
		    .pipe(pug())
		    .pipe(gulp.dest(paths.pug.dest))
	})

	gulp.task('sass:prod', () => {
	  return gulp.src(paths.sass.src)
	    .pipe(sass().on('error', sass.logError))
	    .pipe(concat('bundle.css'))
	    .pipe(cssmin())
	    .pipe(gulp.dest(paths.sass.dest))
	})

	gulp.task('js:prod', () => {
	  return gulp.src(paths.js.src)
	    .pipe(babel({
	      presets: ['es2015'],
	    }))
	    .pipe(concat('bundle.js'))
	    .pipe(uglify())
	    .pipe(gulp.dest(paths.js.dest))
	})

	gulp.task('img:prod', () => {
	  return gulp.src(paths.images.src)
	    .pipe(cache(imagemin({
	      progressive: true,
	      svgoPlugins: [{removeViewBox: false}],
	      use: [pngquant()]
	    })))
	    .pipe(gulp.dest(paths.images.dest))
	})

	gulp.task("prod", ['pug:prod', 'sass:prod', 'js:prod', 'img:prod'])
}

module.exports = prod;