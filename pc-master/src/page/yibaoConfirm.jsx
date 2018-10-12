import React, {Component} from "react";
import {render} from "react-dom";
import {Provider, connect} from "react-redux";
import {withRouter} from 'react-router'
import Css from "../assets/css/yiBaoConfirm.scss";
import store from "@/store/store.js";
import {setMsg} from "@/store/action.js";
import API from "@/api/api.js";

import Msg from  "@/components/Msg/index.jsx";

class YiBaoConfirm extends Component {
    constructor(props) {
        super(props);
        this.state={
            money:'00',
            origin_order_no:'0',
            countdown:60,
            preMobile:this.props.store.regMobile,
            showDetail:false,//是否显示详情
            channel:this.props.store.channel,
            isLoading:false,//正在加载 避免重复提交
        }
    }
    componentWillMount(){
        this.setState(this.props.store.yibaoConfirmInfo||{})
    }
    componentDidMount() {
        this.startTimeOut();
    }
    async getSmsCode(){
        if(this.state.countdown<60){
            return ;
        }else{
            const param={
                money:this.state.money,
                pay_code:this.state.pay_code,
                charge_type:1,//1 投资账户  2 融资账户
                from:'pc',
                add_ip:'0.0.0.0'
            }
            let obj=await API.post(API.quickRechargeSubmit,param);
            this.startTimeOut();
        }

    }
    startTimeOut(){
        let {
            countdown
        }=this.state;

        if (countdown== 0) {
            // this.refs.get_code.setAttribute('disabled',false);
            this.refs.get_code.innerHTML='重新获取';
            this.setState({
                countdown:60
            })
            return;
        } else {
            // this.refs.get_code.setAttribute('disabled',true);
            this.refs.get_code.innerHTML=countdown+"s后重新获取";

            // $(".reapal_getcode_tip").fadeIn();

            this.setState({
                countdown:countdown-=1
            })
        }

        setTimeout(()=>{
            this.startTimeOut();
        } ,1000)
    }
    async rechargeConfirm(){//易宝充值确认
        const {
            origin_order_no,
            isLoading
        }=this.state;
        // if(isLoading){//避免重复请求
        //     return
        // }
        const param={
            origin_order_no,
            identifying_code:this.refs.check_code.value
        }
        this.setState({
            isLoading:true
        })
        let obj=await API.post(API.quickRechargeConfirm,param);//充值已经提交成功
        this.setState({
            isLoading:false
        })
        this.props.dispatch(setMsg('充值已经提交成功'));
        setTimeout(()=>{
            window.location.href='/member/index.html'
        },3000)
    }
    setDetailStatus(e,status){
        this.setState({
            showDetail:status||false
        })
    }
    render() {
        const {
            mobile,
            money,
            bank_name,
            bank_no,
            origin_order_no,
            single_limit,
            day_limit,
            month_limit,
            countdown
        }=this.state;

        const bankConfig={
            "中国邮政储蓄银行":{
                bankICon:Css.bank_youchu,
                tel:'95580',
                limitClassName:Css.shanghai
            },
            "上海银行":{
                bankICon:Css.bank_shanghai,
                tel:'95594',
                limitClassName:Css.shanghai
            },
            '浙商银行':{
                bankICon:Css.bank_zheshang,
                tel:'95527',
                limitClassName:Css.shanghai
            },
            '中信银行':{
                bankICon:Css.bank_zhongxing,
                tel:'95558',
                limitClassName:Css.zhongxing
            },
            '中国建设银行':{
                bankICon:Css.bank_jianshe,
                tel:'95533',
                limitClassName:Css.jianshe
            },
            '兴业银行':{
                bankICon:Css.bank_xingye,
                tel:'95561',
                limitClassName:Css.hangzhou
            },
            '中国工商银行':{
                bankICon:Css.bank_gongshang,
                tel:'95588',
                limitClassName:Css.hangzhou
            },
            '杭州银行':{
                bankICon:Css.bank_hangzhou,
                tel:'95398',
                limitClassName:Css.hangzhou
            },
            '招商银行':{
                bankICon:Css.bank_zhaoshang,
                tel:'95555',
                limitClassName:Css.hangzhou
            },
            '中国农业银行':{
                bankICon:Css.bank_nongye,
                tel:'95599',
                limitClassName:Css.nongye
            },
            '北京银行':{
                bankICon:Css.bank_beijing,
                tel:'95526',
                limitClassName:Css.pufa
            },
            '上海浦东发展银行':{
                bankICon:Css.bank_pufa,
                tel:'95528',
                limitClassName:Css.pufa
            },
            '中国银行':{
                bankICon:Css.bank_zhongguo,
                tel:'95566',
                limitClassName:Css.zhongguo
            },
            '交通银行':{
                bankICon:Css.bank_jiaotong,
                tel:'95559',
                limitClassName:Css.jiaotong
            },
            '广东发展银行':{
                bankICon:Css.bank_guangfa,
                tel:'95508',
                limitClassName:Css.guangfa
            },
            "中国民生银行":{
                bankICon:Css.bank_mingsheng,
                tel:'95568',
                limitClassName:Css.guangfa
            },
            '平安银行':{
                bankICon:Css.bank_pingan,
                tel:'95511',
                limitClassName:Css.guangfa
            },
            '中国光大银行':{
                bankICon:Css.bank_guangda,
                tel:'95595',
                limitClassName:Css.guangfa
            },
            '华夏银行':{
                bankICon:Css.bank_huaxia,
                tel:'95577',
                limitClassName:Css.guangfa
            },
            "广州银行":{
                bankICon:Css.bank_guangzhou,
                tel:'400-83-966',
                limitClassName:Css.guangfa
            }
        }


        const bankICon=bankConfig[bank_name].bankICon;
        const bankTail=bank_no.substr(bank_no.length-4,bank_no.length)
        const btnClass=countdown<60?Css.reapal_waitcode:Css.reapal_getcode

        return (<div className={Css.reapal_wrap}>
            <div className={Css.reapal_head}>
                <div className={Css.reapal_head_cover}>
                    <div className={Css.reapal_head_left}>
                        {
                            this.state.channel=='yibao' && <img src="https://images.51rz.com/images/pc/page/rongbao/yblogo.png" />
                        }
                        {
                            this.state.channel=='rongbao' && <h5 className={Css.rongbaoTitle}>融宝支付</h5>
                        }
                    </div>
                </div>
            </div>
            <div className={Css.reapal_cont}>
                <div className={Css.reapal_cont_box1}>
                    <p className={Css.reapal_cont_pay}>
                        <span className={Css.reapal_cont_zf}>支付</span>
                        <span className={Css.reapal_cont_money}>应付金额：<big className={Css.pay_money} >{money}</big>元</span>
                        <span className={Css.reapal_cont_rz}>收款方：<big>浙江人众金融服务股份有限公司</big></span>
                        <a id="btn_xq" href="javascript:;" onClick={(e,status)=>{this.setDetailStatus(e,true)}}>详情
                            <img style={{float: 'right',margin: '45px 0 0 5px'}}
                                 src="https://images.51rz.com/images/pc/page/rongbao/reapal05.png"
                            />
                        </a>
                    </p>
                    <div className={`${Css.reapal_cont_pay_detail} ${this.state.showDetail&&Css.active}`}>
                        <small id="btn_clx" onClick={(e,status)=>{this.setDetailStatus(e,false)}}>x</small>
                        <ul>
                            <li>商品名称：   <span>支付</span></li>
                            <li>交易对象：   <span>浙江人众金融服务股份有限公司</span></li>
                            <li>订  单  号：    <span id="zf_order_no">{origin_order_no||'---'}</span></li>
                            <li>商品价格：    <span className={Css.pay_money}>{money}</span>元</li>
                        </ul>
                    </div>
                </div>
                <div className={`${Css.reapal_cont_box2} ${Css.reapal_cont_all}`}>
                    <div className={Css.reapal_cont_box2_cover}>
                        <h4>认证支付：</h4>
                        <div className={Css.reapal_cont_rzzf}>
                            <div className={Css.reapal_cont_rzzf_left}>
                                <div className={`${Css.reapal_cont_rzzf_bank} ${Css.bank_gongshang}`}>
                                    {/*<img src="https://images.51rz.com/images/pc/page/rongbao/reapal02.png">*/}
                                    <div className={`${Css.rb_bank} ${Css.bank_beijing} ${bankICon}`}></div>
                                    <span>借记卡|尾号<span id="bankcard_last4">{bankTail}</span></span>
                                </div>
                                <div className={Css.xiane}>
                                    <p className={''} style={{display:'block'}}>支付限额（元）：单笔限额{single_limit}万，每日限额{day_limit}万</p>
                                    {/*<p className={`${Css.zheshang} ${Css.shanghai} ${Css.chuyou}`}>支付限额（元）：单笔限额5000，每日限额5000</p>*/}
                                    {/*<p className={Css.zhongxing}>支付限额（元）：单笔限额1万，每日限额1万</p>*/}
                                    {/*<p className={Css.jianshe}>支付限额（元）：单笔限额2万，每日限额2万，每月限额60万</p>*/}
                                    {/*<p className={`${Css.gongshang} ${Css.xingye} ${Css.hangzhou} ${Css.zhaoshang}`}>支付限额（元）：单笔限额5万，每日限额5万</p>*/}
                                    {/*<p className={Css.nongye}>支付限额（元）：单笔限额5万，每日限额20万</p>*/}
                                    {/*<p className={`${Css.beijing} ${Css.pufa}`}>支付限额（元）：单笔限额5万，每日限额30万</p>*/}
                                    {/*<p className={Css.zhongguo}>支付限额（元）：单笔限额5万，每日限额50万</p>*/}
                                    {/*<p className={Css.jiaotong} >支付限额（元）：单笔限额20万，每日限额20万</p>*/}
                                    {/*<p className={`${Css.guangfa} ${Css.mingsheng} ${Css.pingan} ${Css.guangda} ${Css.huaxia} ${Css.guangzhou}`}>支付限额（元）：单笔限额50万，每日限额50万</p>*/}
                                </div>
                            </div>
                            <div className={Css.reapal_cont_rzzf_right}>
                                <p>支付金额：<span className={Css.pay_money}>{money}</span>元</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${Css.reapal_cont_box3} ${Css.reapal_cont_all}`}>
                    <h4>手机号码：</h4>
                    <div>
                        <input className={Css.reapal_cont_input} type="" name="" id="phone"
                               value={mobile} maxLength="11"
                        />
                        <p>请输入与您的银行卡绑定的手机号，以便短信验证码的准确发送</p>
                    </div>
                </div>
                <div className={`${Css.reapal_cont_box4} ${Css.reapal_cont_all}`}>
                    <h4>校  验  码：</h4>
                    <div className={Css.reapal_cont_box4_phonecode}>
                        <input className={Css.reapal_cont_input} type="" name="" ref="check_code" maxLength="6" />
                        <button className={btnClass} type="button" ref='get_code' onClick={(e)=>{this.getSmsCode(e)}} >获取验证码</button>
                        <p className={Css.reapal_getcode_tip}></p>
                    </div>
                    <div className={Css.reapal_cont_box4_sumbit}>
                        <button id="sub" onClick={(e)=>{this.rechargeConfirm(e)}}>确认支付</button>
                    </div>
                </div>
            </div>
            <div className={Css.reapal_cont_foot}>
                <h5>支付遇到问题：</h5>
                <h5>1、为什么要填写个人信息？</h5>
                <p>答：为了保障您的资金安全，需要将您的信息与银行核对，核对成功后，输入手机校验码即可完成付款。</p>
                <h5>2.忘记当前银行卡在银行保存的手机号码怎么办？</h5>
                <p>答：您可拨打银行客服电话：<span className={Css.bank_tel}></span>，查看或修改银行卡预存手机号码。请明确告诉银行客服是修改该银行卡绑定的手机号码。</p>
                <h5>3.无法收到手机短信校验码怎么办？</h5>
                <p>答：请确认您当前使用的手机号码和该银行卡在银行预存的手机号码一致。如果不一致，请拨打银行客服热线：
                    <span className={Css.bank_tel}></span>，修改预存的手机号码。
                </p>
            </div>
            <Msg/>
        </div>)
    }
}

YiBaoConfirm = connect((store) => ({store}))(YiBaoConfirm);
render(<Provider store={store}>
    <YiBaoConfirm />
</Provider>, document.getElementById('app'));
