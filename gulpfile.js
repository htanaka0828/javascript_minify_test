var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var compressor = require('gulp-compressor');
var closureCompiler = require('gulp-closure-compiler');


/**
 * gulp-uglifyによるビルド
 */
gulp.task('uglify_build', function() {
  // 読み込みの順番を指定してあげないといけない
  gulp.src(['src/uglify/treasureBox.js', 'src/uglify/Answer.js'])
    // ファイルの結合は別のモジュールに任せる
    .pipe(concat('uglify_build.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
});


/**
 * YuiCompressorによる圧縮
 */
gulp.task('yui_build', function () {
  // 読み込みの順番を指定してあげないといけない
  gulp.src(['src/yui/treasureBox.js', 'src/yui/Answer.js'])
    // ファイルの結合は別のモジュールに任せる
    .pipe(concat('yui_build.js'))
    .pipe(compressor({type: 'js'}))
    .pipe(gulp.dest('dist'))
});


/**
 * CLT用のビルドタスク
 */
gulp.task('clt_build', function() {
  // 別途closurelibraryを読み込まないといけない
  return gulp.src(['closure-library/closure/goog/**.js', 'src/clt/*.js'])
    .pipe(closureCompiler({
      compilerPath: 'bower_components/closure-compiler/compiler.jar',
      // destで書きだすのではなくここで指定すると余計なファイルが出力されない
      fileName: 'dist/clt_build.js',
      compilerFlags: {
        closure_entry_point: 'Answer',
        compilation_level: 'ADVANCED_OPTIMIZATIONS',
        define: [
          "goog.DEBUG=false"
        ],
        only_closure_dependencies: true,
        // 無名関数でくくるオプション
        output_wrapper: '(function(){%output%})();',
        warning_level: 'VERBOSE'
        }
      }));
});


gulp.task('default', ['clt_build', 'uglify_build', 'yui_build']);
