import { userIntegralQuery,exportIntegralRecord} from '../services/api';

export default {
  namespace: 'userIntegralQuery',
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(userIntegralQuery, payload);

      yield put({
        type: 'save',
        payload: response,
      });
    },
      *export({payload},{call,put}){
      const response=yield call(exportIntegralRecord,payload)
      }
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
