import { routerRedux } from 'dva/router';
import { queryRule, removeRule, addRule } from '../services/api';

export default {
    namespace: 'integral',

    state: {
    },

    effects: {
        *openFormPage({ payload }, { call, put }) {
          const editId=payload.row&&payload.row.id ||'';

          yield put(routerRedux.push(`/integral/addOrEditCommodity${editId?'?editId='+editId:''}`));
        },
    },

    reducers: {

    },
};
