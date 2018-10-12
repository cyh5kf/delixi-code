import React, {Component} from 'react';
import { Table, Icon, Divider } from 'antd';
import styles from './ChartsForTable.less'
export default class ChartsFoTable extends Component {
    render() {
        const columns = [{
            title: '日期',
            dataIndex: 'name',
            key: 'name',
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: '交易规模',
            dataIndex: 'age',
            key: 'age',
        }];

        const data = [{
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        }, {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        }, {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        }];
        return (
            <div className={styles.chartsFoTable}>
                <Table columns={columns} dataSource={data} />
            </div>
        )
    }
}
