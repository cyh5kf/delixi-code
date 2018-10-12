<template>
    <div>
        <ul class="tender_ul">
            <div class="no_lists" v-if="!tenderLists.length">
                <div></div>
                <p>暂无适用标的</p>
            </div>
            <router-link class="tenderLink"
                         :to="'/tender/detail/'+item.id+'/'+item.productType+'/'+item.category"
                         tag="li"
                         :key="index"
                         v-for="(item ,index) in tenderLists">
                <TenderCard class="card" :card="item" :key="index"/>
            </router-link>
        </ul>
    </div>
</template>
<script>
    import TenderCard from '@/component/TenderCard'
    import API from '@/api'

    export default {
        name: 'TenderFilterByCoupon',
        data(){
            return {
                couponType: this.$route.params.couponType,//优惠券类型  红包或者加息券
                couponId: this.$route.params.couponId,//优惠券 id
                tenderLists: [
//                    {
//                        rate: 10,
//                        id:1,
//                        percent:90,
//                    },
//                    {
//                        rate: 9,
//                        id:2,
//                        percent:40,
//                    },
//                    {
//                        rate: 8,
//                        id:3,
//                        percent:60,
//                    }
                ]
            }
        },
        async created(){
            const {
                couponType,
                couponId
            } = this.$data

            const param = {
                couponType,
                couponId
            }
            const obj = await API.post(API.couponFitTenderLists, param)
            this.$data.tenderLists = obj.recordList || []

        },
        methods: {},
        components: {
            TenderCard
        }
    }
</script>
<style lang="scss" scoped>
    .no_lists {
        @include box((m:1.7rem auto));
        div {
            @include box((w:2.4rem, h:2.4rem, m:0.48rem auto 0));
            @include bg_img('my/no_my_transfer.png')
        }
        p {
            @include box((fs:0.28rem, lh:0.4rem, ta:center, c:$black9))
        }
    }
    .tender_ul {
        @include box((p:0.2rem 0));
        .tenderLink {
            @include box((m:0 0 0.2rem 0));
        }
    }
</style>
