<template>
    <div class="wraper">
        <section class="bank_sec">
            <span class="bank_icon">
                <img :src="bankObj.icon">
            </span>
            <h4 v-text="bankNameText">**银行 (0000)</h4>
            <p>单笔限额 <span v-text="(bankObj.single_limit*1).toLocaleString()">00,000</span>元，
                单日限额 <span v-text="(bankObj.day_limit*1).toLocaleString()">000,000</span>元
            </p>
        </section>
        <div class="form_group">
            <Inputs :label="'充值金额'">
                <input type="number" v-model="money"
                       :placeholder="`最低金额不低于${bankObj.input_limit}元`"
                       @input="validateMoney"
                />
            </Inputs>

            <div class="agree_line">
                <input type="checkbox" id="agree"
                       :checked="agreeInput"
                       @click="validateAgree"
                />
                <label for="agree">我同意</label>
                <router-link to="/my/rechargeProtocol">《人众金服充值协议》</router-link>
            </div>

            <Btn class="recharge_btn" :label="'充值'" :type="btnType" :click="submitRecharge"/>
        </div>

        <VDialog :show="showBomb" :close="closeConfirmSms" :disableShadeClose="true">
            <div class="bomb_cont">
                <p class="msg">已向手机号码<span v-text="hiddenPhone"></span>发送短信</p>
                <Inputs :type="'border'">
                    <input type="tel" maxlength="6" v-model="smsInput" placeholder="请输入短信验证码"/>
                    <span class="tail" :class="{static:this.smsCount==0}" @click="getSmsCode" v-html="smsText"></span>
                </Inputs>
                <Btn label="确定" type="red" :click="confirmSmsCode"/>
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

        <VDialog :show="showSuccessDialog" :disableShadeClose="true" :disableCloseBtn="true">
            <div class="success_bomb_cont">
                <h5>充值成功</h5>
                <div></div>
                <p class="btns_bottom">
                    <router-link tag="span" to="/my/index">返回</router-link>
                    <span @click="closeShowSuccessDialog">继续充值</span>
                </p>
            </div>
        </VDialog>
        <!--连连这个坑逼 这里的请求地址老是更换 -->
        <form action="https://wap.lianlianpay.com/authpay.htm" method="post" ref="lianlianConfirmForm"
              style="display:none;">
            <input type="text" name="req_data" :value="JSON.stringify(lialianReqParam)"/>
            <input type="submit"/>
        </form>
    </div>
