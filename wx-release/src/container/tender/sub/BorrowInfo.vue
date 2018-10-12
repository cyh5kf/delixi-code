<template>
    <div class="wrap">
        <Scroll :getInitData="getInitData"
                :getPos="getPos"
                :loadOver="loadOver"
                v-show="recordList.length">
            <ul>
                <li class="borrowCard" v-for="(cardData ,i) in recordList" :key="i">
                    <div v-if="cardData.type!=1">
                        <div class="row">
                            <h5>姓名</h5>
                            <p v-text="cardData.name||emptyTxt"></p>
                        </div>
                        <div class="row">
                            <h5>身份证</h5>
                            <p v-text="cardData.cardId||emptyTxt"></p>
                        </div>
                        <div class="row">
                            <h5>手机号</h5>
                            <p v-text="cardData.mobile||emptyTxt"></p>
                        </div>
                        <div class="row">
                            <h5>借款用途</h5>
                            <p v-text="cardData.purposeLoan||emptyTxt"></p>
                        </div>
                        <div class="row">
                            <h5>借款金额（元）</h5>
                            <p v-text="cardData.borroAmount||emptyTxt"></p>
                        </div>
                        <div class="row">
                            <h5>借款人详情</h5>
                            <p class="lookDetail" @click="lookDetail(cardData)">查看详情</p>
                        </div>
                    </div>
                    <div v-if="cardData.type==1">
                        <div class="row">
                            <h5>全称或简称</h5>
                            <p v-text="cardData.companyName||emptyTxt"></p>
                        </div>
                        <div class="row">
                            <h5>所属行业</h5>
                            <p v-text="cardData.industry||emptyTxt"></p>
                        </div>
                        <div class="row">
                            <h5>注册资本</h5>
                            <p v-text="cardData.regCapital||emptyTxt"></p>
                        </div>
                        <div class="row">
                            <h5>注册地址</h5>
                            <p v-text="cardData.regAddress||emptyTxt"></p>
                        </div>
                        <div class="row">
                            <h5>成立时间</h5>
                            <p v-text="cardData.companyCreateTime||emptyTxt"></p>
                        </div>
                        <div class="row">
                            <h5>法定代表人</h5>
                            <p v-text="cardData.frdbName||emptyTxt"></p>
                        </div>
                        <div class="row">
                            <h5>借款用途</h5>
                            <p v-text="cardData.purposeLoan||emptyTxt"></p>
                        </div>
                        <div class="row">
                            <h5>借款金额</h5>
                            <p v-text="cardData.borroAmount||emptyTxt"></p>
                        </div>
                        <div class="row">
                            <h5>借款人详情</h5>
                            <p class="lookDetail" @click="lookDetail(cardData)">查看详情</p>
                        </div>
                    </div>
                </li>
            </ul>
        </Scroll>
        <!-- 借款人信息详情弹窗 -->
        <Toast :show="showDetailDialog" class="progressToast" :onlyslot="true" :cancelText='"关闭"' :cancelType='"red"'
            v-on:msg="changeToastFromChild">
            <div class="borrowPersonDetailCard" ref="dialog">
                <span class="close" @click="changeToastFromChild(false)"></span>
                <h5 v-if="cardData && cardData.type!=1">借款人信息</h5>
                <h5 v-if="cardData && cardData.type==1">企业借款人信息</h5>
                <table v-if="cardData && cardData.type!=1">
                    <tr>
                        <td>资金运用情况</td>
                        <td v-text="cardData.applicationAmount||emptyTxt"></td>
                    </tr>
                    <tr>
                        <td>在平台逾期次数</td>
                        <td v-text="cardData.overdueCount||0"></td>
                    </tr>
                    <tr>
                        <td>在平台逾期金额</td>
                        <td v-text="cardData.overdueAmount||0"></td>
                    </tr>
                    <tr>
                        <td>其他借款信息</td>
                        <td v-text="cardData.otherInfo||'无'"></td>
                    </tr>
                    <tr>
                        <td>涉诉情况</td>
                        <td v-text="cardData.prosecute||'无'"></td>
                    </tr>
                    <tr>
                        <td>行政处罚情况</td>
                        <td v-text="cardData.punishments||'无'"></td>
                    </tr>
                    <tr>
                        <td>还款来源</td>
                        <td v-text="type==1?'融资方自有资金还款或核心企业/融资方法人提供无限连带担保责任':'个人收入'"></td>
                    </tr>
                    <tr>
                        <td>还款保障措施 </td>
                        <td v-text="type==1?'核心企业/融资方法人提供无限连带担保责任':'信用借款无担保'"></td>
                    </tr>
                    <tr>
                        <td>借款人征信报告情况</td>
                        <td v-text="'无报告'"></td>
                    </tr>
                </table>
                <table v-if="cardData && cardData.type==1">
                    <tr>
                        <td>资金运用情况</td>
                        <td v-text="cardData.applicationAmount||emptyTxt"></td>
                    </tr>
                    <tr>
                        <td>经营状况及财务状况</td>
                        <td v-text="cardData.financial||emptyTxt"></td>
                    </tr>
                    <tr>
                        <td>在平台逾期次数</td>
                        <td v-text="cardData.overdueCount||0"></td>
                    </tr>
                    <tr>
                        <td>在平台逾期金额</td>
                        <td v-text="cardData.overdueAmount||0"></td>
                    </tr>
                    <tr>
                        <td>其他借款信息</td>
                        <td v-text="cardData.otherInfo||'无'"></td>
                    </tr>
                    <tr>
                        <td>股东信息</td>
                        <td v-text="cardData.shareholder||emptyTxt"></td>
                    </tr>
                    <tr>
                        <td>法定代表人信用信息</td>
                        <td v-text="cardData.credit||emptyTxt"></td>
                    </tr>
                    <tr>
                        <td>实缴资本</td>
                        <td v-text="cardData.contributed||emptyTxt"></td>
                    </tr>
                    <tr>
                        <td>办公地点</td>
                        <td v-text="cardData.officeLocation||emptyTxt"></td>
                    </tr>
                    <tr>
                        <td>经营区域</td>
                        <td v-text="cardData.manageDistrict||emptyTxt"></td>
                    </tr>
                    <tr>
                        <td>涉诉情况</td>
                        <td v-text="cardData.prosecute||'无'"></td>
                    </tr>
                    <tr>
                        <td>行政处罚情况</td>
                        <td v-text="cardData.punishments||'无'"></td>
                    </tr>
                    <tr>
                        <td>还款来源</td>
                        <td v-text="type==1?'融资方自有资金还款或核心企业/融资方法人提供无限连带担保责任':'个人收入'"></td>
                    </tr>
                    <tr>
                        <td>还款保障措施 </td>
                        <td v-text="type==1?'核心企业/融资方法人提供无限连带担保责任':'信用借款无担保'"></td>
                    </tr>
                    <tr>
                        <td>借款人征信报告情况</td>
                        <td v-text="'无报告'"></td>
                    </tr>
                </table>
            </div>
        </Toast>
    </div>
