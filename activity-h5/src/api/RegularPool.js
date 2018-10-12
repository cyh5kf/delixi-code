/**
 * Created by Administrator on 2017/11/21.
 */
import AjaxUtils from 'utils/AjaxUtils';

//红包池，红包列表接口
export const getRedEnvelopeRequest = function (data) {
    return AjaxUtils.doPostRequest('/rules/coupon/index',data);
};

//编辑红包规则
export const editRedPackRule = function(data){
    return AjaxUtils.doPostRequest('/rules/coupon/edit',data)
}

//添加红包规则
export const addRedPackRule = function (data) {
    return AjaxUtils.doPostRequest('/rules/coupon/add',data)
}

//加息券列表
export const couponList = function (data){
    return AjaxUtils.doPostRequest('/rules/coupon/index',data);
}

//添加加息券
export const addCouponList = function (data){
    return AjaxUtils.doPostRequest('/rules/coupon/add',data);
}

//编辑加息券
export const editCouponItem = function (data){
    return AjaxUtils.doPostRequest('/rules/coupon/edit',data)
}

//任务列表
export const taskList = function(data){
    return AjaxUtils.doPostRequest('/rules/task/index',data);
}

//添加任务
export const add = function(data){
    return AjaxUtils.doPostRequest('/rules/task/add',data)
}

//任务编辑
export const editTask = function(data){
    return AjaxUtils.doPostRequest('/rules/task/edit',data)
}

//任务详情
export const infoTask = function(data){
    return AjaxUtils.doPostRequest('/rules/task/info',data)
}
