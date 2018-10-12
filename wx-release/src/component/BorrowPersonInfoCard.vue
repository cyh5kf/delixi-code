<template>
    <li class="borrowCard" >
        <div v-if="cardData.type!=1">
            <div class="row">
                <div>
                    <h5>姓名</h5>
                    <p v-text="cardData.name||emptyTxt"></p>
                </div>
                <div>
                    <h5>身份证</h5>
                    <p v-text="cardData.cardId||emptyTxt"></p>
                </div>
                <div>
                    <h5>手机号</h5>
                    <p v-text="cardData.mobile||emptyTxt"></p>
                </div>
            </div>
            <div class="row">
                <div>
                    <h5>借款用途</h5>
                    <p v-text="cardData.purposeLoan||emptyTxt"></p>
                </div>
                <div>
                    <h5>借款金额（元）</h5>
                    <p v-text="cardData.borroAmount||emptyTxt"></p>
                </div>
                <div>
                    <h5>借款人详情</h5>
                    <p class="lookDetail" @click="lookDetail">查看详情</p>
                </div>
            </div>
        </div>
        <div v-if="cardData.type==1">
            <div class="row">
                <div>
                    <h5>全称或简称</h5>
                    <p v-text="cardData.companyName||emptyTxt"></p>
                </div>
                <div>
                    <h5>所属行业</h5>
                    <p v-text="cardData.industry||emptyTxt"></p>
                </div>
                <div>
                    <h5>注册资本</h5>
                    <p v-text="cardData.regCapital||emptyTxt"></p>
                </div>
            </div>
            <div class="row">
                <div>
                    <h5>注册地址</h5>
                    <p v-text="cardData.regAddress||emptyTxt"></p>
                </div>
                <div>
                    <h5>成立时间</h5>
                    <p v-text="cardData.companyCreateTime||emptyTxt"></p>
                </div>
                <div>
                    <h5>法定代表人</h5>
                    <p v-text="cardData.frdbName||emptyTxt"></p>
                </div>
            </div>
            <div class="row">
                <div>
                    <h5>借款用途</h5>
                    <p v-text="cardData.purposeLoan||emptyTxt"></p>
                </div>
                <div>
                    <h5>借款金额</h5>
                    <p v-text="cardData.borroAmount||emptyTxt"></p>
                </div>
                <div>
                    <h5>借款人详情</h5>
                    <p class="lookDetail" @click="lookDetail">查看详情</p>
                </div>
            </div>
        </div>

        <VDialog :show="showDetailDialog"
                 :close="closeDetailDialog"
                 :disableCloseBtn="true"
        >
            <div class="borrowPersonDetailCard" ref="dialog">
                <h5 v-if="cardData && cardData.type!=1">借款人信息</h5>
                <h5 v-if="cardData && cardData.type==1">企业借款人信息</h5>
                <table>
                    <tbody v-if="cardData && cardData.type!=1">
                    <tr><td>资金运用情况</td><td v-text="cardData.applicationAmount||emptyTxt"></td></tr>
                    <tr><td>在平台逾期次数</td><td v-text="cardData.overdueCount||0"></td></tr>
                    <tr><td>在平台逾期金额</td><td v-text="cardData.overdueAmount||0"></td></tr>
                    <tr><td>其他借款信息</td><td v-text="cardData.otherInfo||'无'"></td></tr>
                    <tr><td>涉诉情况</td><td v-text="cardData.prosecute||'无'"></td></tr>
                    <tr><td>行政处罚情况</td><td v-text="cardData.punishments||'无'"></td></tr>
                    </tbody>
                    <tbody v-if="cardData && cardData.type==1">
                    <tr><td>资金运用情况</td><td v-text="cardData.applicationAmount||emptyTxt"></td></tr>
                    <tr><td>经营状况及财务状况</td><td v-text="cardData.financial||emptyTxt"></td></tr>
                    <tr><td>在平台逾期次数</td><td v-text="cardData.overdueCount||0"></td></tr>
                    <tr><td>在平台逾期金额</td><td v-text="cardData.overdueAmount||0"></td></tr>
                    <tr><td>其他借款信息</td><td v-text="cardData.otherInfo||'无'"></td></tr>
                    <tr><td>股东信息</td><td v-text="cardData.shareholder||emptyTxt"></td></tr>
                    <tr><td>法定代表人信用信息</td><td v-text="cardData.credit||emptyTxt"></td></tr>
                    <tr><td>实缴资本</td><td v-text="cardData.contributed||emptyTxt"></td></tr>
                    <tr><td>办公地点</td><td v-text="cardData.officeLocation||emptyTxt"></td></tr>
                    <tr><td>经营区域</td><td v-text="cardData.manageDistrict||emptyTxt"></td></tr>
                    <tr><td>涉诉情况</td><td v-text="cardData.prosecute||'无'"></td></tr>
                    <tr><td>行政处罚情况</td><td v-text="cardData.punishments||'无'"></td></tr>
                    </tbody>
                </table>
            </div>
        </VDialog>
    </li>
</template>
<script>
    import VDialog from '@/component/Dialog'

    export default {
        name: 'BorrowPersonInfoCard',
        data(){
            return {
                showDetailDialog:false,//显示弹框详情
                emptyTxt:'--',//空字段的默认显示
            }
        },
        methods: {
            lookDetail(){
                this.showDetailDialog=true
            },
            closeDetailDialog(){
                this.showDetailDialog=false
            }
        },
        mounted() {
            this.$refs.dialog.ontouchstart = (e)=> {
                e.stopPropagation()
            }
        },
        props:['cardData'],
        components:{
            VDialog
        }
    }
</script>
<style lang="scss" scoped>
    .borrowCard{
        @include box((m:0 0 0.3rem 0,bg:$white,p:0.3rem 0 0 0));
        .row{
            @include box((d:flex,ta:center,p:0.15rem 0));
            >div{
                @include box((p:0 0.2rem,lh:0.3rem));
                flex:1;
                h5{
                    @include box((fs:0.24rem,lh:0.34rem,c:$black2));
                    font-weight:normal;
                }
                p{
                    @include box((c:$black6,fs:0.24rem,lh:0.34rem,m:0.1rem 0 0 0))
                }
                .lookDetail{
                    @include box((c:$blue));
                }
            }
        }
    }


    .borrowPersonDetailCard{
        @include box((p:0.2rem 0.2rem 0.3rem 0.2rem,h:6rem));
        table,td{
            border:none;
        }
        overflow: scroll;
        h5{
            @include box((ta:center,fs:0.32rem,c:$black3,lh:0.46rem,m:0.2rem 0 0.2rem 0))
        }
        table{
            @include box((w:100%));
            tbody{
                tr{
                    @include box((lh:0.6rem,c:$black6));
                    td:first-child{
                        @include box((p:0 0 0 0.3rem,w:2.7rem));
                    }
                    td:last-child{
                        @include box((p:0 0 0 0.3rem));
                    }
                }
                tr:nth-child(odd){
                    background-color:#F6F6F6;
                }
            }
        }
    }
</style>
