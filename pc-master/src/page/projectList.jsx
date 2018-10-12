import React, {Component} from 'react'
import {Provider, connect} from "react-redux"
import {render} from 'react-dom'
import Css from '@/assets/css/projectList.scss'
import Dialog from '@/components/Dialog'
import TopBar from "@/components/TopBar/TopBar"
import Bottom from "@/components/Bottom/Bottom"
import Msg from '@/components/Msg'
import Pagination from '@/components/Pagination/Pagination'
import MD5 from 'blueimp-md5'
import SHA256 from 'sha256';
import Coupon from "@/components/Coupon/Coupon";

import store from "@/store/store.js"
import {setMsg, setLoginFrom} from '@/store/action.js'
import API from 'apiConfig'

class Novice extends Component {
    constructor(props) {
        super(props)
        this.state = {
            alreadyInvestNewBorrow: true, //是否已经投过新手标
            id: 0,                     //标id
            apr: 0,                    //年化率
            timeLimit: 0,              //期限
            expDate: 0,                //有效天数
            mostAccount: 0,//累计最高可投
            mostSingleLimit: 0,//单笔最高可投
        }
    }

    getNovice = async () => {
        const data = await API.post(API.newBorrow, {}, true)
        this.setState({
            ...data.obj
        })
    }

    async componentDidMount() {
        this.getNovice();
    }

    render() {
        const {
            alreadyInvestNewBorrow, //是否已经投过新手标
            id,                     //标id
            apr,                    //年化率
            timeLimit,              //期限
            expDate,                //有效天数
            borrowTimeType,         //0月标 1 天标
            productType,             //产品类型   1，供应 2，消费 3，r计划，
            lowestAccount,       //起投金额
        } = this.state
        return (
            <div>
                {alreadyInvestNewBorrow ? '' :
                    <div className="novice">
                        <div className="name">新手专享<span>仅限未投资用户</span></div>
                        <div className="income">历史年化收益率
                            <span style={{fontSize: '24px', marginLeft: '10px'}}>
                                {apr}<span style={{fontSize: '14px'}}>%</span></span></div>
                        <div className="time">投资期限
                            <span style={{fontSize: '24px', marginLeft: '10px'}}>{timeLimit}</span>
                            <span style={{fontSize: '14px'}}>{borrowTimeType === 0 ? '个月' : '天'}</span></div>
                        <div className="time" style={{width: '211px'}}>起投金额
                            <span style={{fontSize: '24px', marginLeft: '10px'}}>{lowestAccount}</span>
                            <span style={{fontSize: '14px'}}>元</span></div>
                        <a href={`/projectDetail.html?id=${id}&newBorrow=true&type=${productType}`}>
                            <div className="btn">立即体验</div>
                        </a>
                    </div>
                }
            </div>
        )
    }
}

