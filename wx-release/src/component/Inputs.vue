<template>
    <div>
        <div v-if="type === 'border'" class="input_border">
            <slot></slot>
        </div>
        <div v-if="type !== 'border'" class="input_full_width">
            <label v-if="label" v-text="label" :style="{width:labelWidth}"></label>
            <slot></slot>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'InputBorder',
        props: ['type','label','labelWidth']
    }
</script>
<style lang="scss" scoped>
    /**带边框的输入框**/
    .input_border {
        @include box((h:0.8rem, lh:0.8rem, fs:0.28rem, d: flex,m:0 0 0.4rem 0));
        @include thin(all,#e5e5e5);
        input{
            @include box(( fs:0.28rem));
            text-indent: 0.2rem;
            flex:1;
        }
        a{
            @include box((w:1.6rem,ta:center,c:$blue));
        }
    }

    .input_full_width{
        @include box((h:1rem,lh:1rem,bg:$white,d:flex));
        label {
            @include box((w:2.26rem,p:0 0 0 0.3rem,c:$black2,fs:0.3rem));
            &.long{
                width:2.6rem;
            }
        }
        input,p{
            @include box((h:1rem,fs:0.28rem,c:$black2));
            flex:1;
        }
    }
</style>