import React,{Component} from "react";
import Css from "./index.scss";

const Tip =(props)=>{
    let {text='',active=false,style={},type='top',children}=props

    const statusClass=active?Css.active:''
    const animationClass={
        top:Css.top,
        bottom:Css.bottom,
        fade:Css.fade
    }
    return (
        <div style={style} className={`${Css.tip} ${statusClass} ${animationClass[type]}`} >
            {text||children||null}
        </div>
    )
}

export default Tip;