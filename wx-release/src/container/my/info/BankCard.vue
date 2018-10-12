<template>
    <div>
        <div class="card">
            <img :src="smallLogo"/>
            <span v-text="bank"></span>
            <p>
                <span>****</span>
                <span>****</span>
                <span>****</span>
                <span v-text="bankNo"></span>
            </p>
        </div>
        <p class="tip">如需更换或解绑银行卡<br/>
            请拨打客服电话：<span class="black2">400-655-8858</span></p>
    </div>
</template>
<script>
    import API from '@/api'
    export default {
        name: 'bankCard',
        data() {
            return {
                bank: '',
                bankNo: '',
                smallLogo: ''
            }
        },
        methods: {
            async getInitData() {
                const data = await API.post(API.masterCard)
                this.bank = data.bank
                this.bankNo = data.bankNo.substr(data.bankNo.length - 4, 4)
                this.smallLogo = data.smallLogo
            }
        },
        mounted() {
            this.getInitData()
        }
    }
</script>
<style lang="scss" scoped>
    .card {
        @include box((bg:#425476, m:0.3rem, bdr:0.08rem, p:0.3rem 0.4rem, c:$white));
        img {
            @include box((w:0.68rem, h:0.68rem));
            margin-right: 0.3rem;
        }
        p {
            @include box((p:0.2rem 0 0 0.3rem));
            span {
                margin-left: 0.8rem;
                @include box((lh:0.36rem, o:0.24));
            }
            span:last-child {
                @include box((fs:0.44rem, o:1));
            }
        }
    }

    .tip {
        @include box((ta:center, fs:0.24rem, c:$black9));
    }
</style>