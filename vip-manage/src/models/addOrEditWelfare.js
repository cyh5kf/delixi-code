import { addOrEditWelfare,getCategory,getCustomFields,getLevelPairs,getWelfareDetail} from '../services/api';
import {message} from 'antd';

export default {
  namespace: 'addOrEditWelfare',
  state: {
      data: {
          editType:'add',//弹框类型
          category:{},//商品分类
          customFields:[//需要填充的字段
          ],
          levelPairs:[//会员等级数组

          ],
          welfareDetail:{//商品详情

          }
      },
  },

  effects: {
      *addOrEdit({ payload }, { call, put }) {
          const response = yield call(addOrEditWelfare, payload);
          const {
              msg='',
              error_code
          }=response||{};
          if(error_code=='1'){
              message.error(msg);
          }else{
              message.success('操作成功');
              setTimeout(()=>{window.location.href=`/#/vip/welfarePacketLists`},2000);
          }
      },
      *getCategory({ payload }, { call, put }){//获取商品分类

          const response = yield call(getCategory, payload);
          yield put({
              type: 'saveCategory',
              payload: response,
          });

          const keys=Object.keys(response.data||{});
          const id=response.data[keys[0]].children && response.data[keys[0]].children[0].id;

          const response1 = yield call(getCustomFields, {
              cate_id:id || 3
          });//获取商品填充字段

          yield put({
              type: 'saveCustomFields',
              payload: response1,
          });
      },
      *getCustomFields({ payload }, { call, put }){//获取商品填充字段
          const response = yield call(getCustomFields, payload);
          yield put({
              type: 'saveCustomFields',
              payload: response,
          });
      },
      *getLevelPairs({ payload }, { call, put }){//获取等级列表数据
          const response = yield call(getLevelPairs, payload);
          yield put({
              type: 'saveLevelPairs',
              payload: response,
          });
      },
      *getWelfareDetail({ payload }, { call, put }){//获取商品详情
          const response = yield call(getWelfareDetail, payload);
          yield put({
              type: 'saveWelfareDetail',
              payload: response,
          });

          const cate_id=response.data && response.data.good && response.data.good.cate_id;
          if(cate_id){
              const response1 = yield call(getCustomFields, {
                  cate_id
              });//获取商品填充字段

              yield put({
                  type: 'saveCustomFields',
                  payload: response1,
              });
          }

      }
  },
  reducers: {
      saveCategory(state, action){
          return {
              ...state,
              category: action.payload.data||[],
          };
      },
      saveCustomFields(state, action){
          return {
              ...state,
              customFields: action.payload.data||[],
          };
      },
      saveLevelPairs(state, action){
          return {
              ...state,
              levelPairs: action.payload.data||[],
          };
      },
      saveWelfareDetail(state, action){
          return {
              ...state,
              welfareDetail: action.payload.data||{},
          };
      }
  },
};
