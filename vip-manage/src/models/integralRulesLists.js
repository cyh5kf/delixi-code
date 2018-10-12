import {integralRulesLists, editIntegralRule} from '../services/api';
import {message} from 'antd';
export default {
    namespace: 'integralRulesLists',
    state: {
        data: {
            list: [],
            pagination: {},
        },
    },

    effects: {
        *fetch({payload}, {call, put}) {
            const response = yield call(integralRulesLists, payload);
            console.log('payload:',payload);
            yield put({
                type: 'save',
                payload: response,
            });
        },
        *edit({payload}, {call, put}){
            const response = yield call(editIntegralRule, payload);
            if(response.error_code=='1'){
                message.error(response.msg);
            }else{
                message.success('操作成功');
            }
        }
    },
    reducers: {
        save(state, action) {
            action.payload.list = action.payload.data.list
            const {
                page = 1, page_count = 0, total = 0
            } = action.payload.data.pagination || {}
            action.payload.pagination = {
                current: page * 1,
                total
            }
            return {
                data: action.payload
            };
        },
    },
};
