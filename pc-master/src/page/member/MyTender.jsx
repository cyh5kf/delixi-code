import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from 'react-router'
import Css from "../../assets/css/member/myTender.scss";


import TabSelectNav from '@/components/TabSelectNav/TabSelectNav.jsx'
import SelectList from '@/components/SelectList'
import Pagination from '@/components/Pagination/Pagination.jsx'
import Dialog from '@/components/Dialog'
import InputComp from '@/components/Input/index.jsx'
import Btn from '@/components/Btn/index.jsx'
import OpenCunGuanDialog from  "@/components/OpenCunGuanDialog/index.jsx";
import Callender from '@/components/Callendar/index.jsx'
import Blank from '@/components/Blank/index.jsx'
import BorrowPersonCard from "@/components/BorrowPersonCard/index.jsx"
import Msg from '@/components/Msg'
import {setMsg} from "@/store/action.js";

import fullNum from '@/util/fullNum.js'
import dateFormat from '@/util/dateFormat.js'

import store from "@/store/store.js";
import API from "@/api/api.js";
import MD5 from 'blueimp-md5'
import SHA256 from 'sha256'

class Tr extends Component{
    constructor(props){
        super(props);
    }
    onToggle(e,rowData){
        const {
            onToggleDetail,//Function
        }=this.props;
        onToggleDetail(rowData);
    }
    onOpenCancelTransfer(e,rowData){
        const {
            onOpenCancelTransfer,//Function
        }=this.props;
        onOpenCancelTransfer(rowData);
    }
    clickTransfer(e,rowData){
        const {
            onOpenTransfer,//Function
        }=this.props;

        onOpenTransfer(rowData);
    }
    render(){

        const {
            rowData,//ObjectData
            activeNavIndex
        }=this.props;
        const {
            addTime,//投标时间
            createTime,
            name,//标的名称
            repay_all_time,//还款时间
            repayTimeNext, //还款时间
            borrowTimeType,//0 月标 1 天标
            timeLimit,//投资期限
            money,//投资金额
            interest,//预期收益
            status,//1投资成功，2还款中，3债权转让中，4已转让，5已完结， 6，待成标 9投资失败/流标
            transfer,//是否可以转让
            productType,
            borrowId,
            transferTime='',//转让时间
        }=rowData

        const statusConfig={
            0:'处理中',
            1:'募集中',
            2:'回款中',
            3:'回款中',//转让中显示回款中
            4:'已转让',
            5:'已回款',
            6:'回款中',
            9:'流标',//
            10:'募集中',
            11:'回款中'
        }
        let statusTxt=statusConfig[status];
        // if(activeNavIndex==2&&status==1){//回款中的时候 如果status==1  也为回款中
        //     statusTxt='回款中'
        // }

        let repayTime = '';
        if(!!transferTime) {
            repayTime = transferTime;
        } else {
            if(!!repayTimeNext) {
                repayTime = repayTimeNext;
            } else {
                repayTime = repay_all_time
            }
        }

        return (
            <tr>
                <td>{repayTime}</td>
                <td><a href={`/projectDetail.html?id=${borrowId}&type=${productType}`}>{name}</a></td>
                <td>{borrowTimeType==0?`${timeLimit}个月`:`${timeLimit}天`}</td>
                <td>{(money||0)}元</td>
                <td>{(interest||0).toLocaleString()}元</td>
                <td>
                    <p>{addTime}</p>
                    {/*<p>20:55:46</p>*/}
                </td>
                <td>{statusTxt}</td>
                <td>
                    <span onClick={(e,item)=>{this.onToggle(e,rowData)}} className={Css.operate}>详情</span>
                    {
                        status==3 && <span className={Css.operate}
                              onClick={(e,item)=>{this.onOpenCancelTransfer(e,rowData)}}
                        >取消转让</span>
                    }
                    {
                        transfer && <span className={Css.operate}
                                          onClick={(e,a)=>{this.clickTransfer(e,rowData)}}
                        >转让</span>
                    }

                </td>
            </tr>
        );
    }
}

