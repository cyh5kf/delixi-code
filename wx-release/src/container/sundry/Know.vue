<template>
    <div>
        <TabNav :navs="navs" :click="selectItem" :index="navIndex" class="navs" :gap="'0rem'"/>
        <div class="profile" v-show="navIndex==0">
            <div class="intro">
                浙江人众金融服务股份有限公司（以下简称“人众金服”）成立于2013年4月，是浙江最早创立的互联网金融企业之一，2017年1月获立元创投5000万人民币A轮投资。<br/><br/>
                平台于2016年获批ICP许可证及公安部监制信息安全等级保护三级安全备案，2017年4月完成与存管银行的资金存管对接。<br/><br/>
                人众金服精准定位产业互联网金融，深耕供应链金融及消费金融领域，不断扩大金融资本与实业经济融合的深度和广度，构筑互联网金融与企业、商品（服务）供应链、消费等互利共存、持续发展的良好产业生态。致力为用户提供更加优质、高效、安全的网络借贷信息中介服务。
                <img src="https://images.51rz.com/images/rebuild/wx/img/know_bg.png" alt="">
            </div>
            <div class="holder">
                <div class="holder_bg"><span></span>
                    <p>股东背景</p><span></span></div>
                <div class="holderFrame">
                    <h4>股东架构</h4>
                    <ul class="frameContent">
                        <li>
                            李敏（实际控制人）<br/>
                            持股56.9942%
                        </li>
                        <li>
                            杭州众硕投资管理合伙企业<br/>
                            （有限合伙）持股15%
                        </li>
                        <li>
                            江苏省中电华通网络服务<br/>
                            有限公司持股17.9986%
                        </li>
                        <li>
                            杭州立元宸皓投资合伙企业<br/>
                            （有限合伙）持股10.0072%
                        </li>
                    </ul>
                    <h4>股东介绍</h4>
                    <ul class="holderIntro">
                        <li>
                            <img src="https://images.51rz.com/images/rebuild/wx/img/holder1.png" alt="">
                            <p>
                                法学硕士、执业律师，现居于浙江杭州。李敏女士创造性提出“互联网+保理”新型模式，受到业内人士的广泛认可，被誉为国内供应链金融领域新锐领军人物。现担任浙江人众金融服务股份有限公司董事长、硅客企业孵化器浙江有限公司董事长、浙江省企业理财协会副会长、浙江省企业理财协会融资租赁（互联网金融）专业委员会主任及杭州跨境电子商务协会副会长等职务。</p>
                        </li>
                        <li>
                            <img src="https://images.51rz.com/images/rebuild/wx/img/holder2.png" alt="">
                            <p>
                                公司拥有全国骨干网70000多纤芯公里，主要城市的城域网5000多纤芯公里。公司在武汉建成并开通了中国第一个商用固定无线接入网。拥有国内首屈一指的电信级IDC机房。公司的发展策略是技术领先与成本领先策略、市场专注与差异化策略、经济发达地区的重点发展策略、运营与资本市场同步发展策略。公司秉承"务实、奋进、团结、创新"的企业宗旨，具有雄厚的技术、经济实力，敏锐的市场判断力，凝聚了大批英才，充满了蓬勃的生机与活力。</p>
                        </li>
                        <li>
                            <img src="https://images.51rz.com/images/rebuild/wx/img/holder3.png" alt="">
                            <p>
                                公司成立于2006年，由立元集团有限公司发起设立，是国内首批市场化运作的专业创投机构，在发改委备案，具有私募基金管理人资格。立元创投总部设在中国民营经济最发达的浙江省杭州市，专注PE、VC、天使投资，基金管理等业务。</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="grow" v-show="navIndex==1">
            <div class="growLine">
                <ul>
                    <div class="growTitle">2018</div>
                    <li v-for="v in at" :class="v.current&&'active'">
                        <div class="growTime" v-text="v.title"></div>
                        <div class="content" v-html="v.content"></div>
                    </li>
                    <div class="growTitle" style="background:#4992ec">2017</div>
                    <li v-for="v in seven">
                        <div class="growTime" v-text="v.title"></div>
                        <div class="content" v-html="v.content"></div>
                    </li>
                    <div class="growTitle" style="background:#fcab1d">2016</div>
                    <li v-for="v in six">
                        <div class="growTime" v-text="v.title"></div>
                        <div class="content" v-html="v.content"></div>
                    </li>
                    <div class="growTitle" style="background:#4992ec">2015</div>
                    <li v-for="v in five">
                        <div class="growTime" v-text="v.title"></div>
                        <div class="content" v-html="v.content"></div>
                    </li>
                    <div :class="`growTitle ${!more&&'more'}`" style="background-color:#fcab1d" @click="more=true">更早</div>
                    <li v-show="more">
                        <div class="growTime">2014.12</div>
                        <div class="content">与恒生科技签署服务协议 </div>
                    </li>
                    <li v-show="more">
                        <div class="growTime">2013.4</div>
                        <div class="content">人众金服平台正式上线</div>
                    </li>
                    <div v-show="more" class="growTitle start" style="background-color:#f6f6f6" >起</div>
                </ul>
            </div>
        </div>
        <div class="team" v-show="navIndex==2">
            <ul>
                <li>
                    <img src="https://images.51rz.com/images/rebuild/wx/img/team_wx1.png" alt="">
                    <div class="post">李敏&nbsp;&nbsp;<span>董事长/创始人</span></div>
                    <p>李敏女士，中共党员，法学硕士、资深执业律师，浙江人众金融服务股份有限公司董事长、浙商全国理事会常务理事，当选2017年全国万名优秀创新创业导师人才库导师。<br/><br/>2013年，她毅然投身互联网金融创新行业，创办浙江人众金融服务股份有限公司。四年多来，她利用自身专业优势，紧紧把握“互联网+产业+金融”的时代发展趋势，带领人众金服团队研发出“互联网+供应链金融”产品。创新型的供应链金融服务模型，受到业内人士的广泛认可，人众金服发展成为国内专业的供应链金融服务平台。李敏女士被誉为国内供应链金融领域新锐领军人物。<br/><br/>2017年李敏带领人众金服探索消费金融领域，不断扩大金融资本与实业经济融合的深度和广度，构筑互联网金融与企业、商品（服务）供应链、消费等互利共存、持续发展的良好产业生态。<br/><br/>李敏热衷于公益事业，关爱自闭症儿童、支援偏远山区儿童教育等默默地尽着自己的一份力量。2016年，李敏成为杭州市西湖区的党代表。
                    </p>
                </li>
                <li>
                    <img src="https://images.51rz.com/images/rebuild/wx/img/team_wx2.png" alt="">
                    <div class="post">薛刚&nbsp;&nbsp;<span>CEO</span></div>
                    <p>
                        毕业于杭州电子科技大学，10余年互联网金融市场运作经历，拥有丰富的互联网实战经验和管理经验，曾先后担任浙江同花顺营销总监，杭州鑫合汇市场总监，杭州金投行公司总助，对于互联网金融的运营及发展具有独到见解。</p>
                </li>
                <li>
                    <img src="https://images.51rz.com/images/rebuild/wx/img/team_wx3.png" alt="">
                    <div class="post">李卫兵&nbsp;&nbsp;<span>COO</span></div>
                    <p>具有10年以上的互联网从业经验，毕业于东华理工大学，曾在杭州投融界网络信息有限公司、深圳大赢家网络有限公司等知名企业担任运营总监，尤其擅长推广渠道的优化和产品体验的改进升级。</p>
                </li>
                <li>
                    <img src="https://images.51rz.com/images/rebuild/wx/img/team_wx4.png" alt="">
                    <div class="post">张松箭&nbsp;&nbsp;<span>CTO</span></div>
                    <p>
                        10年IT领域从业经验，多年金融系统开发经验，在互联网金融IT治理和信息系统开发管理经验丰富。曾就职于挖财、民生银行、东方通信等企业，先后带领团队开发多个千万级项目，涉及银行、医疗、O2O、互联网金融等多个行业。</p>
                </li>
            </ul>
            <div class="frame">
                <div class="holder_bg">
                    <span></span>
                    <p>组织架构</p>
                    <span></span>
                </div>
                <img src="https://images.51rz.com/images/rebuild/wx/img/frame_wx.png" alt="">
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
                    {text: '公司概况'},
                    {text: '成长大事件'},
                    {text: '高管介绍'},
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