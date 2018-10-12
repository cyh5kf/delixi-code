<template>
    <div>
        <a v-if="!href"
           v-text="label"
           :class="type"
           @click="clickEvent"
           :style="_style"></a>
        <router-link v-if="href"
                     :to="href"
                     :class="type"
                     :style="_style">
            {{label}}
        </router-link>
    </div>
</template>
<script>
    export default {
        name: 'Btn',
        props: ['label','click','href','type','_style'],
        methods:{
          clickEvent(){
              if(typeof this.click === 'function'){
                  this.click()
              }
          }
        }
    }
</script>
<style lang="scss" scoped>
    .btn{
        @include box((d:block,h:0.8rem,lh:0.8rem,ta:center,fs:0.32rem,bdr:0.4rem));
        @include bg_img('index_invest_bg.png')
    }
    .red{
        @extend .btn;
        @include box((c:#fff,bg:$red));
        @include bg_img('index_invest_bg.png');
        background-position:center center;
    }
    .wait{
        @extend .btn;
        @include box((bg:rgba(246,76,62,0.50),c:#fff));
    }
    .disabled{
        @extend .btn;
        @include box((c:#fff,bg:#e5e5e5));
    }
    .blue{
        @extend .btn;
        @include box((c:#fff,bg:$blue));
    }
    .gray{
        @extend .btn;
        @include box((c:#fff,bg:#e5e5e5));
    }
    .red-b{
        @extend .btn;
        @include box((c:$red,bg:$white));
        @include thin(all,$red);
    }
    .blue-b{
        @extend .btn;
        @include box((c:$blue,bg:$white));
        @include thin(all,$blue);
    }
</style>