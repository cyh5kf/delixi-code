import { recordExchange,getDetail} from '../services/api';

export default {
  namespace: 'recordExchange',
  state: {
      data: {
        list: [],
        pagination: {},
      },
      detail:{

      }
  },

  effects: {
      *fetch({ payload }, { call, put }) {
        const response = yield call(recordExchange, payload);

        yield put({
          type: 'save',
          payload: response,
        });
      },
      *getDetail({ payload }, { call, put }) {
          const response = yield call(getDetail, payload);

          yield put({
              type: 'saveDetail',
              payload: response,
          });
      },
  },
  reducers: {
      save(state, action) {
          action.payload.list=action.payload.data.list
          const {
            page=1,page_count=0,total=0
          }=action.payload.data.pagination||{}
          action.payload.pagination={
            current:page*1,
              total
          }
        return {
            ...state,
            data: action.payload
        };
      },
      saveDetail(state, action) {
          return {
              ...state,
              detail: action.payload.data
          };
      },
  },
};
