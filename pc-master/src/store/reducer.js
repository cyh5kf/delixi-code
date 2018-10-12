//这里的常量部分暂不做统一处理
// import * as CONST from "@/store/consts.js";

import getWindowNameUserInfoObj from '@/util/getWindowNameUserInfoObj.js'



//函数名字决定了store中的字段名称

export let errorMsg = function (state = "", action) {
    switch (action.type) {
        case "SET_ERROR_MSG":
            return action.msg;
        default:
            return state;
    }
}

//是否有未读消息
const messageState=localStorage.getItem('hasNotRead')||false;
export let messageStatus = function (state = messageState, action) {
    switch (action.type) {
        case "SET_MESSAGE_STATUS":
            return action.status;
        default:
            return state
    }
}

export let maintainMsg = function (state = {}, action) {
    switch (action.type) {
        case "SET_MAINTAIN":
            return action.msg;
        default:
            return state;
    }
}


// let initLoginStatus=!!localStorage.getItem('isLogined')||false
// export let isLogined = function(state=initLoginStatus,action){
//     switch (action.type){
//         case "SET_LOGIN_STATUS":
//              return action.isLogined;
//         default:
//             return state;
//     }
// }


const windowNameUserInfo=getWindowNameUserInfoObj()
//用户信息有两个来源   一个是渠道注册页面通过cookie共享的  另一个是重构项目本身登录注册之后存在localStorage中的
let initUserInfo =windowNameUserInfo || JSON.parse(localStorage.getItem('userInfo') || '{}');
export let userInfo = function (state = initUserInfo, action) {
    switch (action.type) {
        case "SET_USER_INFO":
            return Object.assign({}, action.userInfo);
        default:
            return state;
    }
}
//
// let initMemberInfo=JSON.parse(localStorage.getItem('memberInfo')||'{}');
// export let memberInfo = function(state=initMemberInfo,action){
//     switch (action.type){
//         case "SET_MEMBER_INFO":
//             return Object.assign({},action.memberInfo);
//         default:
//             return state;
//     }
// }


// let initUserEndTime=localStorage.getItem('userEndTime')||0;
// export let userEndTime =function userEndTime(state=initUserEndTime,action){
//     switch (action.type){
//         case "SET_USER_END_TIME":
//             return action.userEndTime;
//         default:
//             return state;
//     }
// }

let initRechargeYiBaoInfo = JSON.parse(localStorage.getItem('yibaoConfirmInfo') || '{}');
export let yibaoConfirmInfo = function (state = initRechargeYiBaoInfo, action) {
    switch (action.type) {
        case "SET_YIBAO_INFO":
            return Object.assign({}, action.yibaoConfirmInfo);
        default:
            return state;
    }
}

let initloginFrom = localStorage.getItem('loginFrom') || '';
export let loginFrom = function isLoading(state = initloginFrom, action) {
    switch (action.type) {
        case "SET_LOGIN_FROM":
            return action.loginFrom;
        default:
            return state;
    }
}


export let isLoading = function isLoading(state = true, action) {
    switch (action.type) {
        case "SET_LOADING_STATUS":
            return action.isLoading;
        default:
            return state;
    }
}

let initloginLastTime = localStorage.getItem('loginLastTime') || 0;
export let loginLastTime = function loginLastTime(state = initloginLastTime, action) {
    switch (action.type) {
        case "SET_LOGIN_LAST_TIME":
            return action.loginLastTime;
        default:
            return state;
    }
}

let initAgreeRiskStatus = localStorage.getItem('agreeRiskStatus') || 0;
export let agreeRiskStatus = function agreeRiskStatus(state = initAgreeRiskStatus, action) {
    switch (action.type) {
        case "SET_AGREE_RISK_STATUS":
            return action.agreeRiskStatus;
        default:
            return state;
    }
}

// let initstate= {
//     show: false,
//     type:"",//msg
//     title: "",
//     content: "",
//     time: 3000,
//     closeAuto: true,
//     btns: {
//         ok: {
//             text: "确定"
//         },
//         cancel: {
//             text: "取消"
//         }
//     }
// };
//
// export let layerConfig = function(state=initstate,action){
//     switch (action.type){
//         case "SET_LAYER_CONFIG":
//             state.show=true;
//             let newState=Object.assign({},state,action.layerConfig);
//             return newState;
//         case "SET_LAYER_STATUS":
//             return Object.assign({},state,{show:action.show});
//         default:
//             return state;
//     }
// }




