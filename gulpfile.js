'use strict';

var gulp = require('gulp'),
    ts = require('gulp-typescript');

gulp.task('default', function () {
    gulp.src('./src/**/*.ts')
        .pipe(ts({
            target: 'es6',
            sourceMap: true
        }, {
            exclude: [
                'node_modules'
            ]
        }))
        .pipe(gulp.dest('./dist'));
});