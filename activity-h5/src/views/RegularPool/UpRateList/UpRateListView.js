import React from 'react';
import './UpRateListView.less';
import {Table,Button,Modal} from 'antd';
import { createColumn } from 'utils/utils';
import TaskToast from './TaskToast'
export default class UpRateListView extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            loading:false
        }
    }
    getColumn = () =>{
        const {store,actions} = this.props;

        let columns = [
            createColumn('序号','rowNumber',function(text, record,index){
                return index +1;
            }),
            createColumn('任务名称','name'),
            createColumn('任务ID','id'),
            createColumn('类型','type',(text,record,index) => {
                return record.type === "1" ?'单次投资':'';
            }),
            createColumn('条件','limitExplain'),
            createColumn('奖励','rewardType',(text,record,index) =>{
                return record.rewardType === "1" ?'红包':'加息券';
            }),
            createColumn('状态','status',function(text,record,index){
                return record.status === '0'?'启用':record.status === '1'?'删除':'禁用';
            }),
            createColumn('创建者','create_person'),
            createColumn('创建时间','create_time')
        ]
        let operationColumn = createColumn('操作','action',function(text,record,index){
            return (
                <div>
                    <span className="linkStyle" onClick={() => {actions.editTaskList(record)}}>编辑</span>
                </div>
            )
        })
        columns.push(operationColumn);
        return columns;
    }
    pagination = (store,actions) =>{
        var queryPage = store.queryPage;
        var {page,pageSize,total} = queryPage;
        const pagination = {
            showSizeChanger:true,
            current:Number(page),
            pageSize:Number(pageSize),
            total:total,
            showTotal:function(total){
                return `total ${total} items`
            },
            onShowSizeChange:(current, size) => {
                actions.handleChangePageSize(Object.assign(queryPage,{
                    page:current,
                    pageSize:size
                }))
            },
            onChange:(page) => {
                var pageSize = queryPage.pageSize
                actions.handleChangePageSize(Object.assign(queryPage,{
                    page:page,
                    pageSize:pageSize
                }))
            }
        }
        return pagination
    }
    handleCancel =()=>{
        var { actions } = this.props;
        actions.handleToastShow(false)
    }
    handleOk = () =>{
        const {actions,store} = this.props;
        actions.addList(actions.state.queryData);
    }
    render() {
        let {store,actions} = this.props;
        let columns = this.getColumn();
        let pagination = this.pagination(store,actions);
        let visible = store.isOpen;
        let title = store.queryData.id ? '编辑任务':'添加任务';
        let submitBtnText = store.queryData.id ? '更新':'添加';
        return (
            <div className="UpRateListView">
                <Button className="ant-btn ant-btn-primary rule" onClick={()=>{actions.addTask()}}>添加任务</Button>
                <Table
                    columns={columns}
                    dataSource={store.taskList}
                    rowKey="id"
                    pagination={pagination}
                />
                <Modal
                    className="ModifyOrAddI18nItemDialog"
                    visible={visible}
                    title={title}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" type="ghost" size="large" onClick={this.handleCancel}>Cancel</Button>,
                        <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk}>{submitBtnText}</Button>
                    ]}
                >
                    <TaskToast store={store} actions={actions}></TaskToast>
                </Modal>

            </div>
        );
    }
}
