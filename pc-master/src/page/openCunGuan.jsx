import React, {Component} from "react";
import {render} from "react-dom";
import {Provider, connect} from "react-redux";
import {withRouter} from 'react-router'
import Css from "../assets/css/openCunGuan.scss";

import store from "@/store/store.js";
import {setMsg, setUserInfo} from "@/store/action.js";
import API from "@/api/api.js";

import TopBar from '@/components/TopBar/TopBar.jsx'
import Bottom from '@/components/Bottom/Bottom.jsx'
import InputComp from '@/components/Input/index.jsx'
import Btn from '@/components/Btn/index.jsx'
import Msg from '@/components/Msg'

const Step2 = (props) => {
    return (
        <div className={Css.step2}>
            <div></div>
            <h5>银行存管账户开通成功</h5>
            <p>为了您的资金安全，请前往 <a href="/member/index.html#/safeCenter">设置交易密码</a></p>
        </div>
    );
}

class OpenCunGuan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',//用户姓名
            userNameValied: false,
            cardId: '',//身份证号码
            cardIdValied: false,
            bankCard: '',//银行卡号
            bankCardValied: false,
            preMobile: '',//银行预留手机号码
            preMobileValied: false,
            smsCode: '',//短信码
            smsCodeValied: false,
            formValidated: false,//默认情况下表单没有校验通过
            step: 1,//第几步
            seconds: 60,
            provideBank: false,//是否显示支持银行
            provideBankList: [],//支持银行数据
        }
    }

    async componentWillMount() {
        if(!this.props.store.userInfo.uid){
            location.href='login.html';
            return;
        }
        const bankObj = await API.post(API.provideBank, {}, true);
        this.setState({
            provideBankList: bankObj.obj
        })
    }

    onNameChanged(userName, userNameValied) {
        this.setState({
            userName,
            userNameValied
        })
        setTimeout(() => {
            this.checkValues();
        }, 1)
    }

    onCardIdChanged(cardId, cardIdValied) {
        this.setState({
            cardId,
            cardIdValied
        })
        setTimeout(() => {
            this.checkValues();
        }, 1)
    }

    onBankCardChanged(bankCard, bankCardValied) {
        this.setState({
            bankCard,
            bankCardValied
        })
        setTimeout(() => {
            this.checkValues();
        }, 1)
    }

    onPreMobileChanged(preMobile, preMobileValied) {
        this.setState({
            preMobile,
            preMobileValied
        })
        setTimeout(() => {
            this.checkValues();
        }, 1)
    }

    onSmsCodeChanged(smsCode, smsCodeValied) {
        console.log(smsCodeValied);
        this.setState({
            smsCode,
            smsCodeValied
        })

        setTimeout(() => {
            this.checkValues();
        }, 1)
    }

    async getSms(callBack) {
        if (!this.state.preMobileValied) {
            this.props.dispatch(setMsg('请输入正确格式的手机号'))
            return
        }
        await API.get(API.openAccountSendCode, {mobile: this.state.preMobile})
        callBack()
    }

    checkValues() {
        const {
            userNameValied,
            cardIdValied,
            bankCardValied,
            preMobileValied,
            smsCodeValied
        } = this.state;

        if (userNameValied && cardIdValied && bankCardValied && preMobileValied && smsCodeValied) {
            this.setState({
                formValidated: true
            })
        } else {
            this.setState({
                formValidated: false
            })
        }
    }

    async clickSubmit() {

        if (!this.state.formValidated) {
            return
        }
        const {
            userName,
            cardId,
            bankCard,//银行卡号
            preMobile,//银行预留手机号码
            smsCode,//短信码
        } = this.state;
        const param = {
            name: userName,
            idCode: cardId,
            cardNo: bankCard,
            preMobile,
            smsCode
        }
        await API.post(API.openAccount, param);
        const oldUserInfo = this.props.store.userInfo;
        this.props.dispatch(setUserInfo(Object.assign({}, oldUserInfo, {realNameStatus: 1})))
        this.setState({
            step: 2
        })
    }

    render() {
        const labelStyle = {
            textAlign: 'left',
            width: '110px'
        };
        const {
            userName,
            cardId,
            bankCard,
            preMobile,
            smsCode,
            formValidated,
            step,
            provideBank,
            provideBankList = []
        } = this.state;

        const bankList = !!provideBankList.length && provideBankList.map((v, i) => {
                return (
                    <li key={i}>
                        <div className={Css.img}>
                            <img src={v.smallLogo} alt=""/>
                        </div>
                        <div className={Css.desc}>
                            <p className={Css.title}>{v.bankName}</p>
                            <p className={Css.quota}>
                                单笔限额{v.singleLimit>10000?v.singleLimit/10000+'万':v.singleLimit}元，{v.dayLimit ? `每日限额${v.dayLimit>10000?v.dayLimit/10000+'万':v.dayLimit}元` : '每日无限制'}，{v.monthLimit ? `每月限额${v.monthLimit>10000?v.monthLimit/10000+'万':v.monthLimit}元` : '每月无限制'}</p>
                        </div>
                    </li>
                )
            })

        const BtnType = formValidated ? 'red' : 'gray';
        return (
            <div >
                <TopBar/>
                {step == 2 ? <Step2 /> :
                    <div className={Css.wraper}>
                        <div className={Css.banner}>
                            <h5>开通银行存管</h5>
                            <p>资金更安全　 交易更安心</p>
                        </div>
                        <div className={Css.fromWraper}>
                            <InputComp label={'真实姓名：'}
                                       labelStyle={labelStyle}
                                       val={userName}
                                       onChange={(val, valied, env) => {
                                           this.onNameChanged(val, valied, env)
                                       }}
                                       validate={{
                                           required: '真实姓名不能为空'
                                       }}
                            />
                            <InputComp label={'身份证号：'}
                                       labelStyle={labelStyle}
                                       val={cardId}
                                       onChange={(val, valied) => {
                                           this.onCardIdChanged(val, valied);
                                       }}
                                       validate={{
                                           required: '身份证号不能为空',
                                           reg: /^\d{15}$|^\d{17}(\d|X|x)$/,
                                           regMsg: '请输入正确的身份证号'
                                       }}
                            />
                            <InputComp label={'银行卡号：'}
                                       labelStyle={labelStyle}
                                       val={bankCard}
                                       onChange={(val, valied) => {
                                           this.onBankCardChanged(val, valied)
                                       }}
                                       validate={{
                                           required: '银行卡号不能为空',
                                           reg: /^[0-9]*$/,
                                           regMsg: '卡号必须是数字'
                                       }}
                            />
                            <p className={Css.lookup}
                               onClick={() => {
                                   this.setState({
                                       provideBank: true
                                   })
                               }}
                            >目前支持14家银行，查看支持银行名单</p>
                            <div style={{marginTop: '-30px'}}>
                                <InputComp label={'银行预留手机：'}
                                           labelStyle={labelStyle}
                                           val={preMobile}
                                           onChange={(val, valied) => {
                                               this.onPreMobileChanged(val, valied)
                                           }}
                                           validate={{
                                               required: '银行预留手机不能为空',
                                               reg: /^1\d{10}$/,
                                               regMsg: '手机号码格式不正确'
                                           }}
                                />
                                <InputComp label={'短信验证码：'}
                                           labelStyle={labelStyle}
                                           inputStyle={{width: '260px'}}
                                           val={smsCode}
                                           isSms={true}
                                           seconds={this.state.seconds}
                                           getSms={(callBack) => {
                                               this.getSms(callBack)
                                           }}
                                           onChange={(val, valied) => {
                                               this.onSmsCodeChanged(val, valied)
                                           }}
                                           validate={{
                                               required: '短信验证码不能为空',
                                               reg: /^\d{6}$/,
                                               regMsg: '验证码格式不正确'
                                           }}

                                />
                                <Btn text={"立即开通银行存管账户"}
                                     type={BtnType}
                                     style={{marginLeft: '110px'}}
                                     onClick={() => {
                                         this.clickSubmit()
                                     }}
                                />
                            </div>
                        </div>
                    </div>
                }
                <div className={Css.mask} style={{display: provideBank ? 'block' : 'none'}}>
                    <div className={Css.content}>
                        <h6>支持银行限额说明：</h6>
                        <div className={Css.close} onClick={() => {
                            this.setState({
                                provideBank: false
                            })
                        }}></div>
                        <ul>
                            {bankList}
                        </ul>
                    </div>
                </div>
                <Msg/>
                <Bottom />
            </div>);
    }
}

OpenCunGuan = connect((store) => ({store}))(OpenCunGuan);
render(<Provider store={store}>
    <OpenCunGuan />
</Provider>, document.getElementById('app'));