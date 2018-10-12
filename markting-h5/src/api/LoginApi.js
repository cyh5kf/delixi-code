import AjaxUtils from '../common/js/AjaxUtils';

//登录
export const loginRequest = async(data) => {
    let response = await AjaxUtils.doPostRequest('/admin/root/login', data);
    return response;
};

//退出
export const logoutRequest = async () => {
    let response = await AjaxUtils.doPostRequest('/admin/root/logout');
    return response;
};