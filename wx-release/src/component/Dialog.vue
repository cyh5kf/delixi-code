<!--
    默认点击阴影区域会自动关闭弹框
    disableShadeClose :true 点击阴影部分不会关闭弹框
-->

<template>
    <div>
        <transition name="fade1">
            <div class="shade" v-show="showStatus" @click="closeSelf(true)"></div>
        </transition>
        <transition name="bounce">
            <div class="dialog" v-show="showStatus" :style="_style">
                <span v-if="!disableCloseBtn" class="close" @click="closeSelf(false)"></span>
                <slot></slot>
            </div>
        </transition>
    </div>
</template>
<script>
    export default {
        name: 'Dialog',
        data() {
            return {
                showStatus: this.show || false
            }
        },
        props: ['show','close','disableShadeClose','disableCloseBtn','_style'],
        methods: {
            closeSelf(shade){
                if(shade && this.disableShadeClose) return
                this.showStatus = false
                this.close && this.close()
            }
        },
        watch:{
            show(n,old){
                this.showStatus = n
            }
        }
    }
</script>
<style lang="scss" scoped>
    .shade {
        @include box((w:100%, h:100%, bg:rgba(0, 0, 0, 0.7)));
        @include position((p:fixed, t:0, r:0, b:0, l:0,z:20));
    }
    .dialog {
        @include box((bg:$white, w:6rem,bdr:0.18rem,m:0 0 0 -3rem));
        @include position((p:fixed, t:20%, l:50%,z:21));
        min-height:1rem;
        .close{
            @include box((w:0.34rem,h:0.34rem));
            @include position((p:absolute,t:0.16rem,r:0.16rem));
            @include bg_img('icon_close.png')
        }
    }

</style>