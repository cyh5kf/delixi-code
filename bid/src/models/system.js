import { routerRedux } from 'dva/router';
import { menuAll, saveSystemMenu, menuDelete, updateSystemMenu } from '../services/api';

export default {
    namespace: 'system',

    state: {
        menuAll: null
    },

    effects: {
        *queryMenuAll({ payload }, { call, put }) {
            const response = yield call(menuAll, payload);
            yield put({
                type: 'changeMenuAll',
                payload: response,
            });
        },
        *saveSystemMenu({ payload }, { call, put }) {
            const response = yield call(saveSystemMenu, payload);
            yield put({
                type: 'changeMenuAll',
                payload: response,
            });
        },
        *menuDelete({ payload }, { call, put }) {
            yield call(menuDelete, payload);
        },
        *updateSystemMenu({ payload }, { call, put }) {
            yield call(updateSystemMenu, payload);
        },
    },

    reducers: {
        changeMenuAll(state, { payload }) {
            return {
                ...state,
                menuAll: payload.rows,
            };
        },
    },
};
