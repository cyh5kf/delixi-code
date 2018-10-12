<template>
    <div>
        <transition name="fade1">
            <div class="shade" v-show="showStatus" @click="closeSelf(true)"></div>
        </transition>
        <transition name="bounce">
            <div class="dialog" v-show="showStatus">
                <h5 v-text="title||'提示'"></h5>
                <p v-text="text||''"></p>
                <div>
                    <span @click="closeSelf">取消</span>
                    <span @click="confirm">确认</span>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    export default {
        name: 'ConfirmDialog',
        data(){
            return {
                showStatus: this.show || false
            }
        },
        props:['show','title','text','close','confirm'],
        methods: {
            closeSelf(shade){
                this.showStatus = false
                this.close && this.close()
            }
        },
        watch:{
            show(n,old){
                this.showStatus = n
            }
        },
    }
</script>
<style lang="scss" scoped>
    .shade {
        @include box((w:100%, h:100%, bg:rgba(100, 100, 100, 0.7)));
        @include position((p:fixed, t:0, r:0, b:0, l:0,z:20));
    }
    .dialog {
        @include box((bg:$white, w:6rem,bdr:0.18rem,m:0 0 0 -3rem));
        @include position((p:fixed, t:20%, l:50%,z:21));
        min-height:1rem;
        h5{
            @include box((ta:center,lh:1.1rem,fs:0.3rem,c:$black3));
            font-weight:normal;
        }
        p{
            @include box((ta:center,lh:0.4rem,fs:0.26rem,c:#666,p:0.36rem 0.5rem 0.9rem 0.5rem));
        }
        div{
            @include box((h:0.9rem,p:0.2rem 0,d:flex));
            @include thin(top,#e5e5e5);
            span{
                @include box((d:block,c:$black6));
                flex:1;
                @include box((lh:0.5rem,ta:center));
                &:first-child{
                    @include thin(right,#e5e5e5);
                }
                &:last-child{
                    @include box((c:$black3));
                }
            }
        }
        .close{
            @include box((w:0.34rem,h:0.34rem));
            @include position((p:absolute,t:0.16rem,r:0.16rem));
            @include bg_img('icon_close.png')
        }
    }
</style>
