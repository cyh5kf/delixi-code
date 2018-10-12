import React, {Component} from 'react';
import {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import infoCss from "@/assets/css/information.scss";
import Swiper from 'swiper';
import {
    NavLink,
    HashRouter as Router,
    Route,
    Redirect
} from 'react-router-dom'
import TopBar from "@/components/TopBar/TopBar.jsx";
import Bottom from "@/components/Bottom/Bottom.jsx";
import Pagination from "@/components/Pagination/Pagination.jsx"

import store from "@/store/store.js";
import API from '@/api/api.js';
import getParam from '@/util/getParam.js'
import entityToString from '@/util/entityToString.js';
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
                        <ul><li><NavLink exact to='/' activeStyle={{color: '#4d93ea'}}>信披承诺</NavLink></li>
                            <li><NavLink to='/information' activeStyle={{color: '#4d93ea'}}>机构信息</NavLink></li>
                            <li><NavLink to='/service' activeStyle={{color: '#4d93ea'}}>业务模式</NavLink></li>
                            <li><NavLink to='/safe' activeStyle={{color: '#4d93ea'}}>安全保障</NavLink></li>
                            <li><NavLink to='/honor' activeStyle={{color: '#4d93ea'}}>荣誉资质</NavLink></li>
                            <li><NavLink to='/data' activeStyle={{color: '#4d93ea'}}>平台数据</NavLink></li>
                            <li><NavLink to='/news' activeStyle={{color: '#4d93ea'}}>新闻与公告</NavLink></li>
                        </ul>
                    </div>
                </div>
                <Route exact path="/" component={Promise}></Route>
                <Route exact path="/information" component={Information}></Route>
                <Route exact path="/service" component={Service}></Route>
                <Route path="/safe" component={Safe}></Route>
                <Route exact path="/honor" component={Honor}></Route>
                <Route exact path="/data" component={Data}></Route>
                <Route path="/news" component={News}></Route>
            </div>

        )
    }
}

class Promise extends Component{
    render(){
        return <div style={{marginBottom:'80px'}} className="content">
            <img style={{display:'block',margin:'0 auto',width:'561px',height:'550px'}} src="https://images.51rz.com/images/rebuild/info/promise.png" alt=""/>
        </div>
    }
}

//机构信息
class Information extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nowActive: 0
        }
    }

    render() {
        const {nowActive, stretch} = this.state
        const navs = ['组织信息', '财务信息', '平台信息', '重大事项信息', '备案信息'].map((item, index) => {
            return <li className={nowActive == index && "active"} key={index}>
                <a className={nowActive == index && "active"} onClick={() => {
                    this.setState({
                        nowActive: index
                    })
                }}>{item}</a>
            </li>
        })

        const contentList = [
            <Organization/>,
            <Finance/>,
            <Platform/>,
            <Important/>,
            <Record/>
        ]

        return (
            <div className="content">
                <div className="newtab" style={{marginBottom: '49px'}}>
                    <ul className="newstab">
                        {navs}
                    </ul>
                </div>
                {contentList[nowActive]}
            </div>
        )
    }
}
//组织信息
class Organization extends Component {
    constructor() {
        super();
    }

    render() {
        const organization = [
            {
                title: '全称及简称',
                content: '浙江人众金融服务股份有限公司（简称：人众金服）'
            },
            {
                title: '统一社会信用代码',
                content: '91330000064189906G'
            },
            {
                title: '公司注册资本',
                content: '6945万元人民币'
            },
            {
                title: '实缴注册资本',
                content: '6945万元人民币'
            },
            {
                title: '法定代表人',
                content: '李敏'
            },
            {
                title: '成立日期',
                content: '2013年03月28日'
            },
            {
                title: '公司经营期限',
                content: '2013年03月28日至长期'
            },
            {
                title: '公司经营状态',
                content: '开业'
            },
            {
                title: '注册地址',
                content: '浙江省杭州市西湖区学院路28-38号1幢德力西大厦1号楼2501室'
            },
            {
                title: '经营地址',
                content: '浙江省杭州市西湖区学院路28-38号1幢德力西大厦1号楼2501室'
            },
            {
                title: '经营范围',
                content: '投融资信息咨询服务，科技项目中介服务，软件技术咨询，信息服务，以服务外包方式从事票据中介服务（不含承兑等银行核心业务），接受金融机构委托从事金融技术外包、业务流程外包，实业投资，资产管理，投资管理，财务咨询。',
                style: {
                    lineHeight: '22px',
                    width: 726,
                    paddingTop: '22px',
                    paddingBottom: '22px',
                }
            },
            {
                title: '股东信息',
                content: <ul className="constrcutor">
                    <li>
                        李敏（实际控制人）<br/>持股56.9942%
                    </li>
                    <li>
                        杭州众硕投资管理合伙企业（有限合伙）持股15%
                    </li>
                    <li>
                        江苏省中电华通网络服务有限公司持股17.9986%
                    </li>
                    <li>
                        杭州立元宸皓投资合伙企业（有限合伙）持股10.0072%
                    </li>
                </ul>,
                style: {marginLeft: '334px'}
            },
            {
                title: '组织架构',
                content: <img src="https://images.51rz.com/images/rebuild/pic/xp-pic2.png" alt="" className="zzjg"/>,
                style: {marginLeft: '334px'}
            },
        ]
        const organization1 = [
            {
                title: '分支机构全称',
                content: '无'
            },
            {
                title: '分支机构所在地',
                content: '无'
            },
            {
                title: '分支机构成立时间',
                content: '无'
            },
            {
                title: '分支机构负责人',
                content: '无'
            },
            {
                title: '分支机构联系电话',
                content: '无'
            },
            {
                title: '分支机构投诉电话',
                content: '无'
            },
            {
                title: '分支机构员工人数',
                content: '无'
            },
            {
                title: '与保险机构、担保机构等各类涉及个体网络借贷业务相关的第三方机构合作情况',
                content: '无',
                titleStyle: {
                    paddingRight: '75px',
                    lineHeight: '30px',
                    paddingTop: '20px',
                    paddingBottom: '20px',
                },
                style: {
                    lineHeight: '130px',
                }
            },
            {
                title: '从业机构主要人员简介',
                content: <div style={{paddingTop: '20px'}}>董事长兼法人：李敏<br/>中南民族大学法学硕士，资深执业律师。2008年在上海首融律师事务所担任律师期间，涉入银行票据业务和不良资产处置，积累了丰富的投融资经验。2013年起毅然投身互联网金融创新行业，创办浙江人众金融服务股份有限公司，带领团队研发出“互联网+供应链金融”服务模型，被业内誉为国内供应链金融领域新锐领军人物和实战专家，人众金服亦发展成为国内领先和专业的供应链金融平台。<br/>总经理：薛刚<br/>现任人众金服CEO，负责公司整体的管理工作。毕业于杭州电子科技大学，曾先后于浙江核新同花顺网络信息股份有限公司担任营销总监，杭州鑫合汇网络科技有限公司担任市场总监，杭州金投行金融资产服务有限公司旗下国资平台担任集团总助，并于
                    2013年参与国内知名平台鑫合汇的创建，在业内享有良好口碑，在互联网金融领域拥有丰富的实战经验和管理经验。<br/>副总经理：李卫兵<br/>现任人众金服COO，负责平台整体的运营工作。毕业于东华理工大学，具有10年以上的互联网从业经验，曾在杭州投融界网络信息有限公司、深圳大赢家网络有限公司等知名企业担任运营总监，尤其擅长推广渠道的优化和产品体验的改进升级。<br />财务负责人：刘帅<br />中共党员，现任人众金服财务总监，毕业于江西财经大学会计学专业，10余年财务管理及资金运营从业经验，曾先后供职于大型企业集团及互联网金融公司，对全面预算管理、资金结算、税务筹划方面有着丰富的管理经验。
                </div>,
                style: {
                    width: '726px',
                    lineHeight: '26px'
                }
            }
        ]
        const organizationContent = organization.map((v, i) => {
            return <li key={i}>
                <span className="c1" style={{position: 'absolute', top: 0, left: 0}}>{v.title}</span>
                <span className="c2" style={{...v.style, marginLeft: '334px'}}>{v.content}</span>
            </li>
        })
        const organizationContent1 = organization1.map((v, i) => {
            return <li key={i}>
                <span className="c1" style={{...v.titleStyle}}>{v.title}</span>
                <span className="c2" style={{...v.style}}>{v.content}</span>
            </li>
        })
        return (
            <div>
                <div className="contenttitle">
                    ——&nbsp;&nbsp;&nbsp;&nbsp;组织信息&nbsp;&nbsp;&nbsp;&nbsp;——
                </div>
                <div className="banner">
                    <ul className="img" ref="img">
                        <div className="shadow" style={{paddingTop: '44px'}}>
                            <img src="https://images.51rz.com/images/rebuild/honor/honor1.jpg" alt=""/>
                        </div>
                        <img src="https://images.51rz.com/images/rebuild/honor/honor2.png" alt=""/>
                        <img src="https://images.51rz.com/images/rebuild/honor/honor3.png" alt=""/>
                    </ul>
                </div>
                <ul className="details">
                    {organizationContent}
                    <li>
                        <span className="c1" style={{position: 'absolute', top: 0, left: 0}}>从业人员概况</span>
                        <span className="c2"
                              style={{marginLeft: '334px', paddingBottom: '22px', display: 'block', float: 'none'}}>
                               <p style={{marginTop: '15px'}}>截止到2018年2月28日，信息如下：</p>
                            <p>1. 正式人员：135人</p>
                            <p>2.劳务派遣和临时聘用人员：3人</p>
                            <div style={{display: 'block', lineHeight: '26px', height: '190px'}}>
                                <span style={{color: '#555', display: 'block', float: 'left'}}>
                                    <p style={{marginBottom: '20px'}}>3.年龄分布：</p>
                                    <img src="https://images.51rz.com/images/rebuild/honor/age.png" alt=""/>
                                    <p style={{float: 'right', margin: '20px 0 0 20px'}}>
                                        <h6>25岁以下</h6>
                                        <h6 className="level1">25岁（含）到30岁</h6>
                                        <h6 className="level2">30岁（含）到35岁</h6>
                                        <h6 className="level3">35岁（含）及以上</h6>
                                    </p>

                                </span>
                                <span style={{color: '#555', display: 'block', float: 'left', marginLeft: '100px'}}>
                                    <p style={{marginBottom: '20px'}}>4.学历分布：</p>
                                    <img src="https://images.51rz.com/images/rebuild/honor/education.png" alt=""/>
                                    <p style={{float: 'right', margin: '20px 0 0 20px'}}>
                                    <h6>硕士</h6>
                                    <h6 className="level1">本科</h6>
                                    <h6 className="level2">其他</h6>
                                    </p>
                                </span>

                        </div>
                         </span>


                    </li>
                    {organizationContent1}
                </ul>
            </div>
        )
    }
}
//财务信息
class Finance extends Component {
    constructor() {
        super();
        this.state = {
            stretch: false,
            imgUrl: '',
            display: false
        }
    }

