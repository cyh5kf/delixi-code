// 获取url参数
const getParameterByName = (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// 金额千分位
const thousands = (input) => {
    return input && input.toString()
        .replace(/(^|\s)\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
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

// josn化参数
const objectToQueryString = (obj) => {
    let str = [];
    for (let p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return `?${str.join("&")}`;
}

// queryString to obj 
const getParameter = (name,all) => {
    const query = window.location.search.substring(1);
    let vars = query.split('&');
    let queryString = {};
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split('=');
        // If first entry with this name
        if (typeof queryString[pair[0]] === 'undefined') {
            queryString[pair[0]] = decodeURIComponent(pair[1]);
            // If second entry with this name
        } else if (typeof queryString[pair[0]] === 'string') {
            let arr = [queryString[pair[0]], decodeURIComponent(pair[1])];
            queryString[pair[0]] = arr;
            // If third or later entry with this name
        } else {
            queryString[pair[0]].push(decodeURIComponent(pair[1]));
        }
    }
    if(all === 'all') {
        return queryString;
    } else {
        return queryString[name];
    }
}

// 手机号码脱敏

String.prototype.desensitizationByTel=function(){
    // var str="18912341234"
    let pat=/(\d{3})\d*(\d{4})/
    let b=this.replace(pat,'$1****$2');
    return b;
}

const getMenuTitle = () =>{
    const url = location.pathname
    const menus = {
        customerList:'客户列表',
        telemarketingManagement: '专属客服管理',
        exclusiveCustomerServiceManagement: 'VIP2管理',
        telemarketingPerformanceManagement:'业绩查询' ,
        // customerManagement:'客户-客服管理' ,
        ecAccountRelation:'EC账户关系' ,
        birthdayQueryManagement:'生日查询',
        returnmoney:'客户分类 / 回款用户' ,
        withdrawmoney:'客户分类 / 提现用户' ,
        discountcoupon:'客户分类 / 可使用优惠券用户' ,
        guardmoney:'客户分类 / 站岗用户' ,
        duein:'客户分类 / 待收用户' ,
        wash:'客户分类 / 流失用户' ,
    }
    for (const key in menus) {
        if (url.search(new RegExp(key))!=-1) {
            return menus[key];
        }
    }
    return '客户-客服管理'
}


export {
    getParameterByName,
    thousands,
    objectToQueryString,
    getParameter,
    getMenuTitle
}