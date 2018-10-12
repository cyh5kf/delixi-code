import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { login, sendVcode } from '../services/api';
import { setAuthority, removeAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

export default {
  namespace: 'login',

  state: {
    status: undefined,
    vcodestatus: undefined
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: {
          ...response,
          userName: payload.userName
        }
      });
      // Login successfully
      // if (response.success) {
      //   reloadAuthorized();
      //   yield put(routerRedux.push('/'));
      // }
      yield put(routerRedux.push('/'));
    },

    *sendVcode({ payload }, { call, put, select }) {
      const response = yield call(sendVcode, payload);
      if(response.success) {
        message.success('验证码已发送！');
        yield put({
          type: 'changeVcodeStatus',
          payload: {
            vcodestatus: 'ok'
          }
        });
      } else {
        yield put({
          type: 'changeVcodeStatus',
          payload: {
            vcodestatus: undefined
          }
        });
      }
    },

    *logout(_, { call, put, select }) {
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
    changeVcodeStatus(state, { payload }) {
      return {
        ...state,
        vcodestatus: payload.vcodestatus
      }
    },
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.userName);
      return {
        ...state,
        status: payload.success?'ok': 'error',
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
