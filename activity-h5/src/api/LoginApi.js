import axios from 'axios';
import querystring from 'querystring';
import LoginStore from '../stores/LoginStore';
import AjaxUtils from 'utils/AjaxUtils';

//登录
export const loginRequest = async({userName, password}) => {

    userName = encodeURIComponent(userName);
    password = encodeURIComponent(password);
    let url =  '/index.php?_url=/index/login/login';
    let dataObj = {
        userName: userName,
        password: password
    }
    try {
        let response = await axios({
            method: 'post',
            url: url,
            data: querystring.stringify(dataObj)
        })
        if (response.status == 200) {
            LoginStore.setToken(response.data.accessToken);
            LoginStore.setUserName(userName);
        }else {
            LoginStore.setToken(null);
        }
        return response;
    } catch(e) {
        console.log(e);
    }
};

//退出
export const logoutRequest = async () => {
    let response = await AjaxUtils.doPostRequest('/index/login/logout');
    return response;
};