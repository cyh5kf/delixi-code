<!--八宝详情-->
<template>
    <div class="detail">
        <h3><span class="icon icon_cpms"></span>产品描述</h3>
        <ul>
            <li v-for="item in page">
                <h4 v-if="item.h4" v-html="item.h4"></h4>
                <h4 v-if="item.h5" v-html="item.h5"></h4>
                <p v-if="item.content" v-html="item.content"></p>
            </li>
            <li>
                <h4 >风险提示</h4>
                <router-link tag="p" to="/tender/dangerTipReport">《风险提示告知书》</router-link>
            </li>
        </ul>
    </div>
</template>
<script>

    export default {
        name: 'Detail',
        data(){
            return {
                r_plan:[
                    {
                        h4:'产品介绍',
                        content:`R计划是人众金服推出的一款专注于供应链和消费金融领域的产品，是众供宝和众消宝的一个特色子产品。经由出借人授权，平台通过智能投标计划将投资人加入的投资资金自动分配到借款标的中，提高投资人资金利用效率，并通过分散投资降低风险。到期退出为投标工具内借款标的正常到期，本金收益通过银行存管账户返还。`,
                    },
                    {
                        h4:'底层资产描述',
                        content:`本计划围绕供应链和消费金融主题，向借款人提供日常消费及其他周转资金，
                        大多数产品的历史回款表现为优秀。`
                    },
                    {
                        h4:'保障措施',
                        h5:'一、严格风控标准',
                        content:`资深专业风控团队，围绕平台资产实施多元化、大数据、反欺诈等一系列风险控制措施，
                        确保资产质量；并引入征信交叉核验、OCR识别、风控决策引擎等国内外领先金融科技技术，
                        防范系统性风险，确保资产真实性及安全性。`
                    },
                    {
                        h5:'二、投后管理严谨',
                        content:`向借款人发放贷款的同时，实现对借款人资金流向的控制，
                        项目安全性得到极大提高。`
                    },
                    // {
                    //     h5:'三、资金安全',
                    //     content:`存管银行根据专款专用的原则，对客户资金进行严格的管控，确保用户账户资金安全。`
                    // },
                    {
                        h5:'三、法律保障',
                        content:`人众金服平台及业务受法律保护，透明合规，
                        强大的法务团队为人众金服用户提供法律支持及保障。`
                    },
                    {
                        h5:'四、隐私保障',
                        content:`通过全程加密、系统隔离、安全检测，提供全方位的隐私保障。<br/>具体解释权归人众金服。`
                    },
                ],
                zhong_gong_bao:[
                    {
                        h4:'产品介绍',
                        content:`众供宝是人众金服面向投资人设计的一款专注于供应链领域的产品。`,
                    },
                    {
                        h4:'底层资产描述',
                        content:`本产品围绕供应链金融主题，向各类供应链上下游商户提供周转资金、营运资金，
                        大多数产品的历史回款表现为优秀，并提供第三方担保措施维护资金安全。`
                    },
                    {
                        h4:'保障措施',
                        h5:'一、严格风控标准',
                        content:`专注供应链金融服务，严格审核流程，覆盖所有风险点。甄选优质资产，
                        严格风控审查。实现质押货品的存储与监管，保证质押货品安全保值，
                        逾期能快速处理变现。`
                    },
                    {
                        h5:'二、投后管理严谨',
                        content:`向借款人发放贷款的同时，实现对借款人资金流向的控制，
                        项目安全性得到极大提高。`
                    },
                    {
                        h5:'三、第三方担保',
                        content:`第三方担保：核心企业/融资方法人提供无限连带责任担保。`
                    },
                    {
                        h5:'四、资产安全',
                        content:`第一还款来源：融资方自有资金还款<br />第二还款来源：核心企业/融资方法人提供无限连带担保责任`
                    },
                    // {
                    //     h5:'五、资金安全',
                    //     content:`交易过程中，存管银行将用户资金与平台自有资金隔离，专款专用。`
                    // },
                    {
                        h5:'五、强大法律保障',
                        content:`由综合性律师事务所普龙律师事务所进行法律审查，确保交易流程合法合规`
                    },
                ],
                zhong_xiao_bao:[
                    {
                        h4:'产品介绍',
                        content:`众消宝是人众金服面向投资人设计的一款专注于消费金融领域的产品。`,
                    },
                    {
                        h4:'底层资产描述',
                        content:`本产品围绕消费金融主题，向借款人提供日常消费及其他周转资金，大多数产品的历史回款表现为优秀。`
                    },
                    {
                        h4:'保障措施',
                        h5:'一、严格风控标准',
                        content:`资深专业风控团队，围绕平台资产实施多元化、大数据、反欺诈等一系列风险控制措施，
                        确保资产质量；并引入征信交叉核验、OCR识别、风控决策引擎等国内外领先金融科技技术，防范系统性风险，
                        确保资产真实性及安全性。`
                    },
                    {
                        h5:'二、投后管理严谨',
                        content:`向借款人发放贷款的同时，实现对借款人资金流向的控制，项目安全性得到极大提高。`
                    },
                    // {
                    //     h5:'三、资金安全',
                    //     content:`存管银行根据专款专用的原则，对客户资金进行严格的管控，确保用户账户资金安全。`
                    // },
                    {
                        h5:'三、法律保障',
                        content:`人众金服平台及业务受法律保护，透明合规，强大的法务团队为人众金服用户提供法律支持及保障。`
                    },
                    {
                        h5:' 四、隐私保障',
                        content:`通过全程加密、系统隔离、安全检测，提供全方位的隐私保障。<br />`
                    },
                ],
                xin_shou_bao:[
                    {
                        h4:'产品介绍',
                        content:`新手宝是经人众金服安全保障体系严格审核的优质债权，资产类别包括消费金融类、供应链金融类。`,
                    },
                    {
                        h4:'底层资产描述',
                        content:`主要为个人贷款产品和部分流动性较好的企业借贷项目，大多数产品的历史回款表现为优秀，
                        并提供第三方担保措施维护资金安全。`
                    },
                    {
                        h4:'保障措施',
                        h5:'一、严格风控标准',
                        content:`严格审核流程，覆盖所有风险点。甄选优质资产，严格风控审查。`
                    },
                    {
                        h5:'二、投后管理严谨',
                        content:`向借款人发放贷款的同时，实现对借款人资金流向的控制，项目安全性得到极大提高。`
                    },
                    {
                        h5:'三、资产安全',
                        content:`第一还款来源：借款人自有资金还款。<br/> 第二还款来源：担保方履约垫付。`
                    },
                    // {
                    //     h5:'四、资金安全',
                    //     content:`交易过程中，存管银行将用户资金与平台自有资金隔离，专款专用。`
                    // },
                    {
                        h5:'四、法律保障',
                        content:`人众金服平台及业务受法律保护，透明合规，强大的法务团队为人众金服用户提供法律支持及保障。`
                    },
                    {
                        h5:'五、第三方担保',
                        content:`第三方担保提供无限连带责任担保。`
                    },
                    {
                        h5:'六、强大法律保障',
                        content:`由综合性律师事务所普龙律师事务所进行法律审查，确保交易流程合法合规`
                    },
                ],
            };
        },
        mounted(){

        },
        computed: {
            page(){//0新手标；1供应链金融（众供宝）；2消费金融（众消宝）；3R计划 4 众汽宝
                const config=['xin_shou_bao','zhong_gong_bao','zhong_xiao_bao','r_plan','zhong_gong_bao']

//                if(this[config[this.productType]]){
//                    return this[config[this.productType]]
//                }else{
//                    return this[config[0]]
//                }

                if(this.category==0){
                    return this[config[0]]
                }else{
                    return this[config[this.productType]]
                }
            }
        },
        props:['category','productType'],//productType 1：众供宝， 2:众消宝， 3：R计划  category 0：新手标 1：普通标 2：体验标
        methods: {

        }
    }
