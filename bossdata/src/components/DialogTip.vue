<template>
  <!-- 弹窗提示 -->
  <div class="dialog-tip" v-show="showStatus">
      <div class="content" v-text="massage"></div>
  </div>
</template>

<script>
  export default {
    name: 'DialogTip',
    props: ["show", "massage"],
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
.dialog-tip {
    width: 90%;
    background: rgba(0,0,0,.7);
    -webkit-border-radius: .2rem;
    border-radius: .2rem;
    text-align: center;
    position: fixed;
    top: 35%;
    left: 5%;
    z-index: 30;
}

.dialog-tip .content {
    font-size: .24rem;
    color: #fff;
    padding: .25rem .3rem;
}
</style>

