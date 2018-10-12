import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from 'react-router'
import Css from "../../assets/css/member/financeDetail.scss";

import store from "@/store/store.js";
import API from "@/api/api.js";

import Pagination from '@/components/Pagination/Pagination.jsx'
import TabSelectNav from '@/components/TabSelectNav/TabSelectNav.jsx'
import SelectList from '@/components/SelectList'
import TableComp from '@/components/Table/index.jsx'
import Labels from '@/components/Labels/index.jsx'
import Callender from '@/components/Callendar/index.jsx'

import fullNum from '@/util/fullNum.js'

const Empty=(props)=>{
    const {
        type=0
    }=props;
    const config={
        0:{
            className:Css.empty0,
            text:'一家正规的网络借贷信息中介平台'
        },
        1:{
            className:Css.empty1,
            text:'赚钱，始于充值！'
        },
        2:{
            className:Css.empty2,
            text:'还要继续投资赚钱，先别急着提现！'
        },
        3:{
            className:Css.empty3,
            text:'快来开启你的投资之旅吧！'
        },
        4:{
            className:Css.empty4,
            text:'待到回款之日，就是大赚之时'
        },
        5:{
            className:Css.empty5,
            text:'世上最远的距离：你与红包只有一步之遥'
        },
        6:{
            className:Css.empty6,
            text:'参与活动和邀请好友，更容易获得现金奖励哦'
        },
        7:{
            className:Css.empty7,
            text:'暂时没有记录'
        },
    }
    return (
        <div className={Css.empty}>
            <div className={config[type]['className']}></div>
            <p>{config[type].text}</p>
        </div>
    )
}

