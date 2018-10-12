import React, {Component} from "react";
import {render} from "react-dom";
import {Provider, connect} from "react-redux";
import store from "@/store/store.js";
import {
    HashRouter,
    Route,
    NavLink,
    Switch,
    Redirect
} from 'react-router-dom';

import projectDetail from "@/assets/css/projectDetail.scss";

import TopBar from "@/components/TopBar/TopBar.jsx";
import Footer from "@/components/Bottom/Bottom.jsx";
import Pagination from '@/components/Pagination/Pagination.jsx'
import Login from '@/components/LoginPop/index.jsx'
import OpenCunGuanDialog from  "@/components/OpenCunGuanDialog/index.jsx";
import Dialog from '@/components/Dialog'

import MD5 from 'blueimp-md5'
import SHA256 from 'sha256'

import API from '@/api/api.js'
import Msg from '@/components/Msg/index.jsx'
import {setMsg,setAgreeRiskStatus} from '@/store/action.js'

//详情
class Detail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            display: false,//红包是否显示
            packId: '',//红包/加息券id
            packNum: '',//红包/加息券的值
            expected: 0,//预期收益
            exactApr: 0,//加息券加息
            exact: 0,//额外收益
            packType: '',//类型 1.红包 2.加息券
            moneyErr: '',//金额错误信息
            pwdErr: '',//密码错误信息
            payPwd: '',//交易密码
            showOpen: false,//开通存管弹窗是否显示
            packList: [],//红包列表
            currentList:[],//当前页码红包列表
            progressIndex: 0,//当前进度索引
            loading: false,//是否正在加载中
            investMoney: 0,//投资金额
            useMoney: 0,//加息券最高加息金额
            timeLimit: 0,//加息天数
            redPackCurrentPage:1,//红包加息券当前页码
            pageNum:3,//红包加息券一页个数
            showRiskProtocolDialog:false,//是否显示风险提示告知书
            showTestRiskDialog:false,//是否显示立即评估弹框
        }
    }

    componentWillReceiveProps(props) {
        const {
            progress = [],//项目历程
        } = props;

        const {
            borrowTimeType,//月标还是天标 0月标 1天标
            discount,//0 不可使用 1 可使用红包 2可使用加息券 3.都可以使用
            list = [],//红包列表
        } = props.obj || {}
        let {timeLimit} = props.obj || {}////使用期限
        timeLimit = !!borrowTimeType ? timeLimit : timeLimit * 30;
        let packList = !!list ? list:[];
        let progressIndex;
        !!progress.length && progress.forEach((v, i) => {
            if (v.show) {
                progressIndex = i
            }
        })
        this.setState({
            packList,
            progressIndex,
        })
        setTimeout(()=>{this.getCurrentPackList();},1)
    }


    changePackPage=(current)=>{
        this.setState({
            redPackCurrentPage:current
        })
        setTimeout(()=>{this.getCurrentPackList();},1)
    }
    getCurrentPackList=()=>{
        const {
            redPackCurrentPage,
            pageNum,
            packList
        }=this.state
        let currentList=[];
        if(packList.length<pageNum){
            currentList=packList
        }else{
            for (let i = (redPackCurrentPage - 1) * pageNum; i < redPackCurrentPage * pageNum; i++) {
                if (i <packList.length) {
                    currentList.push(packList[i])
                }
            }
        }
        this.setState({
            currentList
        })
    }
    showRedpack = async () => {
        await this.setState({
            display: !this.state.display
        })
    }

    choosePack(options) {
        const typeSign = options.type == 1 ? '元' : '%';
        this.setState({
            packId: options.id,//红包id
            packType: options.type,//类型 1.红包 2.加息券
            packNum: options.discountItem + typeSign,//金额/加息率  元/%
            display: false,//是否显示红包列表
            exact: 0,//额外收益
        });
        const {borrowTimeType,} = this.props.obj || {};
        let {timeLimit} = this.props.obj || {}
        timeLimit = !!borrowTimeType ? timeLimit*1 : timeLimit * 30;
        let exact, apr;
        if (options.type == 1) {
            exact = Number(options.discountItem)
        } else if (options.type == 2) {
            const useDate = !!options.useDate && options.useDate*1;//加息天数
            const rateAmount = !!options.rateAmount && options.rateAmount*1;//最高加息本金
            const investMoney = this.state.investMoney*1
            let useMoney, packMoney;
            if (useDate && rateAmount) {
                timeLimit = useDate > timeLimit ? timeLimit : useDate;
                useMoney = rateAmount
            } else if (useDate && !rateAmount) {
                timeLimit = useDate > timeLimit ? timeLimit : useDate;
                useMoney = 0
            } else if (rateAmount && !useDate) {
                useMoney = rateAmount
            } else {
                useMoney = 0
            }
            apr = Number(options.discountItem) / 100;
            if (useMoney == 0) {
                packMoney = investMoney
            } else if (investMoney > useMoney) {
                packMoney = useMoney
            } else {
                packMoney = investMoney
            }
            exact = (( packMoney * apr / 365) * timeLimit).toFixed(2)
            this.setState({
                useMoney,
                timeLimit,
                exactApr: apr,
            })
        }

        this.setState({
            exact,
            exactApr: apr,
        })
        return options.discountItem
    }

    //invest金额改变  预期收益
    changeMoney() {
        const {
            lowestSingleLimit,//倍数
            lastAccount,
            apr,
            borrowTimeType,
            timeLimit,
            userAccount,//账户余额
            mostAccount,//累计最高可投
            mostSingleLimit,//单笔最高可投
            lowestAccount,//起投金额
        } = this.props.obj || {};
        const num = this.refs.invest.value*1
        this.setState({
            investMoney: num
        })
        const reg = /^[0-9]*$/;
        const {
            packType,
            exactApr,
        } = this.state
        const useDate = this.state.timeLimit;//加息券加息天数
        let useMoney = this.state.useMoney*1||0;//加息券最高加息金额
        if (useMoney == 0) {
            useMoney = num
        } else if (num > useMoney) {
            useMoney = useMoney
        } else if (num < useMoney) {
            useMoney = num
        }
        let moneyErr = ''
        const timeLimitNum = !!borrowTimeType ? timeLimit*1 : timeLimit * 30
        if (packType == 2) {
            this.setState({
                exact: ((useMoney * exactApr / 365) * useDate ).toFixed(2)
            })
        }
        this.setState({
            expected: (((num * apr / 365 / 100) * timeLimitNum)).toFixed(2),
        })
        if (!reg.test(num) || num % lowestSingleLimit !== 0 || num == '') {
            moneyErr = '请输入' + lowestSingleLimit*1 + '的整数倍';
            this.setState({
                moneyErr
            })
            return false;
        } else if (num > userAccount * 1) {
            moneyErr = '余额不足，请先充值';
            this.setState({
                moneyErr
            })
            return false;
        } else if (num < lowestAccount* 1) {
            moneyErr = '输入金额不能小于起投金额';
            this.setState({
                moneyErr
            })
            return false;
        } else if (num > lastAccount* 1) {
            moneyErr = '输入金额不能大于剩余可投';
            this.setState({
                moneyErr
            })
            return false;
        } else if (num > mostSingleLimit* 1 && mostSingleLimit* 1 != 0) {
            moneyErr = '输入金额不能大于标的最高可投';
            this.setState({
                moneyErr
            })
            return false;
        } else {
            this.setState({
                moneyErr: ''
            })
            return true;
        }
    }

    maxMoney() {
        const {
            lastAccount,        //剩余可投
            userAccount,        //账户余额
            lowestAccount,      //起投金额
            lowestSingleLimit = 1,//投资金额是几的倍数
        } = this.props.obj || {}
        const maxMoney = this.props.obj.mostSingleLimit* 1;
        if (userAccount* 1 < lowestAccount* 1) {
            this.setState({
                moneyErr: '账户余额不足'
            })
            return
        }
        let max = 0
        if (userAccount* 1 < lastAccount* 1) {
            if (maxMoney !== 0 && userAccount* 1 > maxMoney) {
                max = maxMoney
            } else {
                max = Math.floor(userAccount / lowestSingleLimit) * lowestSingleLimit
            }
        } else {
            if (maxMoney !== 0 && lastAccount* 1 > maxMoney) {
                max = maxMoney
            } else {
                max = lastAccount
            }
        }
        this.refs.invest.value = max
        this.changeMoney()
    }


    validatePwd = () => {
        const payPwd = this.refs.payPwd.value;
        const reg = /^.{6,16}$/g
        if (!reg.test(payPwd)) {
            this.setState({pwdErr: '交易密码为6-16位字符！'})
            return false;
        } else {
            this.setState({pwdErr: ''})
            return true;
        }
    }

    //投标
    async invest() {
        const {
            packId, //红包id
            packType, //红包类型
            loading,//是否正在加载中  防止连续点击投资按钮
            showRiskProtocolDialog,//是否显示风险提示告知书
        } = this.state;
        const {type, newBorrow} = this.props;
        const {userInfo}=this.props.store;
        if (loading) return
        const {payPwd, invest} = this.refs
        const validateMoney = this.changeMoney();
        const validatePwd = this.validatePwd();
        const checked = validateMoney && validatePwd;

        if (!this.props.store.userInfo.isPayPasWord) {
            this.props.dispatch(setMsg('请到个人中心设置交易密码'));
            setTimeout(() => {
                location.href = '/member/index.html#/safeCenter'
            }, 2000)
            this.props.dispatch(setLoginFrom(location.href));
            return
        }
        if (checked) {
            //首先判定有没有同意过协议
            //同意过  1 测评过  2 没有测评过
            //没同意过 1 测评过 2 没有测评过
            // alert(this.props.store.agreeRiskStatus)
            if(this.props.store.agreeRiskStatus==1){//同意过
                if(!userInfo.riskScore){//没有做过风险测评
                    this.setState({
                        showTestRiskDialog:true
                    })
                    return
                }
            }else{
                this.setState({
                    showRiskProtocolDialog:true
                })
                return
            }


            let param = {
                bid: this.props.obj.id,
                payPassword: SHA256(MD5(payPwd.value)),
                money: invest.value,
                tender_type: 0,
                productType: type
            }
            if (!!packType && !!packId) {
                param.type = packType || ''
                param.couponId = packId || ''
            }
            if (!!newBorrow) {
                param.category = 0
            }
            this.setState({
                loading: true
            })
            const tenderResult = await API.post(API.tender, param, true);
            this.props.dispatch(setMsg(tenderResult.responseMessage))
            this.setState({
                loading: false
            });
            if (tenderResult.responseCode == '000000') {
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            }
        }

    }
    async agreeRiskProtocol(){//同意风险测评协议
        const {userInfo}=this.props.store;
        const obj=await API.post(API.updateRiskAgreeStatus)
        this.props.dispatch(setAgreeRiskStatus('1'))
        this.setState({
            showRiskProtocolDialog:false,
        })
        if(!userInfo.riskScore){//没有做过风险测评
            this.setState({
                showTestRiskDialog:true
            })
        }
    }

    closeCunGuanDialog = () => {
        this.setState({
            showOpen: false
        })
    }
    closeRiskDialog(){
        this.setState({
            showRiskProtocolDialog: false
        })
    }

    render() {
        const {
            amount,//募集总金额
            apr,//总年化率
            baseApr,//基础年化率
            exApr,//奖励年化率
            name,//标的名称
            timeLimit,//期限
            lowestAccount,//起投金额
            style,//还款方式 0等额本金 1等额本息2一次还本付息3按月付息，到期还本’
            lastAccount,//剩余可投金额
            scales=0,//投资比例(投资进度)
            userAccount,//用户可用金额（登录状态下显示）
            discount,//0 不可使用 1 可使用红包 2可使用加息券 3.都可以使用
            borrowTimeType,//标时间类型 0月标 1天标
            proList = [],//协议列表
            mostAccount,   //累计最高可投
            mostSingleLimit,//单笔最高可投
            lowestSingleLimit = 1,//投资金额必须是几的倍数
            status,
            lastTime,//剩余募集时间
            bshow=false,   //标详情安全文案显示隐藏
            riskType, //风险提示类型
            tenderTranfer, //可否债转 0 不支持 1 支持
            zicoy, //可债转 0不显示 1显示
            zicon,  //不可债转 0不显示 1显示
            zicoydf, //标的名称后面的展示 可债转 0不显示 1显示
            zicondf //标的名称后面的展示 不可债转 0不显示 1显示
        } = this.props.obj || {};
        const {
            progress = [],//项目历程
            type,//0新手标；1供应链金融；2消费金融，3r计划,4.众汽宝
            isLogined,//是否登陆,
            newBorrow,
        } = this.props;
        const {
            packNum, //红包金额
            packId, //红包id
            expected, //预期收益
            exact,//额外收益，
            packList,//红包列表
            currentList=[],//当前页码红包列表
            moneyErr,//金额错误信息
            pwdErr,//密码错误信息
            progressIndex = -1,//项目历程当前进度
            display,//是否显示红包列表
            packType,//红包类型 1.红包 2.加息券
            exactApr,//加息券加息率
            redPackCurrentPage,//红包加息券当前页码
            pageNum,//红包加息券一页个数
            showRiskProtocolDialog,//显示风险提示告知书
            showTestRiskDialog,//是否显示立即测评弹框按钮，
        } = this.state;
        const errorClassName = '' + projectDetail.error;
        const moneyErrorClass = !!moneyErr && errorClassName
        const pwdErrorClass = !!pwdErr && errorClassName
        const {realNameStatus} = this.props.store.userInfo;
        let borrowType = `https://images.51rz.com/images/rebuild/pc/img/borrowType${type}.png`
        if (type == 4) {
            borrowType = 'https://images.51rz.com/images/rebuild/pc/img/borrowType1.png'
        }


        //红包使用天数限制
        const tenderLimitText = (useTimeLimit, signLimit, userLimitInterval = 0) => {
            const redPacketconfig = [
                `限投资${useTimeLimit}天产品`,
                `${useTimeLimit}天以上标的可用`,
                `${useTimeLimit}天及以上标的可用`,
                `${useTimeLimit}天以下标的可用`,
                `${useTimeLimit}天及以下标的可用`,
                `${useTimeLimit}天至${userLimitInterval}天标的可用`,
                '任意标的可用',
            ]
            if (useTimeLimit == 0) {
                return redPacketconfig[6];
            } else {
                return redPacketconfig[signLimit];
            }
        }
        //红包加息券使用规则
        const moneyLimitText = (couponType, minInterval, maxInterval, useDate, rateAmount) => {
            if (couponType == 1) {//红包
                if (minInterval * 1) {
                    return `投资满${minInterval}元可用`
                } else {
                    return '不限起投金额'
                }
            } else if (couponType == 2) {//加息券
                const config = [
                    `最高加息本金${rateAmount}元，加息${useDate}天`,
                    `全额加息，加息${useDate}天`,
                    `最高加息本金${rateAmount}元`,
                    `全额加息`
                ]
                if (useDate * 1) {
                    return rateAmount * 1 ? config[0] : config[1]
                } else {
                    return rateAmount * 1 ? config[2] : config[3]
                }
            }
        }
        //红包列表  金额
        const redpack =  currentList.map((v, i) => {
                return <li key={i} onClick={() => {
                    // this.choosePack({
                    //     type: v.type,//类型  红包加息券
                    //     id: v.id,
                    //     packNum: v.discountItem,//红包金额/加息券
                    //     typeSign: v.type == 1 ? '元' : '%'
                    // })
                    this.choosePack({...v})
                }}>
                    <div className={projectDetail.container}>
                        <div className={projectDetail.desleft}>
                            <p className={projectDetail.num}>{v.discountItem}{v.type == 1 ? '元' : '%'}</p>
                            <p className={projectDetail.text}>{v.name}</p>
                        </div>
                        <div className={projectDetail.desright} style={{maxWidth: '150px'}}>
                            <p>
                                {moneyLimitText(v.type, v.minInterval, v.maxInterval, v.useDate, v.rateAmount)}</p>
                            <p>{tenderLimitText(v.useTimeLimit, v.signLimit, v.userLimitInterval)}</p>
                            <p className={projectDetail.time}>有效期至：{v.endTime}</p>
                        </div>
                    </div>
                </li>
            })

        //协议列表
        const prolistList = proList && proList.map((v, i) => {
            const nid=v.nid

            return nid=='-1'?<li key={i}>
                <a target="_blank" href={v.url.replace(/^my/,'')+'.html?from=projectDetail'}>{"《" + v.name + "》"}</a>
            </li>:<li key={i}>
                <a target="_blank" href={'/protocol.html?id=' + v.id}>{"《" + v.name + "》"}</a>
            </li>
        })
        const moneyErrClass = moneyErr && 'err';
        const pwdErrClass = pwdErr && 'err';
        const errMoney = <p className={`errorMsg ${moneyErrClass}`}>{moneyErr}</p>;
        const errPwd = <p className={`errorMsg ${pwdErrClass}`}>{pwdErr}</p>;


        //项目历程
        let progressCurrent;//当前进度
        const process = !!progress.length && progress.map((v, i) => {
                let per = progressIndex * 20 + 10;
                if (per >= 100) {
                    per = 100
                }
                progressCurrent = <div className={projectDetail.linenow} style={{width: per + '%'}}></div>;
                if (i !== 5) {
                    return <li key={i} className={progressIndex == i && projectDetail.active}>
                        <p>{v.name}</p>
                        <div style={{background: v.show ? '#d7a55e' : '#cccccc'}} className={projectDetail.qiu}></div>
                        <p>{v.time}</p>
                    </li>
                }
            })


        //标的类型 1.供应 2.消费 3.R计划

        let loginStatus, arrow;//登陆充值按钮   选择优惠券箭头登录状态判断优惠券状态
        if (!isLogined) {
            loginStatus = <a href="javascript:void(0)" onClick={() => {
                this.props.login()
            }}>登录</a>;
            arrow = <div className={projectDetail.kuozhan}
                         style={{backgroundImage: 'url(https://images.51rz.com/images/rebuild/pc/img/kuozhan0.png)'}}>
            </div>

        } else {
            loginStatus = !!realNameStatus ?
                <a href="/member/index.html#/recharge">充值</a> :
                <a href="javascript:void(0)"
                   onClick={() => {
                       this.setState({
                           showOpen: true
                       })
                   }}>充值</a>
            arrow = !!packList && !!packList.length &&
                <div className={projectDetail.kuozhan}
                     style={{
                         backgroundImage: display ?
                             'url(https://images.51rz.com/images/rebuild/pc/img/kuozhan.png)' : 'url(https://images.51rz.com/images/rebuild/pc/img/kuozhan1.png)'
                     }}
                     onClick={() => {
                         this.showRedpack()
                     }}>
                </div>
        }


        //投资按钮
        const btnTextArr = [
            '项目发布',
            '募集其结束',
            '开始计息',
            '项目放款',
            '回款中',
            '项目结束'
        ]
        const isinBack = (type == 1 && (status == 6 || status == 3 || status == 14 || status == 15 || status == 16)) || ((type == 3 || type == 2 || type == 4) && status == 3);
        let btnText = isinBack ? '回款中' : status == 8 && '已回款';
        let btn;
        if (!!isLogined) {
            if (!!realNameStatus) {
                if (status == 1) {
                    btn = <div
                        style={{background: '#faa6a0'}}
                        className={projectDetail.btn}
                        ref="btn">即将发售
                    </div>
                } else if (scales >= 100) {
                    btn = <div
                        style={{background: '#cccccc'}}
                        className={projectDetail.btn}
                        ref="btn">{btnText}
                    </div>
                } else if (lastTime * 1 <= 0) {
                    btn = <div
                        style={{background: '#cccccc'}}
                        className={projectDetail.btn}
                        ref="btn">已过期
                    </div>
                } else {
                    btn = <div className={`${projectDetail.btn} ${projectDetail.btnActive}`} ref="btn" onClick={() => {
                        this.invest()
                    }}>立即投资
                    </div>
                }
            } else {
                btn = <a href="/openCunGuan.html">
                    <div className={projectDetail.btn} ref="btn">立即开通银行存管帐户
                    </div>
                </a>
            }
        } else {
            btn = <a href="javascript:void(0)" onClick={() => {
                this.props.login()
            }}>
                <div className={`${projectDetail.btn} ${projectDetail.btnActive}`} ref="btn">登录后可投资</div>
            </a>
        }


        //还款方式
        const backStyleArr = ['月等额本金还款', '月等额本息还款', '一次性还本付息', '按月付息到期还本']
        let styleInfo;
        if (type == 1 || type == 0 || type == 4) {
            styleInfo = '投资金额为X，年利率为Y，投资期限为 Z月，则每月应还利息计算公式为：X×Y/12,应还总利息计算公式为：X*Y/12*Z，应还本金为X'
            if (style == 2) styleInfo = '投资金额为X，年利率为Y，投资期限为 Z天，则到期后应还利息计算公式为：X*Y/365*Z，应还本金为X'
        }
        if (type == 2) styleInfo = '投资金额为X，年利率为Y，投资期限为 Z天，则到期后应还利息计算公式为：X*Y/365*Z，应还本金为X'
        if (type == 3) styleInfo = '投资金额为X，年利率为Y，投资期限为 Z天，复投收益为N，则到期后应还利息计算公式为：X*Y/365*Z+N，应还本金为X'
        let backStyle = backStyleArr[style]
        //还款方式介绍
        let styleIntroduce = <div className={projectDetail.message} ref="message">{styleInfo}</div>

        const riskStyle={
            fontWeight:'bold',
            margin:'5px 0',
        }
        return (
            <div>
                {!realNameStatus && <OpenCunGuanDialog show={this.state.showOpen} close={() => {
                    this.closeCunGuanDialog()
                }}/>}
                <Msg/>
                <div className={projectDetail.projectDetail}>
                    <div className={projectDetail.DetailLeft}>
                        <div className={projectDetail.DetailTitle}>
                            {newBorrow ? <p><i style={{
                                fontSize: '12px',
                                lineHeight: '16px',
                                background: '#f64c3e',
                                color: '#fcfcfc',
                                display: 'inline-block',
                                marginRight: '7px',
                                padding: '2px 5px',
                            }}>新手</i></p> : <img style={{height: '24px'}} src={borrowType} alt=""/>}
                            <p>{name}
                                    {discount === 1 || discount === 3 ? <span title="red_packet" className={projectDetail.tag}>优惠券</span> : ''}
                                {
                                    tenderTranfer == 0 && zicondf == 1 ?
                                            <span title="interest_rate_hike" className={projectDetail.tag}>不可债转</span> :
                                            tenderTranfer == 1 && zicoydf == 1 ?
                                                <span title="interest_rate_hike" className={projectDetail.tag}>可债转</span> : ""
                                    }

                                    </p>
                            {
                                bshow?
                                <div style={{color:'#ff9b09',fontSize:'14px',paddingLeft:'10px',display:'inline-block'}}><i style={{paddingTop:'5px',float:'left'}}><img src="http://devh5.oss-cn-hangzhou.aliyuncs.com/images/rebuild/pc/img/hgxqicon.png" style={{width:'15px',height:'15px'}} /></i>{bshow}</div>
                                :null
                            }
                        </div>
                        <ul className={projectDetail.Details}>
                            <li>
                                <p style={{fontSize: '36px', marginTop: '-9px'}}
                                   className={projectDetail.percent}>{baseApr}<span>%{!!exApr &&
                                <span>{'+' + exApr + '%'}<i>奖励</i></span>}</span></p>
                                <p style={{lineHeight: '21px'}}>历史年化收益率</p>
                            </li>
                            <li>
                                <p className={projectDetail.percent}>{timeLimit}<span>{borrowTimeType === 0 ? '月' : '天'}</span>
                                </p>
                                <p style={{lineHeight: '21px'}}>投资期限</p>
                            </li>
                            <li>
                                <p className={projectDetail.percent}>{!!amount && (amount / 10000).toFixed(2) || 0}<span>万</span>
                                </p>
                                <p style={{lineHeight: '21px'}}>项目总额</p>
                            </li>
                            <li>
                                <p className={projectDetail.percent}>{lowestAccount}<span>元</span></p>
                                <p style={{lineHeight: '21px'}}>起投金额</p>
                            </li>
                        </ul>
                        <div className={projectDetail.method}>
                            <div className={projectDetail.methodleft}>
                                <div className={projectDetail.method1}>
                                    <span>起息方式</span>
                                    <span>满标计息</span>
                                </div>
                                <div className={projectDetail.method1}>
                                    <span>还款方式</span>
                                    <span className={projectDetail.methodactive}>{backStyle}
                                        <i onMouseEnter={() => {
                                            this.refs.message.style.display = 'block'
                                        }}
                                           onMouseLeave={() => {
                                               this.refs.message.style.display = 'none'
                                           }}
                                        ></i>
                                    </span>
                                    {styleIntroduce}
                                </div>
                                {(type == 3 || type == 1) && tenderTranfer == 0 && zicon === 1 && <div className={projectDetail.method1}>
                                    <span>可否债转</span>
                                    <span>不支持</span>
                                </div>}
                                {(type == 3 || type == 1) && tenderTranfer == 1 && zicoy === 1 && <div className={projectDetail.method1}>
                                    <span>可否债转</span>
                                    <span>支持</span>
                                </div>}
                                {type == 3 && <div className={projectDetail.method1}>
                                    <span>回款提醒</span>
                                    <span className={projectDetail.methodactive}>可能提前回款
                                        <i onMouseEnter={() => {
                                            this.refs.tips.style.display = 'block'
                                        }}
                                           onMouseLeave={() => {
                                               this.refs.tips.style.display = 'none'
                                           }}
                                        ></i>
                                    </span>
                                    <div className={projectDetail.message} ref="tips">
                                        当R计划内借款标的期限无法匹配R计划期限时，即存在提前还款的可能。提前还款应付本息按实际投资天数计。
                                    </div>
                                </div>}
                            </div>
                            <div className={projectDetail.methodleft}>
                                {(type ==3 || type ==1) && <div className={projectDetail.method1}>
                                    <span>风险类型</span>
                                    <span>{riskType}</span>
                                </div>}
                                <div className={projectDetail.method1}>
                                    <span>剩余可投</span>
                                    <span>{!!lastAccount && lastAccount.toLocaleString() || 0}元</span>
                                </div>
                                <div className={projectDetail.method1}>
                                    <span>项目进度</span>
                                    <div className={projectDetail.progress}>
                                        <div className={projectDetail.progressTips}>
                                            <div className={projectDetail.now}
                                                 style={{width: scales + '%'}}></div>
                                        </div>
                                        <div className={projectDetail.bili}>{Math.floor(scales)}%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {type !== '3' && < div className={projectDetail.live}>
                            <div className={projectDetail.start}>项目历程</div>
                            <ul className={projectDetail.pro}>
                                <div className={projectDetail.line}>
                                    {progressCurrent}
                                </div>
                                {process}
                            </ul>
                            <div className={`${progressIndex == 5 ? projectDetail.start : projectDetail.end}`}>项目结束
                            </div>
                        </div>}
                    </div>
                    <div className={projectDetail.DetailRight}>
                        <div className={projectDetail.DetailTitle}>
                            <div className={projectDetail.titleleft}>
                                <p className={projectDetail.ms}>账户余额</p>

                                {isLogined ? <p className={projectDetail.xq}>{userAccount || 0}元</p> :
                                    <p className={projectDetail.xq} style={{color: '#555'}}>---</p>}
                            </div>
                            <div className={projectDetail.titleright}>
                                {loginStatus}
                            </div>
                        </div>
                        {newBorrow && mostSingleLimit != 0 && <div className={projectDetail.DetailTitle}>
                            <div className={projectDetail.titleleft}>
                                <p className={projectDetail.ms}>最高可投</p>
                                <p className={projectDetail.xq} style={{color: '#222'}}>{mostSingleLimit}元</p>
                            </div>
                        </div>}
                        {!newBorrow && mostAccount != 0 && <div className={projectDetail.DetailTitle}>
                            <div className={projectDetail.titleleft}>
                                <p className={projectDetail.ms}>最高可投</p>
                                <p className={projectDetail.xq} style={{color: '#222'}}>{mostAccount}元</p>
                            </div>
                        </div>}
                        <div className={projectDetail.input}>

                            <input className={moneyErrorClass} maxLength={8} autoComplete="new-password" ref="invest"
                                   type="text"
                                   placeholder={`请输入${lowestSingleLimit}倍数金额`}
                                   onChange={() => {
                                       this.changeMoney()
                                   }}/>
                            <a href="javascript:void(0)" onClick={() => {
                                this.maxMoney()
                            }}>最大金额</a>
                        </div>
                        {errMoney}
                        <input autoComplete="new-password" type="hidden" value={packId} ref="packId"/>
                        {/*是否可以使用优惠券*/}
                        <div className={projectDetail.DetailTitle}
                             style={{display: discount == 0 ? 'none' : 'block'}}>
                            <div className={projectDetail.titleleft}>
                                <p className={projectDetail.ms}>优惠券选择</p>
                                {!!isLogined ?
                                    packList && packList.length ?
                                        <p className={projectDetail.xq}>{packNum}</p>
                                        :
                                        <p className={projectDetail.xq} style={{color: '#999', fontSize: '14px'}}>暂无</p>
                                    :
                                    <p className={projectDetail.xq} style={{color: '#555'}}>---</p>}
                            </div>
                            {arrow}
                            <ul className={projectDetail.coupon}
                                style={{display: this.state.display ? 'block' : 'none'}} ref="coupon">
                                <li className={projectDetail.cancleRedpack} onClick={() => {
                                    this.setState({
                                        packId: '',//红包/加息券id
                                        packType: '',
                                        packNum: '',//红包/加息券的值
                                        display: false,
                                        exactApr: 0,//加息券加息
                                        exact: 0,//额外收益
                                    })
                                }}><p className={projectDetail.cancle}>取消优惠券选择</p>
                                </li>
                                <div className={projectDetail.redPackContainer}>
                                    {redpack}
                                </div>
                                <Pagination
                                    style={{margin: '20px auto',background:'#fff'}}
                                    currentPage={redPackCurrentPage}
                                    pages={!!packList ? Math.ceil(packList.length/pageNum) : 1}
                                    onCurrentChange={(current)=>{this.changePackPage(current)}}
                                />

                            </ul>
                        </div>
                        <div className={projectDetail.DetailTitle}>
                            <div className={projectDetail.titleleft}>
                                <p className={projectDetail.ms}>历史收益</p>
                                <p className={projectDetail.xq1}>{
                                    expected == 0 ?
                                        '---' :
                                        (Number(expected) + Number(exact)).toFixed(2) + '元' + (!!exact ? packType == 1 ? `(包含红包${Number(exact)}元)` : `(包含加息${exact}元)` : '')
                                }
                                </p>
                            </div>
                            <div className={projectDetail.titleright}>

                            </div>
                        </div>
                        <div className={projectDetail.input}>
                            <input
                                autoComplete="new-password"
                                type="password"
                                placeholder="请输入交易密码"
                                ref="payPwd"
                                className={pwdErrorClass}
                                onChange={() => this.validatePwd()}
                                maxLength="16"
                            />
                        </div>
                        {errPwd}
                        <div className={projectDetail.sign}>
                            <p>同意签署</p>
                            <ul>
                                {prolistList}
                            </ul>
                        </div>
                        {btn}
                    </div>
                </div>
                <Dialog show={showTestRiskDialog}
                        onClose={()=>{this.setState({showTestRiskDialog:false})}}
                        style={{width:'400px',height:'300px',padding:'0'}}
                >
                    <div className={projectDetail.testRiskDialog}>
                        <p>
                            应监管要求，投资前须完成风险承受能力评估，为不影响投资，请尽快测评
                        </p>
                        <span className={`${projectDetail.linkBtn}`}
                              onClick={()=>{location.href='/member/index.html#/userRiskTest'}}
                        >立即评估</span>
                    </div>

                </Dialog>
                <Dialog show={showRiskProtocolDialog}
                        onClose={()=>{this.closeRiskDialog()}}
                        style={{padding:'0'}}
                >
                    <div className={projectDetail.riskDialog} >
                        <div className={projectDetail.notice} style={{paddingLeft:'20px'}} >
                            <h5>风险提示告知书</h5>
                            <p style={riskStyle}>一、政策风险</p>
                            <p>因国家宏观政策和相关法律法规发生变化，影响人众金服各类产品项目及服务计划的正常提供。</p>
                            <p style={riskStyle}>二、信用风险</p>
                            <p>人众金服不对投资项目本金和收益提供任何保证或承诺。在发生最不利情况下（可能但并不一定发生），可能不利于用户实现项目的历史收益甚至本金遭受损失。</p>
                            <p  style={riskStyle}>三、市场风险</p>
                            <p>由于市场供求关系、利率变动、资产价值波动等不确定的未来市场变化，在发生最不利情况下（可能但并不一定发生），可能不利于用户实现项目的历史收益甚至本金遭受损失。 </p>
                            <p  style={riskStyle}>四、信息传递风险</p>
                            <p>人众金服将按协议约定进行信息披露，用户应充分关注并及时主动查询项目相关信息，如未及时查询，或由于通讯故障、系统故障以及其他不可抗力等因素的影响使得无法及时了解产品信息，由此产生责任和风险应由用户承担。</p>
                            <p style={riskStyle}>五、促成失败风险</p>
                            <p>本次交易的促成需符合相关法律法规的规定和借款合同的约定，可能存在不能满足成立条件从而导致无法促成交易的风险。</p>
                            <p style={riskStyle}>六、操作风险</p>
                            <p>1.不可预测或无法控制的系统故障、设备故障、通讯故障、停电等突发事故将有可能给出借人造成一定损失。因上述事故造成交易或交易数据中断，恢复交易时以事故发生前系统最终记录的交易数据为有效数据； </p>
                            <p>2.由于出借人密码失密、操作不当、决策失误、黑客攻击等原因可能会造成出借人损失；</p>
                            <p>3.网上交易热键操作完毕未及时退出，委托他人代理交易，或长期不关注账户变化等致使他人进行恶意操作均将可能造成出借人损失。</p>
                            <p style={riskStyle}>七、经营风险</p>
                            <p>人众金服承诺将按照相关法律法规的规定进行运营及管理，但会存在因法律法规根据社会需求调整而无法保证符合相关法律和监管部门的要求的现象。如人众金服无法继续经营网络借贷信息中介业务或发生重大业务调整，或财产状况发生重大变化，则可能会对出借人产生不利影响。</p>
                            <p style={riskStyle}>八、提前退出风险</p>
                            <p>在用户投资项目或服务计划存续期间，可能因无匹配的借款项目或人众金服为保护用户投资本金安全提前退出投资项目或服务计划。</p>
                            <p style={riskStyle}>九、流动性风险</p>
                            <p>在用户投资后的项目或服务计划存续期内，用户可能不能提前转出资金（具体以服务协议或借款协议约定为准）。</p>
                            <p style={riskStyle}>十、不可抗力及意外事件风险</p>
                            <p>包括但不限于自然灾害、金融市场危机、战争、黑客攻击、病毒感染等不能预见、不能避免、不能克服的不可抗力事件，对于由于不可抗力及意外事件风险导致的任何损失，用户须自行承担。</p>
                            <p style={riskStyle}>特别提示：</p>
                            <p>前述风险提示不能穷尽全部风险及市场的全部情形。请用户仔细阅读本风险提示告知书，并独立作出是否接受服务和出借的决定。您已知悉并理解出借的全部风险，并自愿承担由此带来的一切后果。</p>
                        </div>
                        <span className={`${projectDetail.linkBtn}`}
                              onClick={()=>{this.agreeRiskProtocol()}}
                        >同意</span>
                    </div>
                </Dialog>
            </div>
        )
    }
}

