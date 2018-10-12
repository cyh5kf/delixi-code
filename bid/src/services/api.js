import { stringify } from 'qs';
import request from '../utils/request';
import { gettoken } from '@/utils/authority';

//获得系统菜单
export async function getmenu(params) {
  return request('app/bidmenu/getMeunList', {
    method: 'POST',
    body: params,
  });
}
//获得银行名称
export async function getbank(params) {
  return request('app/companybank/banklist', {
    method: 'POST',
    body: params,
  });
}

export async function addcompany(params) {
  return request('app/company/add', {
    method: 'POST',
    body: params,
  });
}
export async function searchcompany(params){
  return request('app/company/list',{
    method:'POST',
    body:params,
  });
}

export async function handlecompany(params){
  return request('app/company/detail',{
    method:'POST',
    body:params,
  });
}

//企业列表>开户
export async function openAccount(params){
  return request('app/company/openAccount', {
    method: 'POST',
    body: params,
  });
}

export async function updatecompany(params){
  return request('app/company/update', {
    method: 'POST',
    body: params,
  });
}
//企业渠道>列表
export async function channelcompanylist(params){
  return request('app/companybank/list', {
    method: 'POST',
    body: params,
  });
}

//企业渠道>添加
export async function channelcompanycreate(params){
  return request('app/companybank/add', {
    method: 'POST',
    body: params,
  });
}


//企业渠道>细节
export async function channelcompanyinfo(params){
  return request('app/companybank/detail', {
    method: 'POST',
    body: params,
  });
}

//企业渠道>更新
export async function updatechannelcompany(params){
  return request('app/companybank/update', {
    method: 'POST',
    body: params,
  });
}

//企业渠道>更改状态
export async function updatestatuschannelcompany(params){
  return request('app/companybank/valid', {
    method: 'POST',
    body: params,
  });
}

//企业渠道>删除
export async function deletechannelcompany(params){
  return request('app/companybank/delete', {
    method: 'POST',
    body: params,
  });
}

//供应链企业列表
export async function gylsearchcompany(params){
  return request('app/assetBorrow/queryRzBmAssetBorrow',{
    method:'POST',
    body:params,
  });
}

//供应链企业删除
export async function deletecompany(params){
  return request('app/assetBorrow/delete',{
    method:'POST',
    body:params,
  });
}

//供应链企业列表添加>查询企业
export async function gylcreatesearchcompany(params){
  return request('app/assetCompany/queryAssetStatus',{
    method:'POST',
    body:params,
  });
}

//出账至查询企业
export async function findCompany(params){
  return request('app/company/findCompany',{
    method:'POST',
    body:params,
  });
}
//出账至查询保理企业
export async function findCompanyBank(params){
  return request('app/company/findCompanyBank',{
    method:'POST',
    body:params,
  });
}

//供应链企业列表>录入
export async function savecompanyzichan(params){
  return request('app/assetBorrow/addRzBmAssetBorrow',{
    method:'POST',
    body:params,
  });
}

//供应链企业>录入并上标
export async function submitcompanyzichan(params){
  return request('app/assetBorrow/RzBmAssetBorrowPublish',{
    method:'POST',
    body:params,
  });
}
//供应链企业>上标推送
export async function pushcompany(params){
  return request('app/company/pushBid',{
    method:'POST',
    body:params,
  });
}
//供应链企业>修改
export async function updatecompanyzichan(params){
  return request('app/assetBorrow/updateRzBmAssetBorrow',{
    method:'POST',
    body:params,
  });
}
//供应链企业，详情
export async function companydetaleinfo(params){
  return request('app/assetBorrow/queryContractDetailInfo',{
    method:'POST',
    body:params,
  });
}
//供应链企业，批量删除
// export async function deletecompany(params){
//   return request('app/company/deleteBorrow',{
//     method:'POST',
//     body:params,
//   });
// }
//供应链企业，id查询
export async function searchcompanyid(params){
  return request('app/assetBorrow/queryRzBmAssetBorrow',{
    method:'POST',
    body:params,
  });
}

// 权限菜单列表
export async function menuAll(params){
  return request('app/menu/menuAll',{
    method:'POST',
    body:params,
  });
}

// 权限菜单添加
export async function saveSystemMenu(params){
  return request('app/menu/saveSystemMenu',{
    method:'POST',
    body:params,
  });
}

// 权限菜单删除
export async function menuDelete(params){
  return request('app/menu/menuDelete',{
    method:'POST',
    body:params,
  });
}

// 权限菜单编辑
export async function updateSystemMenu(params){
  return request('app/menu/updateSystemMenu',{
    method:'POST',
    body:params,
  });
}

// 获取用户权限菜单
export async function getUserMenu(params){
  return request('app/menu/userMenu',{
    method:'POST',
    body:params,
  });
}

// 登录
export async function login(params){
  return request('app/bossUser/login',{
    method:'POST',
    body:params,
  });
}