</template>
<script>
    import Btn from '@/component/Btn'
    import VDialog from '@/component/Dialog'
    import Inputs from '@/component/Inputs'
    import {mapGetters, mapActions} from 'vuex'
    import API from '@/api'

    export default {
        name: 'Rechage',
        data() {
            return {
                money: '',//充值金额
                moneyValied: false,//是否校验通过
                hasGetCode: false,//是否已经获取过验证码
                smsCount: 60,//验证码倒计时
                showBomb: false,//显示弹框
                showNoPayPassDialog: false,//提示未设置过交易密码
                showSuccessDialog: false,//充值成功的弹框
                pay_code: '',//银行卡支付码
                origin_order_no: '',//银行返回的订单号
                smsInput: '',
                agreeInput: true,
                bankObj: {
                    icon: '',//银行卡图标
                    bank_name: '',//银行名称
                    bank_code: '',//银行编码
                    bank_no: '',//银行卡号
                    id_no: '',//身份证ID
                    single_limit: '',//单次充值限额
                    input_limit: '',//最小充值金额限制
                    day_limit: '',//单日充值限额
                    month_limit: '',//单月充值限额
                    user_name: '',//用户姓名
                },
                lianlianResObj: {//连连充值返回结果
                    url_return: '',
                    oid_partner: '',
                    dt_order: '',
                    no_order: '',
                    oid_paybill: '',
                    money_order: '',
                    result_pay: '',
                    settle_date: '',
                    sign_type: '',
                    sign: ''
                },
                lialianReqParam: {}
            }
        },
        async mounted(){
            let bankObj = await API.post(API.showBankInfoWeb)
            this.bankObj = bankObj
        },
        computed: {
            ...mapGetters([
                'info'
            ]),
            bankNameText(){
                const {
                    bank_name,
                    bank_no
                } = this.bankObj

                let length = bank_no.length
                return `${bank_name} (${bank_no.substr(length - 4, length)})`
            },
            hiddenPhone(){
                return this.info.regMobile.substr(0, 3) + '****' + this.info.regMobile.substr(7, 11)
            },
            smsText(){
                const count0Txt = this.hasGetCode ? '重新获取' : '获取验证码'
                return this.smsCount == 0 ? count0Txt : `<i style='color:#FF9B09'>${this.smsCount}s</i>后重新获取`
            },
            btnType(){
                return this.moneyValied ? 'red' : 'disabled'
            }
        },
        methods: {
            validateMoney(){//校验输入金额
                const val = this.money
                const valied = /^\d+(\.\d{1,2})?$/.test(val)
                const agree = this.agreeInput//是否同意
                if (valied && agree) {
                    this.moneyValied = true
                } else {
                    this.moneyValied = false
                }
            },
            validateAgree() {
                this.agreeInput = !this.agreeInput
                this.validateMoney()
            },
            async submitRecharge(){//提交金额 判定用户有没有设置交易密码 =》 显示输入密码弹框

                const val = this.money * 1
//                if (!this.info.isPayPasWord) {//没有设置交易密码
//                    this.$data.showNoPayPassDialog = true
//                    return
//                }

                if (this.moneyValied) {//校验通过
                    if (val < (this.bankObj.input_limit * 1)) {//小于最小充值限额
                        this.$store.dispatch('showMsg', `充值金额不能低于${this.bankObj.input_limit}元`)
                    } else {
                        const channelParam = {
                            money: val,
                            bank_code: this.bankObj.bank_code
                        }
                        let payChannel = await API.post(API.selectPayChannel, channelParam)//选择支付路由

                        const {
                            pay_code,
                            channel
                        } = payChannel

                        this.$data.pay_code = pay_code

                        const rechargeParam = {
                            money: val,
                            pay_code,
                            from: 'wap',
                            add_ip: '0.0.0.0',
                        }
                        if (channel == 'lianlian') {//连连充值
                            let resData = await API.post(API.lianlianRecharge, rechargeParam)
                            this.lianlianResObj = resData
                            const {
                                acct_name,
                                oid_partner,
                                version,
                                user_id,
                                card_no,
                                app_request = 3,
                                sign_type,
                                busi_partner,
                                dt_order,
                                no_order,
                                name_goods,
                                notify_url,
                                money_order,
                                risk_item,
                                oid_paybill,
                                result_pay,
                                settle_date,
                                sign,
                                id_no,
                                info_order,
                                no_agree,
                                url_return,
                                valid_order
                            } = resData
                            resData.app_request = 3
                            this.$data.lialianReqParam = resData
                            setTimeout(() => {//跳转到连连充值接口
                                this.$refs.lianlianConfirmForm.submit()
                            }, 10)
                            // this.showBomb=true
                        } else {//快捷充值
                            rechargeParam.charge_type = 1//1投资账户 2融资账户
                            let resData = await API.post(API.quickRecharge, rechargeParam)
                            this.showBomb = true
                            this.changeTime()
                            let order_no
                            if (typeof resData == 'string') {
                                order_no = resData
                            } else {
                                order_no = resData.order_no
                            }

                            this.$data.origin_order_no = order_no

                        }
                    }
                }
            },
            async confirmSmsCode(){//确认短信验证码

                const val = this.smsInput
                const reg = /\S{4,6}/
                const valied = reg.test(val)

                if (valied) {
                    const confirmParam = {
                        origin_order_no: this.$data.origin_order_no,
                        identifying_code: val
                    }
                    let rechargeData = await API.post(API.quickRechargeConfirm, confirmParam)
                    this.$data.showBomb = false//确认弹框
                    this.$data.showSuccessDialog = true//成功弹框

                } else {
                    this.$store.dispatch('showMsg', `请输入正确的短信码！`)
                }
            },
            closeConfirmSms(){//关闭短信验证码弹框
                this.showBomb = false
            },
            closeNoPayPassDialog(){
                this.showNoPayPassDialog=false
            },
            closeShowSuccessDialog(){
                this.showSuccessDialog=false
            },
            changeTime(){//倒计时
                setTimeout(() => {
                    if (this.smsCount > 0) {
                        this.smsCount -= 1
                        this.changeTime()
                    } else {
                        this.hasGetCode = true
                    }
                }, 1000)
            },
            async getSmsCode(){//调用获取短信码接口  其实是调用支付接口
                if (!this.smsCount) {//为0
                    const rechargeParam = {
                        money: this.money,
                        pay_code: this.$data.pay_code,
                        from: 'wap',
                        add_ip: '0.0.0.0',
                        charge_type : 1
                    }
                    this.smsInput=''//清空原有的输入的密码
                    let resData = await API.post(API.quickRecharge, rechargeParam)
                    this.showBomb = true
                    this.changeTime()
                    const {
                        order_no
                    } = resData
                    this.$data.origin_order_no = order_no//重新设置新的订单号
                    this.smsCount = 60
                    this.hasGetCode = true
                    this.changeTime()
                }
            }
        },

        components: {
            Btn,
            Inputs,
            VDialog
        }
    }
