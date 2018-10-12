const axios = require("axios");

// 设置本地存储
export function setLocalStorageItem(key, value){
    localStorage.setItem(key, JSON.stringify(value));
}

// 获取本地存储键名对应的值
export function getLocalStorageItem(key){
    return JSON.parse(localStorage.getItem(key));
}

// 删除本地存储
export function removeLocalStorageItem(key){
    localStorage.removeItem(key);
}

export function axiosRequest(url, params, type) {
    return new Promise((resolve, reject) => {
      return axios({
        url,
        method: type,
        params,
      }).then(response => {
        const {data} =  response
        resolve(data)
      })
    });
}

export function getParam (url,name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = (url.split("?")[1]||' ').match(reg);  //匹配目标参数
    if (r!=null) return unescape(r[2]); return null; //返回参数值
};


//时间戳转时间
export function formartDate(param) {
    let date = new Date(param);
    let Y = date.getFullYear() + '-';
    let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
    let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
    let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
    let m = date.getMinutes()  < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
    let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y + M + D;
}

// 时间格式化
Date.prototype.Format = function (fmt) { //author: heyan
    let o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
