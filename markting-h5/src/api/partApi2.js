import AjaxUtils from '../common/js/AjaxUtils';

//登录
export const importUserRequest = async(data) => {
    let response = await AjaxUtils.doPostRequest('/admin/import', data);
    return response;
};
