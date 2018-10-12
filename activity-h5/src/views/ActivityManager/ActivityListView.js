import React from 'react';
import _ from 'underscore';
import moment from 'moment';
import {Input,Table,message,Icon,Button,Popconfirm,DatePicker,Spin,Tooltip} from 'antd';
const RangePicker = DatePicker.RangePicker;

import ActivityDialog from './ActivityDialog';
import { createColumn } from 'utils/utils';
import './ActivityListView.less';

function disabledDate(current) {
    // Can not select days before today
    return current && moment(current.valueOf()).isBefore(Date.now(), 'day');
}

export default class ActivityListView extends React.Component {


    constructor(props) {
        super(props);
        this.state={

        }
    }

    // 生成表格
    getColumns = ()=> {
        const {store, actions} = this.props;
        const columns = [
            createColumn('活动ID','id'),
            createColumn('活动名称','name'),
            createColumn('状态','status', function(text, record, index) {
                if(record.status === '0') {
                    return '启用';
                } else if(record.status === '2') {
                    return '禁用';
                }
            }),
            createColumn('活动状态','at_status', function(text, record, index) {
                if(record.status === '2') {
                    return '已禁用';
                } else {
                    if(record.at_status === 1) {
                        return '未开始';
                    } else if(record.at_status === 2) {
                        return '进行中';
                    } else if(record.at_status === 3) {
                        return '已结束';
                    }
                }
            }),
            createColumn('活动开始时间','start_time'),
            createColumn('活动结束时间','end_time'),
            createColumn('创建者','create_person'),
            createColumn('创建时间','create_time')
        ];

        var operationColumn = createColumn("操作",'action',function(text, record, index){
            return (
                <div>
                    <span className="linkStyle" onClick={()=> actions.handleEditModule(record)}>编辑</span>
                    <span className="ant-divider" />
                    <span className="linkStyle" onClick={()=> actions.handleConfigModule(record)}>配置模块</span>
                    <span className="ant-divider" />
                    {
                        record.at_status === 1?
                        (
                            <Popconfirm  placement="left" title={record.status === "0"? "你确定要禁用该模块 ?": "你确定要激活该模块 ?"} onConfirm={()=> actions.handleChangeActivityStatus(record)} okText="是" cancelText="否">
                                <span className="linkStyle">{record.status === "0"? "禁用": "激活"}</span>
                            </Popconfirm>
                        ): 
                        (   
                            <Tooltip placement="topLeft" title={<span>进行中或已结束的活动不允许禁用！</span>}>
                                <span className="linkStyle noAllowed" >禁用</span>
                            </Tooltip>
                        )
                    }
                    
                </div>
                )
        });

        columns.push(operationColumn);

        return columns;
    };

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
                actions.hangleSearchActivityList(Object.assign(queryCondition,{
                    page: current,
                    pageSize: pageSize
                }),true);
            },
            onChange: (current) => {
                var queryCondition = store.queryCondition;
                var pageSize = queryCondition.pageSize;
                actions.hangleSearchActivityList(Object.assign(queryCondition,{
                    page: current,
                    pageSize: pageSize
                }),true);
            }
        };
        return pagination;
    };

    render() {
        const columns = this.getColumns();
        const {store, actions} = this.props;
        const { activityList, queryCondition, searchLoading } = store;
        var pagination = this.getPagination(store, actions);

        return (
            <div className="activityListView">
                活动名称 : &nbsp;
                <Input placeholder="请输入活动名称" value={queryCondition.activityName} onChange={actions.onChangeActivityName} style={{ width: 200 }} />
        
                <span className="width20"></span>

                时间搜索 : &nbsp;

                <RangePicker
                    disabledDate={disabledDate}
                    showTime={{ format: 'HH:mm:ss' }}
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder={['Start Time', 'End Time']}
                    onChange={actions.onChangeSelectTime}
                />

                <span className="width20"></span>

                <Button type="primary" loading={searchLoading} onClick={()=>{actions.hangleSearchActivityList(queryCondition)}}>搜索</Button>

                <Button type="primary" className="addBtn" onClick={()=>{actions.handleAddModule()}}>添加活动</Button>

                <div className="clear20"></div>

                {
                    activityList? (
                        <Spin tip="Loading..." spinning={searchLoading}>
                            <Table dataSource={activityList}
                                rowKey="id"
                                columns={columns}
                                pagination={pagination}
                                />
                        </Spin>
                    ): null
                }
                
                <ActivityDialog actions={actions} store={store}/>
            </div>
        );
    }
}
