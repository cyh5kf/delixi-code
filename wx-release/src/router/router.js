import Vue from 'vue'
import VueRouter from 'vue-router'
import API from '@/api'
import store from '@/store/store'
import appLogin from './appLogin'
import getWindowNameUserInfoObj from '@/lib/getWindowNameUserInfoObj.js'
const windowNameUserInfo=getWindowNameUserInfoObj()
const Index = resolve => require(['@/container/Index.vue'], resolve)

//登录注册等
const Login = resolve => require(['@/container/Login.vue'], resolve)
const Register = resolve => require(['@/container/Register.vue'], resolve)
const RegisterAgreement = resolve => require(['@/container/RegisterAgreement.vue'], resolve)

//TODO:用户注册协议
const RegisterAgreement5_4 = resolve => require(['@/container/RegisterAgreement5_4.vue'], resolve)

const ResetPwd = resolve => require(['@/container/ResetPwd.vue'], resolve)

//TODO:发现空态页
const find5_23 = resolve => require(['@/container/find5_23.vue'], resolve)

//TODO:404错误页
const ErrorTip = resolve => require(['@/container/errorTip/errorTip.vue'], resolve)


//个人中心
const MyIndex = resolve => require(['@/container/my/MyIndex.vue'], resolve)
const My = resolve => require(['@/container/my/My.vue'], resolve)
const TenderLists = resolve => require(['@/container/my/TenderLists.vue'], resolve)
const RTenderLists=resolve => require(['@/container/my/RTenderLists.vue'], resolve)
const RChildTenderDetail=resolve => require(['@/container/my/RChildTenderDetail.vue'], resolve)
const RChildSubDetail=resolve => require(['@/container/my/RChildSubDetail.vue'], resolve)
const MyTenderDetail = resolve => require(['@/container/my/TenderDetail.vue'], resolve)
const RedPacket = resolve => require(['@/container/my/RedPacket.vue'], resolve)
const RedPacketHistory = resolve => require(['@/container/my/RedPacketHistory.vue'], resolve)
const RedPacketRules = resolve => require(['@/container/my/RedPacketRules.vue'], resolve)
const TenderFilterByCoupon = resolve => require(['@/container/my/TenderFilterByCoupon.vue'], resolve)
const Calendar = resolve => require(['@/container/my/Calendar.vue'], resolve)
const Account = resolve => require(['@/container/my/Account.vue'], resolve)
const Recharge = resolve => require(['@/container/my/Recharge.vue'], resolve)
const RechargeProtocol = resolve => require(['@/container/my/RechargeProtocol.vue'], resolve)
const RechargeSuccess = resolve => require(['@/container/my/RechargeSuccess.vue'], resolve)
const WithDrawCash = resolve => require(['@/container/my/WithDrawCash.vue'], resolve)
const TransferLists = resolve => require(['@/container/my/TransferLists.vue'], resolve)
const Transfer = resolve => require(['@/container/my/Transfer.vue'], resolve)
const Set = resolve => require(['@/container/my/Set.vue'], resolve)
const SetPwd = resolve => require(['@/container/my/SetPwd.vue'], resolve)
const Bill = resolve => require(['@/container/my/Bill.vue'], resolve)
const BillDetail = resolve => require(['@/container/my/BillDetail.vue'], resolve)
const Assets = resolve => require(['@/container/my/Assets.vue'], resolve)
const CustomerService = resolve => require(['@/container/my/CustomerService.vue'], resolve)
const NewCustomerService = resolve => require(['@/container/my/NewCustomerService.vue'], resolve)
const CustomerDetail = resolve => require(['@/container/my/CustomerDetail.vue'], resolve)
const BorrowPerson = resolve => require(['@/container/my/BorrowPerson.vue'], resolve)
const WithDrawCashRules = resolve => require(['@/container/my/WithDrawCashRules.vue'], resolve)
const TenderListsPrococol = resolve => require(['@/container/my/TenderListsPrococol.vue'], resolve)

