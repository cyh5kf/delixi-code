<template>
    <div class="register_wrap" :style="height">
        <div class="register_title">欢迎光临人众金服</div>
        <div class="register_content">
            <Inp v-on:msg="getName" :value="name" type="number" ph="请输入手机号"></Inp>
            <Inp v-on:msg="getImg" :value="img" type="text" ph="请输入右侧图形验证码">
                <div>
                    <img :src="img_url" @click="get_img" class="img_code"/>
                </div>
            </Inp>
            <Inp v-on:msg="getPhone" :value="phone" type="tel" ph="请输入短信验证码">
                <SendCode :click="send_code"></SendCode>
            </Inp>
            <Inp v-on:msg="getPwd" :value="loginPwd" :type="pwd_type" ph="请设置登录密码">
                <div>
                    <a :class="eye_class" @click="change_eye"></a>
                </div>
            </Inp>
            <Inp v-on:msg="getCode" :value="code" type="tel" ph="邀请码(选填)"></Inp>
            <div class="agreement">
                <a :class="agree?'agree_ok':'agree'" @click="agree = !agree"></a>
                <span>注册即视为同意</span>
                <router-link to="/registerAgreement">《注册服务协议》</router-link>
            </div>
            <Btn label="注册" type="red" :click="register"></Btn>
        </div>
    </div>
</template>
<script>
    import Btn from '@/component/Btn'
    import Inp from '@/component/Input'
    import SendCode from '@/component/SendCode'
    import API from '@/api'
    import {mapGetters, mapActions} from 'vuex'
    export default {
        name: 'register',
        data() {
            return {
                height: '',
                name: '',
                img: '',
                phone: '',
                loginPwd: '',
                code: '',
                eye_class: 'close_eye',
                pwd_type: 'password',
                img_url: '',
                agree: true,
                imgToken: '',
                phoneReg: /^1\d{10}$/,
            }
        },
        methods: {
            async register() {
                const {
                    name,
                    phone,
                    loginPwd,
                    agree,
                    code,
                    phoneReg,
                } = this.$data
                const showMsg = this.showMsg
                const loginTo = this.loginTo
                if (!(phoneReg.test(name))) {
                    showMsg('手机号格式不正确')
                    return
                }
                if (!phone) {
                    showMsg('请输入短信验证码')
                    return
                }
                if (!loginPwd || loginPwd.length < 6) {
                    showMsg('请输入登录密码')
                    return
                }
                if (!agree) {
                    showMsg('请先勾选注册协议')
                    return
                }
                const saltObj = await API.saltPass(loginPwd)
                const {
                    pwd,
                    salt,
                } = saltObj
                const param = {
                    mobile: name,
                    password: pwd,
                    repassword: pwd,
                    mobileCode: phone,
                    ref: code,
                    salt: salt,
                }
                const obj = await API.get(API.register, param)
                showMsg('注册成功')
                setTimeout(() => {
                    this.setLoginTo('')     //清空loginTo
                    this.setInfo(obj)       //保存用户的基本信息
                    window._vds.push(['setCS1', 'user_id', obj.uid])    //添加统计
                    this.$router.replace('/index')
//                    if (loginTo) {
//                        this.$router.replace(loginTo)
//                    } else {
//                        this.$router.go(-1)
//                    }
                }, 2000)
            },
            async send_code(callback) {
                const {
                    name,
                    img,
                    imgToken,
                    phoneReg,
                } = this.$data
                const showMsg = this.showMsg
                if (!(phoneReg.test(name))) {
                    showMsg('手机号格式不正确')
                    return
                }
                if (!img) {
                    showMsg('请输入图形验证码')
                    return
                }
                const param = {
                    mobile: name,
                    patchcaCode: img,
                    imgToken: imgToken,
                }
                await API.get(API.rSendCode, param)
                callback()
            },
            get_img() {
                this.imgToken = new Date().getTime() + '' + Math.floor(Math.random() * 10000)
                this.img_url = API.getImgCode + '?imgToken=' + this.imgToken
            },
            ...mapActions([
                'showMsg',
                'setLoginTo',
                'setInfo'
            ]),
            change_eye(){
                if (this.eye_class === 'close_eye') {
                    this.eye_class = 'open_eye'
                    this.pwd_type = 'text'
                } else {
                    this.eye_class = 'close_eye'
                    this.pwd_type = 'password'
                }
            },
            getName(val){
                this.name = val
            },
            getPwd(val){
                this.loginPwd = val
            },
            getCode(val){
                this.code = val
            },
            getImg(val){
                this.img = val
            },
            getPhone(val){
                this.phone = val
            }
        },
        created() {
            this.height = `height:${document.body.getBoundingClientRect().height}px`
            this.get_img()
        },
        computed: {
            ...mapGetters([
                'loginTo'
            ])
        },
        components: {
            Btn,
            Inp,
            SendCode
        }
    }
</script>
<style lang="scss" scoped>
    .register_wrap {
        @include box((p:0.4rem 0.75rem, bg:$white));
    }

    .register_title {
        @include box((c:$red, fs:0.4rem));
        margin-bottom: 0.8rem;
    }

    .img_code {
        @include box((w:1.2rem));
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

    .agreement {
        @include box((c:#999, fs:0.2rem, m:0.2rem 0 0.4rem 0));
        a {
            color: $blue;
        }
    }

    .agree {
        @include box((d:inline-block, w:0.44rem, h:0.44rem));
        @include bg_img('agree.png');
        vertical-align: bottom;
    }

    .agree_ok {
        @include box((d:inline-block, w:0.44rem, h:0.44rem));
        @include bg_img('agree_ok.png');
        vertical-align: bottom;
    }
</style>