    showDetail = (imgUrl) => {
        this.setState({
            imgUrl,
            display: true
        })
    }

    render() {
        const {stretch, display, imgUrl} = this.state
        const auditReport = [
            {
                imgUrl: 'https://images.51rz.com/images/rebuild/audit/balance.png',
                content: '资产负债表',
                imgDetail: 'https://images.51rz.com/images/rebuild/audit/balance.png'
            },
            {
                imgUrl: 'https://images.51rz.com/images/rebuild/audit/profit.png',
                content: '利润表',
                imgDetail: 'https://images.51rz.com/images/rebuild/audit/profit.png'
            },
            {
                imgUrl: 'https://images.51rz.com/images/rebuild/audit/cashflow.png',
                content: '现金流量表',
                imgDetail: 'https://images.51rz.com/images/rebuild/audit/cashflow.png'
            },
            {
                imgUrl: 'https://images.51rz.com/images/rebuild/audit/audit1.png',
                content: '审计报告书_审计意见1',
                imgDetail: 'https://images.51rz.com/images/rebuild/audit/audit1.png'
            },
            {
                imgUrl: 'https://images.51rz.com/images/rebuild/audit/audit2.png',
                content: '审计报告书_审计意见2',
                imgDetail: 'https://images.51rz.com/images/rebuild/audit/audit2.png'
            },
        ]
        const reportList = auditReport.map((v, i) => {
            return (
                <div key={i} className="audit" onClick={() => {
                    this.showDetail(v.imgDetail)
                }}>
                    <div className="img">
                        <img src={v.imgUrl} alt=""/>
                        <div className="img_mask"></div>
                    </div>
                    <p>{v.content}</p>
                </div>
            )
        })
        return <div className="financial">
            <div className="contenttitle">
                ——&nbsp;&nbsp;&nbsp;&nbsp;财务信息&nbsp;&nbsp;&nbsp;&nbsp;——
            </div>
            <ul className="details">
                <li>
                    <span className="c1">重要融资与负债信息</span>
                    <span className="c2">杭州立元宸皓投资合伙企业（有限合伙）5000万  股份占比10.0072%</span>
                </li>
                <li>
                    <span className="c1">重点环节审计结果</span>
                    <span className="c2">会计师事务所审计出具中</span>
                </li>
                <li>
                    <span className="c1">合规性审查报告</span>
                    <span className="c2">律师事务所审查出具中</span>
                </li>
                <li>
                    <span className="c1" style={{position: 'absolute', left: 0, top: 0}}>财务审计报告</span>
                    <span className="c2" style={{marginLeft: '334px', paddingTop: '30px', paddingBottom: '54px'}}>
                                {reportList}
                            </span>
                </li>
            </ul>
            <div className="mask" style={{display: display ? 'block' : 'none'}}>
                <div className="mask_con">
                    <img src="https://images.51rz.com/images/rebuild/pc/img/cancle.png" alt="" className="cancle" onClick={() => {
                        this.setState({
                            display: false
                        })
                    }
                    }/>
                    <img src={imgUrl} alt=""/>
                </div>
            </div>
        </div>
    }
}
//平台信息
class Platform extends Component {
    constructor() {
        super();
    }

    render() {
        const organization = [
            {
                title: '网站或平台地址',
                content: 'https://www.51rz.com'
            },
            {
                title: '平台上线运营时间',
                content: '2013年4月27日正式上线运营'
            },
            {
                title: '咨询、投诉、举报联系电话、电子邮箱、通讯地址',
                content: <div>客服电话：400-655-8858<br/>联系电话：0571-56583188<br/>电子邮箱：server@51rz.com<br/>通讯地址：杭州市学院路28号德力西大厦1号楼25层
                </div>,
                titleStyle: {
                    paddingRight: '75px',
                    lineHeight: '30px',
                    paddingTop: '20px'
                },
                style: {
                    lineHeight: '24px',
                    paddingTop: '22px',
                    paddingBottom: '22px'
                }
            },
            {
                title: '注册协议模板',
                content: <a href="/zctk.html" target="_blank">注册协议 >></a>
            },
            {
                title: '平台APP应用',
                content: <img src="https://images.51rz.com/images/rebuild/pc/img/platformapp.png" alt=""/>,
                style: {
                    paddingTop: '22px',
                    paddingBottom: '22px',
                }
            },
            {
                title: '公众号',
                content: <div>官方订阅号：renzhongjinfuimg<img style={{display: 'block'}} src="https://images.51rz.com/images/rebuild/pc/img/platformpublic.png"
                                                         alt=""/></div>,
                style: {
                    paddingBottom: '22px',
                }
            },
            {
                title: '微博',
                content: <div>人众金服官微：<a href="https://weibo.com/51RZjf" target="_blank">http://weibo.com/51RZjf</a>
                </div>,
                style: {
                    paddingBottom: '22px',
                }
            },
        ]
        const organizationContent = organization.map((v, i) => {
            return <li key={i}>
                <span className="c1"
                      style={{...v.titleStyle, width: '334px', position: 'absolute', top: 0, left: 0}}>{v.title}</span>
                <span className="c2" style={{...v.style, marginLeft: '334px'}}>{v.content}</span>
            </li>
        })
        return (
            <div>
                <div className="contenttitle">
                    ——&nbsp;&nbsp;&nbsp;&nbsp;平台信息&nbsp;&nbsp;&nbsp;&nbsp;——
                </div>
                <ul className="details">
                    {organizationContent}
                </ul>
            </div>
        )
    }
}
//重大事项
class Important extends Component {
    constructor() {
        super();
        this.state = {
            freshDate: ''
        }
    }

    async componentDidMount() {
        const time = await API.get(API.nowDate)
        const freshDate = this.getDate(time)
        this.setState({
            freshDate
        })
    }

    getDate = (time) => {
        const date = new Date(time)
        if (date.getDate() >= 5) {
            return `${date.getFullYear()}.${date.getMonth() + 1}.5`
        } else {
            if (date.getMonth() === 0) {
                return `${date.getFullYear() - 1}.12.5`
            } else {
                return `${date.getFullYear()}.${date.getMonth()}.5`
            }
        }
    }

