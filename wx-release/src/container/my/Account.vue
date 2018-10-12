<template>
    <div class="account_wraper">
        <section>
            <p class="title">账户余额(元)</p>
            <p class="account" v-text="moneyToString(totalBalance)"></p>
            <p class="desc" v-if="handBalance">
                <label>提现处理中</label>
                <strong>
                    <i @click="toggleMsg"></i>
                    <Tip class="tip_wraper" :show="showMsg" :close="closeTipMsg">
                        提现处理中
                    </Tip>
                </strong>
                <span class="money" v-text="moneyToString(handBalance)"></span>
            </p>
        </section>
        <div class="no_lists" v-if="!detailLists.length">
            <div></div>
            <p>暂无充值提现记录</p>
        </div>
        <p class="detail_title" v-if="detailLists.length">充值提现明细(元)</p>

        <div v-show="detailLists.length" class="wrap dataLists" ref="bs0">
            <div ref="wrap0" class="container" up="下拉刷新" down="上拉加载">
                <ul class="detail_ul" ref="listWraper">
                    <li v-for="item in detailLists">
                        <div class="left">
                            <p v-text="item.creatDate">00-00</p>
                            <p v-text="item.creatTime">00:00</p>
                        </div>
                        <div class="center">
                            <p v-text="item.moneyStr">+200,902.02</p>
                            <span v-text="item.opearte">充值</span>
                        </div>
                        <div class="right">
                            <p class="status" :class="statusClass(item)" v-text="item.stateZn">成功</p>
                            <!--<p class="tip">今日24:00前到账</p>-->
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="bottom_btns">
            <p>
                <a @click="isOpenBank('withDrawCash')">提现</a>
            </p>
            <p>
                <a @click="isOpenBank('recharge')">充值</a>
            </p>
        </div>
        <OpenBank :show="showDialog" v-on:msg="showDialog = false"></OpenBank>
    </div>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex'
    import OpenBank from '@/component/OpenBank'
    import Tip from '@/component/Tip'
    import BScroll from 'better-scroll'
    import API from '@/api'

    export default {
        name: 'Account',
        data() {
            return {
                showMsg: false,//是否显示提示框
                totalBalance: '0.00',//账户总额
                handBalance: '',//提现处理中
                numPerPage: 20,
                pageNum: 0,
                totalPage: 0,
                isLoading: false,//是否正在加载列表数据
                detailLists: [],
                showDialog: false,
            }
        },
        async mounted() {
            await this.loadData()
            this.$nextTick(() => {
                this.createScroll()
            })
            const bs = this.$refs.bs0
            const listWraper = this.$refs.listWraper

            listWraper.style.minHeight = bs.getBoundingClientRect().height + 'px'
        },
        methods: {
            isOpenBank(path) {
                if (this.info.realNameStatus == 1) {
                    this.$router.push(path)
                } else {
                    this.showDialog = true
                }
            },
            toggleMsg(){
                this.showMsg = !this.showMsg
            },
            closeTipMsg(){
                this.showMsg = false
            },
            statusClass(item){//这里需要完善
                const {
                    type,//withdraw 提现  recharge:充值
                    state
                } = item
                const config = {
                    withdraw: {
                        0: 'msg',//申请提现
                        1: '',//成功
                        2: 'error',//失败
                        3: 'msg',//审核通过
                        4: 'error',//审核失败
                        5: 'msg',//已经提交到第三方
                        6: '',//用户自行取消
                        7: 'error',
                        8: 'error', //审核失败
                        9: 'msg',
                    },
                    recharge: {
                        0: 'msg',//创建
                        1: '',//充值成功
                        2: 'error',//充值失败
                        3: 'msg',//处理中
                    }
                }
                if (config[type] && config[type][state]) {
                    return config[type][state]
                }
            },
            moneyToString(money){//转化为金融数字
                return (money * 1).toLocaleString()
            },
            createScroll(){
                const bs = this.$refs.bs0
                const scroll = this.scroll = new BScroll(bs, {
                    click: true,
                    preventDefault: true
                })

                const wrap = this.$refs.wrap0
                let diff = bs.getBoundingClientRect().height - wrap.getBoundingClientRect().height
                scroll.on('touchend', async (pos) => {
                    diff = bs.getBoundingClientRect().height - wrap.getBoundingClientRect().height
                    if (pos.y > 50) {
                        wrap.setAttribute('up', '刷新中')

                        this.pageNum = 0
                        setTimeout(async () => {
                            scroll.scrollTo(0, 50)
                            this.detailLists = []
                            await this.loadData()
                            wrap.setAttribute('down', '下拉加载')
                            scroll.scrollTo(0, 0)
                        }, 100)
                    }
                    if (diff - pos.y > 50) {
                        if (this.pageNum < this.totalPage && !this.isLoading) {
                            await this.loadData()
                            this.$nextTick(() => {
                                scroll.refresh()
                                diff = bs.getBoundingClientRect().height - wrap.getBoundingClientRect().height
                            })
                        } else {
                            wrap.setAttribute('down', '已全部加载')
                        }
                    }
                })
            },
            async loadData(){
                const {
                    numPerPage,
                    pageNum
                } = this.$data

                const param = {
                    type: 1,//	1：投资人 2：借款人 3:一体户
                    numPerPage,
                    pageNum: pageNum + 1
                }

                this.$data.isLoading = true
                const obj = await API.post(API.querySaveAndCashLog, param)
                this.$data.isLoading = false

                this.$data.totalBalance = obj.totalBalance || '0.00'
                this.$data.handBalance = obj.handBalance || 0

                this.detailLists = this.detailLists.concat(obj.pb.recordList || [])
                this.totalPage = (obj.pb && obj.pb.totalPage) || 0
                this.pageNum = (obj.pb && obj.pb.currentPage) || 0

                this.$nextTick(() => {
                    this.scroll && this.scroll.refresh()
                })
            },
        },
        computed: {
            ...mapGetters([
                'info'
            ])
        },
        components: {
            Tip,
            OpenBank
        }
    }
