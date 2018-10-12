import React, {Component} from "react";
import {withRouter} from 'react-router';
import {connect} from "react-redux";
import Css from "@/assets/css/member/recharge.scss";
import store from "@/store/store.js";
import API from "@/api/api.js";

import TabSelectNav from '@/components/TabSelectNav/TabSelectNav.jsx'
import InputComp from '@/components/Input/index.jsx'
import Btn from '@/components/Btn/index.jsx'
import BankCard from '@/components/BankCard/index.jsx'
import Dialog from '@/components/Dialog'
import Msg from  "@/components/Msg/index.jsx";
import OpenCunGuanDialog from  "@/components/OpenCunGuanDialog/index.jsx";


import {setMsg,setYiBaoInfo} from "@/store/action.js";

const moneyText=(money)=>{
    return money>10000?(money / 10000)+'万':money;
}

//其他银行卡充值限额
const OtherBankLists=(props)=>{
    const {
        banksLimit=[]
    }=props;
    const bankRows=banksLimit.map((bank,index)=>{
        return (
            <tr key={index}>
                <td>{bank.bankName}</td>
                <td>{`${bank.singleLimit}元`}</td>
                <td>{`${bank.dayLimit}元`}</td>
                <td>{`${bank.monthLimit}元`}</td>
            </tr>
        )
    })
    return (
        <div className={Css.otherBankWraper}>
            <h5>认证支付限额</h5>
            <div className={Css.tableWaraper}>
                <table>
                    <thead><tr><th>银行</th><th>单笔限额</th><th>单日限额</th><th>单月限额</th></tr></thead>
                    <tbody>{bankRows}</tbody>
                </table>
            </div>
            <p className={Css.tips}>Tips：具体限额以用户签约银行为准</p>
        </div>
    )
}

//快捷充值
class QuickCharge extends Component{
    constructor(props){
        super(props);
        this.state={
            isLoading:false,
            showOpenCunGuanDialog:true,
            bankData:{//银行卡信息
                icon:'',//银行卡icon图标地址
                bank_name:'',//银行名称
                bank_no:'',//银行卡号
                bank_code:'',//银行卡对应编码
                user_name:'',//银行卡户名
                id_no:'',//身份证号码
                single_limit:'',//单次充值限额
                day_limit:'',//单日限额
                month_limit:'',//单月限额
                input_limit:'',//最小充值限额
                pay_code:'',//银行支付码
            },
            rechargeVal:'',//充值金额
            rechargeValied:false,//充值金额是否校验通过
            showDialog:false,
            banksLimit:[],//各大银行对应的限额列表
            lianlianRetObj:{}
        };
    }

