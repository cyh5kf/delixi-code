<template>
    <div>
        <transition name="fade1">
            <div class="shade" v-show="showStatus" @click="closeSelf"></div>
        </transition>
        <transition name="scale">
            <p class="tip" :class="tringleClass" :style="_style||{}" v-show="showStatus">
                <slot></slot>
            </p>
        </transition>
    </div>
</template>
<script>
    export default {
        name: 'Tip',
        data() {
            return {
                showStatus: this.show || false
            }
        },
        props:['show','close','_style','tringle_position'],
        methods: {
            closeSelf(){
                this.showStatus = false
                typeof this.close == 'function' && this.close()
            }
        },
        watch:{
            show(n,old){
                this.showStatus = n
            }
        },
        computed:{
            tringleClass(){
                return this.tringle_position=='right'?'tringle_right':'tringle_left'
            }
        }
    }
</script>
<style lang="scss" scoped>
    .shade {//
        @include box((w:100%, h:100%, bg:rgba(0, 0, 0, 0.5)));
        @include position((p:fixed, t:0, r:0, b:0, l:0,z:5));
    }

    .tip{//tip主体
        @include position((p:absolute, t:0,l:0,z:6));
        @include box((d:block,fs:0.24rem,lh:0.4rem,c:$black2,bg:$white,bdr:0.06rem,p:0.1rem));
        font-weight:normal;
        min-width:1.8rem;
        &:before{
            @include tringle((to:top,w:0.24rem,h:0.2rem,c:$white));
            @include position((p:absolute));
        }
        &.tringle_left{
            :before{
                @include position((t:-0.1rem,l:0.29rem));
            }
        }
        &.tringle_right{
            &:before{
                @include position((t:-0.1rem,r:0.29rem));
            }
        }
    }

    /*动画效果*/
    .scale-enter-active, .scale-leave-active {
        transition: transform ease 400ms;
        &.tringle_left{
            transform-origin:0.29rem 0;
        }
        &.tringle_right{
            transform-origin:95% 0;
        }
    }
    .scale-enter, .scale-leave-to {
        transform:scale(0);
    }

</style>