// 发送短信验证码
export async function sendVcode(params){
  return request('app/bossUser/sendVcode',{
    method:'POST',
    body:params,
  });
}

// 退出
export async function logout(params){
  return request('app/bossUser/logout',{
    method:'POST',
    body:params,
  });
}

//权限菜单>用户管理>列表
export async function usercontrollist(params){
  return request('app/bossUser/bossUserList',{
    method:'POST',
    body:params,
  });
}

//权限菜单>用户管理>添加用户
export async function addusercontrol(params){
  return request('app/bossUser/saveBossUser',{
    method:'POST',
    body:params,
  });
}

//权限菜单>用户管理>用户禁用
export async function disableusercontrol(params){
  return request('app/bossUser/updStatus',{
    method:'POST',
    body:params,
  });
}

//权限菜单>用户管理>用户密码重置
export async function respwdusercontrol(params){
  return request('app/bossUser/resetPwd',{
    method:'POST',
    body:params,
  });
}

//权限菜单>用户管理>用户资料更改
export async function updateusercontrol(params){
  return request('app/bossUser/updateBossUser',{
    method:'POST',
    body:params,
  });
}



//权限菜单>角色管理>列表
export async function rolecontrollist(params){
  return request('app/role/systemRoleList',{
    method:'POST',
    body:params,
  });
}

//权限菜单>角色管理>删除角色
export async function deleterolecontrol(params){
  return request('app/role/roleDelete',{
    method:'POST',
    body:params,
  });
}

//权限菜单>角色管理>新增角色
export async function createrolecontrol(params){
  return request('app/role/saveSystemRole',{
    method:'POST',
    body:params,
  });
}

//权限菜单>角色管理>角色菜单更改授权
export async function impowerrolecontrol(params){
  return request('app/role/updateSystemRole',{
    method:'POST',
    body:params,
  });
}

//权限菜单>角色管理>得到角色拥有的菜单
export async function getusermenu(params){
  return request('app/menu/userMenu',{
    method:'POST',
    body:params,
  });
}

//cg1.0车抵贷列表
export async function carlist(params){
  return request('app/asset/car/list',{
    method:'POST',
    body:params,
  });
}
//cg1.0车抵贷详情
export async function carinfo(params){
  return request('app/asset/car/'+params.id,{
    method:'POST',
    body:params,
  });
}
//cg1.0车抵贷详情
export async function cardelete(params){
  return request('app/asset/car/delete/'+params.id,{
    method:'POST',
    body:params,    
  });
}
//上传
export async function upload(params){
  return request('app/asset/car/import',{
    method:'POST',
    body:params,    
  },true);
}

//保险列表
export async function insurancelist(params){
  return request('app/asset/currency/list',{
    method:'POST',
    body:params,
  });
}
//保险删除
export async function insurancedelete(params){
  return request('app/asset/currency/delete/'+params.id,{
    method:'POST',
    body:params,    
  });
}

//上传
export async function insuranceimport(params){
  return request('app/asset/currency/import',{
    method:'POST',
    body:params,    
  },true);
}
//保险详情
export async function insuranceinfo(params){
  return request('app/asset/currency/'+params.id,{
    method:'POST',
    body:params,
  });
}

//保险详情
export async function getfile(params){
  var token;
  var options;

  token = JSON.parse(gettoken())?JSON.parse(gettoken()).token:''

    const data =await fetch(`${window.location.origin}/app${params.url}`,{
      method:'POST',
      headers:{
        'Content-Disposition':'attachment;filename=company.xlsx',
        'Content-Type':'application/x-www-form-urlencoded',
        'accept':'attachment;filename=company.xlsx'
      },
      body:stringify({token,...params})
    }).then(response => response.blob())
    .then(blob => {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = "company.xlsx";
        a.click();                    
    });
}

//修改企业名称
export async function updCompanyName(params){
  return request('app/company/updCompanyName',{
    method:'POST',
    body:params,
  });
}
//企业 /开户
export async function openCompanyAcct(params){
  return request('app/company/openCompanyAcct',{
    method:'POST',
    body:params,
  });
}
//企业 /修改
export async function updCompany(params){
  return request('app/company/updCompany',{
    method:'POST',
    body:params,
  });
}

//供应链企业撤标
export async function cancelCompany(params){
  return request('app/assetBorrow/revoke/'+params.id,{
    method:'POST',
    body:params,
  });
}
//保险撤标
export async function cancelInsurance(params){
  return request('app/asset/currency/revoke/'+params.id,{
    method:'POST',
    body:params,
  });
}
//车抵贷撤标
export async function cancelCar(params){
  return request('app/asset/car/revoke/'+params.id,{
    method:'POST',
    body:params,
  });
}

//企业资产来源
export async function queryAssetArea(){
  return request('app/assetCompany/queryAssetArea',{
    method:'POST',
    body:{},
  });
}

//修改来源名称
export async function updateSource(params){
  return request('app/assetBorrow/updateSource',{
    method:'POST',
    body:params,
  });
}