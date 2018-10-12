import { routerRedux } from 'dva/router';
import { login, loginOut } from '../services/api';
import { setAuthority, removeAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);
      response.data.username = payload.username;
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.error_code === 0) {
        reloadAuthorized();
        yield put(routerRedux.push('/'));
      }
    },

    *logout(_, { call, put, select }) {
        const response = yield call(loginOut);
        yield put({
          type: 'changeLoginOutStatus',
          payload: {
            status: false
          },
        });
        reloadAuthorized();
        yield put(routerRedux.push('/user/login'));
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.data);
      return {
        ...state,
        status: payload.error_code === 0?'ok': 'error',
      }
    },
    changeLoginOutStatus(state, { payload }) {
      removeAuthority();
      return {
        ...state,
        status: payload.status,
      };
    },
  },
};
