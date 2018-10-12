<template>
    <!-- 弹窗提示 -->
    <div class="loading-wrapper" v-show="showStatus">
        <div class="spinner-snake" style="border-top-color: rgb(204, 204, 204); border-left-color: rgb(204, 204, 204); border-bottom-color: rgb(204, 204, 204); height: 32px; width: 32px;"></div>
        <span class="indicator-text">加载中...</span>
    </div>
</template>

<script>
  export default {
    name: 'loading',
    props: ["show"],
    data() {
        return {
            showStatus: this.show || false
        }
    },
    watch: {
        show(n,old){
            this.showStatus = n
        }
    }
  }
</script>

<style scoped>
.loading-wrapper {
    -webkit-transition: opacity .2s linear;
    transition: opacity .2s linear;
    padding: 20px;
    top: 50%;
    left: 50%;
    position: fixed;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    border-radius: 5px;
    background: rgba(0,0,0,.7);
    color: #fff;
    box-sizing: border-box;
    text-align: center;
}

.spinner-snake {
    -webkit-animation: spinner-rotate .8s infinite linear;
    animation: spinner-rotate .8s infinite linear;
    border: 4px solid transparent;
    border-radius: 50%;
    margin: 0 auto;
}

@-webkit-keyframes spinner-rotate {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(1turn);
        transform: rotate(1turn);
    }
}

@-moz-keyframes spinner-rotate {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(1turn);
        transform: rotate(1turn);
    }
}

@keyframes spinner-rotate {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(1turn);
        transform: rotate(1turn);
    }
}

.indicator-text {
    display: block;
    color: #fff;
    text-align: center;
    margin-top: 10px;
    font-size: 16px;
}
</style>

