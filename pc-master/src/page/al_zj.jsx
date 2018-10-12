import React, {Component} from 'react';
import {render} from 'react-dom';
import '@/assets/css/al_zj.scss';
class Alzj extends Component {
    constructor() {
        super();
        this.state = {
            nowSlider: 0,
            showSilder: false,
            currentPic: 0,
            currentPage: 0
        }
    }

    componentWillMount() {
        document.documentElement.scrollTop = 1;
        window.addEventListener('scroll', this.orderScroll);
        this.t=setInterval(()=>{
            this.getNext()
        },2000)
    }

    getPrev = async() => {
        let currentPage;
        await this.setState({
            currentPic: this.state.currentPic - 1,
        })
        if (this.state.currentPic <0) {
            this.setState({
                currentPage: 1,
                currentPic: 11
            })
            return;
        }
        if (this.state.currentPic > 6) {
            currentPage = 1
        } else if (this.state.currentPic <= 6) {
            currentPage = 0
        }
        this.setState({
            currentPage,
        })
    }
    getNext = async() => {
        let currentPage;
        await this.setState({
            currentPic: this.state.currentPic + 1,
        })
        if (this.state.currentPic >= 12) {
            this.setState({
                currentPage: 0,
                currentPic: 0
            })
            return;
        }
        if (this.state.currentPic > 6) {
            currentPage = 1
        } else if (this.state.currentPic <= 6) {
            currentPage = 0
        }
        this.setState({
            currentPage,
        })
    }
    changeBanner = (index) => {
        this.setState({
            currentPic: index
        })
    }

    orderScroll = () => {
        let height = document.documentElement.scrollTop;
        let show, nowSlider;
        if (height < 512) {
            show = false
        } else {
            show = true
        }
        if (height >= 512 && height < 1064) {
            nowSlider = 0
        }

        if (height >= 1064 && height < 1578) {
            nowSlider = 1
        }

        if (height >= 1578 && height < 2092) {
            nowSlider = 2
        }

        if (height >= 2092 && height < 3650) {
            nowSlider = 3
        }

        if (height >= 3650 && height < 5105) {
            nowSlider = 4
        }

        if (height >= 5105 && height < 5900) {
            nowSlider = 5
        }

        if (height >= 5900 && height < 7376) {
            nowSlider = 6
        }
        this.setState({
            showSilder: show,
            nowSlider: nowSlider
        })
    }
    scrollInto = (index) => {
        const scrollArr = ['512', '1064', '1578', '2092', '3650', '5105', '5900']
        document.documentElement.scrollTop = scrollArr[index];
        this.orderScroll()
    }
    goTop = () => {
        document.documentElement.scrollTop = 1;
        window.pageYOffset = 1;
        document.body.scrollTop = 1;
    }