const AgreementBorrow = resolve => require(['@/container/my/AgreementBorrow.vue'], resolve)
const AgreementPersonalService = resolve => require(['@/container/my/AgreementPersonalService.vue'], resolve)
const AgreementAccount = resolve => require(['@/container/my/AgreementAccount.vue'], resolve)

//消息中心
const Message = resolve => require(['@/container/my/message/Message.vue'], resolve)
const System = resolve => require(['@/container/my/message/System.vue'], resolve)
const Activity = resolve => require(['@/container/my/message/Activity.vue'], resolve)
const Notice = resolve => require(['@/container/my/message/Notice.vue'], resolve)
const Media = resolve => require(['@/container/my/message/Media.vue'], resolve)
const MessageDetail = resolve => require(['@/container/my/message/Detail.vue'], resolve)


//账户信息
const Info = resolve => require(['@/container/my/info/Info.vue'], resolve)
const PhoneUpdate = resolve => require(['@/container/my/info/PhoneUpdate.vue'], resolve)
const NameUpdate = resolve => require(['@/container/my/info/NameUpdate.vue'], resolve)
const BankCard = resolve => require(['@/container/my/info/BankCard.vue'], resolve)
const BankOpen = resolve => require(['@/container/my/info/BankOpen.vue'], resolve)
const BankSurportList = resolve => require(['@/container/my/BankSurportList.vue'], resolve)
const Risk = resolve => require(['@/container/my/info/Risk.vue'], resolve)


//投资
const TenderIndex = resolve => require(['@/container/tender/TenderIndex.vue'], resolve)
const Tender = resolve => require(['@/container/tender/Tender.vue'], resolve)
const TenderDetail = resolve => require(['@/container/tender/TenderDetail.vue'], resolve)
const Buy = resolve => require(['@/container/tender/Buy.vue'], resolve)
const BuySuccess = resolve => require(['@/container/tender/BuySuccess.vue'], resolve)
const TenderProgress = resolve => require(['@/container/tender/sub/Progress.vue'], resolve)
const TenderSafeGuard = resolve => require(['@/container/tender/sub/SafeGuard.vue'], resolve)
const TenderPageDetail = resolve => require(['@/container/tender/sub/TenderDetail.vue'], resolve)
const TenderRecordLists = resolve => require(['@/container/tender/sub/RecordLists.vue'], resolve)
const Protocol = resolve => require(['@/container/tender/sub/Protocol.vue'], resolve)
const RPlan = resolve => require(['@/container/tender/sub/RPlan.vue'], resolve)
const RCommonProblem = resolve => require(['@/container/tender/sub/RCommonProblem.vue'], resolve)
const DangerTipReport = resolve => require(['@/container/tender/sub/DangerTipReport.vue'], resolve)
const BorrowInfo = resolve => require(['@/container/tender/sub/BorrowInfo.vue'], resolve)
const TransferRules = resolve => require(['@/container/tender/TransferRules.vue'], resolve)

//邀请好友
const InviteIndex = resolve => require(['@/container/invite/InviteIndex.vue'], resolve)
const Invite = resolve => require(['@/container/invite/Index.vue'], resolve)
const InviteRecord = resolve => require(['@/container/invite/Record.vue'], resolve)
const InviteShare = resolve => require(['@/container/invite/Share.vue'], resolve)
const InviteCode = resolve => require(['@/container/invite/Code.vue'], resolve)
const InviteSuccess = resolve => require(['@/container/invite/Success.vue'], resolve)


//新手指引
const NoviceGuide = resolve => require(['@/container/sundry/NoviceGuide.vue'], resolve)
const Welfare = resolve => require(['@/container/sundry/Welfare.vue'], resolve)

//TODO:新手福利临时
const Welfare5_4 = resolve => require(['@/container/sundry/Welfare5_4.vue'], resolve)
const Welfare6_28 = resolve => require(['@/container/sundry/Welfare6_28.vue'], resolve)

// a轮融资
const Asummary =resolve=>require(['@/container/sundry/Asummary.vue'],resolve);

