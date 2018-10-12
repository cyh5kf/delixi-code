import React from 'react';
import {withRouter} from "react-router-dom";
import {Icon,Modal} from 'antd';
import LoginStore from '../../stores/LoginStore';
import {logoutRequest} from 'api/LoginApi';
import './AppHeaderView.less';

const confirm = Modal.confirm;

class AppHeaderView extends React.Component {

    handleLogout = () => {
        const history = this.props.history;
        
        confirm({
            title: '登出 ?',
            content: '你确定想要退出系统吗?',
            onOk() {
                let userName = LoginStore.getUserName();
                logoutRequest().then(()=> {
                    localStorage.removeItem('token');
                    localStorage.removeItem('userName');
                    history.push('/login');
                });
               
            },
            onCancel() {
            }
        });
    };

    // 点击打开管理员管理页面
    handleUserName = () => {

    }

    render() {
        var actions = this.props.actions;
        var store = this.props.store;
        var isSideBarFold = store.isSideBarFold;
        let userName = LoginStore.getUserName();

        return (
            <div className='ant-layout-header'>
                <div className="header-left floatLeft">
                    <div className="header-menu-fold" onClick={actions.toggleMenuFold}>
                        {isSideBarFold?<Icon type="menu-unfold" title="unfold"/>:<Icon type="menu-fold" title="fold"/> }
                    </div>
                </div>
                <div className="header-right">
                    <span className="userName" onClick={this.handleUserName}>
                        <Icon type="user" className="user"/>{userName}</span>
                    <span className="logout" onClick={this.handleLogout}>
                        <Icon type="poweroff" className="poweroff"/>Logout</span>
                </div>
            </div>
        );
    }

}

export default withRouter(AppHeaderView);