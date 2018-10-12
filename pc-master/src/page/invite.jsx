import React, {Component} from "react";
import {render} from "react-dom";
import {Provider, connect} from "react-redux";
import {
    HashRouter,
    Route,
    NavLink,
    Switch,
    Redirect
} from 'react-router-dom';

import InviteCss from "@/assets/css/invite.scss";

import TopBar from "@/components/TopBar/TopBar.jsx";
import Bottom from "@/components/Bottom/Bottom.jsx";
import Pagination from '@/components/Pagination/Pagination.jsx'
import Login from '@/components/LoginPop/index.jsx'

import API from '@/api/api.js';
import store from "@/store/store.js";
import dateFormat from '@/util/dateFormat.js'


//邀请方式
class Method extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            inviteUrl: '',
            imgUrl: ''
        }
    }

    async componentWillMount() {
        const id = this.props.store.userInfo.uid;
        if (!!id) {
            const url = document.domain;
            let inviteUrl, wxUrl;
            inviteUrl = url + '/inviteRegister.html?uid=' + id
            if (url == 'testwww.51rz.com') {
                wxUrl = 'http://testm.51rz.com/invite/share?uid=' + id
            } else if (url == 'devwww.51rz.com') {
                wxUrl = 'http://devm.51rz.com/invite/share?uid=' + id
            } else if (url == 'wwww.51rz.com') {
                wxUrl = 'http://mobile.51rz.com/invite/share?uid=' + id
            } else {
                wxUrl = 'http://m.51rz.com/invite/share?uid=' + id
            }
            this.setState({
                inviteUrl: inviteUrl,
                userId: id
            })
            const obj = await API.get(API.getQrCode, {inviteUrl: wxUrl}, true);
            this.setState({
                imgUrl: obj.obj && obj.obj.code
            })
        }
    }

    copyUrl = () => {
        var contact = document.getElementById("url");
        if (contact) {
            contact.select();
            document.execCommand("Copy", false, null); // 执行浏览器复制命令
            contact.blur();
            this.refs.success.style.display = 'block';
            setTimeout(() => {
                this.refs.success.style.display = 'none';
            }, 2000)
        }
    }

    render() {
        let content, height;
        if (this.props.isLogined) {
            height = '500px';
            content = <div className={InviteCss.content}>
                <ul>
                    <li style={{height: '327px'}}>
                        <div className={InviteCss.step}>1</div>
                        <p>分享给好友</p>
                        <img src={"data:image/png;base64," + this.state.imgUrl}/>
                    </li>
                    <li style={{height: '327px'}}>
                        <div className={InviteCss.step}>2</div>
                        <p>好友注册时输入邀请码</p>
                        <p style={{color: '#ff7007', marginTop: '10px'}}>——我的邀请码——</p>
                        <p style={{
                            fontSize: '48px',
                            color: '#ef5933',
                            height: '170px',
                            lineHeight: '170px'
                        }}>{this.state.userId}</p>
                    </li>
                    <li style={{height: '327px', position: 'relative'}}>
                        <div className="copy_success" ref="success">链接复制成功</div>
                        <div className={InviteCss.step}>3</div>
                        <p>把我的专属链接发给好友</p>
                        <p style={{color: '#ff7007', marginTop: '10px'}}>——我的专属链接——</p>
                        <textarea className={InviteCss.mylink} name="" cols="30" rows="10" id="url"
                                  value={this.state.inviteUrl} readOnly></textarea>
                        <div className={InviteCss.loginbtn} style={{
                            width: '217px',
                            height: '41px',
                            marginTop: '17px',
                            fontSize: '18px',
                            lineHeight: '41px',
                            color: '#fff',
                            textAlign: 'center',
                            cursor: 'pointer',
                            borderRadius: '4px'
                        }} onClick={() => {
                            this.copyUrl()
                        }}>复制此链接
                        </div>
                    </li>
                </ul>
            </div>
        } else {
            height = '428px';
            content = <div className={InviteCss.content}>
                <ul>
                    <li style={{height: '126px'}}>
                        <div className={InviteCss.step}>1</div>
                        <p>二维码分享给好友</p>
                    </li>
                    <li style={{height: '126px'}}>
                        <div className={InviteCss.step}>2</div>
                        <p>好友注册时输入邀请码</p>
                    </li>
                    <li style={{height: '126px'}}>
                        <div className={InviteCss.step}>3</div>
                        <p>把我的专属链接发给好友</p>
                    </li>
                </ul>
                <div className={InviteCss.loginbtn}><a href="javascript:void(0)" onClick={() => {
                    this.props.openLogin()
                }}>登录获得</a></div>
            </div>
        }
        return (
            <div className={InviteCss.invite}>

                <div className={InviteCss.invite}>
                    <div className={InviteCss.method} style={{height: height}}>
                        <div className={InviteCss.recordtitle}>
                            <div className={InviteCss.title}>邀请方式</div>
                        </div>
                        {content}
                    </div>
                </div>
            </div>
        )
    }
}
Method = connect((store) => ({store: store}))(Method);


