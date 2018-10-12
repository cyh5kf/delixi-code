<template>
    <div class="card" :class="{disabled:disabled}">
        <p class="tender_title">
            <span v-text="name"></span>
            <ul>
                <li class="left-icon" v-if="discount !== 0 ">优惠券</li>
                <li class="right-icon" v-if="tenderTranfer === 0 && category !== 0 && zicon === 1">不可债转</li>
                <li class="right-icon" v-if="tenderTranfer === 1 && category !== 0 && zicoy === 1">可债转</li>
                <li class="left-icon" v-if="category === 0">1000元起投</li>
                <li class="right-icon" v-if="category === 0">新手专享</li>
            </ul>
        </p>
        <div class="tender_cont">
            <div class="left">
                <p :style="status==1&&'color: rgba(246,76,62,0.50)'">
                    <template>
                        <span class="baseApr" v-text="baseApr"></span><template v-if="!exApr">%</template>
                        <span class="exApr" v-if="exApr">
                            <i v-text="`+${exApr}%`"></i>
                            <b></b>
                        </span>
                    </template>
                </p>
                <label class="desc" v-text="convertStyle(style)"></label>
            </div>
            <div class="center">
                <p><span v-text="timeLimit">30</span><i v-text="convertDay(borrowTimeType)"></i></p>
                <label class="desc">期限</label>
            </div>
            <div class="right">
                <p class="rightTop">剩余 <span v-text="(lastAccount*1).toLocaleString()+'元'"></span></p>
                <label v-if="status==1&&!downTime" class="progress_wraper" style="color:#F64C3E;opacity:0.5">
                    <span><i class="barTransition" :style="{width:'100%',background:'#F64C3E'}"></i></span>即将发售
                </label>
                <label v-if="status===1&&downTime" class="time">
                    <Time :ping="card.downTime" class="f_r "></Time>
                    <div class="f_r txt"><p>后开售</p></div>
                </label>
                <label v-if="status!=1" class="progress_wraper">
                    <span><i class="barTransition" :style="{width:(scales)+'%'}"></i></span>{{scales+'%'}}
                </label>
            </div>
        </div>
    </div>
</template>
<script>
    import Time from './Time.vue';
    export default {
        name: 'TenderCard',
        data() {
            return {
                downTime:undefined,
                discount:0,
                ...this.card,
                percent: 0
            }
        },
        props: ['card','disabled'],//disabled：已经售罄
        methods: {
            animatePercent(val) {//更新进度条状态
                const aimate = () => {
                    requestAnimationFrame(() => {
                        if(this._percent < val){
                            this._percent += 1
                            aimate()
                        }
                    })
                }
                aimate()
            },
            convertStyle(style) {
                const text = [
                    '等额本金',
                    '等额本息',
                    '一次性还本付息',
                    '按月付息，到期还本'
                ]
                return text[style]
            },
            convertDay(type) {
                const text = ['月','天']
                return text[type]
            }
        },
        mounted(){
            // console.log(this.$props)
            this.animatePercent(this.amountYes/this.amount)
        },
        components:{
            Time
        },
        watch:{
            cardData(n,o){
                this.card = n
                this.animatePercent(this.card)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .card {
        @include box((p:0.24rem 0 0 0.3rem, bg:$white));
        .tender_title {
            @include box((lh:0.4rem, h:0.4rem, fs:0));
            span {
                @include box((c:$black5, m:0 0.16rem 0 0, fs:0.28rem, lh:0.4rem, d:inline-block));
                vertical-align: middle;
            }
            ul {
                display: inline-block;
            }
            li {
                @include box((lh:0.32rem, p:0.02rem 0.14rem 0, fs:0.2rem, bdr:0.04rem, m:0 0.05rem));
                vertical-align: middle;
                display: inline-block;

            }
            li.left-icon {
                background-color: #fff7f6;
                border: 1px solid #fcc9c5;
                color: #ff6a5f;
                border-radius: 20px 0 0 20px;
            }

            li.right-icon {
                background-color: #f7fafe;
                border: 1px solid #c8def9;
                color: $blue;
                border-radius: 0 20px 20px 0;
            }
            .newTender{
                @include box((d:block,fl:right,bg:#8CBE37,fs:0.2rem,h:0.32rem,lh:0.32rem,c:$white,p:0 0.3rem));
                border-top-left-radius: 0.16rem;
                border-bottom-left-radius: 0.16rem;
            }
        }
        .tender_cont {
            @include box((p:0.36rem 0.3rem 0.36rem 0));
            border-bottom: 1px solid #e5e5e5;
            overflow: hidden;
            .desc {
                @include box((c:$black9));
            }
            .left {
                float: left;
                width: 3.16rem;
                p {
                    @include box((c:$red, lh:0.75rem));
                    .baseApr {
                        @include box((fs:0.56rem));
                    }
                    .percent {
                        @include box((fs:0.26rem));
                    }
                    .icon_qj {
                        position: relative;
                        top: -0.05rem;
                        font-size: 0.4rem;
                    }
                    .exApr {
                        position: relative;
                        i {
                            font-size: 0.26rem;
                        }
                        b {
                            @include box((w:0.4rem, h:0.28rem));
                            @include bg_img('icon-reward.png');
                            display: inline-block;
                            position: relative;
                            top: 0.06rem;
                        }
                    }

                }
            }
            .center {
                float: left;
                p {
                    @include box((lh:0.75rem));
                    span {
                        @include box((fs:0.48rem, c:$black2));
                    }
                }
            }

            .right {
                float: right;
                .rightTop {
                    @include box((c:$black9, fs:0.24rem));
                    text-align: right;
                    margin-top: 0.3rem;
                    span {
                        @include box((c:#222, m:0 0 0 0.1rem));
                    }
                }
                label:nth-child(2) {
                    @include box((fs:0.18rem));
                    margin-top: 0.2rem;
                    display: inline-block;
                    span {
                        @include box((w:1rem, h:0.04rem, bg:#e5e5e5, d:inline-block, m:0 0.2rem 0 0, c:$black2));
                        @include position((p:relative));
                        vertical-align: middle;
                        i {
                            @include box((d:block, h:100%, w:60%, bg:$red));
                            @include position((p:absolute, l:0, t:0));
                        }
                    }
                    .f_r {
                        @include box((fl:left));
                    }
                    .txt {
                        @include box((c:#999,fs:0.24rem));
                        margin-left: 0.1rem;
                    }
                }

            }
        }

    }
    .card.disabled {
        $blackc: #ccc;
        .tender_title {
            span {
                @include box((c:$blackc));
            }
            li {
                @include box((c:$blackc));
                @include thin(all, $blackc);
                background-color: #fafafa;
            }
        }
        .tender_cont {
            .desc {
                @include box((c:$blackc));
            }
            .left {
                p {
                    @include box((c:$blackc));
                    strong {
                        @include box((c:$blackc));
                    }
                    .exApr {
                        b {
                            @include bg_img('icon-reward-disable.png');
                        }
                    }
                }
            }
            .center {
                p {
                    @include box((c:$blackc));
                    span {
                        @include box((c:$blackc));
                    }
                }
            }
            .right {
                p {
                    @include box((c:$blackc));
                    span {
                        @include box((c:$blackc));
                    }
                }
                label:nth-child(2) {
                    @include box((c:$blackc));
                    span {
                        i {
                            @include box((bg:#e5e5e5, w:100%));
                        }
                    }
                }
            }
        }
    }
</style>
