const data = {
    0:{
        name:'绑定记录',
        method:'cardList',
        labels:[
            {name:'bankId',value:'编码'},
            {name:'bank',value:'所属银行'},
            {name:'bankNo',value:'卡号'},
            {name:'cgBindStatus',value:'绑卡状态'},
            {name:'masterCard',value:'是否主卡'}
            ],
        items:[

        ]
    },
    1:{
        name:'R计划投资记录',
        method:'rPlanTenderList',
        labels:[
            // {name:'id',value:'id'},
            {name:'bigBorrowId',value:'标的ID'},
            {name:'name',value:'标的名称'},
            {name:'apr',value:'年化'},
            {name:'createTime',value:'投标时间'},
            {name:'timeLimit',value:'标的期限'},
            {name:'amount',value:'标的总额'},
            {name:'money',value:'投资金额'},
            {name:'repaymentAccount',value:'应收总额'},
            {name:'repaymentPrincipal',value:'应收本金'},
            {name:'interest',value:'应收利息'},
            // {name:'userId',value:'用户id'},
            {name:'rPlanTenderStatus',value:'状态'},
            // {name:'borrowTimeType',value:'0'},
            {name:'awardRedPkg',value:'红包金额(元)'},
            {name:'awardInterest',value:'加息利息(元)'},
            {name:'awardApr',value:'加息利率'},
            {name:'control',value:'操作'}
        ],
        labels1:[
            {name:'bigBorrowId',value:'标的ID'},
            {name:'name',value:'小标名称'},
            {name:'bankId',value:'期限'},
            {name:'apr',value:'预期年化'},
            {name:'awardApr',value:'加息利率'},
            {name:'awardInterest',value:'加息利息'},
            {name:'awardRedPkg',value:'红包金额'},
            {name:'createTime',value:'投标时间'},
            {name:'timeLimit',value:'期限'},
            {name:'borrowTimeType',value:'标时间类型'},
            {name:'amount',value:'标的总额'},
            {name:'money',value:'投资金额'},
            {name:'repaymentAccount',value:'应收总额'},
            {name:'repaymentPrincipal',value:'应收本金'},
            {name:'interest',value:'应收利息'},
            {name:'awardType',value:'奖励类型'},
            {name:'id',value:'投资 id'}
        ],
        items:[
            {
                id:1, //小标ID
                name:'中国银行', //小标名称
                deadline:0, //期限
                annualized:'0',//预期年化
                rate:0,//加息利息
                currentCardinalNum:0,//当前基数
                sumCardinalNum:0,//总基数
                loanAmount:0,//借款金额
                investmentAmount:0,//投资金额
                pendingInterest:0,//待收本息
                principalCollected:0,//待收本金
                interestReceivable:0,//待收利息
                tenderTime:0,//投标时间
                repaymentTime:0,//还款时间
                status:0,//对付状态
            },{
                id:1, //小标ID
                name:'中国银行', //小标名称
                deadline:0, //期限
                annualized:'0',//预期年化
                rate:0,//加息利息
                currentCardinalNum:0,//当前基数
                sumCardinalNum:0,//总基数
                loanAmount:0,//借款金额
                investmentAmount:0,//投资金额
                pendingInterest:0,//待收本息
                principalCollected:0,//待收本金
                interestReceivable:0,//待收利息
                tenderTime:0,//投标时间
                repaymentTime:0,//还款时间
                status:0,//对付状态
            },{
                id:1, //小标ID
                name:'中国银行', //小标名称
                deadline:0, //期限
                annualized:'0',//预期年化
                rate:0,//加息利息
                currentCardinalNum:0,//当前基数
                sumCardinalNum:0,//总基数
                loanAmount:0,//借款金额
                investmentAmount:0,//投资金额
                pendingInterest:0,//待收本息
                principalCollected:0,//待收本金
                interestReceivable:0,//待收利息
                tenderTime:0,//投标时间
                repaymentTime:0,//还款时间
                status:0,//对付状态
            },

        ]
    },
    2:{
        label:'单标投资记录',
        method:'singleTenderList',
        labels:[
            {name:'id',value:'标的ID'},
            {name:'name',value:'标的名称'},
            {name:'apr',value:'基本利率'},
            {name:'awardApr',value:'加息利率'},
            {name:'awardMoney',value:'红包金额（元）'},
            {name:'createTime',value:'投标时间'},
            {name:'timeLimit',value:'期限'},
            {name:'money',value:'投资金额'},
            {name:'amount',value:'标的总额'},
            {name:'repaymentAccount',value:'应收总额'},
            {name:'repaymentPrincipal',value:'应收本金'},
            {name:'interest',value:'应收利息'},
            {name:'singleTenderStatus',value:'状态'},
            {name:'control',value:'操作'}

        ],
        items:[
            {
                id:1, //小标ID
                name:'中国银行', //小标名称
                deadline:0, //期限
                annualized:'0',//预期年化
                currentCardinalNum:0,//当前基数
                sumCardinalNum:0,//总基数
                loanAmount:0,//借款金额
                investmentAmount:0,//投资金额
                pendingInterest:0,//待收本息
                principalCollected:0,//待收本金
                interestReceivable:0,//待收利息
                rate:0,//加息利息
                rateAmount:0, //加息金额
                tenderTime:0,//投标时间
                repaymentTime:0,//还款时间
                status:0,//对付状态
            },{
                id:1, //小标ID
                name:'中国银行', //小标名称
                deadline:0, //期限
                annualized:'0',//预期年化
                rate:0,//加息利息
                currentCardinalNum:0,//当前基数
                sumCardinalNum:0,//总基数
                loanAmount:0,//借款金额
                investmentAmount:0,//投资金额
                pendingInterest:0,//待收本息
                principalCollected:0,//待收本金
                interestReceivable:0,//待收利息
                tenderTime:0,//投标时间
                repaymentTime:0,//还款时间
                status:0,//对付状态
            },{
                id:1, //小标ID
                name:'中国银行', //小标名称
                deadline:0, //期限
                annualized:'0',//预期年化
                rate:0,//加息利息
                currentCardinalNum:0,//当前基数
                sumCardinalNum:0,//总基数
                loanAmount:0,//借款金额
                investmentAmount:0,//投资金额
                pendingInterest:0,//待收本息
                principalCollected:0,//待收本金
                interestReceivable:0,//待收利息
                tenderTime:0,//投标时间
                repaymentTime:0,//还款时间
                status:0,//对付状态
            },

        ]
    },
    3:{
        label:'R计划待收记录',
        method:'rPlanCollectionList',
        labels:[
            {name:'bigBorrowId',value:'标的ID'},
            {name:'borrowName',value:'标的名称'},
            {name:'apr',value:'年化'},
            {name:'repaymentTime',value:'收款日期'},
            {name:'timeLimit',value:'期限'},
            {name:'nowPeriod',value:'当前期数'},
            {name:'totalPeriod',value:'总期数'},
            {name:'repaymentAmount',value:'收款总额'},
            {name:'capital',value:'应收本金'},
            {name:'interest',value:'应收利息'},
            {name:'rPlanCollectionStatus',value:'状态 '},
            {name:'control',value:'操作'}

        ],
        items:[
            {
                id:1, //小标ID
                name:'中国银行', //小标名称
                annualized:'0',//预期年化
                receiptDate:'2017-10-10',//收款日期
                deadline:0, //期限
                currentCardinalNum:0,//当前基数
                sumCardinalNum:0,//总基数
                receiptAmount:'111',// 收款总额
                receivablePrincipal:0,//应收本金
                receivableInterest:0,//应收本息
                status:0,//对付状态
            }

        ]
    },
    4:{
        label:'单标待收记录',
        method:'singleCollectionList',
        labels:[
            {name:'id',value:'标的ID'},
            {name:'borrowName',value:'标的名称'},
            {name:'apr',value:'年化'},
            {name:'raiseInterest',value:'加息'},
            {name:'repaymentTime',value:'收款日期'},
            {name:'timeLimit',value:'期限'},
            {name:'nowPeriod',value:'当前期数'},
            {name:'totalPeriod',value:'总期数'},
            {name:'repaymentAmount',value:'收款总额'},
            {name:'capital',value:'应收本金'},
            {name:'interest',value:'应收利息'},
            {name:'singleCollectionStatus',value:'状态'}
        ],
        items:[
            {
                id:1, //小标ID
                name:'中国银行', //小标名称
                deadline:0, //期限
                annualized:'0',//预期年化
                currentCardinalNum:0,//当前基数
                sumCardinalNum:0,//总基数
                loanAmount:0,//借款金额
                investmentAmount:0,//投资金额
                pendingInterest:0,//待收本息
                principalCollected:0,//待收本金
                interestReceivable:0,//待收利息
                rate:0,//加息利息
                rateAmount:0, //加息金额
                tenderTime:0,//投标时间
                repaymentTime:0,//还款时间
                status:0,//对付状态
            },{
                id:1, //小标ID
                name:'中国银行', //小标名称
                deadline:0, //期限
                annualized:'0',//预期年化
                rate:0,//加息利息
                currentCardinalNum:0,//当前基数
                sumCardinalNum:0,//总基数
                loanAmount:0,//借款金额
                investmentAmount:0,//投资金额
                pendingInterest:0,//待收本息
                principalCollected:0,//待收本金
                interestReceivable:0,//待收利息
                tenderTime:0,//投标时间
                repaymentTime:0,//还款时间
                status:0,//对付状态
            },{
                id:1, //小标ID
                name:'中国银行', //小标名称
                deadline:0, //期限
                annualized:'0',//预期年化
                rate:0,//加息利息
                currentCardinalNum:0,//当前基数
                sumCardinalNum:0,//总基数
                loanAmount:0,//借款金额
                investmentAmount:0,//投资金额
                pendingInterest:0,//待收本息
                principalCollected:0,//待收本金
                interestReceivable:0,//待收利息
                tenderTime:0,//投标时间
                repaymentTime:0,//还款时间
                status:0,//对付状态
            },

        ]
    },
    5:{
        label:'债权转让',
        method:'bondList',
        labels:[
            {name:'borrowId',value:'债权标ID'},
            {name:'bondName',value:'债权标的名称'},
            {name:'apr',value:'年化'},
            {name:'timeLimit',value:'期限'},
            {name:'surplusPeriod',value:'剩余期限'},
            {name:'bondMoney',value:'转让价格（元）'},
            {name:'soldCapital',value:'转让本金（元）'},
            {name:'bondType',value:'类型'},
            {name:'createTime',value:'转让时间'},
            {name:'UndertakingTime',value:'承接时间'},
            {name:'btUserName',value:'承接人'},
            {name:'bondStatus',value:'状态'}
        ],
        items:[
            {
                id:1, //小标ID
                name:'中国银行', //债权标的名称
                annualized:'0',//年化
                deadline:0, //期限
                remainingPeriod: 0, //剩余期限
                currentCardinalNum:0,//当前基数
                transferPrice:0, // 转让价格
                transferPrincipal:0, // 转让本金
                type: '', // 类型
                transferTime:'', // 转让时间
                takeUpTime: '', // 承接时间
                underTaker:'', // 承接人
                status: '',// 状态
            }
        ]
    },
    6:{
        label:'债权承接',
        method:'bondTender',
        labels:[
            {name:'bondId',value:'债权标ID'},
            {name:'bondName',value:'债权标名称'},
            {name:'bondMoney',value:'投资金额'},
            {name:'bondUserId',value:'原债权人'},
            {name:'bondUserMobile',value:'原债权人手机号码'},
            {name:'soldCapital',value:'代收本金'},
            {name:'bondTenderStatus',value:'状态'},
            {name:'bondApr',value:'年利率'},
            {name:'tenderMoney',value:'承接金额'},
            {name:'soldInterest',value:'待收利息'},
            {name:'bondTime',value:'债权发起时间'},
            {name:'bondEndTime',value:'承接时间'}
        ],
        items:[
            {
                id:1, // '债权ID'
                name:'',//'债权标名称'
                amount:0,   //'投资金额'
                originalCreditor:'',//'原债权人'
                originalCreditorTel:'',//'原债权人手机号码'
                collectionPrincipal:0,//'代收本金'
                status:'',//'状态'
                annualInterestRate:0,//'年利率'
                takeUpAmount:0,//'承接金额'
                collectionInterest:0,// '代收利息'
                debtInitiationTime:'',//'债权发起时间'
                takeUpTime:''//'承接时间'
            }
        ]
    },
    7:{
        label:'充值记录',
        method:'rechargeList',
        labels:[
            {name:'rechargeType',value:'类型'},
            {name:'terminal',value:'来源'},
            {name:'payment',value:'渠道'},
            {name:'money',value:'充值金额（元）'},
            {name:'createTime',value:'充值时间'},
            {name:'verifyTime',value:'审核时间'},
            {name:'revenueTime',value:'到账时间'},
            {name:'confirmTime',value:'确认时间'},
            {name:'rechargeStatus',value:'状态'}
        ],
        items:[
            {
            type:'',//类型
            source:'',//来源
            channel:'',//渠道
            rechargeAmount:'',//充值金额
            rechangeTime:'',//充值时间
            reviewTime:'',//审核时间
            arrivalTime:'',// 到账时间
            fonfirmTime:'',//确认时间
            status:''//状态
            }
        ]
    },
    8:{
        label:'提现记录',
        method:'cashList',
        labels:[
            {name:'bank',value:'提现银行'},
            {name:'bankNo',value:'提现账号'},
            {name:'money',value:'提现金额(元)'},
            {name:'fee',value:'手续费(元)'},
            {name:'credited',value:'到账金额(元)'},
            {name:'createTime',value:'提现时间'},
            {name:'verifyTime',value:'审核时间'},
            {name:'cashStatus',value:'状态'}
        ],
        items:[
            {
                withdrawBank:'',//'提现银行'
                withdrawAccount:'',// '提现账号'
                withdrawAmount:'',// '提现金额(元)'
                frees:'',//'手续费(元)'
                arrivalAmount:'',// '到账金额(元)'
                withdrawTime:'',//'提现时间'
                previewTime:'',// '审核时间'
                status:'' //'状态'
            }
        ]
    },
    9:{
        label:'红包列表',
        method:'redPkgList',
        labels:[
            {name:'name',value:'红包名称'},
            {name:'redPkgType',value:'红包类型'},
            {name:'amount',value:'红包金额（元）'},
            {name:'startTime',value:'开始时间'},
            {name:'endTime',value:'失效时间'},
            {name:'createTime',value:'获取时间'},
            {name:'activeTime',value:'激活时间'},
            {name:'useTime',value:'使用时间'},
            {name:'redPkgStatus',value:'使用状态'},
            {name:'useTimeLimit',value:'限制期限'},
            {name:'minInterval',value:'限制金额（元）'},
            {name:'borrowName',value:'标的名称'}
        ],
        items:[
            {
                redEnvelopeName:'',//红包名称
                redEnvelopeType:'',//红包类型
                redEnvelopeAmount:'',//红包金额
                startTime:'',//开始时间
                invalidTime:'',//失效时间
                getTime:'',//获取时间
                activeTimne:'',//激活时间
                useTime:'',//使用时间
                useStatus:'',//使用状态
                deadline:'',//限制期限
                limitAmount:'',//限制金额
                name:''//标的名称
            }
        ]
    },
    10:{
        label:'加息券列表',
        method:'raiseInterestPkgList',
        labels:[
            {name:'name',value:'加息券名称'},
            {name:'upApr',value:'利率'},
            {name:'useTimeLimit',value:'期限限制'},
            {name:'rateAmount',value:'加息金额(元)'},
            {name:'useDate',value:'加息天数'},
            {name:'startTime',value:'开始时间'},
            {name:'endTime',value:'失效时间'},
            {name:'createTime',value:'获取时间'},
            {name:'activeTime',value:'激活时间'},
            {name:'useTime',value:'使用时间'},
            {name:'raiseInterestPkgStatus',value:'状态'}
        ],
        items:[
            {
                increaseCoupon:'',// 加息券名称
                rate:0,// 利率
                deadLine:'',// 期限限制
                increaseAmount:'',// 加息金额(元)
                increaseDays:'',// 加息天数
                startTime:'',// 开始时间
                invalidTime:'',// 失效时间
                getTime:'',// 获取时间
                activeTimne:'',// 激活时间
                useTime:'',// 使用时间
                status:''// 状态
            }
        ]
    },
    11:{
        label:'奖励记录',
        method:'awardList',
        labels:[
            {name:'remark',value:'奖励名称'},
            {name:'money',value:'奖励金额（元）'},
            {name:'typeName',value:'类型'},
            {name:'creatDate',value:'发放日期'}
        ],
        items:[
            {
               rewardName:'',// 奖励名称
               rewardAmount:'',// 奖励金额（元）
               type:'',// 类型
               issueDate:''// 发放日期
            }
        ]
    },
    12:{
        label:'登录日志',
        method:'loginList',
        labels:[
            {name:'loginIp',value:'ip'},
            {name:'source',value:'终端类型'},
            {name:'loginTime',value:'发生时间'},
        ],
        items:[
            {
               ip:'',// ip
               terminalType:'',// 终端类型
               time:'',// 发生时间
               logContent:''// 日志内容
            }
        ]
    },
    13:{
        label:'维护记录',
        method:'communicationList',
        labels:[
            {name:'createTime',value:'维护时间'},
            {name:'communicationType',value:'维护方式'},
            {name:'communicationResult',value:'沟通内容'}
        ],
        items:[
            {
               maintainTime:'',// 维护时间
               maintainWays:'',// 维护方式
               communication:''// 沟通内容
            }
        ]
    },
}

export {data};
