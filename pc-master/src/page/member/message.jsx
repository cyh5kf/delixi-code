import React, {Component} from "react";
import {connect} from "react-redux";
import {NavLink} from 'react-router-dom';
import {withRouter} from 'react-router'
import Css from "../../assets/css/member/message.scss";
import store from "@/store/store.js";
import {setMessageStatus} from "@/store/action.js";
import API from "@/api/api.js";
import Pagination from '@/components/Pagination/Pagination.jsx'
class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageList: [],
            allCurrent: 1,
            allPage: 1
        }
    }

    async componentWillMount() {
        const obj = await API.post(API.getNoticeList, {token: this.props.store.userInfo.token})
        await this.setState({
            messageList: obj.recordList,
            allPage: obj.totalPage
        })
    }

    //所有消息分页
    async changeAllPage(current) {
        await this.setState({
            allCurrent: current
        })
        const obj = await API.post(API.getNoticeList, {token: this.props.store.userInfo.token, pageNum: current})
        await this.setState({
            messageList: obj.recordList,
            allPage: obj.totalPage
        })
    }

    //全部设为已读
    async readAll() {
        this.props.dispatch(setMessageStatus(false));
        localStorage.removeItem('hasNotRead');
        await API.post(API.readNotice, {token: this.props.store.userInfo.token});
        window.location.reload();
    }

    render() {
        let readList = [];
        let notReadList = [];
        this.state.messageList.forEach((v, i) => {
            if (v.status == 0) {
                readList.push(<div key={i} className="messageList notRead"><NavLink to={"/message/" + v.id}>
                    <p>{v.title}</p><span style={{float: 'right'}}>{v.createTimes}</span></NavLink>
                </div>)
            } else if (v.status == 1) {
                readList.push(<div key={i} className="messageList hasRead" style={{color: '#999'}}><NavLink
                    to={"/message/" + v.id}><p>{v.title}</p><span
                    style={{float: 'right'}}>{v.createTimes}</span></NavLink></div>)
            }
        })
        return (
            <div className="message">
                <div className="tab">
                    消息中心
                    <span onClick={() => {
                        this.readAll()
                    }}>全部设为已读</span>
                </div>
                <div className="messageCon" style={{height: '660px'}}>
                    <div className="hasReadCon">
                        {readList}
                    </div>
                </div>
                {this.state.messageList.length ?
                    <Pagination key="0" pages={this.state.allPage} currentPage={this.state.allCurrent}
                                onCurrentChange={(current) => {
                                    this.changeAllPage(current)
                                }}/> : ''}
            </div>
        )
    }
}
Message = connect((store) => ({store}))(Message);
export default withRouter(Message);