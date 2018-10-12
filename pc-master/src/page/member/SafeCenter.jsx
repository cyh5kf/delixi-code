import React, {Component} from "react"
import {render} from "react-dom"
import {Match, Link, IndexLink, NavLink} from 'react-router-dom'
import {connect} from "react-redux"
import {withRouter} from 'react-router'
import Css from "@/assets/css/member/safeCenter.scss"
import Input from '@/components/Input'
import Msg from '@/components/Msg'
import Btn from '@/components/Btn'
import MD5 from 'blueimp-md5'
import SHA256 from 'sha256'

import store from "@/store/store.js"
import {setMsg, setUserInfo, setLoginFrom} from "@/store/action.js";
import API from "@/api/api.js"


class Title extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: this.props.show,
            cancel: this.props.cancel || '取消',
            update: this.props.update || '修改',
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            show: props.show,
            update: this.props.update || '修改'
        })
    }

    render() {
        return (
            <div className={Css.info}>
                {this.props.label}:
                <span className={this.props.set}>
                </span>
                <span className={Css.val}>{this.props.val}</span>
                <a className={this.state.show ? Css.cancel : Css.update}
                   onClick={() => this.changeShow()}>
                    {this.state.show ? this.state.cancel : this.state.update}
                </a>
            </div>
        )
    }

    changeShow() {
        this.props.onClick(this.state.show)
        this.setState({
            show: !this.state.show
        })
    }
}

class Phone extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            phoneShow: false,
            phone: this.props.phone,
            code: '',
            val: this.props.val,
            seconds: 60
        }
    }

    render() {
        return (
            <div>
                <Title label="手机号码"
                       set={Css.set}
                       val={this.state.val.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}
                       show={this.state.show}
                       onClick={() => {
                           this.Cancle();
                           this.setState({show: !this.state.show})
                       }}/>
                <div className={Css.form} style={{display: this.state.show ? 'block' : 'none'}}>
                    <Input style={{display: this.state.phoneShow ? 'block' : 'none'}}
                           placeholder="输入新手机号码" val={this.state.phone}
                           maxLength="11"
                           onChange={(val, valied) => this.onPhoneChange(val, valied)}
                           validate={{reg: /^1\d{10}$/, regMsg: '请输入正确手机号'}}/>
                    <Input style={{display: this.state.phoneShow ? 'block' : 'none'}} isSms="true" placeholder="输入短信验证码"
                           val={this.state.code}
                           maxLength="6"
                           inputStyle={{width: '260px'}}
                           getSms={(callback) => this.sendCode(callback)}
                           onChange={(val, valied) => this.onCodeChange(val, valied)}
                           seconds={this.state.seconds}
                           validate={{
                               required: '验证码不能为空',
                               reg: /^\d{6}$/,
                               regMsg: '请输入正确验证码'
                           }}
                    />
                    <Input style={{display: this.state.phoneShow ? 'none' : 'block'}} isSms="true" placeholder="输入短信验证码"
                           val={this.state.code}
                           inputStyle={{width: '260px'}}
                           maxLength="6"
                           getSms={(callback) => this.sendCode(callback)}
                           onChange={(val, valied) => this.onCodeChange(val, valied)}
                           seconds={this.state.seconds}
                           validate={{
                               required: '验证码不能为空',
                               reg: /^\d{6}$/,
                               regMsg: '请输入正确验证码'
                           }}
                    />
                    <Btn text={this.state.phoneShow ? '完成' : '下一步'} onClick={() => this.sub()}/>
                </div>
            </div>
        )
    }

    async sub() {
        if (!this.state.phoneShow) {
            const obj = await API.get(API.validateOldMobileVCode, {mobilecode: this.state.code});
            if (obj == true) {
                this.setState({
                    phoneShow: true,
                    code: '',
                    phone: '',
                    seconds: 0
                })
            } else {
                store.dispatch(setMsg('验证码输入错误'));
            }

        } else {
            const obj = await API.post(API.resetMobile, {mobilecode: this.state.code});
            if (obj) {
                this.setState({
                    phoneShow: false,
                    val: this.state.phone,
                    show: false,
                    code: '',
                    seconds: 60,
                })
                const userInfo = this.props.store.userInfo;
                this.props.dispatch(setUserInfo(Object.assign({}, userInfo, {regMobile: this.state.phone})));
                store.dispatch(setMsg('手机号码修改成功'));
                window.location.reload();
                window.location.href = '/member/index.html#/safeCenter';
            }
        }
    }

    Cancle() {
        if (this.state.show) {
            this.setState({
                phoneShow: false,
                val: this.props.val,
                show: false,
                code: '',
                seconds: 60,
                phone: this.props.phone
            })
        } else {
            this.setState({
                phoneShow: false,
                show: false,
            })
        }
    }

    async sendCode(callback) {
        if (!this.state.phoneShow) {
            const obj = await API.get(API.sendOldMobileVcode, {mobile: this.state.phone});
        } else {
            const obj = await API.get(API.sendNewMobileVcode, {mobile: this.state.phone});
        }
        callback()
    }

    onPhoneChange(phone, valied) {
        this.setState({
            phone
        })
    }

    onCodeChange(code, valied) {
        this.setState({
            code
        })
    }

    checkValues() {
        if (!this.state.phoneShow) {

        }
    }
}
Phone = connect((store) => ({store}))(Phone);

