<template>
    <div class="progress">
        <pageProgress :listData="progressLists" :from="'buy'"></pageProgress>
    </div>
</template>
<script>
    import pageProgress from '@/component/Progress'
    import API from '@/api'

    export default {
        name: 'VProgress',
        data(){
            return {
                bid: this.$route.params.bid,
                productType: this.$route.params.productType,
                progressLists: [
//                    {
//                        name: '项目发布',
//                        time: '2017.04.03 12:23:45',
//                        show: true
//                    },
//                    {
//                        name: '项目募集期结束',
//                        time: '2017.04.04  12:23:22',
//                        show: true,
//                    },
//                    {
//                        name: '开始计息',
//                        time: '2017.04.04  12:23:22',
//                        show:false,
//                    },
//                    {
//                        name: '项目放款',
//                        show: false
//                    },
//                    {
//                        name: '开始回款',
//                        show: false
//                    },
//                    {
//                        name: '项目结束',
//                        show: false
//                    }
                ]
            }
        },
        async mounted(){
            const param = {
                bid: this.bid,
                productType: this.productType,
            }
            let obj = await API.post(API.detailProgress, param)
            this.$data.progressLists = obj
        },
        methods: {},
        components: {
            pageProgress
        }
    }
</script>
<style lang="scss" scoped>
    .progress {
        @include box((p:0.6rem 0 0 0, bg:$white))
    }
</style>
