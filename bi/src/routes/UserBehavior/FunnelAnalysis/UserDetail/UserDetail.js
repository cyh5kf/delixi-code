import React from 'react';
import {Card, Table, Icon, Divider} from 'antd';
import styles from './UserDetail.less';

export default class UserDetail extends React.Component {
    render() {
        const columns = [{
            title: '用户ID',
            dataIndex: 'userID',
            key: 'userID',
        }, {
            title: '下载时间',
            dataIndex: 'downloadTime',
            key: 'downloadTime',
        }, {
            title: '下载来源',
            dataIndex: 'downloadSrc',
            key: 'downloadSrc',
        }, {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        }, {
            title: '在投金额',
            dataIndex: 'investmentAmount',
            key: 'investmentAmount',
        }, {
            title: '可用余额',
            dataIndex: 'balance',
            key: 'balance',
        }, {
            title: '站岗资金',
            dataIndex: 'funds',
            key: 'funds',
        }, {
            title: '已获收益',
            dataIndex: 'income',
            key: 'income',
        }, {
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
        }];
        const data = [{
            key: '1',
            userID: '123',
            downloadTime: '2018-03-02 23:53:31.509',
            downloadSrc: '91助手',
            name: '李豆豆',
            age: '51',
            investmentAmount:'900,000,000',
            balance:'200,000',
            funds: '3,000',
            income: '3,000.00',
            sex:'女'
        }, {
            key: '2',
            userID: '123',
            downloadTime: '2018-03-02 23:53:31.509',
            downloadSrc: '91助手',
            name: '李豆豆',
            age: '51',
            investmentAmount:'900,000,000',
            balance:'200,000',
            funds: '3,000',
            income: '3,000.00',
            sex:'女'
        }, {
            key: '3',
            userID: '123',
            downloadTime: '2018-03-02 23:53:31.509',
            downloadSrc: '91助手',
            name: '李豆豆',
            age: '51',
            investmentAmount:'900,000,000',
            balance:'200,000',
            funds: '3,000',
            income: '3,000.00',
            sex:'女'
        }, {
            key: '4',
            userID: '123',
            downloadTime: '2018-03-02 23:53:31.509',
            downloadSrc: '91助手',
            name: '李豆豆',
            age: '51',
            investmentAmount:'900,000,000',
            balance:'200,000',
            funds: '3,000',
            income: '3,000.00',
            sex:'女'
        }, {
            key: '5',
            userID: '123',
            downloadTime: '2018-03-02 23:53:31.509',
            downloadSrc: '91助手',
            name: '李豆豆',
            age: '51',
            investmentAmount:'900,000,000',
            balance:'200,000',
            funds: '3,000',
            income: '3,000.00',
            sex:'女'
        }];
        return (
            <div className={styles.userDetail}>
                <Card>
                    <Table columns={columns} dataSource={data}/>
                </Card>
            </div>
        )
    }
}