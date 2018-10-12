import {userInfoName,setCookie,delCookie} from '@/lib/operateCookie.js'

const mutations = {
    SHOW_LOADING(state,flag){
        state.show_loading = flag
    },
    SHOW_MSG(state,content){
        state.msg.content = content
        state.msg.show = true
        setTimeout(() => {
            state.msg.show = false
        },state.msg.time)
    },
    SET_USER_END_TIME(state,flag){
        state.userEndTime = flag
    },
    SET_LOGIN_TO(state,flag){
        state.loginTo = flag
    },
    SET_INFO(state,content){
        const infoObj=Object.assign({},state.info,content);
        state.info=infoObj;
        if(infoObj && infoObj.token){
            setCookie(userInfoName,JSON.stringify(infoObj),true)//因为跨域  从渠道注册页点击登陆跳转过来的页面需要把登录信息传递出去
        }else{
            delCookie(userInfoName,true)
        }
        localStorage.setItem('info',JSON.stringify(infoObj))
    },
    SET_CUR_TENDER_INFO(state,content){
        const tenderInfoObj=Object.assign({},content);
        state.curTenderInfo=tenderInfoObj;
        localStorage.setItem('curTenderInfo',JSON.stringify(tenderInfoObj))
    },
    SET_MESSAGE_INFO(state,content){
        const infoObj=Object.assign({},state.messageInfo,content);
        state.messageInfo=infoObj;
        localStorage.setItem('messageInfo',JSON.stringify(infoObj))
    },
    SET_STOP_SERVICE(state,content){
        state.stopService = Object.assign({},state.stopService,content)
    },
}
export default mutations