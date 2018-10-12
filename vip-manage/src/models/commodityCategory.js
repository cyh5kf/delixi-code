import { commodityCategory,commodityCategoryStatus,addCommodityCategory,editCommodityCategory,getCategoryTree} from '../services/api';
import {message} from 'antd';
export default {
  namespace: 'commodityCategory',
  state: {
    data: {
      list: [],
      pagination: {},
    },
      tree:{

      }
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(commodityCategory, payload);

      yield put({
        type: 'save',
        payload: response,
      });
    },
      *edit({ payload }, { call, put }) {
          const response = yield call(editCommodityCategory, payload);
          // yield put({
          //     type: 'save',
          //     payload: response,
          // });
      },
      *add({ payload }, { call, put }) {
          const response = yield call(addCommodityCategory, payload);

          // yield put({
          //     type: 'save',
          //     payload: response,
          // });
      },
      *status({ payload }, { call, put }) {
          const response = yield call(commodityCategoryStatus, payload);
          if(response.error_code=='1'){
              message.error(response.msg);
          }else{
              message.success('操作成功');
          }
      },
      *getTree({payload},{call,put}){
          const response = yield call(getCategoryTree, payload);
          yield put({
              type: 'saveTree',
              payload: response,
          });
      }
  },
  reducers: {
    save(state, action) {
        action.payload.list=action.payload.data.list
        const {
          page=1,page_count=0,total=0
        }=action.payload.data.pagination||{}
        action.payload.pagination={
          current:page*1,
            total
        }
      return {
          ...state,
        data: action.payload
      };
    },
      saveTree(state, action) {
          action.payload=action.payload.data
          return {
              ...state,
              tree: action.payload
          };
      },
  },
};
