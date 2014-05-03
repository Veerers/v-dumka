/*jslint nomen: true, vars: true, unparam: true*/
(function () {
    'use strict';
    var gulp = require('gulp');
    var spawn = require('child_process').spawn;
    var less = require('gulp-less');
    var clean = require('gulp-clean');
    var preprocess = require('gulp-preprocess');
    var livereload = require('gulp-livereload');
    var durandal = require('gulp-durandal');
    var bower = require('bower');
    var minifyCss = require('gulp-minify-css');
    var jslint = require('gulp-jslint');

    bower.config.directory = 'libs';
    bower.config.cwd += '/src';

    // DEV BUILD

    gulp.task('dev:bower', function (next) {
        bower.commands.install([], {}).on('end', function (data) {
            console.dir(data);
            next();
        });
    });

    gulp.task('dev:less', ['dev:bower'], function () {
        gulp.src('src/main.less')
            .pipe(less())
            .pipe(gulp.dest('src'));
    });

    gulp.task('dev', ['dev:bower', 'dev:less']);

    // RUN DEV
    gulp.task('dev:server', ['dev'], function () {
        var server = spawn('node', ['--debug', 'server/app.js']);
        server.stdout.pipe(process.stdout);
        process.on('exit', function () {
            server.kill();
        });
    });

    gulp.task('dev:server-inspector', function () {
        var inpector = spawn('node-inspector', ['--save-live-edit']);
        inpector.stdout.pipe(process.stdout);
        process.on('exit', function () {
            inpector.kill();
        });
    });

    gulp.task('dev:watch', ['dev', 'dev:server', 'dev:server-inspector'], function () {
        gulp.watch('src/bower.json', ['dev:bower']);
        gulp.watch(['src/main.less', 'src/app/**/*.less'], ['dev:less']);

        var server = livereload();
        gulp.watch(['src/**/*.js', 'src/**/*.html'])
            .on('change', function (file) {
                console.log(file.path, 'changed');
                server.changed(file.path);
            });
    });

    // PROD BUILD

    gulp.task('prod:durandal', ['dev'], function () {
        durandal({
            verbose: true,
            baseDir: 'src/app',
            main: 'main.js',
            almond: true,
            minify: true
        })
            .pipe(gulp.dest('public'));
    });

    gulp.task('prod:resources', ['dev'], function () {
        gulp.src('src/img/**').pipe(gulp.dest('public/img'));
        gulp.src('src/locales/**').pipe(gulp.dest('public/locales'));
        gulp.src('src/libs/bootstrap/fonts/**').pipe(gulp.dest('public/libs/bootstrap/fonts'));
    });

    gulp.task('prod:css', ['dev:less', 'dev'], function () {
        gulp.src('src/main.css')
            .pipe(minifyCss({
                processImport: true,
                keepSpecialComments: 0
            }))
            .pipe(gulp.dest('public'));
    });

    gulp.task('prod:index', function () {
        gulp.src('src/index.html')
            .pipe(preprocess())
            .pipe(gulp.dest('public'));
    });

    gulp.task('prod', ['prod:durandal', 'prod:resources', 'prod:css', 'prod:index']);

    // RUN PROD

    gulp.task('prod:server', ['prod'], function () {
        var server = spawn('node', ['server/app.js']);
        server.stdout.pipe(process.stdout);
        process.on('exit', function () {
            server.kill();
        });
    });

    gulp.task('prod:watch', ['prod', 'prod:server'], function () {
        gulp.watch(['src/app/**/*.js', 'src/app/**/*.html'], ['prod:durandal']);
        gulp.watch(['src/img/**', 'src/locales/**'], ['prod:resources']);
        gulp.watch('src/main.css', ['prod:css']);
        gulp.watch('src/index.html', ['prod:index']);

        var server = livereload();
        gulp.watch('public/**')
            .on('change', function (file) {
                console.log(file.path, 'changed');
                server.changed(file.path);
            });
    });

    // TOOLS

    gulp.task('clean', function () {
        gulp.src(['public', 'src/libs', 'src/main.css', 'server/config.js'])
            .pipe(clean());
    });

    gulp.task('lint', function () {
        gulp.src(['src/app/**/*.js', 'server/**/*.js'])
            .pipe(jslint());
    });

    gulp.task('heroku:development', ['dev']);
    gulp.task('heroku:production', ['prod']);

    gulp.task('default', ['dev:watch']);
}());
