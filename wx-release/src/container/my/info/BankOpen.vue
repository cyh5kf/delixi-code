<template>
    <div>
        <div class="banner"></div>
        <div v-show="step === 1">
            <ul class="info">
                <li>
                    <span>姓名</span>
                    <input type="text" v-model="name" placeholder="请输入您的真实姓名"/>
                </li>
                <li>
                    <span>身份证</span>
                    <input type="text" v-model="idCard" placeholder="请输入您的身份证号"/>
                </li>
                <li>
                    <span>卡号</span>
                    <input type="text" v-model="bankCard" placeholder="请输入您的银行卡号"/>
                </li>
                <li>
                    <span>手机号</span>
                    <input type="text" v-model="prePhone" placeholder="请输入银行预留手机号"/>
                </li>
            </ul>
            <p class="surport_bank">
                <router-link to="/my/bankSurportList">支持银行></router-link>
            </p>
            <Btn class="mt" type="red" label="提交" :click="show_dialog"></Btn>
        </div>
        <div v-show="step === 2">
            <div class="success"></div>
            <p class="success_title">银行存管账户开通成功</p>
            <Btn class="mt" type="red" v-if="!info.isPayPasWord" :click="setPwd" label="设置交易密码"></Btn>
            <Btn class="mt" type="red" v-if="info.isPayPasWord" :href="'/my/info'" label="确定"></Btn>
        </div>
        <VDialog :close="close" :show="d_state" :disableShadeClose="true">
            <div class="dialog">
                <p>已向手机号码 <span v-text="prePhone.substr(0,3)+'****'+prePhone.substr(7,11)"></span> 发送短信</p>
                <Inputs type="border">
                    <input type="tel" v-model="smsCode" placeholder="请输入短信验证码"/>
                    <SendCode ref="sendCode" class="sd" :click="clickDialogGetCode"></SendCode>
                </Inputs>
                <Btn type="red" label="确定" :click="doSubmit"></Btn>
            </div>
        </VDialog>
    </div>
</template>
<script>
    import Btn from '@/component/Btn'
    import VDialog from '@/component/Dialog'
    import Inputs from '@/component/Inputs'
    import SendCode from '@/component/SendCode'
    import API from '@/api'
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: 'BankOpen',
        data() {
            return {
                name: '',
                idCard: '',
                bankCard: '',
                prePhone: '',
                smsCode: '',
                step: 1,
                d_state: false
            }
        },
        methods: {
            ...mapActions([
                'showMsg',
                'setLoginTo',
                'setInfo',
            ]),
            async clickDialogGetCode(callback){
                await API.get(API.openAccountSendSms, {mobile: this.prePhone})
                callback()
            },
            async show_dialog() {
                if (!this.name) {
                    this.showMsg('姓名不能为空')
                    return false
                }
                if (!this.idCard) {
                    this.showMsg('身份证不能为空')
                    return false
                } else if (!/^(\d{15})|(\d{17}(\d|X|x))$/.test(this.idCard)) {
                    this.showMsg('身份证格式不正确')
                    return false
                }
                if (!this.bankCard) {
                    this.showMsg('银行卡不能为空')
                    return false
                }
                if (!(/^1\d{10}$/).test(this.prePhone)) {
                    this.showMsg('手机号码格式不正确')
                    return false
                }
                this.$refs.sendCode.get_phone()
                this.d_state = true
            },
            async doSubmit(){
                if (!(/^\d{6}$/).test(this.smsCode)) {
                    this.showMsg('请输入正确格式的验证码')
                    return false
                }
                const param = {
                    name: this.name,
                    idCode: this.idCard,
                    cardNo: this.bankCard,
                    preMobile: this.prePhone,
                    smsCode: this.smsCode
                }
                await API.get(API.openAccount, param)
                this.d_state = false
                this.step = 2
                this.setInfo({realNameStatus: 1})
            },
            close() {
                this.d_state = false
            },
            setPwd() {
                this.setLoginTo('/my/index')
                this.$router.push('/my/setPwd/3')
            }
        },
        computed: {
            ...mapGetters([
                'info'
            ])
        },
        components: {
            Btn,
            VDialog,
            Inputs,
            SendCode
        }
    }
</script>
<style lang="scss" scoped>
    .banner {
        @include box((h:1.2rem));
        @include bg_img('bank_open.png');
    }

    .surport_bank {
        @include box((lh:0.6rem, ta:right, p:0 0.3rem));
        a {
            @include box((c:$blue, fs:0.24rem))
        }
    }

    .info {
        padding-left: 0.3rem;
        @include box((bg:$white));
        li {
            @include box((h:1rem, lh:1rem, c:$black2));
            &:not(:last-child) {
                @include thin(bottom, #ddd);
            }
            span {
                @include box((d:inline-block, w:1.5rem, fs:0.3rem));
            }
            input {
                @include box((fs:0.28rem));
            }
        }
    }

    .dialog {
        @include box((p:0.4rem 0.3rem));
        p {
            @include box((ta:center, p:0.3rem 0, c:$black9));
            span {
                @include box((c:$black3));
            }
        }
        input {
            @include box((w:2.8rem));
        }
    }

    .sd {
        text-align: right;
        flex: 1
    }

    .mt {
        margin: 0.2rem 0.3rem 0.8rem 0.3rem;
    }

    .success {
        @include box((w:1rem, h:1rem, m:0.6rem auto 0.4rem));
        @include bg_img('bank_open_ok.png');
    }

    .success_title {
        @include box((ta:center, fs:0.32rem, c:$black5));
    }
</style>