class FinanceDetail extends Component {
    constructor(props) {
        super(props);
        let self=this;
        this.state={
            numPerPage:10,//每页显示条数
            pageNum:1,//当前页码 从第一页开始
            totalPage:1,//总页码
            navs:[
                {
                    text:'全部',
                    style:{
                        paddingLeft:0,
                        textAlign:'left'
                    },
                    trade_type:'all'
                },
                {text:'充值',trade_type:'recharge'},
                {text:'提现',trade_type:'withdraw'},
                {text:'投资',trade_type:'tender'},
                {text:'回款',trade_type:'repay'},
                {text:'福利',trade_type:'reward'},
                {text:'其他',trade_type:'other'},
            ],
            labelNavs:[
                // {
                //     text:'本月',
                //     style:{
                //         marginLeft:'-10px',
                //     }
                // },
                {
                    text:'上一个月',
                    style:{
                        marginLeft:'-10px',
                    }
                },
                {
                    text:'下一个月',
                    style:{
                        marginLeft:'-18px',
                        marginRight:'45px',
                    },
                    disabled:true
                },
                // {text:'更多'},
            ],
            showDate:false,//显示自定义时间
            startTime:null,//开始时间
            endTime:null,//结束时间
            tableColumns:[
                {
                    title:'时间',
                    key:'createTime',
                    style:{
                        width:'190px'
                    }
                },
                {
                    title:'类型',
                    key:'tradeType',
                    style:{
                        textAlign:'left',
                        paddingLeft:'50px'
                    },
                    render: (rowData) => {
                        const {
                            tradeType,
                        }=rowData
                        const config={
                            recharge:'充值',
                            withdraw:'提现',
                            tender:'投资',
                            repay:'回款',
                            redbag:'红包返现',
                            reward:'现金奖励',
                            flow_bid:'流标回款',
                            other:'其他'
                        }
                        return config[tradeType]||'其他'
                    }
                },
                {
                    title:'交易内容',
                    key:'remark',
                    style:{
                        textAlign:'left',
                        width:'280px'
                    },
                    render:(rowData)=>{
                        const {
                            remark,
                            status,
                            tradeType,
                            tradeStatus
                        }=rowData

                        //体现字段不再需要单独配置，全部取remark
                        const config={
                            withdraw:{
                                0:{
                                    text:'提现申请正在审核中'
                                },
                                1:{
                                    text:'已成功提现到银行卡'
                                },
                                2:{
                                    text:'提现失败'
                                },
                                3:{
                                    text:'提现申请正在审核中'
                                },
                                4:{
                                    text:'提现失败'
                                },
                                5:{
                                    text:'提现申请正在审核中'
                                },
                                6:{
                                    text:'取消提现'
                                },
                                7:{
                                    text:'提现失败'
                                },
                                8:{
                                    text:'提现失败'
                                },
                                9:{
                                    text:'提现申请正在审核中'
                                },
                            },
                        }
                        const isConfiged=tradeType=='withdraw'
                        const text=isConfiged?config[tradeType][status]&&config[tradeType][status].text:remark

                        return <span>{remark}</span>
                    }
                },
                {
                    title: '金额',
                    // key: 'money',
                    style:{
                        textAlign:'right',
                        width:'116px'
                    },
                    render: (rowData) => {
                        const {
                            paymentsType,
                            money
                        }=rowData
                        return `${(money||0)}元`
                        // if(paymentsType==1){
                        //     return `+${money}元`
                        // }else{
                        // return `${money}元`
                        // }
                    }
                },
                // {
                //     title:'账户余额',
                //     key:'balance',
                //     style:{
                //         textAlign:'center',
                //     }
                // },
                {// 自定义内容（样式控制  事件绑定。。。 ）
                    title:'状态',
                    style:{
                        textAlign:'right',
                        paddingRight:'40px'
                    },
                    render:(rowData)=>{
                        const {
                            navs,
                            activeNavIndex,
                        }=this.state;
                        const {
                            status,
                            tradeType,
                            tradeStatus
                        }=rowData

                        const config={
                            withdraw:{
                                0:{
                                    className:Css.orange,
                                    text:'处理中'
                                },
                                1:{
                                    className:'',
                                    text:'提现成功'
                                },
                                2:{
                                    className:Css.red,
                                    text:'提现失败'
                                },
                                3:{
                                    className:Css.orange,
                                    text:'处理中'
                                },
                                4:{
                                    className:Css.red,
                                    text:'提现失败'
                                },
                                5:{
                                    className:Css.orange,
                                    text:'处理中'
                                },
                                6:{
                                    className:'',
                                    text:'取消提现'
                                },
                                7:{
                                    className:Css.red,
                                    text:'提现失败'
                                },
                                8:{
                                    className:Css.red,
                                    text:'提现失败'
                                },
                                9:{
                                    className:Css.orange,
                                    text:'处理中'
                                },
                            },
                            recharge:{
                                0:{
                                    className:Css.orange,
                                    text:'创建'
                                },
                                1:{
                                    className:'',
                                    text:'充值成功'
                                },
                                2:{
                                    className:Css.red,
                                    text:'充值失败'
                                },
                                3:{
                                    className:Css.orange,
                                    text:'处理中'
                                }
                            },
                        }
                        const isConfiged=tradeType=='withdraw'||tradeType=='recharge'

                        return (
                            <div  className={config[tradeType]&&config[tradeType][status]&&config[tradeType][status].className}>
                                {isConfiged?config[tradeType][status].text:tradeStatus}
                            </div>
                        )
                    }
                },
            ],
            tableData:[
                // {money:300.00,createTime:"2017-09-27 16:51:05",tradeStatus:1,remark:"投资",paymentsType:0,tradeType:"投资"},
            ],
            activeNavIndex:0,//激活的nav索引
            activeLabelIndex:-1,//激活的label索引
            yearSelects:[
                {text:'2017'},
                {text:'2016'},
                {text:'2015'},
            ],
            activeYearIndex:0,//激活的年份索引
            monthSelects:[
                {text:'12'},
                {text:'11'},
                {text:'10'},
                {text:'09'},
            ],
            activeMonthIndex:0,//激活的月份索引
            isLoading:false,//正在加载
            platFormFromYear:2013,//平台有数据的开始时间
        }
    }
    getCurYearMohtn(){
        const now=new Date()
        const cur_year=now.getFullYear()
        const cur_month=now.getMonth()+1

        return {
            cur_year,
            cur_month,
            prev_month:cur_month==1?12:cur_month-1,
            prev_year:cur_month==1?cur_year-1:cur_year
        }
    }
    getPrevMonth(){//获取当前选中月份的上一个月
        let {
            yearSelects,
            monthSelects,
            activeYearIndex,
            activeMonthIndex,
            platFormFromYear,
            labelNavs
        }=this.state


        let select_year=yearSelects[activeYearIndex].text
        let select_month=monthSelects[activeMonthIndex].text*1

        if(select_month>1){
            select_month=this.getFullNum(select_month-1)
            activeMonthIndex-=1
        }else{
            select_month=12
            select_year-=1
            activeMonthIndex=11
            activeYearIndex+=1
        }

        if(select_year<platFormFromYear){
            select_year=platFormFromYear
            activeYearIndex=yearSelects.length-1
        }
        labelNavs[1].disabled=false//激活后一个月的点击状态
        this.setState({
            activeYearIndex,
            activeMonthIndex,
            labelNavs
        })
    }
    getNextMonth(){//获取当前选中月份的下一个月
        let {
            yearSelects,
            monthSelects,
            activeYearIndex,
            activeMonthIndex,
            platFormFromYear,
            labelNavs
        }=this.state

        if(labelNavs[1].disabled){//第一个按钮处于置灰不可点击状态
            return;
        }
        let select_year=yearSelects[activeYearIndex].text
        let select_month=monthSelects[activeMonthIndex].text*1
        const {
            cur_year,
            cur_month,
        }=this.getCurYearMohtn()
        console.log(cur_year,cur_month,select_year,select_month)


        if(select_month>11){
            select_year+=1
            select_month=1
            activeYearIndex-=1
            activeMonthIndex=0
            console.log(activeYearIndex)
        }else{
            select_month+=1
            activeMonthIndex+=1
        }

        if(select_year>new Date().getFullYear()){
            select_year=new Date().getFullYear()
            activeYearIndex=0
        }
        this.setState({
            activeYearIndex,
            activeMonthIndex,
        })
        if(cur_year==select_year && select_month>=cur_month){//当前月份无法点击
            labelNavs[1].disabled=true//置灰后一个月的点击状态
            this.setState({
                labelNavs,
            })
        }
    }
    getFullNum(num){
        return num<10?'0'+num:num
    }
    componentWillMount() {
        const {
            platFormFromYear=2013
        }=this.state
        const getYearMonth=this.getCurYearMohtn()
        let {
            cur_year,
            cur_month,
            prev_year,
            prev_month
        }=getYearMonth
        // cur_month=1
        const yearSelects=[]
        const monthSelects=[]
        let activeYearIndex=0
        let activeMonthIndex=0

        for(let year=cur_year;year>=platFormFromYear;year--){//计算平台年份时间
            yearSelects.push({
                text:year
            })
        }

        for(let month=1;month<=12;month++){//月份
            monthSelects.push({
                text:this.getFullNum(month)
            })
            if(cur_month==month){//设置当前的月份
                activeMonthIndex=month-1
            }
        }
        this.setState({
            yearSelects,
            monthSelects,
            activeYearIndex,
            activeMonthIndex
        })

        setTimeout(()=>{
            this.searchLists()
        },5)
    }
    onReceiveCurrentTabNavChange(i){//列表label发生变化
        if(i!=this.state.activeNavIndex){
            this.setState({
                activeNavIndex:i,
                pageNum:1,
                totalPage:1,
            })
            setTimeout(()=>{
                this.searchLists();//更新数据列表
            },5)
        }
    }
    onReceiveCurrentPageChange(pageNum){//当前页码发生变化
        this.setState({
            pageNum
        });
        setTimeout(()=>{
            this.searchLists();//更新数据列表
        },10)
    }
    onReceiveSelectDateTypeChange(i,item){//投标日期或者还款日期发生改变

    }
    onReceiveSelectTenderTypeChange(i,item){//标的类型发生改变

    }
    onReceiveCurrentLabelNavChange(i,item){//时间类型处理
        const {
            isLoading
        }=this.state

        // if(isLoading){//正在加载
        //     return
        // }
        this.setState({
            activeLabelIndex:i,
            pageNum:1,
        })
        if(i==0){//上一个月
            this.getPrevMonth()

        }else if(i==1){//下一个月
            this.getNextMonth()
        }

        setTimeout(()=>{
            this.searchLists();
        },10)


        // if(i!=this.state.activeLabelIndex){
        //     this.setState({
        //         activeLabelIndex:i,
        //         showDate:i==2,
        //         pageNum:1,
        //     });
        //     if(i!=2){
        //         setTimeout(()=>{
        //             this.searchLists();
        //         },10)
        //     }
        // }
    }
    handleSubmitBtn(){
        this.setState({//重置当前页码
            pageNum:1
        });
        setTimeout(()=>{
            this.searchLists();
        },20)
    }
    onSelectStartDate(date){
        if(date){
            this.setState({
                startTime:date
            })
        }else{
            this.setState({
                startTime:null
            })
        }
    }
    onSelectEndDate(date){
        if(date){
            this.setState({
                endTime:date
            })
        }else{
            this.setState({
                endTime:null
            })
        }
    }
    onReceiveYearChange(i,item){
        const {
            yearSelects
        }=this.state

        const activeYearIndex=yearSelects.indexOf(item)

        this.setState({
            activeYearIndex
        })
        // setTimeout(()=>{
        //     this.searchLists()
        // },10)
    }
    onReceiveMonthChange(i,item){
        const {
            monthSelects
        }=this.state
        const activeMonthIndex=monthSelects.indexOf(item)

        this.setState({
            activeMonthIndex
        })
        // setTimeout(()=>{
        //     this.searchLists()
        // },10)
    }

