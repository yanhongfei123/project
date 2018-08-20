// 载入外挂
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
//   jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'), //
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    rev = require('gulp-rev-append');

  livereload = require('gulp-livereload');

var RevAll = require('gulp-rev-all');

var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

var postcss = require('gulp-postcss');
var px2rem = require('postcss-px2rem');


gulp.task('html', function() {
    gulp.src('yxx/bb/*.html')
        .pipe(rev())
        //.pipe(RevAll.revision())
       // .pipe(RevAll.manifestFile())

       //  .pipe(rev.manifest())
        .pipe(gulp.dest('yxx/dist/html'));
});

// 编译sass
 gulp.task('styles', function() {
 return gulp.src('yxx/css/index.scss')
 .pipe(sass())
 .pipe(autoprefixer({
     browsers:['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'Android >= 4.0'],
     cascade: true//是否美化属性值 默认：true 像这样：
     //-webkit-transform: rotate(45deg);
     //        transform: rotate(45deg);

 })
 .pipe(rename({ suffix: '.min' }))
 .pipe(gulp.dest('yxx/dist/css'))
 .pipe(reload({stream: true}))// scss编译后的css将注入到浏览器里实现更新
 .pipe(notify({ message: 'Styles task complete' })))
 });

//合并压缩css
gulp.task('css', function() {
    var processors = [px2rem({remUnit: 75})];//自动把px转换rem
    return gulp.src('yxx/css/*.css')
        .pipe(postcss(processors))
        .pipe(minifycss({
            advanced:true,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie7',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: false,//类型：Boolean 默认：false [是否保留换行] //是否压缩成一行
            keepSpecialComments: '*'
            //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('yxx/dist/styles'))
        .pipe(notify({ message: 'Styles task complete' }));
});


// 脚本
gulp.task('scripts', function() {
    return gulp.src('yxx/js/*.js')
    // .pipe(jshint())
    //.pipe(jshint.reporter('default')) // 对代码进行报错提示
        .pipe(concat('main.js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify({
            mangle: true,//类型：Boolean 默认：true 是否修改变量名
            compress: true,//类型：Boolean 默认：true 是否完全压缩
            preserveComments: 'all' //保留所有注释
        }))
        .pipe(gulp.dest('yxx/dist/scripts'))
        .pipe(notify({ message: 'Scripts task complete' }));
});

// 图片
gulp.task('images', function() {
    return gulp.src('yxx/img/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('yxx/dist/images'))
        .pipe(notify({ message: 'Images task complete' }));
});


//清空目标文件夹
 gulp.task('clean', function() {
 return gulp.src(['dist/css','dist/html','dist/styles', 'dist/scripts', 'dist/images'], {read: false})
 .pipe(clean());
 });


//服务器任务:以dist文件夹为基础,启动服务器;
//命令行使用gulp server启用此任务;

gulp.task('server',['html','styles', 'css','scripts' /* 'images'*/] ,function() {
    browserSync.init({
        server: "./yxx"
    });
    gulp.watch('yxx/bb/*.html', ['html']);

    gulp.watch('yxx/css/*.scss', ['styles']);

    gulp.watch('yxx/css/*.css', ['css']);

    gulp.watch('yxx/js/*.js', ['scripts']);

    gulp.watch('yxx/img/*.{png,jpg,gif,ico}', ['images']);

    gulp.watch('./yxx/dist/**/*.*').on('change',reload);//自动刷新

});

gulp.task('default',['server']);
