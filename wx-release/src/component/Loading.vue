<template>
    <div class="mask" v-show="loading"></div>
</template>
<script>
    import {mapGetters,mapActions} from 'vuex'
    import api from '@/api'
    export default {
        name:'loading',
        computed: {
            ...mapGetters([
                'loading'
            ])
        },
        mounted () {
            api.interceptors()
        }
    }
</script>
<style lang="scss" scoped>
    .mask{
        @include position((p:fixed,t:50%,l:50%,z:30));
        @include box((w:1.6rem,h:1.6rem));
        transform: translate(-0.8rem,-0.8rem);
        @include bg_img('loading.gif');
    }
</style>