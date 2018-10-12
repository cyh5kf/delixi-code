import React, {Component} from "react";
import {connect} from "react-redux";

import Css from "@/components/TopBanner/TopBanner.scss";

import {setMsg} from "@/store/store.js";


import swiper from "@/assets/js/idangerous.swiper.js"

import OpenCunGuanDialog from  "@/components/OpenCunGuanDialog/index.jsx"


class TopBanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showOpen: false
        }
    }

    componentDidUpdate() {
        if (this.props.bannerList.length && !this.banner) {
            this.banner = new swiper(".swiper-container", {
                pagination: '.pagination',
                loop: true,
                autoplay: 3000,
                autoplayDisableOnInteraction: false,
                paginationClickable: true
            });
        }
    }

    showOpen() {
        this.setState({
            showOpen: true
        })
    }
    compileStr = (code) => { //对字符串进行加密
        let c=String.fromCharCode(code.charCodeAt(0)+code.length);
        for(let i=1;i<code.length;i++) {
            c+=String.fromCharCode(code.charCodeAt(i)+code.charCodeAt(i-1));
        }
        return escape(c);
    }

    render() {
        const {token,userName} = this.props.store.userInfo
        const notice = this.props.store.messageStatus
        const banner = !!this.props.bannerList.length && this.props.bannerList.map((v, i) =>
                <div key={i} className="swiper-slide slide1">
                    <a href={`${v.linkurl}?name=${userName?this.compileStr(String(userName)):''}&notice=${notice}&type=${document.domain.split('.')[0]}&token=${token? token: ''}`}>
                        <img src={v.imgUrl}/>
                    </a>
                </div>
            )
        const income=this.props.income.toFixed(2);
        const num=income.split('.')
        return (
            <div className="device">
                {this.props.store.userInfo.realNameStatus != 1 && <OpenCunGuanDialog show={this.state.showOpen}/>}
                <div className="incomebox">
                    {this.props.store.userInfo.token ? <div className={Css.income}>
                        <p className={Css.incomename}>尊敬的用户{this.props.store.userInfo.userName || ''}，您好！</p>
                        <p className={Css.incometoday}>个人收益（元）</p>
                        <p className={Css.incomenum}>{num[0]}<span>.{num[1]}</span></p>
                        <div className={Css.button}><a href="/projectList.html">立即投资</a></div>
                        {this.props.store.userInfo.realNameStatus == 1 ?
                            <a className={Css.chongzhi} href="/member/index.html#/recharge">充值</a> :
                            <a className={Css.chongzhi} href="javascript:void(0)" onClick={() => {
                                this.showOpen()
                            }}>充值</a>}
                    </div> : <div className={Css.income}>
                        <p className={Css.incometoday} style={{marginTop: 10}}>历史最高年化收益率</p>
                        <p className={Css.incomenum} style={{fontSize: '72px',margin: '40px 0px 30px 0px',lineHeight: '50px'}}>15<span>.0%</span></p>
                        {
                            this.props.ishow&&<p style={{textAlign:'center',fontSize:'12px',color:'#ff9b09',width:'100%',display:'inline-block',padding:'0 35px 10px 35px'}}>{this.props.ishow}</p>

                        }
                        <div className={Css.button}><a href="/register.html">注册即送1716元+加息券</a></div>
                        <a href="/login.html" className={Css.chongzhi} style={{padding: '0 35px', textAlign: 'center',fontSize:'14px'}}>立即登录</a>
                        <span style={{fontSize:'14px',color:'#555',textAlign:'center',width:'100%',display:'inline-block',paddingTop:'10px'}}>温馨提示：市场有风险，出借需谨慎</span>
                    </div>}
                </div>
                <div className="swiper-container" style={{cursor:'pointer'}}
                     onMouseEnter={() => {
                         this.banner&&this.banner.stopAutoplay();
                     }}
                     onMouseLeave={()=>{
                         this.banner&&this.banner.startAutoplay();
                     }}
                >
                    <div className="swiper-wrapper">
                        {banner}
                    </div>
                    <div className="pagination"></div>
                </div>
            </div>
        );
    }
}

TopBanner = connect((store) => ({store: store}))(TopBanner);

export default TopBanner;