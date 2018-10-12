# wechat

> 编码规范（部分参考https://github.com/airbnb/javascript）

1. 对只需要改变的值用let 其余都用const
2. 符号两边加上空格，方法的小括号和花括号中间要有空格
3. js中一律用单引号或者反引号
4. 对于引用的变量尽量传参在方法的参数中去解构
5. 对多个参数对象一行一个，结尾也带上逗号
6. 复制数组和对象用扩展运算符
7. 对于判断等于尽量明确类型用严格等于
8. 数组用解构取值不要用下标
9. 参数有默认值的放在最后
10. 不要去改变参数
11. 循环用map不用for
12. 初始化变量时const定义在let前面
13. 不要链式赋值
14. 数字字符串转boolean用！！
15. 块之间留一行空行，块里面不要留空行
16. 数字转字符串不要+''或者toString(),用String(1)
17. 结尾的分号不要，节省代码量提高阅读性

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
