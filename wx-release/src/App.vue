<template>
  <div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <Loading></Loading>
    <Msg></Msg>
    <StopService></StopService>
  </div>
</template>

<script>
  import Loading from '@/component/Loading'
  import Msg from '@/component/Msg'
  import StopService from '@/component/StopService'

  export default {
    name: 'app',
    methods: {
      resize_font() {
        let deviceWidth = document.documentElement.clientWidth;
        if(deviceWidth > 750) deviceWidth = 750;
        document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
      }
    },
    mounted() {
      this.resize_font()
      window.requestAnimationFrame = requestAnimationFrame || webkitRequestAnimationFrame || function (callback) {setTimeout(callback,1000/60)};
    },
    components: {
        Loading,
        Msg,
        StopService,
    }
  }
</script>
<style lang="scss">
  * {
    outline: none;border: none;
    margin: 0;padding: 0;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }
  html {
    font-family: "Helvetica Neue",Helvetica,Hiragino Sans GB,"Microsoft Yahei",STHeiTi,Arial,sans-serif;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
    -webkit-font-smoothing: antialiased;
    height: 100%;
  }
  body {
    margin: 0 auto;
    font-size: 0.26rem;
    color: #555;
    line-height: 1.5;
    width: 100%;
    max-width: 750px;
    overflow-x: hidden;
    background: #F6F6F6;
    -webkit-overflow-scrolling: touch;
    -webkit-touch-callout: none;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
    min-height: 100%;
  }
  article,aside,details,figcaption,figure,footer,header,hgroup,main,nav,section,summary {
    display: block;
  }
  a,button,input,textarea{-webkit-tap-highlight-color: rgba(0,0,0,0)}
  a {text-decoration: none;color: inherit;}
  a:active {outline: 0; }
  b,strong {font-weight: 700;}
  button,input,select,textarea {
    border: 0;
    font-family: "微软雅黑","Helvetica Neue",Helvetica,Hiragino Sans GB,"Microsoft Yahei",STHeiTi,Arial,sans-serif;
  }
  textarea {resize: none;}
  table {
    border: 1px solid #999;
    width: 100%;
    border-collapse: collapse;
    text-align: center;
    td {
      border: 1px solid #999;
    }
  }
  li,ol,ul {list-style: none;}
  input::-webkit-input-placeholder,textarea::-webkit-input-placeholder {
    color: #999;
    line-height: 1.5em;
    font-family: "Helvetica Neue",Helvetica,Hiragino Sans GB,"Microsoft Yahei",STHeiTi,Arial,sans-serif;
  }
  a,a:visited {color: #333;text-decoration: none;}
  a:active,a:hover {text-decoration: none;}
  a:focus,input:hover,button:hover,input[type='button']:hover {outline: none;}
  i,em,cite {font-style: normal;}
  li {vertical-align: bottom;list-style-type: none;}
  article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section {
    display: block;max-width: 750px;
  }
  a,button,input,i {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -moz-tap-highlight-color: rgba(0,0,0,0);
    -ms-tap-highlight-color: rgba(0,0,0,0);
    tap-highlight-color: rgba(0,0,0,0);
  }
  img {border: none;border: 0;vertical-align: middle;max-width: 100% !important;}

  .red{@include box((c:$red));}
  .blue{@include box((c:$blue));}
  .white{@include box((c:$white));}
  .black2{@include box((c:$black2));}
  .black5{@include box((c:$black5));}
  .black9{@include box((c:$black9));}
  .gray{@include box((c:$gray));}
  .yellow{@include box((c:$yellow));}
  .gold{@include box((c:$gold));}

  .input{
    border-bottom:1px solid #e5e5e5;position: relative;display: flex;padding-top: 0.2rem;
    input{
      @include box((w:100%,h:1rem,fs:0.28rem,c:#222));
    }
    div{
      @include box((ta:right,lh:1rem,fs:0.24rem,p:0 0.1rem,c:#222));
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: all 2s ease;
  }
  .fade-enter{
    display: block;
    opacity: 0;
  }
  .fade-leave-to {
    display: none;
    opacity: 0;
  }

  /**动画**/
  .fade1-enter-active, .fade1-leave-active {
    transition: all ease 400ms;
  }
  .fade1-enter, .fade1-leave-to {
    opacity: 0;
  }

  .slideup-enter-active, .slideup-leave-active {
    transition: all ease 400ms;
  }
  .slideup-enter ,.slideup-leave-to {
    transform: translateY(100%);
  }

  .bounce-enter-active, .bounce-leave-active {
    transition: all ease 400ms;
  }
  .bounce-enter, .bounce-leave-to {
    transform: scale(0,0);
  }
  .line_of_hide{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
