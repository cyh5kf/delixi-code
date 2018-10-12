//这里的常量部分暂不做统一处理
// import * as CONST from "@/store/consts.js";
import {userInfoName,delCookie,setCookie} from  "@/util/operateCookie.js";

export function setMsg(msg){//设置错误消息
	return {
		type:'SET_ERROR_MSG',
		msg:msg||""
	}
}

export function setMaintain(msg){//设置停服/维护提醒
    return {
        type:'SET_MAINTAIN',
        msg:msg||{}
    }
}

// export function setLoginStatus(loginStatus){//设置错误消息
// 	window.localStorage.setItem('isLogined',!!loginStatus)
// 	return {
// 		type:'SET_LOGIN_STATUS',
// 		isLogined:!!loginStatus
// 	}
// }

export function setUserInfo(userInfo){//设置用户信息
    window.localStorage.setItem('userInfo',JSON.stringify(userInfo||{}))
    if(userInfo && userInfo.token){
        setCookie(userInfoName,JSON.stringify(userInfo),true)//因为跨域  从渠道注册页点击登陆跳转过来的页面需要把登录信息传递出去
    }else{
        delCookie(userInfoName,true)
    }
    return {
        type:'SET_USER_INFO',
        userInfo
    }
}

export function setYiBaoInfo(yibaoConfirmInfo){//设置用户信息
    window.localStorage.setItem('yibaoConfirmInfo',JSON.stringify(yibaoConfirmInfo||{}))
    return {
        type:'SET_YIBAO_INFO',
        yibaoConfirmInfo
    }
}

export function setLoginLastTime(loginLastTime){//设置用户过期时间
    window.localStorage.setItem('loginLastTime',loginLastTime||0)
    return {
        type:'SET_LOGIN_LAST_TIME',
        loginLastTime
    }
}

export function setAgreeRiskStatus(agreeRiskStatus){//设置用户是否同意过风险测评协议
    window.localStorage.setItem('agreeRiskStatus',agreeRiskStatus||0)
    return {
        type:'SET_AGREE_RISK_STATUS',
        agreeRiskStatus
    }
}

// export function setMemberInfo(memberInfo){//设置个人中心用户信息
//     window.localStorage.setItem('memberInfo',JSON.stringify(memberInfo||{}))
//     return {
//         type:'SET_MEMBER_INFO',
//         memberInfo
//     }
// }

//
// export function setUserEndTime(userEndTime){//设置用户过期时间
//     window.localStorage.setItem('userEndTime',userEndTime||0)
//     return {
//         type:'SET_USER_END_TIME',
//         userEndTime
//     }
// }

export function setLoginFrom(loginFrom){//设置用户过期时间
    window.localStorage.setItem('loginFrom',loginFrom||'')
    return {
        type:'SET_LOGIN_FROM',
        loginFrom
    }
}


export function setLoadingStatus(isLoading){//设置加载状态
	return {
		type:'SET_LOADING_STATUS',
		isLoading:!!isLoading
	}
}


// export function setLayerConfig(layerConfig){//设置layer配置状态
//     return {
//         type:'SET_LAYER_CONFIG',
//         layerConfig:layerConfig
//     }
// }

export function setLayerStatus(show){//设置layer显示状态
    return {
        type:'SET_LAYER_STATUS',
        show:!!show
    }
}


export function setMessageStatus(status){
    return {
        type:'SET_MESSAGE_STATUS',
        status
    }
}

