import { fetchChart } from '../services/api';
import { requestUrl } from '../utils/const';

export default {
  namespace: 'bi',

  state: {
    repeatMoneyData: {},
    collectionTotalData: {},
    registRealNameRateData: {},
    registTenderRateData: {},
    registrationsData: {},
    acountMoneyData: {},
    stationFundData: {},
    grandAvgTotalData: {},
    plantInMoneyData: {},
    repaymentMoneyData: {},
    rechargeMoneyData: {},
    extractMoneyData: {},
    predictData: {},
    repeatPeopleNumberData: {},
    repaymentPeopleNumberData: {},
    rechargeNumberData: {},
    reInvestmentNumberData: {},
    accountNumberData: {},
    investmentNumberData: {},
    cashNumberData: {},
    newInvestmentNumberData: {},
    logonNumberData: {},
    repaymentNumberData: {},
    recoverSumListData: {},
    remainRateListData: {},
  },

  effects: {
    *fetch0({ payload }, { call, put }) {
      const type = payload.type;
      const response = yield call(fetchChart, payload);
      yield put({
        type: 'save',
        payload: {
          ...response,
          type
        },
      });
    },
    *fetch1({ payload }, { call, put }) {
      const type = payload.type;
      const response = yield call(fetchChart, payload);
      yield put({
        type: 'save',
        payload: {
          ...response,
          type
        },
      });
    },
    *fetch2({ payload }, { call, put }) {
      const type = payload.type;
      const response = yield call(fetchChart, payload);
      yield put({
        type: 'save',
        payload: {
          ...response,
          type
        },
      });
    },
    *fetch3({ payload }, { call, put }) {
      const type = payload.type;
      const response = yield call(fetchChart, payload);
      yield put({
        type: 'save',
        payload: {
          ...response,
          type
        },
      });
    },
    *fetch4({ payload }, { call, put }) {
      const type = payload.type;
      const response = yield call(fetchChart, payload);
      yield put({
        type: 'save',
        payload: {
          ...response,
          type
        },
      });
    },
    *fetch5({ payload }, { call, put }) {
      const type = payload.type;
      const response = yield call(fetchChart, payload);
      yield put({
        type: 'save',
        payload: {
          ...response,
          type
        },
      });
    },
    *fetch6({ payload }, { call, put }) {
      const type = payload.type;
      const response = yield call(fetchChart, payload);
      yield put({
        type: 'save',
        payload: {
          ...response,
          type
        },
      });
    },
    *fetch7({ payload }, { call, put }) {
      const type = payload.type;
      const response = yield call(fetchChart, payload);
      yield put({
        type: 'save',
        payload: {
          ...response,
          type
        },
      });
    },
    *fetch8({ payload }, { call, put }) {
      const type = payload.type;
      const response = yield call(fetchChart, payload);
      yield put({
        type: 'save',
        payload: {
          ...response,
          type
        },
      });
    },
    *fetch9({ payload }, { call, put }) {
      const type = payload.type;
      const response = yield call(fetchChart, payload);
      yield put({
        type: 'save',
        payload: {
          ...response,
          type
        },
      });
    },
    *fetch10({ payload }, { call, put }) {
      const type = payload.type;
      const response = yield call(fetchChart, payload);
      yield put({
        type: 'save',
        payload: {
          ...response,
          type
        },
      });
    },
    *fetch11({ payload }, { call, put }) {
      const type = payload.type;
      const response = yield call(fetchChart, payload);
      yield put({
        type: 'save',
        payload: {
          ...response,
          type
        },
      });
    },
    *fetch12({ payload }, { call, put }) {
      const type = payload.type;
      const response = yield call(fetchChart, payload);
      yield put({
        type: 'save',
        payload: {
          ...response,
          type
        },
      });
    },
    *fetch13({ payload }, { call, put }) {
      const type = payload.type;
      const response = yield call(fetchChart, payload);
      yield put({
        type: 'save',
        payload: {
          ...response,
          type
        },
      });
    },
    *fetch14({ payload }, { call, put }) {
      const type = payload.type;
      const response = yield call(fetchChart, payload);
      yield put({
        type: 'save',
        payload: {
          ...response,
          type
        },
      });
    },
    *fetch15({ payload }, { call, put }) {
      const type = payload.type;
      const response = yield call(fetchChart, payload);
      yield put({
        type: 'save',
        payload: {
          ...response,
          type
        },
      });
    },
    *fetch16({ payload }, { call, put }) {
      const type = payload.type;
      const response = yield call(fetchChart, payload);
      yield put({
        type: 'save',
        payload: {
          ...response,
          type
        },
      });
    },
    *fetch17({ payload }, { call, put }) {
      const type = payload.type;
      const response = yield call(fetchChart, payload);
      yield put({
        type: 'save',
        payload: {
          ...response,
          type
        },
      });
    },
    *fetch18({ payload }, { call, put }) {
      const type = payload.type;
      const response = yield call(fetchChart, payload);
      yield put({
        type: 'save',
        payload: {
          ...response,
          type
        },
      });
    },
    *fetch19({ payload }, { call, put }) {
      const type = payload.type;
      const response = yield call(fetchChart, payload);
      yield put({
        type: 'save',
        payload: {
          ...response,
          type
        },
      });
    },
    *fetch20({ payload }, { call, put }) {
      const type = payload.type;
      const response = yield call(fetchChart, payload);
      yield put({
        type: 'save',
        payload: {
          ...response,
          type
        },
      });
    },
    *fetch21({ payload }, { call, put }) {
      const type = payload.type;
      const response = yield call(fetchChart, payload);
      yield put({
        type: 'save',
        payload: {
          ...response,
          type
        },
      });
    },
    *fetch22({ payload }, { call, put }) {
      const type = payload.type;
      const response = yield call(fetchChart, payload);
      yield put({
        type: 'save',
        payload: {
          ...response,
          type
        },
      });
    },
    *fetch23({ payload }, { call, put }) {
      const type = payload.type;
      const response = yield call(fetchChart, payload);
      yield put({
        type: 'save',
        payload: {
          ...response,
          type
        },
      });
    },
    *fetch24({ payload }, { call, put }) {
      const type = payload.type;
      const response = yield call(fetchChart, payload);
      yield put({
        type: 'save',
        payload: {
          ...response,
          type
        },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      let data = {};
      switch (payload.type) {
        case requestUrl.repeatMoney:
          data.repeatMoneyData = payload.data;
          break;
        case requestUrl.collectionTotal:
          data.collectionTotalData = payload.data;
          break;
        case requestUrl.registRealNameRate:
          data.registRealNameRateData = payload.data;
          break;
        case requestUrl.registTenderRate:
          data.registTenderRateData = payload.data;
          break;
        case requestUrl.registrations:
          data.registrationsData = payload.data;
          break;
        case requestUrl.acountMoney:
          data.acountMoneyData = payload.data;
          break;
        case requestUrl.stationFund:
          data.stationFundData = payload.data;
          break;
        case requestUrl.grandAvgTotal:
          data.grandAvgTotalData = payload.data;
          break;
        case requestUrl.plantInMoney:
          data.plantInMoneyData = payload.data;
          break;
        case requestUrl.repaymentMoney:
          data.repaymentMoneyData = payload.data;
          break;
        case requestUrl.rechargeMoney:
          data.rechargeMoneyData = payload.data;
          break;
        case requestUrl.extractMoney:
          data.extractMoneyData = payload.data;
          break;
        case requestUrl.predict:
          data.predictData = payload.data;
          break;
        case requestUrl.repeatPeopleNumber:
          data.repeatPeopleNumberData = payload.data;
          break;
        case requestUrl.repaymentPeopleNumber:
          data.repaymentPeopleNumberData = payload.data;
          break;
        case requestUrl.rechargeNumber:
          data.rechargeNumberData = payload.data;
          break;
        case requestUrl.reInvestmentNumber:
          data.reInvestmentNumberData = payload.data;
          break;
        case requestUrl.accountNumber:
          data.accountNumberData = payload.data;
          break;
        case requestUrl.investmentNumber:
          data.investmentNumberData = payload.data;
          break;
        case requestUrl.cashNumber:
          data.cashNumberData = payload.data;
          break;
        case requestUrl.newInvestmentNumber:
          data.newInvestmentNumberData = payload.data;
          break;
        case requestUrl.logonNumber:
          data.logonNumberData = payload.data;
          break;
        case requestUrl.repaymentNumber:
          data.repaymentNumberData = payload.data;
          break;
        case requestUrl.recoverSumList:
          data.recoverSumListData = payload.data;
          break;
        case requestUrl.remainRateList:
          data.remainRateListData = payload.data;
          break;
      }
      return {
        ...state,
        ...data,
      };
    },

    clear(state, { payload }) {
      switch (payload.type) {
        case requestUrl.repeatMoney:
          return {
            repeatMoneyData: {},
            ...state
          }
          break;
        case requestUrl.collectionTotal:
          return {
            collectionTotalData: {},
            ...state
          }
          break;
        case requestUrl.registRealNameRate:
          return {
            registRealNameRateData: {},
            ...state
          }
          break;
        case requestUrl.registTenderRate:
          return {
            registTenderRateData: {},
            ...state
          }
          break;
        case requestUrl.registrations:
          return {
            registrationsData: {},
            ...state
          }
          break;
        case requestUrl.acountMoney:
          return {
            acountMoneyData: {},
            ...state
          }
          break;
        case requestUrl.stationFund:
          return {
            stationFundData: {},
            ...state
          }
          break;
        case requestUrl.grandAvgTotal:
          return {
            grandAvgTotalData: {},
            ...state
          }
          break;
        case requestUrl.plantInMoney:
          return {
            plantInMoneyData: {},
            ...state
          }
          break;
        case requestUrl.repaymentMoney:
          return {
            repaymentMoneyData: {},
            ...state
          }
          break;
        case requestUrl.rechargeMoney:
          return {
            rechargeMoneyData: {},
            ...state
          }
          break;
        case requestUrl.extractMoney:
          return {
            extractMoneyData: {},
            ...state
          }
          break;
        case requestUrl.predict:
          return {
            predictData: {},
            ...state
          }
          break;
        case requestUrl.repeatPeopleNumber:
          return {
            repeatPeopleNumberData: {},
            ...state
          }
          break;
        case requestUrl.repaymentPeopleNumber:
          return {
            repaymentPeopleNumberData: {},
            ...state
          }
          break;
        case requestUrl.rechargeNumber:
          return {
            rechargeNumberData: {},
            ...state
          }
          break;
        case requestUrl.reInvestmentNumber:
          return {
            reInvestmentNumberData: {},
            ...state
          }
          break;
        case requestUrl.accountNumber:
          return {
            accountNumberData: {},
            ...state
          }
          break;
        case requestUrl.investmentNumber:
          return {
            investmentNumberData: {},
            ...state
          }
          break;
        case requestUrl.cashNumber:
          return {
            cashNumberData: {},
            ...state
          }
          break;
        case requestUrl.newInvestmentNumber:
          return {
            newInvestmentNumberData: {},
            ...state
          }
          break;
        case requestUrl.logonNumber:
          return {
            logonNumberData: {},
            ...state
          }
          break;
        case requestUrl.repaymentNumber:
          return {
            repaymentNumberData: {},
            ...state
          }
          break;
        case requestUrl.recoverSumList:
          return {
            recoverSumListData: {},
            ...state
          }
          break;
        case requestUrl.remainRateList:
          return {
            remainRateListData: {},
            ...state
          }
        break;
      }
    },
  }
};
