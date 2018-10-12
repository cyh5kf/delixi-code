<template>
    <div class="wraper">
        <section>
            <p v-text="curTenderInfo.name"></p>
            <h4>
                <span>投资期限 <i v-text="timeLimitTxt"></i></span>
                <span>剩余可投 <i v-text="UnitWan(curTenderInfo.lastAccount)"></i>元</span>
            </h4>
        </section>
        <div class="buy_area">
            <p class="title">投资金额</p>
            <div class="buy_row">
                <span>¥</span>
                <input type="text"
                       maxlength="7"
                       v-model="moneyInput"
                       :placeholder="placeholder"
                >
                <label @click="fillMaxMoney">余额最大</label>
            </div>
            <p class="footer">
                账户余额<span v-html="curTenderInfo.userAccount || '0.00'"></span>元
            </p>
        </div>
        <div class="award_area">
            <p class="arrow_item" v-show="curTenderInfo.discount!=0" @click="showCoupon">
                <span>优惠券</span>
                <label class="no" v-if="!hasCouponToUse">暂无可用优惠券</label>
                <label v-if="!curCoupon&&hasCouponToUse" class="has">
                    <!--选择可用优惠券-->
                    有<span v-text="curTenderInfo.list.length"></span>张优惠券可用
                </label>
                <label class="yes" v-if="hasCouponToUse &&　curCoupon" v-text="selectedText"></label>
            </p>
            <p class="footer">历史收益 <span v-text="profitTxt">----</span></p>
        </div>
        <p class="msg"><span class="circle"></span>提示：投资后红包金额将返还至您的账户余额</p>
        <div class="tipHg_text" v-if="curTenderInfo.show" v-text="curTenderInfo.show"></div>
        <p class="buyBtnWraper">
            <Btn :label="'立即投资'" :type="'red'" :click="confirmSubmit"/>
            <span class="btn_text">温馨提示：市场有风险，出借需谨慎。</span>
        </p>

        <div class="msg" v-if="(curTenderInfo.proList||[]).length">
            <p>同意签署</p>
            <div class="pro">·
                <router-link v-for="(item,index) in curTenderInfo.proList||[]"
                             :key="index"
                             v-text="'《'+item.name+'》'" :to='"/tender/protocol/"+item.id'>
                </router-link>
            </div>
        </div>
        <!--<div class="amount_area">-->
        <!--<p>-->
        <!--实际支付(元)-->
        <!--<label>6,554.02</label>-->
        <!--</p>-->
        <!--<span class="btn" @click="confirmSubmit">确认投资</span>-->
        <!--</div>-->

        <VDialog :show="showNoPayPassDialog" :disableShadeClose="true" :disableCloseBtn="true">
            <div class="no_paypass_bomb_cont">
                <div class="normal_txt">
                    <p>为保证您的账户安全</p>
                    <p>请先设置交易密码</p>
                </div>
                <p class="btns_bottom">
                    <span @click="closeNoPayPassDialog">取消</span>
                    <router-link tag="span" to="/my/setPwd/3">设置</router-link>
                </p>
            </div>
        </VDialog>

        <!--优惠券 toast-->
        <Toast :show="showCouponToast" v-on:msg="changeCouponToast" :onlyslot="true">
            <div class="toast_wraper">
                <p class="title">
                    <span class="close" @click="changeCouponToast(false)"></span>选择优惠券
                    <span class="not_use" @click="doNotUseCoupon">不使用优惠券</span>
                </p>
                <div class="toast_lists">
                    <RedPacketCard :couponType="card.type" :key="index"
                                   :cardData="card"
                                   :status="0"
                                   v-for="(card,index) in couponLists"
                                   :clickType="'select'" :circleBg="'white'" @click.native="selectCoupon(card)"
                                   class="coupon_card">
                        <span v-show="card==curCoupon" class="select_icon"></span>
                    </RedPacketCard>
                </div>
            </div>
        </Toast>

        <!--输入支付密码弹框-->
        <VDialog :show="showBomb" :close="closeConfirmPass">
            <div class="bomb_cont">
                <Inputs :type="'border'">
                    <input type="password" v-model="payPassval" placeholder="请输入支付密码"/>
                    <router-link to="/resetPwd/2">忘记密码？</router-link>
                </Inputs>
                <Btn :label="'确认'" :type="'red'" :click="confirmPass"/>
            </div>
        </VDialog>

        <!--风险测评弹窗-->
        <VDialog :show="showRisk" :close="closeRisk">
            <div class="test_cont">
                <p>应监管要求，投资前须完成风险承受能力评估。为不影响投资，请您尽快测评。</p>
                <Btn :label="'立即评估'" :type="'red'" :href="'/my/risk'"/>
            </div>
        </VDialog>
        <!--风险提示告知书弹窗-->
        <VDialog :show="showTips" :close="closeTips" :_style="'top:10%'">
            <div class="rist_cont">
                <h3>风险提示告知书</h3>
                <div class="cont">
                    <h4>一、	政策风险</h4>
                    <p>因国家宏观政策和相关法律法规发生变化，影响人众金服各类产品项目及服务计划的正常提供。</p>
                    <h4>二、	信用风险</h4>
                    <p>
                        人众金服不对投资项目本金和收益提供任何保证或承诺。在发生最不利情况下（可能但并不一定发生），可能不利于用户实现项目的历史收益甚至本金遭受损失。
                    </p>
                    <h4>三、	市场风险</h4>
                    <p>
                        由于市场供求关系、利率变动、资产价值波动等不确定的未来市场变化，在发生最不利情况下（可能但并不一定发生），可能不利于用户实现项目的历史收益甚至本金遭受损失。
                    </p>
                    <h4>四、	信息传递风险</h4>
                    <p>
                        人众金服将按协议约定进行信息披露，用户应充分关注并及时主动查询项目相关信息，如未及时查询，或由于通讯故障、系统故障以及其他不可抗力等因素的影响使得无法及时了解产品信息，由此产生责任和风险应由用户承担。</p>
                    <h4>五、	促成失败风险</h4>
                    <p>本次交易的促成需符合相关法律法规的规定和借款合同的约定，可能存在不能满足成立条件从而导致无法促成交易的风险。</p>
                    <h4>六、	操作风险</h4>
                    <p>
                        1.不可预测或无法控制的系统故障、设备故障、通讯故障、停电等突发事故将有可能给出借人造成一定损失。因上述事故造成交易或交易数据中断，恢复交易时以事故发生前系统最终记录的交易数据为有效数据；<br/>
                        2.由于出借人密码失密、操作不当、决策失误、黑客攻击等原因可能会造成出借人损失；<br/>
                        3.网上交易热键操作完毕未及时退出，委托他人代理交易，或长期不关注账户变化等致使他人进行恶意操作均将可能造成出借人损失。
                    </p>
                    <h4>七、	经营风险</h4>
                    <p>
                        人众金服承诺将按照相关法律法规的规定进行运营及管理，但会存在因法律法规根据社会需求调整而无法保证符合相关法律和监管部门的要求的现象。如人众金服无法继续经营网络借贷信息中介业务或发生重大业务调整，或财产状况发生重大变化，则可能会对出借人产生不利影响。
                    </p>
                    <h4>八、	提前退出风险</h4>
                    <p>
                        在用户投资项目或服务计划存续期间，可能因无匹配的借款项目或人众金服为保护用户投资本金安全提前退出投资项目或服务计划。
                    </p>
                    <h4>九、	流动性风险</h4>
                    <p>
                        在用户投资后的项目或服务计划存续期内，用户可能不能提前转出资金（具体以服务协议或借款协议约定为准）。
                    </p>
                    <h4>十、	不可抗力及意外事件风险</h4>
                    <p>
                        包括但不限于自然灾害、金融市场危机、战争、黑客攻击、病毒感染等不能预见、不能避免、不能克服的不可抗力事件，对于由于不可抗力及意外事件风险导致的任何损失，用户须自行承担。<br/>
                        <strong>特别提示：</strong>前述风险提示不能穷尽全部风险及市场的全部情形。请用户仔细阅读本风险提示告知书，并独立作出是否接受服务和出借的决定。您已知悉并理解出借的全部风险，并自愿承担由此带来的一切后果。
                    </p>
                </div>
                <Btn :label="'同意'" :type="'red'" :click="toTest"/>
            </div>
        </VDialog>

    </div>
