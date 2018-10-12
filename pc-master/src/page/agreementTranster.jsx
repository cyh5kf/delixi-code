import React, {Component} from 'react';
import {render} from 'react-dom';
import "@/assets/css/agreementTransfer.scss";
import API from "@/api/api.js";
import getParam from '@/util/getParam'

//转让协议 分为老标的转让协议和新标得转让协议

//调用接口返回html   新的会直接生成pdf文件  不需要处理
class NewTenderTransferProtocol extends Component {
    constructor(props){
        super(props);
        this.state={
            obj:{
                htmlContent:'',
                signPosList:[],
                name:''
            }
        }
    }
    async componentWillMount(){
        const param={
            tenderId:getParam(window.location.href, 'tenderId'),
            bondId:getParam(window.location.href, 'bondId'),
            productType:getParam(window.location.href, 'productType'),
            protocolId:'111',//协议id  后端说随便穿不为空即可
            // nid:'',//R计划必传字段
            // isBig:'',//R计划必传字段
        }
        let obj=await API.post(API.investProtocol,param)
        this.setState({
            obj:obj
        })
        setTimeout(()=>{//设置页面签章信息
            (obj.signPosList||[]).forEach((signImg,i)=>{
                const {
                    type,
                    sealData
                }=signImg
                const singNameDom = window.document.getElementsByClassName('type'+type+'_name')[0]
                if(singNameDom){
                    const oldStyle=singNameDom.getAttribute('style')||''
                    singNameDom.setAttribute('style',oldStyle+'position:relative;')
                    const img=document.createElement('img')
                    img.setAttribute('src','data:image/png;base64,'+signImg.sealData)
                    img.setAttribute('style','position:absolute;width:1.6rem;top:-0.5rem;left:0.5rem')
                    singNameDom.appendChild(img)
                }
            })

            const signWraper=document.getElementsByClassName('signWraper')[0]//签名的最外层
            const day=document.getElementsByClassName('day')[0]//只有一个日期的外包层
            const day2=document.getElementsByClassName('day2')[0]

            if(signWraper){//清除多余的&nbsp 避免样式影响
                const html=signWraper.innerHTML.replace(/\&nbsp;/g,'')
                const oldStyle=signWraper.getAttribute('style')||''
                signWraper.setAttribute('style',oldStyle+';display:table;width:100%;')
                signWraper.innerHTML=html
            }


            const dayDom=document.getElementsByClassName('day')[0]//只有一个日期的外包层
            const lefts=document.getElementsByClassName('left')||[]//左边的签名
            const rights=document.getElementsByClassName('right')||[]//右边的签名

            for(let i=0;i<lefts.length;i++){
                const dom=lefts[i]
                const trimHtml=dom.innerHTML.replace(/\&nbsp;/g,'')
                const oldStyle=dom.getAttribute('style')||''
                dom.setAttribute('style',oldStyle+';display:block;width:47%;float:left')
                dom.innerHTML=trimHtml
            }
            for(let i=0;i<rights.length;i++){
                const dom=rights[i]
                const trimHtml=dom.innerHTML.replace(/\&nbsp;/g,'')
                const oldStyle=dom.getAttribute('style')||''
                dom.setAttribute('style',oldStyle+';display:block;width:47%;float:right')
                dom.innerHTML=trimHtml
            }
            if(dayDom){
                // dayDom.setAttribute('style','margin:0.45rem 0 0 2.5rem')
            }
        },10)
    }
    render(){
        const {
            htmlContent
        }=this.state.obj

        return (
            <div dangerouslySetInnerHTML={{__html:htmlContent}}></div>
        )
    }
}


//调用接口返回字段
class OldTenderTransferProtocol extends Component {
    constructor(props){
        super(props);
        this.state={
            obj:{

            }
        }
    }

