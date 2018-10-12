/**
 * Created by Administrator on 2018/1/9.
 */
/**
 * 用户注册操作脚本
 */
var Register = {
    wait: 60,//验证码等待时长 单位s
    isSendPhoneCode: false,//是否发送手机验证码
    isSend: false,//是否已发送过验证码
    _isNumCodePass: false,//是否完成数字验证码验证
    imageToken:0,
    userInfoName:'uif',
    url:'https://m.51rz.com',
    init: function () {
        this.addEvents();
        this.getCode();
    },
    /**
     * 获取图片验证码
     */
    getCode:function(){
        this.imageToken = new Date().getTime() + '' + Math.floor(Math.random() * 10000);
        $("#numcode").attr("src", this.url +"/apiApp/pcrimg.html?imgToken="+this.imageToken);
    },
    /**
     * 事件监听
     */
    addEvents: function () {
        $("#btnSendPhoneCode").click(function () {
            Register.sendPhoneCode();
        });
        $("#btnReg").click(function () {
            Register.regSite();
        });
    },
    /**
     * 发送手机验证码
     */
    sendPhoneCode: function () {
        if (this.isSendPhoneCode) {
            alert("亲，不要太着急哦 ，耐心等待手机响起吧");
            return;
        }
        var mobile = $("#mobile").val(), imgcode = $("#imgcode").val();
        if (mobile.length < 11) {
            $("#mobile").focus();
            alert("请输入正确的手机号码");
            return;
        }
        Register.phoneCode();
    },
    /**
     * 获取验证码
     */
    phoneCode: function (mobile) {
        var mobile = $("#mobile").val(), imgcode = $("#verycode").val(), password = $("#password").val(), phonecode = $("#phonecode").val();
        $.ajax({
            url: this.url + "/apiApp/sendVcode.html",
            data: {mobile:mobile,imgToken:this.imageToken,patchcaCode:imgcode,loginfrom:'wap'},
            dataType: "json",
            success: function (json) {
                if (json.responseCode == 999999) {
                    Register.resetImgCode();
                    alert(json.responseMessage);
                } else if(json.responseCode == 100011){
                    $('#msg').css('display','block')                    
                    $('#msg').html('<p>'+json.responseMessage+'</p>')
                    setTimeout(function(){
                        $('#msg').html('')                        
                        $('#msg').css('display','none')
                    },1500)
                }else {
                    Register.isSendPhoneCode = true;
                    Register.isSend = true;
                    Register.timeLimit();
                } 
            }
        });
    },
    /**
     * 验证码倒计时
     */
    timeLimit: function () {
        if (Register.wait == 0) {
            $("#btnSendPhoneCode").text("重新发送");
            Register.wait = 60;
            Register.isSendPhoneCode = false;
        } else {
            $("#btnSendPhoneCode").text("已发送(" + Register.wait + ")");
            Register.wait--;
            setTimeout(function () {
                Register.timeLimit()
            }, 1000)
        }
    },

    /**
     * 重置数字验证码
     */
    resetImgCode: function () {
        this.getCode();
    },
    calSaltPass:function(pwd,salt){
        return sha256_digest(Ext.MD5(Ext.MD5(pwd) + salt));
    },
    /**
     * 用户注册
     */
    regSite: function () {
        var mobile = $("#mobile").val(), password = $("#password").val(), phonecode = $("#phonecode").val();
        if (mobile.length < 11) {
            $("#mobile").focus();
            alert("请输入正确的手机号码");
            return;
        }
        if (password.length < 6 || password.length > 16) {
            $("#password").focus();
            alert("密码长度请控制在6~16位");
            return;
        }
        if (!this.isSend) {
            alert("请先获取手机验证码");
            return;
        }
        if (phonecode.length == 0) {
            $("#phonecode").focus();
            alert("请输入手机收到的校验码");
            return;
        }
        if (!$("#chk_lic").prop('checked')) {
            alert("请同意注册协议");
            return;
        }
        $.post(Register.url +'/apiApp/salt.html',function(data){
            if(data.responseCode == '000000'){
                if(data.obj != ''){
                    var salt = data.obj;
                    var channel = getParam("channel") || '';
                    var pwd = Register.calSaltPass(password,salt);
                    //提交用户信息
                    $.ajax({
                        url: Register.url + "/apiApp/regist.html",
                        type: "post",
                        dataType: "json",
                        data: {mobile: mobile, password: pwd,repassword:pwd, mobileCode: phonecode, loginfrom:'1',salt:salt,channel:channel},
                        success: function (result) {
                            if (!result) return;
                            if (result.responseCode == '000000') {
                                Register.setCookie(Register.userInfoName,JSON.stringify(result.obj),true)
                                if(typeof success == "function"){
                                    success();
                                }else {
                                    location.href = Register.url + '/tender/index'
                                }
                            }else{
                                alert(result.responseMessage || '当前投资用户过多，系统玩命处理中，请稍后!');
                            }
                        }
                    });
                }
            }
        },'json')
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
            return needUncompile?JSON.parse(Register.uncompileStr(value)):JSON.parse(value);
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
function getParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}
function out() {
    Register.delCookie(Register.userInfoName,true);
    location.reload();
}
function go(url){
    location.href = url ;
}
$(document).ready(function () {
    Register.init();
});
