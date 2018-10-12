import React, {Component} from "react";
import {render} from "react-dom";
import {Provider, connect} from "react-redux";
import MD5 from 'blueimp-md5'
import SHA256 from 'sha256'

import Css from "@/assets/css/loginPassForget.scss";

import TopBar from "@/components/TopBar/TopBar.jsx";
import BottomSingle from  "@/components/BottomSingle/index.jsx";
import Btn from "@/components/Btn";
import Msg from  "@/components/Msg/index.jsx";

import store from "@/store/store.js";
import {setMsg} from "@/store/action.js";
import API from "@/api/api.js";
import initGeetest from '@/assets/js/geetest.js';

class StepBar extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.children);
    }

    render() {
        const activeClassName = Css.active;//' active'
        const step = this.props.step;
        const stepWidth = {
            width: (step - 1) * 50 + "%"
        }
        return (
            <div className={Css.stepWraper}>
                <span className={Css.stepLine}><i style={stepWidth}></i></span>
                <p className={step >= 1 ? activeClassName : ''}>
                    <span >1</span>
                    <label>验证手机号</label>
                </p>
                <p className={step >= 2 ? activeClassName : ''}>
                    <span >2</span>
                    <label>设置新登录密码</label>
                </p>
                <p className={step >= 3 ? activeClassName : ''}>
                    <span >3</span>
                    <label>设置成功</label>
                </p>
            </div>
        );
    }
}

class Step3 extends Component{
    constructor(props){
        super(props);
        this.state={
            seconds:3
        }
    }
    componentDidMount(){
        let seconds=3;

        setInterval(()=>{
            seconds-=1;
            if(seconds==0){
                window.history.go(-1);
            }else{
                this.setState({
                    seconds:seconds
                })
            }
        },1000)
    }
    toLogin(){
        window.history.go(-1);
    }
    render(){
        return (
            <div className={Css.step3}>
                <h5>修改登录密码成功</h5>
                <p>{this.state.seconds}s后跳到登录页面</p>
                <Btn onClick={()=>{this.toLogin()}} />
            </div>
        )
    }
}