    render() {
        const {showSilder, nowSlider, currentPic, currentPage} = this.state
        const silder = ['融资概况', '立元创投', '签约仪式', '主题分享', '记者采访', '现场图集', '媒体报道'].map((v, i) => {
            return <li key={i}>
                <p onClick={() => {
                    this.scrollInto(i)
                }} id={'nav' + (i + 1)} className="wbeng" style={{opacity: nowSlider == i ? "1" : "0"}}>{v}</p>
            </li>
        });
        const picArr = [
            '在中电华通（江苏）顾纯郡女士见证下，人众金服与立元创投正式签署A轮融资战略协议',
            '人众金服董事长李敏、立元创投董事长谢峰、副总经理张锐军与江苏中电华通法定代表人徐梓华、副总经理顾纯郡共同启动A轮融资签约仪式',
            '人众金服董事长李敏、立元创投董事长谢峰、副总经理张锐军与江苏中电华通法定代表人徐梓华、副总经理顾纯郡共同启动A轮融资签约仪式',
            '江苏中电华通法定代表人徐梓华、副总经理顾纯郡出席人众金服A轮融资发布会',
            '著名时评人、自由投资人“江南愤青”陈宇出席人众金服A轮融资发布会',
            '人众金服董事长李敏出席人众金服A轮融资发布会',
            '人众金服董事长李敏发表主题演讲：“产业+金融+互联网”',
            '立元创投董事长谢峰发表主题演讲：金融最终要为实体经济服务',
            '中商惠民董事长张一春发表主题演讲：互联网或者金融，与产业结合才是核心',
            '“江南愤青”陈宇发表主题演讲：产业化是互联网金融的发展方向',
            '人众金服CEO薛刚展望2017：合规化和精细化是我们不变的主题',
            '发布会后，人众金服董事长李敏、立元创投董事长谢峰与江苏中电华通副总经理顾纯郡一起接受记者采访'
        ]
        const picBox = picArr.map((v, i) => {
            return (
                <li key={i}><a><img
                    src={i == 6 ? "https://images.51rz.com/images/pc/al_zj/" + (i + 1) + ".JPG" : "https://images.51rz.com/images/pc/al_zj/" + (i + 1) + ".jpg"}
                    alt=""/></a> <span>{v}</span>
                </li>
            )
        });
        const listBox = picArr.map((v, i) => {
            return (
                <li key={i}
                    onMouseEnter={()=>{
                        clearInterval(this.t)
                    }}
                    onMouseLeave={()=>{
                        this.t=setInterval(()=>{
                            this.getNext()
                        },2000)
                    }}
                    onClick={() => {
                    this.changeBanner(i)
                }} className={currentPic == i ? "on" : ""}><i className="arr2"></i><img
                    src={"https://images.51rz.com/images/pc/al_zj/" + (i + 1) + "-1.jpg"} alt=""/></li>
            )
        })
        return (
            <div>
                <div className="al_aside" style={{display: showSilder ? "block" : "none"}}>
                    <ul>
                        {silder}
                        <li>
                            <a onClick={() => {
                                this.goTop()
                            }} className="al-side"></a>
                        </li>
                    </ul>
                </div>
                <article className="al-zjwrap">
                    <section className="al-zjbanner">
                        <img src="https://images.51rz.com/images/pc/al_zj/al-zj.png"/>
                    </section>
                    <section className="al-zjabout al-h1" id="wu_01">
                        <h3>
                            <i className="al-ico1"></i><span>融资<em style={{marginLeft: "10px"}}>概况</em></span>
                        </h3>
                        <div className="al-zjabout-vid">
                            <div className="al-vid">
                                <a target="_blank" href="https://images.51rz.com/movie/al_rz.mp4">
                                    <img src="https://images.51rz.com/images/pc/al_zj/alrz_rz.jpg" alt="" style={{margin: '0 auto', display: 'block', width: '480px', height: '319px'}} />
                                </a>
                            </div>
                            <div className="al-vid-text">
                                <h4>众心筑梦.人众金服A轮融资新闻发布会</h4>
                                <p>2017年1月4日，人众金服携手立元创投，召开“众心筑梦.人众金服A轮融资新闻发布会”，正式宣布平台获得立元创投5000万A轮投资。<br/>
                                    通过此轮融资，人众金服将与立元创投密切在整体布局、市场协同、资本运作等各方面合作。同时，本轮融资款项也将用于加强系统开发、平台运营、团队建设和风控体系等方面。人众金服将借助此轮融资，继续深耕于供应链金融领域，借助“产业+金融+互联网”模式，助力产业腾飞。
                                </p>
                            </div>
                        </div>
                    </section>
                    <section className="al-zjabout al-h2" id="wu_02">
                        <h3>
                            <i className="al-ico2"></i><span><em style={{marginRight: "10px"}}>立元</em>创投</span>
                        </h3>
                        <div className="al-zjabout-vid">
                            <div className="al-vid">
                                <img src="https://images.51rz.com/images/pc/al_zj/al-zj2.png"/>
                            </div>
                            <div className="al-vid-text">
                                <p style={{paddingTop: "46px"}}>
                                    立元创投创立于2006年，由立元集团有限公司发起设立，专注于PE、VC、天使投资，基金管理等业务，是国内首批市场化运作的专业创投机构之一，总部位于杭州。<br/>
                                    依托立元集团强大的实业背景，秉承“资本辅助企业，智本襄助企业”的理念，立元创投已先后投资了100多家上市、拟上市企业，基金管理规模150亿元人民币，所投项目“0失败”，其专业的技术水平和强大的投资能力，得到了业界广泛的认同和一致的赞赏！

                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="al-zjabout al-h2" id="wu_03">
                        <h3>
                            <i className="al-ico3"></i><span><em style={{marginRight: "10px"}}>签约</em>仪式</span>
                        </h3>
                        <div className="al-zjabout-vid" style={{margin: "62px 0 51px 0"}}>
                            <div className="al-vid-text" style={{paddingLeft: "0", float: "left"}}>
                                <p style={{paddingTop: '37px'}}>
                                    2017年1月4日，人众金服携手立元创投，召开“众心筑梦.人众金服A轮融资新闻发布会”，正式宣布平台获得立元创投5000万A轮投资。<br/>
                                    在江苏省中电华通网络服务有限责任公司副总经理顾纯郡女士的见证下，浙江人众金融服务股份有限公司董事长李敏与杭州立元创业投资股份有限公司董事长谢峰正式签订《人众金服A轮融资战略协议》，本轮融资款项将用于人众金服加强系统开发、平台运营、团队建设和风控体系等方面，而这将助力人众金服继续坚持破解中小微企业发展中的资金瓶颈的战略选择，以实际行动支持实体经济发展。
                                </p>
                            </div>
                            <div className="al-vid" style={{float: 'right', paddingLeft: '20px'}}>
                                <img src="https://images.51rz.com/images/pc/al_zj/al-zj3-1.png"/>
                            </div>
                        </div>
                    </section>

                    <section className="al-zjabout al-h3" id="wu_04">
                        <h3>
                            <i className="al-ico4"></i><span><em style={{marginRight: '10px'}}>主题</em>分享</span>
                        </h3>
                        <ul className="al-fxlist">
                            <li>
                                <img src="https://images.51rz.com/images/pc/al_zj/al-zj4.png"/>
                                <div className="al-fxright">
                                    <h5>李敏：人众金服董事长 产业+金融+互联网</h5>
                                    <p>
                                        我们倡导“产业+金融+互联网”，三者结合就像是一架飞机，产业是机身，金融与互联网便是机翼。机翼不可能在空气中飞起来，需要插在实体机身上。而机身如果缺少了金融与互联网这两个机翼，也是无法腾飞的。正所谓“皮之不存，毛将焉附”，目前为止，我们已经为零售行业、进出口贸易、钢贸行业提供供应链服务累计超30多亿，在“产业+金融+互联网”的大趋势下，我们“互联网+供应链”的模式是被认可的！“乘风破浪会有时，直挂云帆济沧海”,我们也会一如既往的秉承金融和互联网服务实体经济的理念不断创新，开启金融支持实体经济的新篇章。
                                    </p>
                                </div>
                            </li>

                            <li>
                                <img src="https://images.51rz.com/images/pc/al_zj/al-zj5.png"/>
                                <div className="al-fxright">
                                    <h5>谢峰：立元创投董事长 金融最终要为实体服务</h5>
                                    <p>
                                        金融最基本的属性有三层：第一，金融无处不在，第二，信用、杠杆和风险是运作中的关键要素，杠杆是为了更高的收益，信用是核心，是标准，而在这两个前提下，风险把控是所有金融企业的核心！第三，金融最终要为实体服务，脱离了实体，金融可能就失去了它本身最基本的一个属性。牢记金融的本质，把控可能的风险，永远是金融企业的第一要素！
                                    </p>
                                </div>
                            </li>

                            <li>
                                <img src="https://images.51rz.com/images/pc/al_zj/al-zj6.png"/>
                                <div className="al-fxright">
                                    <h5>张一春：中商惠民创始人兼董事长 互联网还是金融，与产业结合才是核心</h5>
                                    <p>
                                        互联网风吹过来的时候把猪都吹上了天，金融火的时候没有项目拿不到钱的。但是到今年以来整个市场并不好，但是所有的变化都离不开一个核心，产业，只要跟产业结合的好的，不管是金融还是互联网都会发展的很好，立元创投作为业内知名的投资机构，这次投资，我相信应该也是看中了人众金服的这一点，我相信，人众金服独创的“产业+金融+互联网”的商业模式，搭载着互联网这趟快车，利用金融这种工具，服务实体经济，是经得起市场的考验的！
                                    </p>
                                </div>
                            </li>

                            <li>
                                <img src="https://images.51rz.com/images/pc/al_zj/al-zj7.png"/>
                                <div className="al-fxright">
                                    <h5>江南愤青：著名时评人 产业化是互联网金融的发展方向</h5>
                                    <p>
                                        我认为,互联网发展的方向，一个是场景化，第二个是产业化，第三个是技术升级。未来会出现很多的金融机构因为互联网的出现越来越切入场景，可能会成为场景跟金融的部分，在国外，有很多银行，本身就是产业链内的一环，我们可以理解为供应链，就是你把自己放在供应链里面的环节，扮演某种环节，以金融作为工具，把供应链体系做得更好，所以我觉得这种机构是有意义的，而且这样的意味着别人挤不进来，不是谁都能进来的，因为在产业上具有优势，所以2016年我们帮助了很多在产业里面有优势的企业，帮助他实现互联网化。我们的战略是“非互联网工具的互联网化非金融工具的金融化”，用互联网的方式能够把金融业做的更加深入，从而服务于中小企业的发展。
                                    </p>
                                </div>
                            </li>

                            <li>
                                <img src="https://images.51rz.com/images/pc/al_zj/al-zj8-1.png"/>
                                <div className="al-fxright">
                                    <h5>薛刚：人众金服CEO 合规化、精细化是我们不变的主题</h5>
                                    <p>
                                        2016年整个供应链的规模达到10万亿，在2020年应收账款应该达到20万亿，而中心企业只覆盖了其中10%的需求，这也是我们专注供应链金融的初心。深入“产业+金融+互联网”，服务小微，深入产业是我们不变的目标，在安全运营的1348天里，我们共发起了27574笔贷款，服务了67万用户，累计交易量40亿，待收7亿，为用户带来1.6亿收益。<br/>
                                        在大市场做好小生意，2017年，“合规化”和“精细化”将是人众金服不变的主题，第一步我们会针对当下的监管，做好整体的合规，第二步我们会更精细化的运营，运作整个项目。众心筑梦，有梦才有未来，在这个梦想之下，我相信我们可以完成平台向百亿甚至千亿的跨越。
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </section>

                    <section className="al-zjabout al-h4" id="wu_05">
                        <h3>
                            <i className="al-ico5"></i><span>记者<em style={{marginLeft: '10px'}}>采访</em></span>
                        </h3>
                        <div className="al-cf">
                            <img src="https://images.51rz.com/images/pc/al_zj/al-zj9.png" width="960"/>
                            <p style={{
                                width: '100%',
                                textAlign: 'center',
                                fontSize: '14px',
                                padding: '10px 0',
                                color: '#313131'
                            }}>左为立元创投董事长谢峰、中为人众金服董事长李敏，右为中电华通（江苏）副总经理顾纯郡</p>
                        </div>
                        <ul className="al-cflist">
                            <li>
                                <h6><strong>记者问：</strong>A轮融资后，人众金服下一步的计划是什么？</h6>
                                <p>
                                    李敏 . 浙江人众金融服务股份有限公司 董事长<br/>
                                    深耕！现有的模式还较为粗放，更多的细节还有待完善，5000万的融资代表了市场对于该“互联网+供应链金融”模式的信任，下一步，我们会在“产业+金融+互联网”的大趋势下，继续深耕，让这个产业和市场去盈利，让更多的目光聚焦在这一块！美丽的玉石需要不断的打磨才会完美，产业也是！
                                </p>
                            </li>

                            <li>
                                <h6><strong>记者问：</strong>为什么会选择投资人众金服5000万？</h6>
                                <p>
                                    谢峰 . 杭州立元创业投资股份有限公司 董事长<br/>
                                    作为一家长期从事这个投资的专业机构，我们会更加考虑一个企业的创新性问题，在与人众金服接触后，我感觉无论是从商业模式还是探索思路上，以李敏为核心团队生机勃勃，处处都有创新点。投资，是一件很严谨的事情，通过几个月的深入的调研，我们决定投资人众金服，也是希望他们关注的企业可能会带动我们去做一些服务企业的投资。<br/>
                                    而且金融行业非常之大，但从产业的角度来讲，我们国家的金融是落后的，它为实体经营企业，尤其对于小微企业这个是不公平的，没有发挥整个金融给社会真正服务的一个功能。人众金服致力于扶持小微企业的定位是我们非常看重的一个点。
                                </p>
                            </li>

                            <li>
                                <h6><strong>记者问：</strong>中电华通（江苏）为什么会选择人众金服作为投资对象？</h6>
                                <p>
                                    顾纯郡 . 江苏省中电华通网络服务有限责任公司 副总经理，董事<br/>
                                    我认为，人众金服的李总很能代表杭州这一代金融人的做事风格：执着且充满热情，尽心做好每一件事，而且据我观察他们的团队很有开创性，很有活力，这就是我们选择的关键点！一个真正有创新性的团队再加上一个热情执着于金融行业的领路人，只要具备了这两个要素，我相信这个企业一定能够成功。
                                </p>
                            </li>
                        </ul>
                    </section>

                    <section className="al-zjabout al-h5" id="wu_06">
                        <h3>
                            <i className="al-ico6"></i><span>现场<em style={{marginLeft: '10px'}}>图集</em></span>
                        </h3>
                        <div className="mod18">
                            <span id="prev" className="btn prev" onClick={() => {
                                this.getPrev()
                            }}></span>
                            <span id="next" className="btn next" onClick={() => {
                                this.getNext()
                            }}></span>
                            <span id="prevTop" className="btn prev"></span>
                            <span id="nextTop" className="btn next"></span>
                            <div id="picBox" className="picBox">
                                <ul className="cf" ref="picBox"
                                    style={{width: '11520px', left: currentPic * (-960) + 'px'}}>
                                    {picBox}
                                </ul>
                            </div>
                            <div id="listBox" className="listBox">
                                <ul ref="listBox" className="cf"
                                    style={{width: '1580px', left: currentPage * (-889) + 'px'}}>
                                    {listBox}
                                </ul>
                            </div>
                            <div className="clear"></div>
                        </div>
                    </section>

                    <section className="al-zjabout al-h6" id="wu_07">
                        <h3>
                            <i className="al-ico7"></i><span><em style={{marginRight: '10px'}}>媒体</em>报道</span>
                        </h3>
                        <ul className="media scrollbar">
                            <li>
                                <a href="http://xhpfm.mobile.zhongguowangshi.com/v300/newshare/1459507?channel=weixin&amp;from=singlemessage"
                                   target="_blank"><img src="https://images.51rz.com/images/pc/al_zj/1.png"/></a>
                                <div className="media-text">
                                    <h4><a
                                        href="http://xhpfm.mobile.zhongguowangshi.com/v300/newshare/1459507?channel=weixin&amp;from=singlemessage"
                                        target="_blank">人众金服获立元创投5000万资本注入</a><span>2017-01-05</span></h4>
                                    <p>摘要：人众金服1月4日在杭州召开A轮融资发布会。发布会上，人众金服与立元创投投资签订A轮融资协议，正式宣布获得立元创投5000万人民币投资。</p>
                                </div>
                            </li>
                            <li>
                                <a href="http://m.8531.cn/news/524726.html?from=singlemessage&amp;weixin_share_count=1&amp;winzoom=1"
                                   target="_blank"><img src="https://images.51rz.com/images/pc/al_zj/3.png"/></a>
                                <div className="media-text">
                                    <h4><a
                                        href="http://m.8531.cn/news/524726.html?from=singlemessage&amp;weixin_share_count=1&amp;winzoom=1"
                                        target="_blank">人众金服获立元创投5000万资本注入</a><span>2017-01-04</span></h4>
                                    <p>摘要：人众金服1月4日在杭州召开A轮融资发布会。</p>
                                </div>
                            </li>

                            <li>
                                <a href="http://zj.qq.com/a/20170105/012640.htm" target="_blank"><img
                                    src="https://images.51rz.com/images/pc/al_zj/4.png"/></a>
                                <div className="media-text">
                                    <h4><a href="http://zj.qq.com/a/20170105/012640.htm" target="_blank">供应链金融受青睐
                                        人众金服获立元创投5000万资本注入</a><span>2017-01-05</span></h4>
                                    <p>摘要：唯有众心同筑梦，方能开启新征程。未来已来，我们已在</p>
                                </div>
                            </li>

                            <li>
                                <a href="http://www.wdtianxia.com/xfjr/95765.jhtml?from=singlemessage&amp;isappinstalled=0#10006-weixin-1-52626-6b3bffd01fdde4900130bc5a2751b6d1"
                                   target="_blank"><img src="https://images.51rz.com/images/pc/al_zj/5.png"/></a>
                                <div className="media-text">
                                    <h4><a
                                        href="http://www.wdtianxia.com/xfjr/95765.jhtml?from=singlemessage&amp;isappinstalled=0#10006-weixin-1-52626-6b3bffd01fdde4900130bc5a2751b6d1"
                                        target="_blank">供应链金融受青睐 人众金服获立元创投5000万资本注入</a><span>2017-01-04</span></h4>
                                    <p>摘要：人众金服A轮融资发布会于1月4日在杭州顺利召开，该轮投资由国内知名创投机构立元创投投资。</p>
                                </div>
                            </li>

                            <li>
                                <a href="http://zj.sina.com.cn/finance/regional/2017-01-05/detail_f-ifxzkfuh5340881.shtml?from=wap&amp;isappinstalled=1"
                                   target="_blank"><img src="https://images.51rz.com/images/pc/al_zj/6.png"/></a>
                                <div className="media-text">
                                    <h4><a
                                        href="http://zj.sina.com.cn/finance/regional/2017-01-05/detail_f-ifxzkfuh5340881.shtml?from=wap&amp;isappinstalled=11"
                                        target="_blank">供应链金融受青睐 人众金服获立元创投5000万资本注入</a><span>2017-01-05</span></h4>
                                    <p>摘要：人众金服与立元创投签订A轮融资协议，正式宣布获得立元创投5000万人民币投资</p>
                                </div>
                            </li>

                            <li>
                                <a href="http://news.p2peye.com/article-490735-1.html" target="_blank"><img
                                    src="https://images.51rz.com/images/pc/al_zj/7.png"/></a>
                                <div className="media-text">
                                    <h4><a href="http://news.p2peye.com/article-490735-1.html" target="_blank">人众金服宣布获立元创投5000万元A轮融资</a><span>2017-01-04</span>
                                    </h4>
                                    <p>摘要：人众金服与立元创投签订A轮融资协议，正式宣布获得立元创投5000万人民币投资</p>
                                </div>
                            </li>

                            <li>
                                <a href="http://www.wzs.org.cn/zb/201701/t20170105_237756.shtml" target="_blank"><img
                                    src="https://images.51rz.com/images/pc/al_zj/8.png"/></a>
                                <div className="media-text">
                                    <h4><a href="http://www.wzs.org.cn/zb/201701/t20170105_237756.shtml"
                                           target="_blank">供应链金融受青睐 人众金服获立元创投5000万资本注入</a><span>2017-01-05</span></h4>
                                    <p>摘要：发布会上，人众金服与立元创投签订A轮融资协议，正式宣布获得立元创投5000万人民币投资。</p>
                                </div>
                            </li>

                            <li>
                                <a href="http://www.p2pguancha.com/news/5133.html" target="_blank"><img
                                    src="https://images.51rz.com/images/pc/al_zj/9.png"/></a>
                                <div className="media-text">
                                    <h4><a href="http://www.p2pguancha.com/news/5133.html" target="_blank">人众金服完成A轮融资，获立元创投5000万资本注入</a><span>2017-01-04</span>
                                    </h4>
                                    <p>摘要：人众金服与立元创投签订A轮融资协议，正式宣布获得立元创投5000万人民币投资</p>
                                </div>
                            </li>

                            <li>
                                <a href="http://news.trjcn.com/detail_184854.html" target="_blank"><img
                                    src="https://images.51rz.com/images/pc/al_zj/10.png"/></a>
                                <div className="media-text">
                                    <h4><a href="http://news.trjcn.com/detail_184854.html" target="_blank">人众金服获5000万元A轮融资，投资方为立元创投</a><span>2017-01-05</span>
                                    </h4>
                                    <p>摘要：人众金服与立元创投签订A轮融资协议，正式宣布获得立元创投5000万人民币投资</p>
                                </div>
                            </li>

                            <li>
                                <a href="https://m.findaily.cn/appshare/dksShare/?id=1155&amp;from=singlemessage&amp;isappinstalled=1"
                                   target="_blank"><img src="https://images.51rz.com/images/pc/al_zj/11.png"/></a>
                                <div className="media-text">
                                    <h4><a
                                        href="https://m.findaily.cn/appshare/dksShare/?id=1155&amp;from=singlemessage&amp;isappinstalled=1"
                                        target="_blank">坚持“供应链匠心”，人众金服A轮拿到立元创投5000万元注资</a><span>2017-01-04</span></h4>
                                    <p>摘要：人众金服获5000万元A轮融资，投资方为立元创投</p>
                                </div>
                            </li>

                            <li>
                                <a href="http://mt.sohu.com/20170106/n477950386.shtml" target="_blank"><img
                                    src="https://images.51rz.com/images/pc/al_zj/12.png"/></a>
                                <div className="media-text">
                                    <h4><a href="http://mt.sohu.com/20170106/n477950386.shtml" target="_blank">【焦点】供应链金融受青睐，人众金服获立元创投5000万资本注入</a><span>2017-01-06</span>
                                    </h4>
                                    <p>摘要：人众金服A轮融资发布会于1月4日在杭州顺利召开</p>
                                </div>
                            </li>

                            <li>
                                <a href="http://www.ccstock.cn/gscy/qiyexinxi/2017-01-04/A1483519641122.html"
                                   target="_blank"><img src="https://images.51rz.com/images/pc/al_zj/13.png"/></a>
                                <div className="media-text">
                                    <h4><a href="http://www.ccstock.cn/gscy/qiyexinxi/2017-01-04/A1483519641122.html"
                                           target="_blank">供应链金融受青睐 人众金服获立元创投5000万资本注入</a><span>2017-01-04</span></h4>
                                    <p>摘要：众心筑梦.人众金服A轮融资新闻发布会在杭州顺利召开</p>
                                </div>
                            </li>

                            <li>
                                <a href="http://n.cztv.com/news/12372627.html?clearcache=1" target="_blank"><img
                                    src="https://images.51rz.com/images/pc/al_zj/14.png"/></a>
                                <div className="media-text">
                                    <h4><a href="http://n.cztv.com/news/12372627.html?clearcache=1" target="_blank">供应链金融受青睐
                                        人众金服获立元创投5000万资本注入</a><span>2017-01-04</span></h4>
                                    <p>
                                        摘要：人众金服A轮融资发布会于1月4日在杭州顺利召开，该轮投资由国内知名创投机构立元创投投资。以“众心筑梦.人众金服A轮融资新闻发布会”为主题，发布会现场，金融界投资界以及互联网行业等近200位嘉宾共聚一堂，共同见证供应链金融如何成为资本的新宠儿。</p>
                                </div>
                            </li>

                            <li>
                                <a href="http://www.erongtu.com/info/view-index-id-23630.html" target="_blank"><img
                                    src="https://images.51rz.com/images/pc/al_zj/15.png"/></a>
                                <div className="media-text">
                                    <h4><a href="http://www.erongtu.com/info/view-index-id-23630.html" target="_blank">供应链金融受青睐
                                        人众金服获立元创投5000万注入</a><span>2017-01-05</span></h4>
                                    <p>摘要：人众金服与立元创投签订A轮融资协议，正式宣布获得立元创投5000万人民币投资。</p>
                                </div>
                            </li>

                            <li>
                                <a href="http://m.zjol.com.cn/mzjol/details.html?newsid=021414937&amp;from=singlemessage&amp;isap"
                                   target="_blank"><img src="https://images.51rz.com/images/pc/al_zj/16.png"/></a>
                                <div className="media-text">
                                    <h4><a
                                        href="http://m.zjol.com.cn/mzjol/details.html?newsid=021414937&amp;from=singlemessage&amp;isap"
                                        target="_blank">供应链金融受青睐 人众金服获立元创投5000万融资</a><span>2017-01-05</span></h4>
                                    <p>摘要：人众金服与立元创投签订A轮融资协议，正式宣布获得立元创投5000万人民币投资。</p>
                                </div>
                            </li>

                            <li>
                                <a href="http://money.hangzhou.com.cn/investment/content/2017-01/05/content_6436646.htm?from=singlemessage&amp;isappinstalled=0"
                                   target="_blank"><img src="https://images.51rz.com/images/pc/al_zj/17.png"/></a>
                                <div className="media-text">
                                    <h4><a
                                        href="http://money.hangzhou.com.cn/investment/content/2017-01/05/content_6436646.htm?from=singlemessage&amp;isappinstalled=0"
                                        target="_blank">互联网+供应链金融 人众金服获立元创投5000万资本注入</a><span>2017-01-05</span></h4>
                                    <p>摘要：人众金服与立元创投签订A轮融资协议，正式宣布获得立元创投5000万人民币投资。</p>
                                </div>
                            </li>

                            <li>
                                <a href="http://m.zjol.com.cn/mzjol/details.html?newsid=021414937&amp;isappinstalled=0&amp;from=sing"
                                   target="_blank"><img src="https://images.51rz.com/images/pc/al_zj/18.png"/></a>
                                <div className="media-text">
                                    <h4><a
                                        href="http://m.zjol.com.cn/mzjol/details.html?newsid=021414937&amp;isappinstalled=0&amp;from=sing"
                                        target="_blank">供应链金融受青睐 人众金服获立元创投5000万融资</a><span>2017-01-05</span></h4>
                                    <p>摘要：人众金服与立元创投签订A轮融资协议，正式宣布获得立元创投5000万人民币投资。</p>
                                </div>
                            </li>

                            <li>
                                <a href="http://mingin.baijia.baidu.com/article/745952" target="_blank"><img
                                    src="https://images.51rz.com/images/pc/al_zj/19.png"/></a>
                                <div className="media-text">
                                    <h4><a href="http://mingin.baijia.baidu.com/article/745952" target="_blank">人众金服获立元创投5000万资本注入</a><span>2017-01-06</span>
                                    </h4>
                                    <p>摘要：人众金服与立元创投签订A轮融资协议，正式宣布获得立元创投5000万人民币投资。</p>
                                </div>
                            </li>

                            <li>
                                <a href="http://news.10jqka.com.cn/20170105/c595899734.shtml" target="_blank"><img
                                    src="https://images.51rz.com/images/pc/al_zj/20.png"/></a>
                                <div className="media-text">
                                    <h4><a href="http://news.10jqka.com.cn/20170105/c595899734.shtml" target="_blank">供应链金融受青睐，人众金服获立元创投5000万资本注入</a><span>2017-01-05</span>
                                    </h4>
                                    <p>摘要：人众金服与立元创投签订A轮融资协议，正式宣布获得立元创投5000万人民币投资。</p>
                                </div>
                            </li>

                        </ul>
                    </section>

                    <section className="al-bottom"></section>

                </article>
            </div>
        )
    }
}

render(<Alzj/>, document.getElementById('app'))