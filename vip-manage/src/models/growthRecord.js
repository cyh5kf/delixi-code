import { growthRecord} from '../services/api';

export default {
  namespace: 'growthRecord',
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(growthRecord, payload);

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
