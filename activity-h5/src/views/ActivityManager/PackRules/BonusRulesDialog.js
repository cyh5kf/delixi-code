import React from 'react';
import moment from 'moment';
import _ from 'underscore';
import { Modal, Button, Form, message, Select, Spin } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;

import '../ActivityListView.less';

export default class BonusRulesDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    // 弹窗点击确定提交
    handleOk = () => {
        const { parentActions, actions } = this.props;
        this.setState({ loading: true });
        parentActions.handleChangeRules(() => {
            this.setState({ loading: false });
            actions.handleToggleBonusDialog(false);
        });
    };

    // 关闭弹窗
    handleCancel = () => {
        const { actions } = this.props;
        actions.handleToggleBonusDialog(false);
    };

    // 搜索
    fetchRules = (value) => {
        const { actions, parent } = this.props;
        const { RewardType } = parent;
        if(value) {
            actions.fetchBonusRules(value, RewardType);
        }
    }

    // 改变值
    handleChange = (value) => {
        const { actions } = this.props;
        actions.handleChangeBonusSelect(value);
    }


    render() {
        const { store, actions, parent } = this.props;
        const { bonusOptionsData, bonusSelectValue, fetching } = store;
        const { RewardType } = parent;
        let title = '';
        switch(RewardType) {
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
                        labelInValue
                        value={bonusSelectValue}
                        placeholder="选择奖励规则"
                        notFoundContent={fetching ? <Spin size="small" /> : null}
                        filterOption={false}
                        onSearch={this.fetchRules}
                        onChange={this.handleChange}
                        style={{ width: '100%' }}
                        >
                        {bonusOptionsData.map(d => <Option key={d.id}>{d.name}</Option>)}
                    </Select>
            </Modal>
        );
    }

}
