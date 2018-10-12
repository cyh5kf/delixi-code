<!--八宝详情-->
<template>
    <div class="detail">
        <ul>
            <li>
                <h3><span class="icon icon_cpms"></span>产品描述</h3>
            </li>
            <li>
                <h4>产品介绍</h4>
                <p v-html="page.productDesc"></p>
            </li>
            <li v-if="page.productOperationMode">
                <h4>产品运作方式</h4>
                <p v-html="page.productOperationMode"></p>
                <!--<p>-->
                <!--核心企业的上下游企业依据真实贸易产生的资金需求委托浙江人众金融服务股份有限公司提供信息中介服务，人众金服平台将其借款信息推荐给合格投资人，投资人自主自愿参与资金出借，投资到期后借款企业按照约定的年化收益率和还款方式向投资者进行本息还款。-->
                <!--</p>-->
            </li>
            <li>
                <h4>产品交易结构</h4>
                <div class="business_mode">
                    <img :src="page.productStruct" alt="">
                </div>
            </li>
            <li>
                <h4>风险提示</h4>
                <router-link to="/tender/dangerTipReport">风险报告提示书</router-link>
                <p v-html="page.dangetTip"></p>
            </li>
        </ul>
        <ul class="risk_control">
            <li>
                <h3><span class="icon icon_fxbz"></span>风控信息</h3>
                <div class="risk_navs">
                    <div class="item">
                        <span class="icon_sub_zlsh"></span>
                        <label>资料审核</label>
                    </div>
                    <div class="item">
                        <span class="icon_sub_sddc"></span>
                        <label>实地调查</label>
                    </div>
                    <div class="item">
                        <span class="icon_sub_zcpg"></span>
                        <label>资产评估</label>
                    </div>
                    <div class="item">
                        <span class="icon_sub_fbjk"></span>
                        <label>发布借款</label>
                    </div>
                </div>
            </li>
            <li>
                <h3 class="black5">资产安全</h3>
                <p v-for="(item, i) in page.financeSafe" :key="i">
                    <span v-html="item+'<br/>'"></span>
                </p>
            </li>
            <li style="margin:0.25rem 0">
                <h3 style="color:#222">风控措施</h3>
            </li>
            <div>
                <li v-for="(item , i) in page.riskControlMeasures" class="has_icon"
                    :class="['db','hwl','huigou','zjl','fxzbj','falv'][i]" :key="i">
                    <h4 v-html="item.title"></h4>
                    <p v-html="item.desc"></p>
                </li>
            </div>
        </ul>
        <ul class="borrow_info">
            <li>
                <h3><span class="icon icon_jkzl"></span>借款信息</h3>
                <h4>借款企业工商信息</h4>
                <table>
                    <tbody>
                    <tr>
                        <td>全称或简称</td>
                        <td>浙江****有限公司</td>
                    </tr>
                    <tr>
                        <td>注册资本</td>
                        <td>10000万</td>
                    </tr>
                    <tr>
                        <td>注册地址</td>
                        <td>浙江****</td>
                    </tr>
                    <tr>
                        <td>成立时间</td>
                        <td>2015年5月5日</td>
                    </tr>
                    <tr>
                        <td>法定代表人</td>
                        <td>用于补充经营性现金流</td>
                    </tr>
                    </tbody>
                </table>
                <p class="desc">
                    合同附件：债务人、核心企业营业执照、担保函件、购销合同、国内保理业务合同等。
                </p>
                <ul class="htfj">
                    <li v-for="(item, i) in fujian" :key="i">
                        <div></div>
                        <p v-text="item.name"></p>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>
