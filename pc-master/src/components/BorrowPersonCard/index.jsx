import React, {Component} from "react";
import {withRouter} from 'react-router'
import Css from "./index.scss";

const  BorrowPersonCard=(props)=>{
    const {
        borrowDetailType,//company person
        userInfoVoList
    }=props
    const empty='--'
    return borrowDetailType == 'company'?<div className={Css.borrowPersonInfoDialog}>
        <h5>借款企业动态信息详情</h5>
        <table className={`${Css.gridTable} ${Css.first}`}>
            <thead>
            <tr>
                <th>全称或简称</th>
                <th>所属行业</th>
                <th>注册资本</th>
                <th>注册地址</th>
                <th>成立时间</th>
                <th>法定代表人</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>{userInfoVoList.companyName||empty}</td>
                <td>{userInfoVoList.industry||empty}</td>
                <td>{userInfoVoList.regCapital||empty}</td>
                <td>{userInfoVoList.regAddress||empty}</td>
                <td>{userInfoVoList.companyCreateTime||empty}</td>
                <td>{userInfoVoList.frdbName||empty}</td>
            </tr>
            </tbody>
        </table>
        <table className={Css.gridTable}>
            <thead>
            <tr>
                <th>借款用途</th>
                <th>借款金额（元）</th>
                <th>资金运用情况</th>
                <th>运营状况及财务状况</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>{userInfoVoList.purposeLoan||empty}</td>
                <td>{userInfoVoList.borroAmount||empty}</td>
                <td>{userInfoVoList.applicationAmount||empty}</td>
                <td>{userInfoVoList.financial||empty}</td>
            </tr>
            </tbody>
        </table>
        <table className={Css.gridTable}>
            <thead>
            <tr>
                <th>在平台逾期次数</th>
                <th>在平台逾期总金额</th>
                <th>其他借款信息</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>{userInfoVoList.overdueCount||0}</td>
                <td>{userInfoVoList.overdueAmount||0}</td>
                <td>{userInfoVoList.otherInfo||'无'}</td>
            </tr>
            </tbody>
        </table>
        <table className={Css.gridTable}>
            <thead>
            <tr>
                <th>股东信息</th>
                <th>法定代表人信用信息</th>
                <th>实缴资本</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>股东名称：{userInfoVoList.shareholder||empty}</td>
                <td>{userInfoVoList.credit||empty}</td>
                <td>{userInfoVoList.contributed||empty}</td>
            </tr>
            </tbody>
        </table>
        <table className={Css.gridTable}>
            <thead>
            <tr>
                <th>办公地点</th>
                <th>经营区域</th>
                <th>涉诉情况</th>
                <th>行政处罚情况</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>{userInfoVoList.officeLocation||empty}</td>
                <td>{userInfoVoList.manageDistrict||empty}</td>
                <td>{userInfoVoList.prosecute||'无'}</td>
                <td>{userInfoVoList.punishments||'无'}</td>
            </tr>
            </tbody>
        </table>
    </div>:<div className={Css.borrowPersonInfoDialog}>
        <h5>借款人动态信息详情</h5>
        <table className={`${Css.gridTable} ${Css.first}`}>
            <thead>
            <tr>
                <th>姓名</th>
                <th>身份证</th>
                <th>手机号</th>
                <th>借款用途</th>
                <th>借款金额（元）</th>
                <th>资金运用情况</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>{userInfoVoList.name||empty}</td>
                <td>{userInfoVoList.cardId||empty}</td>
                <td>{userInfoVoList.mobile||empty}</td>
                <td>{userInfoVoList.purposeLoan||empty}</td>
                <td>{userInfoVoList.borroAmount||empty}</td>
                <td>{userInfoVoList.applicationAmount||empty}</td>
            </tr>
            </tbody>
        </table>
        <table className={Css.gridTable}>
            <thead>
            <tr>
                <th>在平台逾期次数</th>
                <th>在平台逾期总金额</th>
                <th>其他借款信息</th>
                <th>涉诉情况</th>
                <th>行政处罚情况</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>{userInfoVoList.overdueCount||0}</td>
                <td>{userInfoVoList.overdueAmount||0}</td>
                <td>{userInfoVoList.otherInfo||'无'}</td>
                <td>{userInfoVoList.prosecute||'无'}</td>
                <td>{userInfoVoList.punishments||'无'}</td>
            </tr>
            </tbody>
        </table>
    </div>
}

export default withRouter(BorrowPersonCard);