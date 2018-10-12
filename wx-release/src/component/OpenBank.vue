<template>
    <div>
        <VDialog :show="show" disableCloseBtn="true" disableShadeClose="true">
            <div class="dialog">
                <div class="pic"></div>
                <p class="title">共同保障用户资金安全</p>
                <p class="content">为保障您的资金安全<br/>
                    请开通银行存管账户</p>
                <Btn label="立即开通" href="/my/bankOpen" type="red" _style="background:#F65658"></Btn>
                <div class="close" @click="$emit('msg',false)"></div>
            </div>
        </VDialog>
    </div>
</template>
<script>
    import VDialog from '@/component/Dialog'
    import Btn from '@/component/Btn'
    export default {
        name: 'openBank',
        props: ['show'],
        components: {
            VDialog,
            Btn
        }
    }
</script>
<style lang="scss" scoped>
    .dialog{
        @include box((p:0.3rem 0.4rem,ta:center));position: relative;
        padding-top: 2.3rem;
        .pic{
            @include position((p:absolute,t:0,l:0));
            @include bg_img('bank_dialog.png');
            @include box((w:6rem,h:1.8rem));
        }
        .title{
            @include box((fs:0.38rem,c:$black3));
        }
        .content{
            @include box((fs:0.32rem,c:#666,m:0.2rem 0 0.4rem 0));
        }
        .close{
            @include position((p:absolute,b:-1.2rem,l:46%));
            @include bg_img('close_dialog.png');
            @include box((w:0.66rem,h:0.66rem));
        }
    }
</style>