class Transfer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            transferPwd: '',
            payPwd: '',
            redPacketList:[]
        }
    }

    close = () => {
        this.props.close && this.props.close();
        this.setState({
            transferPwd: '',
            payPwd: ''
        })
    }

    componentDidMount(){
        // this.getRedPacketList()
    }

    getRedPacketList = async ()=>{
        const param = {
            token: JSON.parse(localStorage.userInfo).token,
            status: 0,
            type: 2,
            pageNum: 1,
            numPerPage:1
        }
        const obj = await API.get(API.getRedpacketList, param);
        this.setState({
            redPacketList:obj.recordList
        })
    }

    render() {
        const {
            bondAttornId,   //转让id
            bondName,       //债券标题
            bondApr,        //年化利率
            soldTotal,      //待收总额
            surplusPeriodInt,//剩余期数
            transferredTime,//待收日期
            soldInterest,   //待收利息
            soldCapital,    //待收本金
            bondMoney,      //转让金额
            isExistPwd,     //是否有转让密码
        } = this.props
        return (
            <Dialog show={this.props.show} onClose={this.close}>
                <div className={Css.transfer}>
                    <div className={Css.title}>承接</div>
                    <div>
                        <p>标的名称：<span>{bondName}</span></p>
                        <p>历史年化收益率：<span>{bondApr}%</span></p>
                    </div>
                    <div>
                        <p>转让本金：<span>{soldCapital}元</span></p>
                        <p>剩余期限：<span>{surplusPeriodInt}天</span></p>
                    </div>
                    <div>
                        <p>承接参考收益：<span><span style={{color:"red"}}>{soldInterest}</span>元</span></p>
                        <p>承接价格：<span><span style={{color:"red"}}>{bondMoney}</span>元</span></p>
                    </div>
                    {/*<Coupon />*/}
                    {/*<div>*/}
                        {/*<p>待收本金：<span>￥{soldCapital}</span></p>*/}
                        {/*<p>转让价格：<span>￥{bondMoney}</span></p>*/}
                        {/*<input style={{display: 'none'}} type="text"/>*/}
                    {/*</div>*/}
                    {/*{isExistPwd ? <div className={Css.input}>*/}
                        {/*承接密码：<input value={this.state.transferPwd} ref="transferPwd" autoComplete="new-password"*/}
                                    {/*onChange={(e) => this.changeTransfer(e)}*/}
                                    {/*type="password" placeholder="请输入您的承接密码"/>*/}
                    {/*</div> : ''}*/}
                    <div className={Css.input}>
                        交易密码：<input value={this.state.payPwd} ref="payPwd" autoComplete="new-password"
                                    onChange={(e) => this.changePay(e)}
                                    type="password" placeholder="请输入您的交易密码"/>
                    </div>
                    <div style={{height:"30px"}}>
                        <p style={{lineHeight: "50px",
                            marginLeft: "75px"}}>同意签署
                            <a style={{color:"#4992ec"}} href="https://www.51rz.com/protocol.html?id=206" target="_blank">《债权转让协议》</a></p>
                    </div>
                    <a className={Css.btn} onClick={() => this.sub(bondAttornId, bondMoney, isExistPwd)}>确认承接</a>
                </div>
            </Dialog>
        )
    }

    async sub(id, money, isExistPwd) {
        const {payPwd, transferPwd} = this.state
        if (isExistPwd && !transferPwd) {
            store.dispatch(setMsg('密码为6-16位字符'))
            return
        }
        if (!payPwd) {
            store.dispatch(setMsg('密码为6-16位字符'))
            return
        }
        const param = {
            bondId: id,
            amount: money,
            payPass: SHA256(MD5(payPwd)),
            pwd: transferPwd,
            fromStr: 0
        }
        const transfer = await API.post(API.transferTender, param, true);
        store.dispatch(setMsg(transfer.responseMessage))
        if (transfer.responseCode == '000000' && transfer.responseMessage != '承接请求已处理') {
            setTimeout(() => {
                window.location.reload()
            }, 2000)
        }
    }

    changeTransfer(e) {
        this.setState({
            transferPwd: e.target.value
        })
    }

    changePay(e) {
        this.setState({
            payPwd: e.target.value
        })
    }
}

// class Search extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             all: false,
//         }
//     }
//     render() {
//         const {
//             nowActive,
//             changeState,
//             typeActive,
//             timeActive,
//             sortActive,
//             desc
//         } = this.props
//         return (
//             <div>
//                 {nowActive === 1 ? <div className={Css.search_content}>
//                     <div className={Css.search_bg}
//                          style={{height: this.state.all ? '174px' : '58px'}}>
//                     </div>
//                     <p>
//                         <span>项目类型</span>
//                         {['全部', '精选', '供应链', '消费金融'].map((v, i) => {
//                             return <a onClick={() => {
//                                 changeState('typeActive', i)
//                             }}
//                                       key={i}
//                                       className={i === typeActive ? Css.search_check : ''}
//                             >{v}</a>
//                         })}
//                     </p>
//                     <p style={{display: this.state.all ? 'block' : 'none'}}>
//                         <span>项目周期</span>
//                         {['全部', '1个月以下', '1-3个月', '3-6个月', '6-12个月', '12个月以上'].map((v, i) => {
//                             return <a onClick={() => {
//                                 changeState('timeActive', i)
//                             }}
//                                       key={i}
//                                       className={i === timeActive ? Css.search_check : ''}
//                             >{v}</a>
//                         })}
//                     </p>
//                     <p style={{display: this.state.all ? 'block' : 'none'}}>
//                         <span>项目排序</span>
//                         {['发布时间', '年化利率', '投资期限', '可投金额'].map((v, i) => {
//                             return <a onClick={() => {
//                                 this.changeSort(i)
//                             }}
//                                       style={{paddingRight: '20px'}}
//                                       key={i}
//                                       className={`${i === sortActive ? Css.search_check : ''} ${desc ? 'down' : 'up'}`
//                                       }>{v}</a>
//                         })}
//                     </p>
//                     <div className={Css.search_toggle}>
//                         <a onClick={this.toggle}>{this.state.all ? '收起' : '展开'}</a>
//                     </div>
//                 </div> : ''}
//             </div>
//         )
//     }
//
//     changeSort(val) {
//         const {
//             changeState,
//             sortActive,
//             desc
//         } = this.props
//         if (val === sortActive) {
//             changeState('desc', !desc)
//         } else {
//             changeState('sortActive', val)
//         }
//     }
//
//     toggle = () => {
//         this.setState({
//             all: !this.state.all
//         })
//     }
// }

