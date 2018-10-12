import React, {Component} from 'react';
import {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import TopBar from "@/components/TopBar/TopBar.jsx";
import Bottom from "@/components/Bottom/Bottom.jsx";

import Aboutcss from '@/assets/css/aboutus.scss';

import {
    HashRouter as Router,
    Route,
    NavLink
}from 'react-router-dom'

import store from "@/store/store.js";

//导航
class Infotab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            now: 0
        }
    }

    render() {
        return (
            <div>
                <div className="tab">
                    <div className="container">
                        <ul>
                            <li><NavLink exact to='/' activeStyle={{color: '#4d93ea'}}>公司概况</NavLink></li>
                            <li><NavLink to='/grow' activeStyle={{color: '#4d93ea'}}>成长大事件</NavLink></li>
                            <li><NavLink to='/team' activeStyle={{color: '#4d93ea'}}>高管介绍</NavLink></li>
                            <li><NavLink to='/culture' activeStyle={{color: '#4d93ea'}}>企业文化</NavLink></li>
                            <li><NavLink to='/recruit' activeStyle={{color: '#4d93ea'}}>招贤纳士</NavLink></li>
                            <li><NavLink to='/contact' activeStyle={{color: '#4d93ea'}}>联系我们</NavLink></li>
                        </ul>
                    </div>
                </div>
                <Route exact path="/" component={Company}></Route>
                <Route exact path="/grow" component={Grow}></Route>
                <Route exact path="/team" component={Team}></Route>
                <Route exact path="/culture" component={Culture}></Route>
                <Route exact path="/recruit" component={Recruit}></Route>
                <Route exact path="/contact" component={Contact}></Route>
            </div>

        )
    }
}

//公司概述
class Company extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="company">
                <div className="intro">
                    <div className="container">
                        <div className="title">
                            <div className="line"></div>
                            <h2>公司介绍</h2>
                            <div className="line"></div>
                        </div>
                        <div className="content1">
                            <div className="text">
                                <p>浙江人众金融服务股份有限公司（以下简称“人众金服”）成立于2013年4月，是浙江最早创立的互联网金融企业之一，2017年1月获立元创投5000万人民币A轮投资。<br/><br/>平台于2016年获批ICP许可证及公安部监制信息安全等级保护三级安全备案，2017年4月完成与存管银行的资金存管对接。<br/><br/>人众金服精准定位产业互联网金融，深耕供应链金融及消费金融领域，不断扩大金融资本与实业经济融合的深度和广度，构筑互联网金融与企业、商品（服务）供应链、消费等互利共存、持续发展的良好产业生态。致力为用户提供更加优质、高效、安全的网络借贷信息中介服务。
                                </p>
                            </div>
                            <img src="https://images.51rz.com/images/rebuild/pc/img/aboutcom.png" alt=""/>
                        </div>
                    </div>
                </div>
                <div className="bg">
                    <div className="container">
                        <div className="title">
                            <div className="line"></div>
                            <h2>股东背景</h2>
                            <div className="line"></div>
                        </div>
                        <h6>股东架构</h6>
                        <ul className="jiagou">
                            <li>
                                <p>李敏（实际控制人）</p>
                                <p>持股56.9942%</p>
                            </li>
                            <li>
                                <p>杭州众硕投资管理合伙企业</p>
                                <p>（有限合伙）持股15%</p>
                            </li>
                            <li>
                                <p>江苏省中电华通网络服务</p>
                                <p>有限公司持股17.9986%</p>
                            </li>
                            <li>
                                <p>杭州立元宸皓投资合伙企业</p>
                                <p>（有限合伙）持股10.0072%</p>
                            </li>
                        </ul>
                        <img src="https://images.51rz.com/images/rebuild/pc/img/kj.png" alt=""/>
                        <h6>股东介绍</h6>
                        <ul className="jieshao">
                            <li>
                                <div className="img" style={{paddingTop: 42}}>
                                    <img src="https://images.51rz.com/images/rebuild/pc/img/gd1.png" alt=""/>
                                </div>
                                <p>
                                    法学硕士、执业律师，现居于浙江杭州。李敏女士创造性提出“互联网+保理”新型模式，受到业内人士的广泛认可，被誉为国内供应链金融领域新锐领军人物。现担任浙江人众金融服务股份有限公司董事长、硅客企业孵化器浙江有限公司董事长、浙江省企业理财协会副会长、浙江省企业理财协会融资租赁（互联网金融）专业委员会主任及杭州跨境电子商务协会副会长等职务。</p>
                            </li>
                            <li>
                                <div className="img" style={{paddingTop: 49}}>
                                    <img src="https://images.51rz.com/images/rebuild/pc/img/gd2.png" alt=""/>
                                </div>
                                <p>
                                    公司拥有全国骨干网70000多纤芯公里，主要城市的城域网5000多纤芯公里。公司在武汉建成并开通了中国第一个商用固定无线接入网。拥有国内首屈一指的电信级IDC机房。公司的发展策略是技术领先与成本领先策略、市场专注与差异化策略、经济发达地区的重点发展策略、运营与资本市场同步发展策略。公司秉承"务实、奋进、团结、创新"的企业宗旨，具有雄厚的技术、经济实力，敏锐的市场判断力，凝聚了大批英才，充满了蓬勃的生机与活力。</p>
                            </li>
                            <li>
                                <div className="img" style={{paddingTop: 39}}>
                                    <img src="https://images.51rz.com/images/rebuild/pc/img/gd3.png" alt=""/>
                                </div>
                                <p>
                                    公司成立于2006年，由立元集团有限公司发起设立，是国内首批市场化运作的专业创投机构，在发改委备案，具有私募基金管理人资格。立元创投总部设在中国民营经济最发达的浙江省杭州市，专注PE、VC、天使投资，基金管理等业务</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

