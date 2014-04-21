/*jslint nomen: true, vars: true*/
(function () {
    'use strict';
    var gulp = require('gulp');
    var spawn = require('child_process').spawn;
    var less = require('gulp-less');
    var clean = require('gulp-clean');
    var preprocess = require('gulp-preprocess');
    var connect = require('connect');
    var livereload = require('gulp-livereload');

    gulp.task('clean', function () {
        gulp.src(['public', 'src/libs'])
            .pipe(clean());
    });

    gulp.task('bower', function (next) {
        var bower = spawn('bower', ['install'], {cwd: 'src'});
        bower.on('close', function () {
            next();
        });
    });

    gulp.task('less', function () {
        gulp.src('src/main.less')
            .pipe(less())
            .pipe(gulp.dest('src'));
    });

    gulp.task('server', function (next) {
        connect().use(connect.static('./src/')).listen(8080, next);
    });

    gulp.task('watch', ['bower', 'less', 'server'], function () {
        gulp.watch('src/bower.json', ['dev']);
        gulp.watch(['src/main.less', 'src/app/**/*.less'], ['less']);

        var server = livereload();
        gulp.watch(['src/**/*.js', 'src/**/*.html']).on('change', function (file) {
            server.changed(file.path);
        });
    });

    // gulp.task('public');

    gulp.task('default', ['watch']);
}());