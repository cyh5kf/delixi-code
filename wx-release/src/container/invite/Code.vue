<template>
    <div class="bg">
        <div class="title">
            <p>—— 我的邀请码 ——</p>
            <span v-text="uid"></span>
            <div class="code">
                <img :src="`data:image/png;base64,${imgBase}`" />
            </div>
        </div>
    </div>
</template>
<script>
    import API from '@/api'
    export default {
        name: 'code',
        data() {
            return {
                uid: 0,
                token: 0,
                imgBase: '',
            }
        },
        methods: {
            async getInitData() {
                const param = {
                    inviteUrl: `${location.protocol}//${document.domain}/invite/share?uid=${this.uid}`,
                    token: this.token,
                }
                const imgBase = await API.get(API.inviteQrCode,param)
                this.imgBase = imgBase.code
            },
            getUrlParam(name) {
                const reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)") //构造一个含有目标参数的正则表达式对象
                const r = window.location.search.substr(1).match(reg)  //匹配目标参数
                if (r!=null) return unescape(r[2]); return null //返回参数值
            },
            async share() {
                const returnObj = await API.get(API.inviteConfig,{
                    url: window.location.href,
                    token: this.token
                })
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: returnObj.appid, // 必填，公众号的唯一标识
                    timestamp: returnObj.timestamp, // 必填，生成签名的时间戳
                    nonceStr: returnObj.noncestr, // 必填，生成签名的随机串
                    signature: returnObj.signature,// 必填，签名，见附录1
                    jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage']
                    // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                })
                const config = await API.get(API.inviteShare,{token: this.token})
                wx.ready(function () {
                    wx.checkJsApi({
                        jsApiList: ['getNetworkType', 'previewImage'],
                        success: function (res) {
                        }
                    });
                    // 分享到朋友圈
                    wx.onMenuShareTimeline({
                        //title:'我为你准备了1716元大红包',
                        title: config.title, //分享标题
                        link: config.linkUrl, // 分享链接
                        imgUrl: config.iconUrl, // 分享图标
                        success: function () {
                        },
                        cancel: function () {
                        }
                    });
                    wx.onMenuShareAppMessage({
                        //title:'我为你准备了1716元大红包',
                        title: config.title,  //分享标题
                        desc: config.content, // 分享描述
                        link: config.linkUrl, // 分享链接
                        imgUrl: config.iconUrl, // 分享图标
                        success: function () {
                        },
                        cancel: function () {
                        }
                    });
                });
            }
        },
        mounted() {
            this.token = this.getUrlParam('token') || 0
            this.uid = this.getUrlParam('uid') || 0
            this.getInitData()
            this.share()
        }
    }
</script>
<style lang="scss" scoped>
    .bg{
        background: url(https://images.51rz.com/images/app/new_yqhy/invite-gn05_mar3.png) no-repeat top -1.3rem left 0;
        background-size: cover;
        height:14rem;
    }
    .title{
        @include box((ta:center));padding-top: 1.5rem;
        p{
           @include box((c:#fd9a26,fs:0.24rem));
        }
        span{
            @include box((c:#ef5933,fs:0.48rem));
        }
    }
    .code{
        @include box((w:3.8rem,h:3.8rem,p:0.1rem,bs:0 0 0.2rem #c3c3c3,m:0.5rem auto));
        img{
            width: 100%;
        }
    }
</style>