class Detail extends Component{
    constructor(props){
        super(props);
        this.state={

        };
    }
    onLocalCloseDetail(e,activeItem){
        const {
            onCloseDetail,//Function
        }=this.props;
        onCloseDetail(activeItem);
    }
    onOpenProtocol(e,activeItem){
        const {
            onOpenProtocol,//Function
        }=this.props;
        onOpenProtocol(activeItem);
    }
    onOpenBorrowPersonInfo(activeItem){
        const {
            onOpenBorrowPersonInfo,//Function
        }=this.props;
        onOpenBorrowPersonInfo(activeItem);
    }
    openBorrowListsDialog(activeItem){
        const {
            onOpenBorrowListsDialog,//Function
        }=this.props;
        onOpenBorrowListsDialog(activeItem);
    }
    render(){
        const {
            show=false,
            rowData,//ObjectData
        }=this.props;
        let {
            name,
            progressData=[],
            apr,
            exApr,
            productType,
            contracts=[],//协议
            contractsFromFlow=[],
            productId,
            id,//投资记录id
            status,
            bondId='',//如果是转让标的  只显示转让协议
            transferStatus,//承接状态 0：失败 1：成功 2放款成功/还款中 3:已回款

        }=rowData
        const lists=[]
        // 保理   productId:102  个人投资与服务协议、借款协议
        // 艺·质押标 107   个人投资与服务协议、借款协议
        // 众淘宝   102/112  个人投资与服务协议、借款协议
        // 葫芦车  108   个人投资与服务协议、借款协议

        // 货贷    103 				个人投资与服务协议、借款协议
        // 经营贷 103    个人投资与服务协议、借款协议
        // 票据   106     个人投资与服务协议、借款协议

        // 新手标 113     个人投资与服务协议、应收账款转让及回购合同-金
        // 众惠宝  105/115 个人投资与服务协议、应收账款转让及回购合同-惠
        // 众金宝  103/113 个人投资与服务协议、应收账款转让及回购合同-金

        // 众银宝   106/116/200/10010  个人投资与服务协议

        //如果是承接的标的  只显示转让协议   否则的话 如果是老标 自己判断  如果是新标 完全展示后端给的协议

        let protocols=[]
        if(bondId && transferStatus!=0){//转让协议
            protocols=contractsFromFlow.map((protocol,i)=>{
                const {
                    nid,//新老债转协议
                    protocolId,
                    url,
                }=protocol
                let href = ''
                if(nid == -1) {
                    href=`/${url}.html?nid=${nid}&bondId=${bondId}&productType=${productType}&tenderId=${id}`
                }else{
                    href = url
                }
                return <a key={i} href={href} target="_blank">《{protocol.name||protocol.fname}》</a>
            })
        }else{
            const Urls=[//老协议
                '/agreementPersonalService.html?tenderId='+id,//个人投资与服务协议
                '/agreementBorrow.html?tenderId='+id,//借款协议
                '/agreementAccount.html?tenderId='+id ,// 应收账款转让及回购合同
            ]//个人投资与服务协议  借款协议  应收账款转让及回购合同
            const P=[
                <a key={'1'}  href={Urls[0]} target="_blank">《个人投资与服务协议》</a>,
                <a key={'2'} href={Urls[1]} target="_blank">《借款协议》</a>,
                <a key={'3'} href={Urls[2]} target="_blank">《应收账款转让及回购合同》</a>
            ]

            switch(productId){
                case 102:
                    protocols=[P[0],P[1]]
                    break;
                case 108:protocols=[P[0],P[1]]
                    break;
                case 107:protocols=[P[0],P[1]]
                    break;
                case 112:protocols=[P[0],P[1]]
                    break;

                case 113:protocols=[P[0],P[2]]
                    break;
                case 115:protocols=[P[0],P[2]]
                    break;
                case 105:protocols=[P[0],P[2]]
                    break;

                case 116:protocols=[P[0]]
                    break;
                case 200:protocols=[P[0]]
                    break;
                case 10010:protocols=[P[0]]
                    break;

                case 103:
                    if(name.search('众金宝')>=0){
                        protocols=[P[0],P[2]]
                    }else{
                        protocols=[P[0],P[1]]
                    }
                    break;
                case 106:
                    if(name.search('众银宝')>=0){
                        protocols=[P[0]]
                    }else{
                        protocols=[P[0],P[1]]
                    }
                    break;
                default:
                    protocols=contractsFromFlow.map((protocol,i)=>{
                        const nid=protocol.nid
                        return <a key={i} href={protocol.url} target="_blank">《{protocol.name||protocol.fname}》</a>
                    })
            }
        }
        progressData.forEach((item,index)=>{
            const {
                content,
                happenTime,
                isHighlight,
                isCheck,
                supplyExplain,
                amount,
                interest,
                borrowSchedule
            }=item;

            lists.push(
                <li key={index} className={`${isHighlight&&Css.active} ${!isCheck&&Css.unreach}`}>
                    <p className={Css.leftLabel}>{index==0&&'您于'}{happenTime&&`【${happenTime}】`}</p>
                    <div className={Css.rightCont}>
                        <div className={Css.detail}>
                            <p>{content}</p>
                            <p className={Css.tips}>{supplyExplain&&`${supplyExplain}`}</p>
                            <p className={Css.tips}>{amount&&`本金：${amount}元`}</p>
                            <p className={Css.tips}>{interest&&`利息：${interest}元`}</p>
                            <p className={Css.proTips}>{borrowSchedule&&`项目进度：${borrowSchedule}`}</p>
                        </div>
                        <div className={Css.tails}>
                            {
                                index==0 && apr && <p className={Css.aprTail}>历史年化收益率：<span>{`${apr}%+${exApr}%`}（奖励）</span></p>
                            }
                            {
                                index==1&& <div>
                                    {protocols}
                                    {/* bondId有值是承接转让标，不显示查看投资详情 */}
                                    { !bondId && <label onClick={(e,activeRowData)=>{this.openBorrowListsDialog(e,rowData)}}>查看投资详情</label>}
                                </div>
                            }
                        </div>
                    </div>
                </li>
            )
        })


        return (
            <tr className={show?Css.activeDetail:Css.hiddenDetail}>
                <td colSpan={8}>
                    <div className ={Css.detailWrap}>
                        <ul>
                            {lists}
                        </ul>
                    </div>
                    <p className={Css.closeUp} onClick={(e,arg1)=>{this.onLocalCloseDetail(e,rowData)}}>
                        收起
                    </p>
                </td>
            </tr>
        )
    }
}


