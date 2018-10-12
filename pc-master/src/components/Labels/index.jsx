import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from 'react-router'
import Css from "./index.scss";

import store from "@/store/store.js";

class Labels extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    componentWillReceiveProps(props){
        // alert(props.activeIndex);
    }
    selectItem(e,i,label){
        const {onCurrentChange=()=>{}}=this.props;
        onCurrentChange(i,label,e);
    }
    render(){
        //有两种风格  一种是蓝色的小按钮的方式   另一种是黑灰色可点击方式（ activeType=disable）
        let {activeIndex=0,labels,style={},activeType=''}=this.props;
        let self=this;
        const labelsLists=labels.map((label,index)=>{
            const {style={},disabled=false}=label;
            return (
                <li onClick={(e,arg1,arg2)=>{self.selectItem(e,index,label)}}
                    key={index}
                    className={`${index==activeIndex?activeType!='disable'&&Css.active:''} ${disabled?Css.disabled:''}`}
                    style={style}
                >
                    {label.text}
                </li>
            )
        })
        return (
            <ul style={style} className={Css.labels}>{labelsLists}</ul>
        );
    }
}
Labels = connect((store) => ({store}))(Labels);
export default withRouter(Labels);