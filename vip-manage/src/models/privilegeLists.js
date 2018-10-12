import { privilegeLists,addPrivilege,startStopPrivilege} from '../services/api';
import {message} from 'antd';

export default {
  namespace: 'privilegeLists',
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
      *fetch({ payload }, { call, put }) {
        const response = yield call(privilegeLists, payload);

        yield put({
          type: 'save',
          payload: response,
        });
      },
      *add({ payload }, { call, put }) {
          const response = yield call(addPrivilege, payload);
          const {
              error_code,
              msg
          }=response;
          if(error_code==1){
              message.error(msg);
          }
      },
      *startStop({ payload }, { call, put }) {
          const response = yield call(startStopPrivilege, payload);
          if(response.error_code=='1'){
              message.error(response.msg);
          }else{
              message.success('操作成功');
          }
      },
  },
  reducers: {
    save(state, action) {
        action.payload.list=action.payload.data
        const {
          page=1,page_count=0,total=0
        }=action.payload.pagination||{}
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
