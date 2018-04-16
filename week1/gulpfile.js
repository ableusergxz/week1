var gulp = require('gulp')
var uglify = require('gulp-uglify') //压缩js
var rename = require('gulp-rename') //文件重新命名
var concat = require('gulp-concat') //文件合并
var minifyCss = require("gulp-minify-css") //压缩css
var less = require('gulp-less') //压缩less
var minifyHtml = require("gulp-minify-html") //压缩html
var connect = require('gulp-connect')
var usemin = require('gulp-usemin')
var rev = require('gulp-rev')
//less
gulp.task('less', function () {
    gulp.src(['./src/static/less/*.less', './src/static/less/**/*.less'])
    .pipe(less())
    .pipe(gulp.dest('./src/static/css'))
    .pipe(connect.reload())
})
//js
gulp.task('mergeLib', function () {
    gulp.src('./src/static/lib/*.js')
    .pipe(concat('lib.js'))
    .pipe(gulp.dest('./src/static/lib/build/'))
})
//gulp  服务
gulp.task('server', function () {
    connect.server({
        root: 'src',
        port: 2233,
        livereload: true
    })
})
gulp.task('moveLib', function () {
    gulp.src('./src/static/lib/build/lib.js')
    .pipe(gulp.dest('./dist/static/lib/build'))
})
//build
gulp.task('build',['moveLib'], function () {
    gulp.src('./src/*.html')
    .pipe(usemin({
      js: [uglify, rev],
      css: [minifyCss, rev],
      html: [minifyHtml]
    }))
    .pipe(gulp.dest('./dist/'));
})
//gulp 监听
gulp.task('watch', function () {
    gulp.watch(['./src/static/js/*.js', './src/*.html'], function () {
        gulp.src('./src/*.html')
        .pipe(connect.reload())
    })
    gulp.watch(['./src/static/less/*.less', './src/static/less/**/*.less'], ['less'])
})
gulp.task('default',['less', 'mergeLib', 'server', 'watch',"moveLib"])