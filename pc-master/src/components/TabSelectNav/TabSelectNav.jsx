
import React, {Component} from "react";
import {withRouter} from 'react-router'
import Css from "./TabSelectNav.scss";


class TabSelectNav extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    componentWillReceiveProps(props){
        // alert(props.activeIndex);
    }
    selectItem(e,index,nav){
        const {onCurrentChange}=this.props;
        onCurrentChange && onCurrentChange(index,nav,e);
    }
    render(){
        let {activeIndex,navs,style={}}=this.props;
        const navsLists=navs.map((nav,index)=>{
            const {style}=nav;
            return (
                <li onClick={(e,i,item)=>{this.selectItem(e,index,nav)}}
                    key={index}
                    className={index==activeIndex?Css.active:''}
                    style={style}
                >
                    {nav.text}
                </li>
            )
        })
        return (
            <ul style={style} className={Css.navs}>{navsLists}</ul>
        );
    }
}

export default withRouter(TabSelectNav);
