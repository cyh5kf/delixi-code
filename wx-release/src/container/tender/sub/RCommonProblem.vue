<template>
    <div>
        <div class="cjwt">
            <h3>常见问题</h3>
            <p>
                <strong>1、R计划具体是什么产品？</strong>
                <span>R计划是平台推出的优先自动投标产品。经由出借人授权，并由系统为出借人实现分散投标，回款本息续投、提高投资效率的投标产品。</span>
                <strong>2、R计划每天都有吗？</strong>
                <span>R计划会根据每天现有标的的情况，不定时更新。</span>
                <strong>3、 R计划与其他产品有什么区别？</strong>
                <span>R计划是自动投标产品，由系统自动分散投标，回款本息续投；平台其他标的则是到期还款，不会自动续投。</span>
                <strong>4、R计划收益是如何计算的？</strong>
                <span>R计划是分散投资，每个标的期满后的回款方式与其他投资方式一致，回款后本金利息一起进行自动续投。</span>
                <strong>5、R计划可以进行债权转让吗？</strong>
                <span>不能，R计划开启后会进入投资锁定期，锁定期内不能进行转让。</span>
                <strong>6、R计划是否收取管理费？</strong>
                <span>R计划与人众金服其他标的一样，不收取任何费用。</span>
                <strong>7、R计划为什么会提前退出？</strong>
                <span>R计划对应的标的回款后，如果没有合适期限的标的可以进行续投，则该部分资金需要回到账户可用余额，不再进行续投，从而提前退出当前产品。</span>
                <strong>8、R计划是否可以使用红包或加息券？</strong>
                <span>R计划支持使用红包或者加息券，一个定期R计划可使用一张红包券或者加息券。注意：使用加息券所得利息不与本息同时到账，到账时间将会延迟1到2小时。</span>
            </p>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'RCommonProblem',
        data(){
            return {}
        },
        methods: {}
    }
</script>
<style lang="scss" scoped>
    .cjwt {
        @include box((bg:$white, w:100%, p:0 0.3rem 2.2rem 0.3rem));
    }

    .cjwt h3 {
        height: 0.8rem;
        line-height: 0.8rem;
        color: #333;
        font-weight: 500;
    }

    .cjwt p {
        font-size: 0.24rem;
        color: #666;
    }

    .cjwt p strong {
        width: 100%;
        color: #333;
        display: inline-block;
        font-weight: 500;
        padding: 0.2rem 0;
    }

    .cjwt p span {
        width: 100%;
        display: inline-block;
        line-height: 0.35rem;
        padding-left: 0.38rem;
    }
</style>
