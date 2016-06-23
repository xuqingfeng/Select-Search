'use strict';

var gulp = require('gulp'),
    ts = require('gulp-typescript');

gulp.task('compile', function () {
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

gulp.task('watch', function(){
    gulp.watch('./src/**/*', ['compile']);
});

gulp.task('default', ['compile', 'watch']);