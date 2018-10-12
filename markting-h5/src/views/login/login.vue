<template>
    <div class="login-view" type="flex" justify="center" align="middle">
        <Form class="login-form" ref="formInline" :model="formInline" :rules="ruleInline">
            <div class="login-title">人众金服活动营销系统</div>
            <Form-item prop="username">
                <Input type="text" v-model="formInline.username" placeholder="Username">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </Form-item>
            <Form-item prop="password">
                <Input type="password" v-model="formInline.password" placeholder="Password">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
                </Input>
            </Form-item>
            <Form-item>
                <Button class="login-form-button" type="primary" @click="handleSubmit('formInline')">Log in</Button>
            </Form-item>
        </Form>
    </div>
</template>
<script>
import { loginRequest } from '../../api/LoginApi';
import localStorage from '../../store/localstorage';

export default {

    data() {
        return {
            formInline: {
                username: '',
                password: ''
            },
            ruleInline: {
                username: [
                    { required: true, message: '请填写用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请填写密码', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                ]
            },
            isLoading: false
        };
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let { username, password } = this.formInline;
                    const dataObj = {
                        username: username,
                        password: password
                    };
                    
                    loginRequest(dataObj).then((response) => {
                        
                        if(response) {
                            if (response.status == 200 && response.data.code === 1) {
                                const access_token = response.data.data.access_token;
                                localStorage.setUserName(username);
                                localStorage.setToken(access_token);
                                setTimeout(()=>{
                                    this.$router.push({
                                        path: '/home/part1'
                                    });
                                    this.$Message.success('登录成功！');
                                },10);
                            }else {
                                this.$Message.error('登录错误，请重新登录！');
                            }
                           
                        } else {
                            this.$Message.error('登录错误，请重新登录！');
                        }
                    });
                }
            });
        }
    },

    
};
</script>

<style lang="less" scoped>
.login-view {
    background-color: #f7f7f7;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    text-align: center;

    .login-form {
        width: 400px;
        padding: 10px 40px 20px 40px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -200px;
        margin-left: -200px;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .2);
    }

    .login-title {
        font-size: 20px;
        text-align: center;
        margin-top: 20px;
        margin-bottom: 20px;
        color: #5f9bf1;
    }

    .login-form-button {
        width: 100%;
    }
}
</style>
