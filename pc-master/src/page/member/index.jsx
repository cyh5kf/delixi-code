import React, {Component} from "react";
import {render} from "react-dom";
import {
    BrowserRouter,
    Router,
    HashRouter,
    Match,
    Route,
    Link,
    hashHistory,
    IndexLink,
    Redirect,
    NavLink,
    Switch
} from 'react-router-dom';
import {Provider, connect} from "react-redux";

import Css from "@/assets/css/member/index.scss";

import TopBar from "@/components/TopBar/TopBar.jsx";
import TopBanner from "@/components/TopBanner/TopBanner.jsx";
import Bottom from "@/components/Bottom/Bottom.jsx";
import OpenCunGuanDialog from "@/components/OpenCunGuanDialog/index.jsx"
import Msg from '@/components/Msg'


import store from "@/store/store.js";

import API from "@/api/api.js";
import  authLogin from "@/util/authLogin.js";

//异步加载需要用bundle组件进行加载

import Bundle from '@/util/bundle.jsx';
/**左侧导航区域**/
const MemberMenu_Loader = require('bundle-loader?lazy&name=member-[name]!@/components/MemberMenu/MemberMenu.jsx');
const MemberMenu = (props) => (<Bundle load={MemberMenu_Loader}>{(Comp) => <Comp {...props}/>}</Bundle>);
/**右侧内容区域**/
const MemberContent_Loader = require('bundle-loader?lazy&name=member-[name]!@/components/MemberContent/MemberContent.jsx');
const MemberContent = (props) => (<Bundle load={MemberContent_Loader}>{(Comp) => <Comp {...props}/>}</Bundle>);
/**账户中心**/
const AccountIndex_Loader = require('bundle-loader?lazy&name=member-[name]!@/page/member/AccountIndex.jsx');
const AccountIndex = (props) => (<Bundle load={AccountIndex_Loader}>{(Comp) => <Comp {...props}/>}</Bundle>);

const AccountBorrowIndex_Loader = require('bundle-loader?lazy&name=member-[name]!@/page/member/AccountBorrowIndex.jsx');
const AccountBorrowIndex = (props) => (<Bundle load={AccountBorrowIndex_Loader}>{(Comp) => <Comp {...props}/>}</Bundle>);


/**资金明细**/
const FinanceDetail_Loader = require('bundle-loader?lazy&name=member-[name]!@/page/member/FinanceDetail.jsx');
const FinanceDetail = (props) => (<Bundle load={FinanceDetail_Loader}>{(Comp) => <Comp {...props}/>}</Bundle>);

/**充值**/
const Recharge_Loader = require('bundle-loader?lazy&name=member-[name]!@/page/member/Recharge.jsx');
const Recharge = (props) => (<Bundle load={Recharge_Loader}>{(Comp) => <Comp {...props}/>}</Bundle>);
/**提现**/
const WithDrawCash_Loader = require('bundle-loader?lazy&name=member-[name]!@/page/member/WithDrawCash.jsx');
const WithDrawCash = (props) => (<Bundle load={WithDrawCash_Loader}>{(Comp) => <Comp {...props}/>}</Bundle>);

// 借款人提现页面
const WithDrawCashBorrow_Loader = require('bundle-loader?lazy&name=member-[name]!@/page/member/withDrawCashBorrow.jsx');
const WithDrawCashBorrow = (props) => (<Bundle load={WithDrawCashBorrow_Loader}>{(Comp) => <Comp {...props}/>}</Bundle>);

/**我的优惠券**/
const MyCoupon_Loader = require('bundle-loader?lazy&name=member-[name]!@/page/member/MyCoupon.jsx');
const MyCoupon = (props) => (<Bundle load={MyCoupon_Loader}>{(Comp) => <Comp {...props}/>}</Bundle>);

/**我的投资**/
const MyTender_Loader = require('bundle-loader?lazy&name=member-[name]!@/page/member/MyTender.jsx');
const MyTender = (props) => (<Bundle load={MyTender_Loader}>{(Comp) => <Comp {...props}/>}</Bundle>);
/**R计划**/
const Rplan_loader = require('bundle-loader?lazy&name=member-[name]!@/page/member/Rplan.jsx');
const Rplan = (props) => (<Bundle load={Rplan_loader}>{(Comp) => <Comp {...props}></Comp>}</Bundle>)

/**安全中心**/
const SafeCenter_Loader = require('bundle-loader?lazy&name=member-[name]!@/page/member/SafeCenter.jsx');
const SafeCenter = (props) => (<Bundle load={SafeCenter_Loader}>{(Comp) => <Comp {...props}/>}</Bundle>);


class MemberIndex extends Component {
    constructor(props) {
        super(props);
        this.menuConfig = [//投资人个人中心左侧导航
            {text: "账户首页", to: "/index", component: AccountIndex},
            {
                text: '我的资产',
                sub: [
                    {text: "资金明细", to: "/financeDetail", component: FinanceDetail},
                    {text: "充值", to: "/recharge", component:Recharge,checkRealName:true},
                    {text: "提现", to: "/withdrawCash", component: WithDrawCash,checkRealName:true},
                    {text: "我的优惠券", to: "/myCoupon", component: MyCoupon}
                ]
            },
            {
                text: "我的投资",
                sub: [
                    {text: "单标项目", to: "/myTender", component: MyTender},
                    {text: "R计划", to: "/rplan", component: Rplan},
                ]
            },
            {text: "安全中心", to: "/safeCenter", component: SafeCenter},
        ];
        this.borrowMenuConfig=[//借款人账户中心左侧导航
            {text: "账户首页", to: "/index", component: AccountBorrowIndex},
            {text: "提现", to: "/withDrawCashBorrow", component: WithDrawCashBorrow},
        ]
        this.state = {
            isLogined: true,//默认用户已经登录  因为外面入口已经做了点击判断，这里的页面一旦进入就默认登录,
            show:false
        }
    }

    async componentWillMount() {
        let hasLogined = await authLogin();
        if (!hasLogined) {
            this.setState({
                isLogined: false
            })
        }
    }

    componentDidMount() {

    }
    render() {
        const {
            isLogined,
        } = this.state

        let {
            userType=1,//1：投资人 2：借款人 3：既是投资人又是借款人   如果没有该字段  则默认为投资人
        }=this.props.store.userInfo
        return (
            <div className="animate-route">
                <TopBar tag={'memberIndex'}/>
                {!isLogined ? location.href = '/index.html' :
                    <HashRouter>
                        <div className={Css.wraper}>
                            <MemberMenu style={{float: 'left'}}
                                        routeConfig={userType==2?this.borrowMenuConfig:this.menuConfig}
                                        userType={userType}
                            />
                            <MemberContent style={{float: 'right'}}
                                           routeConfig={userType==2?this.borrowMenuConfig:this.menuConfig}
                            />
                            {/*{!this.props.store.userInfo.realNameStatus && <OpenCunGuanDialog/>}*/}
                        </div>
                    </HashRouter>
                }
                <Bottom/>
                <Msg/>
            </div>
        );
    }
}

MemberIndex = connect((store) => ({store}))(MemberIndex);

render(<Provider store={store}>
    <MemberIndex />
</Provider>, document.getElementById('app'));