//成长大事件
class Grow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: false
        }
    }

    render() {
        return (
            <div className="grow">
                <div className="container">
                    <div className="title">
                        <div className="line"></div>
                        <h2>成长大事件</h2>
                        <div className="line"></div>
                    </div>
                </div>
                <ul className="growline">
                    <li>
                        <div className="year">2018</div>
                        <div className="item">
                            <div className="items active">
                                <h6>2018.6</h6>
                                <p>人众金服CEO薛刚出席Money20/20金融峰会及2018中欧企业家峰会</p>
                            </div>
                        </div>
                        <div className="item">
                            <div className="items">
                                <h6>2018.5</h6>
                                <p>人众金服·网贷天眼 投资者见面会成都站</p>
                            </div>
                        </div>
                        <div className="item">
                            <div className="items">
                                <h6>2018.4</h6>
                                <p>人众金服·网贷之家 投资者见面会上海站</p>
                            </div>
                        </div>
                        <div className="item">
                            <div className="items">
                                <h6>2018.1</h6>
                                <p>人众金服“不忘众心·一路同行”年度投资者见面会</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="year" style={{backgroundColor: '#4992ec'}}>2017</div>
                        <div className="item">
                            <div className="items">
                                <h6>2017.11</h6>
                                <p>正式加入浙江省互联网金融联合会、平台交易额突破100亿</p>
                            </div>
                        </div>
                        <div className="item">
                            <div className="items">
                                <h6>2017.8 </h6>
                                <p>正式加入杭州互联网金融协会</p>
                            </div>
                        </div>
                        <div className="item">
                            <div className="items">
                                <h6>2017.4</h6>
                                <p>银行存管正式上线运营 </p>
                                <p>喜迎四周年且乔迁新办公地址</p>
                            </div>
                        </div>
                        <div className="item">
                            <div className="items">
                                <h6>2017.3</h6>
                                <p>平台成交额突破50亿</p>
                            </div>
                        </div>
                        <div className="item">
                            <div className="items">
                                <h6>2017.1</h6>
                                <p>获立元创投5000万元A轮融资</p>
                                <p>平台成交额突破40亿</p>
                                <p>荣获“2016年度浙江创新企业”</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="year" style={{backgroundColor: '#ff9b09'}}>2016</div>
                        <div className="item">
                            <div className="items">
                                <h6>2016.12</h6>
                                <p>通过国家公安部监制信息安全等级保护三级安全备案</p>
                            </div>
                        </div>
                        <div className="item">
                            <div className="items">
                                <h6>2016.10</h6>
                                <p>与存管银行签订资金存管协议</p>
                                <p>获得ICP许可证</p>
                                <p>平台成交额突破30亿</p>
                            </div>
                        </div>
                        <div className="item">
                            <div className="items">
                                <h6>2016.6</h6>
                                <p>与汇金大通达成战略合作，在宁波保税区合建监管仓挂牌营业</p>
                            </div>
                        </div>
                        <div className="item">
                            <div className="items">
                                <h6>2016.3</h6>
                                <p>当选杭州跨境电商协会副会长单位 </p>
                            </div>
                        </div>
                    </li>
                    <li ref="more" style={{backgroundSize: '2px 480px'}}>
                        <div className="year" style={{backgroundColor: '#4992ec'}}>2015</div>
                        <div className="item">
                            <div className="items">
                                <h6>2015.12</h6>
                                <p>荣获“2015年度AAA信誉企业”</p>
                                <p>当选中国金融诚信联盟成员单位</p>
                                <p>当选中国金融管理协会副会长单位兼浙江省分会会长单位</p>
                            </div>
                        </div>
                        <div className="item">
                            <div className="items">
                                <h6>2015.11</h6>
                                <p>当选浙江省企业理财协会副会长单位 </p>
                            </div>
                        </div>
                        <div className="item">
                            <div className="items">
                                <h6>2015.10</h6>
                                <p>江苏中电华通战略入股人众金服</p>
                            </div>
                        </div>
                        <div className="item">
                            <div className="items">
                                <h6>2015.7</h6>
                                <p>人众金服股改成功，正式更名为浙江人众金融服务股份有限公司 </p>
                            </div>
                        </div>
                        <div className="year more"
                             style={{display: this.state.display ? 'none' : 'block', backgroundColor: '#fcab1d'}}
                             onClick={() => {
                                 this.refs.more.style.backgroundSize = '2px 100%'
                                 this.setState({
                                     display: true
                                 })
                             }}>更早
                        </div>
                    </li>
                    <li style={{display: this.state.display ? 'block' : 'none'}}>
                        <div className="year" style={{backgroundColor: '#fcab1d'}}>更早</div>
                        <div className="item" style={{height: 0, minHeight: 0}}>
                        </div>
                        <div className="item">
                            <div className="items">
                                <h6>2014.12</h6>
                                <p>与恒生科技签署服务协议 </p>
                            </div>
                        </div>
                        <div className="item">
                            <div className="items">
                                <h6>2013.4</h6>
                                <p>人众金服平台正式上线</p>
                            </div>
                        </div>
                        <div className="start">起</div>

                    </li>
                </ul>
            </div>
        )
    }
}