</template>
<script>
    import Toast from '@/component/Toast'
    import RedPacketCard from '@/component/RedPacketCard'
    import VDialog from '@/component/Dialog'
    import Inputs from '@/component/Inputs'
    import Btn from '@/component/Btn'
    import API from '@/api'
    import MD5 from 'blueimp-md5'
    import SHA256 from 'sha256'
    import {mapGetters, mapActions} from 'vuex'
    export default {
        name: 'Buy',
        data() {
            return {
                bid: this.$route.params.bid,//tender id
                productType: this.$route.params.productType,
                moneyInput: '',
                curCoupon: null,//当前选中的红包
                showCouponToast: false,//是否显示红包列表的toast
                showNoPayPassDialog: false,//提示未设置过交易密码
                showBomb: false,//是否显示输入密码弹框
                showTips: false,//是否显示风险提示告知书弹窗
                showRisk:false,//是否显示风险测评弹窗
                payPassval: '',//支付密码
                curTenderInfo: {//当前标的的详情
                    responceRiskDto:{}
                },
                category: this.$route.params.category
            }
        },
        async mounted(){
            const param = {
                bid: this.$data.bid,
                productType: this.$data.productType
            }
            const dataObj = await API.post(API.borrowDetail, param)
            this.$data.curTenderInfo = dataObj
        },
        methods: {
            ...mapActions([
                'showMsg',
            ]),
            showCoupon(){
                if (this.hasCouponToUse) {//有可用加息券
                    this.showCouponToast = true
                }
            },
            changeCouponToast(val){
                this.showCouponToast = val
            },
            selectCoupon(card){
                this.curCoupon = card
                this.showCouponToast = false
//                if (card == this.curCoupon) {//点击切换选中状态
//                    this.curCoupon = null
//                } else {
//                    this.curCoupon = card
//                }
            },
            doNotUseCoupon(){//不使用优惠券
                this.curCoupon = null
                this.showCouponToast = false
            },
            fillMaxMoney(){//填充输入框的最大可投资额度
                // 最小起投100块  账户余额 1021.05   那么返回1000元
                let minMoney = Math.min(this.curTenderInfo.userAccount, this.curTenderInfo.lastAccount) || '0'
                minMoney = Math.floor(minMoney / this.curTenderInfo.lowestAccount)
                this.moneyInput = minMoney * this.curTenderInfo.lowestAccount
            },
            UnitWan(num){
                return num * 1 >= 10000 ? (num / 10000) + '万' : num
            },
            confirmSubmit(){//点击底部确认按钮  弹出输入支付密码弹框

                //没有同意风险提示告知书
                if (this.curTenderInfo.responceRiskDto.riskFlag=='0') {
                    this.showTips = true;
                    return;
                }
                if(this.curTenderInfo.responceRiskDto.riskFlag!='0'&&this.curTenderInfo.responceRiskDto.riskNumber=='0'){
                    this.showRisk=true;
                    return;
                }

                const moneyReg = /^\d+(\.\d{1,2})?$/
                let moneyInput = this.moneyInput * 1 //输入框输入金额
                const {
                    lowestAccount = 100,
                    userAccount,
                    lastAccount,
                    lowestSingleLimit,
                } = this.curTenderInfo

                if (!this.info.isPayPasWord) {//没有设置交易密码
                    this.$data.showNoPayPassDialog = true
                    return
                }

                if (!moneyInput) {
                    this.showMsg('请输入投资金额')
                    return;
                } else {
                    if (!moneyReg.test(moneyInput)) {
                        this.showMsg('请输入正确的投资金额')
                        return
                    } else {//输入了正确的数字
                        if (moneyInput < (lowestAccount * 1)) {
                            this.showMsg(`输入金额不能小于${lowestAccount}！`)
                            return
                        }
                        if (moneyInput % lowestSingleLimit !== 0) {
                            this.showMsg(`请输入${lowestSingleLimit}的整数倍`)
                            return
                        }

                        if (moneyInput > (userAccount * 1)) {
                            this.showMsg('输入金额不能大于账户余额！')
                            return
                        }
                        if (moneyInput > (lastAccount * 1)) {
                            this.showMsg('输入金额不能大于剩余可投金额！')
                            return
                        }
//                        if (moneyInput >= 10000000) {//不能超过7位数
//                            this.showMsg('输入金额不能超过7位数！')
//                            return
//                        }
                        this.showBomb = true
                        this.payPassval = ''
                    }
                }
            },
            closeConfirmPass(){
                this.showBomb = false
            },
            closeTips(){
                this.showTips = false
            },
            closeRisk(){
                this.showRisk = false;
            },
            async toTest(){
                const agree=await API.post(API.agreeRisk,{token:this.info.token});
                if (!this.info.riskScore) {
                    this.$router.push('/my/risk');
                } else {
                    this.showTips = false;
                    window.reload();
                }
            },
            closeNoPayPassDialog(){
                this.showNoPayPassDialog = false
            },
            async confirmPass(){//确认交易密码
                let data = {
                    bid: this.bid,
                    money: this.moneyInput * 1,
                    couponId: this.curCoupon && this.curCoupon.id,
                    type: this.curCoupon && this.curCoupon.type,
                    tender_type: 2,
                    payPassword: SHA256(MD5(this.payPassval)),
                    productType: this.$route.params.productType,
                }
                if (this.category == 0) {
                    data.category = 0
                }
                await API.post(API.borrowTender, data)
                this.$router.push('/tender/buySuccess')
            }
        },
        computed: {
            ...mapGetters([
//                'curTenderInfo',
                'info'
            ]),
            hasCouponToUse(){//是否有优惠券可用
                return this.curTenderInfo.list && this.curTenderInfo.list.length > 0
            },
            placeholder(){
                const lowestSingleLimit = this.curTenderInfo.lowestSingleLimit || 1 //投资金额倍数
                return `金额为${lowestSingleLimit}的整数倍`
            },
            couponLists(){
                let lists = this.curTenderInfo.list || []

                lists.map((item, index) => {
                    item.couponType = item.type//1 红包  2 加息券
                    item.up = item.discountItem//加息或者红包金额
                    item.status = 0
                    item.statusType = 0
                    item.endTimes = item.endTime
                })
                return lists
            },
            selectedText(){
                if (this.curCoupon) {//选中有红包和加息券
                    const {type} = this.curCoupon
                    if (type == 1) {//红包
                        return `红包${this.curCoupon.up}元`
                    } else if (type == 2) {//加息券
                        return `加息${this.curCoupon.up}%`
                    }
                }
            },
            profitTxt(){//收益计算
                const moneyReg = /^\d+(\.\d+)?$/
                let moneys = this.moneyInput//输入框输入金额
                if (!moneys) {
                    return '----'
                }
                let income = '0.00'
                let {
                    timeLimit,//期限
                    borrowTimeType,// 0月标 1天标
                    apr,
                    baseApr,
                    exApr
                } = this.curTenderInfo
                let days = borrowTimeType == 0 ? timeLimit * 30 : timeLimit

                let {
                    useDate,//可加息天数
                    useTimeLimit,//可使用标的天数
                    rateAmount,//
                    up,//加息值
                    type,//1、红包 2、 加息劵
                } = this.$data.curCoupon || {}

                income = 0.00 //加息券的收益
                let basicIncome = moneys * (baseApr * 1 + exApr * 1) * days * 0.01 / 365
                if (type == 1) {//使用红包
                    return `${(up + basicIncome).toFixed(2)}(包含红包${up}元)`
                } else if (type == 2) {//使用加息券
                    if (!rateAmount) {//金额限制
                        //全额加息
                        if (useDate == 0) {
                            //无时间限制
                            income = moneys * up * days / 365
                        } else {
                            //有时间限制
                            let useFulDays = Math.min(useDate, days)
                            income = moneys * up * useFulDays / 365
                        }
                    } else {//部分金额加息
                        let usefulMoney = Math.min(moneys, rateAmount)

                        if (useDate == 0) {
                            //无时间限制(只算加息的金额)
                            income = usefulMoney * up * days / 365
                        } else {
                            //有时间限制
                            let useFulDays = Math.min(useDate, days)
                            income = usefulMoney * up * useFulDays / 365
                        }
                    }
                    let jxProfit = income / 100
                    income = basicIncome + jxProfit
                    return `${income.toFixed(2)}元 (包含加息券收益${jxProfit.toFixed(2)}元)`

                } else {//不使用优惠券
                    return `${basicIncome.toFixed(2)}元`
                }

            },
            timeLimitTxt(){//投资期限
                const {
                    borrowTimeType,//0 月标  1 天标
                    timeLimit
                } = this.curTenderInfo
                return borrowTimeType == 0 ? timeLimit + '个月' : timeLimit + '天'
            },
        },
        components: {
            Toast,
            RedPacketCard,
            VDialog,
            Inputs,
            Btn
        }
    }