class LoginPwd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            oldPwd: '',
            oldPwdValide: false,
            newPwd: '',
            newPwdValide: false,
            okPwd: '',
            okPwdValide: false,
            formValide: false,
            validate: {
                required: '',
                reg: '',
                regMsg: ''
            }
        }
    }

    render() {
        return (
            <div>
                <Title label="登录密码"
                       set={Css.set}
                       val="已设置登录密码"
                       show={this.state.show}
                       onClick={() => this.setState({
                           show: !this.state.show,
                           newPwd: '',
                           oldPwd: '',
                           okPwd: '',
                           newPwdValide: false,
                           oldPwdValide: false,
                           okPwdValide: false,
                           formValide: false
                       })}/>
                <div className={Css.form} style={{display: this.state.show ? 'block' : 'none'}}>
                    <Input placeholder="输入原始密码"
                           val={this.state.oldPwd} type="password"
                           onChange={(val, valied, self) => this.onOldChange(val, valied, self)}
                           validate={{
                               required: '密码不能为空',
                               // reg: /^.{6,16}$/g,
                               // regMsg: '密码为6-16位字符！'
                           }}
                    />
                    <Input placeholder="输入新密码" val={this.state.newPwd} type="password"
                           onChange={(val, valied, self) => this.onNewChange(val, valied, self)}
                           validate={{
                               required: '密码不能为空',
                               reg: /^.{6,16}$/g,
                               regMsg: '密码为6-16位字符！'
                           }}
                           maxLength="16"
                    />
                    <Input placeholder="确认新密码" val={this.state.okPwd} type="password"
                           onChange={(val, valied) => this.onOkChange(val, valied)}
                           validate={{
                               required: '密码不能为空',
                               reg: /^.{6,16}$/g,
                               regMsg: '密码为6-16位字符！'
                           }}
                           maxLength="16"
                    />
                    <Btn type={this.state.formValide ? 'red' : 'gray'} text="确认修改" onClick={() => this.sub()}/>
                </div>
                <Msg/>
            </div>
        )
    }

    async sub() {
        if (!this.state.formValide) {
            return
        }

        const oldPassword = this.state.oldPwd && SHA256(MD5(this.state.oldPwd));
        const password1 = this.state.newPwd && SHA256(MD5(this.state.newPwd))
        const repassword1 = this.state.okPwd && SHA256(MD5(this.state.okPwd))
        const Fail = password1 !== repassword1;
        const Success = password1 === repassword1;

        if (Fail) {
            store.dispatch(setMsg('两次密码设置不一致'));
        } else if (Success) {
            const {regMobile} = this.props.store.userInfo

            const oldSaltPass = await API.saltPass(this.state.oldPwd, regMobile)
            const password = await API.saltPass(this.state.newPwd, regMobile)

            const param = {
                oldPassword: oldSaltPass,
                password: password,
                repassword: password
            }
            const obj = await API.post(API.ModifyLoginPwd, param);
            if (obj) {
                store.dispatch(setMsg('登录密码修改成功'));
                this.setState({
                    show: false,
                    oldPwd: '',
                    newPwd: '',
                    okPwd: ''
                })
            }
        }
    }


    onOldChange(oldPwd, valied) {
        this.setState({
            oldPwd: oldPwd,
            oldPwdValide: valied,
        })
        setTimeout(() => {
            this.checkValues()
        }, 1)
    }

    onNewChange(newPwd, valied) {
        this.setState({
            newPwd: newPwd,
            newPwdValide: valied
        })
        setTimeout(() => {
            this.checkValues()
        }, 1)
    }

    onOkChange(okPwd, valied) {
        this.setState({
            okPwd: okPwd,
            okPwdValide: valied
        })
        setTimeout(() => {
            this.checkValues()
        }, 1)
    }

    checkValues() {
        const {oldPwdValide, newPwdValide, okPwdValide} = this.state
        if (oldPwdValide && newPwdValide && okPwdValide) {
            this.setState({
                formValide: true
            })
        } else {
            this.setState({
                formValide: false
            })
        }
    }
}
LoginPwd = connect((store) => ({store}))(LoginPwd);