//邀请记录

class List extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {mobile, userRegistTime, tender} = this.props;
        return (
            <div className={InviteCss.recorehead} style={{
                height: '56px',
                lineHeight: '56px',
                borderRadius: '0px',
                color: '#555',
                background: '#fff'
            }}>
                <div style={{lineHeight: '56px', height: '56px'}}>{mobile ? mobile : '-'}</div>
                <div style={{lineHeight: '56px', height: '56px'}}>{dateFormat(userRegistTime, 'all')}</div>
                <div style={{lineHeight: '56px', height: '56px'}}>{tender ? '已投资' : '未投资'}</div>
            </div>
        )
    }
}

class Record extends Component {
    constructor(props) {
        super(props);
        this.state = {
            obj: {},
            currentPage: 1,
            currentList: [],
            pagePerNum: 5,
            displayReward: false,
            rewardObj: {},
            scrollObj: [],
            scrollIndex: 0
        }
    }

    async componentWillMount() {
        if (!!this.props.store.userInfo.uid) {
            this.getInviteIndex();
        }
        this.getInviteScroll();
        this.t = setInterval(() => {
            this.scroll();
        }, 2000)
    }

    getInviteScroll = async () => {
        const scrollObj = await API.get(API.inviteScroll, {}, true);
        this.setState({
            scrollObj: scrollObj.obj ? scrollObj.obj : []
        })
    }

    getInviteIndex = async () => {
        const inviteObj = await API.get(API.inviteList, {}, true);//邀请人列表
        const rewardObj = await API.get(API.rewardList, {}, true);//奖励记录列表
        const obj = inviteObj.obj || {};
        const {currentPage, pagePerNum} = this.state;
        let currentList = [];
        if (obj) {
            if (obj.list.length < this.state.pagePerNum) {
                currentList = obj.list
            } else {
                for (let i = (currentPage - 1) * pagePerNum; i < currentPage * pagePerNum; i++) {
                    if (i < obj.list.length) {
                        currentList.push(obj.list[i])
                    }
                }
            }
        }

        this.setState({
            obj: obj,
            currentList: currentList,
            rewardObj: rewardObj.obj
        })
    }

    async onCurrentChange(i) {
        await this.setState({
            currentPage: i
        })
        const {currentPage, pagePerNum, obj} = this.state;
        let currentList = [];
        if (obj.list.length < this.state.pagePerNum) {
            currentList = obj.list
        } else {
            for (let i = (currentPage - 1) * pagePerNum; i < currentPage * pagePerNum; i++) {
                if (i < obj.list.length) {
                    currentList.push(obj.list[i])
                }
            }
        }
        this.setState({
            currentList: currentList
        })
    }

    scroll = () => {
        const {scrollObj, scrollIndex} = this.state;
        if (scrollIndex >= scrollObj.length - 1) {
            return;
        }
        this.setState({
            scrollIndex: this.state.scrollIndex + 1
        })
        this.refs.inviteScroll.style.marginTop = this.state.scrollIndex * (-53) + 'px';
    }

