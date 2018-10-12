import { editGrowthRule} from '../services/api';
import {message} from 'antd';

export default {
  namespace: 'editGrowthRule',
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(editGrowthRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },
  reducers: {
    save(state, action) {
      if(action.payload.error_code==1){
          message.error(action.payload.msg)
      }else{
          return {
              data: action.payload
          };
      }
    },
  },
};
