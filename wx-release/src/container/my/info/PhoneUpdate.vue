<template>
    <div class="wrap" :style="height">
        <div v-show="step === 1">
            <Inp readonly="true" type="text" :value="`原绑定手机 ${old_phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}`">
            </Inp>
            <Inp v-on:msg="getOldCode" :value="old_code" type="tel" ph="请输入短信验证码">
                <SendCode :click="send_old_code"></SendCode>
            </Inp>
            <Inp v-on:msg="getNewPhone" :value="new_phone" type="tel" ph="请输入您要更换的手机号码">
            </Inp>
            <Btn :click="next" type="red" label="下一步" class="mt"></Btn>
        </div>
        <div v-show="step === 2">
            <div class="send_title">
                已向手机号码 <span v-text="new_phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')"></span> 发送短信
            </div>
            <Inp v-on:msg="getNewCode" :value="new_code" type="tel" ph="请输入短信验证码">
                <SendCode ref="sendCode" :click="send_new_code"></SendCode>
            </Inp>
            <Btn type="red" label="确定" class="mt" :click="reset"></Btn>
        </div>
    </div>
</template>
<script>
    import Inp from '@/component/Input'
    import SendCode from '@/component/SendCode'
    import Btn from '@/component/Btn'
    import API from '@/api'
    import {mapGetters, mapActions} from 'vuex'
    export default {
        name: 'phoneUpdate',
        data() {
            return {
                height: '',
                step: 1,
                old_phone: '',
                old_code: '',
                new_code: '',
                new_phone: '',
                codeReg: /^\d{6}$/
            }
        },
        methods: {
            async reset() {
                if (!this.new_code && this.codeReg.test(this.new_code)) {
                    this.showMsg('请输入正确格式的验证码')
                    return
                }
                await API.get(API.resetPhone, {mobilecode: this.new_code})
                this.showMsg('修改成功')
                this.setInfo({regMobile: this.new_phone})
                setTimeout(() => {
                    this.$router.go(-1)
                }, 2000)
            },
            async next() {
                if (!this.old_code && this.codeReg.test(this.old_code)) {
                    this.showMsg('请输入正确格式的验证码')
                    return
                }
                await API.get(API.oldPhoneCheck, {mobilecode: this.old_code, mobile: this.new_phone})
                this.$refs.sendCode.get_phone()
                this.step = 2
            },
            async send_old_code(callback) {
                await API.get(API.oldPhoneSendCode, {mobile: this.old_phone})
                callback()
            },
            async send_new_code(callback) {
                await API.get(API.newPhoneSendCode, {mobile: this.new_phone})
                callback()
            },
            ...mapActions([
                'showMsg',
                'setInfo'
            ]),
            getOldCode(val){
                this.old_code = val
            },
            getNewCode(val){
                this.new_code = val
            },
            getNewPhone(val){
                this.new_phone = val
            }
        },
        computed: {
            ...mapGetters([
                'info'
            ])
        },
        created() {
            this.height = `height:${document.body.getBoundingClientRect().height}px`
            this.old_phone = this.info.regMobile
        },
        components: {
            Inp,
            SendCode,
            Btn
        }
    }
</script>
<style lang="scss" scoped>
    .wrap {
        @include box((p:0.4rem 0.75rem, bg:$white));
    }

    .mt {
        margin-top: 0.8rem;
    }

    .send_title {
        @include box((lh:1rem, ta:center, fs:0.3rem, c:$black9));
        span {
            @include box((fs:0.32rem, c:$black2));
        }
    }
</style>