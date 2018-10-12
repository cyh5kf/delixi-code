/**
* 用户注册操作脚本
*/
var Register_pc = {
    g_Json: {},
    _oknum: 0,
    wait: 60,//验证码等待时长 单位s
    isSendPhoneCode: false,//是否发送手机验证码
    userInfoName:'uif',
    _captchaObj: null,//极验验证码参数对象
    _isGeetCodePass: false,//是否完成极验验证
    _geetConfig: null,//极验验证码
    _geetestId: "geetestBox",//极验验证码容器id

    //初始化
    init: function () {
        $(".RegisterCon").animate({ "top": "120px" }, 1000);
        this.addEvents();
        this.showGeetBox();
    },
	/**
     * 提示信息
     * @param tiId/tiCen:提示框id/内容
     */
    tiShi: function (tiId, tiCen) {
        $("#" + tiId).text(tiCen);
        $("#" + tiId).show();
        setTimeout(function () {
            $("#" + tiId).text("");
            $("#" + tiId).fadeOut();
            $("#" + tiId).hide();
        }, 3000);
    },
    /**
    * 事件监听
    */
    addEvents: function () {
        //发送手机验证码
        $("#btnSendPhoneCode").click(function () {
            Register_pc.sendPhoneCode();
        });
        //提交注册信息
        $("#btnReg").click(function () {
            Register_pc.regSite();
        });
    },
    /**
    * 发送手机验证码
    */
    sendPhoneCode: function () {
        if (!this._isGeetCodePass) {
            Register_pc.tiShi("smsCodeVal", "*请先拖动上方滑块完成极验验证");
            return;
        }
        if (this.isSendPhoneCode) {
            Register_pc.tiShi("phoneVal", "*亲，不要太着急哦 ，耐心等待手机响起吧");
            return;
        }
        var mobile = $("#mobile").val(), imgcode = $("#imgcode").val();
        if (mobile.length < 11) {
            $("#mobile").focus();
            Register_pc.tiShi("phoneVal", "*请输入正确的手机号码");
            return;
        }
        Register_pc.checkImgCode(this._geetConfig);

    },
    /** 
    * 获取验证码
    */
    phoneCode: function (mobile) {
        $.ajax({
            url: "/apiPc/user/sendVcode.html",
            type: "post",
            data: { mobile: mobile },
            dataType: "json",
            success: function (json) {
                if (json.responseCode == '000000') {
                    Register_pc.isSendPhoneCode = true;
                    Register_pc.timeLimit();
                } else {
                    Register_pc.tiShi("smsCodeVal", "*" + json.responseMessage);
                    Register_pc.resetImgCode();
                }
            }
        });
    },
    /**
    * 验证码倒计时
    */
    timeLimit: function () {
        if (Register_pc.wait == 0) {
            $("#btnSendPhoneCode").text("重新发送");
            Register_pc.wait = 60;
            Register_pc.isSendPhoneCode = false;
            Register_pc.resetImgCode();
        } else {
            $("#btnSendPhoneCode").text("已发送(" + Register_pc.wait + ")");
            Register_pc.wait--;
            setTimeout(function () {
                Register_pc.timeLimit()
            }, 1000)
        }
    },

    /**
* 重置极验验证码
*/
    resetImgCode: function () {
        this._isGeetCodePass = false;
        this._captchaObj.refresh();
    },

    /**
     * 渲染极验验证码盒子
     */
    showGeetBox: function () {
        var _inThis = this;
        const param = {
            rand: Math.round(Math.random() * 10000000) + 'abcdefg',
            mobile: Math.round(Math.random() * 10000000) + 'abcdefg',
            loginfrom: 'pc'
        }

        $.ajax({
            // 获取id，challenge，success（是否启用failback）
            url: "/apiPc/user/codeCheckGet.html",
            type: "get",
            data: param,
            success: function (data) {
                // 使用initGeetest接口
                // 参数1：配置参数，与创建Geetest实例时接受的参数一致
                // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它做appendTo之类的事件
                if (typeof data == 'string') {
                    var dataObj = JSON.parse(data);
                    data = JSON.parse(dataObj.obj);
                }
                initGeetest({
                    gt: data.gt,
                    challenge: data.challenge,
                    product: "float", // 体现形式：float 浮动式（默认值）、embed 嵌入式、popup：弹出式
                    offline: !data.success,
                    new_captcha: data.new_captcha,
                    width: "140px"
                }, function (_captchaObj) {
                    // 将验证码加到id为captcha的元素里
                    _captchaObj.appendTo("#" + _inThis._geetestId);
                    _inThis._captchaObj = _captchaObj;
                    //人为刷新
                    _captchaObj.onRefresh && _captchaObj.onRefresh(function () {
                        $("#btn_mobileyzm").val("获取验证码");
                        _inThis._wait = 60;
                        _inThis._isSendYzm = false;
                        _inThis._isGeetCodePass = false;
                        _inThis._geetConfig = null;
                    });
                    _captchaObj.onSuccess(function (json) {
                        var config = _captchaObj.getValidate();
                        if (!config) {
                            BaseControl.showWin({ msg: "极验验证码配置信信息获取失败", isclose: false, hidespeed: 2 });
                            return;
                        }
                        _inThis._geetConfig = config;
                        _inThis._isGeetCodePass = true;
                    });
                });
            }
        });
    },
    /**
    * 验证图片验证码是否正确
    * @param {config} object 极验验证码配置信息
    */
    checkImgCode: function (config) {
        var _result = true;
        $.ajax({
            url: "/apiPc/user/codeCheckGet.html",
            type: "post",
            data: { t: "jc", "geetest_challenge": config.geetest_challenge, "geetest_validate": config.geetest_validate, "geetest_seccode": config.geetest_seccode },
            dataType: "json",
            async: false,//同步
            success: function (json) {
                if (json && json.obj.status == 'fail') {
                    if (json.msg == "您输入的验证码不对") {
                        _isGeetCodePass = false;
                        captchaObj.refresh();
                    }
                    Register_pc.tiShi("smsCodeVal", "*" + json.msg);
                    _result = false;
                } else {
                    Register_pc.phoneCode($("#mobile").val());
                }
            }
        });
        return _result;
    },
    /**
    * 用户注册
    */
    regSite: function () {
        var mobile = $("#mobile").val(),
            password = $("#password").val(),
            phonecode = $("#phonecode").val();
        if (mobile.length < 11) {
            $("#mobile").focus();
            Register_pc.tiShi("phoneVal", "*请输入正确的手机号码");
            return;
        }
        if (password.length < 6 || password.length > 16) {
            $("#password").focus();
            Register_pc.tiShi("firstpwdVal", "*密码长度请控制在6~16位");
            return;
        }
        if (!this._isGeetCodePass) {
            Register_pc.tiShi("smsCodeVal", "*请先拖动上方滑块完成极验验证");
            return;
        }
        if (!this.isSendPhoneCode) {
            Register_pc.tiShi("smsCodeVal", "*请先获取手机验证码");
            return;
        }
        if (phonecode.length == 0) {
            $("#phonecode").focus();
            Register_pc.tiShi("smsCodeVal", "*请输入手机收到的校验码");
            return;
        }
        if ($("#chk_lic").attr("checked") != "checked") {
            Register_pc.tiShi("doregisterMsg", "*请同意注册协议！");
            return;
        }

        //获取加密盐
        $.ajax({
            url: "/apiPc/user/salt.html",
            type: "get",
            dataType: "json",
            async: false,//同步
            success: function (data) {
                var salt = data.obj;
                var pwd = sha256_digest(Ext.MD5(Ext.MD5(password) + salt));
                var channel = getUrlParam('channel') || '';

                var param = {
                    mobile: mobile,
                    mobilecode: phonecode,
                    password: pwd,
                    repassword: pwd,
                    salt: salt,
                    channel: channel
                }
                
                //提交用户信息
                $.ajax({
                    url: "/apiPc/user/regist.html",
                    type: "post",
                    dataType: "json",
                    data: param,
                    success: function (result) {
                        var obj = result.obj;
                        var responseCode = result.responseCode;
                        var responseMessage = result.responseMessage;

                        if (responseCode == '000000') {
                            Register_pc.tiShi("doregisterMsg", "* ^_^ 恭喜您，注册成功，稍后将进行实名认证！");
                            Register_pc.setCookie(Register_pc.userInfoName, JSON.stringify(obj), true);
                            setTimeout(function(){
                                location.href = "https://www.51rz.com/";
                            }, 500);
                        } else {
                            Register_pc.tiShi("doregisterMsg", responseMessage);
                        }
                    },
                    failure: function (err) {
                        Register_pc.wait = 1;
                        $("#regis2").show();
                        $("#regis3").hide();
                        Register_pc.tiShi("doregisterMsg", "提交用户信息出问题了");
                    }
                });
            }
        });


    },

    compileStr:function(code){
        var c=String.fromCharCode(code.charCodeAt(0)+code.length);
        for(var i=1;i<code.length;i++)
        {
            c+=String.fromCharCode(code.charCodeAt(i)+code.charCodeAt(i-1));
        }
        return escape(c);
    },
    uncompileStr:function(code){//字符串进行解密
        code=unescape(code);
        var c=String.fromCharCode(code.charCodeAt(0)-code.length);
        for(var i=1;i<code.length;i++)
        {
            c+=String.fromCharCode(code.charCodeAt(i)-c.charCodeAt(i-1));
        }
        return c;
    },
    setCookie:function(name,value,needCompile) {
        var Days = 1/48;//30分钟过期
        var exp = new Date();
        exp.setTime(exp.getTime() + Days*24*60*60*1000);
        if(needCompile){
            document.cookie = name + "="+ this.compileStr(value) + ";expires=" + exp.toGMTString()+";domain=51rz.com;path=/";
        }else{
            document.cookie = name + "="+ value + ";expires=" + exp.toGMTString()+";domain=51rz.com;path=/";
        }
    },
    getCookie:function(name,needUncompile){//needUncompile 是否要解密  默认不需要解密
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg)){
            var value=unescape(arr[2]);
            return needUncompile?JSON.parse(this.uncompileStr(value)):JSON.parse(value);
        }else
            return false;
    },
    delCookie:function(name,needUncompile){
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);//1ms过期
        var cval=this.getCookie(name,needUncompile);
        if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString()+";domain=51rz.com;path=/";
    }

}

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

$(document).ready(function () {
    Register_pc.init();
});