<template>
    <div>
        <div class="money" v-text="money"></div>
        <div class="list" v-for="(item,index) in list">
            <div class="box">
                <div v-text="item.key"></div>
                <div v-text="item.value"></div>
            </div>
        </div>
    </div>
</template>
<script>
    import API from '@/api'
    export default {
        name: 'billDetail',
        data() {
            return {
                tradeNo: this.$route.params.tradeNo,
                id: this.$route.params.id,
                money: this.$route.params.money,
                list: []
            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            async getData() {
                const param = {
                    id: this.id,
//                    tradeNo: this.tradeNo,
                }
                this.list = await API.post(API.accountLogDetail, param)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .money {
        @include box((fs:0.64rem, lh:0.74rem, c:$black2, ta:center, bg:$white, p:0.6rem 0 0.9rem 0));
    }

    .list {
        @include box((bg:$white));
        &:not(:last-child) {
            .box {
                @include thin(bottom, #ddd);
            }
        }
        .box {
            margin-left: 0.3rem;
            @include box((d:flex, c:$black5, fs:0.28rem, lh:1rem));
            justify-content: space-between;
            div:nth-child(2) {
                max-width: 6.2rem;
                @include box((c:$black9, p:0 0.3rem));
            }
        }
    }
</style>