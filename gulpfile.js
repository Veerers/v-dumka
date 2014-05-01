/*jslint nomen: true, vars: true, unparam: true*/
(function () {
    'use strict';
    var gulp = require('gulp');
    var spawn = require('child_process').spawn;
    var less = require('gulp-less');
    var clean = require('gulp-clean');
    //var preprocess = require('gulp-preprocess');
    var livereload = require('gulp-livereload');
    //var durandal = require('gulp-durandal');
    var prompt = require('gulp-prompt');
    var fs = require('fs');

    gulp.task('config', function (next) {
        gulp.src('')
            .pipe(prompt.prompt([{
                type: 'input',
                name: 'connectionString',
                message: 'Mongo connection string:'
            }], function (res) {
                fs.readFile('server/config.template.js', function (err, data) {
                    fs.writeFile('server/config.js', data.toString().replace('{{connectionString}}', res.connectionString),
                        function () {
                            next();
                        });
                });
            }));
    });

    gulp.task('durandal', function () {
        durandal({
            baseDir: 'src/app',
            main: 'main.js',
            output: 'bundle.main.js',
            almond: true,
            minify: true
        })
            .pipe(gulp.dest('test'));
    });

    gulp.task('clean', function () {
        gulp.src(['public', 'src/libs'])
            .pipe(clean());
    });

    gulp.task('bower', function (next) {
        var bower = spawn('bower', ['install'], {
            cwd: 'src'
        });
        bower.stdout.pipe(process.stdout);
        bower.on('close', function () {
            next();
        });
        process.on('exit', function () {
            bower.kill();
        });
    });

    gulp.task('less', ['bower'], function () {
        gulp.src('src/main.less')
            .pipe(less())
            .pipe(gulp.dest('src'));
    });

    gulp.task('server', ['config'], function () {
        var server = spawn('node', ['--debug', 'server/app.js']);
        server.stdout.pipe(process.stdout);
        process.on('exit', function () {
            server.kill();
        });
    });

    gulp.task('server-inspector', function () {
        var inpector = spawn('node-inspector', ['--save-live-edit']);
        inpector.stdout.pipe(process.stdout);
        process.on('exit', function () {
            inpector.kill();
        });
    });

    gulp.task('dev', ['bower', 'less']);

    gulp.task('watch', ['config', 'bower', 'less', 'server', 'server-inspector'], function () {
        gulp.watch('src/bower.json', ['bower']);
        gulp.watch(['src/main.less', 'src/app/**/*.less'], ['less']);

        var server = livereload();
        gulp.watch(['src/**/*.js', 'src/**/*.html']).on('change', function (file) {
            console.log(file.path, 'changed');
            server.changed(file.path);
        });
    });

    // gulp.task('public');

    gulp.task('default', ['watch']);
}());