<script>
    const dangetTip = '产品存在一定的风险，包括但不限于市场风险、管理风险、流动性风险、信用风险、操作风险，不可抗力风险等，投资人应根据平台提供的信息进行独立判断，具备独立风险承担能力。';
    const financeSafe_R = [
        '第一还款来源：融资方自有资金还款',
        '第二还款来源：第三方担保提供无限连带责任担保'
    ]
    const financeSafe_normal = [
        '第一还款来源：融资方自有资金还款',
        '第二还款来源：核心企业/融资方法人提供无限连带担保责任'
    ]
    const financeSafe_zhong_yuan_bao = [
        '第一还款来源：借款人自有资金还款。',
        '第二还款来源：担保方履约垫付。'
    ]
    const riskControlMeasures_normal = [
        {
            title: '借款人审核标准严谨',
            desc: '严格的信用资质审查、信息流监控，确保借款客户真实有效；'
        },
        // {
        //     title: '资金安全',
        //     desc: '监管资金进出；交易过程中，存管银行将用户资金与平台自有资金隔离，专款专用。'
        // },
        {
            title: '强大法律保障',
            desc: '由综合性律师事务所普龙律师事务所进行法律审查，确保交易流程合法合规。'
        },
    ]
    const riskControlMeasures_ping_ka = [
        {
            title: '借款人审核标准严谨',
            desc: `1. 严格的信用资质审查、信息流监控，确保借款客户真实有效；<br/>2. 已登记IMEI 号码， iCloud 可远程定位及锁机。`
        },
        {
            title: '担保增信',
            desc: '第三方担保公司提供无限连带责任担保。'
        },
        {
            title: '小额分散投资策略',
            desc: '每笔资金智能打散借出，分散投资、分散风险。'
        },
        // {
        //     title: '资金安全',
        //     desc: '监管资金进出；交易过程中，存管银行将用户资金与平台自有资金隔离，专款专用。'
        // }
    ]
    export default {
        name: 'Detail',
        data(){
            return {
                fujian: [
                    {name: '1111'},
                    {name: '1111111'}
                ],
                r_plan: {//R计划
                    productDesc: `R计划是人众金服推出的一款专注于供应链和消费金融领域的智能投顾产品，是众供宝和众消宝的一个特色子产品。经由出借人授权，平台通过智能投标计划将投资人加入的投资资金自动分配到借款标的中，提高投资人资金利用效率，并通过分散投资降低风险。到期退出为投标工具内借款标的正常到期，本金收益通过银行存管账户返还。`,
                    productOperationMode: '',
                    productStruct: 'https://images.51rz.com/images/rebuild/wx/img/tender_detail/product_struct/r-plan.png/r-plan.png',
                    dangetTip,
                    financeSafe: financeSafe_R,//资产安全
                    riskControlMeasures: [//风控措施
                        {
                            title: '一、严格风控标准',
                            desc: '严格审核流程，覆盖所有风险点。甄选优质资产，严格风控审查。'
                        },
                        {
                            title: '二、投后管理严谨',
                            desc: '向借款人发放贷款的同时，实现对借款人资金流向的控制，项目安全性得到极大提高。'
                        },
                        // {
                        //     title: '三、资金安全',
                        //     desc: '监管资金进出；交易过程中，存管银行将用户资金与平台自有资金隔离，专款专用。',
                        // },
                        {
                            title: '三、第三方担保',
                            desc: '第三方担保提供无限连带责任担保。'
                        }
                    ]
                },
                zhong_jin_bao: {//众金宝
                    productDesc: "众金宝项目致力于钢铁供应链贸易应收账款保理业务，选取优质的钢贸企业作为核心企业，由核心企业与上下游贸易商签订贸易合同并将钢材货物销售至下游采购商，取得应收账款相关权益；然后，核心企业再将应收账款转让至商业保理有限公司并签署《国内保理业务合同》申请保理融资，保理公司随后将应收账款转让给人众金服平台投资人，并签署《应收账款转让及回购协议》，承诺到期由保理公司无条件回购，并支付融资本息。",
                    productOperationMode: '融资过程中，以真实的贸易背景作为基础，以下游采购商作为融资人在平台融资，人众平台审核后，在平台上发布融资需求；保理公司在收到转让方核心企业回款后，按照《应收账款转让及回购协议》中约定的时间和条件向平台投资人支付相应本息。 <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;存管银行作为第三方存管机构保障资金安全，下游采购商、核心企业、商业保理有限公司作为还款来源，保障出借人权益实现。',
                    productStruct: 'https://images.51rz.com/images/rebuild/wx/img/tender_detail/product_struct//zjbJgt.png',
                    dangetTip,
                    financeSafe: financeSafe_normal,
                    riskControlMeasures: riskControlMeasures_normal
                },
                zhong_hui_bao: {//众惠宝
                    productDesc: '众惠宝致力于手机供应链贸易应收账款保理业务，为基于手机采购产生资金需求的供货商提供融资服务。由国内优质3c贸易商作为核心企业作为供货商与下游采购商签订手机购销贸易合同，取得应收账款；核心企业将以上应收账款转至保理公司并签订《国内保理业务合同》以申请保理融资；保理公司将核心企业转让的应收账款转让给人众金服平台投资人，并签署《应收账款转让及回购协议》，承诺到期由保理公司无条件回购，并支付融资本息。',
                    productOperationMode: '融资过程中，基于真实的手机及3c产品贸易背景为基础，由3c产品采购商作为融资人在人众平台融资，人众平台审核并交叉核验后，在平台上发布融资需求；保理公司在收到核心企业及融资主体的回款后，按照《应收账款转让及回购协议》协议约定的时间及条件向平台投资人支付相应本息。 <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;存管银行作为第三方存管机构保障资金安全，下游采购商、核心企业、保理公司作为还款来源，保障出借人权益实现。',
                    productStruct: 'https://images.51rz.com/images/rebuild/wx/img/tender_detail/product_struct//zhbJgt.png',
                    dangetTip,
                    financeSafe: financeSafe_normal,
                    riskControlMeasures: riskControlMeasures_normal//风控措施
                },
                zhong_jian_bao: {//众建宝
                    productDesc: '众建宝项目致力于水泥现货供应链业务，为基于水泥采购产生资金需求的供货商提供融资服务。“水泥网”作为全国最大的水泥现货交易平台，由“水泥网”的全资控股子公司杭州建详电子商务有限公司等作为核心企业，并由水泥网的经营主体浙江中建网络科技股份有限公司进行推荐，水泥网旗下优质贸易商委托“人众金服”平台融资，筹资用于水泥现货采购之用，筹资额与采购订单一致，贸易背景为核心企业控股多家子公司与贸易商的水泥现货交易。',
                    productOperationMode: '“水泥现货”平台采购商作为借款人，以真实贸易背景为基础，在“人众金服”上发布借款需求。人众审核后，在平台上发布借款需求。 <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;存管银行作为第三方存管机构保障资金安全，核心企业本身、核心企业实际控制人、核心企业子公司、采购商自身及采购商实际控制人作为借款合同的还款方、连带保证人保障出借人权益实现。',
                    productStruct: 'https://images.51rz.com/images/rebuild/wx/img/tender_detail/product_struct//zjianbao.png',
                    dangetTip,
                    financeSafe: financeSafe_normal,
                    riskControlMeasures: riskControlMeasures_normal
                },
                zhong_tao_bao: {//众淘宝
                    productDesc: '众淘宝致力于手机租赁业务过程中的小额分散资金信息服务，为基于手机租赁产生资金需求的承租人提供融资信息及配套信息服务。“机蜜”手机租赁平台与“支付宝”平台合作，以芝麻信用分作为承租人考量要素，获得了海量用户资源。租赁平台同时通过大数据的交叉验证进行风控筛选，通过5级准入门槛筛选资信状况最优的前x%手机承租人（x<10）；并设计100%保证金交易模式，基于承租人在租赁手机时需要缴纳与租赁手机市场价等额的履约保证金而产生借款需求，针对此类需求，由人众平台提供海量手机承租人融资过程中的信息服务，助力实现快速租机、轻松租机。',
                    productOperationMode: '承租人通过机蜜平台发起保证金等额借款融资；机蜜平台在收到承租人的融资需求后，向人众平台推送借款人名单及借款人基本信息；人众平台审核通过后，在“人众金服”平台发布借款需求；借款人按照借款协议约定的条件及事件向平台出资人支付相应本息。 <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;存管银行作为第三方存管机构保障资金安全，机蜜平台的实际运营主体作为借款合同的连带保证人保障出借人权益实现。',
                    productStruct: 'https://images.51rz.com/images/rebuild/wx/img/tender_detail/product_struct//ztbJgt.png',
                    dangetTip,
                    financeSafe: financeSafe_normal,
                    riskControlMeasures: [//风控措施
                        {
                            title: '借款人审核标准严谨',
                            desc: `1. 优质客户精准引流：通过各种手段提高违约代价，包括身份证实名校验、人脸活体校验、信审话术等, 以减少道德风险发生概率。
                                <br/>2. 人行征信报告征信无瑕疵且芝麻信用分600 分以上。
                                <br/>3. 已与蚂蚁金服旗下支付宝及微信达成战略协议，租金免密代扣，关联信用卡。
                                <br/>4. 租机绑定手机意外损坏保险，降低用户赔付风险。
                                <br/>5. 已登记IMEI 号码， iCloud 可远程定位及锁机。`
                        },
                        {
                            title: '担保增信',
                            desc: '担保人早稻科技提供无限连带责任担保。'
                        },
                        {
                            title: '小额分散投资策略',
                            desc: '每笔资金智能打散借出，分散投资、分散风险。'
                        },
                        // {
                        //     title: '资金安全',
                        //     desc: '监管资金进出；交易过程中，存管银行将用户资金与平台自有资金隔离，专款专用。'
                        // },
                    ]
                },
                zhong_yuan_bao: {//众元宝
                    productDesc: '众元宝系列产品是人众金服推出的一款普惠型、高流动性的消费金融类产品。',
                    productOperationMode: '人众作为产品信息撮合平台发布借款人融资需求，投资人在平台上与借款人签订借款协议，秉承分散投资、分散风险的策略，通过平台系统将投资人每笔资金智能打散借出，分散投资于多个期限相同的债权项目，通过银行存管户将资金出借至借款人账户。',
                    productStruct: '',
                    dangetTip,
                    financeSafe: financeSafe_zhong_yuan_bao,
                    riskControlMeasures: [//风控措施
                        {
                            title: '借款人审核标准严谨',
                            desc: '严格的信用资质审查、信息流监控，确保借款客户真实有效；'
                        },
                        {
                            title: '担保增信',
                            desc: '第三方担保公司提供无限连带责任担保。'
                        },
                        {
                            title: '小额分散投资策略',
                            desc: '每笔资金智能打散借出，分散投资、分散风险。'
                        },
                        // {
                        //     title: '资金安全',
                        //     desc: '监管资金进出；交易过程中，存管银行将用户资金与平台自有资金隔离，专款专用。'
                        // },
                    ]
                },
                zhong_ka_bao: {//众卡宝
                    productDesc: '众卡宝致力于消费贷业务，借款人定位于持有信用卡且信用卡在激活状态的自然人，以芝麻信用分作为借款人的重要考量要素。<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;借款人与人众金服签订《委托融资协议》，人众金服委托第三方数据公司对借款人的资质及信贷背景进行资质审核及交叉验证暨真实性验证，包括身份证实名校验、借记卡/信用卡鉴权、芝麻信用筛查、运营商数据收集、借款人身份信息等一系列信息的审核，在多方验证审核通过后，由人众金服作为居间平台，撮合借款人与出借人对接并签署《借款协议》，借款用途为日常消费。 <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;众卡宝是一款小额分散、数据化风险控制的消费类金融产品，具有周期短、收益高、风险可控等特点。',
                    productOperationMode: '融资过程中，借款人在人众平台融资，通过多方数据审核暨交叉验证后，在平台上发布借款需求。借款人按照借款协议约定及时到期还本付息。 <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;存管银行作为第三方存管机构保障资金安全。',
                    productStruct: 'https://images.51rz.com/images/rebuild/wx/img/tender_detail/product_struct//zkbJgt.png',
                    dangetTip,
                    financeSafe: financeSafe_normal,
                    riskControlMeasures: riskControlMeasures_ping_ka,
                },
                zhong_ping_bao: {//众苹宝
                    productDesc: '众苹宝致力于消费贷业务，通过第三方数据公司的风控要件对借款人的融资需求进行审核，包括身份证实名校验、芝麻信用筛查、运营商数据收集、客户上传收取身份证复印件等对借款人身份及资质进行核查。借款人定位于持有苹果手机iphone6及以上的自然人。 <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;借款人与人众金服签订《委托融资协议》，人众金服委托第三方数据公司对借款人的资质及信贷背景进行资质审核及交叉验证暨真实性验证，包括身份证实名校验、芝麻信用筛查、运营商数据收集、借款人身份信息等一系列信息的审核，在多方验证审核通过后，由人众金服作为居间平台，撮合借款人与出借人对接并签署《借款协议》，借款用途为日常消费。<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;众苹宝是一款小额分散、数据化风¬¬险控制的消费类金融产品，具有周期短、收益高、风险可控等特点。',
                    productOperationMode: '融资过程中，借款人在人众平台融资，通过多方数据审核暨交叉验证后，在平台上发布借款需求。借款人按照借款协议约定及时到期还本付息。 <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;存管银行作为第三方存管机构保障资金安全。',
                    productStruct: 'https://images.51rz.com/images/rebuild/wx/img/tender_detail/product_struct//zpbJgt.png',
                    dangetTip,
                    financeSafe: financeSafe_normal,
                    riskControlMeasures: riskControlMeasures_ping_ka,
                },
                zhong_qi_bao: {//众汽宝
                    productDesc: '众汽宝致力于购车按揭款垫资资金过桥业务，为基于购车按揭款垫资产生资金需求的购车消费者提供融资服务。借款人即购车消费者以按揭方式买车，在支付首付款后、银行放贷前，杭州至盛汽车销售服务有限公司（下称至盛公司）作为汽车贸易担保公司与借款人签订委托合同，借款人委托至盛通过人众金服平台将购车首付款余款部分先行打给汽车经销商，以实现迅速提车的目的；基于满足购车者此目的需求，人众平台提供融资服务。',
                    productOperationMode: '购车者作为借款人委托至盛公司通过人众平台进行募资借款；至盛作为首道审核主体，对客户进行全面审核后向人众平台推送借款人名单及借款人基本信息；人众委托第三方进行审核及交叉验证通过后，在“人众金服”平台发布借款需求；借款人按照借款协议及委托合同约定及时向平台出资人支付相应本息。至盛作为连带责任保证人为借款提供担保责任。 <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;存管银行作为第三方存管机构保障资金安全。购车者与至盛作为还款来源及担保方，保障出借人权益实现。',
                    productStruct: 'https://images.51rz.com/images/rebuild/wx/img/tender_detail/product_struct//zqbJgt.png',
                    dangetTip,
                    financeSafe: financeSafe_normal,
                    riskControlMeasures: [//风控措施
                        {
                            title: '严格风控标准',
                            desc: '专注供应链金融服务，严格审核流程，覆盖所有风险点。甄选优质资产，严格风控审查。业内首创专属监管仓，实现质押货品的存储与监管，保证质押货品安全保值，逾期能快速处理变现。'
                        },
                        {
                            title: '投后管理严谨',
                            desc: '向借款人发放贷款的同时，通过对借款人整个产业链上下游的对接，实现对借款人资金流向的控制，项目安全性得到极大提高。'
                        },
                        {
                            title: '第三方回购',
                            desc: '核心企业/融资方法人提供无限连带担保责任'
                        },
                        // {
                        //     title: '资金安全',
                        //     desc: '监管资金进出；交易过程中，存管银行将用户资金与平台自有资金隔离，专款专用。'
                        // },
                        {
                            title: '强大法律保障',
                            desc: '由综合性律师事务所普龙律师事务所进行法律审查，确保交易流程合法合规。'
                        },
                    ]
                },
                zhong_che_bao: {//众车宝
                    productDesc: '众车宝致力于车辆按揭首付分期业务，为基于车辆按揭首付分期借款提供融资服务。购车者与汽车销售商签订汽车销售合同，按揭购买车辆；购车者在银行按揭贷款审核通过后，产生首付资金借款的需求；人众平台提供首付分期融资服务，助力实现快速购车、轻松购车。',
                    productOperationMode: '融资过程中，购车者以真实车辆买卖交易背景为前提，作为借款人在人众平台融资，由4s店将相应符合资质的客户推予人众金服，客户与人众签订委托融资协议，由“人众金服”平台根据具体信息委托第三方信贷服务商对借款人进行资质审核；审核通过后，借款人得以在“人众金服”平台发布借款需求；借款人按照借款协议约定及时向平台出资人支付相应本息。存管银行作为第三方存管机构保障资金安全。',
                    productStruct: 'https://images.51rz.com/images/rebuild/wx/img/tender_detail/product_struct//zcbJgt.png',
                    dangetTip,
                    financeSafe: financeSafe_normal,
                    riskControlMeasures: [//风控措施
                        {
                            title: '严格风控标准',
                            desc: '严格审核流程，覆盖所有风险点。甄选优质资产，严格风控审查。借款人申请的车辆按揭贷款已获银行批复，且银行出具车辆按揭贷款同意贷款批复函。'
                        },
                        {
                            title: '投后管理严谨',
                            desc: '向借款人发放贷款的同时，通过对借款人整个产业链上下游的对接，实现对借款人资金流向的控制，项目安全性得到极大提高。'
                        },
                        // {
                        //     title: '资金安全',
                        //     desc: '监管资金进出；交易过程中，存管银行将用户资金与平台自有资金隔离，专款专用。'
                        // },
                        {
                            title: '强大法律保障',
                            desc: '由中国规模最大的综合性律师事务所之一的金道律师事务所进行法律审查，确保交易流程合法合规。'
                        },
                    ]
                },
            };
        },
        computed: {
            page(){
                return this.r_plan;
            }
        },
        methods: {}
    }
