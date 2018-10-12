<template>
    <div>
        <div class="blBox">
            <div class="blTit">债权转让协议</div>
            <div class="infoBox">
                <div class="blTitC">债权转让协议</div>
                <div class="blno">协议编号：<span v-text="obj.protocolId"></span>
                </div>
                <br>
                <div class="bljia">
                    <div class="bljial"><p>本债权转让及受让协议（下称“本协议”）由以下双方于（日期：
                        <span>2017年12月21日</span>）签署
                        </p>
                        <p>甲方（转让人）：<span v-text="obj.transferorRealName"></span></p>
                        <p>身份证号：<span v-text="obj.transferorIdCard"></span></p>
                        <p>人众金服用户名：<span v-text="obj.transferorUserName"></span></p>
                        <p>乙方（受让人）：<span v-text="obj.undertakingRealName">李敏</span></p>
                        <p>身份证号：<span v-text="obj.undertakingIdCard">3210****722X</span></p>
                        <p>人众金服用户名：<span v-text="obj.undertakingUerName">rzjrlm</span></p>
                        <p style="position: relative;">
                            就甲方通过浙江人众金融服务股份有限公司运营管理的www.51rz.com 网站（下称“人众金服网站”）向乙方转让债权事宜，双方经协商一致，达成如下协议：</p>
                    </div>
                    <div class="bltiaok"><p style="font-weight: bold;">1. 债权转让</p>
                        <p>1.1 标的债权信息及转让</p>
                        <p>甲方同意将其通过人众金服的居间协助而形成的有关债权（下称“标的债权”）转让给乙方，乙方同意受让该笔债权。标的债权具体信息如下：</p><br>
                        <p>标的债权信息：</p><br>
                        <table style="width: 100%; border: 0px;">
                            <tbody>
                            <tr>
                                <td style="width: 50%;">借款ID</td>
                                <td style="width: 50%;" v-text="obj.borrowId"></td>
                            </tr>
                            <tr>
                                <td>借款人姓名</td>
                                <td v-text="obj.borrowerName"></td>
                            </tr>
                            <tr>
                                <td>借款本金数额（元）</td>
                                <td v-text="obj.amount"></td>
                            </tr>
                            <tr>
                                <td>借款年利率（%）</td>
                                <td v-text="obj.apr"></td>
                            </tr>
                            <tr>
                                <td>原借款期限</td>
                                <td v-text="obj.period"></td>
                            </tr>
                            </tbody>
                        </table>
                        <br>
                        <p>标的债权转让信息：</p><br>
                        <table style="width: 100%; border: 0px;">
                            <tbody>
                            <tr>
                                <td style="width: 50%;">标的债权价值（元）</td>
                                <td style="width: 50%;" v-text="obj.transferorAmount"></td>
                            </tr>
                            <tr>
                                <td>转让价款（元）</td>
                                <td v-text="obj.bondAmount"></td>
                            </tr>
                            <tr>
                                <td>转让管理费（元）</td>
                                <td v-text="obj.managementAmount"></td>
                            </tr>
                            <tr>
                                <td>转让日期</td>
                                <td v-text="obj.transferorDateStr"></td>
                            </tr>
                            </tbody>
                        </table>
                        <br>
                        <p>1.2 债权转让流程</p>
                        <p>1.2.1 双方同意并确认，双方通过自行或授权有关方根据人众金服网站有关规则和说明，在人众金服网站进行债权转让和受让购买操作等方式确认签署本协议。</p>
                        <p>
                            1.2.2 双方接受本协议且人众金服审核通过时，本协议立即成立,并待转让价款支付完成时生效。协议成立的同时乙方不可撤销地授权人众金服自行或委托第三方支付机构或合作的金融机构，将转让价款在扣除甲方应支付给人众金服的转让管理费之后划转、支付给甲方，上述转让价款划转完成即视为本协议生效且标的债权转让成功；同时甲方不可撤销地授权人众金服将其代为保管的甲方与标的债权借款人签署的电子文本形式的《借款协议》（下称“借款协议”）及借款人相关信息在人众金服网站有关系统板块向乙方进行展示。</p>
                        <p>1.2.3 本协议生效且标的债权转让成功后，双方特此委托人众金服将标的债权的转让事项及有关信息通过站内信等形式通知与标的债权对应的借款人。</p>
                        <p>1.3 自标的债权转让成功之日起，乙方成为标的债权的债权人，承继借款协议项下出借人的权利并承担出借人的义务。</p>
                        <p style="font-weight: bold;">2. 保证与承诺</p>
                        <p>2.1 甲方保证其转让的债权系其合法、有效的债权，不存在转让的限制。甲方同意并承诺按有关协议及人众金服网站的相关规则和说明向人众金服支付债权转让管理费。</p>
                        <p>2.2 乙方保证其所用于受让标的债权的资金来源合法，乙方是该资金的合法所有人。如果第三方对资金归属、合法性问题发生争议，乙方应自行负责解决并承担相关责任。</p>
                        <br>
                        <p style="font-size: 14px; line-height: 25px; font-weight: bold;">3. 违约</p>
                        <p>
                            3.1 双方同意，如果一方违反其在本协议中所作的保证、承诺或任何其他义务，致使其他方遭受或发生损害、损失等责任，违约方须向守约方赔偿守约方因此遭受的一切经济损失。</p>
                        <p>3.2 双方均有过错的，应根据双方实际过错程度，分别承担各自的违约责任。</p><br>
                        <p style="font-size: 14px; line-height: 25px; font-weight: bold;">4. 适用法律和争议解决</p>
                        <p>4.1 本协议的订立、效力、解释、履行、修改和终止以及争议的解决适用中国的法律。</p>
                        <p>4.2 本协议在履行过程中，如发生任何争执或纠纷，双方应友好协商解决；若协商不成，由浙江省杭州市西湖区人民法院管辖。</p><br>
                        <p style="font-size: 14px; line-height: 25px; font-weight: bold;">5. 其他</p>
                        <p>5.1 双方可以书面协议方式对本协议作出修改和补充。经过双方签署的有关本协议的修改协议和补充协议是本协议组成部分，具有与本协议同等的法律效力。</p>
                        <p>
                            5.2 本协议及其修改或补充均通过人众金服网站以电子文本形式制成，可以有一份或者多份并且每一份具有同等法律效力；同时双方委托人众金服代为保管并永久保存在人众金服为此设立的专用服务器上备查。双方均认可该形式的协议效力。</p>
                        <p>
                            5.3 甲乙双方均确认，本协议的签订、生效和履行以不违反中国的法律法规为前提。如果本协议中的任何一条或多条违反适用的法律法规，则该条将被视为无效，但该无效条款并不影响本协议其他条款的效力。</p>
                        <p>5.4 除本协议上下文另有定义外，本协议项下的用语和定义应具有人众金服网站服务协议及其有关规则中定义的含义。若有冲突，则以本协议为准。</p><br><br>
                        <p style="line-height: 40px; font-size: 20px;">甲方：
                            <font style="color: rgb(255, 0, 0);"><span v-text="obj.transferorRealName"></span></font>
                        </p>
                        <p style="line-height: 40px; font-size: 20px;">乙方：
                            <font style="color: rgb(255, 0, 0);"><span v-text="obj.undertakingRealName">李敏</span></font>
                        </p>
                        <p>&nbsp;</p>
                        <p>&nbsp;</p>
                        <p></p>
                        <p></p>
                        <p></p></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import API from '@/api'
    import getParam from '@/lib/getParam'
    export default {
        name: 'AgreementTransfer',
        data(){
            return {
                obj: {
                    protocolId:'',//协议编号
                    transferorUserId:'',//转让人用户id
                    transferorRealName:'',//转让人姓名
                    transferorIdCard:'',//转让人身份证
                    transferorUserName:'',//平台用户
                    undertakingUserId:'',//承接人id
                    undertakingRealName:'',//承接人用户id
                    undertakingIdCard:'',//身份证
                    undertakingUerName:'',//平台用户号
                    borrowerName:'',//借款人
                    amount:'',//借款金额
                    apr:'',//利率
                    period:'',//原期数
                    bondAmount:'',//债权总金额
                    transferorAmount:'',//待收本金+利息
                    managementAmount:'',//管理费
                    transferorDate:'',//转让时间
                    transferorDateStr:'',//转让时间
                    borrowId:''
                }
            }
        },
        methods: {
            async getInitData() {
                const param={
                    bondId:getParam(window.location.href, 'bondId')
                }
                const token=getParam(window.location.href, 'token')
                if(token){
                    param.token=token
                }
                this.obj = await API.get(API.oldBondProtocol,param)
            }
        },
        mounted() {
            this.getInitData()
        }
    }
</script>
<style lang="scss" scoped>
    .blTit{ height:0.8rem; background:#e4443a; font-size:0.32rem; color:#fff; line-height:0.8rem; text-indent:0.4rem;}
    .infoBox{ border:1px solid #ccc; padding:10px; background:#fff; border-top:0px;}
    .blTitC{ height:0.5rem; line-height:0.5rem; text-align:center; font-size:0.4rem; border-bottom: #cccccc 1px dashed;}
    .blno{ height:0.5rem; line-height:0.5rem; text-align:right; font-size:0.3rem;}
    .bljia{ overflow:hidden; margin-bottom:0.1rem;}
    .bljial{ padding-left:0.2rem;}
    .bljial p{ font-size:0.28rem; line-height:0.6rem; }
    .bltiaok{ padding-left:20px;}
    .bltiaok p{ font-size:0.28rem; line-height:0.5rem;}
    .bltiaok table{ background:#F0F0F2;}
    .bltiaok td{ background:#fff; padding:5px 0 5px 30px; font-size:0.28rem;}
</style>
