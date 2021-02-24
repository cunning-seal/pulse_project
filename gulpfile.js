const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const rename = require("gulp-rename");
const cleanCSS = require('gulp-clean-css');

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "src",
        },
    })
})

gulp.task('styles', function(){
    return gulp.src("src/sass/**/*.+(sass|scss)")
        .pipe(sass())
        .pipe(rename({
            prefix: "",
            suffix: ".min",
          }))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
})


gulp.task('watch', function () {
    gulp.watch("src/sass/**/*.+(sass|scss)", gulp.parallel('styles'));
    gulp.watch("src/*.html").on("change", browserSync.reload);
});

gulp.task('default', gulp.parallel('server', 'styles', 'watch'));

