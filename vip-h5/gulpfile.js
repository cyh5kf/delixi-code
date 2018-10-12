var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var proxy = require('http-proxy-middleware');
var uglify = require('gulp-uglify')

var port = 3002;

var taskList = ['lvip', 'preVip', 'mobile', 'wwww'];

for(var i = 0; i < taskList.length; i++) {
    var taskObj = {};
    var item = taskList[i]
    if(item === 'lvip') { // php测试环境
        taskObj = {
            taskName: 'php', // 任务名称
            prefix: '/index.php*', // 前缀
            target: 'http://lvip.51rz.com' // 转发地址
        }
    } else if(item === 'preVip') { // java微信端测试环境
        taskObj = {
            taskName: 'preVip',
            prefix: '/index.php*',
            target: 'https://pre-vip.51rz.com'
        }
        
    } else if(item === 'mobile') { // java微信端测试环境
        taskObj = {
            taskName: 'javaApp',
            prefix: '/apiApp',
            target: 'https://mobile.51rz.com'
        }
        
    }else if(item === 'wwww') { // java PC端测试环境
        taskObj = {
            taskName: 'javaPc',
            prefix: '/apiPc',
            target: 'http://wwww.51rz.com'
        }

    }
    (function(taskObj) {
        gulp.task(taskObj.taskName, function(){
            var apiProxy = proxy(taskObj.prefix, {
                target: taskObj.target,
                changeOrigin: true,
                // pathRewrite: {'^/api' : ''}
            });
            
            browserSync.init({
                files: ['./**/*.html', './**/*.css'],
                port: port,
                directory: true,
                server: {
                    baseDir: './',
                    middleware: [apiProxy]
                }
            });
        })
    })(taskObj)
}


// // 压缩 js 文件
// // 在命令行使用 gulp script 启动此任务
// gulp.task('script', function() {
//     // 1\. 找到文件
//     gulp.src('./static/js/f2.js')
//     // 2\. 压缩文件
//         .pipe(uglify())
//     // 3\. 另存压缩后的文件
//         .pipe(gulp.dest('./static/js/f2.min.js'))
// })

