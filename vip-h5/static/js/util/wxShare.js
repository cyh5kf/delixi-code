// 微信分享
function wxShare(config) {
    
    $.get("/apiApp/app/wx/getConfig.html", {
        url: config.url,
    }, function (data) {
        data = JSON.parse(data);
        var returnObj = data.obj;
        // 微信配置
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: returnObj.appid, // 必填，公众号的唯一标识
            timestamp: returnObj.timestamp, // 必填，生成签名的时间戳
            nonceStr: returnObj.noncestr, // 必填，生成签名的随机串
            signature: returnObj.signature,// 必填，签名，见附录1
            jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage']
            // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
    });

    wx.ready(function () {
        wx.checkJsApi({
            jsApiList: ['getNetworkType', 'previewImage'],
            success: function (res) {
            }
        });
        // 分享到朋友圈
        wx.onMenuShareTimeline({
            title: config.title, // 分享标题
            link: config.url, // 分享链接
            imgUrl: config.imgUrl, // 分享图标
            success: function () {

            },
            cancel: function () {
            }
        });
        wx.onMenuShareAppMessage({
            title: config.title, // 分享标题
            desc: config.desc, // 分享描述
            link: config.url, // 分享链接
            imgUrl: config.imgUrl, // 分享图标
            success: function () {
            },
            cancel: function () {
            }
        });
    });
}
