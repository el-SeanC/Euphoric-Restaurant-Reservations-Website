const gulp            = require('gulp'),
      autoprefixer    = require('gulp-autoprefixer'),
      sass            = require('gulp-sass'),
      babel           = require('gulp-babel'),
      uglify          = require('gulp-uglify'),
      imagemin        = require('gulp-imagemin');


gulp.task('watch', function() {
    gulp.watch('src/css/sass/**/*.sass', gulp.series('sass'));
    gulp.watch('src/js/**/*.js', gulp.series('js'));
});


gulp.task('sass', () => {
    return gulp.src('src/css/sass/main.sass')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('dist/css'));
});


gulp.task('js', () => {
    return gulp.src('src/js/**/*.js')
        .pipe(babel({presets: ['@babel/env']}))
        .pipe(uglify().on('error', console.error))
        .pipe(gulp.dest('dist/js'));
});


gulp.task('default', gulp.series('watch'));


gulp.task('images', () => {
    return gulp.src('images/**/*.{png,jpg,svg}')
        .pipe(imagemin([
            imagemin.optipng(),
            imagemin.mozjpeg({
                quality: 75,
                progressive: true
            }),
            imagemin.svgo()
        ]))
        .pipe(gulp.dest('dist/images'));
});