</script>
<style lang="scss" scoped>

    section {
        @include box((m:0.2rem 0, bg:$white, p:0.26rem 0.3rem 0.3rem, fs:0.28rem, lh:0.4rem));
        p {
            @include box((c:$black5, m:0 0 0.25rem));
        }
        h4 {
            @include box((c:$black2, d:flex));
            font-weight: normal;
            span {
                flex: 1;
            }
        }
    }

    .buy_area {
        @include box((p:0.27rem 0 0 0.3rem, bg:$white));
        .title {
            @include box((lh:0.4rem, fs:0.28rem, c:$black5, m:0 0 0.16rem));
        }
        .mostLimit {
            @include box((fs:0.24rem, c:$red, m:0 0 0 0.12rem));
        }
        .buy_row {
            @include box((p:0.23rem 0, d:flex, lh:0.56rem));
            span {
                @include box((w:1.1rem, fs:0.64rem, c:$black2, ta:center));
            }
            input {
                @include box((fs:0.4rem, c:$black2));
                flex: 1;
                &::-webkit-input-placeholder, &::input-placeholder {
                    color: #ccc;
                }
            }
            label {
                @include box((w:2.6rem, h:0.54rem, bdr:0.1rem, fs:0.28rem, ta:center, c:$blue, m:0 0.3rem 0));
                @include thin(all, $blue);
            }
        }
        .footer {
            @include box((lh:0.8rem, fs:0.24rem, c:$black9));
            @include thin(top, #e5e5e5);
            span {
                @include box((c:$red, m:0 0 0 0.1rem));
            }
        }
    }

    .award_area {
        @include box((p:0 0 0 0.3rem, bg:$white, m:0.2rem 0));
        .title {
            @include box((lh:0.8rem, fs:0.28rem));
        }
        .arrow_item {
            @include box((lh:1rem));
            @include thin(bottom, #e5e5e5);
            position: relative;
            &:after {
                $size: 0.3rem;
                content: '';
                @include box((w:$size, h:$size, d:block, m:- $size / 2 0 0));
                @include position((p:absolute, r:0.22rem, t:50%));
                @include bg_img('icon_arrow_right.png');
            }
            span {
                @include box((fs:0.28rem, c:$black2));
            }
            label {
                @include box((fs:0.26rem, fl:right, p:0 0.6rem 0 0));
                &.yes {
                    @include box((c:$red));
                }
                &.no {
                    @include box((c:#ccc));
                }
                &.has {
                    @include box((c:$blue));
                    & > span {
                        @include box((c:$red));
                    }
                }
            }
        }
        .footer {
            @include box((lh:0.8rem, ta:right, p:0 0.3rem 0, fs:0.24rem, c:$black5));
        }
    }

    .msg {
        p {
            float: left;
        }
        @include box((c:$black9, fs:0.2rem, lh:0.28rem, p:0.1rem 0.3rem));
        .pro {
            float: left;
        }
        a {
            @include box((c:$blue, d:block, m:0.03rem 0.2rem 0 0));
            &:first-child {
                margin-top: 0;
            }
        }
        .circle {
            $size: 0.16rem;
            @include box((d:inline-block, w:$size, h:$size, bdr:50%, m:0 0.1rem 0 0));
            @include bg_img('tender_detail/icon_circle_circle.png');
        }
    }

    .buyBtnWraper {
        @include box((m:0.38rem 0.3rem 0.17rem 0.3rem));
        .btn_text{
            width:100%;
            font-size:0.22rem;
            color:#555;
            text-align:center;
            display:inline-block;
            padding:0.1rem 0 0 0;
        }
    }

    .amount_area {
        @include box((w:100%, h:0.88rem, lh:0.88rem, bg:$white, d:flex));
        @include position((p:fixed, l:0, b:0, z:0));
        p {
            @include box((p:0 0.8rem 0 0.3rem, fs:0.3rem, c:$black2));
            flex: 1;
            label {
                @include box((fl:right, fs:0.32rem, c:$red));
            }
        }
        .btn {
            @include box((w:2.4rem, bg:$red, c:$white, ta:center));
        }
    }

    .coupon_card {
        @include box((m:0.3rem 0));
    }

    .toast_wraper {
        @include box((bg:$white));
        .title {
            $H: 0.42rem;
            @include box((ta:center, fs:0.3rem, lh:$H, p:0.3rem 0, c:$black2));
            border-bottom: 0.02rem solid #e5e5e5;
            position: relative;
            .close {
                @include box((w:0.34rem, h:0.34rem, d:block));
                @include bg_img('icon_close.png');
                @include position((p:absolute, t:0.34rem, l:0.34rem));
            }
            .not_use {
                @include box((lh:1.02rem, fs:0.28rem, c:$black2));
                @include position((p:absolute, t:0, r:0.2rem));
            }
        }
        .toast_lists {
            @include box((p:0.3rem 0.3rem));
            max-height: 6.3rem;
            overflow-y: auto;
            .select_icon {
                @include box((w:0.44rem, h:0.44rem, d:inline-block, m:0 0.3rem 0 0));
                @include bg_img('tender_detail/icon_select_packet.png');
            }
        }
    }

    .tipHg_text{
        width:100%;
        padding:0 .4rem 0 0.4rem;
        color:#4992ec;
        font-size:0.2rem;
        display:inline-block;
    }

    .bomb_cont {
        @include box((p:0.85rem 0.3rem 0.4rem));
    }

    .rist_cont {
        @include box((p:0.4rem 0.2rem 0.4rem 0.3rem));
        h3 {
            @include box((fs:0.32rem, c:#222, ta:center, fw:500));
        }
        h4 {
            @include box((fs:0.24rem, c:#222, fw:500))
        }
        .cont {
            p {
                @include box((fs:0.24rem, c:#555))
            }
            @include box((h:5.8rem));
            margin: 0.3rem 0;
            overflow: scroll;
        }
    }

    .test_cont {
        @include box((p:3.2rem 0.3rem 0.4rem));
        background: url(https://images.51rz.com/images/rebuild/wx/img/test_tip.png) center 0.5rem no-repeat;
        background-size: 3.82rem 2.05rem;
        p {
            @include box((fs:0.28rem, c:#555));
            margin-bottom: 0.6rem;
        }
    }

    .btns_bottom {
        @include box((d:flex, p:0.24rem 0));
        @include thin(top, #e5e5e5);
        span {
            flex: 1;
            @include box((d:block, lh:0.5rem, ta:center, fs:0.32rem, c:$black2));
            &:first-child {
                color: $black5;
                @include thin(right, #e5e5e5)
            }
        }
    }

    .no_paypass_bomb_cont {
        &:before {
            content: '';
            @include box((d:block, w:2.08rem, h:1.2rem, m:-0.5rem 0 0 1.87rem));
            @include bg_img('my/recharge_set_pay_pass.png');
        }
        .normal_txt {
            @include box((p:0.6rem 0 1rem 0, lh:0.4rem, fs:0.28rem, c:$black5, ta:center));
        }
        .btns_bottom {
            @extend .btns_bottom;
        }
    }
</style>