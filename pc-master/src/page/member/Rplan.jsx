import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from 'react-router'
import Css from "../../assets/css/member/Rplan.scss";


import Pagination from '@/components/Pagination/Pagination.jsx'
import Dialog from '@/components/Dialog'
import Btn from '@/components/Btn/index.jsx'
import OpenCunGuanDialog from  "@/components/OpenCunGuanDialog/index.jsx";
import BorrowPersonCard from "@/components/BorrowPersonCard/index.jsx";

import store from "@/store/store.js";
import API from "@/api/api.js";
import dateFormat from '@/util/dateFormat.js'

class List extends Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }
    render() {
        const rowData=this.props.rowData
        const {
            borrowTimeType,
            timeLimit,
            money,
            createTime,
            status,
            expectInterest,//预期收益
            currentInterest,//当前收益
            awardType,//0 红包  1 加息券
            awardMoney,//奖励金额
            awardApr,
            protocolDtos
        }=rowData

        // 1投资成功，2还款中，3债权转让中，4已转让，5已完结，9投资失败/流标 6，待成标上线
        const statusConfig={//只有三种状态  募集中  还款中  已还款
            1:'募集中',
            2:'回款中',
            3:'回款中',
            5:'已回款',
            6:'回款中',
            7:'回款中',
            8:'已回款',
            10:'回款中',
        }
        const showDetail= status !=1
        const couponText=awardType==0?awardMoney*1 && (awardMoney+'元红包'):awardApr*1 && (awardApr+'%加息券')
        const protocols=[]
        protocolDtos.map((protocol,i)=>{
            protocols.push(<p key={protocol.fname}>
                <a href={protocol.url} target="_blank">《{protocol.fname}》</a>
                <a href={protocol.url} download>下载</a>
            </p>)
        })
        return (
            <tr>
                <td><a
                    href={`/projectDetail.html?id=${rowData.bigBorrowId}&type=${rowData.productType}`}>{rowData.name}</a>
                </td>
                <td>{`${rowData.apr}%`}</td>
                <td>{borrowTimeType == 0 ? timeLimit + '月' : timeLimit + '天'}</td>
                <td>{money && money.toLocaleString() + '元'}</td>
                <td>{couponText||''}</td>
                <td>
                    <p>{dateFormat(createTime, 'Y-M-D')}</p>
                    <p>{dateFormat(createTime, 'H:M:S')}</p>
                </td>
                <td>{statusConfig[status] || ''}</td>
                <td>{expectInterest && expectInterest.toLocaleString()}元</td>
                <td>{currentInterest && currentInterest.toLocaleString()}元</td>
                <td>{(protocols.length&&protocols )||'协议签章中'}</td>
                <td className={`${Css.detail} ${!showDetail && Css.cursorAuto}`} onClick={() => {
                    showDetail && this.props.showDialog(this.props.Index, 0)
                }}>{showDetail && '详情' }
                </td>
            </tr>
        );
    }
}


class BorrowInfoDialog extends Component{
    constructor(props){
        super(props)
        this.state={
            userInfoVoList:{

            },
            borrowDetailType:'person'
        }
    }
    async componentDidMount(){
        const {
            show,
            activeDialog1TR,
            currentRTender
        }=this.props

        if(show){
            const param={
                sid:activeDialog1TR.bId,
                tender:1,
                // trxId:activeDialog1TR.trxId,
                rplan:1,
                productType:currentRTender.productType
            }

            const obj=await API.get(API.borrowinfo,param)
            // const userInfoVoList=obj.recordList[0] && obj.recordList[0].userInfoVoList &&  obj.recordList[0].userInfoVoList[0] ||{}
            const userInfoVoList=obj.recordList[0]||{}
            this.setState({
                userInfoVoList,
                borrowDetailType:userInfoVoList.type==1?'company':'person'
            })
        }
    }
    render(){
        const {
            show,
            onClose=()=>{},//关闭弹框
        }=this.props

        const {
            borrowDetailType,
            userInfoVoList
        }=this.state

        const style={
            width:'870px'
        }
        return (
            <Dialog show={show} onClose={()=>{onClose()}} style={style} className={Css.borrowPersonInfoDialog}>
                <BorrowPersonCard borrowDetailType={borrowDetailType} userInfoVoList={userInfoVoList}/>
            </Dialog>
        );
    }
}

