<template>
    <div>
        <transition name="fade1">
            <div class="shade" v-show="showStatus" @click="closeToast"></div>
        </transition>
        <transition name="slideup">
            <div class="toast" v-show="showStatus">
                <slot></slot>
                <p v-if="!onlyslot"
                   class="cancel"
                   :class='{red:cancelType=="red"}'
                   @click="closeToast"
                   v-text="cancelText||'取消'"></p>
            </div>
        </transition>
    </div>
</template>
<script>
    export default {
        name: 'Toast',
        data() {
            return {
                showStatus: this.show || false
            }
        },
        props:['show','cancelText','cancelType','onlyslot'],//show 显示或者关闭  cancelText：关闭按钮的文字 cancelType 样式 红色或者默认
        methods: {
            closeToast() {
                this.showStatus = false
                this.$emit('msg',this.showStatus)
            },
        },
        watch: {
            show(n,old){
                this.showStatus = n
            }
        }
    }
</script>
<style lang="scss" scoped>
    .fade1-enter-active, .fade1-leave-active {
        transition: all ease 400ms;
    }
    .fade1-enter, .fade1-leave-to {
        opacity: 0;
    }
    .shade {
        @include box((w:100%, h:100%, bg:rgba(100, 100, 100, 0.5)));
        @include position((p:fixed, t:0, r:0, b:0, l:0));
        z-index: 99;
    }
    .toast {
        @include position((p:fixed, r:0, b:0, l:0,bg:$white));
        min-height: 1rem;
        z-index: 99;
        .cancel {
            $btnH: 1rem;
            @include box((w:100%, lh:$btnH, ta:center, bg:$white, fs:0.36rem, c:$black2));
            &.red{
                @include box((bg:$red,c:$white));
            }
        }
    }
</style>