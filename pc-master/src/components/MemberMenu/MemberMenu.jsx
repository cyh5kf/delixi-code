import React, {Component} from "react";
import {Link, IndexLink, NavLink} from 'react-router-dom';
import {connect} from "react-redux";
import {withRouter} from 'react-router'
import Css from "./MemberMenu.scss";

import store from "@/store/store.js";
import {setUserInfo, setMsg} from "@/store/action.js";

import API from "@/api/api.js";

const axios = require("axios");
class UserHead extends Component {
    constructor(props) {
        super(props);
        this.state = {
            obj: {}
        }
        this.handelChange = this.handelChange.bind(this)
        this.changeName = this.changeName.bind(this)
        this.save = this.save.bind(this);
        this.getObjectURL = this.getObjectURL.bind(this);
    }

    getObjectURL(file) {
        var url = null;
        if (window.createObjectURL != undefined) {
            url = window.createObjectURL(file)
        } else if (window.URL != undefined) {
            url = window.URL.createObjectURL(file)
        } else if (window.webkitURL != undefined) {
            url = window.webkitURL.createObjectURL(file)
        }
        return url
    };

    async handelChange(e) {
        let form = new FormData();
        let file = e.target.files[0];
        this.refs.touxiang.style.backgroundImage = 'url(' + this.getObjectURL(e.target.files[0]) + ')';
        form.append('file', file, file.name);
        form.append('token', this.props.token);
        this.setState({
            obj: form
        })
    }

    async save() {
        const {touxiang, modifytx, h4} = this.refs;
        if (this.state.obj == {}) {
            return;
        }
        // 添加请求头
        await axios.post(API.uploadImage, this.state.obj)
            .then(response => {
                if (response.data.responseCode == '000000') {
                    touxiang.style.backgroundImage = 'url(' + response.data.obj + ')';
                    modifytx.style.display = 'none';
                    h4.style.backgroundImage = 'url(' + response.data.obj + ')';
                    this.setState({
                        obj: {}
                    })
                    const oldUserInfo = this.props.store.userInfo
                    this.props.dispatch(setUserInfo({...oldUserInfo, head: response.data.obj}))
                    this.props.dispatch(setMsg(response.data.responseMessage))
                }

            })
    }

    async changeName() {
        // this.setState({
        //     nickName: this.refs.nickName.value
        // })
        // const param = {
        //     token: this.props.token,
        //     nickName: this.refs.nickName.value
        // }
        // const obj = API.post(API.changeNickName, param);
    }

