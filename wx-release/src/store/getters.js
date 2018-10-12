const getters = {
    loading: (state) => state.show_loading,
    msg: (state) => state.msg,
    userEndTime:(state) => state.userEndTime,//用户过期时间
    loginTo:(state) => state.loginTo,//登陆过后该跳转的页面
    info:(state) => state.info,//用户基本信息
    messageInfo:(state) => state.messageInfo,//消息中心基本信息  是否有未读的消息等
    curTenderInfo:(state) => state.curTenderInfo,//当前标的的详细信息
    stopService:(state) => state.stopService,//服务器停机状态
}
export default getters