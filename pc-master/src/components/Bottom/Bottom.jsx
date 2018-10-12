import React, {Component} from 'react';
import {connect} from 'react-redux';
import BottomCss from './Bottom.scss';

const Bottomtop = (props) => {
    return (
        <div className={BottomCss.Bottomtop}>
            <div className={BottomCss.topzhe}>
                <div className={BottomCss.topcontent}>
                    <ul className={BottomCss.about}>
                        <li>
                            <h5>关于人众</h5>
                            <ul>
                                <li><a href="/aboutus.html#/">公司概况</a></li>
                                <li><a href="/aboutus.html#/grow">成长大事件</a></li>
                                <li><a href="/aboutus.html#/team">高管介绍</a></li>
                                <li><a href="/information.html#/honor">企业荣誉</a></li>
                            </ul>
                        </li>
                        <li>
                            <h5>安全保障</h5>
                            <ul>
                                <li><a href="/information.html#/safe?safety=safe0">银行存管</a></li>
                                <li><a href="/information.html#/safe?safety=safe3">ICP许可证</a></li>
                                <li><a href="/information.html#/safe?safety=safe1">风控措施</a></li>
                                <li><a href="/information.html#/safe?safety=safe2">技术保障</a></li>
                            </ul>
                        </li>
                        <li>
                            <h5>帮助中心</h5>
                            <ul>
                                <li><a href="/help.html#/binging">认证绑卡</a></li>
                                <li><a href="/help.html#/recharge">充值提现</a></li>
                                <li><a href="/help.html#/invest">投资转让</a></li>
                                <li><a href="/help.html#/redpack">红包加息券</a></li>
                            </ul>
                        </li>
                    </ul>
                    <div className={BottomCss.about1}>
                        <h5>关注我们</h5>
                        <ul>
                            <li>
                                <div className={BottomCss.alert}>
                                    <div className={BottomCss.downloadImg}></div>
                                    <div className={BottomCss.arrow}></div>
                                </div>
                                <div className={BottomCss.img}></div>
                                <p>关注官方微信</p>
                            </li>
                            <li>
                                <a target="_blank" href="http://weibo.com/51RZjf">
                                    <div className={BottomCss.img}></div>
                                    <p>关注官方微博</p>
                                </a>
                            </li>
                            <li>
                                <div className={BottomCss.alert}>
                                    <div className={BottomCss.downloadImg}></div>
                                    <div className={BottomCss.arrow}></div>
                                </div>
                                <div className={BottomCss.img}></div>
                                <p>下载手机APP</p>
                            </li>
                        </ul>
                    </div>
                    <div className={BottomCss.connect}>
                        <div className={BottomCss.tel}>
                            <p>全国服务热线</p>
                            <div className={BottomCss.telphone}>400-655-8858</div>
                        </div>
                        <div className={BottomCss.work}>
                            <p>工作时间</p>
                            <div className={BottomCss.worktime}>9:00-20:30<span>(工作日)</span></div>
                            <div className={BottomCss.worktime}>9:00-17:30<span>(节假日)</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Bottombottom = (props) => {
    return (
        <div className={BottomCss.bottom}>
            <div className={BottomCss.bottomcontent}>
                <div className={BottomCss.link}>
                    <span>友情链接</span>
                    <span className={BottomCss.split}>|</span>
                    <a target="_blank" href="http://www.nifa.org.cn/nifa/index.html">中国互联网金融协会</a>
                    <a target="_blank" href="http://www.z-aif.com/">浙江互联网金融联合会</a>
                    <a target="_blank" href="javascript:void(0)">杭州市互联网金融协会</a>
                    <a target="_blank" href="https://www.ifcert.org.cn/home/index">国家互联金融安全技术专家委员会</a>
                    <a target="_blank" href="http://www.czifi.org/">互联网金融研究院</a>
                    <a target="_blank" href="http://www.wdzj.com/">网贷之家</a>
                    <a target="_blank" href="http://www.p2peye.com/">网贷天眼</a>
                    <a target="_blank" href="http://www.51wangdai.com/">51网贷</a>
                </div>
                <div className={BottomCss.copyright}>
                    <div className={BottomCss.copyLeft}>
                        <p>版权所有©浙江人众金融服务股份有限公司 Copyright Reserved 2015
                        </p>
                        <p>浙ICP备13009823号-1 ICP许可证编号浙B2-20160795</p>
                        <a>
                            <img src="https://images.51rz.com/images/rebuild/pc/img/wj.png" alt=""/>
                            <p>浙公网安备 33010602002203号 </p>
                        </a>
                    </div>
                    <div className={BottomCss.copyRight}>
                        <a href="/bottomInformation.html"><img src="https://images.51rz.com/images/rebuild/pc/img/copy1.png" alt=""/></a>
                        <a href="https://v.pinpaibao.com.cn/authenticate/cert/?site=www.51rz.com&at=realname"><img
                            src="https://images.51rz.com/images/rebuild/pc/img/copy2.png" alt=""/></a>
                        <a href="https://trustsealinfo.websecurity.norton.com/splash?form_file=fdf/splash.fdf&dn=www.51rz.com&lang=zh_cn"><img
                            src="https://images.51rz.com/images/rebuild/pc/img/copy3.png" alt=""/></a>
                        <a href="https://credit.cecdc.com/CX20141016005276005368.html"><img src="https://images.51rz.com/images/rebuild/pc/img/copy4.png"
                                                                                            alt=""/></a>
                        <a href="https://credit.cecdc.com/CX20160108013168880587.html"><img src="https://images.51rz.com/images/rebuild/pc/img/copy5.png"
                                                                                            alt=""/></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

class Bottom extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            type
        } = this.props;

        return (
            <div className={BottomCss.Bottom}>
                {type != 'login' && type != 'register' && type != 'loginPassForget' && <Bottomtop/>}
                <Bottombottom/>
            </div>
        )
    }
}

Bottom = connect((store) => ({store}))(Bottom);
export default Bottom;