//高管介绍
class Team extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="team">
                <div className="container">
                    <div className="title">
                        <div className="line"></div>
                        <h2>高管团队</h2>
                        <div className="line"></div>
                    </div>
                    <ul className="gaoguan">
                        <li>
                            <div className="img">
                                <img src="https://images.51rz.com/images/rebuild/pc/img/team1.png" alt=""/>
                            </div>
                            <div className="desc">
                                <h3>李敏&nbsp;&nbsp;<span>董事长/创始人</span></h3>
                                <p>
                                    李敏女士，中共党员，法学硕士、资深执业律师，浙江人众金融服务股份有限公司董事长、浙商全国理事会常务理事，当选2017年全国万名优秀创新创业导师人才库导师。<br/><br/>
                                    2013年，她毅然投身互联网金融创新行业，创办浙江人众金融服务股份有限公司。四年多来，她利用自身专业优势，紧紧把握“互联网+产业+金融”的时代发展趋势，带领人众金服团队研发出“互联网+供应链金融”产品。创新型的供应链金融服务模型，受到业内人士的广泛认可，人众金服发展成为国内专业的供应链金融服务平台。李敏女士被誉为国内供应链金融领域新锐领军人物。<br/><br/>
                                    2017年李敏带领人众金服探索消费金融领域，不断扩大金融资本与实业经济融合的深度和广度，构筑互联网金融与企业、商品（服务）供应链、消费等互利共存、持续发展的良好产业生态。<br/><br/>
                                    李敏热衷于公益事业，关爱自闭症儿童、支援偏远山区儿童教育等默默地尽着自己的一份力量。2016年，李敏成为杭州市西湖区的党代表。
                                </p></div>

                        </li>
                        <li>
                            <div className="img">
                                <img src="https://images.51rz.com/images/rebuild/pc/img/team2.png" alt=""/>
                            </div>
                            <div className="desc">
                                <h3>薛刚&nbsp;&nbsp;<span>CEO</span></h3>
                                <p>
                                    毕业于杭州电子科技大学，10余年互联网金融市场运作经历，拥有丰富的互联网实战经验和管理经验，曾先后担任浙江同花顺营销总监，杭州鑫合汇市场总监，杭州金投行公司总助，对于互联网金融的运营及发展具有独到见解。</p>
                            </div>
                        </li>
                        <li>
                            <div className="img">
                                <img src="https://images.51rz.com/images/rebuild/pc/img/team3.png" alt=""/>
                            </div>
                            <div className="desc">
                                <h3>李卫兵&nbsp;&nbsp;<span>COO</span></h3>
                                <p>
                                    具有10年以上的互联网从业经验，毕业于东华理工大学，曾在杭州投融界网络信息有限公司、深圳大赢家网络有限公司等知名企业担任运营总监，尤其擅长推广渠道的优化和产品体验的改进升级。</p>
                            </div>
                        </li>
                        <li>
                            <div className="img">
                                <img src="https://images.51rz.com/images/rebuild/pc/img/team4.png" alt=""/>
                            </div>
                            <div className="desc">
                                <h3>张松箭&nbsp;&nbsp;<span>CTO</span></h3>
                                <p>
                                    10年IT领域从业经验，多年金融系统开发经验，在互联网金融IT治理和信息系统开发管理经验丰富。曾就职于挖财、民生银行、东方通信等企业，先后带领团队开发多个千万级项目，涉及银行、医疗、O2O、互联网金融等多个行业。</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="teamgj">
                    <div className="container">
                        <div className="title">
                            <div className="line"></div>
                            <h2>组织架构</h2>
                            <div className="line"></div>
                        </div>
                    </div>
                    <img src="https://images.51rz.com/images/rebuild/pc/img/teamgj.png" alt=""/>
                </div>
            </div>
        )
    }
}

