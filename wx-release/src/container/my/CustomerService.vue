<template>
    <div>
        <div class="title">
            <div>
                <p>早上好，竭诚为您服务！</p>
                <span>工作日(9:00-20:30)节假日(9:00-17:30)</span>
            </div>
            <a v-if="showBtn" class="customer" @click="isIOS">在线客服</a>
        </div>
        <ul class="content">
            <li v-for="(item,i) in nav" :key="i" @click="changeNav(i)">
                <div :class="item.className"></div>
                <div v-text="item.name"></div>
            </li>
        </ul>
        <div class="list">
            <router-link tag="div"
                         v-for="(item,i) in list[index]"
                         :to="`customerDetail/${index}/${i}`"
                         :key="i">
                <span v-text="item"></span>
                <div class="arrow"></div>
            </router-link>
        </div>
        <p class="footer">如有疑问可咨询：<span class="black5">400-655-8858</span></p>
    </div>
</template>
<script>
    import getParam from '@/lib/getParam'
    import {mapGetters, mapActions} from 'vuex'
    export default {
        components: {},
        name: 'customerService',
        data() {
            return {
                index: sessionStorage.getItem('customer') || 0,
                showBtn: getParam(window.location.href,'app'),
                nav: [
                    {
                        className: 'kf_xs',
                        name: '新手必读',
                    },
                    {
                        className: 'kf_login',
                        name: '注册与登录',
                    },
                    {
                        className: 'kf_card',
                        name: '认证与绑卡',
                    },
                    {
                        className: 'kf_cz',
                        name: '充值与投资',
                    },
                    {
                        className: 'kf_tx',
                        name: '提现与转让',
                    },
                    {
                        className: 'kf_hb',
                        name: '红包加息券',
                    }
                ],
                list: [
                    [
                        '人众金服是做什么的网站？',
                        '我在人众金服上投资安全吗？',
                        '人众金服网站靠什么盈利？',
                        '用户在平台签订的电子合同受法律保护吗？',
                        '人众金服自身的运营变动是否会影响用户的投资？'
                    ],
                    [
                        '如何注册人众金服？',
                        '注册的时候收不到短信怎么办？',
                        '设置登录密码有什么要求？',
                        '邀请码是什么？有什么用途？',
                        '交易密码忘记了怎么办？如何设置和修改交易密码？',
                        '为什么要设置交易密码?',
                        '登录密码忘记了如何找回？',
                        '注册手机号码可以更换吗？',
                        '注册人众金服账户一定要用银行的预留手机号码吗？ '
                    ],
                    [
                        '注册完成后需要完成哪些认证？如何操作？',
                        '实名认证不了怎么办？',
                        '手机、身份证认证之后是否可以再次认证一个账号？ ',
                        '如何修改实名认证信息？',
                        '什么情况下需要绑定银行卡？',
                        '开通存管账户时，是否需要办一张存管银行卡？',
                        '可以绑定哪些银行卡？',
                        '如何绑定银行卡，需注意什么？',
                        '无法绑定银行卡怎么办？',
                        '如何设置及更改绑定的银行卡？',
                        '我可以绑定几张银行卡？'
                    ],
                    [
                        '如何充值？',
                        '快捷银行卡无法充值怎么办？',
                        '充值有费用么？是否有充值上限？',
                        '充值时为什么提示限额？',
                        '网上银行该如何开通办理？',
                        '可以用信用卡进行充值吗？',
                        '当日充值的资金是否可以提现？',
                        '为什么会充值失败？',
                        '我可不可以投新手标？',
                        '人众金服什么时候发标？如果没有标的了怎么办？',
                        '投资成功后，合同哪里下载？',
                        '产品节假日是否产生收益？',
                        '什么时候开始计息？有哪些还本付息方式？',
                        '利息是如何计算的？',
                        '为什么会投资失败？',
                        '如何投资人众金服的产品？',
                        'R计划是什么产品？',
                        'R计划与其他产品有什么区别？',
                        'R计划收益是如何计算的？',
                        '怎样邀请好友投资？',
                        '我是否可以取消某笔投资？',
                        '如果我投资的钱需要急用怎么办？',
                        '到期后如何收回投资本金和利息？收到还款后能马上再投资吗？',
                        '资产总额如何计算？',
                        '累计利息如何计算？',
                        '资金冻结是什么情况导致的？'
                    ],
                    [
                        '债权转让的规则是怎么样的？',
                        '我持有的单笔可转让资产，可以申请部分债权转让吗？',
                        '我申请了债权转让，什么时候能够收到资金？',
                        '债权转让需要手续费吗？',
                        '为何转让债权可以自己定价？',
                        '被转让的债权如何计息？',
                        'R计划可以进行债权转让吗？',
                        '什么是债权转让标的转让密码？',
                        '承接债权转让有何限制？',
                        '提现是否有限额？',
                        '如何提现？',
                        '为什么提现申请会失败？',
                        '回款什么时候回？',
                        '提现什么时候可以到账？',
                        '提现手续费怎么收取？',
                        '平台收取充值费用和利息管理费吗？',
                        '余额里钱已经没了，银行还没到账？',
                        '银行卡无法提现怎么办？',
                        '绑定银行卡（非快捷充值银行卡）可以修改么？',
                        '提现后能否取消？'
                    ],
                    [
                        '什么是红包加息券？',
                        '如何获得红包或加息券？',
                        '红包或加息券使用规则',
                        '红包或加息券是否能叠加使用？',
                        '当发生债权转让时，加息券能否一起转让？',
                        '特别说明'
                    ]
                ]
            }
        },
        methods: {
            changeNav(index) {
                this.index = index
                sessionStorage.setItem('customer',index)
            },
            isIOS() {
                if (!getParam(window.location.href,'optimize') && /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                    this.showMsg('非常抱歉，在线客服升级中，暂无法使用')
                }else {
                    window.location.href = '/app/customer'
                }
            },
            ...mapActions([
                'showMsg',
            ]),
        }
    }
</script>
<style lang="scss" scoped>
    .title {
        @include box((bg:$white, m:0.2rem 0, p:0.3rem,d:flex));
        div{
            @include box((fx:1));
        }
        p {
            @include box((c:$black2, fs:0.28rem));
        }
        span {
            @include box((c:$black9, fs:0.24rem));
        }
        .customer{
            @include box((w:1.9rem,h:0.62rem,lh:0.62rem,fs:0.28rem,c:#4992ec,ta:center,bdr:0.31rem));
            @include thin(all,#4992ec);
            margin-top: 0.09rem;
        }
    }

    .content {
        @include box((bg:$white, d:flex, ta:center));
        flex-wrap: wrap;
        li {
            @include box((w:33%));
            padding-bottom: 0.25rem;
        }
    }

    .list {
        @include box((bg:$white, m:0.2rem 0));
        padding-left: 0.3rem;
        div {
            @include box((d:flex, lh:1rem, fs:0.28rem, c:$black5));
            justify-content: space-between;
            &:not(:last-child) {
                @include thin(bottom, #e5e5e5);
            }
        }
    }

    .footer {
        @include box((p:0.3rem 0, ta:center, c:$black9));
    }

    @each $img in cz, hb, tx, xs, card, login{
        .kf_#{$img} {
            @include bg_img('kf_#{$img}.png');
            @include box((w:0.64rem, h:0.64rem, m:0.25rem auto 0));
        }
    }

    .arrow {
        @include bg_img('arrow.png');
        @include box((w:0.3rem, h:0.3rem, m:0.35rem 0.25rem));
    }
</style>