import { getUserMenu } from '../services/api';
import { setMenu } from '../utils/authority';

export default {
  namespace: 'global',

  state: {
    collapsed: false,
    userMenu: []
  },

  effects: {
    *getUserMenu({ payload }, { call, put }) {
      const response = yield call(getUserMenu, payload);
      if (response.success) {
        setMenu(response.data)
      }
      yield put({
          type: 'changeUserMenu',
          payload: response,
      });
    },
  },

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
    changeUserMenu(state, { payload }) {
      return {
        ...state,
        userMenu: payload,
      };
    },
  },

  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