    render() {
        let content;
        const {
            obj = {}, //邀请人列表
            currentList, //当前页码中的列表
            displayReward, //是否显示奖励列表
            currentPage, //当前页码
            pagePerNum, //一页几条数据
            rewardObj = {}, //奖励对象
            scrollObj = []
        } = this.state;
        const {isLogined} = this.props;
        if (isLogined) {
            if (currentList.length) {
                //有记录
                let lists = currentList.map((v, i) => {
                        return (
                            <List key={i} {...v}/>
                        )
                    }
                );
                content = <div className={InviteCss.lists}>
                    {lists}
                    <Pagination key="1" currentPage={currentPage} pages={Math.ceil(obj.list.length / pagePerNum)}
                                onCurrentChange={(i) => {
                                    this.onCurrentChange(i);
                                }
                                }/>
                </div>

            } else {
                //  无记录
                content = <div className={InviteCss.records}
                               style={{background: '#fff', marginLeft: '-29px', marginRight: '-29px'}}>
                    <img src="https://images.51rz.com/images/rebuild/pc/img/notlogin.png" alt=""
                         style={{float: 'left', marginLeft: '360px', marginTop: '40px'}}/><p style={{float: 'left',}}>
                    呼朋唤友拿奖励，赶快行动吧！</p>
                </div>
            }
        } else {
            content = <div className={InviteCss.records} style={{
                background: '#fff',
                marginLeft: '-29px',
                marginRight: '-29px'
            }}>
                <div className={InviteCss.loginbtn} style={{marginTop: '44px', marginBottom: '44px'}}><a
                    href="javascript:void(0)" onClick={() => {
                    this.props.openLogin()
                }}>登录后查看</a></div>
            </div>
        }
        //红包轮播
        const scroll = scrollObj.map((v, i) => {
            return <div key={i} className={InviteCss.item}>{v.hidePhone}获得{v.amount}元{v.type == 1 ? '现金' : '红包'}</div>
        })

        let rewardContent;//奖励
        const rewardType = ['返佣现金', '投资奖励现金红包', '投资奖励虚拟红包', '发放现金至余额']// 类型 1.返佣现金 2.投资奖励现金红包 3.投资奖励虚拟红包 4.发放现金至余额
        const sign = ['', '+', '-']
        if (!!rewardObj.page && rewardObj.page.recordList.length) {
            rewardContent = rewardObj.page.recordList.map((v, i) => {
                return <tr key={i}>
                    <td>{rewardType[v.type - 1]}</td>
                    <td>{dateFormat(v.createTime)}</td>
                    <td>{`${sign[v.paymentsType] + v.money}元${v.type == 3 ? '红包' : '现金'}`}</td>
                </tr>
            })
        }
        const {
            rewardSum,//奖励总额
            redPacketSum,//红包总额
            inExamineSum,//审核
        } = rewardObj

        const inviteNum = isLogined ? (obj.inviteCount ? obj.inviteCount : 0) : '0';//邀请人总数
        const totalRedpack = isLogined ? (obj.redPacketSum ? obj.redPacketSum : 0) : '0';//累计获得红包
        const cashSum = isLogined ? (obj.rewardSum ? obj.rewardSum : 0) : '0';//累计获得现金
        const exam = isLogined ? (obj.inExamineSum ? obj.inExamineSum : 0) : '0';//待发现金
        return (
            <div className={InviteCss.invite}>
                <div className={InviteCss.bg1}></div>
                <div className={InviteCss.record}>
                    <div className={InviteCss.recordtitle}>
                        <div className={InviteCss.title}>邀请记录</div>
                        <div className={InviteCss.noticeContent}>
                            <div className={InviteCss.content} ref="inviteScroll">
                                {scroll}
                            </div>
                        </div>
                    </div>
                    <div className={InviteCss.recordetail}>
                        <div className={InviteCss.nums}>
                            <p>邀请好友：<span className={InviteCss.num}>{inviteNum}</span> <span>人</span></p>
                            <p>待发现金：<span className={InviteCss.num}>{exam}</span> <span>元</span></p>
                            <p>累计现金：<span className={InviteCss.num}>{cashSum}</span> <span>元</span></p>
                            <p>累计红包：<span className={InviteCss.num}>{totalRedpack} </span><span>元</span></p>
                            <p style={{position: 'absolute', right: '-40px', top: '20px', width: '40px'}}><a
                                onClick={() => {
                                    !!isLogined && this.setState({
                                        displayReward: true
                                    })
                                }} style={{marginTop: '0'}} className={InviteCss.loginbtn}>奖励记录</a></p>
                        </div>
                        <div className={InviteCss.recordcontent}>
                            <div className={InviteCss.recorehead}>
                                <div>被邀请人</div>
                                <div>注册时间</div>
                                <div>是否投资</div>
                            </div>
                            {content}
                        </div>
                    </div>
                    <p style={{fontSize: '16px', color: '#999'}}>注：次日9点打款至账户余额</p>
                </div>
                <div className={InviteCss.reward_mask} style={{display: displayReward ? 'block' : 'none'}}>
                    <div className={InviteCss.reward}>
                        <div style={{cursor: 'pointer'}} className={InviteCss.close} onClick={() => {
                            this.setState({
                                displayReward: false
                            })
                        }}></div>
                        <h4>我的奖励记录</h4>
                        <div className={InviteCss.desc}>
                            <p>累计现金：<span>{rewardSum}元</span></p>
                            <p>累计红包：<span>{redPacketSum}元</span></p>
                            <p>待发现金：<span>{inExamineSum}元</span></p>
                        </div>
                        <div className="table"
                             style={{overflowY: 'scroll', width: '684px', height: '285px', overflowX: 'hidden'}}>
                            <table style={{width: '684px'}}>
                                <thead>
                                <tr>
                                    <th colSpan={3}>
                                        <span style={{width: '33.33%'}}>明细</span>
                                        <span style={{width: '33.33%'}}>时间</span>
                                        <span style={{width: '33.33%'}}>奖励</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {rewardContent}
                                </tbody>
                            </table>
                            <div className={InviteCss.records}
                                 style={{
                                     width: '100%',
                                     background: '#fff',
                                     display: !!rewardObj.page && rewardObj.page.recordList.length ? 'none' : 'block'
                                 }}>

                                <p style={{textAlign: 'center', verticalAlign: 'center', marginTop: '98px'}}><img
                                    src="https://images.51rz.com/images/rebuild/pc/img/notlogin.png" alt=""/>呼朋唤友拿奖励，赶快行动吧！
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
Record = connect((store) => ({store: store}))(Record);

//Loginbox
class Loginbox extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="loginMask" style={{display: this.props.display ? 'block' : 'none'}}>
                <Login close={this.props.closelogin}/>
            </div>
        )
    }
}