class Rows extends Component{
    constructor(props){
        super(props);

        this.state={
            localData:props.tableData
        }
    }
    componentWillReceiveProps(props) {
        // console.log(this.props.tableData);
        this.setState({
            localData:props.tableData
        })
    }
    async toggleDetailStatus(activeItem){//切换对应的投资详情的显示状态
        activeItem.show=!activeItem.show;
        const {
            productType,
            borrowId
        }=activeItem

        if(!activeItem.progressData){
            const param={
                tenderId:activeItem.id,//投资记录id 908435
                productType:activeItem.productType, //
                // uid:1301405
            }
            // borrowBigId 大标ID， productType 为2和3的时候传入
            if(productType==2 || productType==3 || productType==4){
                param.borrowBigId=borrowId
            }
            let obj=await API.post(API.myTenderProgress,param);
            activeItem.progressData=obj.investFlowList||[];
            activeItem.apr=obj.baseApr;
            activeItem.exApr=obj.exApr;
            if(obj.contracts&&obj.contracts.length){
                activeItem.contractsFromFlow=obj.contracts
            }
        }

        this.setState({
            localData:this.state.localData,//更改了数据对象后  需要主动更改state对象
        })
    }
    closeDetailStatus(activeItem){//隐藏对应的标的详情的显示状态
        activeItem.show=false;
        this.setState({
            localData:this.state.localData
        })
    }
    openTransfer(activeItem){//打开转让弹框
        const {onOpenTransfer}=this.props;
        onOpenTransfer(activeItem);
    }
    openCancelTransfer(activeItem){//打开取消转让弹框
        const {onOpenCancelTransfer}=this.props;
        onOpenCancelTransfer(activeItem);
    }
    openProtocol(activeItem){//打开协议弹框
        const {onOpenProtocol}=this.props;
        onOpenProtocol(activeItem);
    }
    onOpenBorrowPersonInfo(activeItem){
        const {onOpenBorrowPersonInfo}=this.props
        console.log('activeItem:',activeItem);
        onOpenBorrowPersonInfo(activeItem)
    }
    render(){
        const {
            localData,
        }=this.state;

        const Lists=[];

        localData.forEach((item,i)=>{
            const show=item.show;
            Lists.push( <Tr rowData={item}
                            activeNavIndex={this.props.activeNavIndex}
                            onToggleDetail={(toggleItem)=>{this.toggleDetailStatus(toggleItem)}}
                            onOpenTransfer={(toggleItem)=>{this.props.onOpenTransfer(toggleItem)}}
                            onOpenCancelTransfer={(toggleItem)=>{this.openCancelTransfer(toggleItem)}}
                            key={i+1}
            /> )
            if(item.progressData){
                Lists.push( <Detail rowData={item}
                                    onCloseDetail={(toggleItem)=>{this.closeDetailStatus(toggleItem)}}
                                    onOpenProtocol={(toggleItem)=>{this.openProtocol(toggleItem)}}
                                    onOpenBorrowPersonInfo={(a)=>{this.onOpenBorrowPersonInfo(item)}}
                                    onOpenBorrowListsDialog={(a)=>{this.props.onOpenBorrowListsDialog(item)}}
                                    show={show}
                                    key={(i+1)*1000}
                /> )
            }
        })

        return (
            <tbody>
                {Lists}
            </tbody>
        )
    }
}

class ZhaiQuanZhuanRang extends Component{
    constructor(props){
        super(props);
        this.state={
            convertVal:'',//转让价格
            convertValied:false,
            payPassVal:'',//交易密码
            payPassValied:false,
            smsCode:'',//短信验证码
            smsCodeValied:false,
            transferPassVal:'',//转让密码
            transferPassValied:true,
            formValidated:false,//表单校验通过
            baseData:{//弹框中的基本数据
                borrowName:'',
                dueInTotalMoney:'',//待收总额
                repaymentTime:'',//到期时间
                countPeriod:'',//剩余期数
            },
        }
    }
    async componentDidMount(){
        const {
            activeTR
        }=this.props;

        const param={
            tenderId:activeTR.id
        }
        let obj=await API.post(API.myTransferDetail,param);
        this.setState({
            baseData:obj
        })
    }
    onConvertChange(val,convertValied){
        this.setState({
            convertVal:val,
            convertValied
        })
        setTimeout(()=>{this.checkValues();},1)
    }
    onPayPassChange(val,payPassValied){
        this.setState({
            payPassVal:val,
            payPassValied
        })
        setTimeout(()=>{this.checkValues();},1)
    }
    onSmsCodeChanged(val,smsCodeValied){
        this.setState({
            smsCode:val,
            smsCodeValied
        })
        setTimeout(()=>{this.checkValues();},1)
    }
    onTransferPassChange(val,transferPassValied){
        this.setState({
            transferPassVal:val,
            transferPassValied
        })
        setTimeout(()=>{this.checkValues();},1)
    }
    async getSms(callBack){
        const param={

        }
        await API.get(API.getCreateTransferSms,param)
        callBack();
    }