class PayPwd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            forget: false,
            oldPwd: '',
            oldPwdValide: false,
            newPwd: '',
            newPwdValide: false,
            okPwd: '',
            okPwdValide: false,
            formValide: false,
            code: '',
            codeValide: false,
            phone: this.props.phone,
            seconds: 60,
            payPwd: this.props.store.userInfo.isPayPasWord,
        }
    }

    render() {
        return (
            <div>
                <Title label="交易密码"
                       set={this.state.payPwd ? Css.set : Css.unset}
                       val={(this.state.payPwd ? '已' : '请') + '设置交易密码'}
                       show={this.state.show}
                       update={this.state.payPwd ? '修改' : '设置'}
                       onClick={() => this.setState({
                           show: !this.state.show,
                           forget: false,
                           oldPwd: '',
                           newPwd: '',
                           okPwd: '',
                           code: ''
                       })}/>
                <div className={Css.form} style={{display: this.state.show ? 'block' : 'none'}}>
                    <div style={{display: this.state.payPwd ? 'block' : 'none'}}>
                        <Input style={{display: this.state.forget ? 'none' : 'block'}}
                               placeholder="输入原始交易密码" val={this.state.oldPwd} type="password"
                               validate={{
                                   required: '交易密码不能为空',
                                   reg: /^.{6,16}$/g,
                                   regMsg: '交易密码为6-16位字符！'
                               }}
                               maxLength="16"
                               onChange={(val, valied) => this.onOldChange(val, valied)}>
                            <a className={Css.forget} onClick={() => this.showForget()}>忘记原密码?</a>
                        </Input>
                        <Input style={{display: this.state.forget ? 'block' : 'none'}}
                               validate={{
                                   required: '验证码不能为空',
                                   reg: /^\d{6}$/g,
                                   regMsg: '请输入正确的短信验证码！'
                               }}
                               maxLength="6"
                               isSms="true" placeholder="输入短信验证码" val={this.state.code}
                               inputStyle={{width: '260px'}}
                               seconds={this.state.seconds}
                               getSms={(callback) => this.sendCode(callback)}
                               onChange={(val, valied) => this.onCodeChange(val, valied)}/>
                    </div>
                    <Input placeholder="输入新交易密码" val={this.state.newPwd} type="password"
                           validate={{
                               required: '交易密码不能为空',
                               reg: /^.{6,16}$/g,
                               regMsg: '交易密码为6-16位字符！'
                           }}
                           maxLength="16"
                           onChange={(val, valied) => this.onNewChange(val, valied)}/>
                    <Input placeholder="确认新交易密码" val={this.state.okPwd} type="password"
                           validate={{
                               required: '交易密码不能为空',
                               reg: /^.{6,16}$/g,
                               regMsg: '交易密码为6-16位字符！'
                           }}
                           maxLength="16"
                           onChange={(val, valied) => this.onOkChange(val, valied)}/>
                    <Btn type={this.state.formValide ? 'red' : 'gray'} text={this.state.payPwd ? "确认修改" : "确认设置"}
                         onClick={() => this.sub()}/>
                </div>
            </div>
        )
    }

    async sub() {
        if (!this.state.formValide) {
            return
        }
        const oldPassword = this.state.oldPwd && SHA256(MD5(this.state.oldPwd));
        const password = this.state.newPwd && SHA256(MD5(this.state.newPwd));
        const repassword = this.state.okPwd && SHA256(MD5(this.state.okPwd));
        const mobilecode = this.state.code;
        const Fail = password !== repassword;
        const Success = password === repassword;
        if (!this.state.forget) {
            //修改交易密码
            if (this.state.payPwd) {
                const param = {
                    oldPassword: oldPassword,
                    password: password,
                    repassword: repassword
                }
                if (Fail) {
                    store.dispatch(setMsg('两次密码设置不一致'));
                } else if (Success) {
                    const obj = await API.post(API.ModifyPayPwd, param);
                    if (obj) {
                        store.dispatch(setMsg('交易密码修改成功'));
                        this.setState({
                            show: false,
                            oldPwd: '',
                            newPwd: '',
                            okPwd: '',
                        })
                    }
                }
            } else if (!this.state.payPwd) {
                //设置交易密码
                const param = {
                    password: password,
                    repassword: repassword
                }
                if (Fail) {
                    store.dispatch(setMsg('两次密码设置不一致'));
                } else if (Success) {
                    const obj = API.post(API.SetPayPwd, param);
                    if (obj) {
                        const loginFrom = this.props.store.loginFrom;
                        this.props.dispatch(setLoginFrom(''));//清空来源
                        store.dispatch(setMsg('交易密码设置成功'));
                        this.setState({
                            show: false,
                            payPwd: true
                        })
                        const userInfo = this.props.store.userInfo;
                        this.props.dispatch(setUserInfo(Object.assign({}, userInfo, {isPayPasWord: true})));
                        setTimeout(() => {
                            location.href = loginFrom
                        }, 2000)
                    } else {
                        store.dispatch(setMsg('交易密码设置失败'));
                    }
                }
            }
        } else {
            //    重置交易密码
            const param = {
                mobilecode: mobilecode,
                password: password,
                repassword: repassword
            }

            if (Fail) {
                store.dispatch(setMsg('两次密码设置不一致'));
            } else if (Success) {
                const obj = await API.post(API.forgetPayPwd, param);
                if (obj == true) {
                    store.dispatch(setMsg('交易密码修改成功'));
                    this.setState({
                        code: '',
                        newPwd: '',
                        okPwd: '',
                        show: false,
                        forget: false
                    })
                }
            }
        }

    }


    async sendCode(callback) {
        const obj = await API.get(API.getPayCode, {mobile: this.state.phone});
        obj && callback();
    }

    showForget() {
        this.setState({
            forget: true,
            oldPwd: '',
            newPwd: '',
            okPwd: '',
            oldPwdValide: false,

        })
        setTimeout(() => {
            this.checkValues()
        }, 1)
    }

    onOldChange(oldPwd, valied) {
        this.setState({
            oldPwd: oldPwd,
            oldPwdValide: valied
        })
        setTimeout(() => {
            this.checkValues()
        }, 1)
    }

    onNewChange(newPwd, valied) {
        this.setState({
            newPwd: newPwd,
            newPwdValide: valied
        })
        setTimeout(() => {
            this.checkValues()
        }, 1)
    }

    onOkChange(okPwd, valied) {
        this.setState({
            okPwd: okPwd,
            okPwdValide: valied
        })
        setTimeout(() => {
            this.checkValues()
        }, 1)
    }

    onCodeChange(code, valied) {
        this.setState({
            code: code,
            codeValide: valied
        })
        setTimeout(() => {
            this.checkValues()
        }, 1)
    }

    checkValues() {
        const {oldPwdValide, newPwdValide, okPwdValide, codeValide} = this.state;
        if ((!this.state.forget && this.state.payPwd && oldPwdValide && newPwdValide && okPwdValide) || (!this.state.forget && !this.state.payPwd && newPwdValide && okPwdValide) || this.state.forget && codeValide && newPwdValide && okPwdValide) {
            this.setState({
                formValide: true
            })
        } else {
            this.setState({
                formValide: false
            })
        }
    }
}
PayPwd = connect((store) => ({store}))(PayPwd);