//企业文化
class Culture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rotate: false,
            imgUrl: [
                'https://images.51rz.com/images/rebuild/pc/img/cul1.png',
                'https://images.51rz.com/images/rebuild/pc/img/cul2.png',
                'https://images.51rz.com/images/rebuild/pc/img/cul3.png',
                'https://images.51rz.com/images/rebuild/pc/img/cul4.png',
                'https://images.51rz.com/images/rebuild/pc/img/cul5.png',
                'https://images.51rz.com/images/rebuild/pc/img/cul6.png',
                'https://images.51rz.com/images/rebuild/pc/img/cul7.png',
                'https://images.51rz.com/images/rebuild/pc/img/cul8.png',
                'https://images.51rz.com/images/rebuild/pc/img/cul9.png',
                'https://images.51rz.com/images/rebuild/pc/img/cul10.png',
            ]
        }
    }

    rotate = () => {
        this.setState({rotate: !this.state.rotate})
    }

    render() {
        const {rotate, imgUrl} = this.state;
        const arr = imgUrl.filter((v, i) => {
            if (rotate) {
                return i >= 5
            } else {
                return i < 5
            }
        });
        const imgs = arr.map((v, i) => <li className={!!rotate && 'rotate'} key={i}
                                           style={{backgroundImage: 'url(' + v + ')'}}></li>);
        return (
            <div className="culture">
                <div className="cul_top">
                    <div className="container">
                        <div className="title">
                            <div className="line"></div>
                            <h2>办公环境</h2>
                            <div className="line"></div>
                        </div>
                    </div>
                    <ul className="content">
                        {imgs}
                        <div className="more" onClick={() => {
                            this.rotate();
                        }}>
                            <p>换一组</p>
                            <div className={rotate ? 'icon rotate' : 'icon'}></div>
                        </div>
                    </ul>
                </div>
                <div className="cul_bottom">
                    <div className="container">
                        <div className="title">
                            <div className="line"></div>
                            <h2>员工风采</h2>
                            <div className="line"></div>
                        </div>
                    </div>
                    <div className="pic">
                        <img src="https://images.51rz.com/images/rebuild/pc/img/pic1.png" alt="" style={{marginRight: 20, marginBottom: 20}}/>
                        <img src="https://images.51rz.com/images/rebuild/pc/img/pic2.png" alt="" style={{height: '400px', marginBottom: 20}}/>
                        <img src="https://images.51rz.com/images/rebuild/pc/img/pic3.png" alt=""/>
                        <img src="https://images.51rz.com/images/rebuild/pc/img/pic4.png" alt="" style={{marginRight: 20, marginLeft: 20}}/>
                        <img src="https://images.51rz.com/images/rebuild/pc/img/pic5.png" alt="" style={{height: '240px'}}/>
                    </div>
                </div>
            </div>
        )
    }
}