BorrowInfoDialog = connect((store) => ({store}))(BorrowInfoDialog)



class Alert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numPerPage:20,

            detailTotalPage:0,
            detailPageNum:0,//投资详情列表当前页码
            isLoadingDetail:false,
            detailLists:[],//投资详情数据

            repaymentTotalPage:0,
            repaymentPageNum:0,
            isLoadingRepayment:false,
            repaymentLists:[],//还款详情列表

            showRepayment:false,
            showBorrowInfoDialog:false,
            activeDialog1TR:null,
            detail: {}
        }
    }
    componentWillMount(){
        this.loadDetailData()
    }
    onDetailScroll(e){
        e.stopPropagation()
        const wraperHeight=e.target.offsetHeight
        const scrollTop=e.target.scrollTop
        const contentHeight=this.refs.detail1Table.offsetHeight
        if(scrollTop>contentHeight-wraperHeight-1){
            this.loadDetailData()
        }
    }
    onRepaymentScroll(e){
        e.stopPropagation()
        const wraperHeight=e.target.offsetHeight
        const scrollTop=e.target.scrollTop
        const contentHeight=this.refs.detail2Table.offsetHeight
        if(scrollTop>contentHeight-wraperHeight-1){
            this.loadRepaymentData()
        }
        console.log(contentHeight,wraperHeight,scrollTop)
    }
    async loadDetailData(){//加载投资详情列表
        const {
            currentRTender
        }=this.props
        const {
            detailLists,
            detailPageNum,
            detailTotalPage,
            numPerPage,
            isLoadingDetail,
        }=this.state
        if(isLoadingDetail||detailPageNum>detailTotalPage){//正在加载
            return;
        }
        const param={
            tenderId:currentRTender.tenderId,//投资记录ID
            bid:currentRTender.bigBorrowId,//大标ID
            pageNum:detailPageNum+1,
            numPerPage,//一次性加载所有数据
            productType:3 //1：众供宝， 2:众消宝， 3：R计划
        }
        this.setState({
            isLoadingDetail:true
        })
        let obj=await API.post(API.myRTenderDetail,param)
        this.setState({
            isLoadingDetail:false
        })
        const newDetailLists=detailLists.concat(obj.recordList||[])
        this.setState({
            detailPageNum:obj.currentPage||0,
            detailTotalPage:obj.totalPage||0,
            detailLists:newDetailLists
        })
    }
    lookRepaymentDetail(e,i,v) {
        const showRepayment = this.state.showRepayment;
        if(showRepayment) {
            return false;
        }
        this.setState({
            activeDialog1TR:v,
            showRepayment: true,
        })
        setTimeout(()=>{
            this.loadRepaymentData()
        },2)
    }
    async loadRepaymentData(){
        const {
            currentRTender
        }=this.props

        const {
            numPerPage,
            repaymentPageNum,
            repaymentTotalPage,
            isLoadingRepayment,
            repaymentLists,
            activeDialog1TR
        }=this.state
        if(isLoadingRepayment||repaymentPageNum>repaymentTotalPage){//正在加载或者加载完毕
            return;
        }
        const param={
            tenderId:activeDialog1TR.tId,//投资记录id
            numPerPage,
            pageNum:repaymentPageNum+1
        }
        this.setState({
            isLoadingRepayment:true
        })
        let obj=await API.post(API.myRRepayment,param)
        this.setState({
            isLoadingRepayment:false
        })
        const {
            currentPage=0,
            totalPage=0
        }=obj

        this.setState({
            repaymentPageNum:currentPage,
            repaymentTotalPage:totalPage,
            repaymentLists:currentPage==1?obj.recordList||[]:repaymentLists.concat(obj.recordList||[])
        })
        // this.refs.body.children[i].lastElementChild.style.color = '#4992ec'
    }
    closeRepayment(){//关闭还款详情弹框
        this.setState({
            repaymentPageNum:0,
            repaymentLists:[],
            showRepayment:false
        })
    }
    lookBorrowDetail(e,i,v){//查看借款人详情
        this.setState({
            activeDialog1TR:v,
            showBorrowInfoDialog:true
        })
    }
    render() {
        const {
            detailLists,
            showBorrowInfoDialog,
            activeDialog1TR,
            showRepayment,
            repaymentLists
        }=this.state

        let {
            currentRTender
        }=this.props

        const statusConfig={//只有2种状态  3 还款中  8已还款
            3:'回款中',
            8:'已回款',
        }
        const detailTrs=[]
        detailLists.map((v, i) =>{
            const protocols=(v.protocolDtos || []).map((pro,j)=>
                <p key={pro.fname}>
                    <a href={pro.url} onClick={()=>{}} target="_blank">《{pro.fname}》</a>
                    <a href={pro.url} download>下载</a>
                </p>
            )

            detailTrs.push(<tr key={i}>
                <td>{v.bName}</td>
                <td>{`${v.apr}%`}</td>
                <td>{v.borrowTimeType==0?v.timeLimit+'月':v.timeLimit+'天'}</td>
                <td>{`${v.money}`}元</td>
                <td>{`${v.repaymentAccount.toLocaleString()}`}元</td>
                <td>
                    <p>{v.addTime}</p>
                    {/*<p>{`${dateFormat(v.addTime,'Y-M-D')}`}</p>*/}
                    {/*<p>{`${dateFormat(v.addTime,'H:M:S')}`}</p>*/}
                </td>
                <td>
                    {v.repaymentTime.split(/\s+/)[0]}
                    {/*{`${dateFormat(v.repaymentTime,'Y-M-D')}`}*/}
                </td>
                <td>{statusConfig[v.status]}</td>
                <td >{(protocols.length && protocols )||'协议签章中'}
                </td>
                <td onClick={(e,index) => {this.lookRepaymentDetail(e,i,v)}}><a>查看详情</a></td>
                <td onClick={(e,index,item) => {this.lookBorrowDetail(e,i,v)}}><a >查看详情</a></td>
            </tr>)
        });

        const repaymentTrs=repaymentLists.map((v, i) =>
            <tr key={i} style={{height:'47px',lineHeight:'47px'}}>
                <td>{v.name}</td>
                <td>{v.repaymentTime}</td>
                {/*<td>{`${dateFormat(v.repaymentTime,'Y-M-D')}`}</td>*/}
                <td>{`${v.currentPeriod}/${v.borrowPeriod}`}</td>
                <td>{`${v.repaymentAmount.toLocaleString()}`}元</td>
                <td>{v.state}</td>
            </tr>
            );

        return (
            <div className="mask" style={{display: this.props.show ? 'block' : 'none'}}>
                <div className="dialog1" style={{zIndex:5}}>
                    <h4>{currentRTender.name}——投资详情</h4>
                    <div className='dialog1Content' onScroll={(e)=>{this.onDetailScroll(e)}}>
                        <table ref={'detail1Table'}>
                            <thead>
                            <tr>
                                <th>标的名称</th>
                                <th>预期年化收益率</th>
                                <th>投资期限</th>
                                <th>投资金额</th>
                                <th>应收本息</th>
                                <th>投资时间</th>
                                <th>还款时间</th>
                                <th>状态</th>
                                <th style={{width: 140}}>协议</th>
                                <th>还款详情</th>
                                <th>借款人动态信息</th>
                            </tr>
                            </thead>
                            {detailTrs ? <tbody ref="body"> {detailTrs} </tbody>:<tbody ref="body"></tbody>}
                        </table>
                    </div>
                    <div className="close" onClick={() => {
                        this.props.closeAll()
                    }}></div>
                </div>
                <div className="dialog2" style={{display: showRepayment ? 'block' : 'none',zIndex:5}}>
                    <div className="dialog2wrap" onScroll={(e)=>{this.onRepaymentScroll(e)}}>
                    <table ref={'detail2Table'}>
                        <thead>
                        <tr>
                            <th>标的名称</th>
                            <th>还款日期</th>
                            <th>当前期数/总期数</th>
                            <th>还款金额</th>
                            <th>状态</th>
                        </tr>
                        </thead>
                        {repaymentTrs ? <tbody className="alert2"> {repaymentTrs} </tbody>:<tbody ref="body"></tbody>}
                    </table>
                    </div>
                    <div className="close" onClick={() => {
                        this.closeRepayment()
                    }}></div>
                </div>
                {showBorrowInfoDialog && <BorrowInfoDialog
                    show={showBorrowInfoDialog}
                    borrowDetailType={'person'}
                    activeDialog1TR={activeDialog1TR}
                    currentRTender={currentRTender}
                    onClose={()=>{this.setState({showBorrowInfoDialog:false})}}/>}
            </div>
        )
    }
}