    async componentWillMount() {
        let bankObj = await API.post(API.showBankInfoWeb);//初始化银行卡信息
        this.setState({
            bankData:bankObj
        });
        const banksLimit=await API.post(API.showBankLimitListWeb);//初始化银行卡限额列表

        this.setState({
            banksLimit
        })

    }
    onRechargeChange(rechargeVal,rechargeValied){
        this.setState({
            rechargeVal,
            rechargeValied
        })
    }
    async onClickQuickRechargeBtn(){//点击快捷充值按钮

        const {
            rechargeVal,
            rechargeValied,
            bankData
        }=this.state;

        if(!rechargeVal){
            this.props.dispatch(setMsg('充值金额不能为空'));
            return ;
        }
        if(!rechargeValied){
            return;
        }

        if(rechargeVal<bankData.input_limit){//充值金额不能低于银行最低限额
            this.props.dispatch(setMsg(`充值金额不能低于${bankData.input_limit}元`));
            return ;
        }

        if(this.state.isLoading){//正在加载
            return;
        }
        this.setState({
            isLoading:true
        })
        //1 调用支付路由
        const selectChanelParam={
            money:this.state.rechargeVal,
            bank_code:bankData.bank_code+''
        }

        let chanelObj=await API.post(API.selectRechargeChannel,selectChanelParam);
        if(typeof chanelObj=='string'){
            this.props.dispatch(setMsg(chanelObj));
            return;
        }
        const {pay_code,channel}=chanelObj;
        this.setState({
            pay_code
        })
        if(channel=='lianlian'){//走连连支付
            const lianlianParam={
                money:this.state.rechargeVal,
                pay_code,
                from:'pc',
                // add_ip:'0.0.0.0'
            }

            const lianlianResObj=await API.post(API.createRechargeWeb,lianlianParam,true);//返回对应的表单信息
            this.setState({
                isLoading:false
            })
            const {
                obj,
                responseCode,
                responseMessage
            }=lianlianResObj;
            if(responseCode=='000000'){
                if(typeof obj=='object'){
                    this.setState({//设置连连充值的返回对象
                        lianlianRetObj:obj
                    })
                    setTimeout(()=>{
                        this.refs.lianlianConfirmForm.submit();
                    },10)
                }
            }else if(responseCode=='999998'){//未登录
                window.location.href='/login.html'
            }else{
                this.props.dispatch(setMsg(responseMessage));
            }

        }else{//其他渠道
            const quickParam={
                money:this.state.rechargeVal,
                pay_code,
                charge_type:1,//1 投资账户  2 融资账户
                from:'pc',
                add_ip:'0.0.0.0'
            }

            const quickResObj=await API.post(API.quickRechargeSubmit,quickParam,true);//这一步会发送短信验证码
            this.setState({
                isLoading:false
            })
            const {
                obj,
                responseCode,
                responseMessage
            }=quickResObj;


            if(responseCode=='000000'){
                const order_no=obj.order_no;
                this.props.dispatch(setYiBaoInfo({//设置下一页面充值用到的对应信息
                    mobile:obj.mobile,
                    money:rechargeVal,
                    origin_order_no:order_no,//订单编号
                    bank_no:this.state.bankData.bank_no,
                    bank_name:this.state.bankData.bank_name,
                    single_limit:this.state.bankData.single_limit,
                    day_limit:this.state.bankData.day_limit,
                    month_limit:this.state.bankData.month_limit,
                    channel,//yibao  rongbao
                    pay_code
                }))

                window.location.href='/member/yibaoConfirm.html';
            }else if(responseCode=='999998'){//未登录
                window.location.href='/login.html'
            }else{
                this.props.dispatch(setMsg(responseMessage));
            }

        }
    }
    onClickOtherBankLimit(){//点击其他银行充值限额
        this.setState({
            showDialog:true
        })
    }

