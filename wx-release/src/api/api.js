const host = '/apiApp/'
const url = {
    getIndex: 'index/getIndex', //首页
    checkMobile: 'checkMobile', //注册第一步
    register: 'regist',         //注册接口
    salt: 'salt',            //注册获取加盐码
    rSendCode: 'sendVcode',      //注册发送验证码
    getImgCode: 'pcrimg',       //获取图形验证码
    loginCheck: 'login/befor',              //校验用户是否登录
    login: 'login',              //登录接口
    loginOut: 'loginOut',//退出
    resetLoginPwd: 'account/changePassword',//修改登录密码
    setPayPwd: 'account/setPayPwd',//设置交易密码
    changePayPwd: 'account/changePayPwd',//修改交易密码
    sendPayPwdVcode: 'account/sendPayPwdVcode',//找回|重置 交易密码短信
    resetPassword: 'account/resetPassword',//找回|重置 交易密码
    sendUserVcode: 'sendUserVcode',//找回|重置 登录密码短信
    resetLoginPassword: 'resetPassword',//找回|重置 登录密码
    verifyCardIdAndRealName: 'verifyCardIdAndRealName',//修改交易密码之前进行身份校验
    getRedpacketList: 'redpacket/getRedpacketList',//优惠券
    couponFitTenderLists: 'borrow/coupon',//优惠券 适用标的

    nameUpdate: 'account/changeNickName',           //修改用户昵称
    uploadImage: 'account/uploadImage',             //修改用户头像
    oldPhoneSendCode: 'account/sendOldMobileVcode',     //修改手机向旧手机发验证码
    newPhoneSendCode: 'account/sendNewMobileVcode',     //修改手机向新手机发验证码
    oldPhoneCheck: 'account/validateOldMobileVCode',    //修改手机校验原手机
    resetPhone: 'account/resetMobile',                  //修改手机重置手机号
    masterCard: 'account/masterCard',                   //我的银行卡
    borrowList: 'borrow/search',//理财标的列表
    borrowDetail: 'borrow/detail',//标的详情页面
    agreeRisk: 'updateRiskStatus',//同意风险提示告示书
    detailProgress: 'borrow/detail/progress',//标的详情项目历程
    borrowTender: 'borrow/tender',           //投标
    detailTenderList: 'borrow/detail/tender/list',//标详情-投资记录
    getProtocol: 'borrow/detail/protocol',//协议模板
    buyTender: 'borrow/tender',//购买标的
    openAccountSendSms: '/account/openAccountSendSmsCode',//银行存管发送短信
    openAccount: 'account/openAccount',//银行存管开户
    showBankListWY: 'recharge/querySupportBank',//支持银行列表
    getNoticeIndex: 'notice/getNoticeIndex',//消息中心首页
    getArticleList: 'article/getArticleList',//1.平台公告 2.媒体新闻 3.公司资讯
    getNoticeList: 'notice/getNoticeList',//系统消息
    getNoticeBannerList: 'banner/getNoticeBannerList',//精彩活动
    getArticleDetails: 'article/getArticleDetails',//文章详情
    readNotice: 'notice/readNotice',            //阅读消息

    showBankInfoWeb: 'recharge/showBankInfoWeb',//充值页面展示
    selectPayChannel: 'recharge/selectChannel',//选择支付路由
    lianlianRecharge: 'recharge/createRechargeWap',//连连充值
    quickRecharge: 'recharge/quickRechargeSubmit',//快捷充值
    quickRechargeConfirm: 'recharge/quickRechargeConfirm',//快捷充值确认


    showWithdrawInfoApp: 'withdraw/showWithdrawInfoApp',    //提现页面展示
    addWithdrawRecord: 'withdraw/addWithdrawRecord',        //发起提现

    myTender: 'center/myTender',//我的投资
    myTenderDetail: 'center/tender/flow',//投资列表对应的进度详情
    querySaveAndCashLog: 'withdraw/querySaveAndCashLog',//账户余额

    myRTender: 'rplan/myTender',// 我的R计划投资列表
    myRChildTenderDetail: 'rplan/myTender/detail',//
    myRRepayment: 'rplan/myTender/detail/repayment',//R计划还款详情
    borrowPersonInfo: 'borrowinfo',//借款人信息 rplan/myTender/borrowprogress
    myRBorrowProgress: 'rplan/myTender/borrowprogress',//标的进度
    myTenderProtocolDetail: 'center/tender/investProtocol',//我的投资里面的协议
    oldProtocol: "center/tender/oldProtocol",//老标协议接口 返回字段  自己填充

    myAccount: 'account/myAccount',         //我的账户首页
    accountDetail: 'account/getAccountDetail',          //资金明细
    findAccountLogs: 'account/findAccountLogs',         //我的账单
    accountLogDetail: 'account/rzAccountLogDetail',     //账单明细
    borrowCalendar: 'borrow/borrowCalendarNew',            //还款日历

    tenderTransferLists: 'bond/queryBondAttornPage',      //理财 转让 列表
    tenderTransferDetail: 'bond/queryBondAttornDetail',   //理财 转让 详情

    myTransferLists: 'bond/transferList',                   //个人中心 转让列表
    createTransfer: 'bond/createBond',     //个人中心  发布转让
    cancelTransfer: 'bond/bondCancel',    //个人中心  取消转让
    myTransferDetail: 'borrow/creditor',//个人中心  转让详情

    inviteIndex: 'invite/inviteIndex',      //邀请好友首页
    inviteRanking: 'invite/getInviteRanking', //邀请好友首页人脉榜
    myInviteRanking: 'invite/myInviteRanking', // 我的邀友信息
    newRedpacket: 'invite/getNewRedpacket', // 邀友页面获取红包滚动
    inviteList: 'invite/inviteList',        //邀请记录
    inviteRewardList: 'invite/rewardList',  //奖励记录
    inviteQrCode: 'invite/getQrCode',       //邀请二维码
    inviteGetMobile: 'invite/getMobile',    //根据uid获取手机号
    inviteShare: 'invite/shareInvite',      //分享链接
    inviteConfig: 'wx/getConfig',      //分享配置
    myLastMonRanking:'invite/lastMonRanking', //历史排行榜-上月排行榜接口

    riskTest: 'risk/update',                //风险测评
    platformData: 'index/dailyData.html',    //平台数据
    borrowCount: 'information/getBorrowCount',//余额笔数
    upRedPacket: 'redpacket/listMyCoupon',  //成长红包

    oldBondProtocol: 'center/tender/oldBondProtocol',//债转协议

    nowDate: 'index/nowData',           //服务器当前时间
}
for (let key in url) {
    url[key] = host + url[key] + '.html'
}
export default url