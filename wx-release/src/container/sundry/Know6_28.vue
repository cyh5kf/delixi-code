<template>
    <div>
        <div class="profile" v-show="navIndex==0">
            <div class="intro">
                人众金融-果投投资是杭州果投股权投资基金管理有限公司旗下的互联网金融信息服务平台，是浙江较早创立的金融企业之一，总部位于杭州。<br />
                杭州果投精准定位产业互联网金融，深耕供应链金融及消费金融领域，不断扩大金融资本与实业经济融合的深度和广度，构筑互联网金融与企业、商品（服务）供应链、消费等互利共存、持续发展的良好产业生态。致力为用户提供更加优质、高效、安全的服务。
                <img src="https://images.51rz.com/images/rebuild/wx/img/know_bg.png" alt="">
            </div>
        </div>
    </div>
</template>
<script>
    import TabNav from '@/component/TabNav'
    export default{
        name: 'Know',
        data() {
            return {
                navIndex: 0,
                navs: [
                    // {text: '公司概况'},
                    // {text: '成长大事件'},
                    // {text: '高管介绍'},
                ],
                at: [
                    {
                        title:'2018.6',
                        content:`人众金服CEO薛刚出席Money20/20金融峰会及2018中欧企业家峰会`,
                        current: true
                    },
                    {
                        title:'2018.5',
                        content:`人众金服·网贷天眼 投资者见面会成都站`,
                    },
                    {
                        title:'2018.4',
                        content:`人众金服·网贷之家 投资者见面会上海站`,
                    },
                    {
                        title:'2018.1',
                        content:`人众金服“不忘众心·一路同行”年度投资者见面会`,
                    },
                ],
                seven: [
                    {
                        title:'2017.11',
                        content:`正式加入浙江省互联网金融联合会<br/>平台交易额突破100亿`,
                        current: true
                    },
                    {
                        title: '2017.8',
                        content: `正式加入杭州互联网金融协会`,
                    },
                    {
                        title: '2017.4',
                        content: `银行存管正式上线运营<br/>喜迎四周年且乔迁新办公地址`
                    },
                    {
                        title: '2017.3',
                        content: ' 平台成交额突破50亿'
                    },
                    {
                        title:'2017.1',
                        content:`获立元创投5000万元A轮融资<br/>平台成交额突破40亿<br/>荣获“2016年度浙江创新企业”`
                    }
                ],
                six:[
                    {
                        title:'2016.12',
                        content:`通过国家公安部监制信息<br/>安全等级保护三级安全备案`
                    },
                    {
                        title:'2016.10',
                        content:`与存管银行签订资金存管协议<br/>获得ICP许可证<br/>平台成交额突破30亿 `
                    },
                    {
                        title:'2016.6',
                        content:`与汇金大通达成战略合作<br/>在宁波保税区合建监管仓
<br/>挂牌营业`
                    },
                    {
                        title:'2016.3',
                        content:'当选杭州跨境电商协会副会长单位 '
                    }
                ],
                five:[
                    {
                        title:'2015.12',
                        content:`荣获“2015年度AAA信誉企业”<br/>当选中国金融诚信联盟成员单位<br/>当选中国金融管理协会副会长单位<br/>兼浙江省分会会长单位`
                    },
                    {
                        title:'2015.11',
                        content:'当选浙江省企业理财协会副会长单位 '
                    },
                    {
                        title:'2015.10',
                        content:'江苏中电华通战略入股人众金服'
                    },
                    {
                        title:'2015.7',
                        content:`人众金服股改成功<br/>正式更名为浙江人众金融服务股份有限公司 `
                    }
                ],
                more:false
            }
        },
        methods: {
            selectItem(index){
                this.navIndex = index
            },
        },
        components: {
            TabNav
        },
    }
