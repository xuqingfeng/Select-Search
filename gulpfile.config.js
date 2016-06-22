'use strict';

var GulpConfig = (function () {
    function gulpConfig() {
        this.source = './src';
        this.dist = './dist';

        this.allTypeScript = this.source + '/**/*.ts';
        this.tsOutputPath = this.dist + '/';
    }

    return gulpConfig;
});
module.exports = GulpConfig;
