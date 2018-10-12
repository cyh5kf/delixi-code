<template>
    <div class="wraper">
        <section class="figure">
            <div class="title">
                <p class="left">总资产(元)
                    <strong>
                        <i class="question" @click="toggleTip('showZiChanTip')"></i>
                        <Tip class="tip_wraper" :_style="{width:'3rem'}" :show="showZiChanTip" :close="closeZiChanTip">
                            总资产包括可用余额、待收本息和提现处理中
                        </Tip>
                    </strong>
                <p class="right" v-text="totalBal.toLocaleString()"></p>

            </div>
            <div class="leiji">
                累计收益 <span v-text="addInterest.toLocaleString()"></span>
            </div>
            <div class="content">
                <div class="circle_wraper" ref="canvas_wraper">
                    <canvas ref="canvas"></canvas>
                </div>
                <div class="right_msg">
                    <ul>
                        <li>
                            <span>可用余额</span>
                            <label v-text="circle.balance.num.toLocaleString()">00.00</label>
                        </li>
                        <li>
                            <span>待收本息</span>
                            <label v-text="circle.capital_interest.num.toLocaleString()">00.00</label>
                        </li>
                        <li>
                            <span>提现处理中</span>
                            <label v-text="circle.waiting.num.toLocaleString()">00.00</label>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
        <div class="text_area">
            <div class="title">
                <p class="left">可用余额(元)</p>
                <p class="right" v-text="circle.balance.num.toLocaleString()">00.00</p>
            </div>
            <ul>
                <li>
                    <span>可提现金额</span>
                    <label v-text="avlBal.toLocaleString()">00.00</label>
                </li>
                <li>
                    <span>
                        待入账金额
                        <strong>
                            <i class="question" @click="toggleTip('showDaiRuZhangTip')"></i>
                            <Tip class="tip_wraper"
                                 :_style="{width:'4rem'}"
                                 :show="showDaiRuZhangTip"
                                 :close="closeDaiRuZhangTip">
                                待入账金额可用于投资，不可提现，不能承接债权转让，待T+1日银行资金清算入账后方可提现
                            </Tip>
                        </strong>
                    </span>
                    <label v-text="roadBal.toLocaleString()">00.00</label>
                </li>
            </ul>
            <div class="title">
                <p class="left">待收本息(元)</p>
                <p class="right" v-text="circle.capital_interest.num.toLocaleString()">00.00</p>
            </div>
            <ul>
                <li v-for="item in ciList">
                    <span v-text="item.name">**众金宝</span>
                    <label v-text="item.money.toLocaleString()+interest(item)">00.00</label>
                </li>
            </ul>
            <div class="title">
                <p class="left">
                    提现处理中(元)
                    <strong>
                        <i class="question" @click="toggleTip('showTiXianTip')"></i>
                        <Tip class="tip_wraper"
                             :_style="{width:'4rem'}"
                             :show="showTiXianTip"
                             :close="closeTiXianTip">
                            平台已将提现申请交给银行处理，处理完成后，资金将到达您的绑定银行卡中
                        </Tip>
                    </strong>
                </p>
                <p class="right" v-text="circle.waiting.num.toLocaleString()">00.00</p>
            </div>
        </div>
    </div>
</template>
<script>

    import Tip from '@/component/Tip'
    import API from '@/api'

    export default {
        name: '',
        data() {
            return {
                totalBal: '00.00',//总资产
                circle: {
                    balance: {//账户余额
                        num: 0, color: '#4992ec'
                    },
                    capital_interest: {//待收本息
                        num: 0, color: '#FF9B09'
                    },
                    waiting: {//提现处理中
                        num: 0, color: '#8CBE37'
                    }
                },
                avlBal: '00.00',//可提现金额
                roadBal: '00.00',//待入账金额
                addInterest:'00.00',//累计收益
                ciList: [],
                _sum: 0,//三个圆圈的动效和
                bodyFontSize: document.documentElement.style.fontSize.replace('px', '') * 1,
                showZiChanTip: false,//总资产tip
                showDaiRuZhangTip: false,//待入账tip
                showTiXianTip: false,//提现tip
            }
        },
        async created(){
            let obj = await API.post(API.accountDetail)
            this.$data.totalBal = obj.totalBal//账户总资产
            this.$data.circle.balance.num = obj.balance//可用余额
            this.$data.avlBal = obj.avlBal || 0//可提现金额
            this.$data.roadBal = obj.roadBal//待入账金额
            this.$data.addInterest=obj.addInterest || 0//累计收益


            this.$data.circle.capital_interest.num = obj.capital_interest//待收本息
            this.$data.circle.waiting.num = obj.waiting//提现处理中
            this.$data.ciList = obj.ciList

            const canvas = this.$refs.canvas
            const canvas_wraper = this.$refs['canvas_wraper']
            let {width, height} = canvas_wraper.getBoundingClientRect()
            canvas.height = height
            canvas.width = width

            this.sum = this.circle.balance.num * 1 + this.circle.capital_interest.num * 1 + this.circle.waiting.num * 1
            if (!this.sum) {
                this.drawCircle({start: 0, end: Math.PI * 2, color: '#E5E5E5'})
            } else {
                this.animateCircle('balance').then(() => {
                    return this.animateCircle('capital_interest')
                }).then(() => {
                    return this.animateCircle('waiting')
                })
            }

        },
        mounted() {

        },
        methods: {
            toggleTip(key){
                this.$data[key] = !this.$data[key]
            },
            closeZiChanTip(){
                this.showZiChanTip = false
            },
            closeDaiRuZhangTip(){
                this.showDaiRuZhangTip = false
            },
            closeTiXianTip(){
                this.showTiXianTip = false
            },
            animateCircle(key){
                let self = this
                let {num} = this.circle[key]
                let _num = 0
                let perArc = Math.PI * 2 / this.sum
                let start = this.$data._sum * perArc
                let step = Math.ceil(this.sum / 40)

                let color = this.circle[key].color
                return new Promise((resolve, reject) => {
                    let animate = () => {
                        requestAnimationFrame(() => {
                            if (_num <= num) {
                                _num += step
                                this.$data._sum += step
                                let end = this.$data._sum * perArc
                                if (this.$data._sum >= getSumToIndex(key)) {//数值超过了num  终止该队列当前动画
                                    this.$data._sum = getSumToIndex(key)
                                    end = this.$data._sum * perArc
                                    this.drawCircle({start, end, color})
                                    resolve(true)
                                } else {
                                    this.drawCircle({start, end, color})
                                    animate()
                                }
                            }
                        })
                    }
                    animate()
                })
                function getSumToIndex(key) {
                    let keys = Object.keys(self.$data.circle)
                    let ind = keys.indexOf(key)
                    let _toSum = 0
                    for (let i = 0; i <= ind; i++) {
                        _toSum += self.circle[keys[i]].num
                    }
                    return _toSum
                }
            },
            drawCircle(options){
                const canvas = this.$refs.canvas
                const {start = 0, end = 0, color = '#4992ec'} = options
                let {width, height} = canvas.getBoundingClientRect()
                const ctx = canvas.getContext("2d")
                ctx.beginPath()

                ctx.strokeStyle = color
                let bodyFontSize = this.$data.bodyFontSize
                let strokeWidth = Math.round(bodyFontSize * 0.4)

                ctx.lineWidth = strokeWidth

                const circle = {
                    x: width * 0.5,    //圆心的x轴坐标值
                    y: height * 0.5,    //圆心的y轴坐标值
                    r: width * 0.5 - strokeWidth * 0.6      //圆的半径
                }
                ctx.arc(circle.x, circle.y, circle.r, start, end, false)
                ctx.stroke()
            },
            interest(item){//加息收益
                const {
                    interest
                }=item

                return (interest && interest*1 &&`(收益${interest})`)||''
            },
        },
        computed: {},
        components: {
            Tip
        }
    }
