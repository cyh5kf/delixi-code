<template>
    <div class='wraper'>
        <TabNav :navs='navs' :index="navInd" :click="clickNavItem"/>
        <div class="no_lists" v-if="!dataLists.length">
            <div :class="'empty'+navInd"></div>
            <p v-text="emptyTxt[navInd]"></p>
            <router-link class="jump_tender" to="/tender">马上投资</router-link>
        </div>

        <div class="wrap dataLists" ref="bs0" v-show="dataLists.length">
            <div ref="wrap0" class="container" up="下拉刷新" down="上拉加载">
                <ul class="listWraper tenderUl" ref="listWraper">
                    <li v-for="(item,i) in dataLists" :key="i" >
                        <div class='header' @click="lookProgress(item)">
                            <h3>
                                <label v-text="item.name" :class="nameClass(item)">众车宝****</label>
                                <span class="statusText" :class="statusClass(item)"
                                      v-text="statusTxt(item)">募集中***</span>
                            </h3>
                            <p v-text="item.createTime">2017-00-00 00:00:00</p>
                        </div>
                        <div class='body' @click="lookProgress(item)">
                            <!--1投资成功:募集中， -->
                            <template v-if="item.status==1">
                                <p><label>投资金额</label><span v-text="moneyToString(item.money)">00000.00</span></p>
                                <p><label>预期年化</label><span v-text="item.apr">00.00</span></p>
                                <p><label>投资期限</label><span v-text="touziQiXian(item)">0个月/0天</span></p>
                            </template>
                            <!--2回款中， 6 待成标 也代表 还款中 -->
                            <template v-if="item.status==2 || item.status==6 ||item.status==10 || item.status==3">
                                <p><label>投资金额</label><span v-text="moneyToString(item.money)">000.00</span></p>
                                <p><label>预期年化</label><span v-text="item.apr">00.00</span></p>
                                <p><label>到期时间</label><span v-text="item.repaymentTime">2017-00-00</span></p>
                                <p><label>当前收益</label><span v-text="moneyToString(item.currentInterest)">00.00</span></p>
                                <p><label>预期收益</label><span v-text="moneyToString(item.expectInterest)+addInterest(item)">00.00</span></p>
                            </template>

                            <!-- 4已转让， 转让的项目已经挪至我的转让列表-->
                            <template v-if="item.status==4">
                                <p><label>投资金额</label><span v-text="moneyToString(item.money)">00000.00</span></p>
                                <p><label>转让金额</label><span v-text="">00.00</span></p>
                                <p><label>转让时间</label><span>2017-00-00</span></p>
                            </template>
                            <!--5已完结 已回款，-->
                            <template v-if="item.status==5 || item.status==8">
                                <p><label>投资金额</label><span v-text="moneyToString(item.money)">00000.00</span></p>
                                <p><label>预期年化</label><span v-text="item.apr">00.00</span></p>
                                <p><label>到期时间</label><span v-text="item.repaymentTime">2017-00-00</span></p>
                                <p><label>到期本息</label><span v-text="moneyToString(item.waitAmount)">00.00</span></p>
                            </template>
                            <!--9投资失败/流标  -->
                            <template v-if="item.status==9">
                                <p><label>投资金额</label><span v-text="moneyToString(item.money)">00000.00</span></p>
                                <p><label>回款本息</label><span v-text="moneyToString(item.money)">00.00</span></p>
                                <p v-if=""><label>回款时间</label><span v-text="item.returnedTime">2017-00-00</span></p>
                            </template>
                        </div>
                        <div class="footer">
                            <!--特定标的会显示标的详情按钮-->
                            <!--非募集中的-->
                            <template v-if="item.status!=1">
                                <router-link  tag="span" class="btn"
                                              :to="'/my/rChildTenderDetail/'+item.tenderId+'?productType='+item.productType">标的详情</router-link>
                                <span class="btn" @click.stop="lookProtocol(item)">合同协议</span>
                            </template>
                            <!--募集中 category这个参数已经没用了 -->
                            <template v-if="item.status==1">
                                <router-link tag="span"
                                             class="btn"
                                             :to="'/tender/detail/'+item.bigBorrowId+'/'+item.productType+'/3'"
                                >标的信息
                                </router-link>
                            </template>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <Toast :show="showProgressToast" class="progressToast" :onlyslot="true" :cancelText='"关闭"' :cancelType='"red"'
               v-on:msg="changeToastFromChild">
            <h5><span class="close" @click="closeProgressToast"></span>标的进度</h5>
            <div class="ProgressContent">
                <VProgress :listData="progressDetail"
                           :from="'myTenterLists'"
                           :onClickDetail="onClickDetail"/>
            </div>
        </Toast>

        <Toast :show="showSubDetailToast" class="subDetailToast" :onlyslot="true" v-on:msg="changeDetailToastFromChild">
            <h5><span class="back" @click="backToProgressToast"></span>还款详情</h5>
            <div class="subDetailContent">
                <table>
                    <thead>
                    <tr>
                        <th>投资子标的</th>
                        <th>还款金额</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,i) in progressStepData.borrowRateOfProgressDto" :key="i" >
                        <td v-text="item.borrowName">****</td>
                        <td v-text="item.repaymentYesAmount">0,000,0</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </Toast>

        <Toast :show="showProtocol" :cancelText='"取消"' v-on:msg="changeProtocolFromChild">
            <div class="protocolContent">
                <div class="content">
                    <router-link v-for="(protocol,i) in activeTender.protocolDtos"
                                 v-text="protocolName(protocol.name)"
                                 tag="p"
                                 :key="i"
                                 :to="protocolUrl(protocol)"
                    >R计划服务协议书</router-link>
                </div>
            </div>
        </Toast>
    </div>
