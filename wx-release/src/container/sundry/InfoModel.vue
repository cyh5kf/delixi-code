<template>
    <div>
        <div class="wrap">
            <p>人众金服精准定位产业互联网金融，深耕供应链金融及消费金融领域，构筑互联网金融与企业、商品（服务）供应链、消费等互利共存、持续发展的良好产业生态。致力为用户提供更加优质、高效、安全的网络借贷信息中介服务。</p>
            <p class="nav">—— 供应链金融模型图 ——</p>
            <div class="infoModel1"></div>
            <p class="nav">—— 消费金融模型图 ——</p>
            <div class="infoModel2"></div>

        </div>
    </div>
</template>
<script>
    export default {
        name: 'infoModel',
    }
</script>
<style lang="scss" scoped>
    .wrap{
        @include position((p:absolute));
        @include bg_img('infoPublicBg.jpg');
        @include box((w:100%,c:#fff,fs:0.24rem,p: 0.6rem));
        min-height: 100%;overflow: scroll;
    }
    @each $url in 1,2 {
        .infoModel#{$url}{
            @include bg_img('infoModel#{$url}.png');
            @include box((w:100%,h:3.5rem));
        }
    }
    .nav{
        @include box((fs:0.3rem,lh:0.3rem,m:0.7rem auto 0.6rem,ta:center));
    }

</style>