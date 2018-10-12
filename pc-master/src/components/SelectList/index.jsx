import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from 'react-router'
import Css from "./index.scss";

import store from "@/store/store.js";

class SelectList extends Component{
    constructor(props){
        super(props);
        this.state={
            showLists:false,//是否显示下拉列表
            activeItem:null
        }
    }
    componentDidMount(){

    }
    toggleShowLists(){
        this.setState({
            showLists:!this.state.showLists
        })
    }
    selectItem(e,i,activeItem){
        this.setState({
            showLists:false,
            activeItem
        });
        const {onChange=()=>{}}=this.props;
        onChange(i,activeItem);
    }
    componentWillReceiveProps(props){
        const {
            activeIndex,
            lists
        }=props
        this.setState({
            activeItem:lists[activeIndex]
        })
    }
    render(){
        let {title='',lists=[],onChange=()=>{},style={}}=this.props
        let {activeItem}=this.state

        let titleTxt=''

        if(title){
            if(!activeItem){
                titleTxt=title
            }else{
                titleTxt=activeItem.text
            }
        }else{
            titleTxt= activeItem?activeItem.text:lists.length&&lists[0].text||''
        }

        const Title=<div className={Css.title} onClick={()=>{this.toggleShowLists()}}>{titleTxt}</div>
        const Lists=lists.map((item,i)=>{
            return <li key={i} onClick={(e,index,_item)=>{this.selectItem(e,i,item)}}>{item.text}</li>
        })

        return (
            <div className={Css.select} style={style} onMouseLeave={()=>{this.setState({showLists:false})}}>
                {Title}
                {this.state.showLists && <div className={Css.listWraper}><ul>{Lists}</ul></div>}
            </div>
        )
    }
}

SelectList = connect((store) => ({store: store}))(SelectList);
export default withRouter(SelectList);