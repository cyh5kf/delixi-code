import React, {Component} from 'react';
import {render} from 'react-dom';
import API from "@/api/api.js";
import getParam from '@/util/getParam';
import "@/assets/css/agreementBorrow.scss";

//应收账款转让及回购合同
class Account extends Component {
    constructor(props){
        super(props);
        this.state={
            obj:{

            }
        }
    }
    async componentWillMount(){
        const from=getParam(window.location.href, 'from')
        if(from!='projectDetail'){
            const param={
                tenderId:getParam(window.location.href, 'tenderId')
            }
            let obj=await API.post(API.oldProtocol,param)
            if(typeof obj == 'string'){
                obj=JSON.parse(obj)
            }
            console.log(obj)
            this.setState({
                obj
            })
        }

        // var cjrname = _json.touzi_info.cjrname;
        // cjrname = cjrname ? cjrname : '上海卓投商业保理有限公司';
        // var buslicence = _json.touzi_info.buslicence;
        // buslicence = buslicence ? buslicence : '310141400030291';
        // if(cjrname.indexOf('卓投') == -1){
        //     $('.seal').attr('src','https://images.51rz.com/images/pc/seal/seal_'+_json.touzi_info.cjruid+'.png');
        // }
        // $('.cjrname').html(cjrname);
        // $('#buslicence').html(buslicence);
        // $('#jiafang').html(_json.touzi_info.real_name);
        // $('#pingtai').html(_json.touzi_info.un);
        // $('#pingtai1').html(_json.touzi_info.un);
        // $('#thhtbh').html(_json.touzi_info.thhtbh);
        // $('#daxie').html(_json.touzi_info.tenderaccount);
        // $('#daxie1').html(_json.touzi_info.tenderaccount);
        // $('#lilv').html(_json.touzi_info.borrow_apr);
        // $('#month').html(_json.touzi_info.borrow_period);
        // $('#htid').html(_json.touzi_info.htid);
        // $('#start_Y').html(_json.touzi_info.start_Y);
        // $('#start_M').html(_json.touzi_info.start_M);
        // $('#start_D').html(_json.touzi_info.start_D);
        // $('#end_Y').html(_json.touzi_info.end_Y);
        // $('#end_M').html(_json.touzi_info.end_M);
        // $('#end_D').html(_json.touzi_info.end_D);
    }
    render() {
        const {protocolId='',//编号
            tenderName='',//甲方（出借人）
            tenderIdCard='',//甲方身份证号
            rzPhone='',//居间人联系电话
            borrowName='',//乙方（借款人）：
            borrowIdCard='',//乙方身份证号
            otherPhone='',//担保人联系电话
            borrowMoney='',//借款金额
            borrowMoneyStr='',//借款金额大写
            borrowApr='',//借款利率
            repayDay='',//自然日
            repayMoney='',//最低偿还额
            contractId='',//杭州早稻科技有限公司提供的最高额保证合同编号
            year='',//日期：【year】年【month】月【day】日
            month='',
            day='',
            rzTenderName='',//平台用户名
            tenderAmount='',//投资金额
            tenderAmountStr='',//投资金额大写
            borrowPeriod='',//投资期限
            timeLimit='',//期限
            borrowTenderStr='',//投资时间描述
            borrowProductName='',//借款项目集名称
            borrowStyleStr='',//还本方式
            accountName='',//账户名称
            bankName='',//开户行
            bankId='',//银行账号
            lastRepayDay='',//最终还款日
            borrowPhone='',//借款人手机号
            borrowAddress='',//借款人地址
            borrowEmail='',//借款人邮箱
            khName='',//收款开户名
            style='',//还款方式
            userId='',//投资用户ID
            borrowId='',//小标ID     产品/项目编号?
            tenderId='',//投资记录ID
            borrowUserId='',//借款人Id
            tenderEsign='',//投资人签名base64
            borrowEsign='',//借款人签名base64
            rzEsign='',//人众金服签名base64
            middleEsign='',//居间人签名base64
            otherCompany='',//第三方担保公司名称
            productId='',//产品类型
            tenderDay='',//投资天数
            userName='',//用户名（平台账号）
            borrowNo='',//标的编号
            conNumber='',//第三方合同编号
            borrowerType=0,//0 用户  1 企业
            BorrowTenderStr,//
            zzjgCode='',//组织机构代码
        }=this.state.obj;

        const isZhongJinBao=borrowProductName.search('众金宝')>=0
        const isZhongHuiBao=borrowProductName.search('众惠宝')>=0

        return (
            <div>
                <div style={{width:'1180px',overflow:'hidden', margin:'20px auto', background:'#fff'}}>
                    <div style={{ height:'40px', background:'#e4443a', fontSize:'16px', color:'#fff', lineHeight:'40px', textIndent:'20px'}}>应收账款转让及回购合同</div>
                    <div style={{border:'1px solid #ccc',padding:'10px', background:'#fff',borderTop:'0px'}}>
                        <div style={{height:'50px', lineHeight:'50px', textAlign:'center', fontSize:'20px', borderBottom: '#cccccc 1px dashed'}}>应收账款转让及回购合同</div>
                        <div style={{height:'50px', lineHeight:'50px', textAlign:'right', fontSize:'18px',}}>合同编号：<span id="htid">{protocolId}</span></div><br/>
                        <div style={{overflow:'hidden', marginBottom:'10px'}}>
                            <div style={{paddingLeft:'20px'}}>
                                <p style={{fontSize:'14px', lineHeight:'35px', fontSize:'16px'}}>
                                    应收账款转让人（甲方）：
                                    {isZhongJinBao && <span className="cjrname">上海卓投商业保理有限公司</span>}
                                    {isZhongHuiBao && <span className="cjrname">如裕国际商业保理（深圳）有限公司</span>}
                                </p>
                                <p style={{fontSize:'14px', lineHeight:'35px', fontSize:'16px', position:'relative'}}>
                                    营业执照号：
                                    {isZhongJinBao && <span id="buslicence">310141400030291</span>}
                                    {isZhongJinBao && <img className="seal" src="https://images.51rz.com/images/rebuild/pc/img/zuotou.png"
                                                           style={{position:'absolute', left:'77px', top:'-34px',width: '100px'}}/>}
                                    {isZhongHuiBao && <span id="buslicence">440301117770154</span>}
                                    {isZhongHuiBao && <img className="seal" src="https://images.51rz.com/images/rebuild/pc/img/ruyu.png"
                                                           style={{position:'absolute', left:'77px', top:'-34px',width: '100px'}}/>}
                                </p>
                                <p style={{fontSize:'14px', lineHeight:'35px', fontSize:'16px'}}>应收账款受让人（乙方）：
                                    {/*<span id="jiafang">李敏</span>*/}
                                    <span id="jiafang">{tenderName}</span>
                                </p>
                                <p style={{fontSize:'14px', lineHeight:'35px', fontSize:'16px'}}>人众金服平台账号：
                                    {/*<span id="pingtai">rzjrlm</span>*/}
                                    <span id="pingtai">{rzTenderName}</span>
                                </p>
                                <br/>
                            </div>
                            <div style={{paddingLeft:'20px'}}>
                                <p style={{fontSize:'14px', lineHeight:'25px'}}>鉴于：</p>
                                <p style={{fontSize:'14px', lineHeight:'25px'}}>原债权人与原债务人签署的《基础交易合同》并已建立应收账款的交易关系（以下简称基础交易关系）。</p>
                                <p style={{fontSize:'14px', lineHeight:'25px'}}>原债权人与甲方签署的编号为<font color="#FF0000"><span id="thhtbh">{conNumber}</span></font>的《国内保理业务合同》，甲方为原债权人提供国内保理服务。</p>
                                <p style={{fontSize:'14px', lineHeight:'25px'}}>现经甲乙双方协商一致，甲方将上述原债权人的应收账款转让给乙方，为保证本业务的顺利进行，双方约定如下：</p>

                                <p style={{fontSize:'14px', lineHeight:'25px',fontWeight:'bold'}}>第一条 业务简介</p>
                                <p style={{fontSize:'14px', lineHeight:'25px'}}>本合同业务为应收账款转让及应收账款委托管理业务，即乙方在本合同有效期及延续期间受让原债权人的应收账款，并委托甲方代为管理和催收应收账款，本合同约定回购条件成就后由甲方向乙方回购本合同转让的应收账款。</p>
                                <br/>

                                <p style={{fontSize:'14px', lineHeight:'25px',fontWeight:'bold'}}>第二条 应收账款转让标的</p>
                                <p style={{fontSize:'14px', lineHeight:'25px'}}>原债权人通过甲方向乙方转让的标的为甲方与原债权人签订的上述《国内保理业务合同》中提供保理服务的应收账款，即原债权人应当向原债务人收取的价款。 </p>
                                <br/>

                                <p style={{fontSize:'14px', lineHeight:'25px',fontWeight:'bold'}}>第三条 应收账款到期日</p>
                                <p style={{fontSize:'14px', lineHeight:'25px'}}>应收账款期限为：自本合同签署之日起，到期截止日为
                                    {lastRepayDay}
                                    {/*<font color="#FF0000"><span id="end_Y">{}</span> </font>年*/}
                                    {/*<font color="#FF0000"><span id="end_M">{}</span></font>月*/}
                                    {/*<font color="#FF0000"><span id="end_D">{}</span></font>日。*/}
                                </p>
                                <br/>

                                <p style={{fontSize:'14px', lineHeight:'25px',fontWeight:'bold'}}>第四条 应收账款转让金额</p>
                                <p style={{fontSize:'14px', lineHeight:'25px'}}>1.乙方受让的应收账款金额为人民币<font color="#FF0000"><span id="daxie1" >{tenderAmount}</span></font>。乙方向甲方支付的转让金额为人民币大写<font color="#FF0000"><span id="daxie" >{tenderAmountStr}</span></font>（即投资金额）（年化收益率为<font color="#FF0000"><span id="lilv">{borrowApr}</span></font>%；投资期限同应收账款期限）。</p>
                                <p style={{fontSize:'14px', lineHeight:'25px'}}>2.乙方将转让款支付入人众金服平台与乙方约定的<input type="radio"/>第三方支付机构<input type="radio"/>托管银行<input type="radio"/>其他后，甲乙双方同意委托人众金服平台将上述投资金额支付至原债权人银行账号。</p>
                                <br/>

                                <p style={{fontSize:'14px', lineHeight:'25px',fontWeight:'bold'}}>第五条 应收账款权益转让期间的收取</p>
                                <p style={{fontSize:'14px', lineHeight:'25px'}}>乙方委托甲方作为其代理人，代表乙方从原债务人处收取应收账款。</p>
                                <br/>

                                <p style={{fontSize:'14px', lineHeight:'25px',fontWeight:'bold'}}>第六条 应收账款回购 </p>
                                <p style={{fontSize:'14px', lineHeight:'25px'}}>1.甲方担保转让给乙方的债权能够按时足额收取；若原债务人未能按期支付，甲方自迟延之日起5个工作日内先行垫付，再以从原债务人处收取的应收账款冲抵甲方垫付资金。如甲方超过30个工作日仍未垫付，则无条件回购乙方从甲方处受让的债权权益。</p>
                                <p style={{fontSize:'14px', lineHeight:'25px'}}>2.甲方回购该应收账款的回购金额=应收账款转让价款+回购溢价款。应收账款转让期间=应收账款回购日-应收账款转让日。</p>
                                <p style={{fontSize:'14px', lineHeight:'25px'}}>3.甲方依据人众金服平台发出的付款通知，将回购资金支付到指定账户即完成回购义务。</p>
                                <br/>

                                <p style={{fontSize:'14px', lineHeight:'25px',fontWeight:'bold'}}>第七条 逾期利息 </p>
                                <p style={{fontSize:'14px', lineHeight:'25px'}}>1.甲方无法足额向乙方按本合同约定溢价回购应收账款的，应当承担逾期利息，逾期利息的支付方式如下： </p>
                                <p style={{fontSize:'14px', lineHeight:'25px'}}>逾期利息=拖欠款项×逾期天数×逾期利率。</p>
                                <p style={{fontSize:'14px', lineHeight:'25px'}}>拖欠款项是指截止应回购日，应收账款转让款中甲方应当回购而未回购的部分。 </p>
                                <p style={{fontSize:'14px', lineHeight:'25px'}}>逾期天数是指从应回购日（不含当日）起至拖欠款项（包括本金及溢价收益）及逾期利息等清偿完毕之日止（含到账日）的自然日天数。 </p>
                                <p style={{fontSize:'14px', lineHeight:'25px'}}>逾期利率：逾期利率为每日 0.05%。</p>
                                <p style={{fontSize:'14px', lineHeight:'25px'}}>2.逾期期间甲方除罚息外，还应当支付本协议约定的溢价收益，溢价收益按日计算。</p>
                                <br/>

                                <p style={{fontSize:'14px', lineHeight:'25px',fontWeight:'bold'}}>第八条 应收账款瑕疵担保</p>
                                <p style={{fontSize:'14px', lineHeight:'25px'}}>甲方保证每一笔应收账款均符合以下全部条件： </p>
                                <p style={{fontSize:'14px', lineHeight:'25px'}}>1. 基础合同真实、合法且有效，没有禁止或限制该合同项下的应收账款转让，基础合同中不存在任何不利于乙方行使应收账款项下权利的条款，原债权人已经或将会适当地履行其在基础合同项下的义务； </p>
                                <p style={{fontSize:'14px', lineHeight:'25px'}}>2. 保理合同真实、合法且有效，保理合同没有禁止或限制该合同项下应收账款的再次转让，保理合同中不存其他任何不利于乙方行使应收账款项下权利的条款；</p>
                                <p style={{fontSize:'14px', lineHeight:'25px'}}>3. 甲方已履行了保理合同项下的保理服务义务和其他已到期的义务；</p>
                                <p style={{fontSize:'14px', lineHeight:'25px'}}>4. 每一笔应收账款均不存在任何质押或任何其他担保，也不存在任何权属争议；就已在本合同项下转让给乙方的每一笔应收账款（甲方已回购的应收账除外）而言，甲方不会将其另行转让给任何其他第三人。</p>
                                <br/>

                                <p style={{fontSize:'14px', lineHeight:'25px',fontWeight:'bold'}}>第九条 应收账款代位追偿权 </p>
                                <p style={{fontSize:'14px', lineHeight:'25px'}}>如出现以下情形，乙方可通过人众金服平台向原债权人和原债务人代位行使追偿权，无需征得甲方同意：</p>
                                <p style={{fontSize:'14px', lineHeight:'25px'}}>1. 本合同约定回购期到期后，甲方未能向乙方溢价回购应收账款。</p>
                                <p style={{fontSize:'14px', lineHeight:'25px'}}>2. 甲方被人民法院宣布破产。</p>
                                <p style={{fontSize:'14px', lineHeight:'25px'}}>3. 原债权人应收账款到期后，甲方怠于行使债权而影响到乙方的合法权利。</p>
                                <br/>

                                <p style={{fontSize:'14px', lineHeight:'25px',fontWeight:'bold'}}>第十条 再转让通知 </p>
                                <p style={{fontSize:'14px', lineHeight:'25px'}}>本合同签署后，由甲方通知原债务人应收账款转让事宜。</p>
                                <br/>

                                <p style={{fontSize:'14px', lineHeight:'25px',fontWeight:'bold'}}>第十一条 回购约定</p>
                                <p style={{fontSize:'14px', lineHeight:'25px'}}>甲方完成应收账款回购的同时乙方对原债务人的应收账款债权自动转回至甲方。</p>
                                <br/>

                                <p style={{fontSize:'14px', lineHeight:'25px',fontWeight:'bold'}}>第十二条 合同的生效、终止和变更</p>
                                <p style={{fontSize:'14px', lineHeight:'25px'}}>1.本合同经甲、乙双方签字、盖章后成立并生效；至本合同项下乙方受让的应收账款、回购溢价费用、逾期利息等清偿完毕之日终止。</p>
                                <p style={{fontSize:'14px', lineHeight:'25px'}}>2.本合同的有效性不因个别条款无效而受影响。</p>
                                <p style={{fontSize:'14px', lineHeight:'25px'}}>3.除本合同另有规定外，任何一方未经另一方书面同意，无权单方面更改合同的任何条款；一方要求对本合同条款进行任何修改，应书面通知另一方，在取得另一方的书面同意后方可进行。</p>
                                <p style={{fontSize:'14px', lineHeight:'25px'}}>4.有关本合同的所有通知、变更等均应采取书面形式。</p>
                                <br/>

                                <p style={{fontSize:'14px', lineHeight:'25px',fontWeight:'bold'}}>第十三条 风险提示</p>
                                <p style={{fontSize:'14px', lineHeight:'25px'}}>1.政策风险</p>
                                <p style={{fontSize:'14px', lineHeight:'25px'}}>因国家宏观政策、财政政策、货币政策、行业政策、地区发展、法律法规等因素引起的政策风险。</p>
                                <p style={{fontSize:'14px', lineHeight:'25px'}}>2.信用风险</p>
                                <p style={{fontSize:'14px', lineHeight:'25px'}}>如转让人发生资金状况或经营状况的风险，或者转让人的回购意愿发生消极的变化时，乙方可能无法按时获得应收账款项下款项。需经过司法程序对甲方、原债权人及原债务人财产进行清偿后才能收回借款。</p>
                                <p style={{fontSize:'14px', lineHeight:'25px'}}>3.不可抗力</p>
                                <p style={{fontSize:'14px', lineHeight:'25px'}}>由于战争、动乱、自然灾害等不可抗力因素的出现而可能导致乙方无法按时 得应收账款项下款项的风险。</p>
                                <br/>

                                <p style={{fontSize:'14px', lineHeight:'25px',fontWeight:'bold'}}>第十四条 税务处理</p>
                                <p style={{fontSize:'14px', lineHeight:'25px'}}>乙方在转让过程产生的相关税费，由乙方自行向税务机关申报、缴纳，甲方不负责相关事宜处理。</p>
                                <br/>

                                <p style={{fontSize:'14px', lineHeight:'25px',fontWeight:'bold'}}>第十五条 保密条款</p>
                                <p style={{fontSize:'14px', lineHeight:'25px'}}>未经双方同意，任何一方不得将本合同内容泄露给第三方（法律、行政法规、司法解释另有规定的情形除外）。</p>
                                <br/>

                                <p style={{fontSize:'14px', lineHeight:'25px',fontWeight:'bold'}}>第十六条 期日定义</p>
                                <p style={{fontSize:'14px', lineHeight:'25px'}}>本合同中所有涉及的发生日、到期日以及期限日均为自然日。</p>
                                <br/>

                                <p style={{fontSize:'14px', lineHeight:'25px',fontWeight:'bold'}}>第十七条 争议解决</p>
                                <p style={{fontSize:'14px', lineHeight:'25px'}}>与本合同相关的任何争议双方均可向本合同签订地杭州市西湖区人民法院提起诉讼。</p>
                                <br/>

                                <p style={{fontSize:'14px', lineHeight:'25px',fontWeight:'bold'}}>第十八条 适用法律、法规</p>
                                <p style={{fontSize:'14px', lineHeight:'25px'}}>本合同适用的是中国的法律、法规和司法解释，以及服务区域的地方法规、地方规章，包括甲方所在地的人民法院对保理业务所做的指导意见、批复。上述 法律、法规、文件没有规定的，适用行业惯例。</p>
                                <br/>
                                <p style={{fontSize:'14px', lineHeight:'25px',fontWeight:'bold'}}>第十九条 补充约定</p>
                                <p style={{fontSize:'14px', lineHeight:'25px'}}>乙方可将本协议约定的债权转让给第三人，具体转让程序依据人众金服平台规定。</p>
                                <p style={{fontSize:'14px', lineHeight:'25px'}}>本协议一式两份，签章生效（含电子签章）。</p>
                                <br/><br/>
                                <p style={{fontSize:'20px', lineHeight:'40px',position:'relative'}}>甲方：
                                    <font color="#FF0000">
                                        <span className="cjrname">
                                        {(isZhongJinBao&&'上海卓投商业保理有限公司')|| (isZhongHuiBao&& '如裕国际商业保理（深圳）有限公司')}
                                        </span>
                                    </font>
                                    {
                                        isZhongJinBao && <img className="seal" src={"https://images.51rz.com/images/rebuild/pc/img/zuotou.png"} style={{position:'absolute', left:'77px', top:'-34px',width: '100px'}}/>
                                    }
                                    {
                                        isZhongHuiBao && <img className="seal" src={'https://images.51rz.com/images/rebuild/pc/img/ruyu.png'} style={{position:'absolute', left:'77px', top:'-34px',width: '100px'}}/>
                                    }

                                </p>
                                <p style={{fontSize:'20px', lineHeight:'40px'}}>乙方：
                                    <font color="#FF0000">
                                        <span id="pingtai1">{tenderName}</span>
                                    </font>
                                </p>
                                <p style={{fontSize:'14px', lineHeight:'25px'}}></p>
                                <p style={{fontSize:'14px', lineHeight:'25px'}}></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

render(<Account/>, document.getElementById('app'));