</template>
<script>
    import TabNav from '@/component/TabNav'
    import Toast from '@/component/Toast'
    import VProgress from '@/component/Progress'
    import BScroll from 'better-scroll'
    import API from '@/api'

    export default {
        name: 'TenderLists',
        data(){
            return {
                navs: [
                    {text: '全部'},
                    {text: '募集中'},
                    {text: '回款中'},
                    {text: '已回款'},
                ],
                navInd: 0,
                numPerPage: 15,
                isLoading: false,//正在加载
                emptyTxt: {//空态的文本
                    0: '期待你与人众金服的“第一次”',
                    1: '标的集结号已经吹响，正在呼唤你来赚钱',
                    2: '暂时没有回款，但有很多机会！',
                    3: '千里之行始于足下，万贯之财起于投资'
                },
                0: {//全部
                    pageNum: 0,
                    totalPage: 0,
                    hasLoadOnce: false,//是否请求过
                    lists: []
                },
                1: {//募集中
                    pageNum: 0,
                    totalPage: 0,
                    hasLoadOnce: false,
                    lists: []
                },
                2: {//回款中
                    pageNum: 0,
                    totalPage: 0,
                    hasLoadOnce: false,
                    lists: []
                },
                3: {//已回款
                    pageNum: 0,
                    totalPage: 0,
                    hasLoadOnce: false,
                    lists: []
                },
                showProgressToast: false,
                showSubDetailToast: false,//显示还款详情
                showProtocol: false,
                progressDetail: [],
                progressStepData:[],//点击的激活的进度数据
                activeTender:{},//被点击的标列表
            }
        },
        created(){//status

        },
        async mounted() {
            await this.loadData()
            this.$nextTick(() => {
                this.createScroll()
            })
            const bs = this.$refs.bs0
            const listWraper = this.$refs.listWraper
            listWraper.style.minHeight = bs.getBoundingClientRect().height + 'px'
        },
        methods: {
            protocolName(name){
                if(name.search('借款协议-')==0){
                    return '借款协议'
                }else{
                    return name
                }
            },
            clickNavItem(i){
                if (this.navInd != i) {
                    this.$data.navInd = i
                    if (this[i].lists.length == 0) {
                        this.loadData()//加载初始化列表
                    }
                    if (this.scroll) {
                        this.$nextTick(() => {
                            this.scroll.scrollTo(0, 0)
                            this.scroll.refresh()
                        })
                    }
                    const wrap = this.$refs.wrap0
                    const {pageNum, totalPage} = this[this.navInd]
                    if (pageNum >= totalPage && pageNum) {
                        wrap.setAttribute('down', '已全部加载')
                    } else {
                        wrap.setAttribute('down', '下拉加载')
                    }
                }
            },
            protocolUrl(protocol){
                const {
                    activeTender
                }=this.$data

                return `/my/protocol?protocolId=${protocol.id}&tenderId=${activeTender.tenderId}&productType=${activeTender.productType}&nid=${protocol.nid}&isBig=${activeTender.bigBorrowId?1:0}`
            },
            closeProgressToast(){
                this.showProgressToast = false
            },
            async lookProgress(item){//查看投资进度详情
                const {
                    tenderId,
                    productType
                }=item
                const detailParam = {
                    tenderId,//投资记录id
                    productType,
                }
                if(productType==2 || productType==3){
                    detailParam.borrowBigId=item.bigBorrowId  //大标ID， productType 为2和3的时候传入
                }

                this.progressDetail = []
                let progressData = await API.post(API.myTenderDetail, detailParam)
                this.progressDetail = progressData.investFlowList || []
                this.showProgressToast = true
            },
            backToProgressToast(){
                this.showSubDetailToast = false
                this.showProgressToast = true
            },
            onClickDetail(progressStepData){
                this.showProgressToast = false
                this.showSubDetailToast = true
                this.progressStepData=progressStepData
            },
            lookProtocol(activeTender){//查看协议
                this.showProtocol = true
                this.$data.activeTender=activeTender
            },
            changeToastFromChild(val){
                this.showProgressToast = val
            },
            changeProtocolFromChild(val){
                this.showProtocol = val
            },
            changeDetailToastFromChild(val){
                this.showSubDetailToast = val
            },
            nameClass(item){
                let config = {
                    8:'black9',//只有已回款是灰色的
                }
                return config[item.status]||''
            },
            statusTxt(item){// 1已撤回;0等待初审;1初审通过;2初审未通过;3复审通过;4/49复审未通过;5/59用户取消、废标;6还款中;7部分还款;8还款成功；10上线
                //10 募集中 3 6 7 回款中 8 已还款
                let config = {
                    1:'募集中',
                    2:'回款中',
                    3:'回款中',
                    5:'已回款',
                    6:'回款中',
                    7:'回款中',
                    8:'已回款',
                    10:'回款中'
                }
                return config[item.status]||''
            },
            statusClass(item){
                let config = {
                    8:'black9',
                    1:'fc-green',
                }
                return config[item.status]||''
            },
            moneyToString(money){//转化为金融数字
                return (money * 1).toLocaleString()
            },
            touziQiXian(item){//投资期限
                const {
                    borrowTimeType,//0月标 1天标
                    timeLimit
                } = item
                return borrowTimeType == 0 ? `${timeLimit}个月` : `${timeLimit}天`
            },
            addInterest(item){//加息收益
                const {
                    awardType,//0红包 1加息券
                    awardMoney
                }=item

                return (awardType==1 && awardMoney && awardMoney*1 &&`(含加息收益${awardMoney})`)||''
            },
            createScroll(){
                const bs = this.$refs.bs0
                const scroll = this.scroll = new BScroll(bs, {
                    click: true,
                    preventDefault: true
                })

                const wrap = this.$refs.wrap0
                let diff = bs.getBoundingClientRect().height - wrap.getBoundingClientRect().height
                scroll.on('touchend', async (pos) => {
                    diff = bs.getBoundingClientRect().height - wrap.getBoundingClientRect().height
                    if (pos.y > 50) {
                        wrap.setAttribute('up', '刷新中')

                        this[this.navInd].pageNum = 0
                        setTimeout(async () => {
                            scroll.scrollTo(0, 50)
                            this[this.navInd].lists = []
                            await this.loadData()
                            wrap.setAttribute('down', '下拉加载')
                            scroll.scrollTo(0, 0)
                        }, 100)
                    }
                    if (diff - pos.y > 50) {
                        if (this[this.navInd].pageNum < this[this.navInd].totalPage && !this.isLoading) {
                            await this.loadData()
                            this.$nextTick(() => {
                                scroll.refresh()
                                diff = bs.getBoundingClientRect().height - wrap.getBoundingClientRect().height
                            })
                        } else {
                            wrap.setAttribute('down', '已全部加载')
                        }
                    }
                })
            },
            async loadData(){
                const {
                    navInd,
                    numPerPage
                } = this.$data

                let {
                    pageNum
                } = this.$data[navInd]

                //索引为0的时候不用传status字段
                //1.募集中 2回款中 5已回款 4已转让，不传
                const statusConf =[undefined,1,2,5] //status 1.投资中或募集中 2回款中 5已回款 4已转让
                const param = {
                    pageNum: pageNum + 1,
                    numPerPage
                }
                if (navInd != 0) {
                    param.status = statusConf[navInd]
                }
                this.$data.isLoading = true
                let obj = await API.post(API.myRTender, param)
                this.$data[navInd].hasLoadOnce = true//数据被加载过
                this.$data.isLoading = false

                this[navInd].lists =this[navInd].lists.concat(obj.recordList || [])
                this[navInd].totalPage = obj.totalPage || 0
                this[navInd].pageNum = obj.currentPage || 0

                this.$nextTick(() => {
                    this.scroll && this.scroll.refresh()
                })
            }
        },
        computed: {
            dataLists(){
                return this[this.navInd].lists
            },
            hasLoadOnce(){
                return this[this.navInd].hasLoadOnce
            }
        },
        components: {
            TabNav,
            Toast,
            VProgress
        }
    }
