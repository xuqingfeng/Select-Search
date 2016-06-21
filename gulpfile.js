// todo: fix fs: re-evaluating native module sources is not supported.
'use strict';

var gulp = require("gulp"),
    Config = require("./gulpfile.config"),
    ts = require("gulp-typescript"),
    tsProject = ts.createProject("tsconfig.json");

var config = new Config;

gulp.task("default", function () {
    var tsResult = gulp.src(config.allTypeScript)
        .pipe(ts(tsProject));
    return tsResult.js.pipe(gulp.dest(config.tsOutputPath))
});