    render() {
        const organization = [
            {
                title: '减资、合并、分立、解散或者申请破产',
                content: '无',
                titleStyle: {
                    paddingRight: '75px',
                    lineHeight: '30px',
                    paddingTop: '20px',
                    paddingBottom: '20px',
                },
                style: {
                    lineHeight: '24px',
                    paddingTop: '22px'
                }
            },
            {
                title: '破产程序',
                content: '无'
            },
            {
                title: '停业、整顿、关闭',
                content: '无'
            },
            {
                title: '从业机构受到刑事处罚',
                content: '无'
            },
            {
                title: '从业机构受到重大行政处罚的情况描述',
                content: '无',
                titleStyle: {
                    paddingRight: '75px',
                    lineHeight: '30px',
                    paddingTop: '20px',
                    paddingBottom: '20px',
                },
                style: {
                    lineHeight: '24px',
                    paddingTop: '22px'
                }
            },
            {
                title: '公司法定代表人、持股5%以上的股东、实际控制人、主要负责人、董事、监事、高级管理人员的变更信息',
                content: <div>无变更<br/>更新日期：{this.state.freshDate}</div>,
                titleStyle: {
                    paddingRight: '75px',
                    lineHeight: '30px',
                    paddingTop: '20px',
                    paddingBottom: '20px',
                },
                style: {
                    lineHeight: '24px',
                    paddingTop: '22px'
                }
            },
            {
                title: '法定代表人、持股5%以上的股东、实际控制人、主要负责人、董事、监事、高级管理人员涉及的重大诉讼、仲裁',
                content: <div>无<br/>更新日期：{this.state.freshDate}</div>,
                titleStyle: {
                    paddingRight: '75px',
                    lineHeight: '30px',
                    paddingTop: '20px',
                    paddingBottom: '20px',
                },
                style: {
                    lineHeight: '24px',
                    paddingTop: '22px'
                }
            },
            {
                title: '主要或全部业务陷入停顿',
                content: '无'
            },
            {
                title: '欺诈、损害出借人利益等其他重大事项',
                content: '无',
                titleStyle: {
                    paddingRight: '75px',
                    lineHeight: '30px',
                    paddingTop: '20px',
                    paddingBottom: '20px',
                },
                style: {
                    lineHeight: '24px',
                    paddingTop: '22px'
                }
            },

        ]
        const organizationContent = organization.map((v, i) => {
            return <li key={i}>
                <span className="c1"
                      style={{...v.titleStyle, width: '334px',}}>{v.title}</span>
                <span className="c2" style={{...v.style}}>{v.content}</span>
            </li>
        })
        return (
            <div>
                <div className="contenttitle">
                    ——&nbsp;&nbsp;&nbsp;&nbsp;重大事项信息&nbsp;&nbsp;&nbsp;&nbsp;——
                </div>
                <ul className="details">
                    {organizationContent}
                </ul>
            </div>
        )
    }
}
//备案信息
class Record extends Component {
    constructor() {
        super();
        this.state = {
            display: false
        }
    }

    showDetail = () => {
        this.setState({
            display: true
        })
    }

    render() {
        const {display, imgUrl} = this.state
        const organization = [
            {
                title: '备案登记地方金融监管部门',
                content: '登记备案进行中',
            },
            {
                title: '备案登记时间',
                content: '登记备案进行中'
            },
            {
                title: '备案登记编号',
                content: '登记备案进行中'
            },
            {
                title: '电信业务经营许可信息',
                content: '浙ICP备13009823号-1'
            },
            {
                title: '资金存管信息',
                content: <div>名称：北京银行<br/>签约时间：2017年3月<br/>全量业务上线时间：2017年4月24号</div>,
                titleStyle: {
                    position: 'absolute',
                    top: '0',
                    left: '0'
                },
                style: {
                    lineHeight: '24px',
                    paddingTop: '22px',
                    paddingBottom: '22px',
                    marginLeft: '334px'
                }
            },
            {
                title: '网站备案图标及编号',
                content: <div>公安备案号：<a
                    href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010602002203">33010602002203</a>
                </div>
            },
            {
                title: '信息安全测评认证信息',
                content: <div>认证机构：中华人民共和国公安部<br/>
                    认证结果：信息系统安全等级保护备案证明（三级）<br/>
                    <div className="audit" style={{width: '280px', height: '198px', marginTop: '13px'}}>
                        <div className="img" style={{width: '280px', height: '198px'}}>
                            <img src="https://images.51rz.com/images/rebuild/honor/honor1.jpg" alt=""/>
                            <div className="img_mask" onClick={() => {
                                this.setState({
                                    display: true
                                })
                            }
                            }></div>
                        </div>
                    </div>
                </div>,
                titleStyle: {
                    position: 'absolute',
                    top: '0',
                    left: '0',
                },
                style: {
                    lineHeight: '24px',
                    paddingTop: '22px',
                    paddingBottom: '22px',
                    marginLeft: '334px'
                }
            },

            {
                title: '风险管理架构',
                content: <div>
                    <img src="https://images.51rz.com/images/rebuild/pic/xp-pic.png" alt=""/>
                </div>,
                titleStyle: {
                    position: 'absolute',
                    top: '0',
                    left: '0',
                },
                style: {
                    lineHeight: '24px',
                    paddingTop: '22px',
                    paddingBottom: '22px',
                    marginLeft: '334px'
                }
            },
            {
                title: '风险评估流程',
                content: <div>
                    <img src="https://images.51rz.com/images/rebuild/pic/xp-pic1.png" alt=""/>
                </div>,
                titleStyle: {
                    position: 'absolute',
                    top: '0',
                    left: '0',
                },
                style: {
                    lineHeight: '24px',
                    paddingTop: '22px',
                    paddingBottom: '22px',
                    marginLeft: '334px'
                }
            },
            {
                title: '风险预警管理',
                content: <div>
                    通过控制商户商流、物流、资金流、信息流四大数据交叉管控，通过动态监控商户业务规模、财务数据、资产质量、舆情监控等情况，实施风险预警，考虑暂停发行或停止合作。
                </div>,
                titleStyle: {
                    position: 'absolute',
                    top: '0',
                    left: '0'
                },
                style: {
                    lineHeight: '24px',
                    paddingTop: '22px',
                    paddingBottom: '22px',
                    marginLeft: '334px'
                }
            },
            {
                title: '催收方式',
                content: <div>
                    短信：根据不同标的，到期前和逾期后进行不同频次的短信提醒。<br />电话：根据不同标的，到期前和逾期后进行不同频次的电话提醒还款或催促还款。<br />委托外部机构：根据借款人情况，决定是否委托给专业合法的第三方催收机构进行催收。
                </div>,
                titleStyle: {
                    position: 'absolute',
                    top: '0',
                    left: '0'
                },
                style: {
                    lineHeight: '24px',
                    paddingTop: '22px',
                    paddingBottom: '22px',
                    marginLeft: '334px'
                }
            },

        ]
        const organizationContent = organization.map((v, i) => {
            return <li key={i}>
                <span className="c1"
                      style={{...v.titleStyle, width: '334px',}}>{v.title}</span>
                <span className="c2" style={{...v.style}}>{v.content}</span>
            </li>
        })
        return <div className="financial">
            <div className="contenttitle">
                ——&nbsp;&nbsp;&nbsp;&nbsp;备案信息&nbsp;&nbsp;&nbsp;&nbsp;——
            </div>
            <ul className="details">
                {organizationContent}
            </ul>
            <div className="mask" style={{display: display ? 'block' : 'none'}}>
                <div className="mask_con" style={{width: '866px', height: '613px'}}>
                    <img src="https://images.51rz.com/images/rebuild/pc/img/cancle.png" alt="" className="cancle" onClick={() => {
                        this.setState({
                            display: false
                        })
                    }
                    }/>
                    <img src="https://images.51rz.com/images/rebuild/honor/honor1.jpg" alt=""
                         style={{width: 'auto', height: 'auto'}}/>
                </div>
            </div>
        </div>
    }
}


//业务模式
class Service extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="content" style={{marginBottom: '80px'}}>
                <div className="s_d">
                    <div className="s_detail">
                    人众金服精准定位产业互联网金融，深耕供应链金融及消费金融领域，构筑互联网金融与企业、商品（服务）供应链、消费等互利共存、持续发展的良好产业生态。致力为用户提供更加优质、高效、安全的网络借贷信息中介服务。
                    </div>
                    <div className="s_title"><span>供应链金融模型图</span></div>
                    <img src="https://images.51rz.com/images/rebuild/pc/img/s_1.png" alt="" className="img1"/>
                    <div className="s_title"><span>消费金融模型图</span></div>
                    <img src="https://images.51rz.com/images/rebuild/pc/img/s_2.png" alt="" style={{marginBottom: '85px'}}/>
                </div>
            </div>
        )
    }
}

