import {compileStr,uncompileStr} from '@/lib/CryptoStr.js'

export const userInfoName='uif'

export function setCookie(name,value,needCompile) {
    var Days = 1/48;//30分钟过期
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    if(needCompile){
        document.cookie = name + "="+ compileStr(value) + ";expires=" + exp.toGMTString()+";domain=51rz.com;path=/";
    }else{
        document.cookie = name + "="+ value + ";expires=" + exp.toGMTString()+";domain=51rz.com;path=/";
    }

}

export function getCookie(name,needUncompile) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)){
        let value=unescape(arr[2])
        return needUncompile?uncompileStr(value):value;
    } else{
        return '';
    }
}

export function delCookie(name,needUncompile) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);//1ms过期
    var cval=getCookie(name,needUncompile);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString()+";domain=51rz.com;path=/";
}