</template>
<script>
    import API from '@/api'
    import BorrowPersonInfoCard from '@/component/BorrowPersonInfoCard'
    import getParam from '@/lib/getParam'
    import Scroll from '@/component/Scroll'
    import VDialog from '@/component/Dialog'
    import Toast from '@/component/Toast'

    export default {
        name: 'BorrowPersonInfo',
        data(){
            return {
                recordList: [],
                loadOver: false,
                numPerPage: 5,
                pageNum: 1,
                emptyTxt: '--',//空字段的默认显示
                cardData: {},
                type:0,
                showDetailDialog: false, // 显示隐藏借款信息详情弹窗
            }
        },
        props: ['bid', 'productType', 'getPos'],
        methods: {
            async getInitData(flag){
                if (flag) {
                    this.pageNum = 1
                } else {
                    this.pageNum++
                }
                const param = {
                    productType: getParam(window.location.href, 'productType') || this.productType,
                    bid: getParam(window.location.href, 'bid') || this.bid,
                    numPerPage: this.numPerPage,
                    pageNum: this.pageNum
                }
               this.type=getParam(window.location.href, 'productType') || this.productType
                const data = await API.post(API.borrowPersonInfo, param)
                if (data.recordList && data.recordList.length > 0) {
                    if (flag) {
                        this.recordList = data.recordList
                    } else {
                        this.recordList = this.recordList.concat(data.recordList)
                    }
                } else {
                    this.loadOver = true
                }
            },
            lookDetail(cardData){
                this.cardData = cardData
                this.changeToastFromChild(true);
            },
            changeToastFromChild(val){
                this.showDetailDialog = val;
            },
            getParam (url, name){
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
                var r = (url.split("?")[1] || ' ').match(reg);  //匹配目标参数
                if (r != null) return unescape(r[2]);
                return null; //返回参数值
            }
        },
        mounted() {
            this.$refs.dialog.ontouchstart = (e) => {
                e.stopPropagation()
            }
            this.$refs.dialog.ontouchmove = (e) => {
                e.stopPropagation()
            }
        },
        components: {
            BorrowPersonInfoCard,
            Scroll,
            VDialog,
            Toast,
        }
    }
</script>
<style lang="scss" scoped>
    .wrap {
        @include position((p:absolute, t:0, b:0, r:0, l:0));
        ul {
            padding-bottom: 2rem;
        }
    }

    .borrowCard {
        @include box((m:0 0 0.3rem 0, bg:$white, p:0.4rem 0 0.38rem 0));
        .row {
            padding: 0 0.4rem 0.28rem;
            display: flex;
            justify-content: space-between;
            &:last-child {
                padding-bottom: 0;
            }
            h5 {
                @include box((fs:0.24rem, lh:0.34rem, c:$black9));
                font-weight: normal;
            }
            p {
                @include box((c:$black5, fs:0.24rem))
            }
            .lookDetail {
                @include box((c:$blue));
            }
        }
    }

    .borrowPersonDetailCard {
        @include box((h:6rem));
        background: #fff;
        overflow-y: scroll;
        table, td {
            border: none;
        }
        .close {
            @include box((d:block, w:0.34rem, h:0.34rem));
            @include position((p:absolute, t:0.35rem, l:0.3rem));
            @include bg_img('icon_close.png');
        }
        h5 {
            @include box((ta:center, fs:0.32rem, c:$black2, lh:0.46rem, p:0.35rem 0.2rem));
            font-weight: normal;
            border-bottom: 1px solid #e5e5e5;
        }
        table {
            @include box((d: block, w:100%, p: 0.2rem 0.74rem 0.5rem 0.74rem));
            tr {
                display: block;
                @include box((h: 0.8rem, lh:0.8rem));
                border-bottom: 1px solid #e5e5e5;
                overflow: hidden;
                td:first-child {
                    float: left;
                    padding-left: 0.56rem;
                    font-size: 0.24rem;
                    color: $black9;
                    width: 50%;
                    text-align: left;
                }
                td:last-child {
                    float: right;
                    padding-right: 0.56rem;
                    font-size: 0.24rem;
                    color: $black5;
                    width: 50%;
                    text-align: right;
                    margin: 0.2rem 0;
                    line-height: 0.36rem;
                }
            }
        }
    }
</style>
