<!--
    默认点击阴影区域会自动关闭弹框
    disableShadeClose :true 点击阴影部分不会关闭弹框
-->

<template>
    <div>
        <transition name="fade1">
            <div class="shade" v-show="showStatus" @click="closeSelf"></div>
        </transition>
        <transition name="fade1">
            <div class="dialog" v-show="showStatus" :style="_style">
                <span class="close" @click="closeSelf"></span>
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
        props: ['show','_style', 'close',],
        methods: {
            closeSelf(){
                this.showStatus = false;
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
    @import "../assets/base.scss";

    .shade {
        @include box((w:100%, h:100%, bg:rgba(0, 0, 0, 0.7)));
        @include position((p:fixed, t:0, r:0, b:0, l:0,z:20));
    }
    .dialog {
        @include box((bg: #fff, w:6rem,bdr:0.18rem, m:0 0 0 -3rem));
        @include position((p:fixed, t:1.6rem, l:50%,z:21));
        min-height:1rem;
        .close {
            @include box((w:0.38rem,h:0.38rem,lh:0.38rem,fs:0.38rem));
            @include position((p:absolute,t: 0.14rem,r: 0.14rem));
            background: transparent;
            color: #666;
            border-radius: 12px;
            text-align: center;

            &::before {
                content: "\2716";
            }
        }
    }

</style>