//招贤纳士
class Recruit extends Component {
    render() {
        const post = [
            {
                post: 'Java架构师',
                duty: ['1、负责平台系统架构的分析与设计，能根据发展对技术架构不断调整；', '2、新技术探索、跟进，并结合实际推进到研发体系；', '3、结合需求设计、规划高业务扩展性、灵活性、吞吐实现线程扩展、安全、高稳定、可靠系统架构。'],
                require: ['1、5年以上Java开发经验，2年以上架构设计经验；', '2、有丰富高并发、高吞吐、高稳定性系统架构设计与实现经验，对架构重构分析、分布改进有实战经验；', '3、熟练掌握分布式通讯框架（Netty、dubbo等NIO框架）、分布式存储（fastDFS、HDFS等）、分布式缓存（Memcached集群、redis集群）、分布式事务处理方案；', '4、全局掌握架构要素系统灵活性、业务扩展性、性能线性增长、HA高可用、等级安全性等；', '5、熟悉MySQL处理机制与应用场景限制、熟悉NoSQL Redis、MongoDB、HBase等，熟悉消息中间件，如ActiveMQ、RabbitMQ、Kafka等在适合业务场景使用适合技术。']
            },
            {
                post: '资深Java开发工程师',
                duty: ['1、负责业务系统核心模块的设计和开发实现；', '2、指导初级程序员工作，并负责Code Review。'],
                require: ['1、五年以上互联网行业Java及Web应用开发相关经验，扎实的基础知识，熟悉J2EE设计模式；', '2、深入了解Spring,ibatis,struts2等框架（框架提供的特性及其实现原理）；', '3、熟悉分布式. 多线程及高性能的设计与编码及性能调优；', '4、熟悉Internet基本协议（如TCP/IP.   HTTP等）内容及相关应用；', '5、至少熟练掌握oracle、mysql当中的一种关系型数据库，能进行sql调优；', '6、有很强的分析问题和解决问题的能力，有强烈的责任心；', '7、大规模高并发访问的Web应用。']
            },
            {
                post: '高级Java开发工程师',
                duty: ['1、负责业务系统核心模块的设计和开发实现；', '2、指导初级程序员工作，并负责Code Review。'],
                require: ['1、五年以上互联网行业Java及Web应用开发相关经验，扎实的基础知识，熟悉J2EE设计模式；', '2、深入了解Spring,ibatis,struts2等框架（框架提供的特性及其实现原理）；', '3、熟悉分布式. 多线程及高性能的设计与编码；', '4、熟悉Internet基本协议（如TCP/IP. HTTP等）内容及相关应用；', '5、至少熟练掌握oracle、mysql当中的一种关系型数据库，能进行sql调优；', '6、有较强的分析问题和解决问题的能力，有强烈的责任心；', '7、大规模高并发访问的Web应用。']
            },
            {
                post: 'Java技术专家P7',
                duty: ['业务分析、架构设计和项目管理。'],
                require: ['1、Java基础扎实，深入了解成熟Java开源框架，如spring/spring mvc,mybatis等；', '2、非常熟悉Tomcat、Jboss等开源服务器；', '3、具有很强数据库设计经验和SQL优化功底；',
                    '4、具备良好的面向对象编程经验，深入理解OO、AOP思想，具有很强的分析设计能力，熟悉常用设计模式；',
                    '5、具有Hadoop&M/R开发、HBase等相关项目实践，有独立系统的架构设计经验优先；', '6、有丰富高并发、高吞吐、高稳定性系统架构设计与实现经验，对架构重构分析、分布改进有实战经验。']
            },
            {
                post: '资深高级运维工程师',
                duty: ['1、自动化运维的设计和开发；', '2、网站架构的评估、设计以及实施落地；', '3、提升系统稳定性、可运维性；', '4、系统、中间件相关的优化；', '5、运维相关的新技术调研。'],
                require: ['1、3年以上互联网相关运维/运维开发经验；', '2、精通linux，有丰富的故障排查、性能调优经验；', '3、熟悉TCP/IP、HTTP(S)等协议栈；', '4、精通负载均衡相关中间件(LVS、HAProxy、Nginx等)，有高并发调优经验者优先；', '5、精通至少一种开源监控系统(zabbix/nagios/openfalcon等)，对监控优化有深入的理解；', '6、精通常用脚本语言shell、python等，熟悉java、go者优先；', '7、精通至少一种常用自动化工具(puppet、saltstack、ansible)，有配置管理经验者优先；', '8、熟悉微服务架构，有docker相关项目/运维经验；', '9、熟悉openstack等云服务平台，有相关经验者优先；', '10、积极主动、思维敏捷、热爱技术。']
            }
        ]
        const resumes = post.map((v, i) => {
            return <Resume key={i} post={v}/>
        })
        return (
            <div className="recruit">
                <ul>
                    {resumes}
                </ul>
            </div>
        )
    }
}
class Resume extends Component {
    render() {
        const {post, duty = [], require = []} = this.props.post
        return (
            <li>
                <div className="recruitdetail">
                    <div className="post">
                        <div className="circle" style={{backgroundImage: 'url(https://images.51rz.com/images/rebuild/pc/img/post_js.png)'}}></div>
                        <p>{post}</p>
                    </div>
                    <div className="postdetail">
                        <h3>岗位职责</h3>
                        {duty.map((v, i) => {
                            return <p key={i}>{v}</p>
                        })}
                        <h3 style={{marginTop: 28}}>任职要求</h3>
                        {require.map((v, i) => {
                            return <p key={i}>{v}</p>
                        })}
                    </div>
                    <a className="tou" href="mailto:hr@51rz.com">投递简历</a>
                </div>
            </li>
        )
    }
}

