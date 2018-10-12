import React, {Component} from "react";
import {render} from "react-dom";
import {Match, Route, Redirect, Switch} from 'react-router-dom';
import {connect} from "react-redux";
import {withRouter} from 'react-router'
import Css from "./MemberContent.scss";
import {setLoginStatus} from "@/store/action.js";
import dateFormat from '@/util/dateFormat.js'

import API from "@/api/api.js";
import OpenCunGuanDialog from "@/components/OpenCunGuanDialog/index.jsx"

import Bundle from '@/util/bundle.jsx';
const Message_Loader = require('bundle-loader?lazy&name=member-[name]!@/page/member/message.jsx');
const Message = (props) => (<Bundle load={Message_Loader}>{(Comp) => <Comp {...props}/>}</Bundle>);

const UserRiskTest_Loader = require('bundle-loader?lazy&name=member-[name]!@/page/member/UserRiskTest.jsx');
const UserRiskTest = (props) => (<Bundle load={UserRiskTest_Loader}>{(Comp) => <Comp {...props}/>}</Bundle>);

import store from "@/store/store.js";
// import authComponent from "@/components/Auth/index.jsx";


class Messagedetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: {}
        }
    }

    async componentWillMount() {
        const obj = await API.post(API.readNotice, {
            id: this.props.match.params.id,
        })
        this.setState({
            message: obj
        })
    }

    render() {
        const date = !!this.state.message.createTime && new Date(this.state.message.createTime)
        return (
            <div className="message_detail">
                <h4>消息详情 <a href="/member/index.html#/message"><span>返回消息列表</span></a></h4>
                <div className="detail">
                    <p className="content">{this.state.message.content}</p>
                    <p className="time">{dateFormat(date,'all')}</p>
                </div>
            </div>
        )
    }
}

Messagedetail = connect((store) => ({store}))(Messagedetail);

// 右侧内容区域
class RightContent extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        setTimeout(() => {
            this.refs.memberContent.style.minHeight = document.getElementById('memberMenu').offsetHeight + 'px';
        }, 50)
    }

    render() {
        const {style = {}, routeConfig} = this.props;
        const self = this;
        let routes = routeConfig.map(function (route, index) {
            if (!route.sub) {
                return <Route exact path={route.to} component={route.component} key={index}/>
            } else {

                return route.sub.map((_route, ind) => {
                    return <Route exact path={_route.to} component={_route.component} key={index}/>
                })
            }
        });

        return (
            <div style={style} ref={'memberContent'} className={Css.rightContent}>
                <Switch>
                    {routes}
                    <Route exact path='/message' component={Message}/>
                    {/* 都没有命中则匹配 */}
                    <Route exact path="/message/:id" component={Messagedetail}/>
                    <Route exact path="/userRiskTest" component={UserRiskTest}/>
                    <Route render={() => ( <Redirect to={'/index'}/>) }/>
                </Switch>
            </div>
        )
    }
}

RightContent = connect((store) => ({store}))(RightContent);
export default withRouter(RightContent);