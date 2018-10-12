<template>
    <div class="login-content">
        <p class="login-title">欢迎登录后台数据监控</p>
        <div class="input">
            <p>手机号</p>
            <input class="phone-input" type="tel" ref="account" v-model="account" maxlength="11" placeholder="请输入11位手机号码" />
            <div style="padding: 0 .2rem;" v-show="showCloseBtn" @click="clearAccount">
                <a class="close"></a>
            </div>
        </div>
        <div class="input">
            <p>验证码</p>
            <input class="code-input" type="tel"  maxlength="6" v-model="vcode" placeholder="请注意查收短信" />
            <p class="get-code" v-show="!toggleVcode" @click="sendVcode">获取验证码</p>
            <p class="re-get-code" v-show="toggleVcode"><span v-text="countDown"></span>秒后重发</p>
        </div>
        <div class="remember-psd">
            <div class="click-area" @click="rememberPsd">
                <div :class="{'remember-btn': true, 'checked-bg': isRememberPsd, 'un-checked-bg': !isRememberPsd}"></div>
                <span>7日免登录</span>
            </div>

        </div>
        <div class="login-btn" type="primary" @click="login">登录</div>

        <DialogTip :show="show" :massage="massage"></DialogTip>

        <Loading :show="showLoading" ></Loading>

        <!-- <p class="footer">人众金服出品</p> -->
    </div>
</template>

<script>
// @ is an alias to /src
import { getLocalStorageItem, setLocalStorageItem, axiosRequest } from '@/assets/util.js'
import DialogTip from '@/components/DialogTip'
import Loading from '@/components/Loading'

export default {
    name: "login",
    data() {
        return {
            account:'', // 账号
            vcode: '', // 验证码
            isRememberPsd: true, // 是否勾选七天免登录，默认勾选
            toggleVcode: false, // 切换获取验证码按钮
            countDown: 60, // 倒计时时间，初始60秒
            show: false,  // 显示弹窗消息提示
            showLoading: false, //显示loading
            massage: '',  // 弹窗消息文本
        }
    },
    created() {
        const expiryTime = getLocalStorageItem('expiryTime');
        if(expiryTime) {
            const now = Math.round(new Date().getTime()/1000);
            if(now < expiryTime) { // 登录状态没有过期
                this.$router.push('/');
            }
        }
    },
    computed:{
        showCloseBtn() {
            var account = this.account;
            return account? true: false;
        },
    },
    methods: {
        // 点击登录
        async login() {
            var name = this.account;
            var vcode = this.vcode;
            var isRememberPsd = this.isRememberPsd;
            if(!name) {
                this.openMsg('请输入手机号码');
                return false;
            }

            if(!vcode) {
                this.openMsg('请输入验证码');
                return false;
            }

            // $(".loading-wrapper").show();
            var param = {
                mobile: this.account,
                mobilecode: this.vcode
            }
            // 登录接口
            this.showLoading = true;
            const data = await axiosRequest('apiApp/datanew/login.html', param, 'post');
            this.showLoading = false;
            if(data.responseCode === '000000') {
                // $(".loading-wrapper").hide();
                if(isRememberPsd) { // 勾选记住密码
                    var expiryTime = Math.round(new Date().getTime()/1000) + 7*24*60*60; // 设置登录状态过期时间为7天
                    setLocalStorageItem('expiryTime', expiryTime);
                } else { // 不勾选记住账户密码
                    var expiryTime = Math.round(new Date().getTime()/1000) + 30*60; // 保存登录状态30分钟
                    setLocalStorageItem('expiryTime', expiryTime);
                }
                setLocalStorageItem('token', data.obj); // 存储用户信息
                setLocalStorageItem('uid', this.account); // 存储用户信息
                this.$router.push('/');
            } else {
                this.openMsg(data.responseMessage);
            }
        },

        // 点击清空账户input内容
        clearAccount() {
            this.account = '';
            this.$refs.account.focus();
        },

        // 点击是否记住密码
        rememberPsd() {
            this.isRememberPsd = !this.isRememberPsd;
        },

        openMsg(msg) {
            this.show = true;
            this.massage = msg;
            setTimeout(() => {
                this.show = false;
                this.massage = '';
            }, 2000);
        },

        // 点击获取验证码
        async sendVcode() {
            const _this = this;
            const param = {
                mobile: this.account
            }
            const name = this.account;
            if(!name) {
                this.openMsg('请输入手机号码');
                return false;
            }
            const data = await axiosRequest('/apiApp/datanew/sendVcode.html', param, 'post');
            if(data.responseCode === '000000') {
                this.toggleVcode = true; // 切换为重发提示
                const timer = setInterval(function() {
                    _this.countDown--;
                    if(_this.countDown === 0) {
                        clearInterval(timer);
                        _this.countDown = 60;
                        _this.toggleVcode = false;
                    }
                }, 1000)
            } else {
                this.openMsg(data.responseMessage);
            }

        },

    },
    components: {
        DialogTip,
        Loading
    }

};
</script>

