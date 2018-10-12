import React, {Component} from "react";
import {render} from "react-dom";
import Css from "./index.scss";

class BottomSingle extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {

        return (<div className={Css.bottomWraper}>
            <div className={Css.content}>
                <div className={Css.banquan}>
                    版权所有©浙江人众金融服务股份有限公司 Copyright Reserved 2015   浙ICP备13009823号-1
                    <a className={Css.icp}>ICP许可证编号浙B2-20160795</a>
                    <a className={Css.gongan} href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010602002203">浙公网安备 33010602002203号</a>
                </div>
                <div className={Css.icons}>
                    <a href="/bottomInformation.html"><img src="https://images.51rz.com/images/rebuild/pc/img/copy1.png" alt=""/></a>
                    <a href="https://v.pinpaibao.com.cn/authenticate/cert/?site=www.51rz.com&at=realname"><img src="https://images.51rz.com/images/rebuild/pc/img/copy2.png" alt=""/></a>
                    <a href="https://trustsealinfo.websecurity.norton.com/splash?form_file=fdf/splash.fdf&dn=www.51rz.com&lang=zh_cn"><img src="https://images.51rz.com/images/rebuild/pc/img/copy3.png" alt=""/></a>
                    <a href="https://credit.cecdc.com/CX20141016005276005368.html"><img src="https://images.51rz.com/images/rebuild/pc/img/copy4.png" alt=""/></a>
                    <a href="https://credit.cecdc.com/CX20160108013168880587.html"><img src="https://images.51rz.com/images/rebuild/pc/img/copy5.png" alt=""/></a>
                </div>
            </div>
        </div>);
    }
}

export default BottomSingle