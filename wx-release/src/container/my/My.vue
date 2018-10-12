<template>
    <div class="wrap">
        <div class="header">
            <div class="title">
                <router-link to="/my/info" tag="div">
                    <img :src="head" class="headImg"/>
                    <span v-text="info.regMobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')"></span>
                </router-link>
                <div>
                    <router-link to="/my/message" tag="p" class="my_msg">
                        <span :class="newNotice?'msg':''"></span>
                    </router-link>
                    <router-link to="/my/set" tag="p" class="my_set"></router-link>
                </div>
            </div>
            <router-link tag="div" to="/my/assets" class="content">
                <div class="content_desc">
                    总资产(元)<span :class="eyeShow?'eye_close':'eye_open'" @click="eyeChange"></span>
                </div>
                <p v-text="eye(totalBal)">0</p>
            </router-link>
            <div class="money">
                <router-link tag="div" to="/my/account">
                    <p>账户余额(元)</p>
                    <p v-text="eye(balance)">0</p>
                </router-link>
                <div>
                    <p>待收本息(元)</p>
                    <p v-text="eye(capital_interest)">0</p>
                </div>
            </div>
        </div>
        <ul class="nav">
            <li v-for="(item,index) in cz_tx"
                @click="isOpenBank(item.path)"
                :key="index+item.name">
                <div>
                    <p :class="item.className"></p>
                </div>
                <div>
                    <p v-text="item.name"></p>
                    <p v-text="item.desc"></p>
                </div>
            </li>
            <router-link v-for="(item,index) in nav"
                         :to="item.path"
                         :key="index+item.path"
                         tag="li">
                <div>
                    <p :class="item.className"></p>
                </div>
                <div>
                    <p v-text="item.name"></p>
                    <p v-html="item.desc"></p>
                </div>
            </router-link>
        </ul>
        <ul class="info">
            <router-link tag="li" :key="index+item.name" :to="item.path" v-for="(item,index) in list">
                <div>
                    <div class="className" :class="item.className"></div>
                    <p v-text="item.name"></p>
                </div>
                <div>
                    <p v-html="item.val" class="desc"></p>
                    <p class="my_arrow"></p>
                </div>
            </router-link>
        </ul>
        <div class="index_data">
            <p>创造持久价值 众享财富自由</p>
        </div>
        <Menu_nav></Menu_nav>
        <OpenBank :show="showDialog" v-on:msg="showDialog = false"></OpenBank>
    </div>
</template>
<script>
    import Menu_nav from '@/component/Menu'
    import {mapGetters, mapActions} from 'vuex'
    import API from '@/api'
    import OpenBank from '@/component/OpenBank'

    export default {
        name: 'my',
        data() {
            return {
                cz_tx: [
                    {
                        name: '充值',
                        desc: '提前充值投资更快',
                        className: 'my_cz',
                        path: '/my/recharge'
                    },
                    {
                        name: '提现',
                        desc: '提现到账更迅速',
                        className: 'my_tx',
                        path: '/my/withDrawCash'
                    }
                ],
                nav: [{
                    name: '优惠券',
                    desc: '您还暂无优惠券',
                    className: 'my_fl',
                    path: '/my/redPacket'
                },
                    {
                        name: '日历',
                        desc: '您未有回款日历',
                        className: 'my_rl',
                        path: '/my/calendar'
                    }
                ],
                list: [
                    {
                        name: 'R计划',
                        className: 'my_r',
                        path: '/my/rTenderLists',
                        val: ''
                    },
                    {
                        name: '单标项目',
                        className: 'my_tz',
                        path: '/my/tenderLists',
                        val: ''
                    },
                    {
                        name: '我的账单',
                        className: 'my_bill',
                        path: '/my/bill',
                        val: ''
                    },
                    {
                        name: '我的转让',
                        className: 'my_transfer',
                        path: '/my/transferLists',
                        val: ''
                    },
                    {
                        name: '客服中心',
                        className: 'my_kf',
                        path: '/my/customerService',
                        val: ''
                    }
                ],
                totalBal: 0,
                balance: 0,
                capital_interest: 0,
                head: '',
                showDialog: false,
                eyeShow: JSON.parse(localStorage.getItem('eyeShow')),
                newNotice: 0,
            }
        },
        methods: {
            eyeChange(e) {
                e.stopPropagation()
                localStorage.setItem('eyeShow', !this.eyeShow)
                this.eyeShow = !this.eyeShow
            },
            eye(val) {
                return this.eyeShow ? '****' : val
            },
            isOpenBank(path) {
                if (this.info.realNameStatus == 1) {
                    this.$router.push(path)
                } else {
                    this.showDialog = true
                }
            }
        },
        computed: {
            ...mapGetters([
                'info'
            ])
        },
        async mounted() {
            const data = await API.post(API.myAccount)
            const {
                totalBal = 0,
                balance = 0,
                capital_interest = 0,
                head = 'https://images.51rz.com/images/rebuild/wx/img/my_head.png',
                couponNum = 0,
                repaymentDate = '',
                rPlan = 0,
                borrowBal = 0,
                transfer = 0,
                newNotice = 0, //1有0没有
            } = data
            this.totalBal = totalBal.toLocaleString()
            this.balance = balance.toLocaleString()
            this.capital_interest = capital_interest.toLocaleString()
            this.head = head ? head : 'https://images.51rz.com/images/rebuild/wx/img/my_head.png'
            this.newNotice = newNotice
            this.nav[0].desc = couponNum ?
                `您有<span style="color:#FF9B09">${couponNum}</span>张优惠券`
                : '您还暂无优惠券'
            this.nav[1].desc = repaymentDate ?
                `<span style="color:#FF9B09">${repaymentDate}</span>有回款`
                : '您未有回款日历'
            this.list[0].val = rPlan ? rPlan.toLocaleString() : ''
            this.list[1].val = borrowBal ? borrowBal.toLocaleString() : ''
            this.list[3].val = transfer ? `<span style="color:#FF9B09">${transfer}</span>个标的等待承接` : ''
        },
        components: {
            Menu_nav,
            OpenBank
        }
    }
