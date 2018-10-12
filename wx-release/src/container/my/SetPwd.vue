<template>
    <div class="wrap" :style="height">
        <Inp v-if="ph[type].old"
             v-on:msg="getOldPwd"
             :value="old_pwd"
             type="password"
             :click="changeTip"
             :ph="ph[type].old">
        </Inp>
        <Inp
                v-on:msg="getPwd"
                :value="pwd"
                :type="pwd_type"
                :click="changeTip"
                :ph="ph[type].new">
            <div>
                <a :class="eye_class" @click="change_eye"></a>
            </div>
        </Inp>
        <p class="tip" :style="`opacity:${tip?1:0}`">请使用6-16个字母、数字、符号组合</p>
        <Btn label="确定" type="red" class="mt" :click="ok"></Btn>
    </div>
</template>
<script>
    import Btn from '@/component/Btn'
    import Inp from '@/component/Input'
    import API from '@/api'
    import MD5 from 'blueimp-md5'
    import SHA256 from 'sha256'
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: 'setPwd',
        data() {
            return {
                height: '',
                tip: false,
                type: this.$route.params.type,  //1 改登录密码 2 改交易密码 3 设置交易密码
                eye_class: 'close_eye',
                pwd_type: 'password',
                old_pwd: '',
                pwd: '',
                ph: {
                    1: {
                        old: '请输入原登录密码',
                        new: '请设置新登录密码'
                    },
                    2: {
                        old: '请输入原交易密码',
                        new: '请设置新交易密码'
                    },
                    3: {
                        new: '请设置新交易密码'
                    }
                },
                api: {//接口地址
                    1: {
                        url: API.resetLoginPwd,//修改登录密码
                    },
                    2: {
                        url: API.changePayPwd,//修改交易密码
                    },
                    3: {
                        url: API.setPayPwd,//设置交易密码
                    }
                }
            }
        },
        methods: {
            ...mapActions([
                'showMsg',
                'setInfo',
                'setLoginTo',
            ]),
            async ok() {
                //输入校验
                if (this.type == 1 || this.type == 2) {
                    if (!this.old_pwd) {
                        this.showMsg('原密码不能为空')
                        return
                    }
                }
                if (!this.pwd) {
                    this.showMsg('新密码不能为空')
                    return
                }
                if (this.pwd.length < 6) {
                    this.showMsg('新密码字符长度不能低于6位')
                    return
                }
                const oldSaltPass = await API.saltPass(this.old_pwd, this.info.regMobile)
                const saltPass = await API.saltPass(this.pwd, this.info.regMobile)
                //提交
                const param = {
                    password: SHA256(MD5(this.pwd))
                }
                if (this.type == 2) {
                    param.oldPassword = SHA256(MD5(this.old_pwd))
                }
                if (this.type == 1) {
                    param.password = saltPass
                    param.oldPassword = oldSaltPass
                }
                const url = this.api[this.type].url
                await API.get(url, param)

                const successMsg=this.type==3?'设置成功':'修改成功'
                this.showMsg(successMsg)
                if(this.type==3){//设置成功了交易密码 需要更新store里面的对应字段状态
                    this.setInfo(Object.assign(this.info,{isPayPasWord:true}))
                }
                setTimeout(() => {
                    const loginTo = this.loginTo
                    if(loginTo !== '') {
                        this.setLoginTo('')
                        this.$router.replace(loginTo)
                    }else {
                        this.$router.go(-1)
                    }
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
            getOldPwd(val) {
                this.old_pwd = val
            },
            getPwd(val) {
                this.pwd = val
            },
            changeTip(flag) {
                this.tip = flag
            }
        },
        created() {
            this.height = `height:${document.body.getBoundingClientRect().height}px`
            const {setTitle} = this.$route.meta
            if (this.type == 1) {
                setTitle('修改登录密码')
            } else if (this.type == 2) {
                setTitle('修改交易密码')
            } else if (this.type == 3) {
                setTitle('设置交易密码')
            }
        },
        computed: {
            ...mapGetters([
                'info',
                'loginTo',
            ])
        },
        components: {
            Btn,
            Inp
        }
    }
</script>
<style lang="scss" scoped>
    .wrap {
        @include box((p:0.4rem 0.75rem, bg:$white));
    }

    .icon {
        @include box((d:block, w:0.5rem, h:0.5rem, m:0.25rem 0));
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

    .tip {
        @include box((fs:0.24rem, c:$yellow, m:0.2rem 0));
    }
</style>