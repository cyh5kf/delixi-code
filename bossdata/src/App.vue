<template>
  <div id="app">
    <router-view/>
    <router-view name="navigationBar"/>
    <!--<NavigationBar v-if="isShowBar"/>-->
  </div>
</template>

<script>
  import NavigationBar from './components/NavBar';

  import "./assets/iconmoon/style.css"

  export default {
    name: 'app',
    data:function(){
        return {
            isShowBar:false
        }
    },
    methods: {
      resize_font() {
        let deviceWidth = document.documentElement.clientWidth;
        if(deviceWidth > 750) deviceWidth = 750;
        document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
      }
    },
    created(){
      if(location.pathname.indexOf('login') === -1){
          this.isShowBar = true
      }
    },
    mounted() {
      this.resize_font()
      window.requestAnimationFrame = requestAnimationFrame || webkitRequestAnimationFrame || function (callback) {setTimeout(callback,1000/60)};
    },
    components:{
        NavigationBar
    }
  }
</script>

<style lang="scss" >

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
}

html, body {
    height: 100%;
}

body {
    background: #fff;
    max-width: 750px;
    margin: 0 auto !important;
    overflow: hidden;
    font-family: "微软雅黑", "Arial", sans-serif;
}

img {
    width: 100%;
    display: block;
    border: none;
}

input {
    tap-highlight-color: transparent;
    -webkit-tap-highlight-color: transparent;
    border: 0;
    outline:none;
}

ul li {
    list-style-type: none;
}

em {
    font-style: normal;
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
  transition: opacity ease 400ms;
}
.fade1-enter, .fade1-leave-to {
  opacity: 0;
}
</style>
