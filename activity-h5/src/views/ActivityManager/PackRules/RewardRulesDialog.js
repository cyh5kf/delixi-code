import React from 'react';
import moment from 'moment';
import _ from 'underscore';
import { Modal, Button, Form, message, Select, Spin } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;

import '../ActivityListView.less';

export default class RewardRulesDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            selectValue: null
        }
    }

    // 弹窗点击确定提交
    handleOk = () => {

        const { store, actions, rewardTypeModule } = this.props;
        let { rewardFormIndex, rewardOptionsData, rewardRuleType, reward_times, reward_package } = store;
        let rewardOutArray = rewardTypeModule === 'times'? reward_times: reward_package;
        const { selectValue } = this.state;
        let indexArray = rewardFormIndex.split("-");
        let outerIndex = indexArray[0];
        let innerIndex = indexArray[1];
        let reward_money_data = '';
        let reward_name_data = '';
        let reward_rule_name = '';
        let fieldObj = {}
        for(let i of rewardOptionsData) {
            if(i.id === selectValue) {
                reward_money_data = i.reward_value;
                reward_name_data = i.reward_name;
                reward_rule_name = i.name;
                break;
            }
        }
        fieldObj.rule_id = selectValue;
        fieldObj.rule_name = reward_rule_name;
        fieldObj.reward_money = reward_money_data;
        fieldObj.reward_name = reward_name_data;
        fieldObj.reward_type = rewardRuleType;
        let listObj = rewardOutArray[outerIndex].rewardList[innerIndex];
        rewardOutArray[outerIndex].rewardList[innerIndex] = Object.assign(listObj, fieldObj);
        actions.handleChangeRewardArray(rewardOutArray, rewardTypeModule);
        actions.handleToggleRewardDialog(false);
    };

    // 关闭弹窗
    handleCancel = () => {
        const { actions } = this.props;
        actions.handleToggleRewardDialog(false);
    };

    // 搜索
    fetchRules = (value) => {
        const { actions, store } = this.props;
        const { rewardRuleType } = store;
        if(value) {
            actions.fetchRewardRules(value, rewardRuleType);
        }
    }

    // 改变值
    handleChange = (value) => {
        this.setState({selectValue: value});
    }


    render() {
        const { store, actions } = this.props;
        const { rewardOptionsData, fetching, rewardRuleType, rewardFormIndex } = store;
        const { selectValue } = this.state;
        let title = '';
        switch(rewardRuleType) {
            case "1":
                title = "红包";
                break;
            case "2":
                title = "加息券";
                break;
            case "3":
                title = "任务";
                break;
        }

        let indexArray = rewardFormIndex.split("-");
        let outerIndex = indexArray[0];
        let innerIndex = indexArray[1];
        
        return (
            <Modal
                className="rulesDialog"
                visible={true}
                title={title}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                    <Button key="back" type="ghost" size="large" onClick={this.handleCancel}>取消</Button>,
                    <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk}>确定</Button>
                ]}>
                    <Select
                        showSearch={true}
                        value={selectValue}
                        placeholder="选择奖励规则"
                        notFoundContent={fetching ? <Spin size="small" /> : null}
                        filterOption={false}
                        onSearch={this.fetchRules}
                        onChange={this.handleChange}
                        style={{ width: '100%' }}
                        >
                        {rewardOptionsData.map(d => <Option key={d.id}>{d.name}</Option>)}
                    </Select>
            </Modal>
        );
    }

}
