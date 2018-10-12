var userInfoName = 'uif';

// 字符串加密，参数必须为字符串
function compileStr(code){
    var c=String.fromCharCode(code.charCodeAt(0)+code.length);
    for(var i=1;i<code.length;i++)
    {
        c+=String.fromCharCode(code.charCodeAt(i)+code.charCodeAt(i-1));
    }
    return escape(c);
}

// 字符串解密
function uncompileStr(code){
    code=unescape(code);
    var c=String.fromCharCode(code.charCodeAt(0)-code.length);
    for(var i=1;i<code.length;i++)
    {
        c+=String.fromCharCode(code.charCodeAt(i)-c.charCodeAt(i-1));
    }
    return c;
}

/**
 * @method
 * @param
 *  {
 *      name: 键名
 *      value：值
 *      needCompile：是否要解密  默认不需要解密
 *  }
 * @desc 设置cookie
 */
function setCookie(name, value, needCompile) {
    var Days = 1/48;//30分钟过期
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    if(needCompile){
        document.cookie = name + "="+ compileStr(value) + ";expires=" + exp.toGMTString()+";domain=51rz.com;path=/";
    }else{
        document.cookie = name + "="+ value + ";expires=" + exp.toGMTString()+";domain=51rz.com;path=/";
    }
}

/**
 * @method
 * @param
 *  {
 *      name: 键名
 *      needCompile：是否要解密  默认不需要解密
 *  }
 * @desc 获取cookie
 */
function getCookie(name, needUncompile){//needUncompile 是否要解密  默认不需要解密
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)){
        var value=unescape(arr[2]);
        return needUncompile? JSON.parse(uncompileStr(value)): JSON.parse(value);
    }else
        return false;
}

/**
 * @method
 * @param
 *  {
 *      name: 键名
 *      needCompile：是否要解密  默认不需要解密
 *  }
 * @desc 删除cookie
 */
function delCookie(name, needUncompile){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);//1ms过期
    var cval = getCookie(name, needUncompile);
    if(cval!=null) document.cookie = name + "="+cval+";expires="+exp.toGMTString()+";domain=51rz.com;path=/";
}

// 设置本地存储
function setLocalStorageItem(key, value){
    localStorage.setItem(key, JSON.stringify(value));
}

// 获取本地存储键名对应的值
function getLocalStorageItem(key){
    return JSON.parse(localStorage.getItem(key));
}

// 删除本地存储
function removeLocalStorageItem(key){
    localStorage.removeItem(key);
}


/**
 * @method
 * @param
 *  {
 *      name: 与ios，android约定的方法名
 *      param：h5传给原生的参数
 *  }
 * @desc jsBridge交互方法
 */
function webView(name, param) {
    // 这段代码是固定的，必须要放到js中
    function setupWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
        if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)
    }


    var u = navigator.userAgent; 
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端 
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if(isAndroid) {
        // 调用安卓原生的方法
        androidJs[name](param);
    } else if(isiOS) {
        /*与OC交互的所有JS方法都要放在此处注册，才能调用通过JS调用OC或者让OC调用这里的JS*/
        setupWebViewJavascriptBridge(function (bridge) {
            // 调用ios的方法，采用jsBridge
            bridge.callHandler(name, param, function (response) {
                console.log('response:' + response);
            })
        })
    }
}

/**
 * @method
 * @param
 *  {
 *      fmt: 日期格式，例'yyyy-MM-dd'，'yyyy.MM.dd'，'yyyy-MM-dd hh:mm:ss'
 *      date, 时间对象，例 new Date()
 *  }
 * @desc 日期格式化方法
 */
function dateFtt(fmt, date) {
  //author: meizz
	var o = {
		"M+": date.getMonth() + 1, //月份
		"d+": date.getDate(), //日
		"h+": date.getHours(), //小时
		"m+": date.getMinutes(), //分
		"s+": date.getSeconds(), //秒
		"q+": Math.floor((date.getMonth() + 3) / 3), //季度
		S: date.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(
		RegExp.$1,
		(date.getFullYear() + "").substr(4 - RegExp.$1.length)
		);
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
		fmt = fmt.replace(
			RegExp.$1,
			RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
		);
	return fmt;
}

/**
 * @method
 * @param
 *  {
 *      num: 纯数字
 *  }
 * @desc 数字转千分位，用,隔开
 */
function toQfw(num) {
    if(num) {
        return (num*1).toLocaleString();
    } else {
        return '';
    }
    
};