class Rplan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentRTender:'',
            Rtenderlists: [],
            numPerPage:10,
            RtenderPageNum:1,
            RtenderTotalPage:1,
            show: false,
        }
    }
    componentWillMount(){
        this.loadRTenderLists()
    }
    async loadRTenderLists(){//加载R计划列表

        const pageNum=this.state.RtenderPageNum
        const numPerPage=this.state.numPerPage
        const param={
            pageNum:pageNum,
            numPerPage
        }
        const obj=await API.get(API.myRTender,param)

        this.setState({
            RtenderPageNum:obj.currentPage,
            RtenderTotalPage:obj.totalPage||0,
            Rtenderlists:obj.recordList||[]
        })
    }
    onReceiveCurrentPageChange(RtenderPageNum){
        this.setState({
            RtenderPageNum
        });
        setTimeout(()=>{
            this.loadRTenderLists();//更新数据列表
        },10)
    }
    async showDialog (activeTrindex) {//查看投资详情   可以实现多页异步加载
        const RtenderCurrent=this.state.Rtenderlists[activeTrindex]
        this.setState({
            currentRTender:RtenderCurrent,
            show: true,
        })
    }
    closeAll = () => {
        this.setState({
            show: false,
        })
    }
    render() {

        const {
            RtenderPageNum,
            RtenderTotalPage,
            Rtenderlists,
            currentRTender
        }=this.state

        let lists=''
        let empty=''
        if (Rtenderlists.length) {
            let list = Rtenderlists.map((v, i) => {
                return <List key={i} rowData={v} Index={i} showDialog={(i) => {
                    this.showDialog(i)
                }}/>
            })
            lists = <tbody>
                    {list}
                    </tbody>
        } else {
            empty = <div className="wujilu">
                        <div className="bg"></div>
                        <Btn type="red" text="马上投资" style={{width: 125, height: 38, margin: '0 auto', lineHeight: '38px'}} href="/projectList.html"/>
                    </div>
        }

        return (
            <div className='rPlan_wrap'>
                <h4>R计划</h4>
                <table>
                    <thead>
                        <tr>
                            <th>R计划名称</th>
                            <th style={{width:'120px'}}>预期年化收益率</th>
                            <th>投资期限</th>
                            <th>投资金额</th>
                            <th>优惠券</th>
                            <th>投标时间</th>
                            <th>状态</th>
                            <th>预计收益</th>
                            <th>当前收益</th>
                            <th>协议</th>
                            <th>投资详情</th>
                        </tr>
                    </thead>
                    {Rtenderlists.length ? lists :<tbody style={{display:'none'}}><tr></tr></tbody>}
                </table>
                {!Rtenderlists.length && empty}
                {Rtenderlists.length ? <Pagination  currentPage={RtenderPageNum}
                                                       pages={RtenderTotalPage}
                                                       onCurrentChange={(pageNum)=>{this.onReceiveCurrentPageChange(pageNum)}}
                /> : ''}
                {
                    this.state.show && <Alert show={this.state.show}
                                              closeAll={this.closeAll}
                                              currentRTender={currentRTender}
                    />
                }

                <h5>温馨提示：</h5>
                <p>1、锁定期</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;加入R计划即进入锁定期。锁定期内资金开始循环出借至当期计划期满。</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期满当日，出借人将不再享受优先自动投标服务并根据规则退出R计划。</p>
                <p>2、投资计划退出</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a.提前退出：当锁定期内补充的借款标的期限无法匹配R计划剩余期限时，产生提前还款情况，提前还款应付本息按实际投资天数计算。</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b.到期退出：锁定期满当日，出借人不再享受本计划服务并根据协议约定退出；届时出借人通过本期R计划自动投标的收益预计在锁定期结束的T＋1日内转入出借人的账户余额。</p>
                <p>3、R计划支持使用红包或者加息券，一个定期R计划可使用一张红包券或者加息券。</p>
                <p>4、R计划不支持债权转让。</p>
                <p>5、R计划不支持提前赎回。</p>
                <p>6、最终解释权在法律允许范围内归人众金服所有。</p>
                {this.props.store.userInfo.realNameStatus!=1 ? <OpenCunGuanDialog show={true}/>:''}
            </div>
        )
    }
}

Rplan = connect((store) => ({store}))(Rplan);
export default withRouter(Rplan);