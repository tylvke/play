var path = require('path'),
    gulp=require('gulp'),
    webpack=require('gulp-webpack'),
    webpack_config=require('./webpack.config.js');

gulp.task('webpack',function(){
   gulp.src('src/main.js')
       .pipe(webpack(webpack_config))
       .pipe(gulp.dest('dist/'));
});
gulp.task('default',function(){
   gulp.start('webpack');
});
gulp.task('watch',function(){
   gulp.watch('src/*.js',['webpack']);
});