</script>
<style lang="scss" scoped>
    .question {
        @include box((d:inline-block, w:0.34rem, h:0.34rem, m:0 0 0 0.1rem));
        @include bg_img('icon_question.png');
    }

    .figure {
        @include box((bg:$white, p:0 0 0 0.4rem));
        .title {
            @include box((d:flex, p:0.4rem 0.4rem 0.2rem 0, lh:0.45rem, fs:0.32rem, c:$black2));
            .left, .right {
                flex: 1;
            }
            .right {
                @include box((fs:0.36rem, c:$red, lh:0.5rem, ta:right));
            }
        }
        .leiji{
            @include box((fs:0.28rem,c:$black5,p:0 0 0.26rem 0));
            @include thin(bottom, #e5e5e5);
            span{
                @include box((fs:0.3rem,c:$black2,m:0 0 0 0.25rem));
            }
        }
        .content {
            @include box((p:0.4rem 0.4rem 0.4rem 0, d:flex));
            $green: #8CBE37;
            $orange: #FF9B09;
            .circle_wraper {
                @include box((w:2.67rem, h:2.67rem));
            }
            .right_msg {
                flex: 1;
                @include box((p:0.3rem 0 0 0.4rem));
                li {
                    @include box((lh:0.4rem, fs:0.28rem, m:0.24rem 0));
                    &:before {
                        content: '';
                        @include box((w:0.18rem, h:0.18rem, d:inline-block, bdr:50%, m:0 0.2rem 0 0));
                    }
                    span {
                        @include box((c:$black5));
                    }
                    label {
                        @include box((fl:right, c:$black2));
                    }
                }
                li:nth-child(1) {
                    &:before {
                        @include box((bg:$blue));
                    }
                }
                li:nth-child(2) {
                    &:before {
                        @include box((bg:$orange));
                    }
                }
                li:nth-child(3) {
                    &:before {
                        @include box((bg:$green));
                    }
                }
            }
        }
    }

    .text_area {
        @include box((p:0 0 0 0.4rem, bg:$white, m:0.2rem 0));
        .title {
            @include box((d:flex, p:0.4rem 0.4rem 0.4rem 0, lh:0.42rem, fs:0.3rem, c:$black2));

            .left, .right {
                flex: 1;
            }
            .right {
                @include box((fs:0.32rem, c:$black2, lh:0.45rem, ta:right));
            }
        }
        ul {
            @include box((p:0.24rem 0.24rem 0.24rem 0));
            @include thin(bottom, #e5e5e5);
            li {
                &:not(:last-child) {
                    @include box((m:0 0 0.24rem 0));
                }
                span {
                    @include box((c:$black5, fs:0.28rem));
                }
                label {
                    @include box((fl:right, fs:0.32rem, c:$black5));
                }
            }
        }
    }

    .scale-enter-active, .scale-leave-active {
        transition: transform ease 400ms;
        transform-origin: 0.29rem 0;
    }

    .scale-enter, .scale-leave-to {
        transform: scale(0);
    }

    .tip_wraper {
        @include position((p:relative, t:0.1rem, l:-0.17rem));
    }

    strong {
        @include box((d:inline-block, w:0.3rem, h:0.4rem, p:0.05rem 0));
        vertical-align: top;
        position: relative;

        span {
            @include position((p:absolute, t:0.55rem, l:-0.27rem, z:5));

        }
    }

</style>