class ListCard extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {
            name,           //标名
            discount,       //0 不可使用 1 可使用红包 2可使用加息券 3.都可以使用
            apr,            //年化率
            baseApr,       //基础年化率
            exApr,          //奖励年化率
            borrowTimeType, //标时间类型 0月标 1天标
            timeLimit,      //期限
            style,          //0等额本金 1等额本息2一次性还本付息3按月付息，到期还本’
            id,             //标id
            lastAccount,    //剩余可投金额
            scales,         //投资进度
            status,         //10上线,
            lastTime,//剩余募集时间
            tenderTranfer, //可否债转 0 不支持 1 支持
            zicoy, //可债转 0不显示 1显示
            zicon  //不可债转 0不显示 1显示

        } = this.props;
        let {productType} = this.props     //0新手标；1供应链金融；2消费金融 3.R计划
        const isinBack = (productType == 1 && (status == 6 || status == 3 || status == 14 || status == 15 || status == 16)) || ((productType == 3 || productType == 2 || productType == 4) && status == 3);
        const showOff = scales >= 100;
        const scale = scales > 100 ? 100 : scales
        const backStyleArr = ['月等额本金还款', '月等额本息还款', '一次性还本付息', '按月付息到期还本']
        let url = `https://images.51rz.com/images/rebuild/pc/img/borrowType${productType}.png`
        if (productType == 4) {
            url = `https://images.51rz.com/images/rebuild/pc/img/borrowType1.png`
        }
        let btn;
        if (status == 1) {
            btn = <a href={`/projectDetail.html?id=${id}&type=${productType}` } className={`${Css.tender} ${Css.waitTender}`}>即将发售</a>
        } else if (scales >= 100) {
            btn = <a href={`/projectDetail.html?id=${id}&type=${productType}` }
                     className={`${Css.tender} ${Css.unTender}`}>{isinBack ? '回款中' : status == 8 && '已回款'}</a>
        } else {
            btn = <a href={`/projectDetail.html?id=${id}&type=${productType}`}
                     className={`${Css.tender} ${Css.showIn}`}>立即投资</a>
        }
        // else if(lastTime<=0){
        //     btn = <a href={`/projectDetail.html?id=${id}&type=${productType}` }
        //              className={Css.tender}><span
        //         className={Css.unTender}>已过期</span></a>
        // }

        return (
            <div className={Css.card}>
                <a href={`/projectDetail.html?id=${id}&type=${productType}`}>
                    <div>
                        <span className={Css.gong} style={{backgroundImage: 'url(' + url + ')'}}></span>
                        <span className={Css.title}>{name}</span>
                        {discount === 1 || discount === 3 ? <span title="red_packet" className={Css.tag}>优惠券</span> : ''}
                        {discount === 2 || discount === 3 ?
                            (tenderTranfer == 0 && zicon === 1 ?
                                <span title="interest_rate_hike" className={Css.tag}>不可债转</span> :
                                    tenderTranfer == 1 && zicoy === 1 ?
                                        <span title="interest_rate_hike" className={Css.tag}>可债转</span> : ''
                            ) : ''}
                    </div>
                </a>
                <div className={Css.content}>
                    <div>
                        <p className={Css.apr}>
                            <span className={Css.fs24}>{baseApr}</span>%
                            {exApr ? <span>+{exApr}%
                                <span className={Css.jiangli}>奖励</span></span> : ''}
                        </p>
                        <p className={Css.black9}>历史年化收益率</p>
                    </div>
                    <div style={{paddingLeft: '33px'}}>
                        <p>
                            <span style={{fontSize: '24px'}}>{timeLimit}</span>
                            {borrowTimeType === 0 ? '个月' : '天'}
                        </p>
                        <p className={Css.black9}>投资期限</p>
                    </div>
                    <div style={{paddingLeft: '20px'}}>
                        <p className={Css.percent}>
                            <span className={Css.per}><i style={{width: scale + '%'}}></i></span>
                            <span>{Math.floor(scale)}%</span>
                        </p>
                        <p>
                            <span className={Css.black9}>剩余可投(元)</span>
                            <span style={{marginLeft: '8px'}}>
                                {(lastAccount / 10000).toFixed(2) + '万'}
                            </span>
                        </p>
                    </div>
                    <div style={{paddingLeft: '115px'}}>
                        <p>
                            {backStyleArr[style]}
                        </p>
                        <p className={Css.black9}>还款方式</p>
                    </div>
                    <div style={{textAlign: 'right'}}>
                        {btn}
                    </div>
                </div>
            </div>
        )
    }
}

