<template>
    <div class="wrap">
        <span class="icon_ycy"></span>
        <p class="desc">投资申请已受理</p>
        <Btn class="btn" :label="'我知道了'" :type="'red'" :href="'/my/index'"/>
    </div>
</template>
<script>
    import Btn from '@/component/Btn'

    export default {
        name: '',
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
    .icon_ycy {
        @include box((m:0.9rem auto 0.3rem, d:block, w:1rem, h:1rem));
        @include bg_img('tender_detail/icon_ycy.png')
    }

    .desc {
        @include box((c:$black5, fs:0.32rem, lh:0.45rem, ta:center, m:0 0 00.95rem));
    }

    .btn {
        @include box((m:0 0.3rem));
    }
</style>