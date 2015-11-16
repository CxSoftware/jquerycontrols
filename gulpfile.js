var gulp = require('gulp');
var traceur = require('gulp-traceur');

gulp.task ('build-es6', function ()
{
        return gulp.src (['src/**/*.js','!src/run.js'])
                .pipe (traceur ({
                        asyncFunctions: true,
                        inputSourceMap: true,
                        modules: 'inline',
                        sourceMaps: true
                }))
                .pipe (gulp.dest ('dist'));
});
gulp.task ('copy-run.js', function ()
{
        return gulp.src ('src/run.js')
                .pipe (gulp.dest ('dist'));
});

gulp.task ('build', ['build-es6', 'copy-run.js']);
gulp.task ('default', ['build']);
