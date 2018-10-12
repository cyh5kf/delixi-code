import { growthSearch,exportGrowthFile} from '../services/api';
import {message} from 'antd';

export default {
    namespace: 'growthSearch',
    state: {
        data: {
            list: [],
            pagination: {},
        },
    },
    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(growthSearch, payload);
            const {
                error_code,
                msg,
                data,
            }=response
            if(msg && !data.length){
                message.error(msg);
            }
            yield put({
                type: 'save',
                payload: response,
            });
        },
        *exportFile({ payload }, { call, put }) {
            const response = yield call(exportGrowthFile, payload);
        },
    },
  reducers: {
    save(state, action) {
        action.payload.list=action.payload.data
        const {
            page=1,page_count=0,total=0
        }=action.payload.pagination||{};

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
