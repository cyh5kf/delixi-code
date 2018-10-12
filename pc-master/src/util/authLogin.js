
import  API from "@/api/api.js";
import {setLoginLastTime,setUserInfo} from "@/store/action.js"

export default function authLogin(){
    return new Promise(async (resolve,reject)=>{
        let resData=await API.get(API.loginCheck,{},true);
        let {
            obj=''
        }=resData;
        if(typeof obj=='string' && obj.length){//如果登录 obj是过期时间  否则obj={}
            setLoginLastTime(obj*1000)
            resolve(obj);
        }else{
            setUserInfo({})//登录过期之后  清空用户信息
            setLoginLastTime(0)
            resolve(false);
        }
    })
}
