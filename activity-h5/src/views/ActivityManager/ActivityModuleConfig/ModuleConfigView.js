import React from 'react';
import _ from 'underscore';
import moment from 'moment';
import {Input,Table,message,Icon,Button,Popconfirm,Select,Spin,Tooltip} from 'antd';

import { createColumn } from 'utils/utils';
import './ModuleConfigView.less';

export default class ModuleConfigView extends React.Component {

    constructor(props) {
        super(props);
        this.state={

        }
    }

    // 生成表格
    getColumns = ()=> {
        const {store, actions} = this.props;
        const columns = [
            createColumn('序号','row_number', function(text, record, index) {
                return index + 1;
            }),
            createColumn('活动名称','activityName'),
            createColumn('模块名称','name'),
            createColumn('状态','status', function(text, record, index) {
                if(record.status === '0') {
                    return '启用';
                } else if(record.status === '2') {
                    return '禁用';
                }
            }),
            createColumn('创建者','create_person'),
            createColumn('创建时间','create_time')
        ];

        var operationColumn = createColumn("操作",'action',function(text, record, index){
            return (
                <div>
                    
                    {
                        record.at_status === 1?
                        (
                            <div>
                                <span className="linkStyle" onClick={()=> actions.handleConfigRules(record)}>配置规则</span>
                                <span className="ant-divider" />
                                <Popconfirm  placement="left" title={record.status === "0"? "你确定要禁用该模块 ?": "你确定要激活该模块 ?"} onConfirm={()=> actions.handleChangeModuleStatus(record)} okText="是" cancelText="否">
                                    <span className="linkStyle">{record.status === "0"? "禁用": "激活"}</span>
                                </Popconfirm>
                            </div>
                        ): 
                        (   
                            <div>
                                <Tooltip placement="topLeft" title={<span>进行中或已结束的活动暂不允许修改配置规则！</span>}>
                                    <span className="linkStyle noAllowed">配置规则</span>
                                </Tooltip>
                                    <span className="ant-divider" />
                                <Tooltip placement="topLeft" title={<span>进行中或已结束的活动不允许禁用！</span>}>
                                    <span className="linkStyle noAllowed" >禁用</span>
                                </Tooltip>
                            </div>
                            
                        )
                    }
                </div>
                )
        });

        columns.push(operationColumn);

        return columns;
    };

    getSelectOption = (activityRelationList, activityComponentList) => {
        const { actions } = this.props;
        const activityList = _.clone(activityRelationList);
        const activityModuleList = _.clone(activityComponentList);
        if(activityList) {
            activityList.forEach(( item, i ) => {
                const widget_id = item.widget_id;
                activityModuleList.forEach(( val, j ) => {
                    const id = val.id;
                    if(id === widget_id) {
                        activityModuleList.splice(j, 1);
                    }
                });
            });
        }
        
        return _.map(activityModuleList, function (d) {
            return <Select.Option key={d.id} value={d.id}>{d.name}</Select.Option>;
        })
    }

    onChangeSelectModule = (e) => {
        const { actions } = this.props;
        actions.handleChangeSelectModule(e);
    }

    render() {
        const columns = this.getColumns();
        const {store, actions} = this.props;
        const { activityRelationList, activityInfo, activityComponentList, tableLoading, addLoading, widgetId } = store;
        const getSelectOption = this.getSelectOption(activityRelationList, activityComponentList);

        return (
            <div className="moduleConfigView">
                添加活动模块 : &nbsp;
                <Select
                    value={widgetId}
                    style={{ width: 150 }}
                    showSearch={false}
                    onChange={this.onChangeSelectModule}
                >
                    {getSelectOption}
                </Select>
                <span className="width10"></span>

                <Button type="primary" loading={addLoading} disabled={widgetId? false: true} onClick={()=>{actions.handleAddModule()}}>添加模块</Button>

                <div className="clear20"></div>

                {
                    activityRelationList? (
                        <Spin tip="Loading..." spinning={tableLoading}>
                            <Table dataSource={activityRelationList}
                                rowKey="id"
                                columns={columns}
                                />
                        </Spin>
                    ): null
                }
            </div>
        );
    }
}