let CunGuanArea = (props) => {
    const {
        realNameStatus
    } = props.store.userInfo;
    const {
        acctName = '',//用户姓名
        idNo = '',//证件号
        cardNo = '',//银行卡号
        preMobile = '',//银行预留手机号
    } = props.info || {};

    const _acctName = `${acctName.substr(0, 1)}${acctName.length > 2 ? '**' : '*'}`
    const _idNo = `${idNo.substr(0, 6)}********${idNo.substr(idNo.length - 4, idNo.length)}`
    const _cardNo = `${cardNo.substr(0, 4)}********${cardNo.substr(cardNo.length - 4, cardNo.length)}`
    const _preMobile = `${preMobile.substr(0, 3)}******${preMobile.substr(preMobile.length - 2, preMobile.length)}`

    return (
        <div>
            <div className={Css.hasCunGuanArea}>
                <div className={Css.msg}>
                    <div className={Css.left}>
                        <p>真实姓名：{_acctName}</p>
                        <p>身份证号：{_idNo}</p>
                    </div>
                    <div className={Css.right}>
                        <p>银行卡号：{_cardNo}</p>
                        <p>银行预留手机号：{_preMobile}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

CunGuanArea = connect((store) => ({store}))(CunGuanArea);

class BankUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            phone: '',
            set: this.props.store.userInfo.realNameStatus == 1,
            cgUserInfoVo: {}
        }
    }

    async componentWillMount() {
        let otherFinanceData = await API.post(API.accountIndexOtherInfo);//更新账户首页其他基本账户信息

        let {
            cgUserInfoVo,
        } = otherFinanceData || {}
        this.setState({
            cgUserInfoVo
        })
    }

    render() {
        return (
            <div>
                <Title label="存管账户"
                       set={this.state.set ? Css.set : Css.unset}
                       val={(this.state.set ? '已' : '请') + '开通银行存管账户'}
                       show={this.state.show}
                       cancel="收起"
                       update={this.state.set ? '查看' : "开通"}
                       onClick={() => this.setState({show: !this.state.show})}/>
                <div className={Css.form} style={{display: this.state.show ? 'block' : 'none'}}>
                    <div style={{display: this.state.set ? 'none' : 'block'}}>
                        <div className={Css.bankOpen}>
                        </div>
                        <Btn text="开通银行存管" onClick={() => this.sub()}/>
                    </div>
                    <div style={{display: this.state.set ? 'block' : 'none'}}>
                        <CunGuanArea info={this.state.cgUserInfoVo}/>
                    </div>
                </div>
            </div>
        )
    }

    sub() {
        location.href = '/openCunGuan.html'
    }
}
BankUser = connect((store) => ({store}))(BankUser);

class SafeCenter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            phone: this.props.store.userInfo.regMobile
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className={Css.wrap}>
                <p className={Css.title}>个人设置</p>
                <Phone val={this.state.phone} phone={this.state.phone}/>
                <LoginPwd />
                <PayPwd phone={this.state.phone}/>
                <BankUser/>
                <div>
                    <div className={Css.info}>
                        风险测评:
                        <span style={{margin: '0 0 0 20px'}}>人众金服为您打造风险承受能力评估体系，以获得最佳投资体验！</span>
                        <NavLink className={Css.goRisk} style={{}} to={'/userRiskTest'}>立即评估</NavLink>
                    </div>
                </div>
            </div>
        )
    }
}

SafeCenter = connect((store) => ({store: store}))(SafeCenter);
export default withRouter(SafeCenter);