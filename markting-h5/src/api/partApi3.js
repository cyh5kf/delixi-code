import AjaxUtils from '../common/js/AjaxUtils';

//活动推送接口
export const activityPushRequest = async(data) => {
    let response = await AjaxUtils.doPostRequest('/admin/push', data);
    return response;
};