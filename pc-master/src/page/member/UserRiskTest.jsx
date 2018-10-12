import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from 'react-router'
import Css from "../../assets/css/member/UserRiskTest.scss";

import Dialog from '@/components/Dialog'
import Msg from '@/components/Msg'
import {setMsg ,setUserInfo} from "@/store/action.js";

import store from "@/store/store.js";
import API from "@/api/api.js";





class UserRiskTest extends Component {
    constructor(props) {
        super(props);
        this.state ={
            lastResult:false,//上一次的测评结果  false '保守型','稳健型','积极型'
            showDialog:false,//显示提交成功的弹框
            riskScore:this.props.store.userInfo.riskScore||0,
            successDialog:{
                result:'',
                risk_foot:'',
                fx:'',
            },
            questions: [
                {
                    title: '您目前所处的年龄阶段为：',
                    checked:false,
                    radios: [
                        {text:'65岁以上',val:'1',checked:false},
                        {text:'46-65岁', val:'2',checked:false},
                        {text:'30-45岁',val:'3',checked:false},
                        {text:'30岁以下',val:'4',checked:false},
                    ]
                },
                {
                    title:'您可以投资的资金量：',
                    checked:false,
                    radios:[
                        {text:'10万元（含）以下',val:'1',checked:false},
                        {text:'10万至100万（含）',val:'2',checked:false},
                        {text:'100万至500万（含）',val:'3',checked:false},
                        {text:'500万至2000万（含）',val:'4',checked:false},
                        // {text:'2000万以上',val:'5',checked:false},
                    ]
                },
                {
                    title:'您的投资目的是什么：',
                    checked:false,
                    radios:[
                        {text:'超过通货膨胀就好（每年5%左右）',val:'1',checked:false},
                        {text:'获取较稳定收益（每年10%左右）',val:'2',checked:false},
                        {text:'获取较高收益（每年20%左右）',val:'3',checked:false},
                        {text:'博取高收益（每年30% 以上）',val:'4',checked:false},
                    ]
                },
                {
                    title:'过往的投资记录中，您一般的投资期限为：',
                    checked:false,
                    radios:[
                        {text:'1年以内',val:'1',checked:false},
                        {text:'1-3年（包括3年）',val:'2',checked:false},
                        {text:' 3-5年（包括5年）',val:'3',checked:false},
                        {text:'5年以上',val:'4',checked:false},
                    ]
                },
                // {
                //     title:'您投资时，能接受一年内的最大损失是多少：',
                //     checked:false,
                //     radios:[
                //         {text:'跌幅10%以内',val:'1',checked:false},
                //         {text:'跌幅10%~20%间',val:'2',checked:false},
                //         {text:'跌幅20%~30%间',val:'3',checked:false},
                //         {text:'跌幅30%以上',val:'4',checked:false},
                //     ]
                // },
                // {
                //     title:'某组合/基金未来3年里平均收益、最好和最坏的收益情况如下，您会选择哪种：',
                //     checked:false,
                //     radios:[
                //         {text:'平均年收益率为2%，最好情况3%，最坏情况1%',val:'1',checked:false},
                //         {text:'平均年收益率为6%，最好情况13%，最坏情况-2%',val:'2',checked:false},
                //         {text:'平均年收益率为8%，最好情况53%，最坏情况-35%',val:'3',checked:false},
                //         {text:'平均年收益率为10%，最好情况65%，最坏情况-45%',val:'4',checked:false},
                //     ]
                // },
                // {
                //     title:'您家庭的年收入？',
                //     checked:false,
                //     radios:[
                //         {text:'10万元（含）以下',val:'1',checked:false},
                //         {text:'10万至20万（含）',val:'2',checked:false},
                //         {text:'20万至50万（含）',val:'3',checked:false},
                //         {text:'50万以上',val:'4',checked:false},
                //     ]
                // },
                // {
                //     title:'您预计家庭的年收入在未来5年中将：',
                //     checked:false,
                //     radios:[
                //         {text:'有所下降',val:'1',checked:false},
                //         {text:'维持稳定',val:'2',checked:false},
                //         {text:'小幅成长，在10%左右',val:'3',checked:false},
                //         {text:'大幅成长，在20%以上',val:'4',checked:false},
                //     ]
                // },
                {
                    title:'您家庭的月生活消费支出约占月总收入的：',
                    checked:false,
                    radios:[
                        {text:'71%-100%以上',val:'1',checked:false},
                        {text:'51%-70%',val:'2',checked:false},
                        {text:'21%-50%',val:'3',checked:false},
                        {text:'0-20%',val:'4',checked:false},
                    ]
                },
                {
                    title:'您投资时，更倾向于投资哪类产品：',
                    checked:false,
                    radios:[
                        {text:'银行储蓄',val:'1',checked:false},
                        {text:'债券、保险、银行理财产品 ',val:'2',checked:false},
                        {text:'股票、偏股型基金',val:'3',checked:false},
                        {text:'期货、外汇',val:'4',checked:false},
                    ]
                },
            ]
        }
    }
    async componentDidMount() {
        const scoreConfig=['保守型','稳健型','积极型']
        const {
            riskScore
        }=this.state

        if(riskScore>=19){
            this.setState({
                lastResult:scoreConfig[2]
            })
        }else if(riskScore>=13 && riskScore<=18){
            this.setState({
                lastResult:scoreConfig[1]
            })
        }else if(riskScore>=6 && riskScore<=12){
            this.setState({
                lastResult:scoreConfig[0]
            })
        }else{
            this.setState({
                lastResult:''
            })
        }
    }
    selectRadio(e,itemIndex,radioIndex){
        this.state.questions[itemIndex]['radios'].map((radio,index)=>{
            if(index==radioIndex){
                radio.checked=true
                this.state.questions[itemIndex].checked=true
            }else{
                radio.checked=false
            }
        })

        setTimeout(()=>{
            this.setState({
                questions:this.state.questions
            })
        },2)
    }
    async submitAnswer(){
        const {questions}=this.state
        let valied=true
        questions.forEach((item,index)=>{
            valied=valied && item.checked
        })
        if(!valied){
            this.props.dispatch(setMsg('还有未完成的题目，请完成所有题目后再提交问卷'))
        }else{
            let score=0
            questions.forEach((item,index)=>{
                if(item.checked){
                    item.radios.forEach((radio,j)=>{
                        if(radio.checked){
                            score+=radio.val*1
                        }
                    })
                }
            })
            let obj=await API.post(API.userRisk,{score})
            const newUserInfo=Object.assign(this.props.store.userInfo,{riskScore:score})

            this.props.dispatch(setUserInfo(newUserInfo))
            if(score>=6 && score<=12){
                this.setState({
                    showDialog:true,
                    successDialog:{
                        result:'保守型',
                        risk_foot:'评测结果：您的投资目标是追求资本的保值。',
                        fx:'可承受的风险较低。',
                    }

                })
            }else if(score>=13 && score<=18){
                this.setState({
                    showDialog:true,
                    successDialog:{
                        result:'稳健型',
                        risk_foot:'评测结果：您的投资目标是追求资本缓和升值，其次为资本保值。',
                        fx:'可承担中等风险。',
                    }
                })
            }else{
                this.setState({
                    showDialog:true,
                    successDialog:{
                        result:'积极型',
                        risk_foot:'评测结果：您的投资目标是增值财富，您可承受一定风险.',
                        fx:'了解高收益总是与高风险相伴随。',
                    }
                })
            }
        }
    }
    closeDialog(){
        this.setState({
            showDialog:false
        })
    }