    // 校验金额区间
    checkAmountRange(e,value){
        const {baseData} = this.state;
        if(value <　baseData.transferPriceMin){
            this.props.dispatch(setMsg('请参考建议转让金额，重新输入'));
            this.setState({formValidated:false})
        } else if(value >　baseData.transferPriceMax){
            this.props.dispatch(setMsg('请参考建议转让金额，重新输入'));
            this.setState({formValidated:false})
        }
    }

    checkValues(){
        const {
            convertValied,
            payPassValied,
            smsCodeValied,
            transferPassValied,
        }=this.state;

        if(convertValied && payPassValied && transferPassValied){
            this.setState({
                formValidated:true
            })
        }else{
            this.setState({
                formValidated:false
            })
        }
    }
    async clickTransferSubmit(e){
        const {
            formValidated,
            convertVal,//转让价格
            payPassVal,//交易密码
            smsCode,//短信验证码
            transferPassVal,//转让密码
            baseData
        }=this.state;
        const {
            activeTR,
            onClose=()=>{}
        }=this.props;

        if(!formValidated){
            return
        }else{
            const param={
                amount:convertVal,
                tenderId:activeTR.id,
                bid:activeTR.borrowId,
                payPass:SHA256(MD5(payPassVal)),
                loginfrom:'pc',
                smsCode,
                holdDays:baseData.holdDays
            }
            if(transferPassVal){//标定向密码
                param.pwd=transferPassVal
            }
            let obj=await API.post(API.createTransfer,param);
            if(obj){
                this.props.dispatch(setMsg('债权转让成功！'));
                onClose(true);
            }

        }
    }
    render(){
        const {
            smsCode,
            formValidated,
            baseData
        }=this.state;

        const {
            show=false,
            onClose=()=>{}
        }=this.props;

        const DiaStyle={
            width:'380px',
            height:'462px'
        }
        const labelStyle={
            width:'77px',
            textAlign:'left',
            lineHeight:'36px'
        }
        const inputStyle={
            width:'300px',
            height:'36px',
            minHeight:'36px'
        }

        const BtnType=formValidated?'red':'gray';

        return (
            <Dialog show={show} onClose={()=>{onClose(false)}}>
                <div style={DiaStyle} className={Css.dialogWrap}>
                    <h5>转让</h5>
                    <ul className={Css.info}>
                        <li>标的名称：{baseData.borrowName}</li>
                        <li>历史年化收益率：{baseData.apr}%</li>
                        <li>转让本金：{baseData.dueInMoney}元</li>
                        <li>持有时间：{baseData.holdDays}天</li>
                        <li>累计收益：{baseData.holdInterest}元</li>
                        <li>预计服务费：{baseData.fee}元</li>
                    </ul>
                    <div className={Css.formWraper}>
                        <InputComp label={'转让金额：'}
                                   placeholder={`建议金额：${baseData.transferPriceMin}-${baseData.transferPriceMax}`}
                                   labelStyle={labelStyle}
                                   inputStyle={inputStyle}
                                   val={this.state.convertVal}
                                   onBlur={e=>this.checkAmountRange(e,this.state.convertVal)}
                                   onChange={(val,valied)=>{this.onConvertChange(val,valied)}}
                                   validate={{
                                       required:'转让价格不能为空',
                                       reg:/^\d+(\.\d{1,2})?$/,
                                       regMsg:'请输入正确的转让价格',
                                   }}
                        />
                        <div className={Css.dueInTotalMoney}>
                            <span>预计到账金额：</span><span style={{color:"red"}}>{this.state.convertVal && (this.state.convertVal-baseData.fee < 0 ? 0 : this.state.convertVal-baseData.fee).toFixed(2)}</span>元
                        </div>
                        <InputComp label={'交易密码：'}
                                   placeholder={'请输入您的交易密码'}
                                   labelStyle={labelStyle}
                                   inputStyle={inputStyle}
                                   type={'password'}
                                   val={this.state.payPassVal}
                                   onChange={(val,valied)=>{this.onPayPassChange(val,valied)}}
                                   validate={{
                                       required:'交易密码不能为空',
                                   }}
                        />
                       {/*<InputComp label={'短信验证：'}*/}
                                   {/*labelStyle={labelStyle}*/}
                                   {/*inputStyle={{width:'200px',height:'36px',minHeight:'36px'}}*/}
                                   {/*val={smsCode}*/}
                                   {/*isSms={true}*/}
                                   {/*seconds={60}*/}
                                   {/*getSms={(callBack)=>{this.getSms(callBack)}}*/}
                                   {/*onChange={(val,valied)=>{this.onSmsCodeChanged(val,valied)}}*/}
                                   {/*validate={{*/}
                                       {/*required:'短信验证码不能为空'*/}
                                   {/*}}*/}
                        {/*/>*/}
                        {/*<InputComp label={'转让密码：'}*/}
                                   {/*placeholder={'选填'}*/}
                                   {/*type={'password'}*/}
                                   {/*labelStyle={labelStyle}*/}
                                   {/*inputStyle={inputStyle}*/}
                                   {/*val={this.state.transferPassVal}*/}
                                   {/*onChange={(val,valied)=>{this.onTransferPassChange(val,valied)}}*/}
                        {/*/>*/}
                        <div className={Css.rule}>
                            <span>查看</span>{
                            baseData.ruleList ? baseData.ruleList.map((item,key)=><a key={key} href={"https://www.51rz.com/protocol.html?id=207"} target="_blank">{`《${item.name}》`}</a>) : null
                        }
                        </div>
                        <Btn text={"确认转让"}
                             type={BtnType}
                             style={{marginLeft:'77px',height:'36px',lineHeight:'36px',width:'300px'}}
                             onClick={(e)=>{this.clickTransferSubmit(e)}}
                        />
                    </div>
                </div>
            </Dialog>
        );
    }
}
ZhaiQuanZhuanRang = connect((store) => ({store}))(ZhaiQuanZhuanRang);


