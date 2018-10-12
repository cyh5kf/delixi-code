<template>
    <div class="wraper">
        <transition name="scaleUp">
            <div v-show="showContent1" class="content1">
                <header>
                    <div class="card">
                        <div class="title">
                            <div class="title-left">
                                <template>
                                    <label v-text="obj.baseApr"></label>
                                    <template v-if="obj.exApr">
                                        <span><strong v-text="`+${obj.exApr}%`"></strong><i></i></span>
                                    </template>
                                </template>
                                <p class="nh_txt">预期年化收益率</p>
                            </div>
                            <div class="title-right">
                                <p class="timeLimit" v-text="obj.timeLimit"></p>
                                <p class="tzqx">投资期限(<span v-text="obj.borrowTimeType==1?'天':'月'"></span>)</p>
                            </div>
                        </div>
                        <div class="progressWraper">
                            <p class="progress" :style="{width: progressWith}">
                                <span ref="rateText" v-text="rateText"></span>
                            </p>
                        </div>
                        <ul class="msg_ul">
                            <li>
                                <span>项目总额(元)</span>
                                <span class="xmze" v-text="obj.amount.toLocaleString()"></span>
                            </li>
                            <li>
                                <span>剩余可投(元)</span>
                                <span class="sykt" v-text="obj.lastAccount.toLocaleString()"></span>
                            </li>
                        </ul>
                    </div>
                </header>
                <ul class="labels">
                    <li><span class="qitou"></span>
                        <template v-if="!parseInt(obj.mostSingleLimit)">
                            <label v-text="obj.lowestAccount"></label>起投
                        </template>
                        <template v-else>
                            限投<label v-text="obj.mostSingleLimit"></label>
                        </template>
                    </li>
                    <li><span class="jiaxi"></span>满标起息</li>
                    <li><span class="cunguan"></span>银行存管</li>
                </ul>
                <div class="base_msg">
                    <div class="top">

                        <label class="title"><span class="sign"></span>基本信息</label>
                    </div>
                    <ul>
                        <li><span>风险类型</span><i v-text="obj.riskType"></i></li>
                        <li><span>剩余募集时间</span><i v-html="timeLeftTxt"></i></li>
                        <li>
                            <span>还款方式</span>
                            <i v-text="huanKuanTxt"></i>
                        </li>
                        <li v-if="obj.productType!=3"><span>还款提示</span><i>到期本金及收益归至账户余额</i></li>
                        <li v-if="obj.productType==3">
                            <span>还款提示</span>
                            <i>可能提前还款
                                <strong class="question" @click="toggleTip('showHuanKuanMsgTip')"></strong>
                                <Tip class="tip_wraper"
                                     :_style="{width:'5.85rem',height:'1.5rem',top:'0.6rem',left:'1.28rem'}"
                                     :tringle_position="'right'"
                                     :show="showHuanKuanMsgTip"
                                     :close="closeHuanKuanMsgTip">
                                    当R计划内借款标的期限无法匹配R计划期限时，即存在提前还款的可能。提前还款应付本息按实际投资天数计
                                </Tip>
                            </i>
                        </li>
                        <li v-if="obj.category !== 0 && obj.zicoy === 1 && obj.tenderTranfer == 1"><span>可否债转</span><i>支持</i></li>
                        <li v-if="obj.category !== 0 && obj.zicon === 1 && obj.tenderTranfer == 0"><span>可否债转</span><i>不支持</i></li>
                    </ul>

                </div>
            </div>
        </transition>

        <p class="more" v-show="showContent1" @click="toggleContent">
            上滑查看更多项目信息
        </p>

        <transition name="scaleUp1">
            <div v-show="!showContent1" class="content2">
                <TabNav :navs="isRPlan?Rnavs:navs" :click="selectItem" :index="navIndex" class="navs"
                        :gap="'0.3rem'"/>
                <div class="tab_content">
                    <transition-group v-if="!isRPlan" name="fade">

                        <SubProgress key="SubProgress" v-show="navIndex==0"/>
                        <SubTenderDetail key="SubTenderDetail"
                                         :category="obj.category"
                                         v-show="navIndex==1"
                                         :fromWX="1"
                        />
                        <BorrowInfo :productType="productType"
                                    :getPos="onRecordScroll"
                                    :bid="bid"
                                    key="BorrowPerson"
                                    v-show="navIndex == 2"/>
                        <SubRecordLists v-show="navIndex==3" key="SubRecordLists"
                                        :getPos="onRecordScroll"/>
                    </transition-group>
                    <transition-group v-if="isRPlan" name="fade">
                        <SubTenderDetail key="SubTenderDetail"
                                         :category="obj.category"
                                         v-show="navIndex==0"
                                         :fromWX="1"
                        />
                        <BorrowInfo :productType="productType"
                                    :getPos="onRecordScroll"
                                    :bid="bid"
                                    key="BorrowPerson"
                                    v-show="navIndex == 1"/>
                        <SubRecordLists v-show="navIndex==2" key="SubRecordLists"
                                        :getPos="onRecordScroll"/>
                        <RCommonProblem v-show="navIndex==3" key="RCommonProblem"/>
                    </transition-group>
                </div>
            </div>
        </transition>

        <!--底部购标按钮-->
        <div class="bottom_buy_area" v-show="!hideBuyBtn==1">
            <Btn v-if="obj.scales>=100" class="btn_wraper" :label="'已售罄'" :type="'gray'"></Btn>
            <Btn v-if="obj.scales<100&&obj.status!=1&&obj.lastTime>0" class="btn_wraper" :label="'立即投资'"
                :href="'/tender/buy/'+bid+'/'+obj.productType+'/'+obj.category"
                :type="'red'">
            </Btn>
            <Btn v-if="obj.status==1&&obj.downTime" class="btn_wraper" :label="'即将发售'" :type="'wait'"></Btn>
            <Btn v-if="obj.status==1&&!obj.downTime" class="btn_wraper" :label="countDown" :type="'wait'"></Btn>
            <Btn v-if="obj.status==10&&obj.lastTime<=0" class="btn_wraper" :label="'已过期'" :type="'gray'"></Btn>
            <span class="icon" @click="clickCalculator"></span>
            <div class="btn_text">温馨提示：市场有风险，出借需谨慎。</div>
        </div>

        <!--计算器-->
        <VDialog :show="showCalculator" :close="closeCalculator">
            <div class="bomb_cont cal_cont">
                <p class="title">收益计算器</p>
                <div class="cont">
                    <div class="tender_msg">
                        <p><label class="black9">预期年化</label><span class="black5"
                                                                   v-text="(obj.baseApr*1+obj.exApr*1)+'%'"></span></p>
                        <p><label class="black9">投资期限</label><span class="black5" v-text="timeLimitTxt">0个月</span></p>
                    </div>
                    <Inputs :type="'border'">
                        <input type="text" v-model="calMoney" placeholder="请输入投资金额"/>
                        <i class="clear" @click="calMoney=''"></i>
                        <span class="tails">元</span>
                    </Inputs>
                    <p class="result">
                        <label class="black9">预估收益</label>
                        <span class="profit" v-text="huoli">----元</span>
                    </p>
                </div>
            </div>
        </VDialog>
    </div>