//安全保障
class Safe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rotate: 1,
            rotateDesc: 0
        }
    }

    componentDidUpdate() {
        this.anchor(location.href.split('=')[1])
    }

    anchor = (anchorName) => {
        if (anchorName) {
            // anchorName.scrollIntoView();
            // 找到锚点
            let anchorElement = document.getElementById(anchorName);
            // console.log(anchorElement)
            // 如果对应id的锚点存在，就跳转到锚点
            if (anchorElement) {
                anchorElement.scrollIntoView();
            }
        }
    }

    rotate = (dir) => {
        this.setState({
            rotate: dir + 1,
        })
    }

    rotateDesc = (dir) => {
        this.setState({
            rotateDesc: dir,
        })
    }

    render() {
        const {rotate, rotateDesc} = this.state
        const provide = [
            {
                class: 'circle top',
                imgUrl: 'https://images.51rz.com/images/rebuild/pc/img/detail1.png',
                firstP: '智能大数据',
                secondP: '全程风控'
            },
            {
                class: 'circle left',
                imgUrl: 'https://images.51rz.com/images/rebuild/pc/img/detail2.png',
                firstP: '风险预警',
                secondP: '贷后风险'
            },
            {
                class: 'circle bottom',
                imgUrl: 'https://images.51rz.com/images/rebuild/pc/img/detail3.png',
                firstP: '四流数据',
                secondP: '实时管控'
            },
            {
                class: 'circle right',
                imgUrl: 'https://images.51rz.com/images/rebuild/pc/img/detail4.png',
                firstP: '“1+4”银行级',
                secondP: '贷前风控'
            },
        ]
        const provideList = provide.map((v, i) => {
            return <div key={i} className={`${v.class} ${rotate == i + 1 && 'active'} rotate${rotate}`} onClick={() => {
                this.rotate(i);
            }} ref="left">
                <img src={v.imgUrl} alt=""/>
                <p>{v.firstP}</p>
                <p>{v.secondP}</p>
            </div>
        })
        const desc = [
            {
                class: 'circle left',
                imgUrl: 'https://images.51rz.com/images/rebuild/pc/img/detail3.png',
                firstP: '真实交易应用',
                secondP: '场景甄别风控'
            },
            {
                class: 'circle top',
                imgUrl: 'https://images.51rz.com/images/rebuild/pc/img/detail2.png',
                firstP: '大数据',
                secondP: '综合风控'
            },
            {
                class: 'circle right',
                imgUrl: 'https://images.51rz.com/images/rebuild/pc/img/detail1.png',
                firstP: '动态风险预警',
                secondP: '实时风控'
            },
            {
                class: 'circle bottom',
                imgUrl: 'https://images.51rz.com/images/rebuild/pc/img/detail4.png',
                firstP: '多维用户画像',
                secondP: '方式贷前征信'
            },
        ]
        const descList = desc.map((v, i) => {
            return <div key={i} className={`${v.class} ${rotateDesc == i && 'active'} rotate${rotateDesc}`}
                        onClick={() => {
                            this.rotateDesc(i);
                        }} ref="left">
                <img src={v.imgUrl} alt=""/>
                <p>{v.firstP}</p>
                <p>{v.secondP}</p>
            </div>
        })
        const navArr = ['资金安全', '风控体系', '技术保障'];//法律保障
        const navList = navArr.map((v, i) => {
            return <li key={i} onClick={() => {
                this.anchor(`safe${i}`);
            }}>
                <a href="javascript:void(0)" name>
                    <div className="safetabbg"></div>
                    <p>{v}</p>
                </a>
            </li>
        });
        const rightNav = navArr.map((v, i) => {
            return <li key={i} onClick={() => {
                this.anchor(`safe${i}`);
            }}>{v}</li>
        })
        return (
            <div className="safebox">
                <div className="safetabbox">
                    <ul className="safetab">
                        {navList}
                    </ul>
                </div>
                <div className="safecontent">
                    <a id="safe0" name="safe1"></a>
                    <div className="safe1">
                        <div className="safetitle">
                            <img src="https://images.51rz.com/images/rebuild/pc/img/safetitle1.png" alt=""/>
                        </div>
                        <ul>
                            {/* <li>
                                <h3>银行存管</h3>
                                <p>人众金服携手存管银行，成功上线银行存管系统，银行对用户资金进行独立管理与监督，平台无法触碰，实现平台资金与用户资金隔离。<a href="bankxq.html" target="_blank">了解银行存管</a>
                                </p>
                            </li> */}
                            {/* <li>
                                <h3>千万保证金</h3>
                                <p>开设上千万元风险保证金账户，根据平台放款额逐步追加风险保证金，保障投资安全。</p>
                            </li> */}
                            <li>
                                <h3>公安部三级安全信息备案</h3>
                                <p>2016年12月，通过国家公安部监制信息安全等级保护三级安全备案，规范自身，为投资者创造安全、健康、规范、便捷的互联网环境。</p>
                            </li>
                            {/* <a id="safe3" name="safe4"></a> */}
                            <li>
                                <h3>ICP许可证获批</h3>
                                <p>正式获批ICP许可证（增值电信业务经营许可证）平台运营资质获得权威认可，实现平台合规稳健经营，顺应监管，合规合法，争做行业标杆性品牌。</p>
                            </li>
                        </ul>
                    </div>

                    <a id="safe1" name="safe2"></a>
                    <div className="safe2">
                        <div className="safetitle">
                            <img src="https://images.51rz.com/images/rebuild/pc/img/safetitle2.png" alt=""/>
                        </div>
                        <h3>—— <span>供应链金融</span> ——</h3>
                        <p>
                            专注于供应链金融风控，切入供应链交易环节，通过严格的“1+4”银行标准贷前风控，时时监控的贷中、贷后管理及国内首创专属监管仓，结合交易场景+大数据+区块链+金融创新，实现全流程智能动态风控，将风险止于源头。</p>
                        <div className="gy">
                            <div className={"circlebox rotate" + rotate} ref="circlebox">
                                {provideList}
                            </div>
                            <div className="detail">
                                <div className={`detailcon detailtop ${rotate == 1 && 'active'}`} id="dtop">
                                    <img src="https://images.51rz.com/images/rebuild/pc/img/detailtop.png" alt=""/>
                                </div>
                                <div className={`detailcon detailleft ${rotate == 2 && 'active'}`} id="left">
                                    <img src="https://images.51rz.com/images/rebuild/pc/img/detailleft.png" alt=""/>
                                </div>
                                <div className={`detailcon detailbottom ${rotate == 3 && 'active'}`} id="bottom">
                                    <img src="https://images.51rz.com/images/rebuild/pc/img/detailbottom.png" alt=""/>
                                </div>
                                <div className={`detailcon detailright ${rotate == 4 && 'active'}`} id="right">
                                    <img src="https://images.51rz.com/images/rebuild/pc/img/detailright.png" alt=""/>
                                </div>


                            </div>
                        </div>

                        <h3 style={{marginTop: 78}}>—— <span>消费金融</span> ——</h3>
                        <p>消费金融风控，应用场景+互联网金融大数据智能风控系统，多数据通道互备互补，强大的覆盖能力，满足各类消费金融的征信及风控需求。</p>
                        <div className="gy xqgy">
                            <div className="detail">
                                <div className={`detailcon detailright ${rotateDesc == 2 && 'active'}`} id="xfright"
                                     style={{marginLeft: 34, marginTop: 150}}>
                                    <img src="https://images.51rz.com/images/rebuild/pc/img/xfdetail3.png" alt=""/>
                                </div>
                                <div className={`detailcon detailleft ${rotateDesc == 0 && 'active'}`} id="xfleft"
                                     style={{marginLeft: 34, marginTop: 43}}>
                                    <img src="https://images.51rz.com/images/rebuild/pc/img/xfdetail1.png" alt=""/>
                                </div>
                                <div className={`detailcon detailbottom ${rotateDesc == 3 && 'active'}`} id="xfbottom"
                                     style={{marginLeft: 34, marginTop: 43}}>
                                    <img src="https://images.51rz.com/images/rebuild/pc/img/xfdetail2.png" alt=""/>
                                </div>
                                <div className={`detailcon detailtop ${rotateDesc == 1 && 'active'}`} id="xfdtop"
                                     style={{marginLeft: 282, marginTop: 72}}>
                                    <img src="https://images.51rz.com/images/rebuild/pc/img/xfdetail4.png" alt=""/>
                                </div>
                            </div>
                            <div className={`circlebox rotate${rotateDesc}`} ref="xfcirclebox" style={{float: 'right'}}>
                                {descList}
                            </div>
                        </div>
                    </div>

                    <a id="safe2" name="safe3"></a>
                    <div className="safe4">
                        <div className="safetitle">
                            <img src="https://images.51rz.com/images/rebuild/pc/img/safetitle4.png" alt=""/>
                        </div>
                        <ul className="safe4con">
                            <li>
                                <div className="licon">
                                    <h4>银行级安全</h4>
                                    <div className="safe4icon">
                                        <img src="https://images.51rz.com/images/rebuild/pc/img/safeicon1.png" alt=""/>
                                    </div>
                                    <p>采用与央行同级别加密技术体系，使用阿里云服务器，24小时监控，实时备份，防黑客、抗攻击，防dos模块，确保平台安全稳定；
                                        使用Https技术、128位SSL传输加密技术，不间断的确保交易数据安全。</p>
                                </div>
                            </li>
                            <li>
                                <div className="licon">
                                    <h4>高负载性能</h4>
                                    <div className="safe4icon">
                                        <img src="https://images.51rz.com/images/rebuild/pc/img/safe4icon2.png" alt=""/>
                                    </div>
                                    <p>Linux架构+缓存技术+服务器分布式布置，多重权限管理体系，严格保护投资人的信息安全。</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <ul className="fix">
                    {rightNav}
                </ul>
            </div>
        )
    }
}