    render() {
        const {
            lastResult,
            showDialog,
            successDialog,
            riskScore
        }=this.state
        let lists=this.state.questions.map((item,index)=>{
            const items=item.radios.map((radio,j)=>{
                return  <li key={`radio${index}_${j}`} className={radio.checked && Css.checkedItem}>
                    <label htmlFor={`radio${index}`} onClick={(e,itemIndex,radioIndex)=>{this.selectRadio(e,index,j)}}>
                        <input type="radio" name={`radio${index}`} value={radio.val} checked={radio.checked} />
                        {radio.text}
                    </label>
                </li>
            })

            return (
                <div key={`li${index}`}>
                    <h3><span>{index+1}</span>{item.title}</h3>
                    <ul className={Css.risk_list}>
                        {items}
                    </ul>
                </div>
            )
        })
        return (<div >
            <div className={Css.risk_banner}></div>
            <div className={Css.risk_box}>
                <p className={Css.tip}>
                    本问卷旨在了解您对投资风险的承受意愿及能力。问卷结果可能不能完全呈现您面对投资风险的真正态度，您可与我们的客服进一步沟通。<br />
                    {
                        lastResult && <span>上次测评结果为：<strong id="sum">{lastResult}</strong></span>
                    }
                </p>
                {lists}
            </div>
            <div className={Css.risk_btn}>
                <span onClick={()=>{this.submitAnswer()}}>提交问券</span>
            </div>
            <Dialog show={showDialog}
                    onClose={()=>{this.closeDialog(false)}}
                    style={{width:'440px',height:'310px',padding:'0'}}
            >
                <div className={Css.risk_result_mask}>
                    <div className={Css.risk_result}>
                        <p className={Css.risk_title}>评测结果</p>
                        <p className={Css.risk_content}>您当前的风险承受能力：<span >{successDialog.result}</span></p>
                        <p className={Css.risk_foot}>{successDialog.risk_foot}</p>
                        <p style={{textAlign:'left',paddingLeft:'87px',fontSize:'14px',color:'#999'}}
                           className={Css.fx}
                        >{successDialog.fx}</p>
                        <span className={`${Css.risk_btn} ${Css.linkBtn}`}
                              onClick={()=>{location.href='/projectList.html'}}
                        >立即投资</span>
                    </div>
                </div>
            </Dialog>
            <Msg/>
        </div>);
    }
}

UserRiskTest = connect((store) => ({store}))(UserRiskTest);
export default withRouter(UserRiskTest);