<template>
    <div>
        <div v-show="step === 1">
            <div class="banner" v-text="banner.title"></div>
            <div class="content">
                <div class="text" v-text="banner.content"></div>
                <div class="result" v-show="historyResult&&!currentResult">
                    <p >上次测评结果</p>
                    <h4 v-text="historyResult"></h4>
                </div>
                <div class="result" v-show="currentResult">
                    <p >您当前的风险承受能力</p>
                    <h4 v-text="currentResult"></h4>
                </div>
            </div>
            <div class="btn">
                <a href="/tender" v-show="currentResult">去投资</a>
                <div @click="again" v-show="currentResult">重新测试</div>
                <a v-show="!currentResult" @click="step = 2">开始测评</a>
            </div>
        </div>
        <div class="wrap" v-show="step === 2">
            <div v-for="(item,i) in subject" class="subject">
                <p class="question" v-text="(i+1)+'、'+item.question"></p>
                <div v-for="(option,index) in item.options"
                     class="option"
                     :class="score[i] === index+1 ? 'Check ': 'unCheck'"
                     @click="check(i,index+1)">
                    <span v-text="getLV(index)+'：'+option"></span>
                </div>
            </div>
            <div class="up_down">
                <div @click="next">提交问卷</div>
            </div>
        </div>
    </div>
</template>
<script>
    import API from '@/api'
    import {mapGetters, mapActions} from 'vuex'
    import getParam from '@/lib/getParam'
    import webView from '@/lib/webView'

    export default {
        name: 'risk',
        data() {
            return {
                currentResult:'',
                historyResult:'',
                banner:{
                    title:'风险承受能力评估',
                    content:'本问卷旨在了解您对投资风险的承受意愿及能力。问卷结果可能不能完全呈现您面对投资风险的真正态度，您可与我们的客服进一步沟通。'
                },
                step: 1,
                score: [0,0,0,0,0,0],
                subject: [
                    {
                        question: '您目前所处的年龄阶段为',
                        options: ['65岁以上','46-65岁','30-45岁','30岁以下'],
                    },
                    {
                        question: '您可以投资的资金量',
                        options: ['10万元（含）以下','10万至100万（含）','100万至500万（含）','500万至2000万（含）'],
                    },
                    {
                        question: '您的投资目的是什么',
                        options: ['超过通货膨胀就好（每年5%左右）','获取较稳定收益（每年10%左右）','获取较高收益（每年20%左右）','博取高收益（每年30% 以上）'],
                    },
                    {
                        question: '过往的投资记录中，您一般的投资期限为',
                        options: ['1年以内','1-3年（包括3年）','3-5年（包括5年）','5年以上'],
                    },
                    {
                        question: '您家庭的月生活消费支出约占月总收入的',
                        options: ['71%-100%以上','51%-70%','21%-50%','0-20%'],
                    },
                    {
                        question: '您投资时，更倾向于投资哪类产品：',
                        options: ['银行储蓄','债券、保险、银行理财产品','股票、偏股型基金','期货、外汇'],
                    },
                ],
                result: [
                    {
                        title: '保守型',
                        content: '您的投资目标是追求资本的保值。可承受的风险较低。',
                    },
                    {
                        title: '稳健型',
                        content: '您的投资目标是追求资本缓和升值，其次为资本保值。可承担中等风险。',
                    },
                    {
                        title: '积极型',
                        content: '您的投资目标是增值财富，您可承受一定风险，了解高收益总是与高风险相伴随。',
                    },
                    {},
                ],
            }
        },
        methods: {
            check(index,val) {
                this.score[index] = val
                this.score.push()
            },
            async next() {
                let score = this.score.reduce(function (a,b) {
                    return a+b
                })
                if(score < 6) {
                    this.showMsg('请选完所有选项')
                    return
                }
                const result = this.scoreCovert(score)
                await API.post(API.riskTest,{score: score,token:getParam(window.location.href,'token')})
                this.setInfo({riskScore: score})
                this.banner = {
                    title: '测评结果',
                    content: result.content,
                }
                this.step = 1
                this.currentResult = result.title
                webView('obtainScore',{score})
            },
            getLV(index) {
                const text = ['A','B','C','D','E']
                return text[index]
            },
            scoreCovert(val) {
                let resultIndex = 3
                if(val >= 19) {
                    resultIndex = 2
                }else if(val >= 13) {
                    resultIndex = 1
                }else if(val >= 6) {
                    resultIndex = 0
                }
                return this.result[resultIndex]
            },
            again() {
                this.score = [0,0,0,0,0,0]
                this.step = 2
            },
            ...mapActions([
                'setInfo',
                'showMsg',
            ])
        },
        computed: {
            ...mapGetters([
                'info'
            ])
        },
        mounted() {
            const score = getParam(window.location.href,'score') || this.info.riskScore
            this.historyResult = this.scoreCovert(score).title
        }
    }
</script>
<style lang="scss" scoped>
    .banner{
        width:7.5rem;
        height:2rem;
        font-size: 0.48rem;
        text-align: center;
        line-height:2rem;
        color:#fff;
        background:url(https://images.51rz.com/images/app/risk_asseessment/banner.png) center center no-repeat;
    }
    .text{
        min-height: 1.68rem;
        margin:0.6rem 0.7rem;
        color:#555;
        font-size:0.3rem;
    }
    .result{
        text-align: center;
    }
    .result p{
        margin-top:-0.48rem;
        font-size: 0.3rem;
        color:#999;
        line-height:42px;
    }
    .result h4{
        color:#F64C3E;
        font-size: 0.64rem;
        font-weight:500;
        margin-bottom:60px;
    }
    .btn{
        margin:0 1.25rem;
        width:5rem;
        height:0.88rem;
        line-height:0.88rem;
        background:#F64C3E;
        font-size: 0.36rem;
        text-align: center;
        border-radius:0.44rem;
        div{
            margin-top: 3rem;
            font-size: 0.3rem;
            color: #999;
            line-height: 42px;
        }
    }
    .btn a{
        display:block;
        width:100%;
        height:100%;
        color:#fff;
        text-decoration: none;
    }

    .wrap{padding: 0.2rem 0.3rem;background: #fff;}
    .subject{display: flex;width: 100%;flex-wrap: wrap;}
    .question{color: #4992ec;font-size: 0.3rem;margin: 0.6rem 0 0.2rem 0;width: 100%}
    .option{
        width:50%;line-height:0.4rem;font-size: 0.28rem;
        padding:0 0.2rem 0 0.52rem;color: #555;margin: 0.2rem 0;
    }
    .up_down{font-size: 0.3rem;color: #555;width: 5rem;margin: 0.6rem auto;}
    .up_down div{
        display: inline-block;width: 5rem;height: 0.88rem;line-height:0.88rem;
        text-align: center;background: #f64c3e;color: #fff;border-radius: 0.44rem;
    }


    .unCheck{
        @include bg_img('radio.png');
        background-size: 0.32rem 0.32rem;
    }
    .Check{
        @include bg_img('radio_check.png');
        background-size: 0.32rem 0.32rem;
    }
</style>