//荣誉资质
class Honor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 4,
            display: false,
        }
    }

    componentDidUpdate() {
        var Swip = new Swiper('#h .swiper-container', {
            effect: 'flip',
            initialSlide: this.state.current,
            grabCursor: true,
            nextButton: '#h .swiper-button-next',
            prevButton: '#h .swiper-button-prev'
        });
    }

    render() {
        const arr = [
            {
                img: 'https://images.51rz.com/images/rebuild/pc/img/h2_1.png',
                title: '杭州跨境电子商务——副会长单位'
            },
            {
                img: 'https://images.51rz.com/images/rebuild/pc/img/h2_2.png',
                title: '互联网金融百强企业'
            },
            {
                img: 'https://images.51rz.com/images/rebuild/pc/img/h2_3.png',
                title: '互联网金融创新平台奖'
            },
            {
                img: 'https://images.51rz.com/images/rebuild/pc/img/h2_4.png',
                title: '互联网金融人气平台奖'
            },
            {
                img: 'https://images.51rz.com/images/rebuild/pc/img/h2_5.png',
                title: '互联网金融行业实名示范网站认证'
            },
            {
                img: 'https://images.51rz.com/images/rebuild/pc/img/h2_6.png',
                title: '浙江省企业理财协会—融资租赁\n（互联网金融）专业委员会'
            },
            {
                img: 'https://images.51rz.com/images/rebuild/pc/img/h2_7.png',
                title: '可信网站验证单位'
            },
            {
                img: 'https://images.51rz.com/images/rebuild/pc/img/h2_8.png',
                title: '浙江互联网金融联合会-会员单位'
            },
            {
                img: 'https://images.51rz.com/images/rebuild/pc/img/h2_9.png',
                title: '中国金融管理协会—副会长单位 '
            },
            {
                img: 'https://images.51rz.com/images/rebuild/pc/img/h2_10.png',
                title: '“来益杯”2016创客大赛—优胜奖'
            },
            {
                img: 'https://images.51rz.com/images/rebuild/pc/img/h2_11.png',
                title: '2016中国（杭州）互联网金融博览会—\n行业合作伙伴'
            },
            {
                img: 'https://images.51rz.com/images/rebuild/pc/img/h2_12.png',
                title: '浙江省十佳互联网金融平台'
            },
            {
                img: 'https://images.51rz.com/images/rebuild/pc/img/h2_13.png',
                title: '浙商创新服务奖 '
            },
            {
                img: 'https://images.51rz.com/images/rebuild/pc/img/h2_14.png',
                title: '中国FinTech-2017年度最佳新锐企业'
            },
        ]
        const imgs = arr.map((v, i) => {
            return (
                <li key={i} onClick={() => {
                    this.setState({
                        current: i,
                        display: true
                    })

                }}>
                    <img src={v.img} alt=""/>
                    <div className="h2_title">
                        <pre>{v.title}</pre>
                    </div>
                </li>
            )
        });
        const lunbo = arr.map((v, i) => {
            return <div key={i} className="swiper-slide"
                        style={{
                            backgroundImage: 'url(' + v.img + ')',
                            width: '527px',
                            h: '343px',
                            zIndex: 6,
                            transform: 'translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg)'
                        }}>
                <div className="swiper-slide-shadow-left" style={{opacity: 0}}></div>
                <div className="swiper-slide-shadow-right" style={{opacity: 0}}></div>
            </div>

        });
        return (
            <div className="content">
                <div className="contenttitle" style={{marginBottom: '39px'}}>
                    ——&nbsp;&nbsp;&nbsp;&nbsp;资质证书&nbsp;&nbsp;&nbsp;&nbsp;——
                </div>
                <div className="honor1">
                    <img src="https://images.51rz.com/images/rebuild/honor/h1.png" alt=""/>
                    <img src="https://images.51rz.com/images/rebuild/honor/h2.png" alt=""/>
                    <img src="https://images.51rz.com/images/rebuild/honor/h3.png" alt=""/>
                </div>
                <div className="contenttitle" style={{marginBottom: '39px'}}>
                    ——&nbsp;&nbsp;&nbsp;&nbsp;荣誉证书&nbsp;&nbsp;&nbsp;&nbsp;——
                </div>
                <ul className="honor2">
                    {imgs}
                    <li></li>
                    <li></li>
                </ul>
                <div id="h" style={{display: this.state.display ? 'block' : 'none'}} onClick={() => {
                    this.setState({
                        display: false
                    });
                }}>
                    <div onClick={(e) => {
                        e.stopPropagation()
                    }}
                         className="swiper-container swiper-container-horizontal swiper-container-3d swiper-container-flip"
                         style={{cursor: '-webkit-grab'}}>
                        <div className="swiper-wrapper">
                            {lunbo}
                        </div>
                        <div className="swiper-button-prev swiper-button-disabled"></div>
                        <div className="swiper-button-next"></div>
                    </div>
                </div>
            </div>
        )
    }
}

