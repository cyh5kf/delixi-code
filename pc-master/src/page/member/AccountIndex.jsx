import React, {Component} from "react";
import {render} from "react-dom";
import {NavLink} from 'react-router-dom';
import {connect} from "react-redux";
import {withRouter} from 'react-router'
import Css from "../../assets/css/member/accountIndex.scss";

import store from "@/store/store.js";
import {setUserInfo} from "@/store/action.js";
import API from "@/api/api.js";
import OpenCunGuanDialog from  "@/components/OpenCunGuanDialog/index.jsx";

import dateFormat from '@/util/dateFormat.js'

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
            {realNameStatus != 1 ? <div className={Css.cunGuanArea}>
                <a href="/openCunGuan.html">立即开通</a>
            </div> :
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
            }
        </div>
    )
}

CunGuanArea = connect((store) => ({store}))(CunGuanArea);


class AccountIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: true,
            safeTest: this.props.store.userInfo.riskScore == 0 ? false : true,//是否风险测评过
            _sum: 0,//三个圆圈的动效和
            sum: 0,
            financeData: {//基本账户信息
                totalBal: 0,//总资产
                capitalAmount: 0,//待入账金额
                withDrawalAmount: 0,//可提现总额
                balance: 0,//账户余额
                dealCashAmount: 0,//提现处理中
                waitAmount: 0,//代收本息
                waitCapital: 0,//代收本金
                waitInterest: 0,//代收利息
                addInterest: 0,//累计收益
                cashAndIntransit: {
                    cash: 0,//可提现金额  withDrawalAmount
                    in_transit: 0,//待入账金额  capitalAmount
                    cashState: true,//true:显示金额,false:显示银行清算中
                }
            },
            cgUserInfoVo: {//存管信息

            },
            noticeIndex: null,//最新消息
            date: '',//最近回款日期
            redPacketCount: {//优惠券信息
                countRed: 0,
                countUprate: 0
            },
            circle: [
                {num: 0, color: '#4992ec'},//账户余额
                {num: 0, color: '#8CBE37'},//提现处理中
                {num: 0, color: '#FF9B09'},//待收本息
            ],
        }
    }

    accountIndex = async () => {
        let financeData = await API.post(API.accountIndex);//更新账户首页基本账户信息
        this.setState({
            financeData
        })
        this.state.circle[0].num = financeData.balance
        this.state.circle[1].num = financeData.waitAmount
        this.state.circle[2].num = financeData.dealCashAmount

        let sum = this.state.circle[0].num + this.state.circle[1].num + this.state.circle[2].num;
        this.setState({
            sum
        });
        if (!sum) {
            this.drawCircle({start: 0, end: Math.PI * 2, color: '#d2f0ff'});
        } else {
            this.animateCircle(0).then(() => {
                return this.animateCircle(1);
            }).then(() => {
                return this.animateCircle(2);
            });
        }
    }

    otherInfo=async ()=>{
        let otherFinanceData = await API.post(API.accountIndexOtherInfo);//更新账户首页其他基本账户信息

        let {
            cgUserInfoVo,
            noticeIndex,
            date,//用户最近还款时间
            head,
            nickName,
            redPacketCount = {},//优惠券信息
        } = otherFinanceData || {}

        this.setState({
            cgUserInfoVo,
            noticeIndex,
            date,
            redPacketCount
        })
        const oldUserInfo = this.props.store.userInfo;
        this.props.dispatch(setUserInfo(Object.assign({}, oldUserInfo, {head, nickName})));//新增用户基本信息
    }

    async componentWillMount() {
        this.accountIndex();
        this.otherInfo();
    }

    componentDidMount() {
        this.setState({
            show: this.props.store.userInfo.realNameStatus != 1
        })
    }

    animateCircle(index) {
        let self = this;
        let {num} = this.state.circle[index];
        let _num = 0;
        let perArc = Math.PI * 2 / this.state.sum;
        let start = this.state._sum * perArc;

        let step = Math.ceil(this.state.sum / 20);
        let color = this.state.circle[index].color;
        return new Promise((resolve, reject) => {
            let animate = () => {
                requestAnimationFrame(() => {
                    if (_num <= num) {
                        _num += step;
                        this.setState({
                            _sum: this.state._sum + step
                        })

                        let end = this.state._sum * perArc;
                        if (this.state._sum >= getSumToIndex(index)) {//数值超过了num  终止该队列当前动画
                            this.state._sum = getSumToIndex(index);
                            end = this.state._sum * perArc;
                            this.drawCircle({start, end, color});
                            resolve(true);
                        } else {
                            this.drawCircle({start, end, color});
                            animate();
                        }
                    }
                })
            }
            animate();
        });
        function getSumToIndex(ind) {
            let _toSum = 0;
            for (let i = 0; i <= ind; i++) {
                _toSum += self.state.circle[i].num;
            }
            return _toSum;
        }
    }

    drawCircle(options) {
        const canvas = this.refs.canvas;
        const {start = 0, end = 0, color = '#4992ec'} = options;
        let width = 400;
        let height = 400;
        const ctx = canvas.getContext("2d");
        ctx.beginPath();

        ctx.strokeStyle = color;
        let strokeWidth = 35*2;

        ctx.lineWidth = strokeWidth;

        const circle = {
            x: width * 0.5,    //圆心的x轴坐标值
            y: height * 0.5,    //圆心的y轴坐标值
            r: width * 0.5 - strokeWidth * 0.5      //圆的半径
        };

        ctx.arc(circle.x, circle.y, circle.r, start, end, false);
        ctx.stroke();
    }

    render() {

        const {
            balance = 0,//账户可用余额
            addInterest = 0,//累计收益
            totalBal = 0,//总资产
            withDrawalAmount = 0,//可提现金额
            capitalAmount = 0,//待入账金额
            dealCashAmount = 0,//提现处理中
            waitAmount = 0,//代收本息
            waitCapital = 0,//代收本金
            waitInterest = 0,//代收利息
            cashAndIntransit={}
        } = this.state.financeData//用户账户信息

        const {
            safeTest
        } = this.state

        let {
            cgUserInfoVo,
            noticeIndex,
            date,
            redPacketCount = {}
        } = this.state;
        // const withDrawalAmountTxt = cashAndIntransit.cashState ? Number(cashAndIntransit.cash).toFixed(2).toLocaleString() : '银行清算中';
        // const capitalAmountTxt = cashAndIntransit.cashState ? Number(cashAndIntransit.in_transit).toFixed(2).toLocaleString() : '银行清算中';
        return (
            <div >
                {
                    (noticeIndex || !safeTest) &&
                    <div className={`${Css.headerWraper} ${noticeIndex && !safeTest && Css.animate}`}>
                        {noticeIndex && <NavLink className={Css.noticeBar} to="/message">
                            <div className={Css.header}>
                                <p> {noticeIndex.title} </p>
                                <p >{noticeIndex.createTimes}</p>
                            </div>
                        </NavLink>}
                        {!safeTest && <div className={Css.safeTest}>
                            <p >人众金服为您打造风险承受能力评估体系，以获得最佳投资体验！</p>
                            <NavLink className={Css.goRisk} to={'/userRiskTest'}>立即评估</NavLink>
                        </div>}
                    </div>
                }
                <div className={Css.msgCont}>
                    <div className={Css.left}>
                        <h4>账户余额 <span>(元)</span></h4>
                        <h5>{balance.toFixed(2).toLocaleString()}</h5>
                        <p>
                            {this.props.store.userInfo.realNameStatus == 1 ?
                                <a className={Css.btnRed + ' ' + Css.btn} href="/member/index.html#/recharge">充值</a> :
                                <a className={Css.btnRed + ' ' + Css.btn} href="javascript:void(0)" onClick={() => {
                                    this.setState({
                                        show: true
                                    })
                                }
                                }>充值</a>}
                            {this.props.store.userInfo.realNameStatus == 1 ?
                                <a className={Css.btnRedBorder + ' ' + Css.btn} href="/member/index.html#/withdrawCash">提现</a> :
                                <a className={Css.btnRedBorder + ' ' + Css.btn} href="javascript:void(0)"
                                   onClick={() => {
                                       this.setState({
                                           show: true
                                       })
                                   }
                                   }>提现</a>}

                        </p>
                    </div>
                    <div className={Css.right}>
                        <h4>累计收益 <span>(元)</span>
                            <NavLink to={'/myTender'}>投资记录</NavLink>
                        </h4>
                        <h5>{addInterest.toFixed(2).toLocaleString()}</h5>
                        <p>
                            最近回款日期：<span>{(date && dateFormat(date * 1000)) || '无待收'}</span>
                        </p>
                    </div>
                    <div className={Css.couponArea}>
                        <NavLink to={'/myCoupon'} className={Css.redPacket}>
                            <p><span>{redPacketCount.countRed || 0}</span>个可用红包</p>
                        </NavLink>
                        <NavLink to={'/myCoupon'} className={Css.coupon}>
                            <p><span>{redPacketCount.countUprate || 0}</span>张可用加息券</p>
                        </NavLink>
                    </div>
                </div>
                {<CunGuanArea info={cgUserInfoVo}/>}

                <div className={Css.circleArea}>
                    <h4>资产统计 <span>(元)</span></h4>
                    <div className={Css.circleCont}>
                        <div>
                            <p >总资产</p>
                            <p className={Css.money}>{totalBal.toFixed(2).toLocaleString()}</p>
                        </div>
                        <div className={Css.graph}>
                            <canvas width="400" height="400" ref='canvas'></canvas>
                            <div>=</div>
                        </div>
                        <ul className={Css.desc}>
                            <li>
                                <h4>账户余额 <span>{balance.toFixed(2).toLocaleString()}</span></h4>
                                {/*<p>可提现金额 <span>{withDrawalAmountTxt}</span></p>*/}
                                {/*<p>待入账金额 <span>{capitalAmountTxt}</span></p>*/}
                            </li>
                            <li>
                                <h4>提现处理中 <span>{dealCashAmount.toFixed(2).toLocaleString()}</span></h4>
                            </li>
                            <li>
                                <h4>待收本息 <span>{waitAmount.toFixed(2).toLocaleString()}</span></h4>
                                <p>待收本金 <span>{waitCapital.toFixed(2).toLocaleString()}</span></p>
                                <p>待收收益 <span>{waitInterest.toFixed(2).toLocaleString()}</span></p>
                            </li>
                        </ul>
                    </div>
                </div>
                {this.props.store.userInfo.realNameStatus != 1 &&
                <OpenCunGuanDialog show={this.state.show} close={() => {
                    this.setState({
                        show: false
                    })
                }
                }/>}
            </div>
        );
    }
}

AccountIndex = connect((store) => ({store}))(AccountIndex);
export default withRouter(AccountIndex);















