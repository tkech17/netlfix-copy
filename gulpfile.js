const { src, dest, parallel } = require('gulp');

var concat = require('gulp-concat');
 
function packJs(){
	return src('js/**/*.js')
        .pipe(concat('bundle.js'))
        .pipe(dest('public'));
}

function packCss() {
	return src('style/**/*.css')
        .pipe(concat('all.css'))
        .pipe(dest('public'));
}
 
exports.default = parallel(packJs, packCss);