//平台数据
class Data extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num17: 0,//17年轮播页数
            num18: 0,
            platformData: {},
            circle: [
                {num: 123432, color: '#ff768f'},//累计借款人数量
                {num: 32321, color: '#8cb2f2'},//当前借款人数量
            ],
            circle1: [
                {num: 2234534, color: '#f9a670'},//累计出借人数量
                {num: 553222, color: '#8cb2f2'},//当前借款人数量
            ],
            topTenBorrowerScale: 0,//前十大借款人待还金额占比
            mostBorrowerScale: 0,//最大单一借款人待还金额占比
            bannerActive: 0,//第几个年份的报告
            bannerNum17: 13,//运营报告轮播数量
            bannerNum18: 8,
            year: ['2018', '2017', '2016'],//年份
            borrowCount:0
        }
    }

    async componentDidMount() {
        this.getBorrowCount();
        const dataObj = await API.post(API.platformData, {}, true);
        const {totalBorrower, nowBorrower, totalLender, nowLender, topTenBorrowerScale, mostBorrowerScale} = dataObj.obj
        this.setState({
            topTenBorrowerScale,
            mostBorrowerScale,
            platformData: dataObj.obj,
            circle: [
                {num: totalBorrower, color: '#ff768f'},//累计借款人数量
                {num: nowBorrower, color: '#8cb2f2'},//当前借款人数量
            ],
            circle1: [
                {num: totalLender, color: '#f9a670'},//累计出借人数量
                {num: nowLender, color: '#8cb2f2'},//当前借款人数量
            ],
        })
        this.draw(this.refs.canvas1, this.state.circle);
        this.draw(this.refs.canvas2, this.state.circle1);
    }

    getBorrowCount=async()=>{
        const obj=await API.post(API.borrowCount);
        this.setState({
            borrowCount:obj.data
        })
}

    draw(obj, circle) {
        let canvas = obj;
        let cobj = canvas.getContext("2d");
        cobj.clearRect(0, 0, 200, 200);
        cobj.beginPath();
        cobj.lineWidth = 20;
        cobj.strokeStyle = circle[0].color;
        cobj.arc(105, 105, 88, -Math.PI / 2, 2 * Math.PI);
        cobj.stroke();
        cobj.strokeStyle = circle[1].color;
        cobj.beginPath();
        function atr(deg) {
            return Math.PI * deg / 180;
        }

        let angle = 0;
        const total = circle[0].num;

        let maxangle = (circle[1].num) * (360 / total);
        let f;
        let self = this;

        function progress() {
            angle++;
            cobj.clearRect(0, 0, 210, 210);
            cobj.beginPath();
            cobj.strokeStyle = circle[0].color;
            cobj.arc(105, 105, 88, -Math.PI / 2, 2 * Math.PI);
            cobj.stroke();
            cobj.strokeStyle = circle[1].color;
            cobj.beginPath();
            if (circle == self.state.circle1) {
                cobj.arc(105, 105, 88, Math.PI, Math.PI - atr(angle), true);
            } else {
                cobj.arc(105, 105, 88, atr(0), -atr(angle), true);
            }

            cobj.stroke();
            if (angle > maxangle) {
                cancelAnimationFrame(f);
            } else {
                f = requestAnimationFrame(progress);
            }
        }

        progress();
    }

    left = async () => {
        const {num17, bannerNum17} = this.state
        await this.setState({
            num17: num17 + 1
        })
        if (this.state.num17 >= Math.ceil(bannerNum17 / 4)) {
            this.setState({
                num17: 0
            })
            return false;
        }
        this.refs.run17.style.marginLeft = (this.state.num17) * -1020 + 'px';
    }
    left18 = async () => {
        const {num18, bannerNum18} = this.state
        await this.setState({
            num18: num18 + 1
        })
        if (this.state.num18 >= Math.ceil(bannerNum18 / 4)) {
            this.setState({
                num18: 0
            })
            return false;
        }
        this.refs.run18.style.marginLeft = (this.state.num18) * -1020 + 'px';
    }
    right = async () => {
        await this.setState({
            num17: this.state.num17 - 1
        })
        if (this.state.num17 <= 0) {
            this.setState({
                num17: 0
            })
            return false;
        }
        this.refs.run17.style.marginLeft = (this.state.num17) * -1020 + 'px';
    }

    right18 = async () => {
        await this.setState({
            num18: this.state.num18 - 1
        })
        if (this.state.num18 <= 0) {
            this.setState({
                num18: 0
            })
            return false;
        }
        this.refs.run18.style.marginLeft = (this.state.num18) * -1020 + 'px';
    }

    componentDidUpdate() {
        this.refs.run17.style.marginLeft = this.state.num17 * -1020 + 'px';
        this.refs.run18.style.marginLeft = this.state.num18 * -1020 + 'px';
    }

    render() {
        const {
            num17,
            num18,
            bannerNum17,
            bannerNum18,
            year,
            bannerActive,
            platformData = {},
            topTenBorrowerScale,//前十大借款人待还金额占比
            mostBorrowerScale,//最大单一借款人待还金额占比
            borrowCount,//借款余额笔数
        } = this.state
        const totalData = [
            {
                data: (!!platformData.totalTender ? (platformData.totalTender / 100000000).toFixed(2) : 0) + '亿',
                description: '累计交易总额'
            },
            {
                data: (!!platformData.countTender ? (platformData.countTender / 10000).toFixed(2) : 0) + '万',
                description: '累计交易笔数'
            },
            {
                data: (!!platformData.totalIncome ? (platformData.totalIncome / 100000000).toFixed(2) : 0) + '亿',
                description: '累计收益总额'
            },
            {
                data: (!!platformData.averageBorrow ? (platformData.averageBorrow / 10000).toFixed(2) : 0) + '万',
                description: '人均累计借款金额'
            },
            {
                data: (!!platformData.averageTender ? (platformData.averageTender / 10000).toFixed(2) : 0) + '万',
                description: '人均累计出借金额'
            },
            {
                data: (!!platformData.interest ? (platformData.interest / 10000).toFixed(2) : 0) + '万',
                description: '利息余额'
            },
        ];//平台数据
        const data = totalData.map((v, i) => {
            return (
                <li key={i}>
                    <div className="circle"><img src={`https://images.51rz.com/images/rebuild/pc/img/data${i}.png`} alt=""/></div>
                    <p>{v.data}</p>
                    <p style={{fontSize: '14px'}}>{v.description}</p>
                </li>
            )
        })
        const otherData = [
            {
                data: '0元',
                description: '逾期金额'
            },
            {
                data: '0笔',
                description: '逾期笔数'
            },
            {
                data: '0元',
                description: '代偿金额'
            },
            {
                data: '0笔',
                description: '代偿笔数'
            },
            {
                data: '0元',
                description: '逾期90天以上金额',
                style: {paddingTop: '22px'}
            },
            {
                data: '0%',
                description: '逾期90天以上笔数',
                style: {paddingTop: '22px'}
            },
            {
                data: '0%',
                description: '项目逾期率',
            },
            {
                data: '0%',
                description: '金额逾期率',
            },
        ]//其他数据
        const otherDataList = otherData.map((v, i) => {
            return (
                <li key={i} style={v.style}>
                    <p>{v.data}</p>
                    <p>{v.description}</p>
                </li>
            )
        })
        //平台数据
        let pointArr17 = [];//轮播点
        for (let i = 0; i < Math.ceil(bannerNum17 / 4); i++) {
            pointArr17.push(i)
        }
        let pointArr18 = [];//轮播点
        for (let i = 0; i < Math.ceil(bannerNum18 / 4); i++) {
            pointArr18.push(i)
        }
        //轮播点列表
        const pointList17 = pointArr17.map((v, i) => {
            return (
                <li key={i} className={num17 == i ? "active" : ''} onClick={() => {
                    this.setState({num17: i})
                }}></li>
            )
        })
        const pointList18 = pointArr18.map((v, i) => {
            return (
                <li key={i} className={num18 == i ? "active" : ''} onClick={() => {
                    this.setState({num18: i})
                }}></li>
            )
        })
        const yearList = year.map((v, i) => {
            return (
                <div key={i} className={`seven ${bannerActive == i ? 'active' : ''}`} onClick={() => {
                    this.setState({
                        bannerActive: i
                    });
                }}>{v}</div>
            )
        })//年份列表
        return (
            <div className="platformdata">
                <div className="databg">
                    <div className="title">
                        <div className="xian"></div>
                        <p className="jiben">基本数据</p>
                        <div className="xian"></div>
                        <p style={{fontSize: '14px', marginTop: '10px', opacity: '0.8'}}>数据更新至{platformData.nowDate}</p>
                        <p className="total">数据汇总</p>
                    </div>
                    <ul className="data">
                        {data}
                    </ul>
                </div>
                <div className="content fare">
                    <div className="data_con">
                        <h5>借款数据</h5>
                        <div className="d_title">
                            <div className="rect"></div>
                            借款人、出借人
                        </div>
                        <div className="circle_con">
                            <div className="circle">
                                <div className="name">借款人</div>
                                <canvas width="210px" height="210px" ref="canvas1"></canvas>
                                <div className="total">
                                    <p className="num">{this.state.circle[0].num}<span>人</span></p>
                                    <p>累计借款人数量</p>
                                </div>
                                <div className="line">
                                    <p className="num">{this.state.circle[1].num}人</p>
                                    <p>当前借款人数量</p>
                                </div>
                            </div>
                            <div className="circle" style={{paddingLeft: '220px'}}>
                                <div className="name">出借人</div>
                                <canvas width="210px" height="210px" ref="canvas2"></canvas>
                                <div className="total">
                                    <p className="num"
                                       style={{color: '#f9a670'}}>{this.state.circle1[0].num}<span>人</span></p>
                                    <p>累计出借人数量</p>
                                </div>
                                <div className="line" style={{
                                    backgroundImage: 'url(https://images.51rz.com/images/rebuild/pc/img/dataline2.png)',
                                    left: '62px',
                                    top: '120px',
                                    paddingLeft: '30px',
                                    paddingRight: '56px',
                                    paddingTop: '38px'
                                }}>
                                    <p className="num">{this.state.circle1[1].num}人</p>
                                    <p>当前出借人数量</p>
                                </div>
                            </div>
                        </div>
                        <div className="d_title" style={{marginBottom: '30px'}}>
                            <div className="rect" style={{background: '#ffc001'}}></div>
                            借款人待还金额占比
                        </div>
                        <ul className="bilitu">
                            <li>
                                <span>占比（%）</span>
                            </li>
                            <li>
                                <span>30%</span>
                            </li>
                            <li>
                                <span>25%</span>
                            </li>
                            <li>
                                <span>20%</span>
                            </li>
                            <li>
                                <span>15%</span>
                            </li>
                            <li>
                                <span>10%</span>
                            </li>
                            <li>
                                <span>5%</span>
                            </li>
                            <div className="bili" style={{left: '144px'}}>
                                <h4>{topTenBorrowerScale}%</h4>
                                <div className="main" style={{height: topTenBorrowerScale * 6 + 'px'}}></div>
                                <p>前十大借款人待还金额占比</p>
                            </div>
                            <div className="bili" style={{right: '128px'}}>
                                <h4>{mostBorrowerScale}%</h4>
                                <div className="main" style={{height: mostBorrowerScale * 6 + 'px'}}></div>
                                <p>最大单一借款人待还金额占比</p>
                            </div>
                        </ul>
                        <div className="d_title" style={{marginBottom: '30px'}}>
                            <div className="rect" style={{background: '#f96256'}}></div>
                            借款余额
                        </div>
                        <ul className="yue">
                            <li>
                                <div className="main">
                                    <h4>借贷余额</h4>
                                    <p>{(!!platformData.loanBalance ? (platformData.loanBalance / 100000000).toFixed(2) : 0) + '亿'}元</p>

                                </div>
                                <div className="d_title" style={{marginBottom: '30px',marginTop:'15px'}}>
                                    <div className="rect" style={{background: '#f96256'}}></div>
                                    借款余额笔数&nbsp;&nbsp;<span style={{color:'#f96256'}}>{borrowCount}笔</span>
                                </div>
                            </li>
                            <li>
                                <div className="main" style={{backgroundImage: 'url(https://images.51rz.com/images/rebuild/pc/img/yue2.png)'}}>
                                    <h4>关联关系借款余额</h4>
                                    <p>0元</p>
                                </div>
                                <div className="d_title" style={{marginBottom: '30px',marginTop:'15px'}}>
                                    <div className="rect" style={{background: '#699cf3'}}></div>
                                    关联关系借款余额笔数&nbsp;&nbsp;<span style={{color:'#699cf3'}}>0笔</span>
                                </div>
                            </li>
                        </ul>
                        <div className="other">
                            <h5>其他数据</h5>
                            <ul style={{marginBottom: '40px'}}>
                                {otherDataList}
                            </ul>
                            <div className="overdue">
                                <div className="project">
                                    <div className="d_title">
                                        <div className="rect"></div>
                                        项目分级逾期率
                                    </div>
                                    <ul>
                                        <li>
                                            <p>
                                                <span>0%</span><br/>90天
                                            </p>
                                        </li>
                                        <li>
                                            <p>
                                                <span>0%</span><br/>91~180天
                                            </p>
                                        </li>
                                        <li>
                                            <p>
                                                <span>0%</span><br/>大于180天
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="project">
                                    <div className="d_title" style={{marginBottom: '30px'}}>
                                        <div className="rect" style={{backgroundColor: '#6fc2c1'}}></div>
                                        金额分级逾期率
                                    </div>
                                    <ul>
                                        <li>
                                            <p>
                                                <span>0%</span><br/>90天
                                            </p>
                                        </li>
                                        <li>
                                            <p>
                                                <span>0%</span><br/>91~180天
                                            </p>
                                        </li>
                                        <li>
                                            <p>
                                                <span>0%</span><br/>大于180天
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="contenttitle">
                        ——&nbsp;&nbsp;&nbsp;&nbsp;收费标准&nbsp;&nbsp;&nbsp;&nbsp;——
                    </div>
                    <p className="faredesc">每个用户每月可享受3次免费提现机会，超出部分的提现统一按单笔将收取2~5元不等的提现服务费。</p>
                    <table>
                        <thead>
                        <tr>
                            <th style={{background: '#f9f2e7'}}>业务类型</th>
                            <th style={{background: '#f9f2e7'}}>收费标准</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>用户注册</td>
                            <td>免费</td>
                        </tr>
                        <tr>
                            <td>开通存管账户</td>
                            <td>免费</td>
                        </tr>
                        <tr>
                            <td>充值</td>
                            <td>免费</td>
                        </tr>
                        <tr>
                            <td>提现</td>
                            <td style={{padding: '20px 0'}}>
                                &nbsp;&nbsp;&nbsp;0~5万元（含）&nbsp;&nbsp;&nbsp;2元/笔<br/>
                                &nbsp;&nbsp;5~10万元（含）&nbsp;&nbsp;&nbsp;3元/笔<br/>
                                10~50万元（含）&nbsp;&nbsp;&nbsp;4元/笔<br/>
                                50~100万元（含）&nbsp;&nbsp;&nbsp;5元/笔<br/><br/>
                                <span style={{color: '#999', fontSize: '12px'}}>注：每个用户每月可享受3次免费提现机会</span>
                            </td>
                        </tr>
                        <tr>
                            <td>借款</td>
                            <td>月综合费率低至1%</td>
                        </tr>
                        <tr>
                            <td>债权转让</td>
                            <td>免费</td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="contenttitle">
                        ——&nbsp;&nbsp;&nbsp;&nbsp;运营报告&nbsp;&nbsp;&nbsp;&nbsp;——
                    </div>
                    <div className="d_banner">
                        <div className="year">
                            {yearList}
                        </div>
                        <div className="bannercontent">
                            <div className="banner_y" style={{display: bannerActive == 0 ? 'block' : 'none'}}>
                                <div className="banner_y_con">
                                    <div className="big" ref="run18">
                                        <ul>
                                            <li>
                                                <a><img
                                                        src="https://images.51rz.com/images/rebuild/report/yy_2018_7.png"
                                                        style={{width: 209, height: 290}}/></a>
                                                <div className="text-desc">
                                                    <img
                                                        src="https://images.51rz.com/images/rebuild/report/ewm_2018_7.png"
                                                        style={{border: '5px solid #fff', width: 111, height: 111}}/>
                                                </div>
                                            </li>
                                            <li>
                                                <a><img
                                                        src="https://images.51rz.com/images/rebuild/report/yy_2018_6.png"
                                                        style={{width: 209, height: 290}}/></a>
                                                <div className="text-desc">
                                                    <img
                                                        src="https://images.51rz.com/images/rebuild/report/ewm_2018_6.png"
                                                        style={{border: '5px solid #fff', width: 111, height: 111}}/>
                                                </div>
                                            </li>
                                            <li>
                                                <a><img
                                                        src="https://images.51rz.com/images/rebuild/report/yy_2018_5.png"
                                                        style={{width: 209, height: 290}}/></a>
                                                <div className="text-desc">
                                                    <img
                                                        src="https://images.51rz.com/images/rebuild/report/ewm_2018_5.png"
                                                        style={{border: '5px solid #fff', width: 111, height: 111}}/>
                                                </div>
                                            </li>
                                            <li>
                                                <a><img
                                                    src="https://images.51rz.com/images/rebuild/report/yy_2018_4.png"
                                                    style={{width: 209, height: 290}}/></a>
                                                <div className="text-desc">
                                                    <img
                                                        src="https://images.51rz.com/images/rebuild/report/ewm_2018_4.png"
                                                        style={{border: '5px solid #fff', width: 111, height: 111}}/>
                                                </div>
                                            </li>
                                            <li>
                                                <a><img
                                                    src="https://images.51rz.com/images/rebuild/report/yy_2018_3.png"
                                                    style={{width: 209, height: 290}}/></a>
                                                <div className="text-desc">
                                                    <img
                                                        src="https://images.51rz.com/images/rebuild/report/ewm_2018_3.png"
                                                        style={{border: '5px solid #fff', width: 111, height: 111}}/>
                                                </div>
                                            </li>
                                            <li>
                                                <a><img
                                                    src="https://images.51rz.com/images/rebuild/report/yy_2018_2.png"
                                                    style={{width: 209, height: 290}}/></a>
                                                <div className="text-desc">
                                                    <img
                                                        src="https://images.51rz.com/images/rebuild/report/ewm_2018_2.png"
                                                        style={{border: '5px solid #fff', width: 111, height: 111}}/>
                                                </div>
                                            </li>
                                            <li>
                                                <a><img src="https://images.51rz.com/images/rebuild/pc/img/yy_2018_1.png"
                                                        style={{width: 209, height: 290}}/></a>
                                                <div className="text-desc">
                                                    <img src="https://images.51rz.com/images/rebuild/pc/img/ewm_2018_yy.png"
                                                         style={{border: '5px solid #fff', width: 111, height: 111}}/>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="y_left" onClick={() => {
                                    this.right18();
                                }}></div>
                                <div className="y_right" onClick={() => {
                                    this.left18();
                                }}></div>
                                <ul className="point">
                                    {pointList18}
                                </ul>
                            </div>
                            <div className="banner_y"
                                 style={{display: bannerActive == 1 ? 'block' : 'none'}}>
                                <div className="banner_y_con">
                                    <div className="big" ref="run17">
                                        <li>
                                            <a><img src="https://images.51rz.com/images/rebuild/report/report1713.png"
                                                    alt=""/></a>
                                            <div className="text-desc">
                                                <img src="https://images.51rz.com/images/rebuild/report/code1713.png"
                                                     alt=""
                                                     style={{border: '5px solid #fff', width: 111, height: 111}}/>
                                            </div>
                                        </li>
                                        <li>
                                            <a><img src="https://images.51rz.com/images/banner/yybg12/pic12.png"
                                                    alt=""/></a>
                                            <div className="text-desc">
                                                <img src="https://images.51rz.com/images/banner/yybg12/rwm12.png" alt=""
                                                     style={{border: '5px solid #fff', width: 111, height: 111}}/>
                                            </div>
                                        </li>
                                        <li>
                                            <a><img src="https://images.51rz.com/images/banner/yuebao/data-pic11.png"
                                                    alt=""/></a>
                                            <div className="text-desc">
                                                <img src="https://images.51rz.com/images/banner/yuebao/20171205.png"
                                                     style={{border: '5px solid #fff', width: 111, height: 111}}/>
                                            </div>
                                        </li>
                                        <li>
                                            <a><img
                                                src="https://images.51rz.com/images/shiyue/data-pic10.png"/></a>
                                            <div className="text-desc">
                                                <img src="https://images.51rz.com/images/shiyue/ewm10.png"
                                                     style={{border: '5px solid #fff', width: 111, height: 111}}/>
                                            </div>
                                        </li>
                                        <li>
                                            <a><img
                                                src="https://images.51rz.com/images/operational-report/september-bg.png"/></a>
                                            <div className="text-desc">
                                                <img
                                                    src="https://images.51rz.com/images/operational-report/september-wx-code.png"
                                                    style={{border: '5px solid #fff', width: 111, height: 111}}/>
                                            </div>
                                        </li>
                                        <li>
                                            <a><img
                                                src="https://images.51rz.com/images/pc/platform/eight-data-pic.png"/></a>
                                            <div className="text-desc">
                                                <img src="https://images.51rz.com/images/pc/platform/2017_8.png"
                                                     style={{border: '5px solid #fff', width: 111, height: 111}}/>
                                            </div>
                                        </li>
                                        <li>
                                            <a><img
                                                src="https://images.51rz.com/images/pc/platform/sevenBg.jpg"/></a>
                                            <div className="text-desc">
                                                <img src="https://images.51rz.com/images/pc/platform/2017_7.png"
                                                     style={{border: '5px solid #fff', width: 111, height: 111}}/>
                                            </div>
                                        </li>
                                        <li>
                                            <a>
                                                <img src="https://images.51rz.com/images/pc/platform/six_yybg.jpg"
                                                     alt=""/>
                                            </a>
                                            <div className="text-desc">
                                                <img src="https://images.51rz.com/images/pc/platform/2017_6.png"
                                                     style={{border: '5px solid #fff', width: 111, height: 111}}/>
                                            </div>
                                        </li>
                                        <li>
                                            <a>
                                                <img src="https://images.51rz.com/images/pc/platform/five_yybg.jpg"
                                                     alt=""/>
                                            </a>
                                            <div className="text-desc">
                                                <img src="https://images.51rz.com/images/pc/platform/2017_5.png"
                                                     style={{border: '5px solid #fff', width: 111, height: 111}}/>
                                            </div>
                                        </li>
                                        <li>
                                            <a>
                                                <img src="https://images.51rz.com/images/pc/platform/yybg07.png"
                                                     alt=""/>
                                            </a>
                                            <div className="text-desc">
                                                <img src="https://images.51rz.com/images/pc/platform/2017_4.png"
                                                     style={{border: '5px solid #fff', width: 111, height: 111}}/>
                                            </div>
                                        </li>
                                        <li>
                                            <a><img
                                                src="https://images.51rz.com/images/pc/platform/yybg06.png"/></a>
                                            <div className="text-desc">
                                                <img src="https://images.51rz.com/images/pc/platform/2017_3.png"
                                                     style={{border: '5px solid #fff', width: 111, height: 111}}/>
                                            </div>
                                        </li>
                                        <li>
                                            <a>
                                                <img src="https://images.51rz.com/images/pc/platform/yybg04.png"
                                                     alt=""/>
                                            </a>
                                            <div className="text-desc">
                                                <img src="https://images.51rz.com/images/pc/platform/2017_2.png"
                                                     style={{border: '5px solid #fff', width: 111, height: 111}}/>
                                            </div>
                                        </li>
                                        <li>
                                            <a>
                                                <img src="https://images.51rz.com/images/pc/platform/yybg03.png"
                                                     alt=""/>
                                            </a>
                                            <div className="text-desc">
                                                <img src="https://images.51rz.com/images/pc/platform/2017_1.png"
                                                     style={{border: '5px solid #fff', width: 111, height: 111}}/>
                                            </div>
                                        </li>
                                    </div>
                                </div>
                                <div className="y_left" onClick={() => {
                                    this.right();
                                }}></div>
                                <div className="y_right" onClick={() => {
                                    this.left();
                                }}></div>
                                <ul className="point">
                                    {pointList17}
                                </ul>
                            </div>
                            <div className="banner_y"
                                 style={{display: bannerActive == 2 ? 'block' : 'none'}}>
                                <div className="banner_y_con">
                                    <div className="big">
                                        <ul>
                                            <li>
                                                <a><img src="https://images.51rz.com/images/pc/platform/yybg05.png"
                                                        style={{width: 209, height: 290}}/></a>
                                                <div className="text-desc">
                                                    <img src="https://images.51rz.com/images/pc/platform/2016_1.png"
                                                         style={{border: '5px solid #fff', width: 111, height: 111}}/>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="y_left"></div>
                                <div className="y_right"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

//新闻与公告
class NewsDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {},
            currentId: this.props.match.params.id,
            siteId: this.props.match.params.siteId
        }
    }

    getDetail = async () => {
        let param = {
            id: this.state.currentId,
            siteId: this.state.siteId
        }
        const detail = await API.get(API.getArticleDetails, param);
        this.refs.content.innerHTML = detail.content
        await this.setState({
            detail: detail,
        })
    }


    async componentDidMount() {
        this.getDetail();
    }

    async prev(id) {
        await this.setState({
            currentId: id
        })
        this.getDetail();
    }

    render() {
        const {
            title,        //标题
            picPath,      //图片路径
            preArticle,   //上一篇
            nextArticle,  //下一篇
            publishDates,  //创建时间
            introduction, //摘要
            content = '',
        } = this.state.detail;
        const time = publishDates ? publishDates.split(':')[0] + ':' + publishDates.split(':')[1] : '';
        return (
            <div className="newsdetail">
                <div className="detailtitle">
                    <h3>{title}</h3>
                    <div className="time">时间：{time}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        发布者:人众金服&nbsp;&nbsp;&nbsp;&nbsp;<a href='/information.html#/news'>[返回列表]</a></div>
                </div>
                <div className="detailcon">
                    <div className="tip">【摘要】 {introduction}</div>
                    <div className="con">
                        <pre className="text" ref="content"></pre>
                    </div>
                </div>
                <div className="page">
                    {preArticle ? <div className="prev" onClick={() => {
                        this.prev(preArticle.id)
                    }}>上一篇：{preArticle ? preArticle.title : ''}</div> : ''}
                    {nextArticle ? <div className="next" onClick={() => {
                        this.prev(nextArticle.id)
                    }}>下一篇：{nextArticle ? nextArticle.title : ''}</div> : ''}
                </div>
            </div>
        )
    }
}
class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newsList: [],
            currentPage: 1,
            totalPage: 1,
            nowActive: Number(window.location.href.substr(window.location.href.lastIndexOf('/')).substr(1, 1)) || location.hash.split('=')[1] || 6
        }
    }

