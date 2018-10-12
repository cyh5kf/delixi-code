import React, {Component} from "react";
// import {connect} from "react-redux";
import {withRouter} from 'react-router'
import Css from "./index.scss";

// import store from "@/store/store.js";

/**
 * @props
 * text       String
 * onClick    Function
 * type       String  (red,blue,borderRed,borderBlue)
 * style      Object
 * href       Boolean   是否是跳转链接
 * **/

class Btn extends Component{
    constructor(props){
        super(props);
        this.state={

        };
    }
    render(){
        const {text='确定',onClick=()=>{},type='red',style={},href=''}=this.props
        const typeConfig={
            red:Css.red,
            blue:Css.blue,
            gray:Css.gray,
            borderRed:Css.borderRed,
            borderBlue:Css.borderBlue,
        }
        return href?<a className={`${Css.btn} ${typeConfig[type]}`} style={style} href={href} >
            {text}
        </a>:<div className={`${Css.btn} ${typeConfig[type]}`} style={style} onClick={(e)=>{onClick(e)}}>
            {text}
        </div>
    }
}

// Btn = connect((store) => ({store}))(Btn);
export default Btn;