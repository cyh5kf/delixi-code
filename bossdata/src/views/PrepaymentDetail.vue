<template>
    <div class="repayment_detail">
        <div class="detail_form">
            <div class="form_row">
                <div class="item">
                    <span class="title">用户id:</span>
                    <span class="content" v-text="data.userId"></span>
                </div>
                <div class="item">
                    <span class="title">用户姓名:</span>
                    <span class="content" v-text="data.userName"></span>
                </div>
            </div>
            <div class="form_row">
                <div class="item">
                    <span class="title">经办人:</span>
                    <span class="content" v-text="data.addUser"></span>
                </div>
                <div class="item">
                    <span class="title">类型:</span>
                    <span class="content" v-text="data.type === 0 ? '投资' : (data.type === 1 ? '债转' : null)"></span>
                </div>
            </div>
            <div class="form_row">
                <div class="item">
                    <span class="title">标的id:</span>
                    <span class="content" v-text="data.borrowId"></span>
                </div>
                <div class="item">
                    <span class="title">标的名称:</span>
                    <span class="content" v-text="data.borrowName"></span>
                </div>
            </div>
            <div class="form_row item_row">
                <div class="item">
                    <span class="title">金额:</span>
                    <span class="content" v-text="data.amount"></span>
                </div>
            </div>
            <!--<div class="form_row item_row">-->
                <!--<div class="item">-->
                    <!--<span class="title">银行卡号:</span>-->
                    <!--<span class="content" v-text="data.bankNo"></span>-->
                <!--</div>-->
            <!--</div>-->
            <div class="form_row">
                <div class="item">
                    <span class="title">手机号:</span>
                    <span class="content" v-text="data.phone"></span>
                </div>
                <div class="item">
                    <span class="title">投资id:</span>
                    <span class="content" v-text="data.tenderId"></span>
                </div>
            </div>
            <div class="form_row item_row">
                <div class="item">
                    <span class="title">身份号:</span>
                    <span class="content" v-text="data.idCard"></span>
                </div>

            </div>
            <div class="form_row">
                <div class="item">
                    <span class="title">审核人:</span>
                    <span class="content" v-text="data.checkUser"></span>
                </div>
            </div>
            <div class="form_row">
                <div class="item">
                    <span class="title">利息:</span>
                    <span class="content" v-text="data.interest"></span>
                </div>
                <div class="item">
                    <span class="title">提前还款天数:</span>
                    <span class="content" v-text="data.advanceDays"></span>
                </div>
            </div>
            <div class="form_row">
                <div class="item item_row">
                    <span class="title">本金:</span>
                    <span class="content" v-text="data.capital"></span>
                </div>

            </div>

            <div class="form_row">
                <div class="item">
                    <span class="title">期数:</span>
                    <span class="content" v-text="data.period"></span>
                </div>
                <div class="item">
                    <span class="title">还款时间:</span>
                    <span class="content" v-text="data.timeStr"></span>
                </div>
            </div>
            <div class="form_row">
                <div class="item item_row">
                    <span class="title">实际还款时间:</span>
                    <span class="content" v-text="data.yesTimeStr"></span>
                </div>
            </div>
            <div class="form_row">
                <div class="item item_row">
                    <span class="title">预计还款时间:</span>
                    <span class="content" v-text="data.repayTimetr"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"pepaymentDetail",
        props:["data"],
    }
</script>

<style lang="scss" scoped>
    .dialog{
        top:auto;
    }
    .repayment_detail{
        .detail_form{
            margin-top: 0.5rem;
            .form_row{
                display: flex;
                margin: 0.1rem;
                border-bottom: 1px solid #e5e5e5;
                div.item_row{
                    width: 100%;
                }
                .item{
                    width: 50%;
                    height: 0.6rem;
                    display: flex;
                    align-items: center;
                    .title{
                        font-size: 0.24rem;
                        min-width: 0.8rem;
                        margin-right: 0.1rem;
                    }
                    .content{
                        font-size: 0.24rem;
                    }
                }
            }
        }
    }
</style>
