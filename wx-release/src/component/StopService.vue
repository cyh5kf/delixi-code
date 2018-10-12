<template>
    <div>
        <VDialog :show="stopService.current" disableCloseBtn="true" disableShadeClose="true">
            <div class="StopService">
                <h3 class="before">平台停服提醒</h3>
                <p v-html="stopService.returnMsg"></p>
            </div>
        </VDialog>
        <VDialog :show="stopService.before" disableCloseBtn="true" disableShadeClose="true">
            <div class="StopService">
                <h3 class="now">平台维护提醒</h3>
                <p v-html="stopService.returnMsg"></p>
                <Btn _style="background:#FF3E88;color:#fff;"
                     style="padding:0 0.4rem 0.4rem 0.4rem"
                     :click="hideBeforeStopService"
                     type="btn"
                     label="知道了"></Btn>
                <a class="close" @click="hideBeforeStopService"></a>
            </div>
        </VDialog>
    </div>
</template>
<script>
    import VDialog from '@/component/Dialog'
    import Btn from '@/component/Btn'
    import {mapGetters,mapActions} from 'vuex'

    export default {
        name: 'stopService',
        methods: {
            hideBeforeStopService() {
                this.setStopService({before:false})
            },
            ...mapActions([
                'setStopService'
            ]),
        },
        computed: {
            ...mapGetters([
                'stopService'
            ])
        },
        components: {
            VDialog,
            Btn,
        }
    }
</script>
<style lang="scss" scoped>
    .StopService {
        @include box((ta:center,h:5.47rem));position: relative;
        .title{
            @include box((bdr:0.18rem 0.18rem 0 0,h:1.8rem,lh:1.8rem,fs:0.48rem,c:#fff,fw:normal));
        }
        .before{
            @extend .title;
            background: -webkit-gradient(linear, 0 0,100% 0, from(#FF328C), to(#FF886B));
            background: linear-gradient(to right,  #FF328C 0%,#FF886B 100%);
        }
        .now{
            @extend .title;
            background: -webkit-gradient(linear, 0 0,100% 0, from(#FF6058), to(#FFCD77));
            background: linear-gradient(to right,  #FF6058 0%,#FFCD77 100%);
        }
        p{
            @include box((fs:0.28rem,c:#555,w:4.8rem,m: 0.6rem auto 0.3rem));
            min-height: 1.4rem;
        }
        .close{
            @include position((p:absolute,b:-1.26rem,l:50%));margin-left: -0.33rem;
            @include box((d:block,w:0.66rem,h:0.66rem));
            @include bg_img('close_dialog.png');
        }
    }
</style>