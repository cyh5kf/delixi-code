import React, {Component} from 'react';
import {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import TopBar from "@/components/TopBar/TopBar.jsx";
import Bottom from "@/components/Bottom/Bottom.jsx";
import Pagination from "@/components/Pagination/Pagination.jsx";

import dateFormat from '@/util/dateFormat.js'
import ActiveCss from '@/assets/css/active.scss';

import API from '@/api/api.js'

import {
    HashRouter as Router,
    Route,
    NavLink
}from 'react-router-dom'

import store from "@/store/store.js";

class Active extends Component {
    constructor() {
        super();
        Date.prototype.toLocaleString = function () {
            return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate() + '  ' + (this.getHours() < 10 ? '0' + String(this.getHours()) : this.getHours()) + ":" + (this.getMinutes() < 10 ? '0' + String(this.getMinutes()) : this.getMinutes()) + ":" + (this.getSeconds() < 10 ? '0' + String(this.getSeconds()) : this.getSeconds());
        };
    }
    compileStr = (code) => { //对字符串进行加密
        let c=String.fromCharCode(code.charCodeAt(0)+code.length);
        for(let i=1;i<code.length;i++) {
            c+=String.fromCharCode(code.charCodeAt(i)+code.charCodeAt(i-1));
        }
        return escape(c);
    }
    render() {
        const {
            imgUrl,
            linkurl,
            title,
            publishDate,//上架时间
            downDate,//下架时间
        } = this.props
        const notice = this.props.store.messageStatus
        const {uid,userName} = this.props.store.userInfo
        let status;
       let nowDate=new Date();
        nowDate=nowDate.getTime()
        if(publishDate<nowDate&&nowDate<downDate){
            status=1
        }
        const isin = status == 1 ? <div className="isin"><p>进行中</p></div> : <div className="notin"><p>已结束</p></div>
        const date = new Date(downDate - 1);
        return (
            <li>
                <a href={`${linkurl}?name=${userName?this.compileStr(String(userName)):''}&notice=${notice}&type=${document.domain.split('.')[0]}&uid=${uid?this.compileStr(String(uid)):''}`}>
                    <div className="img" style={{backgroundImage: 'url(' + imgUrl + ')'}}>
                        {isin}
                    </div>
                    <div className="intro">
                        <h4>{title}</h4>
                        <div className="time">结束时间：<span
                            style={{color: status == 1 ? '#ff9b09' : '#999'}}>{date.toLocaleString()}</span></div>
                    </div>
                    {status == 1 ? <div className="btn active">我要参加</div> : <div className="btn">活动回顾</div>}
                </a>
            </li>
        )
    }
}
Active = connect((store) => ({store: store}))(Active);
class Activecenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeList: []
        }


    }

    async componentWillMount() {
        const param = {
            type: 2
        }
        const obj = await API.get(API.activeCenter, param);
        const list = obj|| []
        this.setState({
            activeList: list
        })
    }

    render() {
        const actives = this.state.activeList.map((v, i) => {
            return (
                <Active key={i} {...v}/>
            )
        })
        return (
            <Router>
                <div className="activebox">
                    <TopBar/>
                    <div className="activebg"></div>
                    <ul className="actives">
                        {actives}
                    </ul>
                    <Bottom/>
                </div>
            </Router>
        )
    }
}

Activecenter = connect((store) => ({store: store}))(Activecenter);
render(<Provider store={store}>
    <Activecenter/>
</Provider>, document.getElementById('app'));