//联系我们
class Contact extends Component {
    render() {
        return (
            <div>
                <iframe src="./map.html" frameBorder="0" scrolling="none"
                        style={{width: '100%', height: 351, border: 'none'}}></iframe>
                <div className="contactbox">
                    <ul>
                        <div className="left">
                            <li>
                                <h3 style={{backgroundImage: 'url(https://images.51rz.com/images/rebuild/pc/img/contact1.png)'}}>客服热线</h3>
                                <p>客服电话：<a>400-655-8858</a></p>
                                <p>服务时间：工作日：9:00-20:30节假日：9:00-17:30</p>
                            </li>
                            <li>
                                <h3 style={{backgroundImage: 'url(https://images.51rz.com/images/rebuild/pc/img/contact3.png)'}}>媒体采访</h3>
                                <p>如果您有品牌合作意向，</p>
                                <p>请将合作方式资料发送到<a href="">pinpaibu@51rz.com</a>，我们会尽快与您联系。</p>
                            </li>
                            <li>
                                <h3 style={{backgroundImage: 'url(https://images.51rz.com/images/rebuild/pc/img/contact4.png)'}}>商务合作</h3>
                                <p>如果您有意向与我们合作，</p>
                                <p>请将合作意向文档发送到<a href="">app@51rz.com</a>，我们会尽快与您联系。</p>
                            </li>
                        </div>
                        <div className="right">
                            <li>
                                <h3 style={{backgroundImage: 'url(https://images.51rz.com/images/rebuild/pc/img/contact2.png)'}}>联系方式</h3>
                                <p>公司地址：浙江省杭州市学院路28号德力西大厦1号楼25层</p>
                                <p>电话：0571-56583188</p>
                                <p>邮编：310012</p>
                            </li>
                            <li>
                                <div className="app" style={{float: 'left'}}>
                                    <img src="https://images.51rz.com/images/rebuild/pc/img/dwapp.png" alt=""/>
                                    <p>APP下载</p>
                                </div>
                                <div className="app" style={{float: 'right'}}>
                                    <img src="https://images.51rz.com/images/rebuild/pc/img/agzwx.png" alt=""/>
                                    <p>微信公众号</p>
                                </div>
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
        )
    }
}


class Aboutus extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div>
                    <TopBar/>
                    <div className="infobg">
                        关于我们
                    </div>
                    <Infotab/>
                    <Bottom/>
                </div>
            </Router>
        )
    }
}

Aboutus = connect((store) => ({store: store}))(Aboutus);
render(<Provider store={store}><Aboutus/></Provider>, document.getElementById('app'));