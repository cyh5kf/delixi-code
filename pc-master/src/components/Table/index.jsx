/**props :
 * columns :required ,
 * data :required ,
 * style （table的样式 如外边距之类）

columns:[
    {
        title:'日期',
        key:'date',
        style:{
            width:'100px'
        }
    },
    {// 自定义内容（样式控制  事件绑定。。。 ）
        title:'操作',
        render:(rowData)=>{
            let className=rowData.status==1?Css.red:Css.blue;
            return (
                <div onClick={(env,e)=>{self.aaa(env,e,rowData)}} className={className}>
                    自定义
                </div>
            )
        }
    }
]

data:[
 {date:'2017-12-21',name:'习大大0',address:'北京',status:1},
 {date:'2017-12-21',name:'习大大1',address:'北京',status:2},
]
**/

import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from 'react-router'
import Css from "./index.scss";

import store from "@/store/store.js";


class TableComp extends Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }
    render(){
        const {columns=[],data=[],style={}}=this.props

        const ths=columns.map((column,index)=>{
            const {style={},title}=column
            return (
                <th key={index} style={style}>{title}</th>
            )
        });
        const TabHead=(<thead><tr>{ths}</tr></thead>)

        const rows=data.map((rowData,index)=>{
            let row=[];

            columns.map((column,i)=>{
                let {render,style={}}=column;

                if(render){//有自定义渲染方法
                    row.push(<td key={i} style={style}>{render(rowData)}</td>);
                }else{
                    row.push(<td key={i} style={style}>
                        {rowData[column.key]}
                    </td>);
                }
            })
            return <tr key={index}>{row}</tr>
        });

        const TabBody=<tbody>{rows}</tbody>;

        return (
            <table className={Css.table} style={style}>
                {TabHead}
                {TabBody}
            </table>
        );
    }
}

TableComp = connect((store) => ({store: store}))(TableComp);
export default withRouter(TableComp);