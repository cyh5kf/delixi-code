<template>
    <div class="container">
        <div class="banner"></div>
        <div class="content">
            <section class="section1">
                <div class="title"><img src="https://images.51rz.com/images/rebuild/wx/img/novice-title1.png" alt=""></div>
                <div class="meeting">
                    <img src="https://images.51rz.com/images/rebuild/wx/img/meeting-gift1.png" alt="">
                    <img src="https://images.51rz.com/images/rebuild/wx/img/meeting-gift2.png" alt="">
                    <img src="https://images.51rz.com/images/rebuild/wx/img/meeting-gift3.png" alt="">
                    <img src="https://images.51rz.com/images/rebuild/wx/img/meeting-gift4.png" alt="">
                    <img src="https://images.51rz.com/images/rebuild/wx/img/meeting-gift5.png" alt="">
                </div>
                <div v-if="info.uid||this.uid" class="btn">已注册</div>
                <div v-else class="btn">
                    <a href="/register">立即注册领取福利</a>
                </div>
            </section>
            <section class="section2">
                <div class="title"><img src="https://images.51rz.com/images/rebuild/wx/img/novice-title2.png" alt=""></div>
                <p>人众金服精准定位产业互联网金融，深耕供应链金融及消费金融领域，构筑互联网金融与企业、商品（服务）供应链、消费等互利共存、持续发展的良好产业生态。致力为用户提供更加优质、高效、安全的网络借贷信息中介服务。</p>
                <img src="https://images.51rz.com/images/rebuild/wx/img/app-noviceguide.png" alt="">
                <ul>
                    <li v-for="(v,i) in icons">
                        <img :src="v.imgUrl" alt=""/>
                        <p v-html="v.content"></p>
                    </li>
                </ul>
            </section>
            <section class="section3">
                <div class="title"><img src="https://images.51rz.com/images/rebuild/wx/img/novice-title3.png" alt=""></div>
                <div class="stepContent">
                    <ul :style="'margin-left:'+(-currentStep*4.11)+'rem'">
                        <li v-for="v in step">
                            <img :src="'https://images.51rz.com/images/rebuild/wx/img/wxStep'+v+'.jpg'" alt="">
                        </li>
                    </ul>
                </div>
                <div @click="prevStep()" class="left" :style="{'opacity':currentStep==0?'0.5':'1'}"></div>
                <div @click="nextStep()" class="right"></div>
            </section>
            <!-- <section class="section4">
                <div class="title"><img src="https://images.51rz.com/images/rebuild/wx/img/novice-title4.png" alt=""></div>
                <div class="person"></div>
                <div class="btn">
                    <a href="/tender/index">去投资享福利</a>
                </div>
            </section> -->
            <p>想要了解更多关于我们的信息，欢迎扫描以下二维码关注<br/>我们，感谢您的阅览</p>
            <img src="https://images.51rz.com/images/rebuild/wx/img/severs.png" alt=""/>
            <p>人众金服公众号</p>
        </div>
    </div>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex'
    export default{
        name: 'noviceGuide',
        data(){
            return {
                icons: [
                    {
                        imgUrl: 'https://images.51rz.com/images/rebuild/wx/img/novice-icon2.png',
                        content: `信息披露<br/>安全透明`
                    },
                    {
                        imgUrl: 'https://images.51rz.com/images/rebuild/wx/img/novice-icon3.png',
                        content: `获立元创投<br/>5000万A轮融资`
                    },
                    {
                        imgUrl: 'https://images.51rz.com/images/rebuild/wx/img/novice-icon4.png',
                        content: `获公安部<br/>“信息安全等级保护”<br/>三级备案`
                    },
                    {
                        imgUrl: 'https://images.51rz.com/images/rebuild/wx/img/novice-icon5.png',
                        content: `获ICP许可证`
                    },
                    {
                        imgUrl: 'https://images.51rz.com/images/rebuild/wx/img/novice-icon6.png',
                        content: `运营5年`//<br/>0逾期
                    },
                ],
                step: [0, 1, 2, 3, 4, 5, 6, 7],
                currentStep: 0,
                uid: this.getUrlParam('uid') || 0
            }
        },
        methods: {
            prevStep(){
                if (this.currentStep == 0) {
                    return;
                } else {
                    this.currentStep = this.currentStep - 1
                }
            },
            nextStep(){
                if (this.currentStep >= 7) {
                    this.currentStep = 0
                } else {
                    this.currentStep = this.currentStep + 1
                }
            },
            getUrlParam(name) {
                const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)") //构造一个含有目标参数的正则表达式对象
                const r = window.location.search.substr(1).match(reg)  //匹配目标参数
                if (r != null) return unescape(r[2]);
                return null //返回参数值
            },
        },
        computed: {
            ...mapGetters([
                'info'
            ])
        }
    }
