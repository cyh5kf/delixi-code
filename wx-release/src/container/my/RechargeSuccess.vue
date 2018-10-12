<template>
    <div class="recharge_success_wraper">
        <span class="success_icon"></span>
        <p>充值申请提交成功！</p>
        <Btn label="查看记录" href="account" type="red"/>
        <Btn label="立即投资" href="/tender" type="blue-b" class="mt-20"/>
        <div class="btn_text">温馨提示：市场有风险，出借需谨慎。</div>
    </div>
</template>
<script>
    import Btn from '@/component/Btn'

    export default {
        name: 'RechargeSuccess',
        data() {
            return {}
        },
        mounted() {

        },
        methods: {},
        computed: {},
        components: {
            Btn
        }
    }
</script>
<style lang="scss" scoped>
    .recharge_success_wraper {
        @include box((p:0.9rem 0.3rem));
        .success_icon {
            @include box((d:block, w:1rem, h:1rem, m:0 auto));
            @include bg_img('my_recharge_success.png')
        }
        p {
            @include box((ta:center, lh:0.45rem, fs:0.32rem, c:$black5, m:0.34rem 0 0.94rem));
        }
        .btn_text{
            width:100%;
            font-size:0.22rem;
            text-align:center;
            padding:0.1rem 0 0.1rem 0;
            display:inline-block;
            color:#555;
        }
    }

    .mt-20 {
        @include box((m:0.2rem 0));
    }

</style>