import AjaxUtils from 'utils/AjaxUtils';

// 活动列表页面

// 活动列表查询接口
export const getActivityListRequest = function (data) {
    return AjaxUtils.doPostRequest('/activity/activity/index', data);
};

// 添加活动接口
export const addActivityRequest = function (data) {
    return AjaxUtils.doPostRequest('/activity/activity/add', data);
};

// 编辑活动接口
export const editActivityRequest = function (data) {
    return AjaxUtils.doPostRequest('/activity/activity/edit', data);
};

// 禁用/激活接口
export const changeStatusRequest = function (data) {
    return AjaxUtils.doPostRequest('/activity/activity/changeStatus', data);
};



/********************************************/
// 配置活动模块页面

// 获取活动关联组件接口
export const getActivityRelationRequest = function (data) {
    return AjaxUtils.doGetRequest(`/activity/activity/widget&activityId=${data}`);
};

// 获取活动基本信息
export const getActivityInfoRequest = function (data) {
    return AjaxUtils.doGetRequest(`/activity/activity/view&id=${data}`);
};

// 获取活动组件接口
export const getActivityComponentRequest = function (data) {
    return AjaxUtils.doPostRequest('/activity/widget/list', data);
};

// 添加活动模块接口
export const addActivityModuleRequest = function (data) {
    return AjaxUtils.doPostRequest('/activity/activity/addWidget', data);
};

// 禁用/激活模块接口
 export const changeModuleStatusRequest = function (data) {
    return AjaxUtils.doPostRequest('/activity/activity/changeStatusWidget', data);
 };



/********************************************/
// 拆礼包规则页面

// 获取拆礼包规则接口
export const getPackInfoRequest = function (data) {
    return AjaxUtils.doPostRequest('/activity/packWidget/info', data);
};

// 获取标的类型接口
export const getProductsRequest = function () {
    return AjaxUtils.doPostRequest('/borrow/borrow/getProducts');
};

// 获取红包/加息券规则列表接口
export const getRedpackCouponListRequest = function (data) {
    return AjaxUtils.doPostRequest('/rules/coupon/index', data);
};

// 获取任务规则列表接口
export const getTaskListRequest = function (data) {
    return AjaxUtils.doPostRequest('/rules/task/index', data);
};

// 保存拆礼包规则接口
export const savePackFormRequest = function (data) {
    return AjaxUtils.doPostRequest('/activity/packWidget/save', data);
};



/********************************************/
// 排行榜规则页面

// 获取排行榜规则接口
export const getRankInfoRequest = function (data) {
    return AjaxUtils.doPostRequest('/activity/rankWidget/info', data);
};

// 保存排行榜规则接口
export const saveRankFormRequest = function (data) {
    return AjaxUtils.doPostRequest('/activity/rankWidget/save', data);
};