</script>
<style lang="scss" scoped>
    $sectionH: 3rem;
    $detailTitH: 0.9rem;
    .tip_wraper {
        @include position((p:relative, t:0.1rem, l:-0.27rem));
    }

    .account_wraper {
        @include box((p:0 0 1.6rem 0));
        section {
            @include box((h:$sectionH, bg:#425476, p:0.26rem 0.3rem, w:7.5rem));
            .title {
                @include box((fs:0.24rem, c:$white, lh:0.34rem));
                opacity: 0.5;
            }
            .account {
                @include box((m:0.5rem auto, ta:center, fs:0.64rem, c:$white, lh:0.77rem));
            }
            .desc {
                @include box((ta:center, c:$white, lh:0.4rem, fs:0.28rem));
                label {
                    opacity: 0.5;
                }
                strong {
                    @include box((d:inline-block, w:0.3rem, h:0.4rem, p:0.05rem 0));
                    vertical-align: top;
                    position: relative;
                    i {
                        @include box((d:inline-block, w:0.3rem, h:0.3rem));
                        @include bg_img('my_account_msg.png');
                    }
                    span {
                        @include position((p:absolute, t:0.55rem, l:-0.27rem, z:5));
                        @include box((d:block, fs:0.24rem, lh:0.6rem, c:$black2, bg:$white, bdr:0.06rem));
                        font-weight: normal;
                        min-width: 1.8rem;
                        &:before {
                            @include tringle((to:top, w:0.24rem, h:0.2rem, c:$white));
                            @include position((p:absolute, t:-0.1rem, l:0.29rem));
                        }
                    }
                }
                .money {
                    @include box((m:0 0 0 0.27rem));
                }
            }
        }
    }

    .detail_title {
        @include box((lh:$detailTitH, p:0 0.2rem, fs:0.26rem, c:$black5));
    }

    .wrap {
        overflow: hidden;
        @include position((p:absolute, l:0, r:0, b:1.3rem, t:$sectionH + $detailTitH));
        .container {
            position: relative;
            $beforeAfterH: 0.5rem;
            &:before {
                content: attr(up);
                @include position((p:absolute, l:0, t:- 0.7rem, z:10));
                @include box((w:100%, h:$beforeAfterH, ta:center, lh:$beforeAfterH))
            }
            &:after {
                content: attr(down);
                @include box((d:block, w:100%, h:$beforeAfterH, ta:center, lh:$beforeAfterH));
                position: absolute;
            }
        }
    }

    .detail_ul {
        @include box((bg:$white));
        li {
            @include box((m:0 0 0 0.2rem, p:0.2rem 0.2rem 0.2rem 0, d:flex));
            @include thin(bottom, #ddd);
            .left {
                @include box((w:1.37rem, lh:0.28rem, fs:0.24rem, c:$black9, p:0.1rem 0));
            }
            .center {
                flex: 1;
                p {
                    @include box((fs:0.28rem, lh:0.39rem, c:$black3));
                }
                span {
                    @include box((fs:0.24rem, lh:0.33rem, c:$black9));
                }
            }
            .right {
                @include box((ta:right, p:0.06rem 0));
                .status {
                    @include box((fs:0.24rem, c:$black9, lh:0.33rem));
                    &.msg {
                        color: #D7A55E
                    }
                    &.error {
                        color: $red;
                    }
                }
                .tip {
                    @include box((fs:0.2rem, c:$black9, lh:0.28rem, m:0.1rem 0 0));
                }
            }
        }
    }

    .no_lists {
        @include box((bg:#f6f6f6));
        @include position((p:absolute, l:0, b:1.3rem, r:0, t:$sectionH));
        div {
            @include box((w:2.4rem, h:2.4rem, m:0.48rem auto 0));
            @include bg_img('my/empty_pig.png')
        }
        p {
            @include box((fs:0.28rem, lh:0.4rem, ta:center, c:$black9))
        }
    }

    .bottom_btns {
        @include box((h:1.3rem, w:100%, bg:$white, fs:0.36rem));
        display: flex;
        @include position((p:fixed, b:0, l:0, r:0));
        p {
            flex: 1;
            @include box((ta:center));
            a {
                @include box((w:3rem,h:0.88rem,lh:0.88rem,d:inline-block, m:0.21rem auto, bdr:0.44rem));
            }
            &:nth-child(1) {
                a {
                    @include box((c:$blue));
                    @include thin(all, $blue);
                }
            }
            &:nth-child(2) {
                a {
                    @include box((c:$white, bg:$red));
                }
            }
        }
    }
</style>