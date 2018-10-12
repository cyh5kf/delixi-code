import { integralRecord} from '../services/api';

export default {
  namespace: 'integralRecord',
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(integralRecord, payload);

      yield put({
        type: 'save',
        payload: response,
      });
    },
  },
  reducers: {
    save(state, action) {
        action.payload.list=action.payload.data
        const {
          page=1,page_count=0,total=0
        }=action.payload.pagination||{}
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
