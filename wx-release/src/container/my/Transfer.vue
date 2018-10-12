<template>
    <div class="wraper">
        <div class="top_cont">
            <router-link tag="p" class="title" v-text="detailData.borrowName+'标的信息'"
                         :to="'/tender/detail/'+detailData.bId+'/'+detailData.productType+'/'+detailData.category+'?hideBuyBtn=1'">众金宝 — 1182标的信息
            </router-link>
            <div class="content">
                <p><span>待收本金</span><label v-text="detailData.dueInMoney">00,000</label></p>
                <p><span>预期年化</span><label class="red" v-text="detailData.apr+'%'">00%</label></p>
                <p><span>到期时间</span><label v-text="dateFormat(detailData.repaymentTime)">2017-00-00</label></p>
                <!--<p><span>已获收益</span><label>45元</label></p>-->
            </div>
        </div>
        <div class="transfer_form">
            <ul class="form_group">
                <li class="input_item">
                    <label>转让金额(元)</label>
                    <input type="number"
                           v-model="transferMoney"
                           :placeholder="'建议价格 ' +detailData.transferPriceMin+'~'+detailData.transferPriceMax">
                </li>
                <li class="input_item">
                    <label>转让密码</label>
                    <input type="password"
                           maxLength="16"
                           v-model="transferPass"
                           placeholder="方便朋友间转让，可选填">
                </li>
            </ul>
            <p class="btn_wraper">
                <Btn label="确认转让" type="red" :click="submitTransfer"/>
            </p>
        </div>

        <VDialog :show="showBomb" :close="closeConfirmPass">
            <div class="bomb">
                <span class="close" @click="closeConfirmPass"></span>
                <div class="bomb_cont">
                    <div class="input_row">
                        <input type="password"
                               maxLength="16"
                               v-model="payPssInput"
                               placeholder="请输入支付密码"/>
                        <router-link to="/resetPwd/2">忘记密码？</router-link>
                    </div>
                    <Btn label="确认" type="red" :click="confirmPass"/>
                </div>
            </div>
        </VDialog>
    </div>
</template>
<script>
    import API from '@/api'
    import Btn from '@/component/Btn'
    import VDialog from '@/component/Dialog'
    import {mapGetters, mapActions} from 'vuex'
    import dateFormat from '@/lib/dateFormat'
    import MD5 from 'blueimp-md5'
    import SHA256 from 'sha256'

    export default {
        name: 'Transfer',
        data() {
            return {
                detailData: {
                    bid: '',//标的id
                    borrowName: '****',//名称
                    daishouBenJin: '',//待收本金
                    apr: '0',//年化利率
                    repaymentTime: '2017-00-00',//到期时间
                    transferPrice: '0.00~0.00',//建议价格
                },
                showBomb: false,
                transferMoney: '',
                transferPass: '',
                payPssInput: '',
            }
        },
        async mounted() {//获取转让标的详情
            const {
                tenderId,
            } = this.$route.params
            const param = {
                tenderId,//债转ID
            }
            let obj = await API.post(API.myTransferDetail, param)
            this.detailData = obj
        },
        methods: {
            dateFormat,
            ...mapActions([
                'showMsg'
            ]),
            submitTransfer(){//验证并提交转让信息
                const transferMoneyVal = this.transferMoney
                const moneyReg = /^\d+(\.\d{1,2})?$/
                const transferPassReg = /^[a-zA-Z0-9\w]{6,16}$/
                const transferPassVal = this.transferPass

                const moneyValied = transferMoneyVal != 0 && moneyReg.test(transferMoneyVal)

                const {
                    transferPriceMin,
                    transferPriceMax
                } = this.$data.detailData

                if (moneyValied) {
                    if (transferMoneyVal < transferPriceMin) {
                        this.showMsg(`转让金额不能小于${transferPriceMin}元！`)
                        return
                    }
                    if (transferMoneyVal > transferPriceMax) {
                        this.showMsg(`转让金额不能大于${transferPriceMax}元！`)
                        return
                    }
                    if (transferPassVal) {
                        if (transferPassReg.test(transferPassVal)) {
                            this.showBomb = true
                        } else {
                            this.showMsg('转让密码为6-16位英文字符数字组合！')
                        }
                    } else {
                        this.showBomb = true
                    }
                } else {
                    this.showMsg('请输入正确的转让金额！')
                }
            },
            closeConfirmPass(){
                this.showBomb = false
                this.payPssInput = ''
            },
            async confirmPass(){
                const {
                    tenderId
                } = this.$route.params
                if (this.payPssInput.length < 6) {
                    this.showMsg('支付密码为6-16位英文字符数字组合！')
                    return
                }
                const payPass = SHA256(MD5(this.payPssInput))
                const transferPassVal = this.transferPass
                const param = {
                    uid: this.info.uid,
                    amount: this.transferMoney,//转让金额
                    tenderId,//投标记录id
                    bid: this.detailData.bId,//标id
                    payPass,//
                    pwd: transferPassVal,//标定向密码
                    fromStr: 1,//来源 0 pc;1 微信;3 安卓；4 苹果
                }
                await API.post(API.createTransfer, param)
                this.showMsg('债权转让请求已受理')
                setTimeout(() => {
                    this.$router.go(-1)
                }, 2000)
            }
        },
        computed: {
            ...mapGetters([
                'info'
            ])
        },
        components: {
            Btn,
            VDialog
        }
    }
