<template>
    <div class="agreement">
        <div class="text">暂无更多内容</div>    　　
    </div>
</template>
<script>
    export default {
        name: 'find5_23'
    }
</script>
<style lang="scss" scoped>
    .agreement {
        @include box((w:100%, h:100%, p:0.8rem 0.4rem 0 0.4rem, c: #8f8f8f, fs:0.24rem, lh:0.4rem, bg:#fff, ta:center));
        @include position((p:fixed));
        span {
            @include box((c:#f63))
        }
    }
</style>