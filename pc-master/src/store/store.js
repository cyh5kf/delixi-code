import {createStore,combineReducers} from "redux";
import * as reducers from "@/store/reducer.js";

const store=createStore(combineReducers(reducers));

export default store;


// store.subscribe(function(){
//     console.log("subscribe--","state:",store.getState());
// });

// store.dispatch({
//     type:"UPDATE",
//     sum:123
// });
