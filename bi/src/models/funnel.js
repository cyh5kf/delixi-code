import {fetchChart} from '../services/api';
import {requestUrl} from '../utils/const';
import {fromJS, Map, List} from 'immutable';
import moment from 'moment';

export default {
    namespace: 'funnel',

    state: {
        repeatMoneyData: {},
        data:[],
        funnel: fromJS({
            userGroup:[0,1],
            funnelGroup:{
                funnelType:'0',
                funnelMode:'0',
                filter:[
                    {target:'0',judgment:'EQUAL',source:'0'}
                ]
            },
            funnelChartsSelectInfo: {
                dateRange:[moment(),moment()],
                days:7,
                pattern:'TREND',//trend:趋势,compared:对比
                chartsShowOption:{
                    index:[],
                    group:[]
                }
            }
        })
    },

    effects: {
        * findList({payload}, {call, put}) {
            // const data = yield call(fetchChart,{type:'0'});
            const data = yield call(()=>Promise.resolve([
                {title: '下载成功', percentage: '100.00%', number: 2001, difference: 0},
                {title: '激活成功', percentage: '75.00%', number: 2000, difference: 0},
                {title: '注册成功', percentage: '75.00%', number: 1500, difference: 500},
                {title: '实名成功', percentage: '80.00%', number: 1500, difference: 200},
                {title: '投资成功', percentage: '75.00%', number: 1000, difference: 100}
            ]));
            yield put({
                type: 'getChartsData',
                data
            })
        },
        // * setList({payload}, {call, put}) {
        //     yield put({
        //         type: 'setList',
        //         payload: {data}
        //     })
        // }

    },

    reducers: {
        // 获取图表数据
        getChartsData(state,payload) {
            let newData = payload.data;
            state.data = newData;
            return {
                ...state
            }
        },
        // 添加用户分群选项
        addUserGroup(state,payload) {
            let funnel = state.funnel;
            state.funnel = funnel.updateIn(['userGroup'],value=>value.push(0));
            return {
                ...state
            }
        },
        // 删除用户分群选项
        removeUserGroup(state,payload) {
            let funnel = state.funnel;
            state.funnel = funnel.updateIn(['userGroup'],value=>value.delete(payload.key));
            return {
                ...state
            }
        },
        // 更新用户分群选项
        updateUserGroup(state,payload) {
            let funnel = state.funnel;
            state.funnel = funnel.updateIn(['userGroup'],value=>value.update(payload.key,()=>payload.value));
            return {
                ...state
            }
        },
        // 添加筛选条件
        addFilterCondition(state,payload) {
            let funnel = state.funnel;
            state.funnel = funnel.updateIn(['funnelGroup','filter'],value=>value.push(Map({target:'0',judgment:'EQUAL',source:'0'})));
            return {
                ...state
            }
        },
        // 删除筛选条件
        removeFilterCondition(state,payload) {
            let funnel = state.funnel;
            state.funnel = funnel.updateIn(['funnelGroup','filter'],value=>value.delete(payload.key));
            return {
                ...state
            }
        },
        // 更新筛选条件
        updateFilterCondition(state,payload) {
            let funnel = state.funnel;
            state.funnel = funnel.updateIn(['funnelGroup','filter',payload.key,payload.item],()=>payload.value);
            return {
                ...state
            }
        },
        // 图表时间区间
        onChangeDateRange(state,payload) {
            let funnel = state.funnel;
            state.funnel = funnel.updateIn(['funnelChartsSelectInfo','startDate'],()=>payload.value);
            return {
                ...state
            }
        },
        // 窗口期时间
        onChangeDays(state,payload) {
            let funnel = state.funnel;
            state.funnel = funnel.updateIn(['funnelChartsSelectInfo','days'],()=>payload.value);
            return {
                ...state
            }
        },
        // 图表类型
        onChangeChartsPattern(state,payload) {
            console.info(payload)
            let funnel = state.funnel;
            state.funnel = funnel.updateIn(['funnelChartsSelectInfo','pattern'],()=>payload.value);
            return {
                ...state
            }
        }
        // findList(state, payload) {
        //     console.log(state)
        //     return {
        //         ...state,
        //         funnel: payload
        //     }
        // },
        // save(state, action) {
        //     return {...state, ...action.payload};
        // }
    },
    // subscriptions: {
    //     setup({dispatch, history}) {
    //         return history.listen(({pathname, query}) => {
    //             if (pathname === '/userBehavior/funnelAnalysis') {
    //                 dispatch({type: 'findList', payload: query});
    //             }
    //         });
    //     }
    // },
};