</script>
<style lang="scss" scoped>
    .business_mode {
        img {
            @include box((w:100%));
        }
    }

    /*合同附件*/
    .htfj {
        @include box((ta:center));
        &:after {
            content: '';
            @include box((d:block, w:100%, h:1px));
            clear: both;
        }
        li {
            @include box((fl:left, m:0 0.2rem));
        }
        div {
            @include box((d:block, w:0.8rem, h:0.8rem, m:0 auto));
            @include bg_img('tender_detail/xyfm.png')
        }
        p {
            @include box((d:block, ta:center, c:$black6, lh:0.7rem, fs:0.28rem));
        }
    }

    .detail {
        @include box((p:0 0.3rem 0, bg:$white));
        > ul {
            @include box((p:0.3rem 0 0.6rem));
            &:not(:last-child) {
                @include thin(bottom, #e5e5e5);
            }
        }
        h3 {
            @include box((lh:0.4rem, fs:0.28rem, c:$black2, m:0 0 0.15rem));
            font-weight: normal;

            .icon {
                @include box((d:inline-block, w:0.48rem, h:0.48rem, m:0 0.2rem 0 0));
                vertical-align: middle;
            }
            .icon_cpms {
                @include bg_img('tender_detail/icon_cpms.png');
            }
            .icon_hxqy {
                @include bg_img('tender_detail/icon_hxqy.png');
            }
            .icon_fxbz {
                @include bg_img('tender_detail/icon_fxbz.png');
            }
            .icon_jkzl {
                @include bg_img('tender_detail/icon_jkzl.png');
            }
        }
        h4 {
            @include box((lh:0.34rem, fs:0.24rem, c:$black5, m:0.3rem 0 0.18rem));
            font-weight: normal;
        }
        p {
            @include box((c:$black9, fs:0.24rem, lh:0.36rem));
        }
        .honor {
            p {
                @include box((lh:0.28rem, fs:$black9, m:0 0 0.45rem, p:0 0 0 1rem));
                @include position((p:relative))
                &:before {
                    content: '';
                    @include box((d:block, w:0.11rem, h:0.11rem, bg:#D8D8D8, bdr:50%));
                    @include position((p:absolute, t:0.1rem, l:0.445rem))
                }
            }
        }
        .risk_control {
            .risk_navs {
                @include box((d:flex, ta:center, m:0 0 0.3rem 0));
                .item {
                    @include box((fs:0.2rem, c:$black9));
                    flex: 1;
                    span {
                        @include box((d:block, w:0.68rem, h:0.68rem, m:0 auto 0.26rem));
                    }
                    .icon_sub_zlsh {
                        @include bg_img('tender_detail/icon_sub_zlsh.png')
                    }
                    .icon_sub_sddc {
                        @include bg_img('tender_detail/icon_sub_sddc.png')
                    }
                    .icon_sub_zcpg {
                        @include bg_img('tender_detail/icon_sub_zcpg.png')
                    }
                    .icon_sub_fbjk {
                        @include bg_img('tender_detail/icon_sub_fbjk.png')
                    }
                }
            }
            li {
                @include position((p:relative, z:0));
                &.has_icon {
                    min-height: 1.02rem;
                    @include box((m:0 0 0.74rem));
                    @include box((p:0 0 0 1.94rem));
                    background-size: 1.02rem 1.02rem;
                    background-position: 0.15rem top;
                    background-repeat: no-repeat;
                    &.zjl {
                        background-image: url("#{$base_url}tender_detail/icon_zjl.png");
                    }
                    &.hwl {
                        background-image: url("#{$base_url}tender_detail/icon_hwl.png");
                    }
                    &.db {
                        background-image: url("#{$base_url}tender_detail/icon_db.png");
                    }
                    &.fxzbj {
                        background-image: url("#{$base_url}tender_detail/icon_fxzbj.png");
                    }
                    &.huigou {
                        background-image: url("#{$base_url}tender_detail/icon_huigou.png");
                    }
                    &.falv {
                        margin-bottom: 0;
                        background-image: url("#{$base_url}tender_detail/icon_falv.png");
                    }
                }
            }
        }
        .borrow_info {
            table {
                @include box((w:6.9rem, m:0.2rem auto));
                border-collapse: collapse;
            }
            td {
                @include box((w:50%, lh:0.6rem, c:$black9, p:0 0.2rem));
                @include thin(all, #e5e5e5);
            }
            .desc {
                @include box((m:0.18rem 0, c:$black9, fs:0.24rem));
            }
            .info_items {
                label {
                    @include box((d:block, p:0 0 0 1.94rem, m:0.3rem 0, lh:0.46rem, fs:0.24rem, c:$black5));
                    background-image: url("#{$base_url}tender_detail/icon_ycy.png");
                    background-repeat: no-repeat;
                    background-size: 0.44rem 0.44rem;
                    background-position: 0.48rem center;
                }
            }
        }
    }
</style>
