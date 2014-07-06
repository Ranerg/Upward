var gulp = require('gulp'),
    gulputil = require('gulp-util'),
    plumber = require('gulp-plumber'),
    changed = require('gulp-changed'),
    autoprefixer = require('gulp-autoprefixer'),
    csscomb = require('gulp-csscomb'),
    minifycss = require('gulp-minify-css'),
    watch = require('gulp-watch'),
    less = require('gulp-less'),
    coffee = require('gulp-coffee'),
    uglify = require('gulp-uglify'),
    haml = require('gulp-haml'),
    htmlprettify = require('gulp-html-prettify'),
    livereload = require('gulp-livereload'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    lr = require('tiny-lr');
server = lr();

paths = {
    less: 'less/*.less',
    coffee: 'coffee/*.coffee',
    haml: 'haml/*.haml',
};

var onError = function(error) {
    gulputil.beep();
    gulputil.log(error);
};

gulp.task('less', function() {
    return gulp.src('less/*.less')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(changed('./public/', {
            extension: '.css'
        }))
        .pipe(less())
        .pipe(autoprefixer(["last 40 version", "ie 11", "ie 10", "ie 9", "ie 8", "ie 7"], {
            cascade: true
        }))
        .pipe(csscomb())
        .pipe(gulp.dest('./public/'))
        .pipe(minifycss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./public/min'))
        .pipe(livereload(server));
});

gulp.task('coffee', function() {
    return gulp.src('coffee/*.coffee')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(changed('./public/', {
            extension: '.js'
        }))
        .pipe(coffee())
        .pipe(gulp.dest('./public/'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./public/min'))
        .pipe(livereload(server));
});

gulp.task('haml', function() {
    return gulp.src('haml/*.haml')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(changed('./public/', {
            extension: '.html'
        }))
        .pipe(haml())
        .pipe(htmlprettify())
        .pipe(gulp.dest('./public/'))
        .pipe(replace(/href="((.(?!.min))*).css"/gm, 'href="$1.min.css"'))
        .pipe(replace(/src="((.(?!.min))*).js"/gm, 'src="$1.min.js"'))
        .pipe(gulp.dest('./public/min'))
        .pipe(livereload(server));
});

gulp.task('watch', function() {
    server.listen();

    gulp.watch(paths.less, ['less']);
    gulp.watch(paths.coffee, ['coffee']);
    gulp.watch(paths.haml, ['haml']);
});

gulp.task('default', ['watch']);