//人脉帮
class Contacts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentList: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
            historyList: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}], // 上月人脉榜
            showRules: false,
            showLast:false,
            myRank: {}
        }
    }

    async componentWillMount() {
        if (!!this.props.store.userInfo.uid) {
            this.getMyRank();
        }
        this.getRank();
        setTimeout(() => {
            this.getRank();
        }, 900000)
    }

    getMyRank = async () => {
        const my = await API.get(API.myInviteRank);
        this.setState({
            myRank: my
        })
    }
    getRank = async () => {
        const rank = await API.get(API.inviteRank, {}, true);
        if (JSON.parse(rank.obj).length) {
            this.setState({
                currentList: JSON.parse(rank.obj).concat(this.state.currentList)
            })
        }
    }

    getHistoryRank = async () =>{
        const rank = await API.get(API.myLastMonRanking, {}, true);
        this.setState({
            showLast: true,
            historyList: JSON.parse(rank.obj)
        })
    }

    render() {
        let content = null;
        let historyContent = null;
        const {showRules, myRank, showLast, historyList} = this.state;
        let {currentList} = this.state;
        const {isLogined} = this.props;
        const uid = this.props.store.userInfo.uid;
        var my;
        const rewardList = ['iPhone 8P 64G', '科沃斯扫地机器人', '800元加油卡', '500元京东卡', '九阳空气炸锅', 'LUCKYSAC懒人沙发', '飞利浦电动牙刷', '蕉下折叠太阳伞', 'LOVO家纺凉席', '南极人空调被'];
        const rankList = [currentList[0], currentList[1], currentList[2]];
        if (rankList[0].count) {
            if (rankList[0].count < 10) {
                rankList.unshift({});
            }
        }
        if (rankList[1].count) {
            if (rankList[1].count < 8) {
                rankList.splice(1, 0, {paiming: 2})
            }
        }
        if (rankList[2].count) {
            if (rankList[2].count < 5) {
                rankList.splice(2, 0, {paiming: 3})
            }
        }
        currentList = rankList.concat(currentList.slice(3, 10));
        currentList = currentList.slice(0, 10);
        if (currentList.length) {
            if (isLogined) {
                const myIndex = currentList.filter((item, index) => {
                    item.rank = index + 1
                    return item.inviteUser == uid
                })
                if (myIndex.length) {
                    my = <li className={'rank' + myIndex[0].rank}>
                        <div>{myIndex[0].rank}</div>
                        <div>我</div>
                        <div>{myIndex[0].count}</div>
                        <div>{rewardList[myIndex[0].rank - 1]}</div>
                    </li>
                } else {
                    my = <li>
                        <div>-</div>
                        <div>我</div>
                        <div>{myRank.count}</div>
                        <div>暂无奖品</div>
                    </li>
                }
            } else {
                my = <li style={{display: 'none'}}>
                    <div>-</div>
                    <div>我</div>
                    <div>{myRank.count}</div>
                    <div>无</div>
                </li>
            }

            let lists = currentList.map((v, i) => {
                    return (
                        <li key={i} className={'rank' + (i + 1)}>
                            <div>{i + 1}</div>
                            <div>{v.inviteHidePhone ? v.inviteHidePhone : '-'}</div>
                            <div>{v.count ? v.count : '-'}</div>
                            <div>{rewardList[i]}</div>
                        </li>
                    )
                }
            );
            content = <ul className={InviteCss.lists} style={{paddingBottom: '30px'}}>
                {my}
                {lists}
            </ul>
        }
        if (historyList.length) {
            let historyLists = historyList.map((v, i) => {
                return (
                    <li key={i} className={'rank' + (i + 1)}>
                        <div>{i + 1}</div>
                        <div>{v.inviteHidePhone ? v.inviteHidePhone : '-'}</div>
                        <div>{v.count ? v.count : '-'}</div>
                        <div>{rewardList[i]}</div>
                    </li>
                )
            }
            );
            historyContent = <ul className={InviteCss.lists} >
                {historyLists}
            </ul>
        }
        
        return (
            <div className={InviteCss.contact}>
                <div className={InviteCss.invite}>
                    <div className={InviteCss.record}>
                        <p style={{position: 'absolute', right: '-40px', top: '20px', width: '40px'}}><a
                            onClick={() => {
                                this.setState({
                                    showRules: true
                                })
                            }} style={{marginTop: '0'}} className={InviteCss.loginbtn}>规则说明</a></p>

                        <p style={{position: 'absolute', right: '-40px', top: '158px', width: '40px'}}><a
                            onClick={() => {
                               this.getHistoryRank()
                            }} style={{marginTop: '0',height:'144px'}} className={InviteCss.loginbtn}>6月人脉榜</a></p>
                        <div className={InviteCss.recordtitle}>
                            <div className={InviteCss.title}>人脉榜</div>
                        </div>
                        <p style={{width: '930px', margin: '20px auto', fontSize: '18px', color: '#999'}}>
                            活动期间对合伙人新增的已投资好友人数进行排名（活动期间好友需累计投资任意标≥5000元），对最终上榜者奖励对
                            应的奖品。</p>
                        <div className={InviteCss.recordetail}>
                            <div className={InviteCss.recordcontent}>
                                <div className={InviteCss.recorehead}>
                                    <div>排行榜</div>
                                    <div>合伙人</div>
                                    <div>新增已投资好友人数</div>
                                    <div>奖品</div>
                                </div>
                                {content}
                            </div>
                        </div>
                        
                        <p style={{fontSize: '16px', color: '#999'}}>注：排行榜每15分钟刷新</p>
                    </div>
                </div>
                <div className={InviteCss.reward_mask} style={{display: showRules ? 'block' : 'none'}}>
                    <div className={InviteCss.reward} style={{minHeight: '441px', padding: '45px 43px'}}>
                        <div style={{cursor: 'pointer'}} className={InviteCss.close} onClick={() => {
                            this.setState({
                                showRules: false
                            })
                        }}></div>
                        <h4 style={{fontSize: '24px', color: '#222'}}>规则说明</h4>
                        <div className={InviteCss.article}
                             style={{fontSize: '16px', color: '#555', lineHeight: '32px'}}>
                            人脉榜时间：7月1日-7月31日；<br/>
                            1、新增好友人数定义：好友需在活动时间内注册且累计投资任意标≥5000元；<br/>
                            2、前三名奖励均设有最低人数要求，分别为10、8、5人，合伙人若没有达到最低人数要求，则只能获得下一档满足条件的奖励；<br/>
                            3、当新增好友人数出现相同时，以合伙人最后一个好友满足投资条件的时间先后排名，排行榜信息每15分钟刷新一次；<br/>
                            4、实物奖励将在活动结束后14个工作日内发放，若活动结束3个工作日内客服联系不上获奖用户，则视为用户自动放弃。
                        </div>
                    </div>
                </div>

                <div className={InviteCss.reward_mask} style={{display: showLast ? 'block' : 'none'}}>
                    <div className={InviteCss.reward} style={{height:'450px', padding: '30px', top: '50%'}}>
                        <div style={{cursor: 'pointer'}} className={InviteCss.close} onClick={() => {
                            this.setState({
                                showLast: false
                            })
                        }}></div>
                        <h4 style={{fontSize: '24px', color: '#222'}}>6月人脉榜</h4>
                        <div className={InviteCss.lastArticle}
                             style={{fontSize: '16px', color: '#555', lineHeight: '32px'}}>
                            <div className={InviteCss.lastTitle}>
                                <div>排名</div>
                                <div>合伙人</div>
                                <div>新增已投资好友人数</div>
                                <div>奖品</div>
                            </div>
                            {historyContent}
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
Contacts = connect((store) => ({store: store}))(Contacts);
class Rules extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayExample: false,
            showContracts:true
        }
    }

    async componentWillMount() {
        const time = await API.get(API.nowDate);
        const timeStr= "2018/07/31 23:59:59";
        const nowTime = new Date(Date.parse(timeStr)).getTime();
        if(time > nowTime) {
            this.setState({
                showContracts:false
            })
        }
    }

    render() {
        const {displayExample,showContracts} = this.state;
        const {isLogined} = this.props;
        return (
            <div>
                <div className={InviteCss.invite_gift}>
                    <div className={InviteCss.rules}>
                        <div className={InviteCss.recordtitle}>
                            <div className={`${InviteCss.title} ${InviteCss.big}`}>邀友投资即送</div>
                        </div>
                        <div className={InviteCss.send}>
                            <p>好友注册起30天内投资满足如下条件，邀请人可获得相应的红包以及现金，奖励可叠加领取。</p>
                            <ul>
                                <li>
                                    <img src="https://images.51rz.com/images/rebuild/invite/invite_middle.png" alt=""/>
                                </li>
                                <li>
                                    <img src="https://images.51rz.com/images/rebuild/invite/invite_big.png" alt=""/>
                                </li>
                            </ul>
                        </div>

                    </div>
                    <div className={InviteCss.rules}>
                        <p style={{position: 'absolute', right: '-40px', top: '20px', width: '40px'}}><a
                            onClick={() => {
                                this.setState({
                                    displayExample: true
                                })
                            }} style={{marginTop: '0'}} className={InviteCss.loginbtn}>案例说明</a></p>
                        <div className={InviteCss.rulestitle}>
                            <div className={InviteCss.recordtitle}>
                                <div className={`${InviteCss.title} ${InviteCss.big}`}>最高0.2%返佣</div>
                            </div>
                        </div>
                        <div className={InviteCss.back}>
                            <p className={InviteCss.tip_text}>好友自注册起30天内投资满足以下条件，则邀请人最高可享受好友每笔投资金额的0.2%佣金，上不封顶！</p>
                            <table>
                                <thead>
                                <tr>
                                    <th colSpan={2}>
                                        <span>好友投资期限</span>
                                        <span>邀请人可享佣金</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>30天≤投资期限＜90天</td>
                                    <td>每笔投资金额<span>*0.1%</span></td>
                                </tr>
                                <tr>
                                    <td>90天≤投资期限</td>
                                    <td>每笔投资金额<span>*0.2%</span></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className={InviteCss.reward_mask} style={{display: displayExample ? 'block' : 'none'}}>
                            <div className={InviteCss.reward} style={{minHeight: '203px'}}>
                                <div style={{cursor: 'pointer'}} className={InviteCss.close} onClick={() => {
                                    this.setState({
                                        displayExample: false
                                    })
                                }}></div>
                                <h4 style={{fontSize: '24px', color: '#222'}}>案例说明</h4>
                                <p style={{fontSize: '16px', color: '#555'}}>
                                    若好友投资90天标10万元，则邀请人可以获得200元（100000元*0.2%）佣金奖励</p>
                            </div>
                        </div>
                    </div>
                    {showContracts && <Contacts isLogined={isLogined}/>}
                    <div className={InviteCss.rules}>
                        <div className={InviteCss.rulestitle}>
                            <div className={InviteCss.recordtitle}>
                                <div className={`${InviteCss.title} ${InviteCss.big}`}>好友专享福利</div>
                            </div>
                        </div>
                        <img style={{margin: '10px auto 20px', display: 'block'}}
                             src="https://images.51rz.com/images/rebuild/invite/welfare.png" alt=""/>
                        <div className={InviteCss.reward}>¥1716注册红包+2张加息券+<span>10元现金</span></div>
                        <p>（10元现金需自注册起30天内累计投资任意标≥5000元）</p>
                    </div>
                </div>
                <div className={InviteCss.explain}>
                    <div className={InviteCss.rule_detail}>
                        <h3>活动说明</h3>
                        <div className={InviteCss.article}>
                            1、100元红包的使用条件为投资30天及以上标满5000元可用；<br/>
                            2、若好友投资满足活动要求，现金奖励将于次日发放至您的账户余额；<br/>
                            3、4月4日（含）后邀请的好友，邀请人享受当前版本邀友福利；<br/>
                            4、4月4日前邀请的好友，邀请人享受之前版本邀友福利，即好友注册起7天内投资满足条件，邀请人可获得相应的红包、现金，以及自好友<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            注册起180天内所有投资对应的佣金；<br/>
                            5、债转标不参与活动，另若发现邀请人恶意刷奖，一经查实将取消奖励资格；<br/>
                            6、如有疑问请致电客服：400-655-8858。(咨询时间：9:00-21:00)。<br/>
                            * 本活动最终解释权在法律范围内归人众金服所有
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class Invite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: false
        }
    }

    closelogin = () => {
        this.setState({
            display: false
        })
    }
    openLogin = () => {
        this.setState({
                display: true
            }
        )
    }

    render() {
        let isLogined = this.props.store.userInfo.uid;
        return (
            <div>
                <TopBar isLogined={isLogined} tag={'invite'}></TopBar>
                <Record isLogined={isLogined} openLogin={this.openLogin}/>
                <Method isLogined={isLogined} openLogin={this.openLogin}/>
                <Loginbox display={this.state.display} closelogin={this.closelogin}/>
                <Rules isLogined={isLogined}/>
                <Bottom/>
            </div>
        )
    }
}

Invite = connect((store) => ({store: store}))(Invite);

render(<Provider store={store}>
    <Invite/>
</Provider>, document.getElementById('app'))