</script>
<style lang="scss" scoped>
    $green: #8CBE37;
    .wraper {
        background-color: #F6F6F6;
        padding-bottom: 1.3rem;
    }

    .fc-green {
        color: $green;
    }

    .no_lists {
        @include box((p:2.6rem 0 0 0, m:0 auto));
        div {
            @include box((w:2.4rem, h:2.4rem, m:0 auto));
            &.empty0 {
                @include bg_img('my/no_my_tender_all.png')
            }
            &.empty1 {
                @include bg_img('my/no_my_tender_muji.png')
            }
            &.empty2 {
                @include bg_img('my/no_my_tender_huikuan.png')
            }
            &.empty3 {
                @include bg_img('my/no_my_tender_yi_huikuan.png')
            }
        }
        p {
            @include box((fs:0.28rem, lh:0.4rem, ta:center, c:$black9))
        }
    }

    .jump_tender {
        @include box((d:block, w:3rem, h:0.88rem, lh:0.88rem, ta:center, fs:0.36rem, c:$red, bdr:0.44rem, m:0.9rem auto));
        @include thin(all, $red);
    }

    .wrap {
        overflow: hidden;
        @include position((p:absolute, l:0, r:0, b:0, t:0.88rem));
        .container {
            position: relative;
            $beforeAfterH: 0.5rem;
            &:before {
                content: attr(up);
                @include position((p:absolute, l:0, t:- 0.7rem, z:10));
                @include box((w:100%, h:$beforeAfterH, ta:center, lh:$beforeAfterH))
            }
            &:after {
                content: attr(down);
                @include box((d:block, w:100%, h:$beforeAfterH, ta:center, lh:$beforeAfterH));
                position: absolute;
            }
        }
    }

    .tenderUl {
        padding: 0.2rem 0 0.2rem;
        li {
            background-color: #fff;
            &:not(:first-child) {
                margin-top: 0.2rem;
            }
            @include box((p:0.32rem 0 0 0.3rem));
            .header {
                @include box((p:0 0.26rem 0.2rem 0));
                h3 {
                    @include box((lh:0.42rem, fs:0.3rem, d:flex));
                    font-weight: normal;
                    .statusText {
                        flex: 1;
                        @include box((ta:right, fs:0.28rem));
                    }
                }
                p {
                    @include box((lh:0.37rem, fs:0.26rem, c:#999));
                }
            }
            .body {
                @include box((p:0.05rem 0.25rem 0.1rem 0));
                @include thin(top, #E5E5E5);
                p {
                    @include box((lh:0.37rem, fs:0.26rem, d:flex, m:0.05rem 0));
                    label {
                        @include box((c:#999));
                    }
                    span {
                        flex: 1;
                        @include box((ta:right));
                    }
                }
            }
            .footer {
                @include box((p:0.2rem 0.26rem 0.2rem, ta:right));
                border-top: 0.01rem solid #E5E5E5;
                .btn {
                    @include box((d:inline-block, lh:0.48rem, br:1px solid $blue, bdr:0.08rem, c:#4992EC, p:0 0.24rem, m:0 0 0 0.3rem, fs:0.28rem));
                }
            }
        }
    }

    ._title {
        @include box((bg:$white));
        h5 {
            @include box((lh:1rem, ta:center, fs:0.32rem, c:$black2, bg:$white));
            font-weight: normal;
            @include thin(bottom, #e5e5e5);
            position: relative;
            span {
                @include box((d:block, w:0.34rem, h:0.34rem));
                @include position((p:absolute, t:0.35rem, l:0.35rem));
                &.close {
                    @include bg_img('icon_close.png');
                }
                &.back {
                    @include box((d:block, w:0.44rem, h:0.44rem));
                    @include bg_img('icon_arrow_to_left.png');
                    @include position((p:absolute, t:0.3rem, l:0.3rem));
                }
            }

        }
    }

    .progressToast {
        @extend ._title;
    }

    .ProgressContent {
        $contentMinH: 4rem;
        @include box((bg:#fff, p:0.45rem 0 0 0));
        min-height: $contentMinH;
        max-height: 6.4rem;
        overflow-y: auto;
    }

    .subDetailToast {
        @extend ._title;
        .subDetailContent {
            @include box((bg:$white, h:4rem,p:0 0.6rem));
            overflow-y: auto;
            table {
                width: 100%;
                border-collapse: collapse;
                border:0;
                tr {
                    @include box((lh:1rem));
                    @include thin(bottom, #e5e5e5);
                    @include box((ta:center));
                }
                td,th{
                    border:0;
                    @include box((p:0 0.6rem));
                    &:first-child{
                        @include box((ta:left));
                    }
                    &:last-child{
                        @include box((ta:right));
                    }
                }
            }
        }
    }

    .protocolContent {
        @include box((bg:#E5E5E5, p:0 0 0.12rem 0));
        p {
            @include box((lh:1rem, ta:center, fs:0.36rem, c:$black2, bg:$white));
        }
    }
</style>


