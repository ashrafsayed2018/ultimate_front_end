var gulp         = require ('gulp'),
    concat       = require('gulp-concat'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    pug          = require('gulp-pug'),
    livereload   = require('gulp-livereload'),
    sourcemaps   = require('gulp-sourcemaps'),
    newer = require('gulp-newer'),
    minify       = require('gulp-minify');



// HTML  Task 

gulp.task("html",function () {
    return gulp.src('stage/html/*.pug')
           .pipe(pug({
               pretty: true
           }))
           .pipe(newer('stage/html/*.pug'))
           .pipe(gulp.dest('dist'))
           .pipe(livereload())
});

// CSS Task 

gulp.task('css',function () {
    return gulp.src(['stage/css/**/*.css','stage/css/**/*.scss'])
    .pipe(sourcemaps.init())
    // .pipe(newer(['stage/css/**/*.css','stage/css/**/*.scss']))
    .pipe(sass({outputStyle:"compressed"}).on("error",sass.logError))
    .pipe(autoprefixer())
    .pipe(concat('main.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'))
    .pipe(livereload())

})

// JS Task 

gulp.task('js', function () {
    return gulp.src('stage/js/*.js')
           .pipe(concat('main.js'))
           .pipe(minify())
           .pipe(gulp.dest('dist/js'))
           .pipe(livereload())
})
// WATCH Task 
 
gulp.task('watch',function() {
    require('./server.js')
    livereload.listen()
     gulp.watch('stage/html/*.pug', gulp.series('html'));
     gulp.watch(['stage/css/**/*.css','stage/css/**/*.scss'], gulp.series('css'));
     gulp.watch('stage/js/*.js',gulp.series('js'))
})

// check if live reload works

gulp.task('reload', function () {
    console.log("refreshed");
    livereload.listen(); 
  });