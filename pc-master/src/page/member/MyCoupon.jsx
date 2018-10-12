import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from 'react-router'
import Css from "../../assets/css/member/myCoupon.scss";

import store from "@/store/store.js";
import API from "@/api/api.js";

import TabSelectNav from '@/components/TabSelectNav/TabSelectNav.jsx'
import Pagination from '@/components/Pagination/Pagination.jsx'
import Tip from '@/components/Tip/index.jsx'
import Blank from '@/components/Blank/index.jsx'

class CouponCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const {style = {}, card = {}} = this.props;

        const {
            status,
            couponType,
            name,
            up = 0,//红包  加息幅度
            minInterval,
            useDate=0,
            maxInterval,
            useTimeLimit=0,
            userLimitInterval=0,
            signLimit,//  0.等于 1.大于 2.大于等于 3.小于 4.小于等于
            startTimes,//激活时间
            endTimes,//有效期
            rateAmount,//加息金额
        } = card;

        const isJiaxi = couponType == 1 ? '' : Css.jiaxi;//1 红包 2 加息券
        const noActived = (status == 2) ? Css.noActived : '';//没有被激活
        const isHistory = status == 1 || status == 3 ? Css.disabled : '';//历史优惠券
        const moneyLimitText = () => {

            if (couponType == 1) {//红包
                if (minInterval * 1) {
                    return `投资满${minInterval}元可用`
                } else {
                    return '不限起投金额'
                }
            } else if (couponType == 2) {//加息券
                const config = {
                    0: `最高加息本金${rateAmount}元，加息${useDate}天`,
                    1: `全额加息，加息${useDate}天`,
                    2: `最高加息本金${rateAmount}元`,
                    3: `全额加息`
                }
                if (useDate * 1) {
                    return rateAmount * 1 ? config[0] : config[1]
                } else {
                    return rateAmount * 1 ? config[2] : config[3]
                }
            }
        }

        const tenderLimitText = () => {
            const redPacketconfig = {
                0: `限投资${useTimeLimit}天标的`,
                1: `${useTimeLimit}天以上标的可用`,
                2: `${useTimeLimit}天及以上标的可用`,
                3: `${useTimeLimit}天以下标的可用`,
                4: `${useTimeLimit}天及以下标的可用`,
                5: `${useTimeLimit}天至${userLimitInterval}天标的可用`,
                6: '任意标的可用',
            }
            if (useTimeLimit==0) {
                return redPacketconfig[6];
            } else {
                return redPacketconfig[signLimit];
            }
        }

        const rightTxt = () => {
            const liJi = <p>立<br/>即<br/>使<br/>用</p>;
            const jihuo = <p>待<br/>激<br/>活</p>;
            const hasUsed = <div className={`${Css.hasUsed} ${Css.cornStatus}`}></div>;
            const hasGuoQi = <div className={`${Css.hasGuoQi} ${Css.cornStatus}`}></div>;
            if (status == 0) {//未使用优惠券
                return liJi;
            } else if (status == 2) {
                return jihuo;
            } else if (status == 3) {
                return hasGuoQi;
            } else if (status == 1) {
                return hasUsed;
            }
        }

        return (
            <a href={!noActived && !isHistory ? "/projectList.html" : "javascript:void(0)"}>
                <li style={style} className={`${Css.card} ${isJiaxi} ${noActived} ${isHistory}`}>
                    <div className={Css.leftMoney}>
                        <p>{up}{couponType == 2 && <span>%</span>}</p>
                        <label>{couponType == 1 ? '红包' : '加息券'}</label>
                    </div>
                    <div className={Css.cont}>
                        <h5>{name}</h5>
                        <p>{moneyLimitText()}</p>
                        <p>{tenderLimitText()}</p>
                        {status == 0 && <label >有效期至：{endTimes}</label>}
                        {status == 2 && <label >激活时间：{startTimes}</label>}
                        {(status == 1 || status == 3) && <label >有效期至：{endTimes}</label>}
                    </div>
                    <div className={Css.rightTxt}>
                        {rightTxt()}
                    </div>
                </li>
            </a>
        )
    }
}

const ActiveCoupons = (props) => {
    const {lists = []} = props;
    const cardStyle = {
        float: 'left',
        margin: '0 50px 30px 0'
    }

    const cards = lists.map((item, index) => {
        return (
            <CouponCard style={cardStyle} key={index} card={item}/>
        )
    })
    return (
        <ul className={Css.cardUl}>
            {cards}
        </ul>
    );
}

const HistoryCoupons = (props) => {
    const {lists = []} = props;
    const cardStyle = {
        float: 'left',
        margin: '0 50px 30px 0'
    }

    const cards = lists.map((item, index) => {
        return (
            <CouponCard style={cardStyle} key={index} card={item}/>
        )
    })
    return (
        <ul className={Css.cardUl}>
            {cards}
        </ul>
    );
}