</script>
<style lang="scss" scoped>
    .wrap {
        padding-bottom: 1rem;
    }

    .headImg {
        @include box((w:0.46rem, h:0.46rem, bdr:0.23rem));
        margin-right: 0.2rem;
    }

    .header {
        position: relative;
        @include box((h:4.36rem, bg:$red, c:$white, p:0.3rem));
        .title {
            @include box((d:flex));
            justify-content: space-between;
            div {
                @include box((d:flex, lh:0.46rem));
                p {
                    @include box((w:0.46rem, h:0.46rem));
                }
                p:nth-child(1) {
                    margin-right: 0.2rem;position: relative;
                }
                .msg{
                    content: '';
                    @include position((p:absolute,r:0,t:0));
                    @include box((w:0.16rem,h:0.16rem,bg:#fff,bdr:0.08rem));
                }
                span {
                    @include box((fs:0.24rem));
                }
            }
        }
        .content {
            @include box((ta:center));
            .content_desc {
                padding-top: 0.7rem;
                span {
                    @include box((d:inline-block, w:0.38rem, h:0.22rem, m:0 0.2rem));
                }
            }
            p {
                @include box((fs:0.6rem, c:$white));
            }
        }
        .money {
            @include position((p:absolute, b:0, l:0, z:1));
            @include box((d:flex, w:100%, h:1.2rem, bg:rgba(0, 0, 0, 0.06), ta:center, p:0.2rem 0));
            div {
                @include box((fx:1));
                p:nth-child(2) {
                    @include box((fs:0.32rem));
                }
            }
            div:nth-child(1) {
                @include thin(right, rgba(255, 255, 255, 0.20));
            }
        }
    }

    .nav {
        @include box((d:flex, bg:$white, ta:center,p:0 0.3rem));
        flex-wrap: wrap;
        li {
            @include box((d:flex, w:50%, h:1.4rem));
            &:nth-child(1){
                @include thin(bottom,#e5e5e5);
                div:nth-child(2){
                    @include thin(right,#e5e5e5);
                }
            }
            &:nth-child(2){
                @include thin(bottom,#e5e5e5);
            }
            &:nth-child(3){
                div:nth-child(2){
                    @include thin(right,#e5e5e5);
                }
            }
            div:nth-child(1) {
                @include box((w:0.92rem));
                p {
                    @include box((w:0.64rem, h:0.64rem));
                    margin-top: 0.35rem;
                    margin-left: 0.3rem;
                }
            }
            div:nth-child(2) {
                @include box((fx:2, ta:left,h:0.81rem));
                margin-top: 0.3rem;
                padding-left: 0.25rem;
                p:nth-child(1) {
                    @include box((fs:0.3rem, c:$black2));
                }
                p:nth-child(2) {
                    @include box((fs:0.24rem, c:$black9));
                }
            }
        }
    }

    .info {
        @include box((p:0 0.3rem, fs:0.3rem, c:$black2, bg:$white));
        margin-top: 0.2rem;
        margin-bottom: 0.2rem;
        li {
            @include box((lh:1rem, d:flex));
            justify-content: space-between;
            &:not(:last-child){
                @include thin(bottom, #E5E5E5);
            }
            div {
                @include box((d:flex));
            }
            .className {
                @include box((w:0.54rem, h:0.54rem, m:0.24rem 0.1rem 0.24rem 0));
            }
            .my_arrow {
                @include box((w:0.3rem, h:0.3rem, m:0.35rem 0));
            }
            .desc {
                @include box((c:#999, fs:0.24rem));
            }
            span {
                @include box((c:$red));
            }
        }
    }

    @each $img in cz, tx, fl, rl, msg, set, tz, bill, transfer, kf, arrow, r {
        .my_#{$img} {
            @include bg_img('my_#{$img}.png');
        }
    }

    @each $img in eye_close, eye_open {
        .#{$img} {
            @include bg_img('my/#{$img}.png');
        }
    }

    .index_data{
        @include bg_img('index_data_xc.png');
        height:2.55rem;text-align: center;margin-bottom: 0.16rem;
        //@include box((h:1.37rem,ta:center));
        p{
            padding-top:1rem;
            @include box((w:100%,c:$black9,fs:0.24rem));
        }
    }
</style>