class CancelTransferDialog extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        const {

        }=this.state;

        const {
            show,
            onClose=()=>{},//关闭弹框
            onCancelTransferSubmit=()=>{},//取消转让确认
        }=this.props;

        return (
            <Dialog show={show} onClose={()=>{onClose()}}>
                <div className={Css.cancelTransferDialog}>
                    <h5>确认要取消债权转让？</h5>
                    <p>
                        <span onClick={()=>{onCancelTransferSubmit()}}>确定</span>
                        <span onClick={()=>{onClose()}}>取消</span>
                    </p>
                </div>
            </Dialog>
        );
    }
}

class ProtocolDialog extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        const {

        }=this.state;

        const {
            show,
            onClose=()=>{}
        }=this.props;

        return (
            <Dialog show={show}
                    style={{padding:'46px 20px 30px 20px',width:'678px'}}
                    onClose={()=>{onClose()}}>
                <div className={Css.protocolDialogWrap}>
                    <table>
                        <thead>
                            <tr><td>标的名称</td>
                                <td>投资金额</td>
                                <td>利率</td>
                                <td>期限</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>众车宝--0013</td>
                                <td>2000.00元</td>
                                <td>11%</td>
                                <td>3期</td>
                                <td>
                                    <p className={Css.procotolLine}><label >委托投资及服务协议</label><a >下载</a></p>
                                    <p className={Css.procotolLine}><label >委托投资及服务协议</label><a >下载</a></p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Dialog>
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
            activeTR,
            littleActiveTR
        }=this.props
        const {
            borrowId,
            productType,
            trxId
        }=activeTR

        if(show){
            const param={
                productType
            }
            param.sid = littleActiveTR? littleActiveTR.bId: borrowId
            const obj=await API.get(API.borrowinfo,param)
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
            onCancelTransferSubmit=()=>{},//取消转让确认
            activeTR
        }=this.props

        const {
            borrowDetailType,
            userInfoVoList
        }=this.state

        const style={
            width:'870px'
        }
        const empty='--'
        return (
            <Dialog show={show} onClose={()=>{onClose()}} style={style} className={Css.borrowPersonInfoDialog}>
                <BorrowPersonCard borrowDetailType={borrowDetailType} userInfoVoList={userInfoVoList}/>
            </Dialog>
        );
    }
}

BorrowInfoDialog = connect((store) => ({store}))(BorrowInfoDialog)


class BorrowListsDialog extends Component{
    constructor(props){
        super(props)
        this.state={
            showBorrowDetail:false,
            numPerPage:20,
            listsPageNum:0,
            listsTotalPage:0,
            listsIsLoading:false,
            detailLists:[

            ],
            littleActiveTR:null,//小标被激活的tr
        }
    }
    async componentDidMount(){
        this.loadLists()
    }
    onListsScroll(e){
        e.stopPropagation()
        const wraperHeight=e.target.offsetHeight
        const scrollTop=e.target.scrollTop
        const contentHeight=this.refs.listsTable.offsetHeight
        if(scrollTop>contentHeight-wraperHeight-1){
            this.loadLists()
        }
    }
    async loadLists(){
        const {
            activeTR
        }=this.props
        const {
            numPerPage,
            listsPageNum,
            listsTotalPage,
            listsIsLoading,
            detailLists
        }=this.state
        if(listsIsLoading||listsPageNum>listsTotalPage){//正在加载或者加载完毕
            return;
        }
        const param={
            tenderId:activeTR.id,//投资记录ID
            bid:activeTR.borrowId,//大标ID
            pageNum:listsPageNum+1,
            numPerPage,
            productType:activeTR.productType
        }
        this.setState({
            listsIsLoading:true,
        })
        let obj=await API.post(API.myRTenderDetail,param)

        this.setState({
            listsIsLoading:false,
            listsPageNum:obj.currentPage||0,
            listsTotalPage:obj.totalPage||0,
            detailLists:detailLists.concat(obj.recordList||[]),
        })
    }

