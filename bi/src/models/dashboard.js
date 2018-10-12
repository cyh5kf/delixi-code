import {fetchChart} from '../services/api';
import {requestUrl} from '../utils/const';

export default {
    namespace: 'dashboard',

    state: {
        repeatMoneyData: {},
        findList: []

    },

    effects: {
        * findList({payload}, {call, put}) {
            const data = yield call(() => new Promise((resolve, reject) => {
                resolve({name: 'heyan'})
            }));
            yield put({
                type: 'save',
                payload: {data, name: 'test'}
            })
        },
        * setList({payload}, {call, put}) {
            yield put({
                type: 'setList',
                payload: {data}
            })
        }

    },

    reducers: {
        findList(state, payload) {
            return {
                ...state,
                funnel: payload
            }
        },
        save(state, action) {
            return {...state, ...action.payload};
        }
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname, query}) => {
                if (pathname === '/userBehavior/funnelAnalysis/funnelUserDetail') {
                    dispatch({type: 'findList', payload: query});
                }
            });
        }
    },
};
