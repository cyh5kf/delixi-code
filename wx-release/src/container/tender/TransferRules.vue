<template>
    <div class="yhxy-wrap">
        <h1>债权转让规则</h1>
        <p style="text-indent:0;">1、众供宝有效投资满30天（满标日起算含30天）且产品页面有可债权转让标识的支持债权转让；众消宝产品、R计划产品不支持债权转让。</p>
        <p style="text-indent:0;">2、债权转让人在债权转让发起之日前的本金所产生的利息归债权转让人所有，债权转让发起之日后（含发起转让当日）的债权本金所产生的利息归承接人所有。</p>
        <p style="text-indent:0;">3、承接标不能进行二次转让。</p>
        <p style="text-indent:0;">4、用户自主发起的转让，48小时后转让没成交则自动失效，可重新发起转让。</p>
        <p style="text-indent:0;">5、当前标转让期间回款，转让自动失效，可转让的资产到期日前三天，不支持转让。</p>
        <p style="text-indent:0;">6、转让费用说明：<br />
        　a.转让标会有相应的折价，转让金额由转让人自行设定，但不得低于本金的95%（折价金额不得高于本金5%），不得高于本金及债权转让发起之日前的本金所产生的利息之和。<br />
        　b.转让若有折价金额归承接人所有。若转让金额包括利息，转让时由承接人先垫付给转让人该部分利息，该垫付的利息不计息，转让人原订单的本金与实际承接的差额将在项目到期后返还。
        </p>
        <p style="text-indent:0;"> 7、转让服务费用说明：发起债权转让的转让人按照以下规则承担转让服务费。转让服务费=转让本金*转让服务费率，转让的服务费率为0.8%。</p>
        <p style="text-indent:0;"> 8、债权转让规则最终解释权归人众金服所有。</p>
    </div>
</template>
<script>
    export default {
        name: 'TransferRules',
        data(){
            return {}
        },
        methods: {}
    }
</script>
<style lang="scss" scoped>
    .yhxy-wrap{
        background: #fff;
        padding:0.3rem;
    }
    .yhxy-wrap div{
        padding: 0 0.3rem;
        margin: 0 auto;
    }
    .yhxy-wrap p{
        text-indent: 2em;
        margin-bottom: 0.2rem;
        word-wrap: break-word;
    }
    .yhxy-wrap h1{
        text-align: center;
        margin-bottom: 0.3rem;
        font-weight:800;
    }
    .yhxy-wrap h3{
        margin-bottom: 0.2rem;
        color: #ff8a3c;
    }
</style>
