<template>
    <div class="baozheng" key="baozheng">
        <h4>多重风控保障，资金更安全</h4>
        <ul>
            <li>
                <p>第一还款来源</p>
                <label v-text="sourceConfig[borrowType][1]">借款人自有资金还款</label>
            </li>
            <li>
                <p>第二还款来源</p>
                <label v-text="sourceConfig[borrowType][2]">担保方履约垫付</label>
            </li>
            <li>
                <p>第三还款来源</p>
                <label v-text="sourceConfig[borrowType][3]">风险保证金承诺垫付</label>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'test',
        data(){
            return {
                bid: this.$route.params.bid,//tender id
                productId: this.$route.params.productId,//根据不同的productId显示不同的内容
                sourceConfig: {
                    zhong_tao_bao: {//众淘宝
                        1: '借款人自有资金还款',
                        2: '担保方履约垫付',
                        3: '风险保证金承诺垫付'
                    },
                    zhong_ping_bao: {//众苹宝
                        1: '借款人自有资金还款',
                        2: '担保方履约垫付',
                        3: '风险保证金承诺垫付'
                    },
                    zhong_jin_bao: {//众金宝
                        1: '融资方自有资金还款',
                        2: '核心企业/融资方法人提供无限连带担保责任',
                        3: '风险保证金承诺垫付'
                    },
                    zhong_qi_bao: {//众汽宝
                        1: '融资方自有资金还款',
                        2: '核心企业/融资方法人提供无限连带担保责任',
                        3: '风险保证金承诺垫付'
                    },
                    zhong_ka_bao: {//众卡宝
                        1: '借款人自有资金还款',
                        2: '担保方履约垫付',
                        3: '风险保证金承诺垫付'
                    },
                    zhong_hui_bao: {//众惠宝
                        1: '融资方自有资金还款',
                        2: '核心企业/融资方法人提供无限连带担保责任',
                        3: '风险保证金承诺垫付'
                    }
                }
            }
        },
        computed: {
            borrowType(){
                //根据productId判定标的类型
                let typeConfig = {
                    1: 'zhong_tao_bao',
                    2: 'zhong_ping_bao',
                    3: 'zhong_jin_bao',
                    4: 'zhong_qi_bao',
                    5: 'zhong_ka_bao',
                    6: 'zhong_hui_bao',
                }

                return 'zhong_tao_bao'
            },
        }
    }
</script>
<style lang="scss" scoped>
    .baozheng {
        @include box((p:0.85rem 0 0.3rem, m:0 0 0.3rem, bg:$white));
        h4 {
            @include box((ta:center, fs:0.3rem, c:$black2, lh:0.42rem));
            font-weight: normal;
        }
        ul {
            @include box((p:0.66rem 1.1rem 0 1.4rem));
            li {
                @include box((m:0 0 1.1rem 0, p:0 0 0 1.2rem));
                @include position((p:relative));
                p {
                    @include box((c:$black9, fs:0.28rem, lh:0.4rem));
                }
                label {
                    @include box((c:$black5, fs:0.3rem, lh:0.42rem));
                }
                &:before {
                    content: '';
                    @include position((p:absolute, l:0));
                    @include box((d:inline-block, w:0.87rem, h:0.87rem));

                }
                &:nth-child(1) {
                    &:before {
                        @include bg_img('icon_bz_1.png')
                    }
                }
                &:nth-child(2) {
                    &:before {
                        @include bg_img('icon_bz_2.png')
                    }
                }
                &:nth-child(3) {
                    &:before {
                        @include bg_img('icon_bz_3.png')
                    }
                }
            }
        }
    }
</style>
