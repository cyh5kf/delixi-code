import React from 'react';
import { Form, Input, Select, Button, InputNumber } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

export default class RewardCustomForm extends React.Component {
    constructor(props) {
        super(props);

        const value = this.props.value || {};
        this.state = {
            rewardRuleId: value.rewardRuleId,
            rule_name: value.rule_name,
            rewardName: value.rewardName,
            rewardMoney: value.rewardMoney

        };
    }

    componentWillReceiveProps(nextProps) {
        // Should be a controlled component.
        if ('value' in nextProps) {
            const value = nextProps.value;
            this.setState(value);
        }

    }

    handleMoneyChange = (e, outerIndex, innerIndex) => {
        const { store, actions } = this.props;
        let { rewardOutArray } = store;
        const rewardMoney = e;
        rewardOutArray[outerIndex].rewardList[innerIndex].reward_money = rewardMoney;
        actions.handleChangeRewardOutArray(rewardOutArray);
    }

    handleNameChange = (e, outerIndex, innerIndex) => {
        const { store, actions } = this.props;
        let { rewardOutArray } = store;
        const rewardName = e.target.value;
        rewardOutArray[outerIndex].rewardList[innerIndex].reward_name = rewardName;
        actions.handleChangeRewardOutArray(rewardOutArray);
    }

    render() {
        const { rewardType, outerIndex, innerIndex } = this.props;
        let { rewardRuleId, rewardMoney, rewardName, rule_name } = this.state;

        return (
            <span>
                <Select
                    disabled
                    style={{ width: 250 }}
                    showSearch={false}
                    placeholder="选择奖励规则"
                    value={rewardRuleId}
                >   
                    {rewardRuleId && rule_name? (
                        <Option key={rewardRuleId}>{rule_name}</Option>
                    ): null}
                    
                </Select>
                <InputNumber style={{marginLeft: '15px'}} onChange={(e) => {this.handleMoneyChange(e, outerIndex, innerIndex)}} value={rewardMoney} step={0.01} precision={2} min={0} disabled={rewardType === '3' || rewardType === '99'} />
                <Input style={{marginLeft: '8px'}} onChange={(e) => {this.handleNameChange(e, outerIndex, innerIndex)}} value={rewardName} placeholder="奖励名称" style={{ width: 100 }} disabled={rewardType === '3' || rewardType === '5' || rewardType === '6' || rewardType === '99'} />
            </span>
        );
    }
}