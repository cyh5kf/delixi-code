<template>
    <div class="wrap">
        <div class="errorTip">
            <img src="https://images.51rz.com/images/pc/error/errorApp.png" />
        </div>
    </div>
</template>
<script>
    import API from '@/api'
    export default {
        name: 'errorTip',
        data() {
            return {
            }
        },
        methods: {
            getUrlParam(name) {
                const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)") //构造一个含有目标参数的正则表达式对象
                const r = window.location.search.substr(1).match(reg)  //匹配目标参数
                if (r != null) return unescape(r[2]);
                return null //返回参数值
            },
        }
    }
</script>
<style lang="scss" scoped>
    .wrap {
        @include box((bg:#f6f6f6));
    }
    .errorTip{
        width:100%;
        height:4.98rem;
        padding-top:40%;
    }

</style>