</template>
<script>
    import Btn from '@/component/Btn'
    import TabNav from '@/component/TabNav'
    import VDialog from '@/component/Dialog'
    import Inputs from '@/component/Inputs'
    import SubProgress from '@/container/tender/sub/Progress'
    import SubSafeGuard from '@/container/tender/sub/SafeGuard'
    import SubTenderDetail from '@/container/tender/sub/TenderDetail'
    import SubRecordLists from '@/container/tender/sub/RecordLists'
    import RCommonProblem from '@/container/tender/sub/RCommonProblem'
    import API from '@/api'
    import {mapGetters, mapActions} from 'vuex'
    import getParam from '@/lib/getParam'
    import BorrowInfo from '@/container/tender/sub/BorrowInfo'
    import Tip from '@/component/Tip'

    export default {
        name: 'TenderDetail',
        data() {
            return {
                obj: {
                    amount: 0,//募集总金额
                    amountYes: 0,//已募集金额
                    scale: '0',//已募集比例
                    name: '',//标名
                    baseApr: 0,
                    apr: 0,//年利率
                    exApr: 0,//奖励年利率
                    timeLimit: 0,//期限 月 天
                    borrowTimeType: 0,// 0月标 1天标
                    lowestAccount: 0,//起投金额
                    mostAccount: 0,//累计限投金额
                    mostSingleLimit: 0,//单笔限投金额
                    style: 0,//0等额本金 1等额本息2一次还本付息3按月付息，到期还本’
                    startTime: '',//开标时间
                    lastAccount: 0,//剩余可投金额
                    userAccount: 0,//用户可用金额（登录状态下显示）
                    lastTime: 0,//剩余募集时间 单位 ：秒 s
                    rateAll: 0,//购买比例
                    productId: 0,//产品类型
                    category: null,//0：新手标 1：普通标 2：体验标
                    downTime: 0, // 倒计时
                    bshow:'',//提示
                },
                hideBuyBtn: getParam(window.location.href, 'hideBuyBtn'),//是否需要隐藏购买按钮和计算器 从转让详情过来的时候需要这样处理
                rateAll: 0,//购买比例
                rate: 0,//可变动的购买比例
                bid: this.$route.params.bid,//tender id
                productType: this.$route.params.productType,
                showContent1: true,
                showHuanKuanMethodTip: false,//显示还款方式弹框
                showHuanKuanMsgTip: false,//显示还款提示弹框
                navs: [//其他普通标的对应的nav
                    {text: '项目历程'},
                    {text: '产品描述'},
                    {text: '借款信息'},
                    {text: '已投人数'},
                ],
                Rnavs: [//r计划对应的nav
                    {text: '产品描述'},
                    {text: '借款信息'},
                    {text: '已投人数'},
                    {text: '常见问题'},
                ],
                navIndex: 0,
                showCalculator: false,//显示计算器
                calMoney: '',
                pos: {
                    y: 0
                },
                initping: 0, // 剩余时间
            }
        },
        async created(){

            const param = {
                bid: this.bid,
                productType: this.productType
            }
            const dataObj = await API.post(API.borrowDetail, param)
            this.$data.obj = dataObj
            this.$data.rateAll = Math.floor(dataObj.scales) || 0
            this.setCurTenderInfo(dataObj)
            this.$route.meta.setTitle(this.$data.obj.name || '产品')
            if (!this.$data.rateAll) {
                this.$refs.rateText.style.marginLeft = '0'
            }
        },
        mounted() {
            let moveY
            let isStartOnTop = false//是否点击的时候就是顶部
            const _this = this;
            document.addEventListener('touchstart', (e) => {
                const touch = e.touches[0]
                isStartOnTop = !window.scrollY && this.pos.y >= 0
                moveY = touch.clientY
            })

            document.addEventListener('touchmove', (e) => {//手指滑动
                const touch = e.touches[0]
                let curMoveY = touch.clientY
                const scrollY = window.scrollY
                if (curMoveY - moveY > 0) {//向下滑动  显示content1
                    if (!_this.showContent1 && isStartOnTop) {
                        _this.showContent1 = true
                    }
                } else if (curMoveY - moveY < 0) {//向上滑动 显示content2
                    if(_this.getWindowHeight() + _this.getDocumentTop() + 1 >= _this.getScrollHeight()) { //之所以加1是因为某些情况下会有1PX偏差，当然也可以稍微加大更加灵敏
                        if (_this.showContent1) {
                            _this.showContent1 = false
                            _this.navIndex = 0
                        }
                    }
                }
            })

            // 设置倒计时
            const downTime = this.obj.downTime;
            if(downTime) {
                this.initping = parseInt(downTime/1000);
                this.runtime(this.initping);
            }
        },
        watch: {//监听标的购买进度条的数值变化
            rateAll(n, o){
                const aimate = () => {
                    requestAnimationFrame(() => {
                        if (this.rate < this.rateAll) {
                            this.rate += 1
                            aimate()
                        } else {
                            this.rate = this.rateAll
                        }
                    })
                }
                setTimeout(() => {
                    aimate()
                }, 1000)
            }
        },
        methods: {
            ...mapActions([
                'setCurTenderInfo',
            ]),
            toggleTip(key){
                this.$data[key] = !this.$data[key]
            },
            closeHuanKuanMsgTip(){
                this.$data.showHuanKuanMsgTip = false
            },
            selectItem(i){//选中一个tabnav时触发
                this.navIndex = i
                document.body.scrollTop = 0
                this.pos.y = 0
            },
            toggleContent(){//设置显示的content内容
                this.showContent1 = !this.showContent1
            },
            clickCalculator(){//显示计算器
                this.showCalculator = true
            },
            closeCalculator(){
                this.showCalculator = false
            },
            onRecordScroll(pos){//用于记录子组件的滑动位置、避免列表没有在顶部的时候也会导致显示父组件
                this.pos = pos
            },
            // 倒计时开始
            runtime(m){
                setInterval(()=>{
                    this.initping -=1;
                },1000)
            },
            //文档高度
            getDocumentTop() {
                var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
                if (document.body) {
                    bodyScrollTop = document.body.scrollTop;
                }
                if (document.documentElement) {
                    documentScrollTop = document.documentElement.scrollTop;
                }
                scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
                return scrollTop;
            },
            //可视窗口高度
            getWindowHeight() {
                var windowHeight = 0;    if (document.compatMode == "CSS1Compat") {
                    windowHeight = document.documentElement.clientHeight;
                } else {
                    windowHeight = document.body.clientHeight;
                }
                return windowHeight;
            },
            //滚动条滚动高度
            getScrollHeight() {
                var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
                if (document.body) {
                    bodyScrollHeight = document.body.scrollHeight;
                }
                if (document.documentElement) {
                    documentScrollHeight = document.documentElement.scrollHeight;
                }
                scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
                return scrollHeight;
            },
        },
        computed: {

            rateText(){//标的已经购买比例
                return `${this.rate}%`
                return {
                    width: `${this.rate}%`,
                }
            },
            progressWith() { // 进度条宽度
                const rate = this.rate;
                const rateAll = this.rateAll;
                return rate <= 10? '10%': `${this.rate}%`;
            },
            timeLeftTxt(){//标的倒计时文本
                let sec = this.obj.lastTime
                let _formatStr = ""
                if (sec <= 0) {
                    _formatStr = '已结束'
                } else {
                    let _day = Math.floor(sec / (24 * 3600)) || 0
                    let _hour = Math.floor((sec % (24 * 3600)) / 3600) || 0
                    let _min = Math.floor((sec % 3600) / 60) || 0
                    let _sec = Math.floor(sec % 60) || 0
                    _formatStr = `<b style="color: #4992ec;">${_day}</b>天<b style="color: #4992ec;">${_hour}</b>小时<b style="color: #4992ec;">${_min}</b>分<b style="color: #4992ec;">${_sec}</b>秒`
                    setTimeout(() => {
                        this.obj.lastTime = sec - 1
                    }, 1000)
                }

                return _formatStr
            },
            huanKuanTxt(){//还款方式
                const style = {
                    0: '等额本金',
                    1: '等额本息',
                    2: '一次性还本付息',
                    3: '按月付息，到期还本'
                }
                return style[this.obj.style]
            },
            timeLimitTxt(){//投资期限
                if (this.$data.obj.borrowTimeType == 0) {//月标
                    return `${this.$data.obj.timeLimit}个月`
                } else {
                    return `${this.$data.obj.timeLimit}天`
                }
            },
            huoli(){//收益计算器
                /**
                 * type 0等额本金 1等额本息2一次还本付息3按月付息，到期还本’
                 * borrowTimeType 0月份  1天
                 * 等额本息，每月还款本息和：〔贷款本金×月利率×(1＋月利率)＾还款月数〕÷〔(1＋月利率)＾还款月数 -1〕
                 一次性还款（月）：(年利率/12)*月数*本金
                 一次性还款（天）：(年利率/360)*天数*本金
                 */

                var type = this.$data.obj.style
                var huoli_ll = this.$data.obj.baseApr * 1 + this.$data.obj.exApr * 1
                var huoli_days = this.$data.obj.timeLimit
                var borrowTimeType = this.$data.obj.borrowTimeType

                var _m = this.$data.calMoney * 1

                if (isNaN(_m) || _m <= 0) {
                    return '----元'
                }

                if (type == 1) {//等额本息
                    var month = (huoli_ll / 100) / 12
                    var monthApr = Math.pow((1 + month), huoli_days)
                    var monthNum = _m * month * monthApr / (monthApr - 1 )
                    var num = monthNum * huoli_days - _m
                    return num.toString().slice(0, num.toString().indexOf('.') + 3)
                } else {//其他类型
                    if (borrowTimeType == 0) {
                        return (((huoli_ll / 100) / 12) * huoli_days * _m).toFixed(2)
                    } else {
                        return (((huoli_ll / 100) / 365) * huoli_days * _m).toFixed(2)
                    }
                }
            },
            isRPlan() {//是否是R计划
                return this.productType === '3' ? true : false
            },
            // 倒计时时间
            countDown() {
                const initping = this.initping;
                const hour = parseInt(this.initping/3600)>=10?parseInt(this.initping/3600):"0"+parseInt(this.initping/3600);
                const minute = parseInt(this.initping%3600/60)>=10?parseInt(this.initping%3600/60):"0"+parseInt(this.initping%3600/60);
                const second = this.initping%60>=10?this.initping%60:"0"+this.initping%60;
                return `${hour}时 ${minute}分 ${second}秒 后开售`;
            },
        },
        components: {
            Btn,
            TabNav,
            VDialog,
            Inputs,
            SubProgress,
            SubSafeGuard,
            SubTenderDetail,
            SubRecordLists,
            RCommonProblem,
            BorrowInfo,
            Tip,
        }
    }
