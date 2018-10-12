<template>
    <div>
        <ul class="info">
            <router-link :key="index"
                         tag="li"
                         v-for="(item,index) in list"
                         :to="item.path">
                <div>
                    <p v-text="item.name"></p>
                </div>
                <div>
                    <p class="my_arrow"></p>
                </div>
            </router-link>
        </ul>
        <Btn type="red" label="退出当前账号" class="mt" :click="loginOut"></Btn>
    </div>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex'
    import API from '@/api'
    import Btn from '@/component/Btn'

    export default {
        name: 'set',
        data() {
            return {
                data: [
                    {
                        name: '修改登录密码',
                        path: '/my/setPwd/1'
                    },
                    {
                        name: '修改交易密码',
                        path: '/my/setPwd/2'
                    },
                    {
                        name: '找回交易密码',
                        path: '/resetPwd/2',
                    },
                    {
                        name: '设置交易密码',
                        path: '/my/setPwd/3'
                    }
                ]
            }
        },
        methods: {
            async loginOut() {
                await API.get(API.loginOut)
                this.setUserEndTime('')
                this.setInfo({
                    realNameStatus: '',
                    uid: '',
                    isPayPasWord: '',
                    token: '',
                    riskScore: 0,
                    realNameStatus:'',
                })
                this.setLoginTo('/my/index')
                this.$router.replace('/login')
            },
            ...mapActions([
                'setInfo',
                'setLoginTo',
                'setUserEndTime'
            ])
        },
        computed: {
            ...mapGetters([
                'info'
            ]),
            list(){
                if (this.info.isPayPasWord) {
                    this.data.pop()
                    return this.data
                } else {
                    return [this.data[0], this.data[3]]
                }
            }
        },
        components: {
            Btn
        }
    }
</script>
<style lang="scss" scoped>
    .info {
        @include box((p:0 0.3rem, fs:0.3rem, c:$black2, bg:$white));
        margin-top: 0.2rem;
        li {
            @include box((lh:1rem, d:flex));
            justify-content: space-between;
            &:not(:last-child){
                @include thin(bottom, #E5E5E5);
            }
            div {
                @include box((d:flex));
            }
            .my_arrow {
                @include box((w:0.3rem, h:0.3rem, m:0.35rem 0));
            }
        }
    }

    .my_arrow {
        @include bg_img('my_arrow.png');
    }

    .mt {
        margin: 80px auto 0;
        width: 80%;
    }
</style>