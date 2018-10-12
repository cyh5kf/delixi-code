<template>
    <div class="login_wrap" :style="height">
        <div class="login_title" v-text="info.regMobile?'欢迎回来':'欢迎光临人众金服'"></div>
        <div class="login_content">
            <Inp v-on:msg="getName" :value="name" type="text" ph="请输入手机号/用户名">
                <div>
                    <a class="close" @click="close"></a>
                </div>
            </Inp>
            <Inp v-on:msg="getPwd" :value="pwd" :type="pwd_type" ph="请输入登录密码">
                <div>
                    <a :class="eye_class" @click="change_eye"></a>
                </div>
            </Inp>
            <div class="forget_pwd">
                <router-link to="/resetPwd/1">忘记密码?</router-link>
            </div>
            <Btn label="登录" type="red" :click="login"></Btn>
            <a class="register_btn" href="/register">新用户注册</a>
        </div>
    </div>
</template>
<script>
    import Btn from '@/component/Btn'
    import Inp from '@/component/Input'
    import API from '@/api'
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: 'login',
        data() {
            return {
                height: '',
                name: '',
                pwd: '',
                eye_class: 'close_eye',
                pwd_type: 'password'
            }
        },
        methods: {
            ...mapActions([
                'showMsg',
                'setLoginTo',
                'setInfo'
            ]),
            async login() {
                const name = this.name
                const pwd = this.pwd
                const loginTo = this.loginTo           //保存loginTo
                if (!name) {
                    this.showMsg('请输入用户名')
                    return
                }
                if (!pwd) {
                    this.showMsg('请输入密码')
                    return
                }
                const saltPass = await API.saltPass(pwd, name)
                const param = {
                    username: name,
                    password: saltPass,
                }
                const obj = await API.get(API.login, param)
                if(obj.black) {
                    this.showMsg(obj.blackMsg)
                    setTimeout(() => {
                        window.location.href = 'https://www.51rz.com/ind/wx/'
                    },2000)
                }
                this.setLoginTo('')                    //清空loginTo
                this.setInfo(obj)                      //保存用户的基本信息

                window._vds.push(['setCS1', 'user_id', obj.uid])    //添加统计
                this.pwd = ''               //清空密码
                //活动跳转判断
                const referrer = document.referrer
                // if(referrer.indexOf('token=') > -1) {
                //     window.location.replace(referrer.replace('token=','token='+obj.token))
                //     return
                // }
                if(referrer.indexOf('activity-center') > -1) {
                    if(referrer.indexOf('token=') > -1) { // 有token，是从banner跳转过来的
                        window.location.replace(referrer.replace('token=','token='+obj.token))
                    } else { //不是banner跳转过来，单独的html页面
                        window.location.replace(`${referrer}?token=${obj.token}&type=${document.domain.split('.')[0]}`);
                    }
                    return
                }

                if (loginTo) {
                    this.$router.replace(loginTo)
                }else {
                    window.history.go(-1)
                }
            },
            close(){
                this.name = ''
            },
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
                this.pwd = val
            }
        },
        created() {
            this.name = this.info.regMobile
            this.height = `height:${document.body.getBoundingClientRect().height}px`
        },
        computed: {
            ...mapGetters([
                'loginTo',
                'info'
            ])
        },
        components: {
            Btn,
            Inp
        }
    }
</script>
<style lang="scss" scoped>
    .login_wrap {
        @include box((p:0.4rem 0.75rem, bg:$white));
    }

    .login_title {
        @include box((c:$red, fs:0.4rem));
        margin-bottom: 0.8rem;
    }

    .forget_pwd {
        @include box((ta:right, m:0.15rem 0 0.5rem 0));
        a {
            @include box((c:$blue, fs:0.24rem));
        }
    }

    .register_btn {
        @include box((d:block, c:$blue, fs:0.24rem, m:0.3rem 0, ta:center));
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
</style>