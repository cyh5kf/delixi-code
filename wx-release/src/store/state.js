import getWindowNameUserInfoObj from '@/lib/getWindowNameUserInfoObj.js'

const windowNameUserInfo=getWindowNameUserInfoObj()
let info=windowNameUserInfo || JSON.parse(localStorage.getItem('info')||null);
info=info||{//用户信息
    uid:'',
    userName:'',//例：rz13588886666
    isPayPasWord:'',//是否设置过交易密码
    regMobile:'',//注册手机号
    realNameStatus:'',//是否开户 1已开户  其它：未开户
    token:'',
    riskScore:0,
}

let messageInfo=JSON.parse(localStorage.getItem('messageInfo')||null);
messageInfo=messageInfo||{//消息中心首页显示红点
    activeId:null,
    gongGaoId:null,
    newsId:null
}

let curTenderInfo=JSON.parse(localStorage.getItem('curTenderInfo'))||{};
const state = {
    show_loading: false,
    userEndTime:0,//用户过期时间
    loginTo:'',//用户登陆过后的跳转页面  默认首页
    info,
    messageInfo,
    curTenderInfo,
    msg: {
        show: false,
        content: '',
        time: 2000
    },
    stopService: {
        before: false,
        current: false,
        returnMsg: '',
    }
}
export default state