//信息披露
const InfoIndex = resolve => require(['@/container/sundry/InfoIndex.vue'], resolve)
const InfoPromise = resolve => require(['@/container/sundry/InfoPromise.vue'], resolve)
const InfoModel = resolve => require(['@/container/sundry/InfoModel.vue'], resolve)
const InfoHonor = resolve => require(['@/container/sundry/InfoHonor.vue'], resolve)
const InfoList = resolve => require(['@/container/sundry/InfoList.vue'], resolve)
const InfoData = resolve => require(['@/container/sundry/InfoData.vue'], resolve)
const InfoSafety = resolve => require(['@/container/sundry/InfoSafety.vue'], resolve)
//关于我们
const Know = resolve => require(['@/container/sundry/Know.vue'], resolve)

//TODO:关于我们
const Know6_28 = resolve => require(['@/container/sundry/Know6_28.vue'], resolve)

//银行存管
const BankCunGuan=resolve => require(['@/container/sundry/BankCunGuan.vue'], resolve)
//TODO:银行存管
const BankCunGuan1=resolve => require(['@/container/sundry/BankCunGuan1.vue'], resolve)

//债转协议
const AgreementTransfer=resolve => require(['@/container/my/AgreementTransfer.vue'], resolve);

Vue.use(VueRouter);

