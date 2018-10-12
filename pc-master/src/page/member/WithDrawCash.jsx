
import React,{Component} from "react";
import {NavLink} from 'react-router-dom';
import {withRouter} from 'react-router';
import {connect} from "react-redux";
import Css from "@/assets/css/member/withDrawCash.scss";
import store from "@/store/store.js";

import BankCard from '@/components/BankCard/index.jsx'
import InputComp from '@/components/Input/index.jsx'
import Btn from '@/components/Btn/index.jsx'
import Tip from '@/components/Tip/index.jsx'
import OpenCunGuanDialog from  "@/components/OpenCunGuanDialog/index.jsx";
import Msg from  "@/components/Msg/index.jsx"
import Dialog from '@/components/Dialog'

import API from '@/api/api.js'
import {setMsg} from "@/store/action.js"

import MD5 from 'blueimp-md5'
import SHA256 from 'sha256'

const Tips=(props)=>{
    const data = props.data
    return (
        <div className={Css.tips}>
            <h5>温馨提示：</h5>
            <li>
                1.提现金额单笔不可低于100元，每日累计提现金额不得超过100万元；
            </li>
            <li>
                2. 当日充值的资金，下一工作日银行清算后方可申请提现（当日可进行投资）；
            </li>
            <li>
                3. 提现手续费详见下表：（每个用户每月可享受3次免费提现机会）
                <table className={`${Css.colorTable} ${Css.col2}`} >
                    <thead>
                    <tr><th>提现金额</th><th>手续费</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>0~5万元（含）</td><td>2元/笔</td></tr>
                        <tr><td>5~10万元（含</td><td>3元/笔</td></tr>
                        <tr><td>10~50万元（含）</td><td>4元/笔</td></tr>
                        <tr><td>50~100万元</td><td>5元/笔</td></tr>
                    </tbody>
                </table>
            </li>
            <li>
                4.为了您的资金安全，请确保提现银行账号的姓名和您进行实名验证的姓名一致；
            </li>
            <li>
                5.请确保您输入的是正确的储蓄卡账号，而非信用卡账号；
            </li>
            <li>
                {/* 6.确认提现后，将在1个工作日(国家节假日除外)之内将钱转入绑定的银行账户内。到账时间参考下表：（实际到账时间需根据提现银行的处理机制而定）
                <table className={`${Css.colorTable} ${Css.col3}`} >
                    <thead>
                    <tr><th>提现金额</th><th>申请提现时间</th><th>提现到账时间</th></tr>
                    </thead>
                    <tbody>
                    <tr><td rowSpan={2}>周一至周五</td><td>16:00之前</td><td>当日到账</td></tr>
                    <tr><td>16:00之后</td><td>下一个工作日到账</td></tr>
                    <tr><td>周六、周日</td><td>全天</td><td>下一个工作日到账</td></tr>
                    <tr><td>法定节假日</td><td>全天</td><td>下一个工作日到账</td></tr>
                    </tbody>
                </table> */}
                6.当日21：00前申请提现当日到账，21:00之后申请提现延迟至次日到账，不区分双休及节假日。（实际到账时间需根据提现银行的处理机制而定）。
            </li>
            <li>
                7.提现过程遇到问题，请联系客服400-655-8858(工作日9：00-22：00)。
            </li>
            <li>
                8.最终解释权在法律范围内归人众金服所有。
            </li>
        </div>
    )
}

class NoPayPassDialog extends Component{
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
        }=this.props;

        return (
            <Dialog show={show} onClose={()=>{onClose()}}>
                <div className={Css.noPayPassDialog}>
                    <h5>为保证您的资金账户安全 <br/>请先设置交易密码</h5>
                    <p>
                        <span onClick={()=>{onClose()}}>取消</span>
                        <NavLink to={'/safeCenter'}>设置</NavLink>
                    </p>
                </div>
            </Dialog>
        );
    }
}

NoPayPassDialog=connect((store) => ({store}))(NoPayPassDialog);


