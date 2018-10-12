import React, {Component} from "react";
// import {connect} from "react-redux";
import {withRouter} from 'react-router'
import Css from "./index.scss";

const repeatStr=(chart='*',length=0)=>{
    let str = ''
    length=length<0?0:length
    for(var i=0;i<length;i++){
        str+=chart
    }
    return str
}

const BankCard=(props)=>{
    let {
        icon='',
        bankName='',
        bankId='',
        userName='',
        cardId='',
        style={}
    }=props;
    bankId=`${bankId.substr(0,4)}${repeatStr('*',bankId.length-8)}${bankId.substr(bankId.length-4,bankId.length)}`
    userName=`${userName.substr(0,1)}${repeatStr('*',userName.length-1)}`
    cardId=`${cardId.substr(0,3)}${repeatStr('*',cardId.length-6)}${cardId.substr(cardId.length-3,cardId.length)}`

    return (
        <div className={Css.bankCard} style={style}>
            <h4 ><img src={`${icon}`} />{bankName}</h4>
            <h3>{bankId}</h3>
            <h5 className={'clearfix'}>
                <span className={'fn-fl'}>{userName}</span>
                <span className={'fn-fr'}>{cardId}</span>
            </h5>
        </div>
    )
}

// Test = connect((store) => ({store: store}))(Test);
export default withRouter(BankCard);