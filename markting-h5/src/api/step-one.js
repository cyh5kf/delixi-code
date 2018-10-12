/**
 * Created by Administrator on 2017/12/6.
 */

import AjaxUtils from '../common/js/AjaxUtils';

//条件一
export const stepOne = async(data) => {
    let response = await AjaxUtils.doPostRequest('/admin/user/point', data);
    return response;
};

//条件二
export const stepTwo = async(data) =>{
    let response = await AjaxUtils.doPostRequest('/admin/user/section', data);
    return response;
}
//条件三
export const stepThree = async(data) =>{
    let response = await AjaxUtils.doPostRequest('/admin/many/select', data);
    return response;
}
//条件四
export const stepFour = async(data) =>{
    let response = await AjaxUtils.doPostRequest('/admin/activity', data);
    return response;
}
//条件六
export const stepSix = async(data) =>{
    let response = await AjaxUtils.doPostRequest('/admin/import', data);
    return response;
}