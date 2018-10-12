var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var proxy = require('http-proxy-middleware');
var uglify = require('gulp-uglify')

var port = 3002;

var taskList = ['lactivity', 'lactivity_api', 'mobile', 'wwww', 'testm','preActivity', 'preActivityApp', 'activityApp'];

for(var i = 0; i < taskList.length; i++) {
    var taskObj = {};
    var item = taskList[i]
    if(item === 'lactivity') { // php测试环境，用gulp php启动此服务
        taskObj = {
            taskName: 'php', // 任务名称
            prefix: '/index.php*', // 前缀
            target: 'http://lactivity.51rz.com' // 转发地址
        }
    } else if(item === 'lactivity_api') { // php测试环境，用gulp lactivity启动此服务
        taskObj = {
            taskName: 'lactivity',
            prefix: '/index.php*',
            target: 'http://lactivity_api.51rz.com'
        }
        
    } else if(item === 'mobile') { // java微信端演练环境，用gulp javaApp启动此服务
        taskObj = {
            taskName: 'javaApp',
            prefix: '/apiApp',
            target: 'https://mobile.51rz.com'
        }
        
    } else if(item === 'wwww') { // java PC端演练环境，用gulp javaPc启动此服务
        taskObj = {
            taskName: 'javaPc',
            prefix: '/apiPc',
            target: 'http://wwww.51rz.com'
        }
    } else if(item === 'testm') { // java 测试环境，用gulp javaTestApp启动此服务
        taskObj = {
            taskName: 'javaTestApp',
            prefix: '/apiApp',
            target: 'http://testm.51rz.com'
        }
    }else if(item === 'preActivity'){
        taskObj = {
            taskName: 'preTest',
            prefix: '/index.php*',
            target: 'https://pre-activity-center.51rz.com'
        }
    }else if(item === 'preActivityApp'){
        taskObj = {
            taskName: 'preApp',
            prefix: '/apiApp',
            target: 'https://pre-activity-center.51rz.com'
        }
    }else if(item === 'activityApp'){
        taskObj = {
            taskName: 'appOnline',
            prefix: '/apiApp',
            target: 'https://activity-center.51rz.com'
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

