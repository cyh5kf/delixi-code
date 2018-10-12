import store from "@/store/store.js";
import {setMsg, setLoadingStatus, setMaintain} from "@/store/action.js";

import API from "apiConfig";
require('es6-promise').polyfill();

import MD5 from 'blueimp-md5'
import SHA256 from 'sha256'
import getWindowNameUserInfoObj from '@/util/getWindowNameUserInfoObj.js'
const axios = require("axios");

const windowNameUserInfo=getWindowNameUserInfoObj()

/**
 * 需要处理从注册渠道userInfo cookie注册信息的地方有 入口和出口
 * 入口处token和用户登录信息
 * 出口处登录失效情况下的 userInfo cookie清空
 *
 *
 * 1.登录校验接口
 * 2.api接口的token来源
 * 3.store中用户信息的获取方式
 * 4.退出清空和登陆过期清空
 *
 * **/

const initParam = {
    'token':(windowNameUserInfo && windowNameUserInfo.token) ||  JSON.parse(window.localStorage.getItem('userInfo') || '{}').token,
    loginfrom: 'pc'
}

//  request
axios.interceptors.request.use(function (config) {
    store.dispatch(setLoadingStatus(true));
    config.params = Object.assign(config.params || {}, initParam);
    return config;
}, function (error) {

});

//   response
axios.interceptors.response.use(function (response) {
    store.dispatch(setLoadingStatus(false));
    return response;
}, function (error) {
    store.dispatch(setLoadingStatus(false));
});

API.http = function (url, params, all, type) {
    return new Promise((resolve, reject) => {
        return axios({
            url,
            method: type,
            params
        }).then((response) => {
            const data = response.data;
            if (all) {
                if (data.responseCode == '500005') {//系统维护
                    store.dispatch(setMaintain({returnMsg:data.responseMessage,type:3}));
                }else{
                    resolve(data);
                }
            } else {
                if (data.obj) {//有业务逻辑的返回内容
                    resolve(data.obj)
                } else if (data.responseCode == '000000') {//正常业务逻辑
                    const rt = data.obj || true
                    resolve(rt)
                } else if (data.responseCode == '999998') {//未登录
                    window.location.href = '/login.html'
                }else if (data.responseCode == '500005') {//系统维护
                    store.dispatch(setMaintain({returnMsg:data.responseMessage,type:3}));
                }else if (data) {
                    store.dispatch(setMsg(data.responseMessage));
                }
            }
        }).catch((error, a) => {//错误业务逻辑
            store.dispatch(setMsg('当前投资用户过多，系统玩命处理中，请稍后!'))
        });
    });
};

API.get = (url, params, all) => API.http(url, params, all, "get");
API.post = (url, params, all) => API.http(url, params, all, "post");
API.calSaltPass = (pwd, salt) => {
    return SHA256(MD5(MD5(pwd) + salt))
}
API.saltPass = async (pwd, phone) => {
    const param = {}
    if (phone) {
        param.userName = phone
    }
    const salt = await API.http(API.salt, param, false, 'get')
    if (!phone) {
        return {salt: salt, pwd: API.calSaltPass(pwd, salt)}
    } else {
        return API.calSaltPass(pwd, salt)
    }
}

export default API;