class TransferCard extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {
            borrowId,
            bondAttornId,       //转让id
            bondName,           //债券标题
            bondApr,            //年化利率
            surplusPeriod,      //剩余期数
            soldCapital,        //剩余本金
            bondMoney,          //转让金额
            styleName,          //还款方式名称
            isAttorn,           //是否可转让
            productType = 1,       //标类型
            isExistPwd,         //是否设置转让密码
        } = this.props
        const {isPayPasWord, uid} = this.props.store.userInfo
        const url = `https://images.51rz.com/images/rebuild/pc/img/borrowType${productType}.png`
        return (
            <div className={Css.card}>
                <a href={`/projectDetail.html?id=${borrowId}&type=${productType}` }>
                    <div>
                        <span className={Css.gong} style={{backgroundImage: 'url(' + url + ')'}}></span>
                        <span className={Css.title}>{bondName}</span>
                        {isExistPwd ? <img
                            style={{width: '24px', height: '24px'}}
                            src="https://images.51rz.com/images/rebuild/pc/img/transferPwd.png" alt=""/> : ''}
                    </div>
                </a>
                <div className={Css.content}>
                    <div style={{width: '18%'}}>
                        <p className={Css.apr}>
                            <span className={Css.fs24}>{bondApr}</span>%
                        </p>
                        <p className={Css.black9}>历史年化收益率</p>
                    </div>
                    <div style={{width: '18%'}}>
                        <p className={Css.fs16}>
                            {surplusPeriod}
                        </p>
                        <p className={Css.black9}>剩余期限</p>
                    </div>
                    <div style={{width: '18%'}}>
                        <p className={Css.fs16}>
                            {soldCapital}元
                        </p>
                        <p className={Css.black9}>转让本金</p>
                    </div>
                    <div style={{width: '18%'}}>
                        <p className={Css.fs16} style={{color: '#d7a55e'}}>
                            {bondMoney}元
                        </p>
                        <p className={Css.black9}>承接价格</p>
                    </div>
                    <div style={{width: '18%'}}>
                        <p className={Css.fs16}>
                            {styleName}
                        </p>
                        <p className={Css.black9}>还款方式</p>
                    </div>
                    <div style={{width: '10%', textAlign: 'right'}}>
                        {isAttorn ? !!uid ? <a
                            onClick={() => {
                                if (!isPayPasWord) {
                                    this.props.dispatch(setMsg('请到个人中心设置交易密码'));
                                    setTimeout(() => {
                                        location.href = '/member/index.html#/safeCenter'
                                    }, 2000)
                                    this.props.dispatch(setLoginFrom(location.href));
                                    return
                                }
                                this.props.show_dialog(this.props)
                            }}
                            className={`${Css.tender} ${Css.transfer}`}>立即承接</a> :
                            <a href="/login.html" className={`${Css.tender} ${Css.transfer}`}>登录后可承接</a> :
                            <a href className={`${Css.tender} ${Css.unTender}`}>已承接</a>}
                    </div>
                </div>
            </div>
        )
    }
}
TransferCard = connect((store) => ({store}))(TransferCard)

