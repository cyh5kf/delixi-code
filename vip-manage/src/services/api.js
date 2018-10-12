import {stringify} from 'qs';
import request from '../utils/request';
const prefix = '/index.php?_url='

const createRequest = function (url, params, method) {
    return request(`${prefix}${url}`, {
        method: method || 'POST',
        body: params
    });
}

//用户登录接口
export async function login(params) {
    return request(`${prefix}/admin/root/login`, {
        method: 'POST',
        body: params
    });
}

//用户退出接口
export async function loginOut(params) {
    return request(`${prefix}/admin/root/logout`, {
        method: 'POST'
    });
}

//成长值查询接口
export async function growthSearch(params) {
    return request(`${prefix}/user/grow`, {
        method: 'POST',
        body: {
            ...params
        }
    });
}


//成长值导出接口
export async function exportGrowthFile(params) {
    return createRequest('/user/grow/export', params, 'GET');
}

//成长值记录接口
export async function growthRecord(params) {
    return request(`${prefix}/user/grow/flow/${params.uid}`, {
        method: 'POST',
        body: {
            ...params
        }
    });
}


//会员成长值规则列表接口
export async function growthRuleLists(params) {
    return createRequest('/user/grow/rule', params, 'POST');
}


//添加/编辑会员规则
export async function editGrowthRule(params) {
    return createRequest('/user/grow/saverule', params, 'POST');
}

//启用/停用会员规则
export async function startStopRule(params) {
    return createRequest('/user/grow/status', params, 'POST');
}


//会员等级列表
export async function levelLists(params) {
    return createRequest('/user/level/grade', params, 'POST');
}


//添加/编辑会员等级
export async function addLevel(params) {
    return createRequest('/user/level/savegrade', params, 'POST');
}



//启/停会员等级
export async function startStopLevel(params) {
    return request(`${prefix}/user/level/status`, {
        method: 'POST',
        body: {
            ...params
        }
    });
}

//会员特权列表
export async function privilegeLists(params) {
    return request(`${prefix}/user/level/power`, {
        method: 'POST',
        body: {
            ...params
        }
    });
}

//添加特权特权
export async function addPrivilege(params) {
    return request(`${prefix}/user/level/savepower`, {
        method: 'POST',
        body: {
            ...params
        }
    });
};

//启用/停用会员特权
export async function startStopPrivilege(params) {
    return request(`${prefix}/user/level/status`, {
        method: 'POST',
        body: {
            ...params
        }
    });
};


//福利礼包列表
export async function welfarePacketLists(params) {
    return createRequest('/user/gift/list', params, 'POST');
}


//启用/停用福利礼包
export async function startStopWelfare(params) {
    return createRequest('/user/gift/status', params, 'POST');
}

//编辑/添加福利礼包
export async function addOrEditWelfare(params) {
    return createRequest('/goods/goods/saveGift', params, 'POST');
}


//福利礼包详情
export async function getWelfareDetail(params) {
    return createRequest('/goods/goods/detailGift', params, 'POST');
}


//积分规则列表
export async function integralRulesLists(params) {
    return request(`${prefix}/user/integral/configs`, {
        method: 'POST',
        body: {
            ...params
        }
    });
}

//编辑/添加积分规则
export async function editIntegralRule(params) {
    return request(`${prefix}/user/integral/saveConfig`, {
        method: 'POST',
        body: {
            ...params
        }
    });
}

//用户积分记录查询
export async function userIntegralQuery(params) {
    return request(`${prefix}/user/integral/list`, {
        method: 'POST',
        body: {
            ...params
        }
    });
}
//导出用户积分记录
export async function exportIntegralRecord(params) {
    return createRequest('/user/integral/export', params, 'GET');
}

//用户积分记录
export async function integralRecord(params) {
    return request(`${prefix}/user/integral/flow/${params.uid}`, {
        method: 'POST',
        body: {
            ...params
        }
    });
}

//积分商品类别
export async function commodityCategory(params) {
    return request(`${prefix}/goods/category/index`, {
        method: 'POST',
        body: {
            ...params
        }
    });
}

//商品类别编辑
export async function editCommodityCategory(params) {
    return request(`${prefix}/goods/category/edit`, {
        method: 'POST',
        body: {
            ...params
        }
    });
}

//商品分类添加
export async function addCommodityCategory(params) {
    return request(`${prefix}/goods/category/add`, {
        method: 'POST',
        body: {
            ...params
        }
    });
}
//商品分类禁用/启用
export async function commodityCategoryStatus(params) {
    return request(`${prefix}/goods/category/status`, {
        method: 'POST',
        body: {
            ...params
        }
    });
}

//商品分类父类分类
export async function getCategoryTree(params){
    return request(`${prefix}/goods/category/getTree`, {
        method: 'POST',
        body: {
            ...params
        }
    });
}


//商品管理
export async function commodityManagement(params) {
    return request(`${prefix}/goods/goods/index`, {
        method: 'POST',
        body: {
            ...params
        }
    });
}

//获取商品兑换记录
export async function getDetail(params) {
    return request(`${prefix}/goods/order/detail`, {
        method: 'POST',
        body: {
            ...params
        }
    });
}



//上架/下架
export async function commodityRemove(params) {
    return createRequest('/goods/goods/up', params, 'POST');
}


//商品添加
export async function addOrEditCommodity(params) {
    return createRequest('/goods/goods/save', params, 'POST');
}
//商品详情
export async function commodityDetail(params) {
    return createRequest('/goods/goods/detail', params, 'POST');
}


//获取商品分类
export async function getCategory(params) {
    return createRequest('/goods/category/getTree', params, 'POST');
}

//获取会员等级列表
export async function getLevelPairs(params) {
    return createRequest('/user/level/getPairs', params, 'POST');
}

//获取商品填充字段
export async function getCustomFields(params) {
    return createRequest('/goods/goods/getCustomFields', params, 'POST');
}


//获取商品详情
export async function getCommodityDetail(params) {
    return createRequest('/goods/goods/detail', params, 'POST');
}


//商品兑换记录
export async function recordExchange(params) {
    return request(`${prefix}/goods/order/index`, {
        method: 'POST',
        body: {
            ...params
        }
    });
}


export async function queryRule(params) {
    return request(`/${prefix}/rule&${stringify(params)}`);
}

export async function removeRule(params) {
    return request('/api/rule', {
        method: 'POST',
        body: {
            ...params,
            method: 'delete',
        },
    });
}

export async function addRule(params) {
    return request('/api/rule', {
        method: 'POST',
        body: {
            ...params,
            method: 'post',
        },
    });
}

export async function queryFakeList(params) {
    return request(`/api/fake_list?${stringify(params)}`);
}

//登录接口
export async function fakeAccountLogin(params) {
    return request(`${prefix}/admin/root/login`, {
        method: 'POST',
        body: params,
    });
}