//获取文章列表
    getList = async () => {
        const {nowActive, currentPage} = this.state
        const params = {
            token: this.props.store.userInfo.token,
            siteId: nowActive,
            numPerPage: '10',
            pageNum: currentPage
        };
        const newsLists = await API.get(API.getArticleList, params, true);
        this.setState({
            newsList: newsLists.obj ? newsLists.obj.recordList : [],
            totalPage: newsLists.obj ? newsLists.obj.totalPage : 1,
        })
    }

    componentDidMount() {
        this.getList();
    }

//更改分类
    changeActive(i) {
        setTimeout(async () => {
            await this.setState({
                nowActive: i,
                currentPage: 1
            })
            this.getList();
        }, 10)
    }

//分页
    onCurrentChange = async (current) => {
        await this.setState({
            currentPage: current
        })
        this.getList();
    }

    textClamp = (refWidth, fontSize, clamp, str) => {
        const perTextNum = Math.floor(refWidth / fontSize);
        const total = perTextNum * clamp;
        if (str.length > total) {
            str = str.substr(0, total - 1) + '...';
            return str
        } else {
            return str
        }
    }

    render() {
        const {
            totalPage,
            currentPage,
            nowActive,
        } = this.state
        const newsList = this.state.newsList.map((v, i) => {
            return (<NavLink to={"/news/detail/" + v.id + '/' + nowActive} key={i}>
                <li className="newslist">
                    <h3>{v.title}<span>{v.publishDates.split(' ')[0]}</span>
                    </h3>
                    <p>{this.textClamp(1080, 14, 2, v.introduction)}</p>
                </li>
            </NavLink>)
        });
        const mediaList = this.state.newsList.map((v, i) => {
            return (<NavLink to={"/news/detail/" + v.id + '/' + nowActive} key={i}>
                <li className="media">
                    <img src={v.picPath} alt=""/>
                    <div className="m_content">
                        <h4>{v.title}</h4>
                        <p>{this.textClamp(1080, 14, 2, v.introduction)}</p>
                        <div className="time">
                            <span>{v.publishDates.split(' ')[0]}</span></div>
                    </div>
                </li>
            </NavLink>)
        });
        return (
            <div className="content">
                <div className="newtab">
                    <ul className="newstab">
                        <li className={nowActive == 6 && 'active'}>
                            <a href="/information.html#/news"
                               onClick={() => this.changeActive(6)}
                               className={nowActive == 6 && 'active'}>平台公告</a>
                        </li>
                        <li className={nowActive == 9 && 'active'}>
                            <a href="/information.html#/news"
                               onClick={() => this.changeActive(9)}
                               className={nowActive == 9 && 'active'}>媒体报道</a>
                        </li>
                        <li className={nowActive == 8 && 'active'}>
                            <a href="/information.html#/news"
                               onClick={() => this.changeActive(8)}
                               className={nowActive == 8 && 'active'}>公司动态</a>
                        </li>
                    </ul>
                </div>
                <ul className="notice">
                    <Route exact path="/news" render={() =>
                        <div>
                            {nowActive == 9 ? mediaList : newsList}
                            <Pagination
                                currentPage={currentPage}
                                pages={!!totalPage ? totalPage : 1}
                                onCurrentChange={this.onCurrentChange}/>
                        </div>
                    }/>

                    <Route path="/news/detail/:id/:siteId" component={NewsDetail}/>
                </ul>
            </div>
        )
    }
}
News = connect((store) => ({store: store}))(News);


class Infos extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div>
                    <TopBar tag={'information'}/>
                    <div className="infobg">信息披露</div>
                    <Infotab/>
                    <Bottom/>
                </div>
            </Router>
        )
    }
}


Infos = connect((store) => ({store: store}))(Infos);
render(<Provider store={store}>
    <Infos/>
</Provider>, document.getElementById('app'));