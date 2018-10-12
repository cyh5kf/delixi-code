<template>
    <div class="reset_wrap" :style="height">
        <!--第一步  如果实名认证过的话 身份校验  否则直接步骤二-->
        <div class="container" v-if="showStep1">
            <div class="tip">
                <p>为保证您的资金安全</p>
                <p>请输入您的身份信息进行验证</p>
            </div>
            <div class="inputWraper">
                <Inp v-on:msg="getRealName"
                     :value="realName"
                     type="text"
                     :ph="'请输入您的真实姓名'">
                </Inp>
                <Inp v-on:msg="getIdCard"
                     :value="idCard"
                     type="text"
                     :maxlength="20"
                     :ph="'请输入身份证号'">
                </Inp>
                <Btn label="下一步"
                     type="red"
                     class="mt"
                     :_style="_style"
                     :class="valied?'valied':'noValied'"
                     :click="next"></Btn>
            </div>
        </div>

        <!--第二步 重置交易密码-->
        <div class="reset_content" v-if="!showStep1">
            <Inp v-on:msg="getName" :value="name" type="number" ph="请输入手机号"></Inp>
            <Inp v-on:msg="getPhone" :value="phone" type="tel" ph="请输入短信验证码">
                <SendCode :click="getPhoneCode"></SendCode>
            </Inp>
            <Inp v-on:msg="getPwd" :value="pwd" :type="pwd_type"
                 :ph="type == 1 ? '请设置登录密码' : '请设置交易密码'">
                <div>
                    <a :class="eye_class" @click="change_eye"></a>
                </div>
            </Inp>
            <Btn label="确定" type="red" :click="reset" class="mt"></Btn>
        </div>
    </div>
</template>
<script>
    import Btn from '@/component/Btn'
    import Inp from '@/component/Input'
    import SHA256 from 'sha256'
    import MD5 from 'blueimp-md5'
    import SendCode from '@/component/SendCode'
    import API from '@/api'
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: 'resetPwd',
        data() {
            return {
                realName:'',//真实姓名
                idCard:'',//身份证号
                valied:false,
                hasChekedRealName:false,//是否已经校验过真实姓名

                height: '',
                type: this.$route.params.type,  //1 登录 2 交易
                name: '',
                img: '',
                phone: '',
                pwd: '',
                eye_class: 'close_eye',
                pwd_type: 'password',
                api: {
                    1: {
                        phone: API.sendUserVcode,//登录短信码接口
                        set: API.resetLoginPassword,//登录提交接口
                    },
                    2: {
                        phone: API.sendPayPwdVcode,//交易短信码接口
                        set: API.resetPassword,//交易提交接口
                    }
                },
                phoneReg: /^1\d{10}$/,
            }
        },
        mounted() {
            const {setTitle} = this.$route.meta
            if (this.type == 1) {
                setTitle('找回登录密码')
            } else if (this.type == 2) {
                setTitle('找回交易密码')
            }
        },
        methods: {
            ...mapActions([
                'showMsg'
            ]),
            checkPhone() {
                const {
                    name,
                    phoneReg,
                } = this.$data
                const showMsg = this.showMsg
                if (!name) {
                    showMsg('手机号码不能为空')
                    return
                }
                if (!phoneReg.test(name)) {
                    showMsg('手机号码格式不正确')
                    return
                }
                return true
            },
            async getPhoneCode(callBack) {//获取短信验证码
                if (!this.checkPhone()) return
                const {
                    name,
                    api,
                    type,
                } = this.$data
                const url = api[type].phone
                await API.get(url, {mobile: name})
                callBack()
            },
            async reset() {//表单校验、提交
                const showMsg = this.showMsg
                const {
                    name,
                    phone,
                    pwd,
                    api,
                    type,
                } = this.$data
                if (!this.checkPhone()) return
                if (!phone) {
                    showMsg('短信验证码不能为空')
                    return
                }
                if (!/^\d{6}$/.test(phone)) {
                    showMsg('短信验证码格式不正确')
                    return
                }
                if (!pwd) {
                    showMsg('密码不能为空')
                    return
                }
                if (pwd.length < 6) {
                    showMsg('密码不能小于6位字符')
                    return
                }
                const url = api[type].set
                const param = {
                    mobilecode: phone,
                    password: SHA256(MD5(pwd)),
                }
                if (type == 1) {
                    const saltPass = await API.saltPass(pwd, name)
                    param.mobile = name
                    param.password = saltPass//修改登录密码需要加盐处理
                }
                await API.get(url, param)
                showMsg('密码设置成功')
                setTimeout(() => {
                    this.$router.go(-1)
                }, 2000)
            },
            change_eye() {
                if (this.eye_class === 'close_eye') {
                    this.eye_class = 'open_eye'
                    this.pwd_type = 'text'
                } else {
                    this.eye_class = 'close_eye'
                    this.pwd_type = 'password'
                }
            },
            getRealName(val){
                this.realName = val
                this.checkValied()
            },
            getIdCard(val){
                this.idCard = val
                this.checkValied()
            },
            checkValied(){
                this.$data.valied =this.realName && this.idCard
            },
            async next(){
                if(!this.valied){
                    return
                }
                const param={
                    realName:this.realName,
                    cardId:this.idCard
                }
                const obj=await API.post(API.verifyCardIdAndRealName,param)
                this.hasChekedRealName=true
            },
            getName(val) {
                this.name = val
            },
            getPwd(val) {
                this.pwd = val
            },
            getCode(val) {
                this.code = val
            },
            getImg(val) {
                this.img = val
            },
            getPhone(val) {
                this.phone = val
            }
        },
        created() {
            this.height = `height:${document.body.getBoundingClientRect().height}px`
        },
        computed: {
            ...mapGetters([
                'info'
            ]),
            _style(){
                return this.valied?'':'color:#FF968D'
            },
            showStep1(){
                return this.info.realNameStatus==1 && this.type == 2 && !this.hasChekedRealName
            }
        },
        components: {
            Btn,
            Inp,
            SendCode
        }
    }
</script>
<style lang="scss" scoped>
    .reset_wrap {
        @include box((p:0.4rem 0.75rem, bg:$white));
    }

    .reset_title {
        @include box((c:$red, fs:0.4rem));
        margin-bottom: 0.8rem;
    }

    .icon {
        @include box((d:block, w:0.5rem, h:0.5rem, m:0.25rem 0));
    }

    .close {
        @extend .icon;
        @include bg_img('close.png');
    }

    .close_eye {
        @extend .icon;
        @include bg_img('close_eye.png');
    }

    .open_eye {
        @extend .icon;
        @include bg_img('open_eye.png');
    }

    .mt {
        margin-top: 0.8rem;
    }

    .tip{
        @include box((ta:center,c:$black9,fs:0.26rem,lh:0.48rem,p:1rem 0 0.5rem 0))
    }

</style>