import {userInfoName,getCookie} from '@/lib/operateCookie.js'

export default function getWindowNameUserInfoObj (){//返回cookie中的userInfo对象或者空字符串

    // let windowName=document.cookie
    let userInfo=getCookie(userInfoName,true)
    let obj
    let isJSONStr=''

    try{
        obj=JSON.parse(userInfo)
        if(Object.prototype.toLocaleString(obj) == '[object Object]' && obj.token ){
            isJSONStr=true
        }
    }catch(e){
        console.log(userInfoName+' cookie ---！')
        return ''
    }
    return isJSONStr && obj
};