const guardRoute = (to, from, next) => {
    const userEndTime = store.state.userEndTime;//过期时间
    const localeTime = new Date() * 1;
    if (localeTime > userEndTime) {//当前时间大于过期时间  ：前端用户已过期
        Vue.http({
            url: API.loginCheck,
            method: 'get',
            params:{
                token:(windowNameUserInfo && windowNameUserInfo.token) || store.state.info.token
            }
        }).then((response) => {
            const {body} = response
            switch(body.responseCode) {
                case '000000':
                    store.dispatch('setUserEndTime', body.obj*1000)
                    next()
                    break
                case '999998':
                    store.dispatch('setLoginTo', to.fullPath || '/my/index')
                    store.dispatch('setInfo',{
                        realNameStatus: '',
                        uid: '',
                        isPayPasWord: '',
                        token: '',
                        riskScore: 0,
                        realNameStatus:'',
                    })
                    next('/login')
                    break
                case '500005':
                    store.dispatch('setStopService', {current:true,returnMsg:body.responseMessage})
                    break
                case '999999':
                    store.dispatch('showMsg', body.responseMessage)
                    break
                default:
                    store.dispatch('showMsg', body.responseMessage || '当前投资用户过多，系统玩命处理中，请稍后!')
            }
        }).catch((response) => {
            store.dispatch('showMsg', '当前投资用户过多，系统玩命处理中，请稍后!')
        })
    } else {
        next()
    }
}

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Index,
            redirect: '/index'
        },
        {
            path: '/login',
            component: Login,
            meta: {
                title: '登录'
            }
        },
        {
            path: '/index',
            component: Index,
            meta: {
                title: '人众金服'
            }
        },
        {
            path: '/tender',
            component: TenderIndex,
            redirect: '/tender/index',
            children: [
                {
                    path: 'index',
                    component: Tender,
                    meta: {
                        title: '产品'
                    }
                },
                {
                    path: 'RPlan',
                    component: RPlan,
                    meta: {
                        title: 'R计划火热上线'
                    }
                },
                {
                    path: 'detail/:bid/:productType/:category',
                    component: TenderDetail,
                    meta: {
                        title: '产品',
                        setTitle
                    }
                },
                {
                    path: 'dangerTipReport',
                    component: DangerTipReport,
                    meta: {
                        title: '风险提示报告书',
                    }
                },
                {
                    path: 'protocol/:protocolId',
                    component: Protocol,
                    meta: {
                        title: '协议',
                        tip:'app端调用协议模板  app、微信端共用'
                    },
                },
                {
                    path: 'progress/:bid/:productId/:productType',
                    component: TenderProgress,
                    meta: {
                        title: '产品',
                        tip:'app端调用项目历程'
                    },
                },
                {
                    path: 'safeGuard/:bid/:productId',
                    component: TenderSafeGuard,
                    meta: {
                        title: '产品',
                        tip:'app端调用安全保障'
                    },
                },
                {
                    path: 'tenderDetail/:bid/:productId/:productType/:category',
                    component: TenderPageDetail,
                    meta: {
                        title: '产品',
                        tip:'app端调用标的详情'
                    },
                },
                {
                    path: 'recordLists/:bid/:productId',
                    component: TenderRecordLists,
                    meta: {
                        title: '产品',
                        tip:'app端调用投标记录'
                    }
                },
                {
                    path: 'RCommonProblem',
                    component: RCommonProblem,
                    meta: {
                        title: '常见问题',
                        tip:'app端调用R计划常见问题'
                    }
                },
                {
                    path: 'borrowInfo',
                    component: BorrowInfo,
                    meta: {
                        title: '借款信息',
                        tip:'app端调用借款信息'
                    }
                },
                {
                    path: 'buy/:bid/:productType/:category',
                    component: Buy,
                    meta: {
                        title: '投资'
                    },
                    beforeEnter: guardRoute
                },
                {
                    path: 'buySuccess',
                    component: BuySuccess,
                    meta: {
                        title: '投资'
                    }
                },
                {
                    path: 'transferRules',
                    component: TransferRules,
                    meta: {
                        title: '转让规则'
                    }
                },
            ],
        },
        {
            path: '/my',
            component: MyIndex,
            children: [
                {
                    path: 'index',  //个人中心首页
                    component: My,
                    meta: {
                        title: '我的'
                    },
                    beforeEnter: guardRoute
                },
                {
                    path: 'protocol',//投资列表各种协议
                    component: TenderListsPrococol,
                    meta: {
                        title: '',
                        setTitle
                    }
                },
                {
                    path: 'tenderLists',//投资列表
                    component: TenderLists,
                    meta: {
                        title: '单标项目'
                    }
                },
                {
                    path: 'rTenderLists',//投资列表
                    component: RTenderLists,
                    meta: {
                        title: 'R计划'
                    }
                },
                {
                    path: 'rChildTenderDetail/:tenderId',//R计划小标详情
                    component: RChildTenderDetail,
                    meta: {
                        title: 'R计划'
                    }
                },
                {
                    path: 'rChildSubDetail/:tenderId',//R计划小标还款详情
                    component: RChildSubDetail,
                    meta: {
                        title: 'R计划'
                    }
                },
                {
                    path: 'myTenderDetail',//投资列表的标的详情
                    component: MyTenderDetail,
                    meta: {
                        title: '我的'
                    }
                },
                {
                    path: 'borrowPerson/:tenderId',//借款人信息列表
                    component: BorrowPerson,
                    meta: {
                        title: '借款信息',
                        tip:'app端、微信共用借款信息'
                    }
                },
                {
                    path: 'redPacket',//优惠券列表
                    component: RedPacket,
                    meta: {
                        title: '优惠券'
                    },
                    beforeEnter: guardRoute
                },
                {
                    path: 'redPacketRules',//优惠券使用规则
                    component: RedPacketRules,
                    meta: {
                        title: '优惠券使用规则'
                    },
                },
                {
                    path: 'tenderFilterByCoupon/:couponType/:couponId',//根据优惠券筛选的标的列表
                    component: TenderFilterByCoupon,
                    meta: {
                        title: '适用标的'
                    },
                    beforeEnter: guardRoute
                },
                {
                    path: 'redPacketHistory/:type',//红包 加息券历史列表
                    component: RedPacketHistory,
                    meta: {
                        title: '我的'
                    }
                },
                {
                    path: 'calendar',
                    component: Calendar,
                    meta: {
                        title: '还款日历'
                    }
                },
                {
                    path: 'account',
                    component: Account,
                    meta: {
                        title: '账户余额'
                    }
                },
                {
                    path: 'recharge',
                    component: Recharge,
                    meta: {
                        title: '充值'
                    }
                },
                {
                    path: 'rechargeProtocol',
                    component: RechargeProtocol,
                    meta: {
                        title: '支付协议'
                    }
                },
                {
                    path: 'rechargeSuccess',
                    component: RechargeSuccess,
                    meta: {
                        title: '充值'
                    }
                },
                {
                    path: 'withDrawCash',
                    component: WithDrawCash,
                    meta: {
                        title: '提现'
                    }
                },
                {
                    path: 'withDrawCashRules',
                    component: WithDrawCashRules,
                    meta: {
                        title: '提现规则'
                    }
                },
                {
                    path: 'transferLists',
                    component: TransferLists,
                    meta: {
                        title: '我的转让'
                    }
                },
                {
                    path: 'transfer/:tenderId/:bondId',//tenderId 投标id（转让请求用）  bondId 债权标id（取消转让请求用）
                    component: Transfer,
                    meta: {
                        title: '我的转让'
                    }
                },
                {
                    path: 'set',
                    component: Set,
                    meta: {
                        title: '设置'
                    }
                },
                {
                    path: 'setPwd/:type',//1 改登录密码 2 改交易密码 3 设置交易密码
                    component: SetPwd,
                    meta: {
                        title: '设置密码',
                        setTitle
                    }
                },
                {
                    path: 'bill',
                    component: Bill,
                    meta: {
                        title: '我的账单'
                    }
                },
                {
                    path: 'billDetail/:id/:money',
                    component: BillDetail,
                    meta: {
                        title: '账单明细'
                    }
                },
                {
                    path: 'info',
                    component: Info,
                    meta: {
                        title: '账户信息'
                    }
                },
                {
                    path: 'phoneUpdate',
                    component: PhoneUpdate,
                    meta: {
                        title: '更换手机'
                    }
                },
                {
                    path: 'nameUpdate',
                    component: NameUpdate,
                    meta: {
                        title: '修改昵称'
                    }
                },
                {
                    path: 'bankCard',
                    component: BankCard,
                    meta: {
                        title: '我的银行卡'
                    }
                },
                {
                    path: 'risk',
                    component: Risk,
                    meta: {
                        title: '风险测评'
                    }
                },
                {
                    path: 'bankOpen',
                    component: BankOpen,
                    meta: {
                        title: '开通银行存管账户'
                    }
                },
                {
                    path: 'bankSurportList',
                    component: BankSurportList,
                    meta: {
                        title: '支持银行'
                    }
                },
                {
                    path: 'assets',
                    component: Assets,
                    meta: {
                        title: '资产明细'
                    }
                },
                {
                    path: 'customerService',
                    component: CustomerService,
                    meta: {
                        title: '客服中心'
                    }
                },{
                    path: 'newCustomerService',
                    component: NewCustomerService,
                    meta: {
                        title: '客服中心'
                    }
                },
                {
                    path: 'customerDetail/:index/:sub',
                    component: CustomerDetail,
                    meta: {
                        title: '客服中心'
                    }
                },
                {
                    path: 'message',
                    component: Message,
                    meta: {
                        title: '消息中心'
                    }
                },
                {
                    path: 'message/system',
                    component: System,
                    meta: {
                        title: '系统消息'
                    }
                },
                {
                    path: 'message/activity',
                    component: Activity,
                    meta: {
                        title: '精彩活动'
                    }
                },
                {
                    path: 'message/notice',
                    component: Notice,
                    meta: {
                        title: '平台公告'
                    }
                },
                {
                    path: 'message/media',
                    component: Media,
                    meta: {
                        title: '媒体新闻'
                    }
                },
                {
                    path: 'message/detail/:id',
                    component: MessageDetail,
                    meta: {
                        title: '详情'
                    }
                },
                {
                    path: 'agreementBorrow',
                    component: AgreementBorrow,
                    meta: {
                        title: '借款协议'
                    }
                },
                {
                    path: 'agreementPersonalService',
                    component: AgreementPersonalService,
                    meta: {
                        title: '个人投资与服务协议'
                    }
                },
                {
                    path: 'agreementAccount',
                    component: AgreementAccount,
                    meta: {
                        title: '应收账款转让及回购合同'
                    }
                },
            ]
        },
        {
            path: '/invite',
            component: InviteIndex,
            children: [
                {
                    path: 'index',
                    component: Invite,
                    meta: {
                        title: '邀请有礼'
                    }
                },
                {
                    path: 'record/:type',
                    component: InviteRecord,
                    meta: {
                        title: '邀请有礼',
                        setTitle,
                    }
                },
                {
                    path: 'share',
                    component: InviteShare,
                    meta: {
                        title: '邀请好友'
                    }
                },
                {
                    path: 'code',
                    component: InviteCode,
                    meta: {
                        title: '我的二维码'
                    }
                },
                {
                    path: 'success',
                    component: InviteSuccess,
                    meta: {
                        title: '注册成功'
                    }
                }
            ]
        },
        {
            path: '/register',
            component: Register,
            meta: {
                title: '注册'
            }
        },
        {
            path: '/registerAgreement',
            component: RegisterAgreement,
            meta: {
                title: '注册服务协议'
            }
        },
        {
            path: '/registerAgreement5_4',
            component: RegisterAgreement5_4,
            meta: {
                title: '注册服务协议'
            }
        },
        {
            path: '/find5_23',
            component: find5_23,
            meta: {
                title: '发现'
            }
        },
        {
            path: '/errorTip',
            component: ErrorTip,
            meta: {
                title: '提示'
            }
        },
        {
            path: '/resetPwd/:type',
            component: ResetPwd,
            meta: {
                title: '找回登录密码',
                setTitle
            }
        },
        {
            path:'/noviceGuide',
            component:NoviceGuide,
            meta:{
                title:'新手指引'
            }
        },
        {
            path:'/a_summary',
            component:Asummary,
            meta:{
                title:'A轮融资'
            }
        },
        {
            path:'/welfare',
            component:Welfare,
            meta:{
                title:'新手福利'
            }
        },
        {
            path:'/welfare5_4',
            component:Welfare5_4,
            meta:{
                title:'新手福利'
            }
        },
        {
            path:'/welfare6_28',
            component:Welfare6_28,
            meta:{
                title:'新手福利'
            }
        },
        {
            path:'/infoList',
            component:InfoList,
            meta:{
                title:'组织信息',
                setTitle,
            }
        },
        {
            path:'/infoSafety',
            component: InfoSafety,
            meta:{
                title:'安全保障'
            }
        },
        {
            path:'/infoData',
            component: InfoData,
            meta:{
                title:'平台数据'
            }
        },
        {
            path:'/infoIndex',
            component: InfoIndex,
            meta:{
                title:'信息披露'
            }
        },
        {
            path:'/infoPromise',
            component: InfoPromise,
            meta:{
                title:'信披承诺'
            }
        },
        {
            path:'/infoModel',
            component: InfoModel,
            meta:{
                title:'业务模式'
            }
        },
        {
            path:'/infoHonor',
            component: InfoHonor,
            meta:{
                title:'荣誉资质'
            }
        },
        {
            path:'/know',
            component:Know,
            meta:{
                title:'关于我们'
            }
        },
        {
            path:'/know6_28',
            component:Know6_28,
            meta:{
                title:'关于我们'
            }
        },
        {
            path:'/bankCunGuan',
            component:BankCunGuan,
            meta:{
                title:'银行存管'
            }
        },
        {
            path:'/bankCunGuan1',
            component:BankCunGuan1,
            meta:{
                title:'银行存管'
            }
        },
        {
            path:'/agreementTransfer',
            component:AgreementTransfer,
            meta:{
                title:'债转协议'
            }
        },
        appLogin,
    ]
})

router.beforeEach((to, from, next) => {
    setTitle(to.meta.title)
    scrollTo(0,0)
    next()
})

function setTitle(title) {
    document.title = title
    let mobile = navigator.userAgent.toLowerCase()
    if (/iphone|ipad|ipod/.test(mobile)) {
        let iframe = document.createElement('iframe')
        iframe.style.display = 'none'
        iframe.setAttribute('src', 'https://images.51rz.com/images/rebuild/wx/favicon.ico')
        let iframeCallback = function () {
            setTimeout(function () {
                iframe.removeEventListener('load', iframeCallback)
                document.body.removeChild(iframe)
            }, 0)
        }
        iframe.addEventListener('load', iframeCallback)
        document.body.appendChild(iframe)
    }
}
export default router
