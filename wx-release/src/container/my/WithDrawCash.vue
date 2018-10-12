<template>
    <div class="wraper">
        <ul class="form_group">
            <Inputs class="first" :labelWidth="'2.6rem'" :label="'可提现金额(元)'">
                <p v-text="cash"></p>
            </Inputs>
            <Inputs :label="'提现至'">
                <p v-text="cashToBank"></p>
            </Inputs>
            <p class="normal_msg_line" v-text="errorMsg"></p>
            <Inputs :label="'提现金额'">
                <input type="number"
                       @input="changeLevels"
                       v-model="money"
                       placeholder="请输入提现金额">
            </Inputs>
            <router-link class="rules" tag="p" to="/my/withDrawCashRules">提现规则 </router-link>
            <p class="confirm_btn">
                <Btn label="确认提现" type="red" :click="submitWithDrawCash"/>
            </p>
            <p class="bottom_sxf">
                <span v-show="free_times">当月手续费限免还有<span v-text="free_times"></span>次</span>
                <span v-show="!free_times">手续费：<span v-text="fee.toFixed(2)"></span>元</span>
            </p>
        </ul>

        <!--/resetPwd/2  1:登录密码  2：支付密码-->
        <VDialog :show="showBomb" :close="closeConfirmPass">
            <div class="bomb_cont">
                <Inputs :type="'border'">
                    <input type="password" maxLength="16" v-model="payPassVal" placeholder="请输入支付密码"/>
                    <router-link to="/resetPwd/2">忘记密码？</router-link>
                </Inputs>
                <Btn label="确认" type="red" :click="confirmPass"/>
            </div>
        </VDialog>

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

    </div>
</template>
<script>
    import Btn from '@/component/Btn'
    import VDialog from '@/component/Dialog'
    import Inputs from '@/component/Inputs'
    import API from '@/api'
    import MD5 from 'blueimp-md5'
    import SHA256 from 'sha256'
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: 'WithDrawCash',
        data() {
            return {
                showBomb: false,//是否显示弹框
                showNoPayPassDialog: false,//提示未设置过交易密码
                cash: 0,//可提现金额
                cashToBank: '',//提现银行卡
                errorMsg: '',
                money: '',//提现金额
                payPassVal: '',//提现密码
                free_times: 0, //免费次数
                fee: 0,         //提现手续费
                levels: [],     //提现手续费等级
            }
        },
        mounted() {
            this.initData()
        },
        methods: {
            async initData() {
                const data = await API.post(API.showWithdrawInfoApp, {from: 'wap'})
                const {cash, bank_name, bank_no, in_transit, free_times, levels} = data
                this.cash = cash.toLocaleString()
                this.cashToBank = `${bank_name}(${bank_no})`
                this.errorMsg = `今日充值金额${in_transit}元未入账，不可提现`
                this.free_times = free_times
                this.levels = levels
            },
            submitWithDrawCash() {//提现弹框
                if (!this.info.isPayPasWord) {//没有设置交易密码
                    this.$data.showNoPayPassDialog = true
                    return
                }
                if (this.money && /^\d+(\.\d{1,2})?$/.test(this.money * 1)) {
                    this.showBomb = true
                } else {
                    this.showMsg('请输入正确的金额')
                }
            },
            async confirmPass() {
                if (this.payPassVal.length < 6) {
                    this.showMsg('密码长度不够')
                }
                const param = {
                    money: this.money,
                    pay_pwd: SHA256(MD5(this.payPassVal)),
                    from: 'wap',
                }
                await API.post(API.addWithdrawRecord, param)
                this.showMsg('提现成功')
                setTimeout(() => {
                    this.$router.replace('/my/account')
                }, 2000)
            },
            changeLevels() {
                if (this.free_times) return
                const levels = this.levels
                const money = this.money
                for (let i = 0; i < levels.length; i++) {
                    let {fee, max=0, min=0} = levels[i]
                    if (money >= min*1 && money < max*1) {
                        this.fee = fee
                        break
                    }
                }
            },
            closeConfirmPass() {
                this.showBomb = false
                this.payPassVal = ''
            },
            closeNoPayPassDialog(){
                this.showNoPayPassDialog=false
            },
            ...mapActions([
                'showMsg'
            ]),
        },
        computed:{
            ...mapGetters([
                'info'
            ]),
        },
        components: {
            Btn,
            VDialog,
            Inputs
        }
    }
</script>
<style lang="scss" scoped>

    .wraper {
    }

    .form_group {
        .first {
            @include box((m:0 0 0.3rem 0));
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

    .confirm_btn {
        @include box((p:0.06rem 0.3rem 0));
    }

    .bomb_cont {
        @include box((p:0.85rem 0.3rem 0.4rem));
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