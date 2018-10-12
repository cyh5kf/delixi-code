import React, {Component} from 'react';
import {render} from 'react-dom';
import "@/assets/css/agreementPersonalService.scss";
import API from "@/api/api.js";
import getParam from '@/util/getParam'

//个人投资与服务协议
class PersonalService extends Component {
    constructor(props){
        super(props);
        this.state={
            userName:'',
            userPlatform:'',
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
            this.setState({
                obj
            })
        }


        // $('#jiafang').html(_json.touzi_info.real_name);
        // $('#jiafang2').html(_json.touzi_info.real_name);
        // $('#pingtai').html(_json.touzi_info.un);
        // $('#daxie').html(_json.touzi_info.tenderaccount);
        // $('#lilv').html(_json.touzi_info.borrow_apr);
        // //alert(_json.touzi_info.days);
        // if(_json.touzi_info.days > 0)
        // {
        //     $('#month').html(_json.touzi_info.borrow_period+'天');
        // }
        // else
        // {
        //     $('#month').html(_json.touzi_info.borrow_period+'个月');
        // }
        // $('#start_Y').html(_json.touzi_info.start_Y);
        // $('#start_M').html(_json.touzi_info.start_M);
        // $('#start_D').html(_json.touzi_info.start_D);
        // $('#end_Y').html(_json.touzi_info.end_Y);
        // $('#end_M').html(_json.touzi_info.end_M);
        // $('#end_D').html(_json.touzi_info.end_D);

    }
    render() {

        const {
            protocolId='',//编号
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
            borrowPeriodName='',//投资期限中文
            BorrowTenderStr='',//起止时间
        }=this.state.obj

        return (
            <div>
                <div className="xysBox">
                    <div className="xysTop">
                        <h1>个人投资与服务协议</h1>
                        <div className="xysJia"><span>甲方：</span><span id="jiafang">{tenderName}</span></div>
                        <div className="xysJia"><span>平台用户名：</span><span id="pingtai">{rzTenderName}</span></div>
                        <div className="xysJia"><span>乙方：浙江人众金融服务股份有限公司</span></div>
                        <div className="xysJia" style={{position:'relative'}}><span>注册地址 ：杭州市西湖区学院路<b>28-38</b>号<b>1</b>幢<b>1</b>号楼<b>2501</b>室</span>
                            <img src="https://images.51rz.com/images/rebuild/pc/img/renzhong.png" style={{position:'absolute', left:'77px', top:'-34px'}}/></div>
                        <div className="xysJia"><span>根据《中华人民共和国合同法》及相关法律法规的规定，双方遵循平等、自愿、互利和诚实信用的原则友好协商，就甲方投资、乙方为甲方提供投资服务达成一致，以兹信守。</span>
                        </div>
                    </div>
                    <div className="xysCen">
                        <h2>第一条 释义 </h2>
                        <p>在本合同中，除非上下文另有解释，下列词语具有以下含义：<br/>
                            <b>1.1</b> 投资人：指自主选择投资一定数量资金给他人的自然人。<br/>
                            <b>1.2</b> 融资人：指有资金需求，经乙方筛选推荐给投资人并得到投资人一定数量资金的企业或自然人。<br/>
                            <b>1.3</b> 提前还款：指在投资人与融资人投融资关系存续期间约定了融资人的本息偿还周期和金额等相关还款计划，
                            融资人可能在协议规定的偿还周期结束前，在某一期将剩余本金提前偿还给投资人，从而使投资人的资金比约定的计划提前收回。<br/>
                            <b>1.4</b> 工作日：指中华人民共和国法律规定的工作日（法定工作日）。
                        </p>
                        <br/>
                        <h2>第二条 甲方的资金投资方式</h2>
                        <p>甲方可以选择以下任意一种方式，实现个人的投资需求：<br/>
                            对乙方推荐的融资人进行选择，决定是否出借；如果决定出借，须通过当面签署、电子签署等方式直接与融资人
                            签署融资协议，甲方有义务按照融资协议的约定及时投资给融资人；<br/>
                            对乙方推荐的企业名下的债权进行受让，将款项支付给债权的转让方，从而完成资金的投资。
                        </p>
                        <h2>第三条 甲方权利与义务</h2>
                        <p>
                            <b>3.1</b> 甲方参考乙方推荐后拥有最终决定是否投资资金给特定融资人的权利；<br/>
                            <b>3.2</b> 甲方享有其所投资款项带来的利息收益；<br/>
                            <b>3.3</b> 甲方同意，如果其所投资对应的融资人有提前还款的需求时，甲方允许融资人依据约定进行提前还款，而无需再特别通知甲方；<br/>
                            <b>3.4</b> 对于乙方基于推荐投资的需要而提供给甲方的融资人的证件及其他相关信用信息，甲方确保仅用于投资参考
                            ，不向任何乙方以外的第三方透露，甲方有义务为融资人的信用信息及乙方的业务内容进行保密。如果甲方擅自
                            、不恰当地向他人透露融资人的信用信息或乙方的商业秘密，由此对融资人或乙方造成的损失，由甲方承担全部
                            责任；<br/>
                            <b>3.5</b> 甲方保证其所用于投资的资金来源合法，甲方是该资金的合法所有人。如果第三人对资金归属、合法性问题发生争议，由甲方负责解决；<br/>
                            <b>3.6</b> 甲方变更账户信息、通讯地址、电话等相关重要信息，须及时通知乙方。因甲方未及时通知乙方而导致自身受到损失，由甲方自行承担责任。
                        </p>
                        <h2>第四条 甲方的隐私保护</h2>
                        <p>
                            乙方须保护甲方所有的隐私权，为甲方提供安全、可靠的服务。乙方仅基于为甲方提供更好的服务之目的，谨慎
                            、适当地使用、处理甲方提供的个人信息。乙方须对甲方个人信息、资产情况及其他服务相关事务的情况和资料
                            依法保密：<br/>
                            <b>1</b>. 关于个人信息<br/>
                            乙方采取适当的措施保护甲方的个人基本信息，如姓名、地址、电子邮件、电话号码等敏感信息，并采取合理的
                            安全手段保护已存储的甲方信息。<br/>
                            <b>2</b>. 提供给第三方<br/>
                            除非根据法律或政府的强制性规定，在未得到甲方的许可之前，乙方不得将甲方的任何个人信息泄露给无关的第
                            三方（包括公司或者个人）。
                        </p>
                        <h2>第五条 乙方的权利和义务</h2>
                        <p>
                            <b>5.1</b> 乙方确保其提供的融资人真实存在，甲方投资后形成的债权债务关系真实存在，否则乙方承担因该债权债务关
                            系不存在而对甲方造成的损失；<br/>
                            <b>5.2</b> 乙方确保向甲方推荐的融资人经过谨慎的信用资质审核；<br/>
                            <b>5.3</b> 乙方有义务协助甲方办理各项信息变更手续， 并及时报告甲方投资资金收益变化情况；<br/>
                            <b>5.4</b> 乙方为甲方提供资金投资相关服务，包括但不限于融资人推荐、 投资促成、回款管理、投资资金贷后管理及必要的催收服务，并据以向甲方收取相关的服务费用；<br/>
                            <b>5.5</b> 在投资人与融资人投融资关系存续期间，融资人发生违约行为时，乙方必须及时采取合法合理的措施进行催收和追讨；<br/>
                            <b>5.6</b> 乙方应妥善保存“ 投资咨询与服务协议”及相关的全部资料以备查阅。
                        </p>
                        <h2>第六条 甲方投资资金的回款管理</h2>
                        <p>根据甲方与特定融资人之间的投融资相关协议的规定， 融资人有义务按约定向甲方还本付息。</p>
                        <h2>第七条 甲方回款风险的处理方式</h2>
                        <p>当融资人发生违约时， 甲方全权委托乙方追讨。</p>
                        <br/>
                        <h2>第八条 资金投资及回款方式</h2>
                        <p>
                            <b>8.1</b> 投资金额： <span id="daxie">{tenderAmountStr}</span>（大写） ；
                            年化收益率为<span id="lilv">{borrowApr}</span>；
                            投资期限为 <span id="month">{borrowPeriodName}</span> ，
                            自{borrowTenderStr}止<br/>
                            {/*自<span id="start_Y">{}</span> 年*/}
                            {/*<span id="start_M">{}</span> 月*/}
                            {/*<span id="start_D">{}</span>日至*/}
                            {/*<span id="end_Y">{}</span> 年*/}
                            {/*<span id="end_M">{}</span>月*/}
                            {/*<span id="end_D">{}</span> 日止。<br/>*/}
                            <b>8.2</b> 甲方可以选择如下方式之一进行投资款项的支付：第三方支付机构<br/>
                            <b>8.3</b> 甲方的意向投资日期仅为甲方的要约，甲方的实际投资日期以乙方针对甲方在本条第一款所提出的相对应投融资协议为准。投融资协议以甲方将投资款项实际支付到融资人账户时生效。
                        </p>
                        <h2>第九条 风险提示</h2>
                        <p>
                            <b>9.1</b> 政策风险<br/>
                            国家因宏观政策、财政政策、货币政策、行业政策、地区发展政策等因素引起的系统风险；<br/>
                            <b>9.2</b> 融资人信用风险<br/>
                            当融资人短期或长期丧失还款能力（包括但不限于融资人收入情况、财产状况发生变化、人身出现意外、发生疾病、死亡的情况）或者融资人的还款意愿发生变化时，甲方的投资资金可能存在风险；<br/>
                            <b>9.3</b> 资金流动性风险<br/>
                            甲方按照约定将资金投资给融资人使用，在融资人不主动提前还款的情况下，融资人将按照约定的期限分期偿还甲方的本金和利息，甲方的投资资金将分期回收，因此资金回收需要一定的周期。<br/>
                            <b>9.4</b> 不可抗力<br/>
                            由于战争、动乱、自然灾害等不可抗力因素的出现而可能导致甲方资产损失的风险。
                        </p>
                        <h2>第十条 税务处理</h2>
                        <p>
                            甲方在资金投资、转让过程中产生的相关税费，由甲方自行向其主管税务机关申报、缴纳，乙方不负责相关事宜处理。
                        </p>
                        <h2>第十一条 违约责任</h2>
                        <p>
                            任何一方违反本协议的规定，使得本协议的全部或部分不能履行，均应承担违约责任，并赔偿对方因此遭受的损失；如多方违约，根据实际情况各自承担相应的责任，违约方应赔偿因其违约而给相对方造成的损失，包括协议履行后可以获得的利益，但不得超过违反协议一方订立协议时可以预见或应当预见的因违反协议可能造成的损失。
                        </p>
                        <h2>第十二条 争议的处理</h2>
                        <p>
                            本协议在履行过程中，如发生任何争执或纠纷，且协商不成的，各方约定向乙方注册地人民法院提起诉讼。
                        </p>
                        <h2>第十三条 其他事项</h2>
                        <p>
                            <b>13.1</b> 如果甲方出现投资资产的继承或赠与，必须由主张权利的继承人或受赠人向乙方出示经国家权威机关认证的
                            继承或赠与权利归属证明文件，经乙方确认后方予协助进行资产转移，由此产生的相关税费，由主张权利的继承人或受赠人，向主管税务机关申报、缴纳，乙方不负责相关事务处理；<br/>
                            <b>13.2</b> 本协议的传真、复印件、扫描件等有效复本的效力与本协议原件效力一致；<br/>
                            <b>13.3</b> 本协议有效期同《租赁租金权益转让及回购协议》 ；<br/>
                            <b>13.4</b> 双方确认，本协议的签署、生效和履行以不违反中国的法律法规为前提。如果本协议中的任何一条或多条违
                            反适用的法律法规，则该条款无效，但不影响本协议其他条款的效力；<br/>
                            <b>13.5</b> 本协议采用电子文本形式制成，各方根据本协议规定完成合同订立后，即具有法律效力。若对协议有争议，以乙方保留的协议文本及网站解释为准；<br/>
                            <b>13.6</b> 本电子协议自自动生成之日起有效。
                        </p>
                    </div>
                    <div className="xysBott" style={{position:'relative', paddingBottom:'200px'}}>
                        <img src="https://images.51rz.com/images/rebuild/pc/img/renzhong.png" style={{position:'absolute', left:'80px', top:'-50px'}}/>
                        <span>甲方：</span><span id="jiafang2">{tenderName}</span>
                        <br/>
                        乙方： 浙江人众金融服务股份有限公司
                    </div>
                </div>
            </div>
        )
    }
}

render(<PersonalService/>, document.getElementById('app'));
