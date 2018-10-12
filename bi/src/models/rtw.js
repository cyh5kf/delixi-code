import { rtwfetch } from '../services/api';
import { savestorage } from '@/utils/utils';
export default {
  namespace: 'rtw',

  state: {
    page:1,
    data:[{},{},{},{},{},{},{},{},{}],
    timetypes:['H','H','H','H','H','H','H','H','H'],
    dates:[[],[],[],[],[],[],[],[],[]],
    showtypes:['overlay','overlay','overlay','overlay','overlay','overlay','overlay','overlay','overlay'],    //叠加或平铺  overlay/tile
    tabkeys:['1','1','1','1','1','1','1','1','1'],   // 图表类型
  },

  effects: {
    *getdata_async({},{put}){
      // const data = yield fetch('http://localhost:3001/db').then((res)=>{
      //   return res.json()
      // })
      // yield put({'type':'getdata_sync',data})
      // const rtw = JSON.parse(localStorage.getItem(rtw))
      // put({})
    },
    *getdata0({payload},{call,put}){
      const idx = payload.idx;
      const res = yield call(rtwfetch, payload);
      if (res.success) {
        yield put({
          type: 'save',
          data:res.data,
          idx:idx,
        });
      }

    },
    *getdata1({payload},{call,put}){
      const idx = payload.idx;
      const res = yield call(rtwfetch, payload);
      if (res.success) {
        yield put({
          type: 'save',
          data:res.data,
          idx:idx,
        });
      }
    },
    *getdata2({payload},{call,put}){
      const idx = payload.idx;
      const res = yield call(rtwfetch, payload);
      if (res.success) {
        yield put({
          type: 'save',
          data:res.data,
          idx:idx,
        });
        
      }
    },
    *getdata3({payload},{call,put}){
      const idx = payload.idx;
      const res = yield call(rtwfetch, payload);
      if(res.success){
        yield put({
          type: 'save',
          data:res.data,
          idx:idx,
        });

      }
    },
    *getdata4({payload},{call,put}){
      const idx = payload.idx;
      const res = yield call(rtwfetch, payload);
      if (res.success) {
        
        yield put({
          type: 'save',
          data:res.data,
          idx:idx,
        });
      }
    },
    *getdata5({payload},{call,put}){
      const idx = payload.idx;
      const res = yield call(rtwfetch, payload);
      if(res.success){

        yield put({
          type: 'save',
          data:res.data,
          idx:idx,
        });
      }
    },
    *getdata6({payload},{call,put}){
      const idx = payload.idx;
      const res = yield call(rtwfetch, payload);
      if (res.success) {
        
        yield put({
          type: 'save',
          data:res.data,
          idx:idx,
        });
      }
    },
    *getdata7({payload},{call,put}){
      const idx = payload.idx;
      const res = yield call(rtwfetch, payload);
      if (res.success) {
        
        yield put({
          type: 'save',
          data:res.data,
          idx:idx,
        });
      }
    },
    *getdata8({payload},{call,put}){
      const idx = payload.idx;
      const res = yield call(rtwfetch, payload);
      if (res.success) {
        
        yield put({
          type: 'save',
          data:res.data,
          idx:idx,
        });
      }
    },
  },

  reducers: {
    save(state, { data ,idx}) {
      var olddata = state.data
      olddata[idx]=data
      return {
        ...state,
        data:olddata,
      };
    },
    init(state,{}){
      const rtw = JSON.parse(localStorage.getItem("rtw"))
      if (rtw) {
          return {
          ...state,
          ...rtw
        }
      }else{
        return {
          ...state
        }
      }

    },
    getdata_sync(state,{idx,data}){
      var dataarr = state.data.map((item,index)=>{
        if (index==idx) {
          return data;
        }
        return item;
      })

      return {
        ...state,
        data:dataarr
      }
    },
    timetypechange(state,{idx,v}){
      var arr = state.timetypes
      arr.splice(idx,1,v)
      

      const res = {
        ...state,
        timetypes:arr
      }
      
      savestorage('rtw',{
        timetypes:arr,
        dates:state.dates,
        showtypes:state.showtypes,
        tabkeys:state.tabkeys

      })
      return res
    },
    showtypeschange(state,{idx,v}){
      
      const res = {
        ...state,
        showtypes:state.showtypes.map((item,index)=>{
          if (idx==index) {
            return v;
          }
          return item;
        })
      }
      savestorage('rtw',{
        timetypes:state.timetypes,
        dates:state.dates,
        showtypes:state.showtypes.map((item,index)=>{
          if (idx==index) {
            return v;
          }
          return item;
        }),
        tabkeys:state.tabkeys
      })
      return res;
    },
    timetypeschange(state,{v}){
      const res = {
        ...state,
        timetypes:new Array(9).fill(v)
      }
      savestorage('rtw',{
        timetypes:new Array(9).fill(v),
        dates:state.dates,
        showtypes:state.showtypes,
        tabkeys:state.tabkeys
      })
      return res;
    },
    tabkeyschange(state,{idx,key}){
      savestorage('rtw',{
        timetypes:state.timetypes,
        dates:state.dates,
        showtypes:state.showtypes,
        tabkeys:state.tabkeys.map((item,index)=>{
          if (index==idx) {
            return key;
          }
          return item;
        })
      })
      return {
        ...state,
        tabkeys:state.tabkeys.map((item,index)=>{
          if (index==idx) {
            return key;
          }
          return item;
        })
      }
    },
    changedates(state,{data}){
      const res = {
        ...state,
        dates:state.dates.map((item,idx)=>{
          return data
        })
      }
      savestorage('rtw',{
        timetypes:state.timetypes,
        dates:state.dates.map((item,idx)=>{
          return data
        }),
        showtypes:state.showtypes,
        tabkeys:state.tabkeys
      })
      return res;
    },
    changedate(state,{idx,data}){
      const res = {
        ...state,
        dates:state.dates.map((item,index)=>{
          if (idx==index) {
            return data;
          }
          return item;
        })
      }
      savestorage('rtw',{
        timetypes:state.timetypes,
        dates:state.dates.map((item,index)=>{
          if (idx==index) {
            return data;
          }
          return item;
        }),
        showtypes:state.showtypes,
        tabkeys:state.tabkeys
      })     
      return res;      
    }
  },
  subscriptions: {
    setup ({dispatch,history}) {
      history.listen(({pathname})=>{
        if (pathname=='/overViewData/realTimeWatcher') {
          dispatch({type:'init'})
        }
      })
    }
  }
};
