import React, {Component} from "react";
import {render} from "react-dom";
import {Provider, connect} from "react-redux";

import loginCss from "@/assets/css/login.scss";

import TopBar from "@/components/TopBar/TopBar.jsx";
import Msg from  "@/components/Msg/index.jsx";
import Bottom from  "@/components/Bottom/Bottom.jsx";
import BottomSingle from  "@/components/BottomSingle/index.jsx";

import store from "@/store/store.js";
import {setUserInfo, setLoginFrom, setMsg} from "@/store/action.js";
import API from "@/api/api.js";
import MD5 from 'blueimp-md5'
import SHA256 from 'sha256'
import {userInfoName,setCookie} from '@/util/operateCookie.js'

const getRandomNum=()=>{
    return new Date() * 1+Math.round(Math.random()*10000000)
}

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgSrc: "/apiPc/pcrimg.html",//图形验证码的地址
            imgTimeStamp: getRandomNum(),//图形码时间戳
            failedCount: 0,//提交失败次数 3次以上显示图形码   5次以上提示解锁
            rememberMe: true,//是否记住我
            phoneErrorMsg: "",
            passErrorMsg: "",
            imgCodeErrorMsg: "",
            resError: '',//用于设置后端返回的错误消息
            username:localStorage.username||''
        };
    }
    refreshTimeStamp() {
        this.setState({
            imgTimeStamp: getRandomNum()
        });
    }

    validatePhone(ref) {
        // const reg=/^1[34578]\d{9}$/g;
        this.setState({
            username:this.refs[ref].value
        })
        this.refs[ref].value = (this.refs[ref].value || '').trim();
        const reg = /^.+$/g;//用户名和手机都可以
        let val = this.refs[ref].value;
        if (!reg.test(val)) {
            this.setState({
                phoneErrorMsg: '请填写正确的用户名/手机号！'
            });
            return false;
        } else {
            this.setState({
                phoneErrorMsg: ''
            });
            return true;
        }
    }

    validatePass(ref) {
        // const reg=/^[0-9a-zA-Z_]{6,12}$/g;///^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
        this.refs[ref].value = (this.refs[ref].value || '').trim();
        const reg = /^.+$/g;//长度判断

        let val = this.refs[ref].value;
        if (!reg.test(val)) {
            this.setState({
                passErrorMsg: '密码不能为空！'
            });
            return false;
        } else {
            this.setState({
                passErrorMsg: ''
            });
            return true;
        }
    }

    validateImg(ref) {
        this.refs[ref].value = (this.refs[ref].value || '').trim();
        const reg = /^[\da-zA-Z]{4}$/g;
        let val = this.refs[ref].value;
        if (!reg.test(val)) {
            this.setState({
                imgCodeErrorMsg: '请填写正确的图形码！'
            });
            return false;
        } else {
            this.setState({
                imgCodeErrorMsg: ''
            });
            return true;
        }
    }

    async doLogin(e) {//登录提交
        e.preventDefault();
        if (this.state.failedCount >= 5) {//超过5次登陆解锁
            location.href = `/loginUnlock.html?username=${this.refs.inputPhone.value}`;
        }

        let checked = false;
        const phoneVailed = this.validatePhone('inputPhone');
        const passVailed = this.validatePass('inputPass');
        let imgVailed = false;
        if (this.state.failedCount > 3) {
            imgVailed = this.validateImg('inputImgCode');
            checked = phoneVailed && passVailed && imgVailed;
        } else {
            checked = phoneVailed && passVailed
        }
        if (checked) {
            const saltPass = await API.saltPass(this.refs.inputPass.value, this.refs.inputPhone.value)
            const param = {
                username: this.refs.inputPhone.value,
                password: saltPass,
                patchcaCode: 'patchcaCode'
            }

            if (this.state.failedCount > 3) {
                param.patchcaCode = this.refs.inputImgCode.value;
                param.imgToken=this.state.imgTimeStamp
            }

            const resData = await API.post(API.login, param, true);
            const {
                obj={},
                responseCode,
                responseMessage
            } = resData;
            if (responseCode == '000000') {
                if(obj.black){
                    this.props.dispatch(setMsg(obj.blackMsg));
                    setTimeout(function(){
                        window.location.href = 'https://www.51rz.com/ind/login.html'
                    },2000)
                    return;
                }
                const info={
                    token: obj.token,
                    userName: obj.userName,
                    uid: obj.uid,
                    isPayPasWord: obj.isPayPasWord,
                    regMobile: obj.regMobile,
                    realNameStatus: obj.realNameStatus || 0,
                    riskScore:obj.riskScore||0,//风险测评分数
                    userType:obj.userType
                }
                this.props.dispatch(setUserInfo(info));

                const loginFrom = this.props.store.loginFrom;
                this.props.dispatch(setLoginFrom(''));//清空登录来源
                if (this.refs.remember.checked) {
                    localStorage.setItem('username',this.refs.inputPhone.value);
                }else{
                    localStorage.removeItem('username');
                }
                window._vds.push(['setCS1', 'user_id', obj.uid])    //添加统计

                if(obj.userType==2){//借款人 直接跳转到借款人个人中心
                    window.location.href='/member/index.html'
                    return
                }
                //活动跳转判断
                const referrer = document.referrer
                const notice = this.props.store.messageStatus;
                if(referrer.indexOf('activity-center') > -1 || referrer.indexOf('vip') > -1) {
                    if(referrer.indexOf('token=') > -1) { // 有token，是从banner跳转过来的
                        window.location.href = referrer.replace('token=','token='+obj.token).replace('name=','name='+this.compileStr(String(obj.userName)))
                    } else { //不是banner跳转过来，单独的html页面
                        window.location.href = `${referrer}?name=${this.compileStr(String(obj.userName))}&notice=${notice}&type=${document.domain.split('.')[0]}&token=${obj.token}`;
                    }
                    return
                }
                if (loginFrom) {//从注册页面过来 避免再次回到注册页
                    window.location.href = loginFrom
                } else {
                    if (window.history.length) {
                        window.history.go(-1)
                    } else {
                        window.location.href = '/index.html'
                    }
                }
            } else {
                if (obj) {
                    this.setState({
                        failedCount: obj.loginFailSize || 0,
                        resError: responseMessage || ''
                    })
                    setTimeout(() => {
                        this.setState({
                            resError: ""
                        })
                    }, 2000)
                } else {
                    this.setState({
                        resError: responseMessage
                    })
                    setTimeout(() => {
                        this.setState({
                            resError: ""
                        })
                    }, 2000)
                }
            }
        }
    }
    compileStr = (code) => { //对字符串进行加密
        let c=String.fromCharCode(code.charCodeAt(0)+code.length);
        for(let i=1;i<code.length;i++) {
            c+=String.fromCharCode(code.charCodeAt(i)+code.charCodeAt(i-1));
        }
        return escape(c);
    }
    componentDidMount() {

    }

    render() {
        const errorClassName = ' ' + loginCss.error;//' error'
        const username =this.state.username
        //错误消息

        const msgPhone = this.state.phoneErrorMsg;
        const msgPass = this.state.passErrorMsg;
        const msgImgCode = this.state.imgCodeErrorMsg;


        //错误消息对应的className
        const errorPhoneClassName = msgPhone && errorClassName;
        const errorPassClassName = msgPass && errorClassName;
        const errorImgCodeClassName = msgImgCode && errorClassName;


        //错误消息对应的提示
        const errorPhone = (
            <p className={loginCss.errorMsg + errorPhoneClassName}>{msgPhone}</p>
        );
        const errorPass = (
            <p className={loginCss.errorMsg + errorPassClassName}>{msgPass}</p>
        );
        const errorImgCode = this.state.failedCount <= 3 ? '' : (
            <p className={loginCss.errorMsg + errorImgCodeClassName}>{msgImgCode}</p>
        );
        // const muchError=this.state.failedCount<5?'':(
        //     <p>
        //         <p className={loginCss.errorMsg + errorClassName}>{'因登录失败过于频繁，您的账户处于锁定状态'}</p>
        //     </p>
        // );
        const resError = this.state.resError &&
            <p className={loginCss.errorMsg + errorClassName}>{this.state.resError}</p>

        //图形码的地址
        const imgCodeSrc = `${this.state.imgSrc}?imgToken=${this.state.imgTimeStamp}`;

        const liImgCode = this.state.failedCount <= 3 ? '' : (
            <li className={loginCss.imgCodeRow}>
                <input className={loginCss.inputImgCode + errorImgCodeClassName} ref="inputImgCode" type="text"
                       onChange={() => this.validateImg('inputImgCode')}
                       placeholder="验证码"/>
                <img src={imgCodeSrc} onClick={(e) => {
                    this.refreshTimeStamp(e)
                }}/>
            </li>
        );
        const doLoginText = this.state.failedCount >= 5 ? '立即解锁' : '立即登录';

        return (
            <div >
                <TopBar type={'login'}/>
                <div className={loginCss.loginContent}>
                    <div className={loginCss.wraper}>
                        <form autoComplete="new-password" className={loginCss.loginWraper}
                              onSubmit={(e) => {
                                  this.doLogin(e)
                              }}
                        >
                            <p className={loginCss.topText}>
                                <span className="fn-fl dis-block">登录人众金服</span>
                                <span className="fn-fr dis-block">
                                    没有账号？
                                    <a className="fc-link" href="/register.html">免费注册</a>
                                </span>
                            </p>
                            <ul className={loginCss.formWraper}>
                                <li className={loginCss.normal}>
                                    <input autoComplete="new-password"
                                           className={loginCss.inputPhone + errorPhoneClassName}
                                           value={username}
                                           ref="inputPhone" type="text"
                                           onChange={() => this.validatePhone('inputPhone')}
                                           placeholder="请输入您的用户名/手机号"/>
                                </li>
                                {errorPhone}
                                <li className={loginCss.normal}>
                                    <input autoComplete="new-password" className={loginCss.inputPass + errorPassClassName}
                                           ref="inputPass" type="password"
                                           onChange={() => this.validatePass('inputPass')}
                                           maxLength='16'
                                           placeholder="请输入登录密码"/>
                                </li>
                                {errorPass}
                                {liImgCode}
                                {errorImgCode}

                                <p className={loginCss.remember}>
                                    <span className="fn-fl">
                                        <input
                                            autoComplete="new-password"
                                            type="checkbox" id="remember"
                                            ref="remember"
                                            defaultChecked={this.state.rememberMe}/>
                                        <label htmlFor="remember">记住用户名</label>
                                    </span>
                                    <a href="/loginPassForget.html" className={'fc-link fn-fr'}>忘记密码？</a>
                                </p>
                                <button type="submit" className={loginCss.loginBtn} onClick={(e) => {
                                    this.doLogin(e)
                                }}>{doLoginText}</button>
                                <div style={{height:'30px'}}>
                                    {resError}
                                </div>
                            </ul>
                        </form>
                    </div>
                </div>
                <BottomSingle type={'login'}/>
                <Msg />
            </div>
        );
    }
}

Login = connect((store) => ({store}))(Login);


render(<Provider store={store}>
    <Login />
</Provider>, document.getElementById('app'));