class WithDrawCash extends Component{
    constructor(props) {
        super(props);
        this.state={
            isLoading:false,
            showNoPayPassDialog:false,
            imgSrc: "/apiPc/pcrimg.html",//图形验证码的地址
            imgTimeStamp: new Date() * 1,//图形码时间戳
            withDrawCashVal:'',//提现金额
            withDrawCashValied: false, //提现校验
            widthDrawInpEnv:null,//提现金额的组件对象
            payPassVal:'',//支付密码
            payPassValied: false,  //支付校验
            payPassInpEnv:null,//支付密码组件的执行环境
            imgCodeVal:'',//图形码
            imgCodeValied: false,      //图形校验
            imgCodeInpEnv:null,//图形码组件的执行环境
            tipActive:false,//提示框是否显示
            fee: 0,         //手续费
            min:100, //最小可提现金额
            data: {
                bank_name: '',  //银行名称
                icon: '',       //银行图标路径
                bank_no: '',    //银行卡号
                user_name: '',  //用户名称
                id_no: '',      //身份证
                free_times: 0, //免费提现次数
            },
            cashAndIntransit:{
                cash: '',       //可提现金额
                intransit: '', //待入账金额
                cashState:'',//	true:显示金额,false:显示银行清算中
            },
            tip: [

            ]
        }
    }
    changeTimeStamp(){
        this.setState({
            imgTimeStamp: new Date() * 1
        })
    }
    render(){
        const labelStyle={
            textAlign:'left',
            width:'110px',
            textIndent:'24px'
        }
        const {
            realNameStatus,
            isPayPasWord
        }=this.props.store.userInfo

        let {
            imgSrc,
            withDrawCashVal,
            withDrawCashValied,
            payPassVal,
            payPassValied,
            imgCodeVal,
            imgCodeValied,
            tipActive,
            fee,
            data,
            tip,
            cashAndIntransit,
            showNoPayPassDialog
        } = this.state
        let {
            bank_name,  //银行名称
            icon,       //银行图标路径
            bank_no,    //银行卡号
            user_name,  //用户名称
            id_no,      //身份证
            free_times, //免费提现次数
        } = data
        let {
            cash,       //可提现金额
            in_transit, //待入账金额
            cashState,
        }=cashAndIntransit
        let tipText = free_times === 0  ? (withDrawCashVal ?`手续费：本月免费提现次数已用完，本次提现手续费${fee}元`:'') : `手续费：本月免费提现次数剩余${free_times}次，此次提现免费`

        const imgCodeSrc=`${this.state.imgSrc}?t=${this.state.imgTimeStamp}`
        // const btnType=(withDrawCashValied && payPassValied && imgCodeValied)?'red':'gray'
        return (
            <div className={Css.wrap}>
                {realNameStatus!=1 && <OpenCunGuanDialog/>}
                <h4 className ={Css.pageTitle}>提现</h4>
                <div className={Css.content}>
                    <div className={Css.bankCardArea}>
                        <p className={Css.label}>至该银行卡：</p>
                        <BankCard style={{float:'left'}}
                                  icon={icon}
                                  bankName={bank_name}
                                  bankId={bank_no}
                                  userName={user_name}
                                  cardId={id_no}
                        />
                    </div>
                    <div className={Css.tixianRow}>
                        <p className={Css.label}>可提现金额：</p>
                        <div className={Css.money}>
                            {
                                cashState?
                                <p>{cash}{cash !== '查询中' && <span>元</span>}</p>:
                                '银行清算中'
                            }
                        </div>
                    </div>
                    <div className={Css.daiRu}>
                        <p className={Css.label}>待入账金额：</p>
                        <p className={Css.money}>
                            <i onMouseEnter={(e)=>{this.onMouseEnterTip(e)}}
                               onMouseLeave={(e)=>{this.onMouseLeaveTip(e)}}>
                            </i>
                            {in_transit}
                            {in_transit !== '查询中' && <span>元</span>}
                        </p>
                        <Tip active={tipActive} style={{position:'absolute',top:'-45px',left:'25px'}} text={'当日充值的资金，次日银行清算后方可申请提现(当日可进行投资)'}/>
                    </div>
                    <input autoComplete="new-password" type="hidden"/>
                    <InputComp label={'提现金额：'}
                               labelStyle={labelStyle}
                               tip={tipText}
                               val={withDrawCashVal}
                               validate={
                                   {
                                       required:'提现金额不能为空',
                                       reg: /^\d+(\.\d{1,2})?$/,
                                       regMsg: '提现金额格式不正确！'
                                   }
                               }
                               onChange={(val,valied)=>{this.onWithDrawValChange(val,valied)}}
                               getInputCompEnv={(env)=>{this.setWidthDrawInpEnv(env)}}
                    />
                    <div className={Css.payPassRow}>
                        <div className={Css.input}>
                            <InputComp label={'交易密码：'}
                                       labelStyle={labelStyle}
                                       val={payPassVal}
                                       type="password"
                                       maxLength="16"
                                       validate={
                                           {
                                               required:'交易密码不能为空',
                                               reg: /^.{6,16}$/,
                                               regMsg: '交易密码为6-16位数字和字符组合！'
                                           }
                                       }
                                       onChange={(val,valied)=>{this.onPayPassValChange(val,valied)}}
                                       getInputCompEnv={(env)=>{this.setPayPassInpEnv(env)}}
                            />
                        </div>
                        <a className={Css.forget} href="/member/index.html#/safeCenter">忘记交易密码?</a>
                    </div>
                    <div className={Css.imgCodeRow}>
                        <input autoComplete="new-password" type="hidden"/>
                        <InputComp label={'验证码：'}
                                   labelStyle={labelStyle}
                                   inputStyle={{width:'242px'}}
                                   val={imgCodeVal}
                                   maxLength="4"
                                   validate={
                                       {
                                           required:'验证码不能为空',
                                           reg: /^[\da-zA-Z]{4}$/,
                                           regMsg: '验证码格式不正确'
                                       }
                                   }
                                   onChange={(val,valied)=>{this.onImgCodeValChange(val,valied)}}
                                   getInputCompEnv={(env)=>{this.setImgCodeInpEnv(env)}}
                        >
                            <span className={Css.imgCode} onClick={(e)=>{this.changeTimeStamp(e)}}><img src={imgCodeSrc} /></span>
                            <p className={Css.changeImg} onClick={(e)=>{this.changeTimeStamp(e)}}>换一张</p>
                        </InputComp>
                    </div>
                    <Btn text={'申请提现'}
                         type={'red'}
                         style={{marginLeft:'110px'}}
                         onClick={()=>{this.onClickWithDrawCashBtn()}}
                    />
                </div>
                <NoPayPassDialog show={showNoPayPassDialog} onClose={()=>{this.onCloseNoPayPassDialog()}}/>
                <Tips data={tip}/>
                <Msg/>
            </div>
        )
    }
    async componentWillMount() {
        const data = await API.post(API.showWithdrawInfoWeb,{from:'pc'});
        const cashAndIntransit=data&&data.cashAndIntransit
        const min=data&&data.min||100
        const tip = await API.post(API.showWithdrawLevels)
        this.setState({
            fee: tip[0].fee,
            data,
            tip,
            cashAndIntransit,
            min
        })

    }
    onWithDrawValChange(withDrawCashVal,withDrawCashValied){
        const levels = this.state.tip
        let _fee = 0
        if(!this.state.data.free_times) {
            for(let i = 0;i < levels.length;i++) {
                let {fee,max,min} = levels[i]
                if(withDrawCashVal >= min && withDrawCashVal < max) {
                    _fee = fee
                    break
                }
                if(i === levels.length - 1) {
                    _fee = fee
                }
            }
        }
        this.setState({
            fee: _fee,
            withDrawCashVal,
            withDrawCashValied
        })
    }
    onPayPassValChange(payPassVal,payPassValied){
        this.setState({
            payPassVal,
            payPassValied
        })
    }
    onImgCodeValChange(imgCodeVal,imgCodeValied){
        this.setState({
            imgCodeVal,
            imgCodeValied
        })
    }
    setWidthDrawInpEnv(env){
        this.setState({
            widthDrawInpEnv:env
        })
    }
    setPayPassInpEnv(env){
        this.setState({
            payPassInpEnv:env
        })
    }
    setImgCodeInpEnv(env){
        this.setState({
            imgCodeInpEnv:env
        })
    }
    onCloseNoPayPassDialog(){
        this.setState({
            showNoPayPassDialog:false
        })
    }
    async onClickWithDrawCashBtn(){
        const {
            isPayPasWord
        }=this.props.store.userInfo
        if(!isPayPasWord){
            this.setState({
                showNoPayPassDialog:true
            })
            return;
        }

        this.state.payPassInpEnv.onChange();
        this.state.widthDrawInpEnv.onChange();
        this.state.imgCodeInpEnv.onChange();

        const {
            withDrawCashVal,
            withDrawCashValied,
            payPassVal,
            payPassValied,
            imgCodeVal,
            imgCodeValied,
            isLoading,
            cashAndIntransit,
            min=100
        } = this.state
        if(!withDrawCashValied || !payPassValied || !imgCodeValied || isLoading) return
        if(withDrawCashVal>cashAndIntransit.cash){
            this.props.dispatch(setMsg('提现金额不能超过可提现总额'));
            return;
        }
        if(withDrawCashVal<min){//上线之后需要加上
            this.props.dispatch(setMsg(`提现金额不能低于${min}元`));
            return;
        }

        const param = {
            money: withDrawCashVal,
            pay_pwd: SHA256(MD5(payPassVal)),
            securityCode:imgCodeVal,
            from: 'pc'
        }
        this.setState({
            isLoading:true
        })
        const resData=await API.post(API.addWithdrawRecord,param,true)
        this.setState({
            isLoading:false,
        })
        const {
            obj,
            responseCode,
            responseMessage
        } = resData;
        if(responseCode == '000000'){
            this.props.dispatch(setMsg('提现成功'))
            this.setState({
                withDrawCashVal:'',
                withDrawCashValied:false,
                payPassVal:'',
                payPassValied:false,
                imgCodeVal:'',
                imgCodeValied:false,
            })
            setTimeout(()=>{
                this.setState({
                    isLoading:false,
                })
                this.props.history.push('/index');
            },2000)
        }else if(responseCode == '999998'){//未登录
            window.location.href='/login.html'
        }else{//失败
            this.props.dispatch(setMsg(responseMessage))
        }
    }
    onMouseEnterTip(e){
        this.setState({
            tipActive:true
        })
    }
    onMouseLeaveTip(e){
        this.setState({
            tipActive:false
        })
    }
}

WithDrawCash=connect((store) => ({store}))(WithDrawCash);
export default withRouter(WithDrawCash);



