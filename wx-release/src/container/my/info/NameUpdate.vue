<template>
    <div class="wrap" :style="height">
        <div>
            <div class="title">
                <img :src="headImg"/>
            </div>
            <Inp v-on:msg="getName" :value="name" type="text" ph="昵称只包含中文、英文、数字">
                <div>
                    <a class="close" @click="close"></a>
                </div>
            </Inp>
            <Btn type="red" label="确定" class="mt" :click="updateName"></Btn>
        </div>
    </div>
</template>
<script>
    import Inp from '@/component/Input'
    import Btn from '@/component/Btn'
    import API from '@/api'
    import {mapGetters, mapActions} from 'vuex'
    export default {
        name: 'phoneUpdate',
        data() {
            return {
                height: '',
                name: '',
                headImg: ''
            }
        },
        methods: {
            ...mapActions([
                'showMsg'
            ]),
            async updateName() {
                if (!this.name) {
                    this.showMsg('请输入昵称')
                    return
                }
                await API.post(API.nameUpdate, {nickName: this.name})
                this.showMsg('修改成功')
                setTimeout(() => {
                    this.$router.go(-1)
                }, 2000)
            },
            getName(val){
                this.name = val
            },
            close(){
                this.name = ''
            }
        },
        async mounted() {
            const data = await API.post(API.accountDetail)
            this.headImg = data.head || 'https://images.51rz.com/images/rebuild/wx/img/my_head.png'
        },
        created() {
            this.height = `height:${document.body.getBoundingClientRect().height}px`
        },
        components: {
            Inp,
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

    .icon {
        @include box((d:block, w:0.5rem, h:0.5rem, m:0.25rem 0));
    }

    .close {
        @extend .icon;
        @include bg_img('close.png');
    }

    .title {
        @include box((h:2rem, p:0.36rem 0));
        img {
            @include box((d:block, w:1.28rem, h:1.28rem, m:auto, bdr:0.64rem));
        }
    }
</style>