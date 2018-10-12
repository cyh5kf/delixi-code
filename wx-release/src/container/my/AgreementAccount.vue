<template>
    <div style="overflow:hidden; margin:20px auto; background:#fff">
        <div style="height:40px; background:#e4443a;font-size:16px;color:#fff;line-height:40px;text-indent:20px">
            应收账款转让及回购合同
        </div>
        <div style="border:1px solid #ccc;padding:10px;background:#fff;border-top:0px">
            <div style="font-size:0.34rem;border-bottom: #cccccc 1px dashed">
                应收账款转让及回购合同
            </div>
            <div style="height:50px;line-height:50px;text-align:right;font-size:0.28rem">合同编号：<span id="htid" v-text="obj.protocolId"></span>
            </div>
            <br/>
            <div style="overflow:hidden;margin-bottom:10px">
                <div style="padding-left:20px">
                    <p style="font-size:14px;line-height:35px">
                    应收账款转让人（甲方）：
                    <span v-if="obj.borrowProtocolId==113||isZhongJinBao" class="cjrname">上海卓投商业保理有限公司</span>
                    <span v-if="obj.borrowProtocolId==115||isZhongHuiBao" class="cjrname">如裕国际商业保理（深圳）有限公司</span>
                    </p>
                    <p style="font-size:14px; line-height:35px; position:relative">
                    营业执照号：
                    <span v-if="obj.borrowProtocolId==113||isZhongJinBao" id="buslicence">310141400030291</span>
                    <img v-if="obj.borrowProtocolId==113||isZhongJinBao" class="seal" src="https://images.51rz.com/images/rebuild/wx/img/zuotou.png"
                                           style="position:absolute;left:77px;top:-34px;width:100px"/>
                    <span v-if="obj.borrowProtocolId==115||isZhongHuiBao" id="buslicence">440301117770154</span>
                    <img v-if="obj.borrowProtocolId==115||isZhongHuiBao" class="seal" src="https://images.51rz.com/images/rebuild/wx/img/ruyu.png"
                                           style="position:absolute; left:77px;top:-34px;width: 100px"/>
                    </p>
                    <p style="font-size:14px;line-eight:35px">应收账款受让人（乙方）：<span id="jiafang" v-text="obj.tenderName">李敏</span></p>
                    <p style="font-size:14px;line-eight:35px">人众金服平台账号：<span id="pingtai" v-text="obj.rzTenderName">rzjrlm</span></p>
                    <br/>
                </div>
                <div style="padding-left:20px">
                    <p style="font-size:14px;line-height:25px">鉴于：</p>
                    <p style="font-size:14px;line-height:25px">原债权人与原债务人签署的《基础交易合同》并已建立应收账款的交易关系（以下简称基础交易关系）。</p>
                    <p style="font-size:14px;line-height:25px">原债权人与甲方签署的编号为<font color="#FF0000"><span id="thhtbh" v-text="obj.conNumber"></span></font>的《国内保理业务合同》，甲方为原债权人提供国内保理服务。</p>
                    <p style="font-size:14px;line-height:25px">现经甲乙双方协商一致，甲方将上述原债权人的应收账款转让给乙方，为保证本业务的顺利进行，双方约定如下：</p>

                    <p style="font-size:14px;line-height:25px;font-weight:bold">第一条 业务简介</p>
                    <p style="font-size:14px;line-height:25px">本合同业务为应收账款转让及应收账款委托管理业务，即乙方在本合同有效期及延续期间受让原债权人的应收账款，并委托甲方代为管理和催收应收账款，本合同约定回购条件成就后由甲方向乙方回购本合同转让的应收账款。</p>
                    <br/>

                    <p style="font-size:14px;line-height:25px;font-weight:bold">第二条 应收账款转让标的</p>
                    <p style="font-size:14px;line-height:25px">原债权人通过甲方向乙方转让的标的为甲方与原债权人签订的上述《国内保理业务合同》中提供保理服务的应收账款，即原债权人应当向原债务人收取的价款。 </p>
                    <br/>

                    <p style="font-size:14px;line-height:25px;font-weight:bold">第三条 应收账款到期日</p>
                    <p style="font-size:14px;line-height:25px">应收账款期限为：自本合同签署之日起，到期截止日为
                    <span v-text="obj.lastRepayDay"></span>
                    <!--<font color="#FF0000"><span id="end_Y">{}</span> </font>年-->
                    <!--<font color="#FF0000"><span id="end_M">{}</span></font>月-->
                    <!--<font color="#FF0000"><span id="end_D">{}</span></font>日。-->
                    </p>
                    <br/>

                    <p style="font-size:14px;line-height:25px;font-weight:bold">第四条 应收账款转让金额</p>
                    <p style="font-size:14px;line-height:25px">1.乙方受让的应收账款金额为人民币<font color="#FF0000"><span id="daxie1" v-text="obj.tenderAmount"></span></font>。乙方向甲方支付的转让金额为人民币大写<font color="#FF0000"><span id="daxie" v-text="obj.tenderAmountStr"></span></font>（即投资金额）（年化收益率为<font color="#FF0000"><span id="lilv" v-text="obj.borrowApr"></span></font>%；投资期限同应收账款期限）。</p>
                    <p style="font-size:14px;line-height:25px">2.乙方将转让款支付入人众金服平台与乙方约定的<input type="radio"/>第三方支付机构<input type="radio"/>托管银行<input type="radio"/>其他后，甲乙双方同意委托人众金服平台将上述投资金额支付至原债权人银行账号。</p>
                    <br/>

                    <p style="font-size:14px;line-height:25px;font-weight:bold">第五条 应收账款权益转让期间的收取</p>
                    <p style="font-size:14px;line-height:25px">乙方委托甲方作为其代理人，代表乙方从原债务人处收取应收账款。</p>
                    <br/>

                    <p style="font-size:14px;line-height:25px;font-weight:bold">第六条 应收账款回购 </p>
                    <p style="font-size:14px;line-height:25px">1.甲方担保转让给乙方的债权能够按时足额收取；若原债务人未能按期支付，甲方自迟延之日起5个工作日内先行垫付，再以从原债务人处收取的应收账款冲抵甲方垫付资金。如甲方超过30个工作日仍未垫付，则无条件回购乙方从甲方处受让的债权权益。</p>
                    <p style="font-size:14px;line-height:25px">2.甲方回购该应收账款的回购金额=应收账款转让价款+回购溢价款。应收账款转让期间=应收账款回购日-应收账款转让日。</p>
                    <p style="font-size:14px;line-height:25px">3.甲方依据人众金服平台发出的付款通知，将回购资金支付到指定账户即完成回购义务。</p>
                    <br/>

                    <p style="font-size:14px;line-height:25px;font-weight:bold">第七条 逾期利息 </p>
                    <p style="font-size:14px;line-height:25px">1.甲方无法足额向乙方按本合同约定溢价回购应收账款的，应当承担逾期利息，逾期利息的支付方式如下： </p>
                    <p style="font-size:14px;line-height:25px">逾期利息=拖欠款项×逾期天数×逾期利率。</p>
                    <p style="font-size:14px;line-height:25px">拖欠款项是指截止应回购日，应收账款转让款中甲方应当回购而未回购的部分。 </p>
                    <p style="font-size:14px;line-height:25px">逾期天数是指从应回购日（不含当日）起至拖欠款项（包括本金及溢价收益）及逾期利息等清偿完毕之日止（含到账日）的自然日天数。 </p>
                    <p style="font-size:14px;line-height:25px">逾期利率：逾期利率为每日 0.05%。</p>
                    <p style="font-size:14px;line-height:25px">2.逾期期间甲方除罚息外，还应当支付本协议约定的溢价收益，溢价收益按日计算。</p>
                    <br/>

                    <p style="font-size:14px;line-height:25px;font-weight:bold">第八条 应收账款瑕疵担保</p>
                    <p style="font-size:14px;line-height:25px">甲方保证每一笔应收账款均符合以下全部条件： </p>
                    <p style="font-size:14px;line-height:25px">1. 基础合同真实、合法且有效，没有禁止或限制该合同项下的应收账款转让，基础合同中不存在任何不利于乙方行使应收账款项下权利的条款，原债权人已经或将会适当地履行其在基础合同项下的义务； </p>
                    <p style="font-size:14px;line-height:25px">2. 保理合同真实、合法且有效，保理合同没有禁止或限制该合同项下应收账款的再次转让，保理合同中不存其他任何不利于乙方行使应收账款项下权利的条款；</p>
                    <p style="font-size:14px;line-height:25px">3. 甲方已履行了保理合同项下的保理服务义务和其他已到期的义务；</p>
                    <p style="font-size:14px;line-height:25px">4. 每一笔应收账款均不存在任何质押或任何其他担保，也不存在任何权属争议；就已在本合同项下转让给乙方的每一笔应收账款（甲方已回购的应收账除外）而言，甲方不会将其另行转让给任何其他第三人。</p>
                    <br/>

                    <p style="font-size:14px;line-height:25px;font-weight:bold">第九条 应收账款代位追偿权 </p>
                    <p style="font-size:14px;line-height:25px">如出现以下情形，乙方可通过人众金服平台向原债权人和原债务人代位行使追偿权，无需征得甲方同意：</p>
                    <p style="font-size:14px;line-height:25px">1. 本合同约定回购期到期后，甲方未能向乙方溢价回购应收账款。</p>
                    <p style="font-size:14px;line-height:25px">2. 甲方被人民法院宣布破产。</p>
                    <p style="font-size:14px;line-height:25px">3. 原债权人应收账款到期后，甲方怠于行使债权而影响到乙方的合法权利。</p>
                    <br/>

                    <p style="font-size:14px;line-height:25px;font-weight:bold">第十条 再转让通知 </p>
                    <p style="font-size:14px;line-height:25px">本合同签署后，由甲方通知原债务人应收账款转让事宜。</p>
                    <br/>

                    <p style="font-size:14px;line-height:25px;font-weight:bold">第十一条 回购约定</p>
                    <p style="font-size:14px;line-height:25px">甲方完成应收账款回购的同时乙方对原债务人的应收账款债权自动转回至甲方。</p>
                    <br/>

                    <p style="font-size:14px;line-height:25px;font-weight:bold">第十二条 合同的生效、终止和变更</p>
                    <p style="font-size:14px;line-height:25px">1.本合同经甲、乙双方签字、盖章后成立并生效；至本合同项下乙方受让的应收账款、回购溢价费用、逾期利息等清偿完毕之日终止。</p>
                    <p style="font-size:14px;line-height:25px">2.本合同的有效性不因个别条款无效而受影响。</p>
                    <p style="font-size:14px;line-height:25px">3.除本合同另有规定外，任何一方未经另一方书面同意，无权单方面更改合同的任何条款；一方要求对本合同条款进行任何修改，应书面通知另一方，在取得另一方的书面同意后方可进行。</p>
                    <p style="font-size:14px;line-height:25px">4.有关本合同的所有通知、变更等均应采取书面形式。</p>
                    <br/>

                    <p style="font-size:14px;line-height:25px;font-weight:bold">第十三条 风险提示</p>
                    <p style="font-size:14px;line-height:25px">1.政策风险</p>
                    <p style="font-size:14px;line-height:25px">因国家宏观政策、财政政策、货币政策、行业政策、地区发展、法律法规等因素引起的政策风险。</p>
                    <p style="font-size:14px;line-height:25px">2.信用风险</p>
                    <p style="font-size:14px;line-height:25px">如转让人发生资金状况或经营状况的风险，或者转让人的回购意愿发生消极的变化时，乙方可能无法按时获得应收账款项下款项。需经过司法程序对甲方、原债权人及原债务人财产进行清偿后才能收回借款。</p>
                    <p style="font-size:14px;line-height:25px">3.不可抗力</p>
                    <p style="font-size:14px;line-height:25px">由于战争、动乱、自然灾害等不可抗力因素的出现而可能导致乙方无法按时 得应收账款项下款项的风险。</p>
                    <br/>

                    <p style="font-size:14px;line-height:25px;font-weight:bold">第十四条 税务处理</p>
                    <p style="font-size:14px;line-height:25px">乙方在转让过程产生的相关税费，由乙方自行向税务机关申报、缴纳，甲方不负责相关事宜处理。</p>
                    <br/>

                    <p style="font-size:14px;line-height:25px;font-weight:bold">第十五条 保密条款</p>
                    <p style="font-size:14px;line-height:25px">未经双方同意，任何一方不得将本合同内容泄露给第三方（法律、行政法规、司法解释另有规定的情形除外）。</p>
                    <br/>

                    <p style="font-size:14px;line-height:25px;font-weight:bold">第十六条 期日定义</p>
                    <p style="font-size:14px;line-height:25px">本合同中所有涉及的发生日、到期日以及期限日均为自然日。</p>
                    <br/>

                    <p style="font-size:14px;line-height:25px;font-weight:bold">第十七条 争议解决</p>
                    <p style="font-size:14px;line-height:25px">与本合同相关的任何争议双方均可向本合同签订地杭州市西湖区人民法院提起诉讼。</p>
                    <br/>

                    <p style="font-size:14px;line-height:25px;font-weight:bold">第十八条 适用法律、法规</p>
                    <p style="font-size:14px;line-height:25px">本合同适用的是中国的法律、法规和司法解释，以及服务区域的地方法规、地方规章，包括甲方所在地的人民法院对保理业务所做的指导意见、批复。上述 法律、法规、文件没有规定的，适用行业惯例。</p>
                    <br/>
                    <p style="font-size:14px;line-height:25px;font-weight:bold">第十九条 补充约定</p>
                    <p style="font-size:14px;line-height:25px">乙方可将本协议约定的债权转让给第三人，具体转让程序依据人众金服平台规定。</p>
                    <p style="font-size:14px;line-height:25px">本协议一式两份，签章生效（含电子签章）。</p>
                    <br/><br/>

                    <span v-if="obj.borrowProtocolId==113||isZhongJinBao" class="cjrname">上海卓投商业保理有限公司</span>
                    <span v-if="obj.borrowProtocolId==115||isZhongHuiBao" class="cjrname">如裕国际商业保理（深圳）有限公司</span>

                    <p style="fontSize:14px; line-height:40px;position:relative">甲方：
                        <font>
                            <span v-if="obj.borrowProtocolId==113||isZhongJinBao" class="cjrname">上海卓投商业保理有限公司</span>
                            <span v-if="obj.borrowProtocolId==115||isZhongHuiBao" class="cjrname">如裕国际商业保理（深圳）有限公司</span>
                        </font>
                        <img v-if="obj.borrowProtocolId==113||isZhongJinBao" class="seal" src="https://images.51rz.com/images/rebuild/wx/img/zuotou.png"
                             style="position:absolute;left:77px;top:-34px;width:100px"/>
                        <img v-if="obj.borrowProtocolId==115||isZhongHuiBao" class="seal" src="https://images.51rz.com/images/rebuild/wx/img/ruyu.png"
                             style="position:absolute; left:77px;top:-34px;width: 100px"/>
                    </p>
                    <p style="font-size:14px;line-height:40px">乙方：<font><span id="pingtai1" v-text="obj.tenderName"></span></font></p>
                    <p style="font-size:14px;line-height:25px"></p>
                    <p style="font-size:14px;line-height:25px"></p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import API from '@/api'
    import getParam from '@/lib/getParam'
    export default {
        name: 'AgreementAccount',
        data(){
            return {
                borrowProductName:getParam(window.location.href, 'productType'), //113：众金宝  115：众惠宝
                obj:{
                    biaoName:'',
                    borrowProductName:'',
                    borrowProtocolId:'',
                }
            }
        },
        computed:{
//            113：众金宝  115：众惠宝
            isZhongJinBao(){
                return this.$data.obj.borrowProductName.search('众金宝')>=0||this.$data.obj.biaoName.search('众金宝')>=0
            },
            isZhongHuiBao(){
                return this.$data.obj.borrowProductName.search('众惠宝')>=0||this.$data.obj.biaoName.search('众惠宝')>=0
            },
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
        methods: {

        }
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
