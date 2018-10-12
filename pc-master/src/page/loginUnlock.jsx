import React, {Component} from "react";
import {render} from "react-dom";
import {Provider, connect} from "react-redux";


import getParam from "@/util/getParam.js";

import loginCss from "@/assets/css/login.scss";

import TopBar from "@/components/TopBar/TopBar.jsx";
import Msg from  "@/components/Msg/index.jsx";

import store from "@/store/store.js";
import API from "@/api/api.js";
import {setMsg} from "@/store/action.js";

class LoginUnlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: getParam(location.href, "username") || '',
            intervalCount: 0,
            errorMsg: {//错误提示文字
                sms: ""
            }
        };

    }

    async getSmsCode(e) {
        if (this.state.intervalCount != 0) {
            return;
        }
        let resData=await API.get(API.loginUnlock,{username:this.state.phone},true);
        let {
            obj,
            responseCode,
            responseMessage
        }=resData;

        if(responseCode=='000000'){
            this.startInterval();
        }else{
            this.setState({
                errorMsg: Object.assign({}, this.state.errorMsg, {
                    sms:responseMessage
                })
            });
            setTimeout(()=>{
                this.setState({
                    errorMsg: Object.assign({}, this.state.errorMsg, {
                        sms:''
                    })
                });
            },2000)
        }
    }

    startInterval() {//开始倒计时
        const self=this;
        this.setState({
            intervalCount: 60
        });

        function startTimeout() {
            self.setState({
                intervalCount: self.state.intervalCount - 1
            })
            setTimeout(() => {
                if (self.state.intervalCount == 0) {
                    return;
                }
                startTimeout();
            }, 1000)
        }
        startTimeout();
    }

    checkSmsCode(ref) {
        const phoneReg = /^\d{6}$/g;
        let val = this.refs[ref].value;
        if (!phoneReg.test(val)) {
            this.setState({
                errorMsg: Object.assign({}, this.state.errorMsg, {
                    sms: '您输入的短信验证码错误！'
                })
            });
            return false;
        } else {
            this.setState({
                errorMsg: Object.assign({}, this.state.errorMsg, {
                    sms: ''
                })
            });
            return true;
        }
    }
    async doLoginUnlock(e) {//登录提解锁
        const isSmsChecked = this.checkSmsCode('inputSmsCode');

        if(isSmsChecked){
            const param={
                username:this.state.phone,
                mobileCode:this.refs.inputSmsCode.value
            }
            let resData=await API.post(API.loginUnlock,param,true)  //解锁成功
            let {
                obj,
                responseCode,
                responseMessage
            }=resData;
            if(responseCode=='000000'){
                window.history.go(-1)
            }else{
                this.setState({
                    errorMsg: Object.assign({}, this.state.errorMsg, {
                        sms:responseMessage
                    })
                });
                setTimeout(()=>{
                    this.setState({
                        errorMsg: Object.assign({}, this.state.errorMsg, {
                            sms:''
                        })
                    });
                },2000)
            }
        }
    }
    render() {
        const errorClassName = ' ' + loginCss.error;//' error'
        const msgSms = this.state.errorMsg.sms;
        const errorSmsClassName = msgSms && errorClassName;
        const errorSms = (
            <p className={loginCss.errorMsg + errorSmsClassName}>{msgSms}</p>
        );

        const smsText = this.state.intervalCount == 0 ? '点击获取' : this.state.intervalCount + 's';
        const disabledClass = loginCss.disabled;
        return (
            <div >
                <TopBar type={'login'}/>
                <div className={loginCss.wraper}>
                    <div className={loginCss.loginWraper}>
                        <p className={loginCss.topText}>
                            <span className="fn-fl dis-block">账户解锁</span>
                        </p>
                        <ul className={loginCss.formWraper}>
                            <li className={loginCss.normal} style={{marginBottom: '30px'}}>
                                <input className={loginCss.inputPhone} ref="inputPhone" type="text" readOnly="readonly"
                                       value={this.state.phone}/>
                            </li>

                            <li className={loginCss.smsRow}>
                                <input className={loginCss.inputSmsCode + errorSmsClassName} ref="inputSmsCode"
                                       type="text"
                                       placeholder="请输入短信验证码" onInput={() => this.checkSmsCode('inputSmsCode')}/>
                                <span className={this.state.intervalCount != 0 ? disabledClass : ''}
                                      onClick={(e)=>{this.getSmsCode(e)}}>{smsText}</span>
                            </li>
                            {errorSms}

                            <p className={loginCss.loginBtn} onClick={(e)=>{this.doLoginUnlock(e)}}>立即解锁</p>
                        </ul>
                    </div>
                </div>
                <Msg/>
            </div>
        );
    }
}

LoginUnlock = connect((store) => ({store}))(LoginUnlock);

render(<Provider store={store}>
    <LoginUnlock />
</Provider>, document.getElementById('app'));