class ProjectList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            transfer: [],
            page: 1,
            totalPage: 1,
            show: false,
            dialog: {},
            nowActive: Number(location.href.split('#')[1]) || 0,
            desc: true,
            nav: ['精选', 'R计划', '众供宝', '众消宝', '债权转让'],
        }
    }

    nowChangeState = (val) => {
        const json = {
            nowActive: val
        }
        this.setState({
            page: 1
        })
        if (val !== 4) {
            this.setState(json, () => this.getListData())
        } else if (val === 4) {
            this.setState(json, () => this.getTransferData())
        }
    }

    componentDidMount() {
        this.state.nowActive == 4 ? this.getTransferData() : this.getListData();
    }

    getListData = async () => {
        const param = {
            pageNum: this.state.page,
            sellOut: 1
        }
        const {nowActive} = this.state
        switch (nowActive) {
            case 0:
                param.productType = 0  //精选
                break
            case 1:
                param.productType = 3      //r计划
                break
            case 2:
                param.productType = 1 //众供宝
                break
            case 3:
                param.productType = 2 //众消宝
                break
        }
        const data = await API.post(API.borrowSearch, param, true)
        this.setState({
            totalPage: data.obj.totalPage,
            list: data.obj.recordList || []
        })
    }

    getTransferData = async () => {
        const data = await API.post(API.transferSearch, {pageNum: this.state.page}, true)
        this.setState({
            totalPage: data.obj.totalPage,
            transfer: data.obj.recordList || []
        })
    }

    onCurrentChange(page) {
        const {nowActive} = this.state
        this.setState({
            page
        }, () => {
            if (nowActive == 4) {
                this.getTransferData()
            } else {
                this.getListData()
            }
        })
    }

    render() {
        const {
            list,
            transfer,
            nowActive,
            show,
            dialog,
            page,
            totalPage,
            nav,
        } = this.state
        const listArr = list.map((item, index) => {
            return (
                <ListCard {...item} key={index} nowActive={nowActive}/>
            )
        })
        const transferArr = transfer.map((item, index) => {
            return (
                <TransferCard {...item} key={index} nowActive={nowActive}
                              show_dialog={(props) => this.show(props)}/>
            )
        })
        return (
            <div className="animate-route">
                <TopBar tag={'projectList'}/>
                <div className={Css.container}>
                    <div className={Css.search_title}>
                        {
                            nav.map((item, index) => {
                                return (
                                    <a href={`#${index}`} className={nowActive === index ? Css.search_title_check : ''}
                                       onClick={() => this.nowChangeState(index)} key={index}>{item}</a>
                                )
                            })
                        }
                    </div>
                </div>
                {nowActive != 4 && <Novice/>}
                <div className={Css.wrap}>
                    <Transfer show={show} {...dialog} close={() => this.close()}/>
                    { nowActive !== 4 && listArr }
                    { nowActive === 4 && transferArr }
                </div>
                <Pagination currentPage={page}
                            pages={totalPage}
                            style={{margin: '40px 0px 60px'}}
                            onCurrentChange={(page) => this.onCurrentChange(page)}/>
                <Bottom/>
                <Msg/>
            </div>
        )
    }

    close() {
        this.setState({show: false})
    }

    show(props) {
        this.setState({
            show: true,
            dialog: props
        })
    }
}

ProjectList = connect((store) => ({store}))(ProjectList);

render(<Provider store={store}>
    <ProjectList/>
</Provider>, document.getElementById('app'));