    async componentWillMount(){
        const param={
            // tenderId:getParam(window.location.href, 'tenderId'),
            bondId:getParam(window.location.href, 'bondId'),//
            // protocolId:'111',//协议id  后端说随便穿不为空即可
        }
        let obj=await API.post(API.oldBondProtocol,param)
        if(typeof obj == 'string'){
            obj=JSON.parse(obj)
        }
        this.setState({
            obj
        })
    }
    render() {

        const {
            protocolId='',//协议编号
            transferorUserId='',//转让人用户id
            transferorRealName='',//转让人姓名
            transferorIdCard='',//转让人身份证
            transferorUserName='',//平台用户
            undertakingUserId='',//承接人id
            undertakingRealName='',//承接人用户id
            undertakingIdCard='',//身份证
            undertakingUerName='',//平台用户号
            borrowerName='',//借款人
            amount='',//借款金额
            apr='',//利率
            period='',//原期数
            bondAmount='',//债权总金额
            transferorAmount='',//待收本金+利息
            managementAmount='',//管理费
            transferorDate='',//转让时间
            transferorDateStr='',//转让时间
            borrowId=''
        }=this.state.obj

        return (
            <div>
                <div className={'blBox'}>
                    <div className={"blTit"}>债权转让协议</div>
                    <div className={"infoBox"}>
                        <div className={"blTitC"}>债权转让协议</div>
                        <div className={"blno"}>协议编号：<span id={'htid'}>{protocolId}</span></div><br />
                        <div className={"bljia"}>
                            <div className={"bljial"}>
                                <p>本债权转让及受让协议（下称“本协议”）由以下双方于（日期：<span>{transferorDateStr}</span>）签署</p>
                                <p>甲方（转让人）：<span>{transferorRealName}</span></p>
                                <p>身份证号：<span>{transferorIdCard}</span></p>
                                <p>人众金服用户名：<span>{transferorUserName}</span></p>
                                {/*李敏  3210****722X  rzjrlm*/}
                                <p>乙方（受让人）：<span>{undertakingRealName||''}</span></p>
                                <p>身份证号：<span>{undertakingIdCard}</span></p>
                                <p>人众金服用户名：<span>{undertakingUerName}</span></p>
                                <p style={{position:"relative"}}>
                                    就甲方通过浙江人众金融服务股份有限公司运营管理的www.51rz.com 网站（下称“人众金服网站”）向乙方转让债权事宜，双方经协商一致，达成如下协议：
                                    {/*<img src="/ind/images/renzhong.png" style="position:absolute; left:77px; top:-34px;" />*/}
                                </p>
                            </div>
                            <div className={"bltiaok"}>
                                <p style={{fontWeight:"bold"}}>1. 债权转让</p>
                                <p>1.1 标的债权信息及转让</p>
                                <p>甲方同意将其通过人众金服的居间协助而形成的有关债权（下称“标的债权”）转让给乙方，乙方同意受让该笔债权。标的债权具体信息如下：</p>

                                <br/>
                                <p>标的债权信息：</p>
                                <br />
                                <table style={{width:'100%',border:"0",cellspacing:"1"}}  >
                                    <tbody>
                                        <tr>
                                            <td style={{width:'20%'}} >借款ID</td>
                                            <td style={{width:'70%'}}>{borrowId}</td>
                                        </tr>
                                        <tr>
                                            <td>借款人姓名</td>
                                            <td>{borrowerName}</td>
                                        </tr>
                                        <tr>
                                            <td>借款本金数额（元）</td>
                                            <td>{amount}</td>
                                        </tr>
                                        <tr>
                                            <td>借款年利率（%）</td>
                                            <td>{apr}</td>
                                        </tr>
                                        <tr>
                                            <td>原借款期限</td>
                                            <td>{period}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <br/>
                                <p>标的债权转让信息：</p>
                                <br/>
                                <table style={{width:'100%',border:"0",cellspacing:"1"}}>
                                    <tbody>
                                        <tr>
                                            <td style={{width:'20%'}}>标的债权价值（元）</td>
                                            <td style={{width:'70%'}}>{transferorAmount}</td>
                                        </tr>
                                        <tr>
                                            <td>转让价款（元）</td>
                                            <td>{bondAmount}</td>
                                        </tr>
                                        <tr>
                                            <td>转让管理费（元）</td>
                                            <td>{managementAmount}</td>
                                        </tr>
                                        <tr>
                                            <td>转让日期</td>
                                            <td>{transferorDateStr}</td>
                                        </tr>
                                    </tbody>

                                </table>
                                <br/>
                                <p>1.2 债权转让流程</p>
                                <p>1.2.1 双方同意并确认，双方通过自行或授权有关方根据人众金服网站有关规则和说明，在人众金服网站进行债权转让和受让购买操作等方式确认签署本协议。</p>
                                <p>1.2.2 双方接受本协议且人众金服审核通过时，本协议立即成立,并待转让价款支付完成时生效。协议成立的同时乙方不可撤销地授权人众金服自行或委托第三方支付机构或合作的金融机构，将转让价款在扣除甲方应支付给人众金服的转让管理费之后划转、支付给甲方，上述转让价款划转完成即视为本协议生效且标的债权转让成功；同时甲方不可撤销地授权人众金服将其代为保管的甲方与标的债权借款人签署的电子文本形式的《借款协议》（下称“借款协议”）及借款人相关信息在人众金服网站有关系统板块向乙方进行展示。</p>
                                <p>1.2.3 本协议生效且标的债权转让成功后，双方特此委托人众金服将标的债权的转让事项及有关信息通过站内信等形式通知与标的债权对应的借款人。</p>
                                <p>1.3 自标的债权转让成功之日起，乙方成为标的债权的债权人，承继借款协议项下出借人的权利并承担出借人的义务。</p>

                                <p style={{fontWeight:"bold"}}>2. 保证与承诺</p>
                                <p>2.1 甲方保证其转让的债权系其合法、有效的债权，不存在转让的限制。甲方同意并承诺按有关协议及人众金服网站的相关规则和说明向人众金服支付债权转让管理费。</p>
                                <p>2.2 乙方保证其所用于受让标的债权的资金来源合法，乙方是该资金的合法所有人。如果第三方对资金归属、合法性问题发生争议，乙方应自行负责解决并承担相关责任。</p>
                                <br/>

                                <p style={{fontSize:"14px",lineHeight:"25px",fontWeight:"bold"}}>3. 违约</p>
                                <p>3.1 双方同意，如果一方违反其在本协议中所作的保证、承诺或任何其他义务，致使其他方遭受或发生损害、损失等责任，违约方须向守约方赔偿守约方因此遭受的一切经济损失。</p>
                                <p>3.2 双方均有过错的，应根据双方实际过错程度，分别承担各自的违约责任。</p>
                                <br/>

                                <p style={{fontSize:"14px",lineHeight:"25px",fontWeight:"bold"}}>4. 适用法律和争议解决</p>
                                <p>4.1 本协议的订立、效力、解释、履行、修改和终止以及争议的解决适用中国的法律。</p>
                                <p>4.2 本协议在履行过程中，如发生任何争执或纠纷，双方应友好协商解决；若协商不成，由浙江省杭州市西湖区人民法院管辖。</p>
                                <br/>

                                <p style={{fontSize:"14px",lineHeight:"25px",fontWeight:"bold"}}>5. 其他</p>
                                <p>5.1 双方可以书面协议方式对本协议作出修改和补充。经过双方签署的有关本协议的修改协议和补充协议是本协议组成部分，具有与本协议同等的法律效力。</p>
                                <p>5.2 本协议及其修改或补充均通过人众金服网站以电子文本形式制成，可以有一份或者多份并且每一份具有同等法律效力；同时双方委托人众金服代为保管并永久保存在人众金服为此设立的专用服务器上备查。双方均认可该形式的协议效力。</p>
                                <p>5.3 甲乙双方均确认，本协议的签订、生效和履行以不违反中国的法律法规为前提。如果本协议中的任何一条或多条违反适用的法律法规，则该条将被视为无效，但该无效条款并不影响本协议其他条款的效力。</p>
                                <p>5.4 除本协议上下文另有定义外，本协议项下的用语和定义应具有人众金服网站服务协议及其有关规则中定义的含义。若有冲突，则以本协议为准。</p>
                                <br/><br/>

                                <p style={{lineHeight:"40px",fontSize:"20px"}}>甲方：<font style={{color:'#FF0000'}} ><span>{transferorRealName}</span></font></p>
                                <p style={{lineHeight:"40px",fontSize:"20px"}}>乙方：<font style={{color:'#FF0000'}}><span>{undertakingRealName}</span></font></p>
                                {/*<p style={{lineHeight:"40px", fontSize:"20px",position:"relative"}}>*/}
                                {/*丙方：浙江人众金融服务股份有限公司<img src="/ind/images/renzhong.png" style={{position:"absolute", left:"77px",top:"-140px"}} /></p>*/}
                                <p>&nbsp;</p>
                                <p>&nbsp;</p>
                                <p></p>
                                <p></p>
                                <p></p>
                            </div>
                           {/*<div style="width: 147px; height: 147px; position: relative; float: right; top: -100px; right: 80px;">*/}
                                {/*<img src="http://www.51rz.com:8443/ind/images/wd_gz.png" width="150" height="150"/>*/}
                          {/*</div>*/}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


class TransferProtocol extends Component {
    constructor(props){
        super(props)
        this.state={
            isOldTender:getParam(window.location.href, 'nid')==-1?true:false,//区分新标还是老标
        }
    }
    render(){
        const {
            isOldTender
        }=this.state

        return (
            <div>
                {isOldTender?<OldTenderTransferProtocol />:<NewTenderTransferProtocol/>}
            </div>
        )
    }
}

render(<TransferProtocol/>, document.getElementById('app'));
