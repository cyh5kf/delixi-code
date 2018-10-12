import React, {Component} from "react";
import {connect} from "react-redux";
import Css from "./Maintain.scss";
import API from "@/api/api.js";
import store from "@/store/store.js";
import {setMaintain} from "@/store/action.js";

class Maintain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            returnMsg: '维护中',
            type: 0,//0.正常1.维护中(弹窗可关闭)2.停机中3.升级
            display: false
        }
    }

    componentWillReceiveProps(props) {
        if (props.store.maintainMsg.type) {
            this.setState({
                ...props.store.maintainMsg,
                // display: (props.store.maintainMsg.type == 0 || localStorage.hasTips == props.store.maintainMsg.type) ? false : true
            })
        }
    }


    close = () => {
        this.setState({
            display: false,
        })
    }

    render() {
        const {returnMsg, type, display} = this.state;
        return (
            <div className={Css.mask} style={{display: display ? 'block' : 'none'}}>
                <div className={Css.dialog}>
                    {type == 1&&<div onClick={() => {
                        this.close()
                    }} className={Css.close}></div>}
                    <h3>人众金服平台升级提醒</h3>
                    <p>{returnMsg}</p>
                    <p className={Css.time}>2017.12.29</p>
                </div>
            </div>
        )
    }
}
Maintain = connect((store) => ({store}))(Maintain);
export default Maintain;