    render() {
        const {phone, head,userType} = this.props;
        const {touxiang, modifytx} = this.refs
        const {realNameStatus}=this.props.store.userInfo
        return (
            <div className={Css.userHead}>
                <h4 ref="h4" style={{backgroundImage: 'url(' + head + ')'}} onClick={() => {
                    modifytx.style.display = 'block'
                }}>
                    <div className={Css.modify}>修改头像</div>
                </h4>
                <div className="modifytx" ref="modifytx">
                    <div className="modifybox">
                        <h5>头像修改</h5>
                        <label htmlFor="file">
                            <div className="picture" style={{backgroundImage: 'url(' + head + ')', cursor: 'pointer'}}
                                 ref="touxiang"></div>
                        </label>
                        <div className="btnbox">
                            <label htmlFor="file">
                                <div className="btn1">上传本地照片</div>
                                <input type="file" name="file" id="file" style={{display: 'none'}}
                                       accept="image/png,image/gif,image/jpeg,image/jpg" onChange={(e) => {
                                    this.handelChange(e);
                                }}/>
                            </label>
                            <div className="btn2" onClick={() => {
                                this.save()
                            }}>保存
                            </div>
                        </div>
                        <div className="close" onClick={() => {
                            touxiang.style.backgroundImage = 'url(' + head + ')';
                            modifytx.style.display = 'none';
                            this.setState({
                                obj: {}
                            })
                        }}></div>
                    </div>
                </div>
                <p className={Css.phoneTxt}>{phone}</p>
                {
                    userType!=2 && <ul>
                        <li><NavLink to={'/safeCenter'}/><div className={Css.tips}>已绑定手机</div></li>
                        <li style={{backgroundImage: !!realNameStatus ? 'url(https://images.51rz.com/images/rebuild/pc/img/member/bank_abled.png)' : 'url(https://images.51rz.com/images/rebuild/pc/img/member/bank_disable.png)'}}>
                            <NavLink to={'/safeCenter'}/>
                            <div className={Css.tips}>{!!realNameStatus?'已开通存管':'请开通存管'}</div>
                        </li>
                        {/*<li style={{backgroundImage: !!this.props.store.messageStatus ? 'url(https://images.51rz.com/images/rebuild/pc/img/member/email_enable.png)' : 'url(https://images.51rz.com/images/rebuild/pc/img/member/email_disable.png)'}}><NavLink to={'/message'}/></li>*/}
                        <li style={{backgroundImage: 'url(https://images.51rz.com/images/rebuild/pc/img/member/email_enable.png)'}}><NavLink to={'/message'}/><div className={Css.tips}>消息中心</div></li>
                    </ul>
                }

            </div>
        )
    }

}
UserHead = connect((store) => ({store}))(UserHead);
import OpenCunGuanDialog from "@/components/OpenCunGuanDialog/index.jsx"

const AviteFriends = (props) => {
    return (
        <div className={Css.avite}>
            <a href="/invite.html"><span >邀请好友</span></a>
        </div>
    )
}

class LeftMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }

    componentDidMount() {

    }

    render() {
        const {
            style = {},
            routeConfig,
            userType=1,////1：投资人 2：借款人 3：既是投资人又是借款人   如果没有该字段  则默认为投资人
        } = this.props;

        let menu = routeConfig.map((nav, index) => {

            if (!nav.sub) {
                return <li key={index}>
                    <h4 key={nav.text} className={Css.title}>
                        <NavLink to={nav.to} activeStyle={{color: "#d7a55e"}}>{nav.text}</NavLink>
                    </h4>
                </li>
            } else {

                let subs = nav.sub.map((_sub, i) => {
                    if (_sub.checkRealName && this.props.store.userInfo.realNameStatus != 1) {
                        return <p className={Css.sub_title}
                                  key={i}
                                  onClick={() => {
                                      this.setState({
                                          show: true
                                      })
                                  }}
                                  style={{
                                      cursor: 'pointer'
                                  }}
                        >
                            {_sub.text}
                        </p>

                    } else {
                        return (<p className={Css.sub_title} key={i}>
                                <NavLink key={i} to={_sub.to} activeStyle={{color: "#d7a55e"}}>{_sub.text}</NavLink>
                            </p>
                        )
                    }

                })
                return (
                    <li key={index}>
                        <h4 key={nav.text} className={Css.title}>
                            {nav.text}
                        </h4>
                        {subs}
                    </li>

                )
            }
        });
        const phone = this.props.store.userInfo.userName;
        const head = this.props.store.userInfo.head || 'https://images.51rz.com/images/rebuild/pc/img/member/avator.gif';

        return (
            <div style={style} id="memberMenu" className={Css.leftMenu}>
                <UserHead phone={phone} head={head} token={this.props.store.userInfo.token} userType={userType}/>
                {this.props.store.userInfo.realNameStatus != 1 &&
                <OpenCunGuanDialog show={this.state.show} close={() => {
                    this.setState({
                        show: false
                    })
                }
                }/>}
                {userType!=2 && <AviteFriends />}
                <ul className={Css.menu_ul}>
                    {menu}
                </ul>
            </div>
        );
    }
}

LeftMenu = connect((store) => ({store}))(LeftMenu);
export default withRouter(LeftMenu);