</script>
<style lang="scss" scoped>
    .profile {
        .intro {
            @include box((bg:#f6f6f6, fs:0.26rem));
            margin-top: 0.5rem;
            padding: 0 0.3rem;
            img {
                @include box((w:6.9rem, m:0 auto, d:block));
                margin-top: 0.3rem;
                margin-bottom: 0.4rem;
            }
        }
        .holder {
            @include box((p:0.4rem 0.3rem 0.5rem, bg:#fff));
            .holderFrame {
                h4 {
                    @include box((fs:0.3rem, c:#222, fw:500, ta:center));
                    margin-top: 0.3rem;
                }
                .frameContent {
                    @include box((mt:0.3rem, w:100%, h:6.66rem));
                    padding-left: 3.21rem;
                    background: url('https://images.51rz.com/images/rebuild/wx/img/frame_content.png') center left no-repeat;
                    background-size: 3.21rem 5.42rem;
                    li {
                        @include box((w:3.69rem, h:1.21rem, bg:#d6a463, bdr:0.08rem, ta:center, c:#fff, fs:0.26rem));
                        padding-top: 0.2rem;
                        margin-top: 0.6rem;
                        &:first-child {
                            margin-top: 0.3rem;
                        }
                    }
                }
                .holderIntro {
                    li {
                        border: 1px solid #e7e7e7;
                        margin-top: 0.4rem;
                        padding: 0.4rem 0.3rem;
                        img {
                            @include box((d:block, m:0 auto));
                        }
                        p {
                            @include box((c:#555, fs:0.26rem, lh:0.43rem));
                            margin-top: 0.35rem;
                        }
                        &:first-child {
                            img {
                                height: 1.11rem;
                            }
                        }
                        &:nth-child(2) {
                            img {
                                height: 0.83rem;
                            }
                        }
                        &:nth-child(3) {
                            img {
                                height: 0.9rem;
                            }
                        }
                    }
                }
            }
        }
    }

    .holder_bg {
        span {
            @include box((d:block, w:0.45rem, h:1px, bg:#999, fl:left));
            margin-top: 0.25rem;
        }
        p {
            display: block;
            margin: 0 0.4rem;
            float: left;
        }
        @include box((fs:0.36rem, c:#222, ta:center, w:3.2rem, m:0 auto, h:0.54rem));
    }

    .grow {
        @include box((p:0.5rem 0 0.5rem 0.77rem));
        .growTitle {
            @include box((w:0.8rem, h:0.8rem, bg:#f64c3e, fs:0.24rem, c:#fff, bdr:50%, ta:center, lh:0.8rem));
            margin-bottom: 0.6rem;
            &.more{
                background: url('https://images.51rz.com/images/rebuild/wx/img/grow_more.png') no-repeat;
                background-size: 0.2rem 0.12rem;
                background-position: center 0.58rem;
            }
            &.start{
                width:0.6rem;height:0.6rem;line-height:0.6rem;
                background: url('https://images.51rz.com/images/rebuild/wx/img/grow_start.png') no-repeat;
                background-size: 0.6rem 0.6rem;
                background-position: center;
                margin-left: 0.1rem;
            }
        }
        ul {
            background: url('https://images.51rz.com/images/rebuild/wx/img/grow-line.png') no-repeat;
            background-position: 0.4rem top;
            background-size: 0.02rem 100%;
        }
        li {
            padding-left: 0.8rem;
            padding-bottom: 0.4rem;
            background: url('https://images.51rz.com/images/rebuild/wx/img/grow_point_gray.png') no-repeat;
            background-position: 0.36rem 0.11rem;
            background-size: 0.1rem;
            .growTime {
                @include box((c:#222, fs:0.26rem))
            }
            .content {
                @include box((c:#555, fs:0.26rem))
            }
            &.active {
                background: url('https://images.51rz.com/images/rebuild/wx/img/grow_point.png') no-repeat;
                background-position: 0.31rem 0.11rem;
                background-size: 0.2rem;
                .growTime {
                    @include box((c:#f64c3e, fs:0.26rem))
                }
                .content {
                    @include box((c:#f64c3e, fs:0.26rem))
                }
            }
        }
    }

    .team {
        ul {
            padding: 0.1rem 0.3rem 0;
            li {
                padding: 0.4rem 0;
                border-bottom: 1px solid #e6e6e6;
                img {
                    display: block;
                    width: 2.12rem;
                    margin: 0 auto;
                }
                .post {
                    @include box((fs:0.3rem, c:#222, h:1rem, lh:1rem, fw:600));
                    span {
                        @include box((fs:0.26rem, c:#555))
                    }
                }
                p {
                    @include box((fs:0.26rem, c:#555))
                }
                &:last-child {
                    border-bottom: none;
                }
            }
        }
        .frame {
            padding: 0.4rem 0.3rem 0.5rem;
            background: #fff;
            img {
                width: 6.93rem;
                display: block;
                margin: 0 auto;
                margin-top: 0.3rem;
            }
        }
    }
</style>