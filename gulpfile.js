var gulp = require('gulp');
var git = require('gulp-git');
var bump = require('gulp-bump');
var tag_version = require('gulp-tag-version');
var del = require('del');
var seq = require('run-sequence');
var shell = require('gulp-shell');

var opt = {
	lib: './lib',
	src: './src',
	test: './test'
}

/* clean */
gulp.task('clean', del.bind(null, [
	opt.lib + '/**/*.js'
]));

/* babel */
gulp.task('babel:lib', shell.task(['babel', opt.src, '--out-dir', opt.lib].join(' ')));
gulp.task('babel', ['babel:lib']);

/* test */
gulp.task('test', shell.task(['mocha --compilers js:espower-babel/guess']));

/* build */
gulp.task('build', ['babel']);

/* release */
function increment_version(importance) {
	return gulp.src(['./package.json'])
		.pipe(bump({type: importance}))
		.pipe(gulp.dest('./'))
		.pipe(git.commit('bumps package version'))
		.pipe(tag_version())
}

gulp.task('patch', function(){return increment_version('patch')});
gulp.task('feature', function(){return increment_version('minor')});
gulp.task('release', function(){return increment_version('major')});
