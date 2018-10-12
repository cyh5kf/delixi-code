import { addOrEditCommodity, getCategory, getCustomFields, getLevelPairs, getCommodityDetail } from '../services/api';
import { message } from 'antd';

export default {
    namespace: 'addOrEditCommodity',
    state: {
        data: {
            category: {},//商品分类
            customFields: [//需要填充的字段
            ],
            levelPairs: [//会员等级数组

            ],
            commodityDetail: {//商品详情

            },
            fatherCategoryId: '1',//默认 1  父类ID
            cate_id: '1',//子类ID
        },
    },

    effects: {
        *addOrEdit({ payload }, { call, put }) {//添加或者编辑
            const response = yield call(addOrEditCommodity, payload);
            const {
                msg = '',
                error_code,
                data,
            } = response || {};
            if (error_code == '1') {
                message.error(msg);
            } else {
                message.success('操作成功');
                setTimeout(() => { window.location.href = `/#/integral/commodityDetail?id=${data}` }, 1000);
            }
        },
        *getCategory({ payload }, { call, put }) {//获取商品分类

            const response = yield call(getCategory, payload);
            yield put({
                type: 'saveCategory',
                payload: response,
            });

            const keys = Object.keys(response.data || {});
            const id = response.data[keys[0]].children && response.data[keys[0]].children[0].id;

            const response1 = yield call(getCustomFields, {
                cate_id: id || 3
            });//获取商品填充字段

            yield put({
                type: 'saveCustomFields',
                payload: response1,
            });
        },
        *getCustomFields({ payload }, { call, put }) {//获取商品填充字段
            const response = yield call(getCustomFields, payload);
            yield put({
                type: 'saveCustomFields',
                payload: response,
            });
        },
        *getLevelPairs({ payload }, { call, put }) {//获取等级列表数据
            const response = yield call(getLevelPairs, payload);
            yield put({
                type: 'saveLevelPairs',
                payload: response,
            });
        },
        *getCommodityDetail({ payload }, { call, put }) {//获取商品详情
            const response = yield call(getCommodityDetail, payload);
            yield put({
                type: 'saveCommodityDetail',
                payload: response,
            });
        },
        *saveFatherId({ payload }, { call, put }) {
            yield put({
                type: 'saveFatherId',
                payload: {
                    fatherCategoryId: payload
                },
            });
        }
    },
    reducers: {
        saveCategory(state, action) {
            return {
                ...state,
                category: action.payload.data || [],
            };
        },
        saveCustomFields(state, action) {
            return {
                ...state,
                customFields: action.payload.data || [],
            };
        },
        saveLevelPairs(state, action) {
            return {
                ...state,
                levelPairs: action.payload.data || [],
            };
        },
        saveCommodityDetail(state, action) {

            return {
                ...state,
                commodityDetail: action.payload.data || {},
            };
        },
        saveFatherId(state, action) {
            return {
                ...state,
                fatherCategoryId: action.payload.fatherCategoryId,
            };
        }
    },
};
