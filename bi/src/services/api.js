import { stringify } from 'qs';
import request from '../utils/request';
import { requestUrl } from '../utils/const';
const prefix='apiPc';

//用户登录接口
export async function login(params) {
  return request(`${prefix}/login`, {
    method: 'POST',
    body: params
  });
}

//发送验证码接口
export async function sendVcode(params) {
  return request(`${prefix}/sendVcode.html?${stringify(params)}`);
}

//查询各个图表数据接口
export async function fetchChart(params) {
  const { type } = params;
  delete params.type;
  let url = '';
  switch (type) {
    case requestUrl.repeatMoney:
      url = 'bi/repeatMoney';
      break;
    case requestUrl.collectionTotal:
      url = 'bi/collectionTotal';
      break;
    case requestUrl.registRealNameRate:
      url = 'conversionRate/getRealNameRateList';
      break;
    case requestUrl.registTenderRate:
      url = 'conversionRate/getRegistTenderRateList';
      break;
    case requestUrl.registrations:
      url = 'comprehensive/registrations';
      break;
    case requestUrl.acountMoney:
      url = 'bi/acountMoney';
      break;
    case requestUrl.stationFund:
      url = 'bi/stationFund';
      break;
    case requestUrl.grandAvgTotal:
      url = 'bi/grandAvgTotal';
      break;
    case requestUrl.plantInMoney:
      url = 'bi/plantInMoney';
      break;
    case requestUrl.repaymentMoney:
      url = 'bi/repaymentMoney.html';
      break;
    case requestUrl.rechargeMoney:
      url = 'bi/rechargeMoney.html';
      break;
    case requestUrl.extractMoney:
      url = 'bi/extractMoney.html';
      break;
    case requestUrl.predict:
      url = 'bi/predict.html';
      break;
    case requestUrl.repeatPeopleNumber:
      url = 'bi/repeatPeopleNumber.html';
      break;
    case requestUrl.repaymentPeopleNumber:
      url = 'bi/repaymentPeopleNumber.html';
      break;
    case requestUrl.rechargeNumber:
      url = 'comprehensive/rechargeNumber';
      break;
    case requestUrl.reInvestmentNumber:
      url = 'comprehensive/reInvestmentNumber';
      break;
    case requestUrl.accountNumber:
      url = 'comprehensive/accountNumber';
      break;
    case requestUrl.investmentNumber:
      url = 'comprehensive/investmentNumber';
      break;
    case requestUrl.cashNumber:
      url = 'comprehensive/cashNumber';
      break;
    case requestUrl.newInvestmentNumber:
      url = 'comprehensive/newInvestmentNumber';
      break;
    case requestUrl.logonNumber:
      url = 'comprehensive/logonNumber';
      break;
    case requestUrl.repaymentNumber:
      url = 'comprehensive/repaymentNumber';
      break;
    case requestUrl.recoverSumList:
      url = 'conversionRate/getRecoverSumList';
      break;
    case requestUrl.remainRateList:
      url = 'conversionRate/getRemainRateList';
      break;
  }

  return request(`${prefix}/${url}`, {
    method: 'POST',
    body: params
  });
}
export async function rtwfetch(params) {
  const {idx} = params;
  delete params.idx;
  let url = '';
  const type = 0;
  switch (idx){
    case 0:
      url = 'bi/realTimeTrade'      
    break;
    case 1:
      url = 'bi/monitorRecharge'
    break;
    case 2:
      url = 'bi/monitorCash'
    break;
    case 3:
      url = 'bi/monitorStationFund'
    break;
    case 4:
      url = 'bi/collectingAmount'
    break;
    case 5:
      url = 'bi/realIncome'
    break;
    case 6:
      url = 'bi/pageView'
    break;
    case 7:
      url = 'bi/uniqueVisitor'
    break;
    case 8:
      url=''
    break;
  }
  // url = 'bi/uniqueVisitor'
  
  return request(`${prefix}/${url}`,{
    method:'POST',
    body:params
  })
}