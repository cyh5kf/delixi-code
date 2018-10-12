// 页头vue实例
var headerVue = null;
$.get("/components/header-footer/header.html", function(html){
    headerVue = new Vue({
        el: '#header',
        template: html,
        data: {
            isLogined: false, //是否登录
            type: '', // 根据type来判断跳转路径的域名地址
            name: '',
            notice: false
        },
        created: function() {
            var token = this.getQueryString("token") || 0;
            var nameEncode = this.getQueryString("name");
            var notice = this.getQueryString("notice");
            var type = 'www';
            if (this.getQueryString('type')) {
                type = this.getQueryString('type');
            } else {
                if (window.location.href.indexOf('pre-activity-center') > -1) {
                    type = 'wwww';
                } else {
                    type = 'www';
                }
            }
            this.type = type;
            this.isLogined = token? true: false;
            this.name = nameEncode? this.uncompileStr(nameEncode): '';
            this.notice = notice === 'true'? true: false;
        },
        methods: {
            // 返回顶部
            backTop: function() {
                scrollTo(0,0);
            },

            // 获取url参数
            getQueryString: function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            },

            // 跳转路径
            linkUrl: function(url) {
                return 'https://' + this.type + '.51rz.com' + url;
            },

            // 退出
            loginOut: function() {
                window.location.replace(this.linkUrl('/loginOut.html'));
            },

            //字符串进行解密
            uncompileStr: function (code) {
                code = unescape(code);
                var c = String.fromCharCode(code.charCodeAt(0) - code.length);
                for (var i = 1; i < code.length; i++) {
                    c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
                }
                return c;
            }
        }
    })
});

// 页尾vue实例
$.get("/components/header-footer/footer.html", function(html){
    new Vue({
        el: '#footer',
        template: html,
        data: {
            type: ''
        },
        created: function() {
            this.type = this.getQueryString('type');
        },
        methods: {
            position: function() {
                scrollTo(0,0);
            },

            getQueryString: function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            },

            linkUrl: function(url) {
                return 'https://' + this.type + '.51rz.com' + url;
            }
        }
    })
});

var _hmt = _hmt || [];
(function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?5395127f074c49150bc6578ff60ff4e8";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();

var _vds = _vds || [];
window._vds = _vds;
(function () {
    _vds.push(['setAccountId', 'b5dc34e3f3810d4a']);
    // 获取url参数
    function getParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]); return null; //返回参数值
    }
    var token= getParam("token")||'';
    if(token) {
        _vds.push(['setCS1', 'user_id', token]);
    }
    (function () {
        var vds = document.createElement('script');
        vds.type = 'text/javascript';
        vds.async = true;
        vds.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'assets.growingio.com/vds.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(vds, s);
    })();
})();
