var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var proxy = require('http-proxy-middleware');
var uglify = require('gulp-uglify')

var port = 3003;

var taskList = ['testbi', 'preview', 'view'];

for(var i = 0; i < taskList.length; i++) {
    var taskObj = {};
    var item = taskList[i]
    if(item === 'testbi') { // bi测试环境，用gulp testbi启动本地服务
        taskObj = {
            taskName: 'testbi',
            prefix: '/apiPc',
            target: 'http://testbi.51rz.com'
        }
    }else if(item === 'moni') { // bi测试环境，用gulp testbi启动本地服务
        taskObj = {
            taskName: 'moni',
            prefix: '/apiPc',
            target: 'http://localhost:3009'
        }
    } else if(item === 'preview') { // 演练环境，用gulp preview启动本地服务
        taskObj = {
            taskName: 'preview',
            prefix: '/apiPc',
            target: 'https://preview.51rz.com/'
        }
    } else if(item === 'view') { // 演练环境，用gulp view启动本地服务
        taskObj = {
            taskName: 'view',
            prefix: '/apiPc',
            target: 'https://view.51rz.com/'
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
//     gulp.src('./static/js/microdonemobile.js')
//     // 2\. 压缩文件
//         .pipe(uglify())
//     // 3\. 另存压缩后的文件
//         .pipe(gulp.dest('./static/js'))
// })

