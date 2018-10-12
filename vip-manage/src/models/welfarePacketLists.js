import { welfarePacketLists,startStopWelfare} from '../services/api';
import { routerRedux } from 'dva/router';
import {message} from 'antd';

export default {
  namespace: 'welfarePacketLists',
  state: {
    data: {
        editType: '',
        row:null,
        list: [],
        pagination: {},
    },
  },

  effects: {
      *fetch({ payload }, { call, put }) {
          const response = yield call(welfarePacketLists, payload);

          yield put({
            type: 'save',
            payload: response,
          });
      },
      *startStop({ payload }, { call, put }) {
          const response = yield call(startStopWelfare, payload);
          if(response.error_code=='1'){
              message.error(response.msg);
          }else{
              message.success('操作成功');
          }
      },
      *openFormPage({ payload }, { call, put }) {
          yield put({
              type: 'modifyEditType',
              payload,
          });
          const editId=payload.row&&payload.row.id ||'';

          yield put(routerRedux.push(`/vip/addOrEditWelfare${editId?'?editId='+editId:''}`));
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
      modifyEditType(state, action) {
          return {
              ...state,
              editType: action.payload.editType,
          };
      },
  },
};
