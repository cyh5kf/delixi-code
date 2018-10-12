import {commodityManagement, commodityRemove} from '../services/api';

export default {
    namespace: 'commodityManagement',
    state: {
        data: {
            list: [],
            pagination: {},
        },
    },

    effects: {
        *fetch({payload}, {call, put}) {
            const response = yield call(commodityManagement, payload);

            yield put({
                type: 'save',
                payload: response,
            });
        },
        *remove({payload}, {call, put}){
            const response = yield call(commodityRemove, payload);
        }
    },
    reducers: {
        save(state, action) {
            action.payload.list = action.payload.data.list
            const {
                page = 1, page_count = 0, total = 0
            } = action.payload.data.pagination || {}
            action.payload.data.pagination = {
                current: page * 1,
                total
            }
            return {
                data: action.payload.data
            };
        },
    },
};
