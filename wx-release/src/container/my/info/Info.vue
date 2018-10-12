<template>
    <div class="bg_white" :style="height">
        <ul class="info">
            <li @click="show_toast">
                <div><p>头像</p></div>
                <div>
                    <img :src="headImg" class="head"/>
                    <p class="my_arrow"></p>
                </div>
            </li>
            <router-link tag="li"
                         :key="index"
                         :to="item.path"
                         @click.native="isOpenBank(index)"
                         v-for="(item,index) in list">
                <div>
                    <p v-text="item.name"></p>
                </div>
                <div>
                    <p v-text="item.val" class="data"></p>
                    <p v-if="index !== 1 && index !== 3" class="my_arrow"></p>
                </div>
            </router-link>
        </ul>
        <Toast v-on:msg="change_toast" :show="toast_show">
            <div class="toast">
                从手机相册选择
                <input type="file" @change="uploadImage" ref="file"
                       accept="image/png,image/jpg" class="file"/>
            </div>
        </Toast>
        <OpenBank :show="showDialog" v-on:msg="showDialog = false"></OpenBank>
    </div>
</template>
<script>
    import Toast from '@/component/Toast'
    import OpenBank from '@/component/OpenBank'
    import API from '@/api'
    import {mapGetters, mapActions} from 'vuex'
    export default {
        name: 'info',
        data() {
            return {
                showDialog: false,
                height: '',
                toast_show: false,
                headImg: '',
                list: [
                    {
                        name: '昵称',
                        val: '',
                        path: '/my/nameUpdate'
                    },
                    {
                        name: '账户名',
                        val: '',
                        path: ''
                    },
                    {
                        name: '更换手机',
                        val: '',
                        path: '/my/phoneUpdate'
                    },
                    {
                        name: '存管账户',
                        val: '',
                        path: ''
                    },
                    {
                        name: '我的银行卡',
                        val: '',
                        path: ''
                    },
                    {
                        name: '风险评估',
                        val: '未评估',
                        path: '/my/risk'
                    }
                ]
            }
        },
        methods: {
            uploadImage() {
                let form = new FormData()
                form.append('file', this.$refs.file.files[0])
                form.append('token', this.info.token)
                let xhr = new XMLHttpRequest()
                xhr.onload = () => {
                    if (xhr.status == 200 || xhr.status == 304) {
                        this.headImg = JSON.parse(xhr.responseText).obj
                        this.toast_show = false
                    }
                }
                xhr.open("POST", API.uploadImage)
                xhr.send(form)
            },
            show_toast() {
                this.toast_show = true
            },
            change_toast(val) {
                this.toast_show = val
            },
            isOpenBank(index) {
                if (index !== 4) return
                if (this.info.realNameStatus == 1) {
                    this.$router.push('/my/bankCard')
                } else {
                    this.showDialog = true
                }
            },
            scoreCovert(val) {
                const result = ['保守型','稳健型','积极型']
                let resultIndex = 3
                if(val >= 19) {
                    resultIndex = 2
                }else if(val >= 13) {
                    resultIndex = 1
                }else if(val >= 6) {
                    resultIndex = 0
                }
                return result[resultIndex]
            }
        },
        async mounted() {
            const data = await API.post(API.myAccount)
            this.headImg = data.head || 'https://images.51rz.com/images/rebuild/wx/img/my_head.png'
            this.list[0].val = data.nickName
            this.list[1].val = data.userName
            this.list[2].val = data.mobile
            this.list[3].val = data.custId
            if (!data.custId) {
                this.list[3].path = '/my/bankOpen'
            }
            if(data.riskScore > 0) {
                this.list[5].val = this.scoreCovert(data.riskScore)
            }
        },
        computed: {
            ...mapGetters([
                'info'
            ])
        },
        created() {
            this.height = `height:${document.body.getBoundingClientRect().height}px`
        },
        components: {
            Toast,
            OpenBank
        }
    }
</script>
<style lang="scss" scoped>
    .bg_white {
        @include box((bg:$white));
    }

    .info {
        margin-left: 0.3rem;
        @include box((fs:0.3rem, c:$black2, bg:$white));
        li {
            @include box((lh:1rem, d:flex));
            justify-content: space-between;
            @include thin(bottom, #E5E5E5);
            padding-right: 0.2rem;
            div {
                @include box((d:flex));
            }
            .data {
                @include box((fs:0.24rem, c:$black9));
            }
            .my_arrow {
                @include box((w:0.3rem, h:0.3rem, m:0.35rem 0 0.35rem 0.2rem));
            }
        }
    }

    .toast {
        @include box((lh:1rem, bg:$white, c:$black2, ta:center, fs:0.36rem));
        position: relative;
        .file {
            @include position((p:absolute, t:0, l:0, z:1));
            @include box((w:100%, h:100%, o:0));
        }
    }

    @each $img in arrow {
        .my_#{$img} {
            @include bg_img('my_#{$img}.png');
        }
    }

    .head {
        @include box((d:block, w:0.8rem, h:0.8rem, bdr:0.4rem, m:0.1rem 0));
    }
</style>