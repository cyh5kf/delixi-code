<template>
    <div class="wraper">
        <h5 class="title" v-html="obj.title"></h5>
        <div class="subtitle" v-html="obj.subtitle"></div>
        <div class="content" v-html="obj.content"></div>
    </div>
</template>
<script>
    import getParam from '@/lib/getParam'
    import API from '@/api'
    export default {
        name: 'MessageDetail',
        data(){
            return {
                id: this.$route.params.id,
                obj: {
                    title: '',
                    subtitle: '',
                    introduction: '',
                    content: ''
                }
            }
        },
        async created(){

            const param = {
                id: this.id
            }
            const paramToken=getParam(window.location.href,'token')
            if(paramToken){//兼容app调用h5
                param.token=paramToken
            }
            let obj = await API.get(API.getArticleDetails, param)
            this.obj = obj || {}
        },
        methods: {}
    }
</script>
<style lang="scss" scoped>
    .wraper {
        @include box((p:0.3rem));
    }

    .title {
        @include box((ta:center, lh:0.4rem, c:$black5, fs:0.3rem))
    }

    .subtitle {
        @include box((lh:0.34rem, c:$black9, m:0.2rem 0, fs:0.28rem))
    }

    .content {
        img{
            max-width: 100% !important;
        }
    }
</style>
