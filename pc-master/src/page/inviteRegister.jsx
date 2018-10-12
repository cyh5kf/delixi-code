import React, {Component} from 'react';
import {render} from 'react-dom';
import {Provider, connect} from 'react-redux';

import InviteeCss from "@/assets/css/invitee.scss";
import TopBar from "@/components/TopBar/TopBar.jsx";

import store from '@/store/store.js';
import API from '@/api/api.js'
import initGeetest from '@/assets/js/geetest.js';

import {setUserInfo} from '@/store/action.js'

class Inviteelogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo:'',
            uid:'',
            intervalCount: 0,//倒计时
            agree: true,
            resError:'',//用于设置后端返回的错误消息
            showTuijian: false,
            phoneTipMsg: '',//提示用户手机通畅
            phoneErrorMsg: '',
            smsCodeErrorMsg: '',
            pass1ErrorMsg: '',
            slideErrorMsg:'',//滑块校验的错误提示信息
        };

        this.validateConfig = {
            inputPhone: {
                reg: /^1\d{10}$/,
                errorMsg: '请输入正确的手机号码！',
                target: 'phoneErrorMsg',
                require: true
            },
            inputSmsCode: {
                reg: /^\d{6}$/,
                errorMsg: '请输入正确的短信验证码！',
                target: 'smsCodeErrorMsg',
                require: true
            },
            inputPass1: {
                reg: /^[0-9a-zA-Z_]{6,16}$/,//^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
                errorMsg: '密码为6-16位字符',
                target: 'pass1ErrorMsg',
                require: true
            },
        };

        this.slideOptions={
            hasValidateByBackEnd:false,//是否已经被后端校验过
            captchaObj:null,
            wait:0,
            IsSendYzmIng:false,//用于标记验证码是否处于发送过程中
            _isGeetCodePass:false,//是否完成极验验证
            _geetConfig:null,//极验验证码
        }
    }

    async componentWillMount(){
        const uid=this.getParam('uid')
        if(!!uid){
            const obj=await API.post(API.invitee,{userId:uid},true);
            if(obj.obj){
                this.setState({
                    userInfo:obj.obj,
                    uid:uid
                })
            }
        }
    }

    getParam = (name) => {
        const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        const r = window.location.search.substr(1).match(reg);
        if (r != null)return unescape(r[2]);
        return null;
    }

    componentDidMount() {
        this.showGeetBox();
        this.setState({
            agree:this.refs.agree.checked
        })
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

        if(!this.slideOptions.hasValidateByBackEnd){//后台没有校验过滑块或者滑块已刷新
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
        let resData=await API.post(API.registerGetSms,param,true);//获取短信码
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
            product: "float", // 体现形式：float 浮动式（默认值）、embed 嵌入式、popup：弹出式
            offline:!data.success,
            new_captcha: data.new_captcha,//布尔类型。宕机情况下使用，表示验证是 3.0 还是 2.0，3.0 的 sdk 该字段为 true
            width: "360px",
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
                // console.log('config:',config);
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
    toggleAgree(){
        this.setState({
            agree:this.refs.agree.checked
        })
    }

    validateInput(ref) {
        const {reg, target, errorMsg, equalToRef = null, equalError = '', require}=this.validateConfig[ref];

        let val = this.refs[ref].value;
        if (!require) {
            if (!val) {
                this.setState({
                    [target]: ''
                });
                return true;
            }
        }

        if (equalToRef) {
            const equalVal = this.refs[equalToRef].value;
            const equalValied = this.validateInput(equalToRef);
            if (equalValied) {//pass1通过了验证
                if (val != equalVal) {
                    this.setState({
                        [target]: equalError
                    });
                    return false;
                }
            }
        }

        if (!reg.test(val)) {
            this.setState({
                [target]: errorMsg
            });
            if (ref == 'inputPhone') {//手机验证不通过
                this.setState({
                    'phoneTipMsg': ''
                });
            }
            return false;
        } else {
            this.setState({
                [target]: ''
            });
            if (ref == 'inputPhone') {//手机验证通过
                this.setState({
                    'phoneTipMsg': '请保持您的手机通畅，以便完成手机短信验证'
                });
            }
            return true;
        }
    }

    async doRegister() {
        if(!this.state.agree||!this.refs.agree.checked){//没有同意人众协议
            return;
        }
        let valied = false;

        const phoneValied = this.validateInput('inputPhone');
        const smsValied = this.validateInput('inputSmsCode');
        const pass1Valied = this.validateInput('inputPass1');


        if (phoneValied && smsValied && pass1Valied ) {
            valied = true;
        }
        if(!this.slideOptions._isGeetCodePass){
            valied=false;
        }
        if(valied){
            const saltParam={
                userName:this.refs.inputPhone.value
            }
            let saltObj1=await API.saltPass(this.refs.inputPass1.value.trim());
            const {pwd,salt} = saltObj1

            let param={
                mobile:this.refs.inputPhone.value,
                mobilecode:this.refs.inputSmsCode.value,
                password:pwd,
                repassword:pwd,
                salt
            }
            if(this.state.uid){
                param.ref=this.state.uid;
            }
            const resData=await API.post(API.register,param,true);
            const {
                obj,
                responseCode,
                responseMessage
            }=resData;
            if(responseCode=='000000'){
                this.props.dispatch(setUserInfo({
                    token:obj.token,
                    userName:obj.userName,
                    uid:obj.uid,
                    isPayPasWord:obj.isPayPasWord,
                    regMobile:obj.regMobile,
                    realNameStatus:obj.realNameStatus,
                }));
                window.location.href='/index.html';
            }else{
                this.setState({
                    resError:responseMessage
                })
                setTimeout(()=>{
                    this.setState({
                        resError:""
                    })
                },2000)
            }
        }
    }

    render() {
        const errorClassName = ' ' + InviteeCss.error;//' error'
        const tipClassName =' '+ InviteeCss.tip;//' tip'
        const disabledClass = InviteeCss.disabled;//'disabled'

        //错误消息
        const {
            phoneTipMsg,
            phoneErrorMsg,
            slideErrorMsg,
            smsCodeErrorMsg,
            pass1ErrorMsg,
            resError,
            intervalCount,
            userInfo
        }=this.state;


        //错误消息对应的className
        const tipPhoneClassName = phoneTipMsg && tipClassName;
        const errorPhoneClassName = phoneErrorMsg && errorClassName;
        const errorSlideClassName = slideErrorMsg && errorClassName;
        const errorSmsClassName = smsCodeErrorMsg && errorClassName;
        const errorPass1ClassName = pass1ErrorMsg && errorClassName;
        const resErrorClassName= resError && errorClassName;

        //错误消息对应的提示
        const errorPhone = this.state.phoneTipMsg ? (
            <p className={InviteeCss.errorMsg + tipPhoneClassName}>{phoneTipMsg}</p>
        ) : (
            <p className={InviteeCss.errorMsg + errorPhoneClassName}>{phoneErrorMsg}</p>
        );

        const errorSlide=(
            <p className={InviteeCss.errorMsg +errorSlideClassName}>{slideErrorMsg}</p>
        );

        const errorSmsCode = (
            <p className={InviteeCss.errorMsg + errorSmsClassName}>{smsCodeErrorMsg}</p>
        );
        const errorPass1 = (
            <p className={InviteeCss.errorMsg + errorPass1ClassName}>{pass1ErrorMsg}</p>
        );
        const smsText = intervalCount == 0 ? '点击获取' : intervalCount + 's';
        const resErrorP=<p className={InviteeCss.errorMsg + resErrorClassName}>{this.state.resError}</p>
        return (
            <div style={{overflowX: 'hidden',background:'#fff3d2'}}>
                <div className={InviteeCss.inviteelogin}>
                    <div className={InviteeCss.login}>
                        <div className="container">
                            <div className="loginbox">
                                <p>您的好友：</p>
                                <p>{userInfo}送您 <span>1716元人众红包</span></p>
                                <ul className={InviteeCss.formWraper}>
                                    <li className={InviteeCss.normal}>
                                        <label>手机号码</label>
                                        <input autoComplete="new-password" className={errorPhoneClassName} ref="inputPhone"
                                               maxLength="11"
                                               onChange={() => this.validateInput('inputPhone')} type="text"
                                               placeholder="请输入手机号码"/>
                                    </li>
                                    {errorPhone}
                                    <div id="geetestBox" className={InviteeCss.geetestBox} ref="geetestBox"></div>
                                    {errorSlide}
                                    <li className={InviteeCss.smsRow}>
                                        <label>验证码</label>
                                        <input autoComplete="new-password" className={errorSmsClassName + ' ' + InviteeCss.inputSmsCode} ref="inputSmsCode"
                                               onChange={() => this.validateInput('inputSmsCode')}
                                               maxLength="6"
                                               type="text"
                                               placeholder="请输入短信验证码"/>
                                        <span className={intervalCount != 0 ? disabledClass : ''}
                                              onClick={()=>{this.getSmsCode()}}>{smsText}</span>
                                    </li>
                                    {errorSmsCode}
                                    <li className={InviteeCss.normal}>
                                        <label>设置密码</label>
                                        <input autoComplete="new-password" type="password" placeholder="密码为6-16位字符" ref="inputPass1"
                                               maxLength="16"
                                               className={errorPass1ClassName}
                                               onChange={() => this.validateInput('inputPass1')}/>
                                    </li>
                                    {errorPass1}
                                    <p className={InviteeCss.agree}>
                                <span className="fn-fl">
                                    <input type="checkbox" id="agree"
                                           ref="agree"
                                           defaultChecked="true"
                                           onClick={()=>{this.toggleAgree()}}
                                    />
                                    <label htmlFor="agree">我已阅读并同意</label><a className={'fc-link fn-fr'} href="/zctk.html" target="_blank">《注册服务协议》</a>
                                </span>
                                    </p>
                                    <p className={`${InviteeCss.loginBtn} ${!this.state.agree&&InviteeCss.disabled}`} onClick={(e) => this.doRegister(e)}>领取大礼包</p>
                                    {resErrorP}
                                </ul>
                                <span style={{float:'right',fontSize:'12px',color:'#999',marginTop:'-5px'}}>已有账号？ <a href="/login.html" style={{color:'#4b92ec',fontSize:'12px'}}>去登录</a></span>
                            </div>
                        </div>
                    </div>
                    <div className={InviteeCss.liucheng} style={{pointerEvents:'none'}}>

                    </div>
                </div>
            </div>
        )
    }
}

Inviteelogin = connect((store) => ({store: store}))(Inviteelogin);

class Inviteebottom extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="inviteebottom">
                <div className="bottomcontent">
                    <div className="contenttop">版权所有©浙江人众金融服务股份有限公司 Copyright Reserved
                        2015&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;浙ICP备13009823号-1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>ICP许可证编号浙B2-20160795</span>&nbsp;&nbsp;&nbsp;&nbsp;
                        <img src="https://images.51rz.com/images/rebuild/pc/img/wj.png" alt=""/>&nbsp;浙公网安备 33010602002203号
                    </div>
                    <div className="contentbottom">
                        <img src="https://images.51rz.com/images/rebuild/pc/img/copy1.png" alt=""/>
                        <img src="https://images.51rz.com/images/rebuild/pc/img/copy2.png" alt=""/>
                        <img src="https://images.51rz.com/images/rebuild/pc/img/copy3.png" alt=""/>
                        <img src="https://images.51rz.com/images/rebuild/pc/img/copy4.png" alt=""/>
                        <img src="https://images.51rz.com/images/rebuild/pc/img/copy5.png" alt=""/>
                    </div>
                </div>
            </div>
        )
    }
}
class Invitee extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount(){
    }

    render() {
        return (
            <div>
                <TopBar/>
                <Inviteelogin/>
                <Inviteebottom/>
            </div>
        )
    }
}

Invitee = connect((store) => ({store: store}))(Invitee);
render(<Provider store={store}>
    <Invitee/>
</Provider>, document.getElementById('app'));