    render(){
        const {
            bankData,//银行卡信息
            showDialog,
            banksLimit
        }=this.state;

        const {
            version='1.0',
            oid_partner='',
            user_id,
            busi_partner='',
            no_order='',
            dt_order='',
            name_goods='',
            info_order='',
            rote_id='',
            money_order='',
            notify_url='',
            url_return='',
            userreq_ip='',
            url_order='',
            bank_code='',
            pay_type='',
            sign_type='',
            sign='',
            timestamp,
            risk_item,
            valid_order,
            id_type,
            id_no,
            acct_name,
            flag_modify,
            card_no
        }=this.state.lianlianRetObj;

        return (
            <div className={Css.quickWraper}>
                <div className={Css.typeWraper}>
                    <label className={Css.labelTitle}>充值方式：&nbsp;&nbsp;</label>
                    <BankCard bankName={bankData.bank_name}
                              icon={bankData.icon}
                              bankId={bankData.bank_no}
                              userName={bankData.user_name}
                              cardId={bankData.id_no}
                    />
                    <div className={Css.moneyLimit}>
                        <p className={Css.title}>{bankData.bank_name}充值限额：</p>

                        <div className={'clearfix '+Css.table}>
                            <table className={'fn-fl '+Css.colorTable}>
                                <thead>
                                <tr>
                                    <th>单笔限额</th><th>单日限额</th><th>单月限额</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>{`${bankData.single_limit}元`}</td>
                                    <td>{`${bankData.day_limit}元`}</td>
                                    <td>{`${bankData.month_limit}元`}</td>
                                </tr>
                                </tbody>
                            </table>
                            <p className={'fn-fr '+Css.right} onClick={(e)=>{this.onClickOtherBankLimit(e)}}>其他银行限额</p>
                        </div>
                    </div>
                </div>
                <div className={Css.formWraper}>
                    <InputComp label={'充值金额：'}
                               labelStyle={{
                                   width:'95px'
                               }}
                               placeholder={'请输入充值金额'}
                               val={this.state.rechargeVal}
                               onChange={(val,valied)=>{this.onRechargeChange(val,valied)}}
                               validate={{
                                   required:'充值金额不能为空',
                                   reg:/^\d+(\.\d{1,2})?$/,
                                   regMsg:'请输入正确的金额',
                               }}
                    />
                    <Btn text={'立即充值'}
                         type={'red'}
                         style={{marginLeft:'95px'}}
                         onClick={(e)=>{this.onClickQuickRechargeBtn(e)}}
                    />
                </div>
                <Dialog onClose={()=>{
                    this.setState({
                        showDialog:false
                    })
                }} show={showDialog} style={{padding:'0 30px 0 20px'}}>
                    <OtherBankLists banksLimit={banksLimit}/>
                </Dialog>
                <form action="https://payment.lianlianpay.com/payment/authpay.htm"
                      method="post" ref="lianlianConfirmForm"
                      style={{display:'none'}}
                >
                    <input type="text" name="version" value={version} onChange={()=>{}}/>
                    <input type="text" name="oid_partner" value={oid_partner} onChange={()=>{}}/>
                    <input type="text" name="user_id" value={user_id} onChange={()=>{}}/>
                    <input type="text" name="sign_type" value={sign_type} onChange={()=>{}}/>
                    <input type="text" name="sign" value={sign} onChange={()=>{}}/>
                    <input type="text" name="busi_partner" value={busi_partner} onChange={()=>{}}/>
                    <input type="text" name="no_order" value={no_order} onChange={()=>{}}/>
                    <input type="text" name="dt_order" value={dt_order} onChange={()=>{}}/>
                    <input type="text" name="name_goods" value={name_goods} onChange={()=>{}}/>
                    <input type="text" name="info_order" value={info_order} onChange={()=>{}}/>
                    <input type="text" name="money_order" value={money_order} onChange={()=>{}}/>

                    <input type="text" name="notify_url" value={notify_url} onChange={()=>{}}/>
                    <input type="text" name="url_return" value={url_return} onChange={()=>{}}/>
                    <input type="text" name="userreq_ip" value={userreq_ip} onChange={()=>{}}/>
                    {/*<input type="text" name="url_order" value={url_order} />*/}
                    <input type="text" name="valid_order" value={valid_order} onChange={()=>{}}/>
                    <input type="text" name="risk_item" value={risk_item} onChange={()=>{}}/>
                    <input type="text" name="timestamp" value={timestamp} onChange={()=>{}}/>

                    <input type="text" name="id_type" value={id_type} onChange={()=>{}}/>
                    <input type="text" name="id_no" value={id_no} onChange={()=>{}}/>
                    <input type="text" name="acct_name" value={acct_name} onChange={()=>{}}/>
                    <input type="text" name="flag_modify" value={flag_modify} onChange={()=>{}}/>
                    <input type="text" name="card_no" value={card_no} onChange={()=>{}}/>
                    {/*{rote_id&&<input type="text" name="rote_id" value={rote_id} />}*/}
                    {/*<input type="text" name="bank_code" value={bank_code} />*/}
                    <input type="text" name="pay_type" value={pay_type} onChange={()=>{}}/>

                </form>
            </div>
        )
    }
}

QuickCharge = connect((store) => ({store}))(QuickCharge);