class LoginPassReset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            intervalCount: 0,//倒计时
            step: 1,
            phoneErrorMsg: '',
            slideErrorMsg:'',
            smsCodeErrorMsg: '',
            pass1ErrorMsg: '',
            pass2ErrorMsg: '',
        };

        this.validateConfig = {
            inputPhone: {
                reg: /^1\d{10}$/,
                errorMsg: '请输入正确的手机号码！',
                target: 'phoneErrorMsg',
                require: true
            },
            inputSmsCode: {
                reg: /^\d{4,6}$/,
                errorMsg: '请输入正确的短信验证码！',
                target: 'smsCodeErrorMsg',
                require: true
            },
            inputPass1: {
                reg: /^[0-9a-zA-Z_]{6,16}$/,//^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
                errorMsg: '密码为6-16位字符！',
                target: 'pass1ErrorMsg',
                require: true
            },
            inputPass2: {
                reg: /^[0-9a-zA-Z_]{6,16}$/,//^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
                errorMsg: '密码为6-16位字符！',
                equalToRef: 'inputPass1',
                equalError: '两次密码输入不一致！',
                target: 'pass2ErrorMsg',
                require: true
            }
        };

        this.slideOptions={
            hasValidateByBackEnd:false,
            captchaObj:null,
            wait:0,
            IsSendYzmIng:false,//用于标记验证码是否处于发送过程中
            _isGeetCodePass:false,//是否完成极验验证
            _geetConfig:null,//极验验证码

        }
    }
    componentWillMount(){
        this.showGeetBox();
    }
    async getSmsCode() {
        const {
            intervalCount
        }=this.state;
        const phoneValied=this.validateInput('inputPhone');

        if (intervalCount != 0 || !phoneValied) {//倒计时未结束或者手机号未填写
            return;
        }
        if(!this.slideOptions._isGeetCodePass){//滑块未校验
            this.setState({
                slideErrorMsg:'请拖动滑块进行验证!'
            })
            setTimeout(()=>{
                this.setState({
                    slideErrorMsg:''
                })
            },2000)
            return ;
        }

        console.log('_geetConfig:',this.slideOptions._geetConfig);


        if(!this.slideOptions.hasValidateByBackEnd){
            const slideParam={
                geetest_challenge:this.slideOptions._geetConfig.geetest_challenge,
                geetest_validate:this.slideOptions._geetConfig.geetest_validate,
                geetest_seccode:this.slideOptions._geetConfig.geetest_seccode,
                t:'jc'
            }
            let slideObj=await API.post(API.registerInitSlide,slideParam);//后台校验滑块有没有校验通过
            if(slideObj && slideObj.status=='fail'){
                this.props.dispatch(setMsg('滑块校验失败！'));
                return;
            }else{
                this.slideOptions.hasValidateByBackEnd=true
            }
        }



        const param={
            mobile:this.refs.inputPhone.value
        }
        let resData=await API.get(API.forgetLoginPassGetSms,param,true);//获取短信码
        const {
            obj,
            responseCode,
            responseMessage
        }=resData;
        if(responseCode=='000000'){
            this.startInterval();
        }else{
            this.setState({
                smsCodeErrorMsg:responseMessage
            })
            setTimeout(()=>{
                this.setState({
                    smsCodeErrorMsg:''
                })
            },2000)
        }
    }

    startInterval() {//开始倒计时

        const self = this;
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

    async showGeetBox() {
        var self=this;
        const param={
            rand:Math.round(Math.random() * 10000000)+'abcdefg',
            mobile:Math.round(Math.random() * 10000000)+'abcdefg',
        }

        let data=await API.get(API.registerInitSlide,param);
        if(typeof data=='string'){
            data=JSON.parse(data);
        }
        initGeetest({
            gt:data.gt ,
            challenge:data.challenge,
            product: "float", // 体现形式：float 浮动式（默认值）、embed 嵌入式、popup：弹出式 custom
            offline:!data.success,
            new_captcha: data.new_captcha,//布尔类型。宕机情况下使用，表示验证是 3.0 还是 2.0，3.0 的 sdk 该字段为 true
            width: "360px",
            // new_captcha:false
        },function (_captchaObj) {
            // 将验证码加到元素里
            _captchaObj.appendTo(self.refs.geetestBox);

            self.slideOptions.captchaObj = _captchaObj;
            //人为刷新
            _captchaObj.onRefresh && _captchaObj.onRefresh(function () {
                self.slideOptions._isGeetCodePass = false;
                self.slideOptions._geetConfig = null;
                self.slideOptions.hasValidateByBackEnd=false
            });

            _captchaObj.onSuccess(function (json) {
                var config = _captchaObj.getValidate();
                // console.log('config:',config)
                if (!config) {
                    self.setState({
                        slideErrorMsg:'极验验证码配置信信息获取失败'
                    })
                    return;
                }
                self.setState({
                    slideErrorMsg:''
                })
                self.slideOptions._geetConfig = config;
                self.slideOptions._isGeetCodePass = true;
            });
        });
    }

    validateInput(ref) {
        const {reg, target, errorMsg, equalToRef = null, equalError = '', require}=this.validateConfig[ref];

        let val = this.refs[ref].value;

        if (!reg.test(val)) {
            this.setState({
                [target]: errorMsg
            });

            return false;
        } else {
            this.setState({
                [target]: ''
            });
            return true;
        }
    }
    async toStep2(){//跳转到第二步

        let valied = false;
        const phoneValied = this.validateInput('inputPhone');
        const smsValied = this.validateInput('inputSmsCode');
        if (phoneValied && smsValied ) {
            valied = true;
        }
        if(!this.slideOptions._isGeetCodePass){
            valied=false;
        }
        const param={
            mobile:this.refs.inputPhone.value,
            mobilecode:this.refs.inputSmsCode.value,
        }

        if(valied){
            let resData=await API.get(API.forgetLoginPassValidateVCode,param,true);
            let {
                obj,
                responseCode,
                responseMessage
            }=resData;
            if(responseCode=='000000'){
                this.setState({
                    step:2
                })
            }else{
                this.setState({
                    smsCodeErrorMsg:responseMessage
                });
                setTimeout(()=>{
                    this.setState({
                        smsCodeErrorMsg:''
                    });
                },2000)
            }
        }
    }
    async toStep3(){
        let valied = false;
        const pass1Valied = this.validateInput('inputPass1');
        const pass2Valied = this.validateInput('inputPass2');

        if(this.refs.inputPass1.value!=this.refs.inputPass2.value){
            this.setState({
                pass2ErrorMsg:'两次密码输入不一致！'
            })
            setTimeout(()=>{
                this.setState({
                    pass2ErrorMsg:''
                })
            },2000)
            return ;
        }

        if (pass1Valied && pass2Valied) {
            valied = true;
        }
        const saltPass=await API.saltPass(this.refs.inputPass1.value,this.refs.inputPhone.value)
        const reSaltPass=await API.saltPass(this.refs.inputPass2.value,this.refs.inputPhone.value)

        const param={
            mobile:this.refs.inputPhone.value,
            password:saltPass,
            repassword:reSaltPass
        }
        const resData=await API.post(API.forgetLoginPass,param,true);//重置登录密码
        const {
            obj,
            responseCode,
            responseMessage
        }=resData
        if(responseCode=='000000'){
            this.setState({
                step:3
            });
        }else{
            this.setState({
                pass2ErrorMsg:responseMessage
            })
            setTimeout(()=>{
                this.setState({
                    pass2ErrorMsg:''
                })
            },2000)
        }
    }

    render() {
        const errorClassName = ' ' + Css.error;//' error'

        const {
            step
        }=this.state;
        //错误消息
        const msgPhone = this.state.phoneErrorMsg;
        const slideErrorMsg=this.state.slideErrorMsg;
        const msgSmsCode = this.state.smsCodeErrorMsg;
        const msgPass1 = this.state.pass1ErrorMsg;
        const msgPass2 = this.state.pass2ErrorMsg;

        //错误消息对应的className
        const errorPhoneClassName = msgPhone && errorClassName;
        const errorSlideClassName = slideErrorMsg && errorClassName;
        const errorSmsClassName = msgSmsCode && errorClassName;
        const errorPass1ClassName = msgPass1 && errorClassName;
        const errorPass2ClassName = msgPass2 && errorClassName;


        const errorPhone = (
            <p className={Css.errorMsg + errorPhoneClassName}>{msgPhone}</p>
        );
        const errorSlide = (
            <p className={Css.errorMsg + errorSlideClassName}>{slideErrorMsg}</p>
        );
        const errorSmsCode = (
            <p className={Css.errorMsg + errorSmsClassName}>{msgSmsCode}</p>
        );
        const errorPass1 = (
            <p className={Css.errorMsg + errorPass1ClassName}>{msgPass1}</p>
        );
        const errorPass2 = (
            <p className={Css.errorMsg + errorPass2ClassName}>{msgPass2}</p>
        );


        const smsText = this.state.intervalCount == 0 ? '点击获取' : this.state.intervalCount + 's';


        return (
            <div className={Css.container}>
                <TopBar type={'loginPassForget'}/>
                <div style={{borderBottom:'1px solid #e5e5e5'}}>
                    <div className={Css.wraper}>
                        <StepBar step={this.state.step}/>
                        <div className={Css.passResetWraper}>
                            <ul className={`${Css.formWraper} ${step!=1 && Css.hide}`}>
                                <li className={Css.normal}>
                                    <input autoComplete="new-password" className={Css.inputPhone + errorPhoneClassName}
                                           ref="inputPhone" type="text"
                                           onChange={() => this.validateInput('inputPhone')}
                                           placeholder="请输入您的用户名/手机号"/>
                                </li>
                                {errorPhone}
                                <div id="geetestBox" className={Css.geetestBox} ref="geetestBox"></div>
                                {errorSlide}
                                <li className={Css.smsRow}>
                                    <input autoComplete="new-password" className={errorSmsClassName + ' ' + Css.inputSmsCode} ref="inputSmsCode"
                                           onChange={(e) => this.validateInput('inputSmsCode')}
                                           maxLength='6'
                                           type="text"
                                           placeholder="请输入短信验证码"/>
                                    <span className={this.state.intervalCount != 0 ? Css.disabled : ''}
                                          onClick={(e)=>{this.getSmsCode(e)}}>{smsText}</span>
                                </li>
                                {errorSmsCode}
                                <p className={Css.loginBtn} onClick={(e)=>{this.toStep2(e)}}>下一步</p>
                            </ul>

                            <ul className={`${Css.formWraper} ${step!=2 && Css.hide}`}>
                                <li className={Css.normal}>
                                    <input type="text" style={{display:'none'}}/>
                                    <input autoComplete="new-password" className={Css.inputPass + errorPass1ClassName}
                                           ref="inputPass1" type="password"
                                           onChange={() => this.validateInput('inputPass1')}
                                           placeholder="请输入登录密码"/>
                                </li>
                                {errorPass1}
                                <li className={Css.normal}>
                                    <input autoComplete="new-password" className={Css.inputPass + errorPass2ClassName}
                                           ref="inputPass2" type="password"
                                           onChange={() => this.validateInput('inputPass2')}
                                           placeholder="请确认登录密码"/>
                                </li>
                                {errorPass2}
                                <p className={Css.loginBtn} onClick={(e)=>{this.toStep3(e)}}>确认</p>
                            </ul>
                            {step==3 && <Step3/>}
                        </div>
                    </div>
                </div>
                <BottomSingle type={'loginPassForget'}/>
                <Msg/>
            </div>
        );
    }
}

LoginPassReset = connect((store) => ({store}))(LoginPassReset);


render(<Provider store={store}>
    <LoginPassReset />
</Provider>, document.getElementById('app'));