</script>
<style lang="scss" scoped>
    .banner {
        @include box((w:100%, h:4.98rem));
        background: url('https://images.51rz.com/images/rebuild/wx/img/appnovicebanner.jpg') center/cover no-repeat;
    }

    .content {
        @include box((w:100%,));
        padding-bottom: 0.7rem;
        /* Safari 5.1 - 6.0 */
        background: -webkit-linear-gradient(#e87943, #e05442, #d93642, #e87743, #e05643, #e87843, #e05643);
        /* Opera 11.1 - 12.0 */
        background: -o-linear-gradient(#e87943, #e05442, #d93642, #e87743, #e05643, #e87843, #e05643);
        /* Firefox 3.6 - 15 */
        background: -moz-linear-gradient(#e87943, #e05442, #d93642, #e87743, #e05643, #e87843, #e05643);
        /* 标准的语法 */
        background: linear-gradient(#e87943, #e05442, #d93642, #e87743, #e05643, #e87843, #e05643);
        & > p {
            @include box((ta:center, c:#fff, fs:0.24rem, lh:0.4rem))
        }
        & > img {
            @include box((w:4.32rem, d:block, m:0.22rem auto))
        }
    }

    section {
        @include box((w:6.9rem, m:0 auto 1.1rem, bg:#fff));
        .title {
            margin-bottom: 0.2rem;
            img {
                @include box((h:0.5rem, d:block, m:0 auto));
                position: relative;
                top: -0.41rem;
            }
        }
        .btn {
            @include box((fs:0.24rem, w:3rem, h:0.6rem, bdr:0.3rem, m:0 auto, ta:center, lh:0.6rem, c:#999, bg:#e5e5e5));
            a {
                @include box((d:block, w:100%, h:100%, c:#fff, bdr:0.3rem));
                box-shadow: 0 0.04rem 0.2rem rgba(236, 105, 0, 0.43);
                background: linear-gradient(to right, #ff6944, #ffa655);
            }
        }
    }

    .section1 {
        @include box((h:7rem));
        .meeting {
            text-align: center;
            img {
                width: 2.25rem;
                margin-bottom: 0.4rem;
            }
        }
    }

    .section2 {
        @include box((p:0 0.2rem 0.6rem));
        p {
            @include box((fs:0.18rem, c:#555, lh:0.28rem));
            padding-top: 0.1rem;
        }
        & > img {
            margin: 0.5rem auto 0.6rem;
            width: 100%;
        }
        ul {
            width: 100%;
            height: 4.1rem;
            li {
                @include box((w:33.33%, fl:left, ta:center));
                margin-bottom: 0.2rem;
                img {
                    @include box((w:0.99rem, mb:0.13rem))
                }
            }

            li:nth-child(1){
                width: 37%;
                margin-left: 1rem;
            }
        }
    }

    .section3 {
        @include box((h:8.8rem, p:0 0.56rem, ta:center));
        .stepContent {
            @include box((w:4.11rem, h:7.35rem, m:0 auto, d:inline-block));
            overflow: hidden;
            ul {
                @include box((w:1000%, h:100%));
                transition: all 1s;
                li {
                    @include box((w:4.11rem, h:7.35rem, fl:left));
                    img {
                        @include box((w:4.11rem, h:7.35rem));
                    }
                }
            }
        }
        .left, .right {
            width: 0.36rem;
            height: 0.94rem;
            background: #f3ae60;
            border-radius: 0.18rem;
            margin-top: 2.88rem;
            background-image: url(https://images.51rz.com/images/rebuild/wx/img/appguideArrow.png);
            background-repeat: no-repeat;
            background-position: center center;
            background-size: 0.15rem 0.24rem;
            cursor: pointer;
        }
        .left {
            float: left;
            transform: rotate(180deg);
        }
        .right {
            float: right
        }
    }

    .section4 {
        @include box((p:0 0.23rem 0.7rem));
        margin-bottom: 0.6rem;
        .person {
            @include box((w:100%, h:4.39rem, fs:0.18rem, c:#555));
            margin-bottom: 0.52rem;
            background: url('https://images.51rz.com/images/rebuild/wx/img/novice-person.png') center/cover no-repeat;
        }
    }

</style>