const QuickTips=(props)=>{
    return (
        <ul className={Css.tips}>
            <h5>温馨提示：</h5>
            <li>
                1、人众金服禁止信用卡套现、虚假交易等行为，一经发现将予以处罚，包括但不限于：限制收款、冻结账户、永久停止服务，并有可能影响相关信用记录。            </li>
            <li>
                2、网上银行充值过程请耐心等待，充值成功后，请不要关闭浏览器，充值成功后返回人众金服，充值金额才能打入您的账号。            </li>
            <li>
                3、当日充值金额下个工作日银行清算，未清算前，不可提现或承接债权转让，但可进行投资等其他操作。
            </li>
            <li>
                4、储蓄卡开通在线支付流程演示（以平安银行为例）：http://static.95516.com/static/start/detail_80.html
            </li>
            <li>
                5、银联无卡支付业务开通网址：https://www.95516.com/portal/open/init.do?entry=open
            </li>
            <li>
                6、最终解释权在法律允许范围内归人众金服。
            </li>
            {/*<li style={{textAlign:'center'}}>*/}
                {/*<p>认证支付限额</p>*/}
                {/*<table className={Css.ruleTable}>*/}
                    {/*<tr>*/}
                        {/*<td>银行</td><td>单笔限额</td><td>单日限额</td><td>单月限额</td>*/}
                    {/*</tr>*/}
                    {/*<tr>*/}
                        {/*<td>中国银行</td><td>5万</td><td>50万</td><td>1500万</td>*/}
                    {/*</tr>*/}
                    {/*<tr>*/}
                        {/*<td>邮储银行</td><td>5万</td><td>10万</td><td>300万</td>*/}
                    {/*</tr>*/}
                    {/*<tr>*/}
                        {/*<td>兴业银行</td><td>5万</td><td>5万</td><td>150万</td>*/}
                    {/*</tr>*/}
                    {/*<tr>*/}
                        {/*<td>浦发银行</td><td>5万</td><td>30万</td><td>900万</td>*/}
                    {/*</tr>*/}
                    {/*<tr>*/}
                        {/*<td>工商银行</td><td>20万</td><td>50万</td><td>1500万</td>*/}
                    {/*</tr>*/}
                    {/*<tr>*/}
                        {/*<td>招商银行</td><td>5万</td><td>5万</td><td>150万</td>*/}
                    {/*</tr>*/}
                    {/*<tr>*/}
                        {/*<td>农业银行</td><td>20万</td><td>20万</td><td>600万</td>*/}
                    {/*</tr>*/}
                    {/*<tr>*/}
                        {/*<td>交通银行</td><td>5万</td><td>20万</td><td>600万</td>*/}
                    {/*</tr>*/}
                    {/*<tr>*/}
                        {/*<td>建设银行</td><td>5万</td><td>20万</td><td>600万</td>*/}
                    {/*</tr>*/}
                    {/*<tr>*/}
                        {/*<td>中信银行</td><td>0.5万</td><td>0.5万</td><td>1万</td>*/}
                    {/*</tr>*/}
                    {/*<tr>*/}
                        {/*<td>平安银行</td><td>50万</td><td>100万</td><td>3000万</td>*/}
                    {/*</tr>*/}
                    {/*<tr>*/}
                        {/*<td>民生银行</td><td>50万</td><td>50万</td><td>1500万</td>*/}
                    {/*</tr>*/}
                    {/*<tr>*/}
                        {/*<td>广发银行</td><td>50万</td><td>100万</td><td>3000万</td>*/}
                    {/*</tr>*/}
                    {/*<tr>*/}
                        {/*<td>光大银行</td><td>50万</td><td>100万</td><td>3000万</td>*/}
                    {/*</tr>*/}
                    {/*<tr>*/}
                        {/*<td>浙商银行</td><td>0.5万</td><td>0.5万</td><td>15万</td>*/}
                    {/*</tr>*/}
                    {/*<tr>*/}
                        {/*<td>上海银行</td><td>10万</td><td>100万</td><td>3000万</td>*/}
                    {/*</tr>*/}
                    {/*<tr>*/}
                        {/*<td>华夏银行</td><td>50万</td><td>100万</td><td>3000万</td>*/}
                    {/*</tr>*/}
                    {/*<tr>*/}
                        {/*<td>杭州银行</td><td>5万</td><td>30万</td><td>900万</td>*/}
                    {/*</tr>*/}
                    {/*<tr>*/}
                        {/*<td>广州银行</td><td>50万</td><td>100万</td><td>3000万</td>*/}
                    {/*</tr>*/}
                    {/*<tr>*/}
                        {/*<td>北京银行</td><td>5万</td><td>30万</td><td>900万</td>*/}
                    {/*</tr>*/}
                {/*</table>*/}
                {/*<p>Tips：具体限额以用户签约银行为准。</p>*/}
            {/*</li>*/}
        </ul>
    )
}

