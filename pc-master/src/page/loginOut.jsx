import React, {Component} from "react";
import {render} from "react-dom";
import {Provider, connect} from "react-redux";

import  API from "@/api/api.js"
import store from "@/store/store.js";
import {setMsg, setLoginStatus, setUserInfo, setLoginFrom,setLoginLastTime} from "@/store/action.js";
import getParam from '@/util/getParam'

//给活动页面退出登录用
class LoginOut extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentWillMount() {
        await API.get(API.loginOut);
        store.dispatch(setUserInfo({}));
        store.dispatch(setLoginLastTime(0));
        const referrer = document.referrer

        const notice=getParam(referrer,'notice')
        const type=getParam(referrer,'type')

        window.location.replace(referrer.split('?')[0] + '?name=&notice='+notice+'&type='+type+'&token=')
    }
    render() {
        return (
            <div></div>
        )
    }
}

LoginOut = connect((store) => ({store}))(LoginOut)

render(<Provider store={store}>
    <LoginOut />
</Provider>, document.getElementById('app'))