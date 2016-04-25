var gulp = require('gulp');

var del = require('del');
var sass = require('gulp-sass');
var sassdoc = require('sassdoc');
var autoprefixer = require('gulp-autoprefixer');
var source = require('vinyl-source-stream');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var babelify = require('babelify');
var browserify = require('browserify');
var watchify = require('watchify');
var jshint = require('gulp-jshint');
var scsslint = require('gulp-scss-lint');
var html5lint = require('gulp-html5-lint');
var sourcemaps = require('gulp-sourcemaps');
//var server = require('gulp-server-livereload');



gulp.task('clean', function () {
  return del(['./dist']);
});

gulp.task('js-lint', function() {
  return gulp.src(['./src/jsx/**/*.jsx', './src/jsx/**.jsx', './src/api/*.js', '!./node_modules/**'])
    .pipe(jshint({ linter: require('jshint-jsx').JSXHINT }))
    .pipe(jshint.reporter("default", {verbose: true}))
    .pipe(jshint.reporter("fail"));
});

gulp.task('js', ['js-lint'], function() {
  return browserify({
    extensions: [".jsx", ".js", ".json"],
    entries: './src/jsx/app.jsx'
  })
    .transform(babelify.configure({ presets: ["es2015", 'react'] }))
    .bundle()
    .on("error", function(err) { console.log("Error: " + err.message); })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dist/js'))
});

gulp.task('scss-lint', function() {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(scsslint());
});

gulp.task('css', ['copycsslibs', 'scss-lint'],  function () {
  return gulp.src('./src/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('css-prod', ['clean'], function () {
  return gulp.src('./src/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('html', ['html-lint'], function () {
  return gulp.src('./src/**.html')
    .pipe(gulp.dest('./dist'));
});

gulp.task('html-lint', function() {
  return gulp.src('./src/**.html')
    .pipe(html5lint());
});

gulp.task('images', ['favicon'], function() {
  return gulp.src('./src/images/*')
    .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
    }))
    .pipe(gulp.dest('./dist/images'));
});

gulp.task('favicon', function(){
  return gulp.src('./src/favicon.ico')
    .pipe(gulp.dest('./dist'));
});

gulp.task('copyfonts', function() {
   gulp.src('./src/fonts/**/*.{ttf,woff,eot,svg,woff2}')
   .pipe(gulp.dest('./dist/css/fonts'));
});

gulp.task('copycsslibs', function() {
   gulp.src('./src/libs/css/**/*.css')
   .pipe(gulp.dest('./dist/css/libs'));
});

gulp.task('copyjslibs', function() {
   gulp.src('./src/libs/js/**/*.js')
   .pipe(gulp.dest('./dist/js/libs'));
});

gulp.task('watch', function () {
  gulp.watch('./src/scss/**/*.scss', ['css']);
  gulp.watch('./src/jsx/**/*.jsx', ['js']);
});

gulp.task('default', ['clean', 'js', 'css', 'html', 'images', 'copyfonts' ]);
gulp.task('clean', ['clean']);
gulp.task('build-html', ['html', 'images']);
gulp.task('build-js', ['copyjslibs', 'js']);
gulp.task('build-css', ['copycsslibs', 'copyfonts', 'css']);
