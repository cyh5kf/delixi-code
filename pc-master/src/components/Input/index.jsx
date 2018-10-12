import React, {Component} from "react";
import {withRouter} from 'react-router'
import Css from "./index.scss";
/**
 * 父组件中会自动传入子组件的执行环境this  可以在父组件中调用env.setState来改变子组件的状态
 * @props :
 *  =>required
 *  * onChange    Function    (env,e,arg1,arg2)=>{this.onRechargeChange(env,e,val,valied)}
 *
 *  =>not required
 *  type          String      文本框类型
 *  inputStyle     Object      文本框样式
 * isSms          Boolean     是否是获取短信码
 * getSms         Function    发送验证码
 * placeholder    String
 * val            String      初始化value
 * label          String      左侧label文本
 * labelStyle     Object      左侧label文本样式
 * tip            String      错误信息之外的提示信息  黄色的提示文字
 * validate       Object      输入框有校验规则
 * validate     ：{
                   required:'输入金额不能为空',
                   reg:/^\d+(\.\d{1,2})?$/,
                   regMsg:'请输入正确的金额',
                }

 * style         Object       整个组件样式
 * **/

class InputComp extends Component{
    constructor(props){
        super(props);
        this.state={
            hasGetCount:0,//短信码已经获取的次数
            is60Over:true,//60秒倒计时已经结束
            seconds:this.props.seconds,
            errMsg:''
        };
    }
    onChange(e,value){
        const {onChange=()=>{},validate=null}=this.props

        const val=this.refs.nativeInput.value||'';
        let valied=true;
        this.setState({
            errMsg:'',//错误提示  红色文字
            tipMsg:'',//一般提示  黄色文字
        })

        if(validate){//有检验规则

            const {required='',reg='',regMsg=''}=validate||{};
            if(reg){//有校验正则
                if(!reg.test(val)){
                    // console.log(regMsg)
                    valied=false;
                    this.setState({
                        errMsg:regMsg
                    })
                }
            }

            if(required){//非空校验
                if(!val){
                    valied=false;
                    this.setState({
                        errMsg:required
                    })
                }
            }
        }
        let self=this;
        onChange(val,valied,self);
    }
    nativeSms(e){
        const {getSms=()=>{}}=this.props;
        if(this.state.seconds==60){
            getSms(()=>{

                this.startInterval();//开始倒计时
            });
        }
    }
    startInterval(){
        if(this.state.seconds>1){
            this.setState({
                seconds:this.state.seconds-1
            })
            setTimeout(()=>{
                this.startInterval();
            },1000)
        }else{
            this.setState({
                seconds:60,
                hasGetCount:this.state.hasGetCount+1
            })
        }
    }
    componentDidMount(){
        const {
            getInputCompEnv=()=>{}
        }=this.props
        getInputCompEnv(this);
    }
    render(){
        const {errMsg,
            tipMsg,
            seconds,
            hasGetCount
        } = this.state

        const {
            type = 'text',
            placeholder='',
            val='',
            label='',
            tip=tipMsg,
            isSms,
            labelStyle={},
            inputStyle={},
            style={},
            onChange=()=>{},
            maxLength=20
        }=this.props

        let label_Style={
            width:label?'90px':0
        }
        label_Style=Object.assign(label_Style,labelStyle)
        let errorStyle={
            paddingLeft:label?labelStyle.width||'90px':0
        }
        let span_style={
            height:inputStyle.height||'46px',
            lineHeight:inputStyle.height||'46px',
        }

        const errorClass=errMsg?Css.error:'';
        const smsCodeTxt=seconds==60?(hasGetCount==0?'点击获取':'重新获取'):`${seconds}s`

        const isSmsDsabled=seconds<60?Css.disabled:'';

        return (
            <div className={Css.inputRow} style={style}>
                <div className ={Css.inputWrap}>
                    {label && <label style={label_Style}>{label}</label>}
                    <input autoComplete="new-password"
                           ref="nativeInput"
                        value={val}
                           type={type}
                           placeholder={placeholder}
                           onChange={(e)=>{this.onChange(e)}}
                           onBlur={this.props.onBlur ? this.props.onBlur : ()=>{}}
                           className={errorClass}
                           style={inputStyle}
                           // required
                           maxLength={maxLength}
                    />
                    {isSms && <span style={span_style} className={`${Css.smsCode} ${isSmsDsabled}`} onClick={(e)=>{this.nativeSms(e)}}>{smsCodeTxt}</span>}
                    {this.props.children}
                </div>
                <p className={errMsg?Css.errorMsg:Css.tipMsg} style={errorStyle}>
                    {errMsg||tip}
                </p>
            </div>
        )
    }
}

// InputComp = connect((store) => ({store}))(InputComp);
export default InputComp;
