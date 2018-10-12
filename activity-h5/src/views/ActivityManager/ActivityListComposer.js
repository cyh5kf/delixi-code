import React from 'react';
import {message} from 'antd';
import moment from 'moment';
import ActivityListView from './ActivityListView';
import { getActivityListRequest, addActivityRequest, editActivityRequest, changeStatusRequest } from 'api/ActivityApi';

export default class ActivityListComposer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activityList: null, // 活动列表数据
            queryCondition: { // 查询活动列表传参
                page: 1,
                pageSize: 10,
                activityName: '',
                startTime: '',
                endTime: ''
            },
            total: 0, // 活动列表总数
            isOpenDialog: false, // 弹窗打开关闭状态
            dialogData: null,  // 编辑弹窗的初始数据
            searchLoading: false
        }
    }

    componentDidMount() {
        const queryCondition = this.state.queryCondition;
        this.hangleSearchActivityList(queryCondition);
    }

    // 查询活动列表数据
    hangleSearchActivityList = async(queryCondition) => {
        this.setState({searchLoading: true});
        let response = await getActivityListRequest(queryCondition);
        this.setState({searchLoading: false});
        let data = response.data;
        if(response.status === 200 && response.data.error_code === 0) {
            const queryCondition = this.state.queryCondition;
            this.setState({
                activityList: data.data,
                queryCondition: Object.assign(queryCondition, {
                    page: parseInt(data.pageInfo.page),
                    pageSize: parseInt(data.pageInfo.size)
                }),
                total: data.pageInfo.total
            });
        }
    }

    // 打开关闭弹窗
    handleToggleDialog = async(isOpen)=> {
        this.setState({isOpenDialog: isOpen});
    };

    // 添加或编辑活动
    handleActivityDialog = async(values, dialogData, finished)=> {
        if (dialogData) {
            //修改
            let response = await editActivityRequest(values);
            let data = response.data;
            if(response.status === 200 && response.data.error_code === 0) {
                message.success('编辑活动成功！');
                finished();
                const queryCondition = this.state.queryCondition;
                this.hangleSearchActivityList(queryCondition);
            } else {
                message.error("编辑活动失败！");
                finished();
            }

        } else {
            //新建
            let response = await addActivityRequest(values);
            let data = response.data;
            if(response.status === 200 && response.data.error_code === 0) {
                message.success('添加活动成功！');
                finished();
                const queryCondition = this.state.queryCondition;
                this.hangleSearchActivityList(queryCondition);
            } else {
                message.error("添加活动失败！");
                finished();
            }
        }
        finished();
    };

    // 修改活动名称状态
    onChangeActivityName = (e) => {
        const queryCondition = this.state.queryCondition;
        this.setState({queryCondition: Object.assign(queryCondition, 
            {activityName: e.target.value}
        )});
    }

    // 修改开始时间结束时间状态
    onChangeSelectTime=(value, dateString)=> {
        const queryCondition = this.state.queryCondition;
        this.setState({queryCondition: Object.assign(queryCondition, 
            {
                startTime: dateString[0],
                endTime: dateString[1]
            }
        )});
    }

    // 点击添加弹窗
    handleAddModule = (record) => {
        this.setState({
            dialogData: null
        })
        this.handleToggleDialog(true);
    }

    // 点击编辑弹窗
    handleEditModule = (record) => {
        this.setState({
            dialogData: {
                id: record.id,
                name: record.name,
                keywords: record.keywords,
                desc: record.desc,
                startTime: moment(record.start_time, 'YYYY-MM-DD HH:mm:ss'),
                endTime: moment(record.end_time, 'YYYY-MM-DD HH:mm:ss'),
                status: record.status,
                at_status: record.at_status
            }
        })
        this.handleToggleDialog(true);
    }

    // 点击配置模块
    handleConfigModule = (record) => {
        this.props.history.push(`/home/moduleConfig/${record.id}`);
    }

    // 点击禁用
    handleChangeActivityStatus = async(record) => {
        const { id, status } = record;
        const requestData = {
            id: id,
            status: status === "2"? 1: 2 
        }
        
        let response = await changeStatusRequest(requestData);
        let data = response.data;
        if(response.status === 200 && response.data.error_code === 0) {
            message.success(`${ status === "2"? "激活成功！": "禁用成功"}`);
            const queryCondition = this.state.queryCondition;
            this.hangleSearchActivityList(queryCondition);
        } else {
            message.error(`${ status === "2"? "激活失败！": "禁用失败"}`);
        }
    }

    render() {
        return (
            <ActivityListView actions={this} store={this.state}/>
        );
    }
}