//网银充值
class NetBankCharge extends Component{
    constructor(props){
        super(props);
        this.state={
            isLoading:false,
            rechargeVal:'',
            rechargeValied:false,
            bankLists:[

            ],
            activeBankIndex:0,//被激活的银行索引
        };
    }
    async componentWillMount(){
        let bankLists=await API.post(API.showBankListWY);
        this.setState({
            bankLists
        })
    }
    selectBank(e,bank,activeBankIndex){
        this.setState({
            activeBankIndex
        })
    }
    onRechargeChange(rechargeVal,rechargeValied){
        this.setState({
            rechargeVal,
            rechargeValied
        })
    }
    async onClickRechargeBtn(){//点击快捷重置按钮
        const {
            rechargeVal,
            rechargeValied,
            bankLists,
            activeBankIndex
        }=this.state;

        if(!rechargeVal){
            this.props.dispatch(setMsg('充值金额不能为空！'));
            return;
        }
        if(!rechargeValied){
            return ;
        }
        if(this.state.isLoading){
            return;
        }
        const param={
            money:this.state.rechargeVal,
            bank_code:bankLists[activeBankIndex]['bankCode'],
            charge_type:'1',//1 投资账户  2 融资账户
            from:'pc',
            loginfrom:'pc',
            token:this.props.store.userInfo.token
        }


        let origin=window.location.origin
        let apiUrl=API.netBankRecharge;
        let params=[];
        Object.keys(param).forEach((key,i)=>{
            params.push(`${key}=${param[key]}`)
        })
        const query=params.join('&');
        console.log(`${origin}${apiUrl}?${query}`);
        window.open(`${origin}${apiUrl}?${query}`);


        // this.setState({
        //     isLoading:true
        // })

        // let resData=await API.post(API.netBankRecharge,param,true);
        // const {
        //     obj,
        //     responseCode,
        //     responseMessage
        // }=resData;
        //
        // if(responseCode=='000000'){
        //     if(typeof obj=='object'){
        //         // alert(JSON.stringify(obj));
        //     }
        //     // window.location.href='/member/index.html#/index';
        // }else if(responseCode=='999998'){
        //     window.location.href='/login.html'
        // }else{
        //     this.props.dispatch(setMsg(responseMessage))
        //     this.setState({
        //         isLoading:false
        //     })
        // }

    }
    render(){
        const {activeBankIndex}=this.state
        const bankConfig={
            "中国邮政储蓄银行":{
                bankICon:'https://images.51rz.com/images/rebuild/pc/img/bank_big_icon/bank_youchu.png',
            },
            "上海银行":{
                bankICon:'https://images.51rz.com/images/rebuild/pc/img/bank_big_icon/bank_shanghai.png',
            },
            '浙商银行':{
                bankICon:'https://images.51rz.com/images/rebuild/pc/img/bank_big_icon/bank_zheshang.png',
            },
            '中信银行':{
                bankICon:'https://images.51rz.com/images/rebuild/pc/img/bank_big_icon/bank_zhongxin.png',
            },
            '中国建设银行':{
                bankICon:'https://images.51rz.com/images/rebuild/pc/img/bank_big_icon/bank_jianshe.png',
            },
            '兴业银行':{
                bankICon:'https://images.51rz.com/images/rebuild/pc/img/bank_big_icon/bank_xingye.png',
            },
            '中国工商银行':{
                bankICon:'https://images.51rz.com/images/rebuild/pc/img/bank_big_icon/bank_gongshang.png',
            },
            '杭州银行':{
                bankICon:'https://images.51rz.com/images/rebuild/pc/img/bank_big_icon/bank_hangzhou.png',
            },
            '招商银行':{
                bankICon:'https://images.51rz.com/images/rebuild/pc/img/bank_big_icon/bank_zhaoshang.png',
            },
            '中国农业银行':{
                bankICon:'https://images.51rz.com/images/rebuild/pc/img/bank_big_icon/bank_nongye.png',
            },
            '北京银行':{
                bankICon:'https://images.51rz.com/images/rebuild/pc/img/bank_big_icon/bank_beijing.png',
            },
            '上海浦东发展银行':{
                bankICon:'https://images.51rz.com/images/rebuild/pc/img/bank_big_icon/bank_pufa.png',
            },
            '中国银行':{
                bankICon:'https://images.51rz.com/images/rebuild/pc/img/bank_big_icon/bank_zhongguo.png',
            },
            '交通银行':{
                bankICon:'https://images.51rz.com/images/rebuild/pc/img/bank_big_icon/bank_jiaotong.png',
            },
            '广东发展银行':{
                bankICon:'https://images.51rz.com/images/rebuild/pc/img/bank_big_icon/bank_guangfa.png',
            },
            "中国民生银行":{
                bankICon:'https://images.51rz.com/images/rebuild/pc/img/bank_big_icon/bank_minsheng.png',
            },
            '平安银行':{
                bankICon:'https://images.51rz.com/images/rebuild/pc/img/bank_big_icon/bank_pingan.png',
            },
            '中国光大银行':{
                bankICon:'https://images.51rz.com/images/rebuild/pc/img/bank_big_icon/bank_guangda.png',
            },
            '华夏银行':{
                bankICon:'https://images.51rz.com/images/rebuild/pc/img/bank_big_icon/bank_huaxia.png',
            },
            "广州银行":{
                bankICon:'https://images.51rz.com/images/rebuild/pc/img/bank_big_icon/bank_guangzhou.png',
            },
            '成都银行':{
                bankICon:'https://images.51rz.com/images/rebuild/pc/img/bank_big_icon/bank_chengdu.png',
            },
            '宁波银行':{
                bankICon:'https://images.51rz.com/images/rebuild/pc/img/bank_big_icon/bank_ningbo.png',
            },
            '南京银行':{
                bankICon:'https://images.51rz.com/images/rebuild/pc/img/bank_big_icon/bank_nanjing.png',
            },
            '东亚银行（中国）有限公司':{
                bankICon:'https://images.51rz.com/images/rebuild/pc/img/bank_big_icon/bank_dongya.png',
            }
        }

        const lists=this.state.bankLists.map((bank,index)=>{
            return (
                <li key={index}
                    className={activeBankIndex==index?Css.active:''}
                    onClick={(e,arg1,arg2)=>{this.selectBank(e,bank,index)}}>
                    <img src={`${(bankConfig[bank.bankName]||{}).bankICon}`} alt={bank.bankName}/>
                </li>
            )
        });
        return (
            <div className={Css.bankWraper}>
                <div className={`${Css.bankLists} clearfix`}>
                    <h5 >选择银行：</h5>
                    <ul >{lists}</ul>
                </div>
                <div className={Css.formWraper}>
                    <InputComp label={'充值金额：'}
                               labelStyle={{
                                   width:'95px'
                               }}
                               placeholder={'请输入充值金额'}
                               val={this.state.rechargeVal}
                               onChange={(val,valied)=>{this.onRechargeChange(val,valied)}}
                               validate={{
                                   required:'充值金额不能为空',
                                   reg:/^\d+(\.\d{1,2})?$/,
                                   regMsg:'请输入正确的金额',
                               }}
                    />
                    <Btn text={'立即充值'}
                         type={'red'}
                         style={{marginLeft:'95px'}}
                         onClick={(e)=>{this.onClickRechargeBtn(e)}}
                    />
                </div>
            </div>
        )
    }
}
NetBankCharge = connect((store) => ({store}))(NetBankCharge);

