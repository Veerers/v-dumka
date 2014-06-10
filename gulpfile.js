/*jslint node:true,nomen:true,vars:true,unparam:true*/
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
    var jade = require('gulp-jade');

    bower.config.directory = 'libs';
    bower.config.cwd += '/src';

    // DEV BUILD

    gulp.task('dev:jade', function () {
        return gulp.src('src/app/**/*.jade')
            .pipe(jade({
                pretty: true
            }))
            .pipe(gulp.dest('src/app'));
    });

    gulp.task('dev:bower', function (next) {
        bower.commands.install([], {}).on('end', function (data) {
            console.dir(data);
            next();
        });
    });

    gulp.task('dev:less', ['dev:bower'], function () {
        return gulp.src('src/main.less')
            .pipe(less())
            .pipe(gulp.dest('src'));
    });

    gulp.task('dev', ['dev:jade', 'dev:bower', 'dev:less']);

    // RUN DEV

    gulp.task('dev:server', function () {
        var server = spawn('node', ['--debug', 'server/app.js']);
        server.stdout.pipe(process.stdout);
        server.stderr.pipe(process.stdout);
        process.on('exit', function () {
            server.kill();
        });
    });

    gulp.task('dev:server-inspector', function () {
        var inpector = spawn('./node_modules/.bin/node-inspector', ['--save-live-edit']);
        inpector.stdout.pipe(process.stdout);
        inpector.stderr.pipe(process.stdout);
        process.on('exit', function () {
            inpector.kill();
        });
    });

    gulp.task('dev:watch', ['dev', 'dev:server', 'dev:server-inspector'], function () {
        gulp.watch('src/app/**/*.jade', ['dev:jade']);
        gulp.watch('src/bower.json', ['dev:bower']);
        gulp.watch(['src/main.less', 'src/app/**/*.less'], ['dev:less']);

        var server = livereload();
        gulp.watch(['src/**/*.js', 'src/**/*.html', 'src/main.css'])
            .on('change', function (file) {
                console.log(file.path, 'changed');
                server.changed(file.path);
            });
    });

    // PROD BUILD

    gulp.task('prod:jade', ['dev:jade'], function () {
        return gulp.src('src/app/**/*.jade')
            .pipe(jade())
            .pipe(gulp.dest('src/app'));
    });

    gulp.task('prod:durandal', ['dev', 'prod:jade'], function () {
        return durandal({
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
        return gulp.src('src/main.css')
            .pipe(minifyCss({
                processImport: true,
                keepSpecialComments: 0
            }))
            .pipe(gulp.dest('public'));
    });

    gulp.task('prod:index', function () {
        return gulp.src('src/index.html')
            .pipe(preprocess())
            .pipe(gulp.dest('public'));
    });

    gulp.task('prod', ['prod:durandal', 'prod:resources', 'prod:css', 'prod:index']);


    // TOOLS

    gulp.task('clean', function () {
        return gulp.src(['public', 'src/libs', 'src/main.css', 'src/app/**/*.html'])
            .pipe(clean());
    });

    gulp.task('lint', function () {
        return gulp.src(['src/app/**/*.js', 'server/**/*.js'])
            .pipe(jslint({
                errorsOnly: true
            }));
    });

    gulp.task('heroku:development', ['dev']);
    gulp.task('heroku:production', ['prod']);

    gulp.task('default', ['dev:watch']);
}());