</script>
<style lang="scss" scoped>
    .business_mode {
        img {
            @include box((w:100%));
        }
    }

    /*合同附件*/
    .htfj {
        @include box((ta:center));
        &:after {
            content: '';
            @include box((d:block, w:100%, h:1px));
            clear: both;
        }
        li {
            @include box((fl:left, m:0 0.2rem));
        }
        div {
            @include box((d:block, w:0.8rem, h:0.8rem, m:0 auto));
            @include bg_img('tender_detail/xyfm.png')
        }
        p {
            @include box((d:block, ta:center, c:$black6, lh:0.7rem, fs:0.28rem));
        }
    }

    .detail {
        @include box((p:0.3rem 0 0.6rem, bg:$white));
        > ul {
            &:not(:last-child) {
                @include thin(bottom, #e5e5e5);
            }
        }
        h3 {
            @include box((lh:0.4rem, fs:0.28rem, c:$black2, m:0 0 0.15rem));
            font-weight: normal;

            .icon {
                @include box((d:inline-block, w:0.48rem, h:0.48rem, m:0 0.2rem 0 0));
                vertical-align: middle;
            }
            .icon_cpms {
                @include bg_img('tender_detail/icon_cpms.png');
            }
            .icon_hxqy {
                @include bg_img('tender_detail/icon_hxqy.png');
            }
            .icon_fxbz {
                @include bg_img('tender_detail/icon_fxbz.png');
            }
            .icon_jkzl {
                @include bg_img('tender_detail/icon_jkzl.png');
            }
        }
        h4 {
            @include box((lh:0.34rem, fs:0.24rem, c:$black5, m:0.3rem 0 0.18rem));
            font-weight: normal;
        }
        p {
            @include box((c:$black9, fs:0.24rem, lh:0.36rem));
        }
        .honor {
            p {
                @include box((lh:0.28rem, fs:$black9, m:0 0 0.45rem, p:0 0 0 1rem));
                @include position((p:relative));
                &:before {
                    content: '';
                    @include box((d:block, w:0.11rem, h:0.11rem, bg:#D8D8D8, bdr:50%));
                    @include position((p:absolute, t:0.1rem, l:0.445rem))
                }
            }
        }
        .risk_control {
            .risk_navs {
                @include box((d:flex, ta:center, m:0 0 0.3rem 0));
                .item {
                    @include box((fs:0.2rem, c:$black9));
                    flex: 1;
                    span {
                        @include box((d:block, w:0.68rem, h:0.68rem, m:0 auto 0.26rem));
                    }
                    .icon_sub_zlsh {
                        @include bg_img('tender_detail/icon_sub_zlsh.png')
                    }
                    .icon_sub_sddc {
                        @include bg_img('tender_detail/icon_sub_sddc.png')
                    }
                    .icon_sub_zcpg {
                        @include bg_img('tender_detail/icon_sub_zcpg.png')
                    }
                    .icon_sub_fbjk {
                        @include bg_img('tender_detail/icon_sub_fbjk.png')
                    }
                }
            }
            li {
                @include position((p:relative, z:0));
                &.has_icon {
                    min-height: 1.02rem;
                    @include box((m:0 0 0.74rem));
                    @include box((p:0 0 0 1.94rem));
                    background-size: 1.02rem 1.02rem;
                    background-position: 0.15rem top;
                    background-repeat: no-repeat;
                    &.zjl {
                        background-image: url("#{$base_url}tender_detail/icon_zjl.png");
                    }
                    &.hwl {
                        background-image: url("#{$base_url}tender_detail/icon_hwl.png");
                    }
                    &.db {
                        background-image: url("#{$base_url}tender_detail/icon_db.png");
                    }
                    &.fxzbj {
                        background-image: url("#{$base_url}tender_detail/icon_fxzbj.png");
                    }
                    &.huigou {
                        background-image: url("#{$base_url}tender_detail/icon_huigou.png");
                    }
                    &.falv {
                        margin-bottom: 0;
                        background-image: url("#{$base_url}tender_detail/icon_falv.png");
                    }
                }
            }
        }
        .borrow_info {
            table {
                @include box((w:6.9rem, m:0.2rem auto));
                border-collapse: collapse;
            }
            td {
                @include box((w:50%, lh:0.6rem, c:$black9, p:0 0.2rem));
                @include thin(all, #e5e5e5);
            }
            .desc {
                @include box((m:0.18rem 0, c:$black9, fs:0.24rem));
            }
            .info_items {
                label {
                    @include box((d:block, p:0 0 0 1.94rem, m:0.3rem 0, lh:0.46rem, fs:0.24rem, c:$black5));
                    background-image: url("#{$base_url}tender_detail/icon_ycy.png");
                    background-repeat: no-repeat;
                    background-size: 0.44rem 0.44rem;
                    background-position: 0.48rem center;
                }
            }
        }
    }
</style>