</script>
<style lang="scss" scoped>
    .wraper {
        @include box((p:0 0 1.8rem));
    }

    .question {
        @include box((d:inline-block, w:0.34rem, h:0.34rem, m:0 0 0 0.1rem));
        @include bg_img('icon_question.png');
        position: relative;
    }

    .i {
        $yellow: $red;
        @include box((d:block, m:0 0 0 -0.35rem, ta:center, fs:0.18rem, w:0.7rem, lh:0.3rem, h:0.3rem, bdr:0.26rem, c: #fff, bg:$yellow));

        &:after {
            @include tringle((to:bottom, c:$yellow, w:0.08rem, h:0.06rem));
            @include box((m:0 0 0 -0.04rem));
            @include position((p:absolute, b:-0.03rem, l:50%));
        }
    }

    header {
        @include box((w:7.5rem, p:0.5rem 0 0));
        @include position((p:relative));
        background-color: #FE6045;
        background-image: url("#{$base_url}tender_wave_bg2.png");
        background-size: cover;
        background-repeat: no-repeat;
        background-position: bottom;

        .card {
            margin: 0 0.2rem;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
            padding: .5rem .3rem .44rem
        }

        .title {
            @include box((c:$white));
            overflow: hidden;

            .title-left, .title-right {
                float: left;
                letter-spacing: -1px;
            }

            .title-left {
                border-right: 1px dashed #e5e5e5;
                width: 52%;
                label {
                    @include box((fs:0.68rem, c: $red));
                }
                span {
                    @include box((fs:0.34rem, c: $red));
                    margin-left: -0.02rem;
                    @include position((p:relative));
                    strong {
                        font-weight: 500;
                        letter-spacing: -1px;
                    }
                    i {
                        width: 0.45rem;
                        height: 0.3rem;
                        background-image: url("#{$base_url}icon-reward.png");
                        background-size: 100% 100%;
                        background-repeat: no-repeat;
                        @include position((p:absolute, r: -0.48rem, t: 0.04rem));
                    }
                }
                .percent {
                    font-weight: 500;
                    letter-spacing: -1px;
                }
                .icon_qj {
                    position: relative;
                    top: -0.05rem;
                    font-size: 0.4rem;
                }
            }

            .title-right {
                padding-left: .3rem;
                width: 48%;
                .timeLimit {
                    color: #222;
                    font-size: 0.68rem;
                }
                .tzqx {
                    @include box((c: $black9, fs:0.24rem));
                    margin-top: -0.08rem;
                }
            }
        }
        .nh_txt {
            @include box((c: $black9, fs:0.24rem));
            padding-left: 0.1rem;
            margin-top: -0.08rem;
        }
        .msg_ul  {
            @include box((c:$black9, fs: 0.24rem));
            margin-top: 0.3rem;
            overflow: hidden;
            li {
                position: relative;
                float: left;
                width: 50%;

                &:first-child {
                    text-align: left;
                }

                &:last-child {
                    text-align: right;
                }
                span:last-child {
                    margin-left: 0.1rem;
                    font-size: .28rem;
                }
                .xmze {
                    color: $black5;

                }
                .sykt {
                    color: $red;
                }
            }
        }
        .progressWraper {
            @include box((h:0.02rem, bg:#e5e5e5, m:0.5rem 0 0));
            .progress {
                @include position((w: 100%,p:relative, b:0, l:0));
                //@include box((h:0.04rem, bg:-webkit-gradient(linear, 0 0, right 0, from(#FFBDAD), to(#FFF0DA))));
                @include box((h:0.02rem, bg:$red));
                span {
                    @extend .i;
                    @include position((p:absolute, r: 0rem, t:-0.15rem));
                    &:after {
                        @include tringle((to:bottom, c:$red, w:0, h:0));
                    }
                }
            }
        }
    }

    .labels {
        @include box((h:1.85rem, bg:$white, p:0.34rem 0 0, ta:center, d:flex));
        li {
            @include box((fs:0.28rem, lh:0.4rem, c:$black5));
            flex: 1;
            span {
                @include box((d:block, w:0.68rem, h:0.68rem, m:0 auto 0.1rem));
            }
            .qitou {
                @include bg_img('tender2_100.png')
            }
            .jiaxi {
                @include bg_img('tender_jiaxi2.png')
            }
            .cunguan {
                @include bg_img('tender_cunguan2.png')
            }
        }
    }

    .base_msg {
        @include box((bg:$white, p:0 0 0 0.3rem, m:0.2rem 0 0));

        .top {
            overflow: hidden;
        }
        .sign {
            width: .15rem;
            height: .15rem;
            display: block;
            float: left;
            border-radius: 50%;
            background-color: #ffc31b;
            box-shadow: 0 0 6px rgba(255, 195, 27, .6);
            margin: 0.14rem 0.16rem 0 0;
        }
        .title {
            @include box((c:$black2, d:block, p: 0.4rem 0 0.18rem 0));
            font-size: .32rem;
            float: left;
        }
        ul {
            @include box((p:0 0 0.15rem 0));
        }
        li {
            @include box((lh:0.66rem, p:0 0.3rem 0 0));
            position: relative;
            span {
                @include box((c:$black9));
            }
            i {
                @include box((c:$black5, fl:right));
            }
        }
    }

    .more {
        @include box((lh:0.84rem, ta:center, c:$black9, fs:0.26rem));
        &:before {
            content: '';
            @include box((d:inline-block, w:0.32rem, h:0.32rem));
            @include bg_img('icon_arrow_up_double.png');
            vertical-align: middle;
        }
    }

    .navs {
        @include position((p:fixed, t:0, z:1));
    }

    .content2 {
        position: absolute;
        left: 0;
        top: 0;
        @include box((p:1.08rem 0 2rem, w:100%, h:100%));
    }

    .tab_content {
        @include box((p:0, w:7.5rem, h:100%));
        position: relative;
    }

    .scaleUp-enter-active, .scaleUp-leave-active {
        transition: all ease 400ms;
    }

    .scaleUp-enter, .scaleUp-leave-to {
        transform: translateY(-100%);
    }

    .scaleUp1-enter-active, .scaleUp1-leave-active {
        transition: all ease 400ms;
    }

    .scaleUp1-enter, .scaleUp1-leave-to {
        transform: translateY(100%);
    }

    .bottom_buy_area {
        @include box((h:1.7rem, w:100%, bg:$white, p:0 0 0 0.94rem));
        @include thin(top, #e5e5e5);
        @include position((p:fixed, l:0, b:0, z:4));
        p {
            @include box((lh:0.86rem, ta:center, c:$black9, fs:0.28rem));
            span {
                @include box((c:$red));
            }
        }
        .btn_wraper {
            @include box((p:0 0.3rem));
            margin-top: 0.24rem;
        }
        .icon {
            @include box((d:block, w:0.82rem, h:0.82rem));
            @include position((p:absolute, l:0.27rem, t:0.24rem));
            @include bg_img('icon_calculator.png')
        }
        .btn_text{
            width:100%;
            text-align:center;
            font-size:0.22rem;
            padding:0.1rem 0 0.2rem 0;
            color:#555;
            display:inline-block;
        }
    }

    /*计算器*/
    .cal_cont {
        .title {
            @include box((lh:1.06rem, ta:center, fs:0.32rem, c:$black2));
            @include thin(bottom, #e5e5e5);
        }
        .cont {
            @include box((p:0.1rem 0.3rem 0.34rem 0.3rem));
        }
        .tender_msg {
            @include box((lh:0.9rem, d:flex, fs:0.28rem));
            p {
                flex: 1;
                span {
                    margin-left: 0.25rem;
                }
            }
        }
        .result {
            @include box((fs:0.28rem, lh:0.8rem, m:-0.4rem 0 0 0));
            .profit {
                @include box((c:$red, m:0 0 0 0.25rem));
            }
        }
        .clear {
            @include box((w:0.6rem, h:0.6rem, m:0.1rem 0.15rem 0 0));
            @include bg_img('close.png');
        }
        .tails {
            @include box((c:$black9, p:0 0.3rem 0 0));
        }
        .profit_table {
            ul {
                height: 0.8rem;
                line-height: 0.8rem;
                border-bottom: 1px solid #e5e5e5;

                li {
                    width: 23%;
                    color: $black5;
                    font-size: 0.24rem;
                    display: inline-block;
                    text-align: center;

                    &:first-child {
                        text-align: left;
                        padding-left: 0.1rem;
                    }

                    &:last-child {
                        text-align: right;
                    }
                }

                &:first-child li {
                    color: $black2;
                    font-size: 0.28rem;
                }
            }
        }
    }


</style>