    async lookBorrowDetail(e,littleActiveTR){

        this.setState({
            showBorrowDetail:true,
            littleActiveTR
        })
    }
    render(){
        const {
            detailLists,
            showBorrowDetail,
            littleActiveTR
        }=this.state

        const {
            activeTR
        }=this.props
        const trs=[]

        detailLists.map((v,i)=>{

            const protocols=(v.protocolDtos || []).map((pro,j)=>
                <p key={pro.fname}>
                    <a href={pro.url} onClick={()=>{}} target="_blank">《{pro.fname}》</a>
                    <a href={pro.url} download>下载</a>
                </p>
            )

            trs.push(<tr key={i}>
                <td>{v.bName}</td>
                <td>{`${v.money.toLocaleString()}`}元</td>
                <td>{v.apr+'%'}</td>
                <td>{v.period}期</td>
                <td >{(protocols.length && protocols )||'协议签章中'}</td>
                <td><a onClick={(e,a)=>{this.lookBorrowDetail(e,v)}}>查看详情</a></td>
            </tr>)
        })
        return (
            <div>
                <Dialog show={true}
                        onClose={()=>{this.props.onClose()}}
                        style={{width:'800px',padding:'40px 20px 30px 20px'}}
                >
                    <div className={Css.borrowListsDialog} onScroll={(e)=>{this.onListsScroll(e)}}>
                        <table ref={'listsTable'}>
                            <thead>
                                <tr>
                                    <th>标的名称</th>
                                    <th>投资金额</th>
                                    <th>利率</th>
                                    <th>期限</th>
                                    <th>协议下载</th>
                                    <th>借款人动态信息</th>
                                </tr>
                            </thead>
                            <tbody>{trs}</tbody>
                        </table>
                    </div>
                </Dialog>
                {showBorrowDetail && <BorrowInfoDialog show={showBorrowDetail}
                                  onClose={()=>{this.setState({showBorrowDetail:false})}}
                                  activeTR={activeTR}
                                  littleActiveTR={littleActiveTR}
                />}
            </div>
        )
    }
}

BorrowListsDialog = connect((store) => ({store}))(BorrowListsDialog)


class MyTender extends Component {
    constructor(props) {
        super(props);
        this.state={
            activeNavIndex:0,
            pageNum:1,//当前页码
            totalPage:1,//总页码
            numPerPage:10,//每页数据条数
            navs:[
                {
                    text:'全部',
                    style:{
                        paddingLeft:0
                    },
                    status:null,
                },
                {text:'募集中',status:1,},
                {text:'回款中',status:2},
                {text:'已回款',status:5},
                {text:'已转让',status:4}
            ],
            dateTypes:[
                {text:'投标日期'},
                {text:'还款日期'}
            ],
            activeDateTypeIndex:0,//选中的日期模式索引
            tenderTypes:[
                {text:'新手宝'},
                {text:'众供宝'},
                {text:'众消宝'}
            ],
            activeTenderTypeIndex:null,//选中的标的类型索引
            startTime:undefined,
            endTime:undefined,
            activeTR:null,//当前操作的哪一行的数据
            tableData:[],
            sortBy:null,
            showZhuanRangDialog:false,//转让弹框
            showCancelTransferDialog:false,//取消转让确认弹框
            showProtocolDialog:false,//协议弹框
            showBorrowPersonInfoDialog:false,//借款人动态信息弹框
            showBorrowLists:false,//显示借款人列表
        }

        this.empty=[
            {
                url:"https://images.51rz.com/images/rebuild/pc/img/empty/mycount_norecord.png",
                text:"期待你与人众金服的“第一次”",
                btntext:"马上投资",
                href:"/projectList.html"
            },
            {
                url:"https://images.51rz.com/images/rebuild/pc/img/empty/mycount_collect.png",
                text:"标的集结号已经吹响，正在呼唤你来赚钱",
                btntext:"马上投资",
                href:"/projectList.html"
            },
            {
                url:"https://images.51rz.com/images/rebuild/pc/img/empty/mycount_isreceive.png",
                text:"暂时没有回款，但有很多机会！",
                btntext:"马上投资",
                href:"/projectList.html"
            },
            {
                url:"https://images.51rz.com/images/rebuild/pc/img/empty/mycount_received.png",
                text:"千里之行始于足下，万贯之财起于投资",
                btntext:"马上投资",
                href:"/projectList.html"
            },
            {
                url:"https://images.51rz.com/images/rebuild/pc/img/empty/mycount_collect.png",
                text:"标的集结号已经吹响，正在呼唤你来赚钱",
                btntext:"马上投资",
                href:"/projectList.html"
            }
        ]
    }