</script>
<style lang="scss" scoped>
    .wraper {
        .bank_sec {
            @include box((p:0.24rem 0 0.26rem 1.3rem, bg:$white, m:0.3rem 0));
            position: relative;
            h4 {
                @include box((fs:0.3rem, c:$black2, lh:0.42rem));
                font-weight: normal;
            }
            p {
                @include box((m:0.2rem 0 0, fs:0.24rem, c:$black9, lh:0.33rem));
            }
            .bank_icon {
                @include box((w:0.68rem, h:0.68rem, m:-0.34rem 0));
                @include position((p:absolute, t:50%, l:0.3rem));
                overflow: hidden;
                img {
                    @include box((w:100%, h:0.68rem));
                }
            }
        }
    }

    .agree_line {
        @include box((p:0 0 0 0.3rem, h:0.9rem, lh:0.9rem, fs:0.2rem));
        input {
            @include bg_img('icon_agree_not.png');
            @include box((w:0.3rem, h:0.3rem));
            vertical-align: middle;
            -webkit-appearance: none;
        }
        input:checked {
            @include bg_img('icon_agree.png');
        }

        label {
            @include box((c:$black9));
        }
        a {
            @include box((c:$blue));
        }
    }

    .recharge_btn {
        @include box((m:0 0.3rem));
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

    .bomb_cont {
        @include box((p:0.6rem 0.3rem 0.4rem));
        .msg {
            @include box((fs:0.28rem, c:$black9, ta:center, m:0.2rem 0 0.55rem));
            span {
                @include box((c:#252525, m:0 0.1rem));
            }
        }
        .tail {
            @include box((w:2rem, ta:center, c:#3F3F3F, fs:0.24rem));
            &.static {
                color: $blue
            }
        }
    }

    .success_bomb_cont {
        h5 {
            @include box((m:0.6rem 0 0 0, ta:center, fs:0.28rem, lh:0.44rem, c:$black5));
            &:before {
                content: '';
                @include box((d:inline-block, h:0.44rem, w:0.44rem, m:0 0.3rem 0 0));
                @include bg_img('my_recharge_success.png');
                vertical-align: top;
            }
        }
        div {
            @include box((m:0.34rem auto, w:2.06rem, h:1.41rem));
            @include bg_img('my/recharge_success.png')
        }
        .btns_bottom {
            @extend .btns_bottom;
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