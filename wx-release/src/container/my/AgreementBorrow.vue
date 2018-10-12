<template>
    <div class="blBox">
        <div class="blTit">借款协议</div>
        <div class="infoBox">
            <div class="blTitC">借款协议</div>
            <div class="blno">协议编号：<span id="htid" v-text="obj.protocolId"></span></div><br />
            <div class="bljia">
                <div class="bljial">
                    <p>甲方（出借人）：<span id="jiafang" v-text="obj.tenderName"></span></p>
                    <p>平台帐号：<span id="pingtai" ismore="1" v-text="obj.userName"></span></p>
                    <p>乙方（借款人）：<span id="buname" v-text="obj.borrowName"></span></p>
                    <p v-if="obj.borrowerType !=1 " id="p_persinid">身份证号：<span id="b_personid" v-text="obj.borrowIdCard"></span></p>
                    <p v-if="obj.borrowerType==1" id="p_orgcode">注册号：<span id="b_orgcode" v-text="obj.zzjgCode"></span></p>
                    <p style="position:relative" >
                        丙方（居间方）：浙江人众金融服务股份有限公司
                        <img src="https://images.51rz.com/images/rebuild/wx/img/renzhong.png" style="position:absolute;left:0.77rem;top:-0.34rem;width:2rem" />
                    </p>
                    <p>法定代表人：李敏</p>
                </div>
                <div class="bltiaok">
                    <p>鉴于：</p>
                    <p>1.&nbsp;甲方系丙方网站——人众金服注册会员，甲方承诺并保证其在丙方网站注册的信息是完全真实、准确、合法，有效，用户名、密码系其本人持有和使用。甲方、乙方确认对本协议项下所涉一切行为具有完全民事行为能力、意思表示真实。</p>
                    <p>2.丙方系人众金服的所有人，有该网站的经营管理权，丙方为其注册会员提供投融资信息发布、咨询及交易管理等相关居间服务。</p>
                    <p>3.乙方有借款需求，委托丙方网站发布借款筹资信息，并承诺通过丙方平台居间服务所获得的借款用于合法的商业用途。</p>
                    <p>4.甲方自愿通过丙方人众金服平台向乙方提供借款、成立借贷关系，并保证用以借出的款项具有完全的支配能力、是其合法所得。</p>
                    <p>现各方经协商一致，依据合同法等有关规定达成如下条款：</p>
                    <p style="font-weight:bold">第一条&nbsp;借贷基本信息</p>
                    <p>1、产品/项目编号：<font color="#FF0000">【<span id="thhtbh" v-text="obj.borrowId"></span>】</font>；</p>
                    <p>2、借款本金数额：<font color="#FF0000">【<span id="account" v-text="obj.tenderAmount"></span>元】</font>；</p>
                    <p>3、预期年化利率：<font color="#FF0000">【<span id="lilv" v-text="obj.borrowApr"></span>%】</font></p>
                    <p>4、借款期限：自合同签署之日起至 <span v-text="obj.lastRepayDay"></span>
                       <!--<span id="end_Y"> {}</span>年<span id="end_M"> {}</span>月<span id="end_D">{}</span>日-->
                        止；</p>
                    <p>5、还款到账日为借款到期日后的5个工作日内。</p>
                    <br />
                    <p style="font-weight:bold">第二条&nbsp;甲方权利、义务</p>
                    <p>1.甲方应按协议约定在借款期限起始日前将借款本金通过与人众金服对接的第三方支付平台进行支付。甲方应确保在划转之时其账户中有足够的资金以完成放款。</p>
                    <p>2．甲方同意以网络页面点击确认的方式签订本协议，并不以此为由拒绝履行本协议项下的义务，即便在签订时本协议并没有乙方的信息、第一条、第二条的相关信息、签订日期信息等。甲方同意以前述方式签订本协议后即视为不可撤销及变更地授权人众金服平台根据最终撮合结果自主生成前述信息，且未经人众金服及乙方的同意，甲方不得否认本协议项下债权债务关系或以任何方式撤回、撤销本协议。</p>
                    <p>3．甲方同意并授权人众金服或人众金服的合作方（第三方支付方、银行）根据本协议约定从其支付账户中划转借款金额至乙方指定账户以履行放款义务。甲方出借的款项支付至乙方指定账户后，甲乙双方借贷关系成立并生效，由乙方无条件承担还款责任。借款到期后，甲方同意并授权人众金服或人众金服的合作方（第三方支付方、银行）根据本协议约定将借款本金及利息划转至其指定账户即视为乙方已履行还款义务。</p>
                    <p>4．甲方理解并同意，借款金额从其第三方支付账户划转之日起至起息日(不含)的这段期间内不产生任何收益（包括但不限于利息）。本协议项下的借款本息或受偿款项划转至甲方的第三方支付账户需要一定的时间，前述时间一般不超过三个工作日。</p>
                    <p>5.甲方有权通过第三方支付平台及时足额收取本息，同时应按相关法律要求缴纳由利息所得带来的可能的税费。</p>
                    <p>6.甲方应确保其提供信息和资料的真实性、准确性、有效性，不得提供虚假信息或隐瞒重要事实，否则应承担一切不利后果。</p>
                    <p>7.甲方应按与丙方签订的居间合同、人众金服或向甲方提供服务的第三方明示的收费项目和规则向丙方及其他第三方支付服务费用。</p>
                    <br />

                    <p style="font-size:14px;line-height:25px;font-weight:bold">第三条&nbsp;乙方权利、义务</p>
                    <p>1.乙方同意以网络页面点击确认或其他方式（包括但不限于签字或电子签章等方式）签订本协议，并不以此为由拒绝履行本协议项下的义务，即便在签订时本协议并没有甲方的信息、第一条、第二条的相关信息、签订日期信息等。乙方同意以上述方式签订本协议后即视为不可撤销及变更地授权人众金服平台根据最终撮合结果自主生成前述信息，且未经人众金服及甲方的同意，乙方不得否认本协议项下债权债务关系或以任何方式撤回、撤销本协议。</p>
                    <p>2.乙方同意并授权人众金服或人众金服的合作方（第三方支付方、银行）根据本协议约定将借款金额划转至乙方指定账户即视为甲方履行完毕放款义务。乙方应保证其指定账户状态正常，确保资金划入、划出交易的完成。如因前述指定账户不正常导致的所有损失（如借款资金无法及时入账、还款资金无法划转等）应由其自行承担。</p>
                    <p>3.乙方应在指定的还款日前将借款的本金及利息汇入与人众金服对接第三方支付的指定账户即视为乙方履行了还款义务。</p>
                    <p>4.若甲方、乙方借贷关系成立后，因政策法律、政府监管原因被强制解除或撤销或无效，则乙方应在该事由发生之日起一个工作日内将甲方的借款通过人众金服平台对接的第三方支付无息返还至甲方持有、指定的账户。</p>
                    <p>5.乙方应按本协议约定之用途使用借款，不得用于本协议外的其他用途。</p>
                    <p>6.乙方应按与丙方签订的居间合同、人众金服或向乙方提供服务的第三方明示的收费项目和规则向丙方及其他第三方支付居间服务费用。</p>
                    <p>7.未经甲方、丙方一致同意，乙方不得将本协议项下的任何权利义务转让给任何其他方。</p>
                    <p>8.乙方应确保其提供的信息和资料的真实性、准确性、合法性、有效性，不得提供虚假信息或隐瞒重要事实，否则应承担一切不利后果。</p>
                    <p>9.如乙方发生或可能发生危及其履约、还款能力的任何事态时，乙方应在事态发生（或知晓其可能发生）之日起3日内书面通知甲方和丙方，乙方自行或根据甲方、丙方的要求积极采取补救措施，以保证甲方资金安全，避免甲方、丙方可能遭受的相关损失。</p>
                    <p>10.为审核乙方发布的信息的真实性、合法性和有效性及乙方履行本协议的能力及相关资信，乙方应根据丙方或甲方的要求提供有关证照、凭证、证明和其他资料，以便丙方或甲方了解生产经营状况、信用等级、还款能力、借款用途、借款使用情况及其相关信息。</p>
                    <br />

                    <p style="font-size:14px;line-height:25px;font-weight:bold">第四条&nbsp;丙方的权利、义务</p>
                    <p>1.丙方仅为甲乙双方成立借贷关系提供居间服务并负责人众金服平台的运行和维护。丙方不保证乙方可及时获得借款，也不保证甲方借出款项能及时足额得到偿还，甲方与乙方借贷交易过程中的风险由其自行承担。</p>
                    <p>2.如因甲方或乙方以及本协议之外的第三方的原因，造成本合同无法履行，丙方不承担任何责任。</p>
                    <p>3．甲乙双方一致同意，出现下列事由而导致甲方乙方合同不能履行或者相关损失，丙方不承担任何法律责任：1）丙方人众金服系统或第三方支付停机维护期间；2）电信设备出现故障不能进行数据传输的；3）由于黑客攻击、网络供应商技术调整或故障、网站升级、银行方面的问题等原因而造成的人众金服服务中断或延迟；4）因台风、地震、海啸、洪水、停电、战争、恐怖袭击等不可抗力因素，造成人众金服系统障碍不能提供服务的。</p>
                    <p>4.丙方应对甲方和乙方的信息及本协议内容负有保密义务，不得用于本业务无关的任何其他用途。如一方违约，丙方可向守约方披露。应司法、仲裁机构及行政机关的要求丙方亦可披露本协议及相关信息。</p>
                    <p>5.甲方、乙方在丙方登记的住所、通信地址、电子邮箱、联系电话等事项变更时，应在有关事项变更之日起3日内书面通知丙方，否则，造成的一切不利后果由其自行承担。</p>
                    <br />
                    <p style="font-size:14px;line-height:25px;font-weight:bold">第五条&nbsp;违约责任</p>
                    <p>1．协议各方均应严格履行协议义务，非经各方协商一致，任何一方不得解除本协议。</p>
                    <p>2．任何一方违约，违约方应赔偿因违约使得其他各方产生的一切损失，包括但不限于中介费用、诉讼费、律师费、差旅费等。</p>
                    <p>3.若乙方逾期还款，乙方同意除按本协议规定支付利息外，每逾期一天按借款金额万分之六支付罚息，甲方有权起诉乙方偿还借款本息。</p>
                    <br />
                    <p style="font-size:14px;line-height:25px;font-weight:bold">第六条&nbsp;争议解决</p>
                    <p>对于因本协议履行而发生的争议，三方可协商解决，协商不成的向协议签订地杭州市西湖区有管辖权的法院提起诉讼。</p>
                    <br />

                    <p style="font-size:14px;line-height:25px;font-weight:bold">第七条&nbsp;附则</p>
                    <p>1.本协议采用电子文本形式制成，甲乙双方同意按照人众金服网站要求所填写的确认信息是其合法有效的电子签名，并保存在丙方为此设立的专用服务器上备查，各方均认可该形式的协议效力。甲方、乙方应当妥善保管其在丙方所留注册信息、密码等，若因非丙方原因导致上述信息泄露而造成甲方、乙方损失，则由甲方、乙方自行承担相应责任。</p>
                    <p>2.本协议的任何条款因法律、法规、政策的变化而无效或不可执行时，不影响本协议的其他条款的效力。</p>
                    <p>3．本协议自文本最终生成之日成立，于乙方指定账户收到借款之日生效。</p>
                    <br /><br />
                    <p style="line-height:40px;font-size:14px">甲方：<font><span id="jiafang1" v-text="obj.tenderName"></span></font></p>
                    <p style="line-height:40px;font-size:20px">乙方：<font><span id="buname1" v-text="obj.borrowName"></span></font></p>
                    <p style="line-height:40px;font-size:20px;position:relative">
                        丙方：浙江人众金融服务股份有限公司
                        <img src="https://images.51rz.com/images/rebuild/wx/img/renzhong.png" style="position:absolute;left:0.77rem;top:-1.4rem;width:2rem" /></p>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                    <p></p>
                    <p></p>
                    <p></p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import API from '@/api'
    import getParam from '@/lib/getParam'

    export default {
        name: 'AgreementBorrow',
        data(){
            return {
                obj:{

                }
            }
        },
        async created(){
            const param={
                tenderId:getParam(window.location.href, 'tenderId')
            }
            const token=getParam(window.location.href, 'token')
            if(token){
                param.token=token
            }
            let obj=await API.post(API.oldProtocol,param)
            if(typeof obj == 'string'){
                obj=JSON.parse(obj)
            }
            this.$data.obj=obj
        },
        methods: {}
    }
</script>
<style lang="scss" scoped>
    .blBox{ overflow:hidden; margin:0 auto; background:#fff;}
    .blTit{ height:0.8rem; background:#e4443a; font-size:0.28rem; color:#fff; line-height:0.8rem; text-indent:0.4rem;}
    .infoBox{ border:1px solid #ccc; padding:0.2rem; background:#fff; border-top:0px;}
    .blTitC{ height:1rem; line-height:1rem; text-align:center; font-size:0.4rem; border-bottom: #cccccc 1px dashed;}
    .blno{ height:1rem; line-height:1rem; text-align:right; font-size:0.32rem;}
    .bljia{ overflow:hidden; margin-bottom:0.2rem;}
    .bljial{ padding-left:0.4rem;}
    .bljial p{ font-size:0.28rem; line-height:0.7rem;}
    .bltiaok{ padding-left:0.4rem;}
    .bltiaok p{ font-size:0.28rem; line-height:0.5rem;}
</style>