</script>
<style lang="scss" scoped>
    .top_cont {
        @include box((m:0.2rem 0, p:0 0 0 0.3rem, lh:1rem, c:$black2, bg:$white));
        .title {
            height: 1rem;
            @include position((p:relative));
            @include thin(bottom, #E5E5E5);
            &:after {
                content: '';
                @include box((d:block, w:0.3rem, h:0.3rem, bg:$red, m:-0.15rem 0 0));
                @include position((p:absolute, r:0.24rem, t:50%));
                @include bg_img('icon_arrow_right.png');
            }
        }
        .content {
            @include box((p:0.1rem 0.3rem 0.1rem 0));
            p {
                @include box((lh:0.37rem, fs:0.26rem, m:0.1rem 0));
                span {
                    @include box((c:$black9));
                }
                label {
                    @include box((c:$black5, fl:right));
                    &.red {
                        @include box((c:$red));
                    }
                }
            }
        }
    }

    .btn_wraper {
        @include box((m:0.8rem 0.75rem));
    }

    .form_group {
        .input_item {
            @include box((h:1rem, lh:1rem, bg:$white, d:flex));
            &:first-child {
                @include box((m:0 0 0.3rem));
            }
            label {
                @include box((w:2.26rem, p:0 0 0 0.3rem, c:$black2, fs:0.3rem));
                &.long {
                    width: 2.6rem;
                }
            }
            input, p {
                @include box((h:1rem, lh:1rem, fs:0.28rem, c:$black2));
                flex: 1;
            }
        }
        .normal_msg_line {
            @include box((lh:0.8rem, h:0.8rem, c:$black9, fs:0.24rem, p:0 0 0 0.3rem));
        }
        .rules {
            @include box((lh:0.74rem, c:$blue, p:0 0 0 0.3rem, fs:0.24rem));
        }
        .bottom_sxf {
            @include box((lh:0.28rem, ta:center, fs:0.2rem, c:$black9, m:0.17rem 0));
        }
    }

    .bomb_cont {
        @include box((p:0.8rem 0.3rem 0.4rem));
        .input_row {
            @include box((h:0.8rem, lh:0.8rem, fs:0.28rem, d: flex, m:0 0 0.4rem 0));
            @include thin(all, #e5e5e5);
            input {
                @include box((fs:0.28rem));
                text-indent: 0.2rem;
                flex: 1;
            }
            a {
                @include box((w:1.6rem, ta:center, c:$blue));
            }
        }
    }
</style>