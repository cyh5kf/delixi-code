import { commodityDetail} from '../services/api';

export default {
    namespace: 'commodityDetail',
    state: {
        data: {
            detail:{}
        },
    },

    effects: {
        *detail({ payload }, { call, put }) {
            const response = yield call(commodityDetail, payload);
            yield put({
                type: 'saveDetail',
                payload: response,
            });
        },
    },
    reducers: {
        saveDetail(state, action){
            return {
                detail: action.payload.data||{},
            };
        },
    },
};