Detail = connect((store) => ({store: store}))(Detail);

//Loginbox
class LoginBox extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className={projectDetail.loginmask} style={{display: this.props.display ? 'block' : 'none'}}>
                <Login close={this.props.closeLogin}/>
            </div>
        )
    }
}

//第三方担保
class Increase extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const desc = ['安全运营5年', '精选项目', '满标计息', '快速提现']
        const list = desc.map((item, index) => {
            return (
                <li key={index}>
                    <img src={`https://images.51rz.com/images/rebuild/pc/img/increase${index}.png`} alt=""/>
                    <p>{item}</p>
                </li>
            )
        })
        return (
            <ul className={projectDetail.Increase}>
                {list}
            </ul>
        )
    }
}

//产品介绍
class Introduce extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const navArr = [
            {
                id: 0,
                title: '产品描述',
                link: '/',
                component: IntroduceDetail,
                activeimg: 'https://images.51rz.com/images/rebuild/pc/img/introduceactive.png',
                img: 'https://images.51rz.com/images/rebuild/pc/img/introduce.png'
            },

            {
                id: 1,
                title: '借款信息',
                link: '/information',
                component: Information1,
                activeimg: 'https://images.51rz.com/images/rebuild/pc/img/introduce3active.png',
                img: 'https://images.51rz.com/images/rebuild/pc/img/introduce3.png'
            },
            {
                id: 2,
                title: '投资记录',
                link: '/touzi',
                component: History,
                activeimg: 'https://images.51rz.com/images/rebuild/pc/img/introduce2active.png',
                img: 'https://images.51rz.com/images/rebuild/pc/img/introduce2.png'
            },
            {
                id: 3,
                title: '常见问题',
                link: '/question',
                component: Question,
                activeimg: 'https://images.51rz.com/images/rebuild/pc/img/introduce5active.png',
                img: 'https://images.51rz.com/images/rebuild/pc/img/introduce5.png'
            }
        ];
        let activeArr = navArr;
        if (this.props.type !== '3') {
            activeArr = navArr.filter((v, i) => {
                return v.id != 3
            })
        }
        const lis = activeArr.map((v, index) => {
            return (<li key={index}>
                <NavLink exact style={{backgroundImage: `url(${v.img})`}}
                         activeStyle={{color: '#f64c3e', backgroundImage: `url(${v.activeimg})`}}
                         to={v.link}>{v.title}
                </NavLink>
            </li>)
        });
        const cons = activeArr.map((v, index) => {
            return <Route key={(index + 1) * 6}
                          exact
                          path={v.link}
                          render={() => <v.component type={this.props.type} bid={this.props.bid}
                                                     newBorrow={this.props.newBorrow}></v.component>}/>
        })
        return (
            <HashRouter>
                <div>
                    <div className={projectDetail.introduce}>
                        <div className={projectDetail.introducenav}>
                            <ul className={projectDetail.mainnav}>
                                {lis}
                            </ul>
                        </div>
                        <div className={projectDetail.introduceDetail}>
                            <Switch>
                                {cons}
                                <Route render={() => ( <Redirect to={'/'}/>) }/>
                            </Switch>
                        </div>
                    </div>
                </div>
            </HashRouter>
        )
    }
}
//介绍详情
class IntroduceDetail extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {type = 1, newBorrow = false} = this.props;//0新手标；1供应链金融；2消费金融；3 r计划，4.众供宝
        const introdecuArr = [
            {
                introduce: '新手宝是经人众金服安全保障体系严格审核的优质债权，资产类别包括消费金融类、供应链金融类。',
                zcms: '主要为个人贷款产品和部分流动性较好的企业借贷项目，大多数产品的历史回款表现为优秀，并提供第三方担保措施维护资金安全。',
                safeguard: [
                    '一、严格风控标准',
                    '严格审核流程，覆盖所有风险点。甄选优质资产，严格风控审查。',
                    '二、投后管理严谨',
                    '向借款人发放贷款的同时，实现对借款人资金流向的控制，项目安全性得到极大提高。',
                    '三、资产安全 第一还款来源：借款人自有资金还款。 第二还款来源：担保方履约垫付。',
                    // '四、资金安全',
                    // '银行存管，核对资金信息；交易过程中，存管银行将用户资金与平台自有资金隔离，专款专用。',
                    '四、第三方担保',
                    '第三方担保提供无限连带责任担保。',
                    '五、强大法律保障',
                    '由综合性律师事务所普龙律师事务所进行法律审查，确保交易流程合法合规。',
                ]
            },
            {
                introduce: '众供宝是人众金服面向投资人设计的一款专注于供应链领域的产品',
                zcms: '本产品围绕供应链金融主题，向各类供应链上下游商户提供周转资金、营运资金，大多数产品的历史回款表现为优秀，并提供第三方担保措施维护资金安全。',
                safeguard: [

                    '一、严格风控标准',
                    '专注供应链金融服务，严格审核流程，覆盖所有风险点。甄选优质资产，严格风控审查。实现质押货品的存储与监管，保证质押货品安全保值，逾期能快速处理变现。',
                    '二、投后管理严谨',
                    '向借款人发放贷款的同时，通过对借款人整个产业链上下游的对接，实现对借款人资金流向的控制，项目安全性得到极大提高。',
                    '三、第三方担保',
                    '第三方担保：核心企业/融资方法人提供无限连带责任担保',
                    '四、资产安全 ',
                    '第一还款来源：融资方自有资金还款',
                    '第二还款来源：核心企业/融资方法人提供无限连带担保责任',
                    // '五、资金安全',
                    // '银行存管，核对资金信息；交易过程中，存管银行将用户资金与平台自有资金隔离，专款专用。',
                    '五、强大法律保障',
                    '由综合性律师事务所普龙律师事务所进行法律审查，确保交易流程合法合规。',
                ]
            },
            {
                introduce: '众消宝是人众金服面向投资人设计的一款专注于消费金融领域的产品。',
                zcms: '本产品围绕消费金融主题，向借款人提供日常消费及其他周转资金，大多数产品的历史回款表现为优秀。',
                safeguard: [
                    '一、严格风控标准',
                    '资深专业风控团队，围绕平台资产实施多元化、大数据、反欺诈等一系列风险控制措施，确保资产质量；并引入征信交叉核验、OCR识别、风控决策引擎等国内外领先金融科技技术，防范系统性风险，确保资产真实性及安全性。',
                    '二、投后管理严谨',
                    '向借款人发放贷款的同时，实现对借款人资金流向的控制，项目安全性得到极大提高。',
                    //'三、资金安全',
                    //'人众金服客户资金由存管银行进行管控。',
                    //'存管银行根据专款专用的原则，对客户资金进行严格的管控，确保用户账户资金安全。',
                    '三、法律保障',
                    '人众金服平台及业务受法律保护，透明合规，强大的法务团队为人众金服用户提供法律支持及保障。',
                    ' 四、隐私保障',
                    '通过全程加密、系统隔离、安全检测，提供全方位的隐私保障。',
                ]
            },
            {
                introduce: 'R计划是人众金服推出的一款专注于供应链和消费金融领域的产品，是众供宝和众消宝的一个特色子产品。经由出借人授权，平台通过智能投标计划将投资人加入的投资资金自动分配到借款标的中，提高投资人资金利用效率，并通过分散投资降低风险。到期退出为投标工具内借款标的正常到期，本金收益通过银行存管账户返还。',
                zcms: '本计划围绕供应链和消费金融主题，向借款人提供日常消费及其他周转资金，大多数产品的历史回款表现为优秀。',
                safeguard: [
                    '一、严格风控标准',
                    ' 资深专业风控团队，围绕平台资产实施多元化、大数据、反欺诈等一系列风险控制措施，确保资产质量；并引入征信交叉核验、OCR识别、风控决策引擎等国内外领先金融科技技术，防范系统性风险，确保资产真实性及安全性。',
                    '二、投后管理严谨',
                    '向借款人发放贷款的同时，实现对借款人资金流向的控制，项目安全性得到极大提高。',
                    // '三、资金安全',
                    // '人众金服客户资金由存管银行进行管控。',
                    // '存管银行根据专款专用的原则，对客户资金进行严格的管控，确保用户账户资金安全。',
                    '三、法律保障',
                    '人众金服平台及业务受法律保护，透明合规，强大的法务团队为人众金服用户提供法律支持及保障。',
                    ' 四、隐私保障',
                    '通过全程加密、系统隔离、安全检测，提供全方位的隐私保障。',
                ]
            },
        ];
        let {introduce, zcms, safeguard} = introdecuArr[type] || introdecuArr[1];
        if (!!newBorrow) {
            introduce = introdecuArr[0].introduce
            zcms = introdecuArr[0].zcms;
            safeguard = introdecuArr[0].safeguard
        }
        return (
            <div className={projectDetail.details}>
                <div className={projectDetail.introduceTitle}>
                    <div className={projectDetail.line}></div>
                    产品介绍
                </div>
                <p>{introduce}</p>
                <div className={projectDetail.introduceTitle}>
                    <div className={projectDetail.line}></div>
                    底层资产描述
                </div>
                <p>{zcms}</p>
                <div className={projectDetail.introduceTitle}>
                    <div className={projectDetail.line}></div>
                    保障措施
                </div>
                {safeguard.map((v, i) => < p key={i}>{v}</p>)}
                <div className={projectDetail.introduceTitle}>
                    <div className={projectDetail.line}></div>
                    风险提示
                </div>
                <a href="/riskNotice.html" target="_blank" style={{color: '#4d93ea', paddingLeft: '18px'}}>《风险提示告知书》</a>
            </div>
        )
    }
}

