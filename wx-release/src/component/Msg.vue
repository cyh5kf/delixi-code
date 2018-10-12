<template>
    <div class="dialog" v-show="msg.show">
        <div class="content" v-text="msg.content"></div>
    </div>
</template>
<script>
    import {mapGetters,mapActions} from 'vuex'
    export default {
        name: 'msg',
        methods: {
            ...mapActions([
                'showMsg'
            ])
        },
        computed: {
            ...mapGetters([
                'msg'
            ])
        }
    }
</script>
<style lang="scss" scoped>
    .dialog{
        @include position((p:fixed,t:35%,l:5%,z:30));
        @include box((w:90%,bg:rgba(0,0,0,0.7),bdr:0.2rem,ta:center));
    }
    .content{
        @include box((c:#fff,fs:0.24rem,p:0.25rem 0.3rem));
    }
</style>