    async componentDidMount() {
        // let tenderTypes=await API.get(API.myTenderSelect,{})//获取可选取的标的列表
        // tenderTypes=tenderTypes||[];
        // tenderTypes.map((item,i)=>{
        //     tenderTypes[i]={
        //         text:item
        //     }
        // })
        // this.setState({
        //     tenderTypes,
        // })
        this.searchLists()
    }
    onReceiveCurrentTabNavChange(activeNavIndex,nav){
        this.setState({
            activeNavIndex,
            pageNum:1
        })
        setTimeout(()=>{
            this.searchLists()
        },10)
    }
    onReceiveSelectDateTypeChange(i,item){//投标日期或者还款日期发生改变
        const {
            dateTypes
        }=this.state;
        const activeDateTypeIndex=dateTypes.indexOf(item);
        this.setState({
            activeDateTypeIndex
        })

    }
    onReceiveSelectTenderTypeChange(i,item){//标的类型发生改变
        const {
            tenderTypes
        }=this.state;
        const activeTenderTypeIndex=tenderTypes.indexOf(item);
        this.setState({
            activeTenderTypeIndex
        })
        setTimeout(()=>{
            this.searchLists()
        },10)

    }
    onSelectStartDate(date){

        if(date){
            this.setState({
                startTime:date
            })
        }else{
            this.setState({
                startTime:undefined
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
                endTime:undefined
            })
        }

    }
    handleSubmitBtn(){
        this.setState({
            pageNum:1
        })
        setTimeout(()=>{
            this.searchLists()
        },10)
    }
    sortByKey(e,sortBy){
        if(sortBy=='date'){
            this.state.tableData.sort(function(prev,next){
                return new Date(prev.repay_all_time)-new Date(next.repay_all_time)
            })
        }else if(sortBy=='limit'){
            this.state.tableData.sort(function(prev,next){
                const prevDays=prev.borrowTimeType==0?prev.timeLimit*30:prev.timeLimit;
                const nextDays=next.borrowTimeType==0?next.timeLimit*30:next.timeLimit;
                return prevDays-nextDays
            })
        }else if(sortBy=='benjin'){
            this.state.tableData.sort(function(prev,next){
                return prev.money-next.money
            })
        }else if(sortBy=='shouyi'){
            this.state.tableData.sort(function(prev,next){
                return prev.interest-next.interest
            })
        }else if(sortBy=='tenderTime'){
            this.state.tableData.sort(function(prev,next){
                return new Date(prev.addTime)-new Date(next.addTime)
            })
        }
        this.setState({
            tableData:this.state.tableData,
            sortBy
        });
    }
    openTransferDialog(activeItem){//打开转让dialog弹框
        this.setState({
            showZhuanRangDialog:true,
            activeTR:activeItem
        })
    }
    onCloseZhaiQuan(reload){//关闭债权转让弹框
        this.setState({
            showZhuanRangDialog:false,
            activeTR:null
        })
        setTimeout(()=>{
            reload && this.searchLists();//刷新当页数据
        },10)
    }
    openCancelTransfer(activeItem){//打开取消转让协议弹框

        this.setState({
            showCancelTransferDialog:true,
            activeTR:activeItem
        })
    }
    onCloseCancelTransfer(){//关闭取消转让确认弹框
        this.setState({
            showCancelTransferDialog:false,
            activeTR:null
        })
    }
    async onCancelTransferSubmit(){//取消转让的确认功能
        const {
            activeTR
        }=this.state;
        const param={
            bondId:activeTR.bondId
        }
        let obj=await API.post(API.cancelTransfer,param)
        if(obj){
            this.props.dispatch(setMsg('债权转让取消成功'));
            setTimeout(()=>{
                this.setState({
                    showCancelTransferDialog:false
                });
                this.searchLists();//刷新当页数据
            },2000)
        }
    }
    openProtocol(activeItem){//打开协议弹框

        this.setState({
            showProtocolDialog:true,
            activeTR:activeItem
        })
    }
    onCloseProtocol(){//关闭协议弹框
        this.setState({
            showProtocolDialog:false,
            activeTR:null
        })
    }
    onOpenBorrowPersonInfo(activeItem){
        this.setState({
            showBorrowPersonInfoDialog:true,
            activeTR:activeItem
        })
    }
    onCloseBorrowPersonInfoDialog(){
        this.setState({
            showBorrowPersonInfoDialog:false,
            activeTR:null
        })
    }
    onOpenBorrowListsDialog(activeItem){
        this.setState({
            showBorrowLists:true,
            activeTR:activeItem
        })
    }
    onCloseBorrowListsDialog(){
        this.setState({
            showBorrowLists:false,
            activeTR:null
        })
    }
    async searchLists(){
        const {
            navs,
            tenderTypes,
            activeNavIndex,//激活的label索引
            activeDateTypeIndex,//激活的日期类型索引
            activeTenderTypeIndex,//激活的标的类型索引
            startTime,//开始时间
            endTime,//结束时间
            pageNum,
            numPerPage,

        }=this.state;
        const status=navs[activeNavIndex].status;
        const param={
            pageNum,
            numPerPage,
            dateType:activeDateTypeIndex+1,//1，投标日期，2还款日期
        }

        if(status!=null){
            param.status=status
        }
        if(activeTenderTypeIndex!=null){//根据标的名称查找
            param.borrowName=tenderTypes[activeTenderTypeIndex].text
        }
        if(startTime&&endTime){
            param.startTime=startTime;
            param.endTime=endTime;
        }

        let obj=await API.post(API.myTender,param);
        // console.log(obj.recordList);

        this.setState({
            tableData:obj.recordList||[],
            totalPage:obj.totalPage||0,
            pageNum:obj.currentPage||1,
        })
        this.sortByKey(undefined,this.state.sortBy)

    }
    onReceiveCurrentPageChange(pageNum){
        this.setState({
            pageNum
        });
        setTimeout(()=>{
            this.searchLists();//更新数据列表
        },10)
    }
    render() {
        const {
            activeNavIndex,
            navs,
            dateTypes,
            activeDateTypeIndex,
            tenderTypes,
            tableData,
            sortBy,
            showZhuanRangDialog,
            showCancelTransferDialog,
            showProtocolDialog,
            pageNum,
            totalPage,
            activeTR,
            startTime,
            endTime,
            showBorrowPersonInfoDialog,
            showBorrowLists,
        }=this.state;

        return (
            <div className={Css.wrap}>
                <h4 className ={Css.pageTitle}>单标项目</h4>
                <TabSelectNav activeIndex={activeNavIndex}
                              navs={navs}
                              onCurrentChange={(i)=>{this.onReceiveCurrentTabNavChange(i)}}
                />
                <div className={Css.searchRow}>
                    {/*<SelectList title={'项目名称'}*/}
                                {/*lists={tenderTypes}*/}
                                {/*onChange={(i,activeItem)=>{this.onReceiveSelectTenderTypeChange(i,activeItem)}}*/}
                                {/*style={{*/}
                                    {/*display:'inline-block',*/}
                                {/*}}*/}
                    {/*/>*/}
                    <SelectList  lists={dateTypes}
                                 onChange={(i,activeItem)=>{this.onReceiveSelectDateTypeChange(i,activeItem)}}
                                 activeIndex={activeDateTypeIndex}
                                 style={{
                                     display:'inline-block',
                                     margin:'0 10px 0 0'
                                 }}
                    />
                    <Callender onSelectDate={(y,m,d)=>{this.onSelectStartDate(y,m,d)}}
                               maxDate={endTime}
                    />
                    <span style={{display:'inline-block',margin:'0 10px'}}>至</span>
                    <Callender
                        onSelectDate={(y,m,d)=>{this.onSelectEndDate(y,m,d)}}
                        minDate={startTime}
                    />
                    <span onClick={(e)=>{this.handleSubmitBtn(e)}} className={Css.searchBtn}>搜索</span>
                </div>
                <div className={Css.tableWraper}>
                    <table>
                        <thead>
                            <tr>
                                <th className={`${sortBy=='date'&&Css.active}`}>
                                    还款日期
                                </th>
                                <th>项目名称</th>
                                <th className={`${sortBy=='limit'&&Css.active}`}>
                                    期限
                                </th>
                                <th className={`${sortBy=='benjin'&&Css.active}`}>
                                    投资本金
                                </th>
                                <th className={`${sortBy=='shouyi'&&Css.active}`}>
                                    预期收益
                                </th>
                                <th className={`${sortBy=='tenderTime'&&Css.active}`}>
                                    投标时间
                                </th>
                                <th>状态</th>
                                <th>详情</th>
                            </tr>
                        </thead>
                        <Rows tableData={tableData}
                              activeNavIndex={activeNavIndex}
                              onOpenTransfer={(activeItem)=>{this.openTransferDialog(activeItem)}}
                              onOpenProtocol={(activeItem)=>{this.openProtocol(activeItem)}}
                              onOpenCancelTransfer={(activeItem)=>{this.openCancelTransfer(activeItem)}}
                              onOpenBorrowPersonInfo={(activeItem)=>{this.onOpenBorrowPersonInfo(activeItem)}}
                              onOpenBorrowListsDialog={(activeItem)=>{this.onOpenBorrowListsDialog(activeItem)}}
                        />

                    </table>
                    {!tableData.length&&<Blank
                        {...this.empty[activeNavIndex]}
                    ></Blank>}
                </div>
                {tableData.length?<Pagination  currentPage={pageNum}
                                                pages={totalPage}
                                                style={{margin:'35px 0 30px 0'}}
                                                onCurrentChange={(pageNum)=>{this.onReceiveCurrentPageChange(pageNum)}}
                    />:''
                }
                {
                    showZhuanRangDialog && <ZhaiQuanZhuanRang
                        show={showZhuanRangDialog}
                        onClose={(reload)=>{this.onCloseZhaiQuan(reload)}}
                        activeTR={activeTR}
                    />
                }

                <ProtocolDialog show={showProtocolDialog} onClose={()=>{this.onCloseProtocol()}}/>
                <CancelTransferDialog show={showCancelTransferDialog}
                                      onCancelTransferSubmit={(activeItem)=>{this.onCancelTransferSubmit(activeItem)}}
                                      onClose={()=>{this.onCloseCancelTransfer()}}/>
                {showBorrowPersonInfoDialog && <BorrowInfoDialog  show={showBorrowPersonInfoDialog}
                                         activeTR={activeTR}
                                         onClose={()=>{this.onCloseBorrowPersonInfoDialog()}}/>}
                {showBorrowLists && <BorrowListsDialog  show={showBorrowLists}
                                                        activeTR={activeTR}
                                                        onClose={()=>{this.onCloseBorrowListsDialog()}}/>}
                <Msg/>
                {this.props.store.userInfo.realNameStatus!=1 ? <OpenCunGuanDialog show={true}/>:''}
            </div>
        );
    }
}

MyTender = connect((store) => ({store}))(MyTender);
export default withRouter(MyTender);










