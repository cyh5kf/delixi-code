import React from 'react';
import {message} from 'antd';
import LoginView from './LoginView';
import {loginRequest} from 'api/LoginApi';

export default class LoginComposer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading:false
        };
    }

    doLogin = async(values)=> {
        this.setState({isLoading:true});
        let response = await loginRequest(values);
        if(response) {
            this.setState({isLoading:false});
            setTimeout(()=>{
                if (response.status == 200 && response.data.error_code === 0) {
                    this.props.history.push('/home/activityList');
                    message.success('登录成功!');
                }else {
                    message.error("错误的登录名或密码，请重新输入！");
                }
            },10)
        } else {
            message.error("登录错误，请重新登录！");
            this.setState({isLoading:false});
        }

        // this.props.history.push('/home/activityList');

    };

    render() {
        return (
            <LoginView actions={this} store={this.state}/>
        );
    }
}