    async searchLists(e){//提交搜索表单
        const {
            navs,
            activeNavIndex,
            labelNavs,
            activeLabelIndex,
            pageNum,
            numPerPage,
            startTime,
            endTime,
            yearSelects,
            monthSelects,
            activeYearIndex,
            activeMonthIndex
        }=this.state

        const param={
            tradeType:navs[activeNavIndex].trade_type,
            pageNum,
            numPerPage,
        }

        const getYearMonth=this.getCurYearMohtn()
        const {
            cur_year,
            cur_month,
            prev_year,
            prev_month
        }=getYearMonth
        param.year=yearSelects[activeYearIndex].text
        param.month=monthSelects[activeMonthIndex].text*1
        // if(activeLabelIndex==0){//当月
        //     param.year=cur_year
        //     param.month=cur_month
        // }else if(activeLabelIndex==1){//前一个月
        //     param.year =prev_year
        //     param.month =prev_month
        // }else if(activeLabelIndex==2){//自定义时间
        //     param.year=yearSelects[activeYearIndex].text
        //     param.month=monthSelects[activeMonthIndex].text
        // }
        this.setState({
            isLoading:true
        })
        let obj=await API.post(API.financeDetail,param);

        this.setState({
            isLoading:false,
            tableData:obj.recordList||[],
            totalPage:obj.totalPage||0,
            pageNum:obj.currentPage||1,
        })

    }
    render() {

        const {
            activeNavIndex,
            activeLabelIndex,
            navs,
            tableColumns,
            tableData,
            labelNavs,
            pageNum,//当前页码
            totalPage,//总页码
            showDate,
            endTime,
            startTime,
            yearSelects,
            monthSelects,
            activeYearIndex,
            activeMonthIndex
        }=this.state;

        let _tableColumns=tableColumns
        // if(activeNavIndex!=0){//充值和提现不需要账户余额
        //     const lenth=tableColumns.length
        //     _tableColumns=tableColumns.slice(0,tableColumns.length-2).concat(tableColumns.slice(lenth-1,lenth));
        // }
        return (<div className={Css.wrap}>
            <h4 className ={Css.pageTitle}>资金明细</h4>

            <TabSelectNav activeIndex={activeNavIndex}
                          onCurrentChange={(i)=>{this.onReceiveCurrentTabNavChange(i)}}
                          navs={navs}
            />
            <div className={Css.selectRow}>
                <Labels  activeIndex={activeLabelIndex}
                         onCurrentChange={(i,label)=>{this.onReceiveCurrentLabelNavChange(i,label)}}
                         labels={labelNavs}
                         activeType={'disable'}
                         style={{}}
                />
                { <span>自定义
                    {/*<Callender maxDate={endTime} onSelectDate={(y,m,d)=>{this.onSelectStartDate(y,m,d)}}/>*/}
                    {/*<span style={{display:'inline-block',margin:'0 10px'}}>至</span>*/}
                    {/*<Callender minDate={startTime} onSelectDate={(y,m,d)=>{this.onSelectEndDate(y,m,d)}}/>*/}
                    <SelectList lists={yearSelects}
                                onChange={(i,activeItem)=>{this.onReceiveYearChange(i,activeItem)}}
                                activeIndex={activeYearIndex}
                                style={{
                                    display:'inline-block',
                                    margin:'0 20px 0 15px'
                                }}/>
                        <SelectList lists={monthSelects}
                                    onChange={(i,activeItem)=>{this.onReceiveMonthChange(i,activeItem)}}
                                    activeIndex={activeMonthIndex}
                                    style={{
                                        display:'inline-block',

                                    }}/>
                        <label onClick={(e)=>{this.handleSubmitBtn(e)}} className={Css.searchBtn}>搜索</label>
                    </span>
                }

            </div>
            <div style={{margin:'15px 0 30px 0'}}>
                {
                    totalPage==0?<Empty type={activeNavIndex}/>:<TableComp  columns={_tableColumns} data={tableData} />
                }
            </div>
            {
                totalPage!=0 && <Pagination currentPage={pageNum}
                                            pages={totalPage}
                                            style={{marginBottom:'30px'}}
                                            onCurrentChange={(pageNum)=>{this.onReceiveCurrentPageChange(pageNum)}}
                />
            }

        </div>);
    }
}

FinanceDetail = connect((store) => ({store}))(FinanceDetail);
export default withRouter(FinanceDetail);

