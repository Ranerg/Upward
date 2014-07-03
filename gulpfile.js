var gulp = require('gulp'),
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
    lr = require('tiny-lr');
	server = lr();

paths = {
    less: 'less/*.less',
    coffee: 'coffee/*.coffee',
    haml: 'haml/*.haml',
};

gulp.task('less', function() {
    return gulp.src('less/*.less')
        .pipe(changed('./public/', {
            extension: '.css'
        }))
        .pipe(less())
        .pipe(autoprefixer(["last 40 version", "ie 10", "ie 9", "ie 8", "ie 7"], { cascade: true }))
        .pipe(csscomb())
        .pipe(gulp.dest('./public/'))
        .pipe(minifycss())
        .pipe(gulp.dest('./public/min'))
        .pipe(livereload(server));
});

gulp.task('coffee', function() {
    return gulp.src('coffee/*.coffee')
        .pipe(changed('./public/', {extension: '.js'}))
        .pipe(coffee())
        .pipe(gulp.dest('./public/'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/min'))
        .pipe(livereload(server));
});

gulp.task('haml', function() {
    return gulp.src('haml/*.haml')
        .pipe(changed('./public/', {
            extension: '.html'
        }))
        .pipe(haml())
        .pipe(gulp.dest('./public/min'))
        .pipe(htmlprettify())
        .pipe(gulp.dest('./public/'))
        .pipe(livereload(server));
});

gulp.task('watch', function() {
    server.listen();

    gulp.watch(paths.less, ['less']);
    gulp.watch(paths.coffee, ['coffee']);
    gulp.watch(paths.haml, ['haml']);
});

gulp.task('default', ['watch']);