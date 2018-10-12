import React from 'react';
import { message } from 'antd';
import ModuleConfigView from './ModuleConfigView';
import { getActivityRelationRequest, getActivityInfoRequest, getActivityComponentRequest, addActivityModuleRequest, changeModuleStatusRequest } from 'api/ActivityApi';

export default class ModuleConfigComposer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activityRelationList: null, // 活动关联组件列表数据
            activityInfo: null, // 活动基本信息
            activityComponentList: null, // 活动组件列表
            tableLoading: false, // 表格加载状态
            addLoading: false,  // 添加模块加载状态
            widgetId: null,  // 选择模块组件id,默认为礼包组件
            activityId: null  // 活动id
        }
    }

    componentDidMount= () => {
        this.handleQueryActivityRelation();
    }

    handleQueryActivityRelation = async() => {
        const activityId = this.props.match.params.id;
        this.setState({tableLoading: true});
        const response = await Promise.all([getActivityRelationRequest(activityId), getActivityInfoRequest(activityId), getActivityComponentRequest()]);
        this.setState({tableLoading: false});
        const activityRelationList = response[0].data.data;
        const activityInfo = response[1].data.data;
        const activityComponentList = response[2].data.data;
        const { name, at_status } = activityInfo;
        if(activityRelationList !== 0) {
            for(let item of activityRelationList) {
                item.activityName = name;
                item.at_status = at_status;
            }
        }
        if(response[0].data.error_code === 0 && response[1].data.error_code === 0 && response[2].data.error_code === 0) {
            this.setState({
                activityRelationList: activityRelationList,
                activityInfo: activityInfo,
                activityComponentList: activityComponentList,
                activityId: activityId
            });
        }
    }

    // 点击配置规则
    handleConfigRules = (record) => {
        const { id, widget_id } = record;
        if(widget_id === "1") {
            this.props.history.push(`/home/packRules/${record.id}`);   // 跳转到拆礼包页面
        } else if(widget_id === "2") {
            this.props.history.push(`/home/rankRules/${record.id}`);   // 跳转到排行榜页面
        }
        
    }

    // 禁用/激活
    handleChangeModuleStatus = async(record) => {
        const { id, status } = record;
        const requestData = {
            id: id,
            status: status === "2"? 1: 2 
        }
        
        let response = await changeModuleStatusRequest(requestData);
        let data = response.data;
        if(response.status === 200 && response.data.error_code === 0) {
            message.success(`${ status === "2"? "激活成功！": "禁用成功"}`);
            this.handleQueryActivityRelation();
        } else {
            message.error(`${ status === "2"? "激活失败！": "禁用失败"}`);
        }
    }

    // 选择模块
    handleChangeSelectModule = (e) => {
        this.setState({
            widgetId: e
        })
    }

    // 添加活动模块
    handleAddModule = async() => {
        const { activityId, widgetId } = this.state;
        const addModuleData = {
            activityId: activityId,
            widgetId: widgetId
        }
        this.setState({addLoading: true});
        const response = await addActivityModuleRequest(addModuleData);
        this.setState({addLoading: false});
        let data = response.data;
        if(response.status === 200 && response.data.error_code === 0) {
            message.success('添加活动模块成功！');
            this.handleQueryActivityRelation();
        } else {
            message.error("添加活动模块失败！");
        }
    }

    render() {
        return (
            <ModuleConfigView actions={this} store={this.state} />
        );
    }
}
