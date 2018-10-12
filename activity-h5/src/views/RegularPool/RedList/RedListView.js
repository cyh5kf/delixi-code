import React from 'react';
import RedListToast from './RedListToastView'
import './RedListView.less';
import {Table,Button} from 'antd';
const {Column } = Table;
import { createColumn } from 'utils/utils';
export default class RedListView extends React.Component {
    constructor(props) {
        super(props);
    }
    // 生成表格
    getColumns = ()=> {
        var {store, actions} = this.props;
        var columns = [
            createColumn('序号', 'row_number', function (text, record, index) {
                return index + 1;
            }),
            createColumn('活动名称', 'name'),
            createColumn('期限限制','limitBorrowDay'),
            createColumn('最低投资额限制','limit_threshold'),
            createColumn('有效期限制','limitDay'),
            createColumn('状态', 'status', function (text, record, index) {
                return record.status === '0'? '启用':record.status === '1'?'删除':'禁用';
            }),
            createColumn('创建者', 'create_person'),
            createColumn('创建时间', 'create_time')
        ];
        var operationColumn = createColumn("操作", 'action', function (text, record, index) {
            return (
                <div>
                    <span className="linkStyle" onClick={() => actions.edit(record)}>编辑</span>
                </div>
            )
        });
        columns.push(operationColumn);
        return columns;
    }
    // 生成分页
    getPagination = (store, actions)=> {
        var queryCondition = store.queryCondition;
        var total = store.total;
        var {pageSize,page} = queryCondition;

        const pagination = {
            total: total,
            showSizeChanger: true,
            showTotal:function(total){
                return `Total ${total} items`
            },
            current:page,
            pageSize: pageSize,
            onShowSizeChange: (current, pageSize) => {
                actions.handleChangePackList(Object.assign(queryCondition,{
                    page: current,
                    pageSize: pageSize
                }),true);
            },
            onChange: (current) => {
                var queryCondition = store.queryCondition;
                var pageSize = queryCondition.pageSize;
                actions.handleChangePackList(Object.assign(queryCondition,{
                    page: current,
                    pageSize: pageSize
                }),true);
            }
        };
        return pagination;
    };

    render(){
        let {store,actions} = this.props;
        const { packList, queryCondition } = store;
        let columns = this.getColumns();
        let pagination = this.getPagination(store, actions);
        return (
            <div className="RedListView">
                <Button className="ant-btn ant-btn-primary rule" onClick={()=>{actions.addPackRule()}}>添加红包规则</Button>
                <Table dataSource={packList}
                       rowKey="id"
                       columns={columns}
                       pagination={pagination}
                />
                <RedListToast actions={actions} store={store} ></RedListToast>
            </div>
        );
    }
}
