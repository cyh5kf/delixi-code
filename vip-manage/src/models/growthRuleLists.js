import { growthRuleLists,editGrowthRule,startStopRule} from '../services/api';
import {message} from 'antd';

export default {
  namespace: 'growthRuleLists',
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
      *fetch({ payload }, { call, put }) {
        const response = yield call(growthRuleLists, payload);

        yield put({
          type: 'save',
          payload: response,
        });
      },
      *add({ payload }, { call, put }) {
          const response = yield call(editGrowthRule, payload);
      },
      *startStop({ payload }, { call, put }) {
          const response = yield call(startStopRule, payload);
          if(response.error_code=='1'){
              message.error(response.msg);
          }else{
              message.success('操作成功');
          }
      },
  },
  reducers: {
      save(state, action) {
          action.payload.list=action.payload.data
          const {
              page,page_count,total=0
          }=action.payload.pagination
          action.payload.pagination={
              current:page*1,
              total
          }
          return {
            data: action.payload
          };
      },
  },
};
