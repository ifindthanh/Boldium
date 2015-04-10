var gulp = require('gulp'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-minify-css'),
    filter = require('gulp-filter'),
    plugins = require('gulp-load-plugins'),
    less = require('gulp-less'),
    csslint = require('gulp-csslint'),
    htmlreplace = require('gulp-html-replace'),
    jshint = require('gulp-jshint'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    util = require('gulp-util'),
    zip = require('gulp-zip'),
    watch = require('gulp-watch'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer');

var reactify = require('reactify');

var browserSync = require('browser-sync'),
    reload = browserSync.reload;

var browserify = require('browserify');

var config = require('./buildCfg.json'),
    www = config.www,
    dist = config.dist,
    pkg = require('./package.json');

var path = require('path'),
    fs = require('fs');

var fileUtils = require('./src/commons/fileUtils'),
    pathUtils = require('./src/commons/pathUtils');

var jslintReport = require('./tests/lint/jslintReport'),
    csslintReport = require('./tests/lint/csslintReport');

/**
 *  Cleansing dest
 */
gulp.task('clean', function () {
    fileUtils.del(pathUtils.exceptRoot(config.dist.dir));
});

/**
 * Running live-reload server
 */
gulp.task('server', function () {
    browserSync({
        server: {
            baseDir: config.src
        }
    });
});

/**
 * Static files
 */
gulp.task('assets', function () {
    return gulp.src(config.paths.assets)
        .pipe(plugins.changed('build'))
        .pipe(gulp.dest(config.dist.dir))
        .pipe(plugins.size({title: 'assets'}))
        .on('error', console.error.bind(console));
});

gulp.task('csslint', function () {
    fileUtils.del(pathUtils.exceptRoot(config.tests.cssReport));
    return gulp.src(config.dist.dir + "/**")
        .pipe(filter(["**/*.css", "!**/*.min.css"]))
        .pipe(csslint())
        .pipe(csslint.reporter(csslintReport));
});

/**
 * Less compilation
 */
var lessPath = pathUtils.append(config.source, config.paths.less),
    cssDest = pathUtils.append(config.source, www.dir.css);
gulp.task('less', function () {
    browserSync.notify("Compiling less files... Please Wait");
    return gulp.src(lessPath)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(concat(www.file.cssBundle))
        .pipe(sourcemaps.write('map'))
        .pipe(gulp.dest(cssDest));
})
    .task('less:min', function () {
        return gulp.src(lessPath)
            .pipe(less())
            .pipe(concat(www.file.cssMinBundle))
            .pipe(cssmin())
            .pipe(gulp.dest(cssDest));
    });

gulp.task('css', ['less' , 'less:min', 'csslint']);

/**
 * JSLint/JSHint validation
 */
gulp.task('jslint', function () {
    fileUtils.del(pathUtils.exceptRoot(config.tests.jsReport));
    return gulp.src(config.paths.js)
        .pipe(jshint())
        .pipe(jshint.reporter(jslintReport));
});
/**
 * JavaScript compilation
 */
var jsxPath = pathUtils.append(config.source, config.paths.jsx),
    jsDest = pathUtils.append(config.source, www.dir.js);
gulp.task('javascript', function () {
    return browserify([jsxPath])
        .transform(reactify)
        .bundle()
        .pipe(source(www.file.jsBundle))
        .pipe(gulp.dest(jsDest));
})
    .task('javascript:min', function () {
        return browserify(jsxPath)
            .transform(reactify)
            .bundle()
            .pipe(source(www.file.jsMinBundle))
            .pipe(buffer())
            .pipe(uglify())
            .pipe(gulp.dest(jsDest))
            .on('error', console.error.bind(console));
    });
gulp.task('js', ['jslint', 'javascript' , 'javascript:min']);

/**
 *  All tasks
 */
//gulp.task('serve', ['less', 'javascript'], function () {
//    return watch(config.src, reload);
//});

/**
 * ZIP file
 */
gulp.task('zip-dev', ['css', 'js'], function () {
    return gulp.src(
        [config.source + '/**', config.docs + '/**', config.tests.dir + '/**', './*.@(js|json)', 'LICENSE', 'README.md'],
        { base: './' })
        .pipe(zip(pkg.name + '-' + pkg.version + '_' + pkg.build + '-dev.zip'))
        .pipe(gulp.dest(config.dist.dir));
});

gulp.task('zip-prod', ['less:min', 'javascript:min'], function () {
    return gulp.src(
        [config.source + '/**', '!' + config.source + '/views/**', config.docs + '/**', './*.@(js|json)', 'LICENSE', 'README.md'],
        { base: './' })
        .pipe(zip(pkg.name + '-' + pkg.version + '_' + pkg.build + '-prod.zip'))
        .pipe(gulp.dest(config.dist.dir));
});


gulp.task('zip', ['clean', 'zip-dev', 'zip-prod']);