var gulp=require('gulp'),
    webpack=require('gulp-webpack');
gulp.task('webpack',function(){
   gulp.src('src/index.js')
       .pipe(webpack())
       .pipe(gulp.dest('dist/'));
});
gulp.task('default',function(){
   gulp.start('webpack');
});
gulp.task('watch',function(){
   gulp.watch('src/js/*.js',['webpack']);
});