<template>
    <div>
        <ul class="bankLists">
            <li v-for="item in bankLists">
                <img :src="item.smallLogo" alt="">
                <p><span v-text="item.bankName"></span></p>
                <p>单笔限额 <label v-text="item.singleLimit"></label>元，
                    每日限额 <label v-text="item.dayLimit"></label>元，
                    每月 <label v-text="item.monthLimit||'无限制'"></label>
                </p>
            </li>
        </ul>
    </div>
</template>
<script>
    import API from '@/api'

    export default {
        name: 'BankSurportList',
        data(){
            return {
                bankLists: [
//                    {smallLogo: '', bankName: '农业银行'},
                ]
            }
        },
        async created(){
            let obj=await API.get(API.showBankListWY)
            this.$data.bankLists=obj.list||[]
        },
        methods: {}
    }
</script>
<style lang="scss" scoped>
    .bankLists {
        @include box((bg:$white, p:0 0 0 0.3rem));
        li {
            @include box((h:1.24rem, fs:0.22rem, c:$black2,p:0.2rem 0 0 1.4rem));
            @include thin(bottom, #e5e5e5);
            position: relative;
            p{
                @include box((fs:0.3rem,c:$black2,lh:0.48rem));
                &:last-child{
                    @include box((fs:0.2rem,c:$black9,lh:0.28rem));
                }
            }
            img {
                @include box((w:0.6rem, h:0.6rem, m:0 0.5rem 0 0,d:block));
                @include position((p:absolute, t:50%, l:0.3rem));
                transform:translateY(-50%);
            }
        }
    }
</style>