<style lang="scss" scoped>
    .login-content {
        width: 100%;
        height: 100%;
        padding: 0.52rem 0.75rem;
    }

    .login-title {
        font-size: 0.36rem;
        color: #5569cc;
        width: 100%;
        text-align: center;
        margin-bottom: 0.63rem;
    }

    .login-content .input {
        width: 100%;
        padding-top: 0.4rem;
        border-bottom: 1px solid #e5e5e5;
        overflow: hidden;
        display: flex;
    }

    .login-content .input p {
        font-size: .3rem;
        color: #333;
        line-height: .8rem;

    }

    .login-content .input input {
        height: 0.79rem;
        margin-left: .35rem;
        display: block;
        font-size: 0.3rem;
        color: #222;
    }

    .login-content .phone-input {
        width: 4rem;
    }

    .login-content .code-input {
        width: 3.5rem;
    }

    .login-content .input input::-webkit-input-placeholder { /* WebKit browsers*/
    　　font-size: 0.3rem;
        color: #c8c8ce;
        position: relative;
        top: -0.05rem;
    }

    .login-content .input .close {
        width: 0.31rem;
        height: 0.31rem;
        background: url(https://images.51rz.com/images/app/bg-statistics/close-btn-gay.png) no-repeat;
        background-size: 100% 100%;
        display: block;
        margin-top: 0.28rem;
    }

    /* .login-content .input .close-eye {
        width: 0.44rem;
        height: 0.19rem;
        background: url(https://images.51rz.com/images/app/bg-statistics/close-eye.png) no-repeat;
        background-size: 100% 100%;
        display: block;
        margin-top: 0.28rem;
    }

    .login-content .input .open-eye {
        width: 0.44rem;
        height: 0.28rem;
        background: url(https://images.51rz.com/images/app/bg-statistics/open-eye.png) no-repeat;
        background-size: 100% 100%;
        display: block;
        margin-top: 0.28rem;
    } */

    .login-content .input .get-code {
        font-size: .24rem;
        color: #5569cc;
        line-height: .8rem;
    }

    .login-content .input .re-get-code {
        font-size: .24rem;
        color: #a2a2a2;
        line-height: .8rem;
    }

    .remember-psd {
        margin-top: .4rem;
        display: flex;
        justify-content: flex-end;
    }

    .remember-psd .remember-btn {
        width: .22rem;
        height: .22rem;
        margin-right: .1rem;
    }

    .remember-psd .click-area {
        display: flex;
        align-items: center;
    }

    .remember-psd  .checked-bg {
        background: url(https://images.51rz.com/images/app/bg-statistics/checked-btn.png) no-repeat;
        background-size: 100% 100%;
    }

    .remember-psd  .un-checked-bg {
        background: url(https://images.51rz.com/images/app/bg-statistics/checkbox-btn.png) no-repeat;
        background-size: 100% 100%;
    }

    .remember-psd span {
        color: #5569cc;
        font-size: .22rem;
    }

    .login-btn {
        width: 100%;
        height: .88rem;
        line-height: .88rem;
        background-color: #5569cc;
        border-radius: 4px;
        font-size: .3rem;
        color: #f0f0f9;
        text-align: center;
        margin-top: .28rem;
    }

    .login-content .footer {
        font-size: .24rem;
        color: #5569cc;
        position: fixed;
        bottom: .6rem;
        left: 50%;
        transform: translate(-50%, 0);
    }
</style>
