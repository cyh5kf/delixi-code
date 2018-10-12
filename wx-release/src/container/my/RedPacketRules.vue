<template>
    <div class="word_border">
        <p class="word_14" style="border:none;"><span class="red" style="font-weight:bold;">优惠券（红包、加息券）使用提示：</span><br />
            1、红包和加息券都有不同的使用条件和使用期限，如在期限内未使用，过期则失效；<br />
            2、红包不可用于投资抵扣，以返现的方式发放到帐户；<br />
            3、加息券产生的利息，根据加息券加息天数和加息本金而定，在投资项目到期后，自动发放到个人账户；<br />
            4、用户在使用加息券之后发生债权转让，转让人和承接人都不享受加息券产生的利息，奖励不予以发放；<br />
            5、每次投资只能使用一张红包或者加息券。如果您有多张红包和加息券，可以分多次投资使用；<br />
            6、红包和加息券不能用于新手标和债权转让标的；<br />
            7、红包和加息券使用规则最终解释权在法律范围内归人众金服所有；
        </p>
    </div>
</template>
<script>
    export default {
        name: 'RedPacketRules',
        data(){
            return {}
        },
        methods: {}
    }
</script>
<style lang="scss" scoped>
    .word_border{
        @include box((p:0.3rem))
    }
</style>