class MyCoupon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeNavIndex: 0,
            tipActive: false,
            numPerPage : 6,
            navs: [
                {
                    text: '未使用优惠券',
                    style: {
                        paddingLeft: 0
                    }
                },
                {text: '历史优惠券'}
            ],
            activeLists: [],
            historyList: [],
            activeCurrent: 1,
            historyCurrent: 1,
            activeTotalCount: 1,
            activeTotalPages: 1,
            historyTotalCount: 1,
            historyTotalPages: 1
        }
        this.onCurrentChange = this.onCurrentChange.bind(this);
        this.onHistoryChange = this.onHistoryChange.bind(this);
    }

    async componentWillMount() {
        const {
            numPerPage
        }=this.state
        const param = {
            token: this.props.store.userInfo.token,
            status: 0,
            type: 2,
            pageNum: 1,
            numPerPage
        }
        const obj = await API.get(API.getRedpacketList, param);
        const param1 = {
            token: this.props.store.userInfo.token,
            status: 1,
            type: 2,
            pageNum: 1,
            numPerPage,
        }
        const obj1 = await API.get(API.getRedpacketList, param1);
        await this.setState({
            activeLists: obj.recordList,
            historyList: obj1.recordList,
            activeTotalCount: obj.totalCount,
            activeTotalPages: obj.totalPage,
            historyTotalCount: obj1.totalCount,
            historyTotalPages: obj1.totalPage,
        })
    }

    componentDidMount() {

    }

    onReceiveCurrentTabNavChange(activeNavIndex) {
        this.setState({
            activeNavIndex
        })
    }

    toggleTipActiveStatus(e) {
        e.stopPropagation();
        this.setState({
            tipActive: !this.state.tipActive
        })
    }

    async onCurrentChange(currentpage) {
        await this.setState({
            activeCurrent: currentpage
        });
        const {
            numPerPage
        }=this.state
        const param = {
            token: this.props.store.userInfo.token,
            status: this.state.activeNavIndex,
            type: 2,
            numPerPage,
            pageNum: this.state.activeCurrent
        };
        const obj = await API.get(API.getRedpacketList, param);
        await this.setState({
            activeLists: obj.recordList,
        })

    }

    async onHistoryChange(currentpage) {
        const {
            numPerPage
        }=this.state

        await this.setState({
            historyCurrent: currentpage
        })
        const param = {
            token: this.props.store.userInfo.token,
            status: this.state.activeNavIndex,
            type: 2,
            numPerPage,
            pageNum: this.state.historyCurrent
        };
        const obj = await API.get(API.getRedpacketList, param);
        await this.setState({
            historyList: obj.recordList,
        });
    }

    render() {
        const {activeNavIndex, navs, activeLists, historyList, tipActive} = this.state;
        const TipStyle = {
            position: 'absolute',
            top: '25px',
            right: '0',
            width: '470px',
            borderRadius:'5px',
            border:'0'
        }

        return (
            <div className={Css.wrap} onClick={()=>{
                this.setState({
                    tipActive:false
                })
            }}>
                <h4 className={Css.pageTitle}>我的优惠券</h4>
                <div className={Css.navRow}>
                    <TabSelectNav activeIndex={activeNavIndex}
                                  navs={navs}
                                  style={{margin: '10px 0 0', width: '400px', float: 'left'}}
                                  onCurrentChange={(i) => {
                                      this.onReceiveCurrentTabNavChange(i)
                                  }}
                    />
                    <div className={Css.rules}>
                        <p style={{display: 'inline-block'}} onClick={(e) => {
                            this.toggleTipActiveStatus(e)
                        }}>优惠券使用规则&gt;</p>
                        <Tip active={tipActive}
                             style={TipStyle}
                             type={'fade'}
                        >
                            <div className={Css.tips}>
                                <p>优惠券使用规则</p>
                                <p>1、红包和加息券都有不同的使用条件和使用期限，如在期限内未使用，过期则失效；</p>
                                <p>2、红包不可用于投资抵扣，以返现的方式发放到帐户；</p>
                                <p>3、加息券产生的利息，根据加息券加息天数和加息本金而定，在投资项目到期后，自动发放到个人账户</p>
                                <p>4、用户在使用加息券之后发生债权转让，转让人和承接人都不享受加息券产生的利息，奖励不予以发放。</p>
                                <p>5、每次投资只能使用一张红包或者加息券。如果您有多张红包和加息券，可以分多次投资使用；</p>
                                <p>6、红包和加息券不能用于新手标和债权转让标的；</p>
                                <p>7、红包和加息券使用规则最终解释权在法律范围内归人众金服所有；</p>
                            </div>
                        </Tip>
                    </div>
                </div>
                <div style={{display: activeNavIndex == 0 ? 'block' : 'none'}}>
                {activeLists.length? <ActiveCoupons lists={activeLists}/>:<Blank activeNavIndex={activeNavIndex}></Blank>}
                    {activeLists.length?<Pagination key={1} pages={this.state.activeTotalPages}
                                                    currentPage={this.state.activeCurrent}
                                                    onCurrentChange={this.onCurrentChange}/>:''}
                </div>
                <div style={{display: activeNavIndex == 0 ? "none" : 'block'}}>
                {historyList.length? <HistoryCoupons lists={historyList}/>:<Blank></Blank>}
                    {historyList.length? <Pagination key={2} pages={this.state.historyTotalPages}
                                currentPage={this.state.historyCurrent}
                                onCurrentChange={this.onHistoryChange}/>:''}

            </div>
            </div>
        );
    }
}

MyCoupon = connect((store) => ({store}))(MyCoupon);
export default withRouter(MyCoupon);