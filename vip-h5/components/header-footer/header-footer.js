// 页头vue实例
$.get("/components/header-footer/header.html", function(html){
    new Vue({
        el: '#header',
        template: html,
        data: {
            isLogined: false, //是否登录
            type: '', // 根据type来判断跳转路径的域名地址
            userName: '',
            notice: false,
            active:1
        },
        created: function() {
            var userInfo=JSON.parse(localStorage.getItem('activeUserInfo'))||{};
            var token = this.getQueryString("token") || userInfo.token||'';
            var type = this.getQueryString('type')|| userInfo.type;
            var realName = this.getQueryString('realName')|| userInfo.realName;
            this.type = type;
            this.isLogined = !!token? true: false;
            if(!this.isLogined){
                localStorage.setItem('activeUserInfo',JSON.stringify({type:type}));
            }else{
                var nameEncode = this.getQueryString("name");
                var notice = this.getQueryString("notice")|| userInfo.notice;
                var status = this.getQueryString('type')|| userInfo.status;
                this.token=token;
                this.userName = nameEncode? this.uncompileStr(nameEncode):  userInfo.userName||'';
                this.notice = notice === 'true'? true: false;
                this.active=this.getQueryString('active')||1;
                var activeUserInfo={
                    token:this.token,
                    userName:this.userName,
                    notice:this.notice,
                    type:this.type,
                    status:status,
                    realName:realName
                };
                localStorage.setItem('activeUserInfo',JSON.stringify(activeUserInfo));
            }

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
                return '';
            },

            // 跳转路径
            linkUrl: function(url) {
                if(!!this.type){
                    return 'https://' + this.type+ '.51rz.com' + url;
                }else{
                    return 'http://' +  'lvip.51rz.com' + url;
                }
            },

            // 退出
            loginOut: function() {
                window.location.replace(this.linkUrl('/loginOut.html'));
                localStorage.removeItem('activeUserInfo');
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

var _vds = _vds || [];
window._vds = _vds;
(function () {
    _vds.push(['setAccountId', 'b5dc34e3f3810d4a']);
    (function () {
        var vds = document.createElement('script');
        vds.type = 'text/javascript';
        vds.async = true;
        vds.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'assets.growingio.com/vds.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(vds, s);
    })();
})();