const NetBankTips=(props)=>{
    return (
        <ul className={Css.tips}>
            <h5>温馨提示：</h5>
            <li>
                1、人众金服禁止信用卡套现、虚假交易等行为，一经发现将予以处罚，包括但不限于：限制收款、冻结账户、永久停止服务，并有可能影响相关信用记录。
            </li>
            <li>
                2、网上银行充值过程请耐心等待，充值成功后，请不要关闭浏览器，充值成功后返回人众金服，充值全额才能打入您的账号。
            </li>
            <li>
                3、当日充值金额不投标，次日银行清算后方可申请提现。
            </li>
            <li>
                4、最终解释权在法律允许范围内归人众金服。
            </li>
        </ul>
    )
}


class Recharge extends Component {
    constructor(props) {
        super(props);

        this.state={
            activeNavIndex:0,//当前激活的nav索引
            navs:[//nav切换的数据
                {
                    text:'快捷充值',
                    style:{
                        paddingLeft:0
                    }
                },
                {
                    text:'网银充值'
                }
            ]
        }
    }
    onReceiveCurrentTabNavChange(activeNavIndex){
        this.setState({
            activeNavIndex
        })
    }
    render() {
        const {
            activeNavIndex,
            navs
        }=this.state;

        const {
            realNameStatus,//是否实名认证过
        }=this.props.store.userInfo;

        return (
            <div className={Css.wrap}>
                <h4 className ={Css.pageTitle}>充值</h4>
                <TabSelectNav activeIndex={activeNavIndex}
                              navs={navs}
                              onCurrentChange={(i,nav)=>{this.onReceiveCurrentTabNavChange(i,nav)}}
                />
                {activeNavIndex==0 ?<QuickCharge />:<NetBankCharge />}
                {activeNavIndex==0 ?<QuickTips />:<NetBankTips />}
                {realNameStatus!=1 && <OpenCunGuanDialog/>}
                <Msg/>
            </div>
        )
    }
}

//如果一个组件是以路由的方式加载   并且需要在路由中传递 路由信息   需要widthRouter进行包裹
Recharge = connect((store) => ({store}))(Recharge);
export default withRouter(Recharge);