//借款信息1
class Information1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            totalPage: 10,
            personal: [],
            showDetail: false,
            detail: [],
            type: 0,//借款人类型 	0 个人 ， 1 企业
            rowData:{}
        }
    }

    getUserInfo = async () => {
        let param = {
            bid: this.props.bid,
            pageNum: this.state.currentPage,
            numPerPage: 10,
            productType: this.props.type
        }
        const borrowInfo = await API.get(API.borrowinfo, param);
        this.setState({
            personal: borrowInfo.recordList || [],
            type: borrowInfo.recordList[0] && borrowInfo.recordList[0].type || 0,
            totalPage: !!borrowInfo.totalPage && borrowInfo.totalPage || 1,
        })
    }

    async componentWillMount() {
        this.getUserInfo()
    }

    currentChange = async (currentPage) => {
        await this.setState({
            currentPage
        })
        this.getUserInfo()
    }

    showDetail = (rowData) => {
        this.setState({
            showDetail: true,
            rowData:rowData
        })
    }

    render() {
        const {currentPage, totalPage, personal = [], showDetail, type,rowData={}} = this.state;
        const productType=this.props.type;//1：众供宝， 2:众消宝， 3：R计划， 4：众汽宝
        const borrowPerson = personal.map((v, i) => {
            if (type == 0) {
                return (
                    <ul key={i} className="body">
                        <li>{!!v.name ? v.name : '--'}</li>
                        <li>{!!v.cardId ? v.cardId : '--'}</li>
                        <li>{!!v.mobile ? v.mobile : '--'}</li>
                        <li>{!!v.purposeLoan ? v.purposeLoan : '--'}</li>
                        <li>{!!v.borroAmount ? v.borroAmount : '--'}</li>
                        <li onClick={() => {
                            this.showDetail(v)
                        }} style={{color: '#4d93ea', cursor: 'pointer'}}>查看详情
                        </li>
                    </ul>
                )
            } else if (type == 1) {
                return (
                    <ul key={i} className="body">
                        <li style={{width: '100px'}}>{v.companyName}</li>
                        <li style={{width: '170px'}}>{!!v.industry ? v.industry : '--'}</li>
                        <li>{!!v.regCapital ? v.regCapital : '--'}元人民币</li>
                        <li>{!!v.regAddress ? v.regAddress : '--'}</li>
                        <li>{!!v.companyCreateTime ? v.companyCreateTime.split(' ')[0] : '--'}</li>
                        <li style={{width: '70px'}}>{!!v.frdbName ? v.frdbName : '--'}</li>
                        <li style={{width: '141px'}}>{!!v.purposeLoan ? v.purposeLoan : ''}</li>
                        <li>{!!v.borroAmount ? v.borroAmount : ''}</li>
                        <li onClick={() => {
                            this.showDetail(v)
                        }} style={{color: '#4d93ea', cursor: 'pointer'}}>查看详情
                        </li>
                    </ul>
                )
            }

        })
        const detailArr = type == 0 ? [
            {
                title: '资金运用情况',
                content: rowData.applicationAmount||'--'
            },
            {
                title: '在本平台逾期次数',
                content: rowData.overdueCount||'0'
            },
            {
                title: '在本平台逾期总金额',
                content: rowData.overdueAmount||'0'
            },
            {
                title: '其他借款信息',
                content: rowData.otherInfo||'无'
            },
            {
                title: '涉诉情况',
                content:rowData.prosecute|| '无'
            },
            {
                title: '行政处罚情况',
                content: rowData.punishments||'无'
            }
        ] : [
            {
                title: '资金运用情况',
                content: rowData.applicationAmount||'--'
            },
            {
                title: '经营状况及财务状况',
                content: rowData.financial||'--'
            },
            {
                title: '在本平台逾期次数',
                content: rowData.overdueCount||'0'
            },
            {
                title: '在本平台逾期总金额',
                content: rowData.overdueAmount||'0'
            },
            {
                title: '其他借款信息',
                content: rowData.otherInfo||'无'
            },
            {
                title: '股东信息',
                content:rowData.shareholder|| '--'
            },
            {
                title: '法定代表人信用信息',
                content:rowData.credit|| '--'
            },
            {
                title: '实缴资本',
                content: rowData.contributed||'--'
            },
            {
                title: '办公地点',
                content:rowData.officeLocation|| '--'
            },
            {
                title: '经营区域',
                content: rowData.manageDistrict||'--'
            },
            {
                title: '涉诉情况',
                content:rowData.prosecute|| '无'
            },
            {
                title: '行政处罚情况',
                content:rowData.punishments|| '无'
            }
        ]

        const addDetail=(productType==2||productType==3)?[
            {
                title: '还款来源',
                content:'个人收入'
            },
            {
                title:'还款保障措施',
                content:'信用借款无担保'
            },
            {
                title:'借款人征信报告情况',
                content:'无报告'
            }
        ]:[
            {
                title: '还款来源',
                content:'融资方自有资金还款或核心企业/融资方法人提供无限连带担保责任',
                style:{
                    lineHeight:'21px',
                    textAlign:'left',
                    padding:'10px 0'
                }
            },
            {
                title:'还款保障措施',
                content:'核心企业/融资方法人提供无限连带担保责任',
                style:{
                    lineHeight:'21px',
                    textAlign:'left',
                    padding:'10px 0'
                }
            },
            {
                title:'借款人征信报告情况',
                content:'无报告'
            }
        ]
        const totalArr=detailArr.concat(addDetail);
        const detail = totalArr.map((v, i) => {
            return (<li key={i}>
                <span className={projectDetail.desc}>{v.title}</span>
                <span style={v.style}>{v.content}</span>
            </li>)
        })
        return (
            <div className={projectDetail.details}>
                {type == 1 && <div>
                    <div className={projectDetail.introduceTitle}>
                        <div className={projectDetail.line}></div>
                        借款企业工商信息
                    </div>
                    <div className="table">
                        <ul className="head">
                            <li style={{width: '100px'}}>全称或简称</li>
                            <li style={{width: '170px'}}>所属行业</li>
                            <li>注册资本</li>
                            <li>注册地址</li>
                            <li>成立时间</li>
                            <li style={{width: '70px'}}>法定代表人</li>
                            <li style={{width: '141px'}}>借款用途</li>
                            <li>借款金额（元）</li>
                            <li>借款人详情</li>
                        </ul>
                        {borrowPerson}
                    </div>
                </div>
                }
                {type == 0 && <div>
                    <div className={projectDetail.introduceTitle}>
                        <div className={projectDetail.line}></div>
                        借款人信息
                    </div>
                    <div className="table person">
                        <ul className="head">
                            <li>姓名</li>
                            <li>身份证</li>
                            <li>手机号</li>
                            <li>借款用途</li>
                            <li>借款金额（元）</li>
                            <li>借款人详情</li>
                        </ul>
                        {borrowPerson}
                    </div>
                </div>}
                {totalPage > 1 &&
                <Pagination currentPage={currentPage} pages={totalPage} onCurrentChange={(current) => {
                    this.currentChange(current)
                }}/>}
                <div className={projectDetail.detailMask} style={{display: showDetail ? 'block' : 'none'}}>
                    <div className={projectDetail.personDetail}>
                        <h4>借款人信息详情</h4>
                        <div onClick={() => {
                            this.setState({
                                showDetail: false
                            })
                        }} className={projectDetail.close}></div>
                        <ul>
                            {detail}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

//投资记录
class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            tenderList: [],
            totalPage: 0
        }
    }

    async getTenderList() {
        let param = {
            bid: this.props.bid,
            pageNum: this.state.currentPage,
            numPerPage: 10,
            productType: this.props.type
        }
        const tenderObj = await API.post(API.tenderList, param);//投资列表
        const {recordList = [], totalPage} = tenderObj
        this.setState({
            tenderList: recordList,
            totalPage
        })
    }

    async componentWillMount() {
        this.getTenderList();
    }

    async onCurrentChange(i) {
        await this.setState({
            currentPage: i
        })
        this.getTenderList();
    }

    render() {
        const {currentPage, totalPage, tenderList = []} = this.state;
        const lis = tenderList.map((v, i) => {
            return (
                <ul key={i} className={projectDetail.HistoryCon}>
                    <li>{v.seqNo}</li>
                    <li>{v.realName}</li>
                    <li>{v.money}</li>
                    <li>{v.addTime.replace(/\//g, '-')}</li>
                    <li>{v.status == 0 ? '处理中' : '成功'}</li>
                </ul>
            )
        });
        return (
            <div>
                <ul className={projectDetail.HistoryTitle}>
                    <li>序号</li>
                    <li>用户名</li>
                    <li>投资金额</li>
                    <li>投资时间</li>
                    <li>状态</li>
                </ul>
                <div className={projectDetail.details}>
                    {lis}
                    {this.state.totalPage > 1 &&
                    <Pagination
                        currentPage={currentPage} pages={totalPage}
                        onCurrentChange={(current) => {
                            this.onCurrentChange(current)
                        }}/> }
                </div>
            </div>
        )
    }
}


//问题组件
class Answer extends Component {
    render() {
        return (
            <li className="ant-menu-submenu">
                <p className="ant-menu-submenu-title"><span>Q . </span>{this.props.v.question}</p>
                <div className="ant-menu-item">
                    <pre>{this.props.v.answer}</pre>
                </div>
            </li>
        )
    }
}
//常见问题
class Question extends Component {
    render() {
        const questionList = [
            {
                question: 'R计划具体是什么产品？',
                answer: 'R计划是平台推出的优先自动投标产品。经由出借人授权，并由系统为出借人实现分散投标，回款本息续投、提高投资效率的投标产品。'
            },
            {
                question: 'R计划每天都有吗？',
                answer: 'R计划会根据每天现有标的的情况，不定时更新。'
            },
            {
                question: 'R计划与其他产品有什么区别？',
                answer: 'R计划是自动投标产品，参与R计划，由系统自动分散投标，回款本息续投；平台其他标的则是到期还款，不会自动续投。'
            },
            {
                question: 'R计划收益是如何计算的？',
                answer: 'R计划是分散投资，每个标的期满后的回款方式与其他投资方式一致，回款后本金利息一起进行自动续投。'
            },
            {
                question: 'R计划可以进行债权·吗？',
                answer: '不能，R计划开启后会进入投资锁定期，锁定期内不能进行转让。'
            },
            {
                question: 'R计划是否收取管理费？',
                answer: 'R计划与人众金服其他标的一样，不收取任何费用。'
            },
            {
                question: 'R计划为什么会提前退出？',
                answer: '当R计划对应的标的回款后，如果没有合适期限的标的可以进行续投，则该部分资金需要回到账户可用余额，不再进行续投，从而提前退出当前投资计划。'
            },
            {
                question: 'R计划是否可以使用红包或加息券？',
                answer: 'R计划支持使用红包或者加息券，一个定期R计划可使用一张红包券或者加息券。注意：使用加息券所得利息不与本息同时到账，到账时间将会延迟1到2小时。'
            }
        ];
        const list = questionList.map((v, i) => {
            return <Answer key={i} v={v}/>
        })
        return (
            <div className={projectDetail.details}>
                <div className={projectDetail.introduceTitle}>
                    <div className={projectDetail.line}></div>
                    常见问题
                </div>
                <ul className="question_list">
                    {list}
                </ul>
            </div>
        )
    }
}
//总
class ProjectDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: false,
            detail: {},
            progress: [],
            bid: this.getParam('id'),
            type: this.getParam('type'),
            newBorrow: this.getParam('newBorrow'),
        }
    }

    login = () => {
        this.setState({
            display: true
        })
    }
    closeLogin = () => {
        this.setState({
            display: false
        })
    }

    async componentWillMount() {
        const {bid, type} = this.state;
        const param = {
            bid,
            productType: type
        }
        let progress = {
            obj: []
        }
        const detailObj = await API.post(API.detail, param, true);//产品详情
        if (type !== '3') {
            progress = await API.post(API.progress, param, true);//项目历程
        }
        this.setState({
            detail: detailObj,
            progress: progress.obj
        })
        const riskFlag=detailObj.obj.responceRiskDto && detailObj.obj.responceRiskDto.riskFlag ||0
        this.props.dispatch(setAgreeRiskStatus(riskFlag))
    }

    getParam = (name) => {
        const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        const r = window.location.search.substr(1).match(reg);
        if (r != null)return unescape(r[2]);
        return null;
    }

    render() {
        const {
            detail = {},
            progress = [],
            bid,
            display,
            type = 0,//1：众供宝， 2:众消宝， 3：R计划， 4：众汽宝
            newBorrow
        } = this.state
        return (
            <div className="animate-route">
                <TopBar tag="projectList"/>
                <Detail
                    isLogined={this.props.store.userInfo.uid}
                    login={this.login}
                    {...detail}
                    progress={progress}
                    type={type}
                    newBorrow={newBorrow}
                />
                <Increase/>
                <Introduce bid={bid} type={type} newBorrow={newBorrow}/>
                <Footer/>
                <LoginBox display={display}
                          closeLogin={this.closeLogin}
                />
            </div>
        )
    }
}

ProjectDetail = connect((store) => ({store: store}))(ProjectDetail);


render(<Provider store={store}>
    <ProjectDetail />
</Provider>, document.getElementById('app'));
