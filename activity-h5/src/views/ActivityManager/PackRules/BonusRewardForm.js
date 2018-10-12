import React from 'react';
import { Form, Row, Col, Input, message, Icon, Button, Select, TimePicker, InputNumber, Switch } from 'antd';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
import BonusRulesDialog from './BonusRulesDialog';
import '../ActivityListView.less';

let uuid = 1;
const format = 'HH:mm';
class DynamicFieldSet extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            RewardType: null,
            formIndex: null,
            optionsArray: [],
            bonusRewardArray: [] // 额外奖励数据
        }
    }

    componentDidMount() {
        const { packInfo } = this.props.store;
        let { bonusRewardArray } = this.state;
        let bonusRewardList = packInfo ? packInfo.rules.bonusReward : [];
        if (packInfo && bonusRewardList.length !== 0) { //如果列表存在数据
            uuid = 0;
            for (let item of bonusRewardList) {
                uuid++;
                item.keys = uuid;
            }
            this.setState({ bonusRewardArray: bonusRewardList });
        } else {
            bonusRewardArray = bonusRewardArray.concat({keys: uuid});
            this.setState({ bonusRewardArray });
        }
    }

    remove = (k) => {
        let { bonusRewardArray } = this.state;
        if (bonusRewardArray.length === 1) {
            return;
        }
        bonusRewardArray = bonusRewardArray.filter(key => key.keys !== k)
        this.setState({ bonusRewardArray });
    }

    add = () => {
        uuid++;
        let { bonusRewardArray } = this.state;
        bonusRewardArray = bonusRewardArray.concat({keys: uuid});
        this.setState({ bonusRewardArray });
    }

    // 改变选中规则选项
    handleSelectChange = (e, k) => {
        const { actions } = this.props;
        const { getFieldValue, setFieldsValue } = this.props.form;
        let { optionsArray } = this.state;
        if(e === "99") {
            return;
        }
        actions.handleToggleBonusDialog(true);
        const bonusRewardRuleId = `bonusRewardRuleId-${k}`;
        const rule_id_value = getFieldValue(`bonusRewardRuleId-${k}`);
        if(rule_id_value) {
            let fieldObj = {}
            fieldObj[bonusRewardRuleId] = '';
            setFieldsValue(fieldObj);
        }
        optionsArray.forEach((value, index) => {
            if(value.id === k) {
                optionsArray.splice(index, 1);
            }
        })
        this.setState({
            RewardType: e,
            formIndex: k,
            optionsArray
        })
    }

    // 改变选择奖励规则option选项
    handleChangeRules = (finished) => {
        const { store } = this.props;
        const { bonusSelectValue } = store;
        let { optionsArray, formIndex } = this.state;
        const optionObj = {
            id: formIndex,
            options: bonusSelectValue
        }
        if(optionsArray.length !== 0) {
            for(let i of optionsArray) {
                if(i.id === optionObj.id) {
                    i = Object.assign(i, optionObj);
                } else {
                    optionsArray.push(optionObj);
                }
            }
        } else {
            optionsArray.push(optionObj);
        }
        this.setState({optionsArray: optionsArray});
        const bonusRewardRuleId = `bonusRewardRuleId-${formIndex}`;
        let fieldObj = {}
        fieldObj[bonusRewardRuleId] = optionObj.options.key;
        this.props.form.setFieldsValue(fieldObj);
        finished();
    }

    getOptions = (k, rule_id, rule_name) => {
        const { optionsArray } = this.state;
        if(optionsArray.length === 0 && rule_id && rule_name) {
            return <Option key={rule_id}>{rule_name}</Option>;
        }
        let result = null;
        for(let item of optionsArray) {
            if(item.id === k) {
                const options = item.options;
                result = <Option key={options.key}>{options.label}</Option>;
            }   
        }
        return result;
    }

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const { store, actions } = this.props;
        const { packInfo, isOpenBonusDialog } = store;
        const { bonusRewardArray } = this.state;

        const formItems = bonusRewardArray.map((k, index) => {

            const { id = "新建", triggerType = "used", triggerValue = 0, reward_type = "1", rule_id, rule_name, reward_money, reward_name } = k;
            return (
                <div key={k.keys}>
                    <FormItem
                    >
                        {getFieldDecorator(`bonusRewardId-${k.keys}`, {
                            initialValue: id
                        })(
                            <Input style={{ width: 100 }} disabled={true} />
                        )}
                    </FormItem>
                    <FormItem
                        hasFeedback
                    >
                        {getFieldDecorator(`bonusType-${k.keys}`,
                            { initialValue: triggerType, validateTrigger: ['onChange'], })(
                            <Select
                                style={{ width: 150 }}
                                showSearch={false}
                                placeholder="额外奖励名称"
                            >
                                <Option value="used">红包使用个数</Option>
                                <Option value="num">累计打开次数</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                    >
                        {getFieldDecorator(`bonusTypeValue-${k.keys}`, {
                            initialValue: triggerValue,
                            validateTrigger: ['onChange', 'onBlur'],
                            rules: [{ required: true, message: '请输入额外奖励值!' }]
                        })(
                            <InputNumber min={0} />
                        )}
                    </FormItem>
                    <FormItem
                    >
                        {getFieldDecorator(`bonusRewardType-${k.keys}`,
                         { initialValue: reward_type, validateTrigger: ['onChange'], })(
                            <Select
                                style={{ width: 100 }}
                                showSearch={false}
                                placeholder="奖励类型"
                                onSelect={(e) => {this.handleSelectChange(e, k.keys)}}
                            >
                                <Option value="1">红包</Option>
                                <Option value="2">加息券</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                    >
                        {getFieldDecorator(`bonusRewardRuleId-${k.keys}`,{
                            initialValue: rule_id,
                            validateTrigger: ['onChange'],
                            rules: [{ required: true, message: '请选择奖励规则!' }]
                        })(
                            <Select
                                disabled
                                style={{ width: 250 }}
                                showSearch={false}
                                placeholder="选择奖励规则"
                            >
                            {this.getOptions(k.keys, rule_id, rule_name)}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                    >
                        {getFieldDecorator(`bonusRewardMoney-${k.keys}`, {
                            initialValue: reward_money,
                            validateTrigger: ['onChange', 'onBlur'],
                            rules: [{ required: true, message: '请输入奖励数值!' }]
                        })(
                            <InputNumber min={0} />
                            )}
                    </FormItem>
                    <FormItem
                        key={k.keys}
                    >
                        {getFieldDecorator(`bonusRewardName-${k.keys}`, {
                            initialValue: reward_name,
                            rules: [{ required: true, message: '请输入奖励名称!' }]
                        })(
                            <Input placeholder="奖励名称" style={{ width: 100 }} />
                            )}
                    </FormItem>
                    {bonusRewardArray.length > 1 ? (
                        <Icon
                            className="dynamic-delete-button"
                            type="minus-circle-o"
                            disabled={bonusRewardArray.length === 1}
                            onClick={() => this.remove(k.keys)}
                        />
                    ) : null}
                    <div className="clear20"></div>
                </div>
            );
        });

        return (
            <div>
                <Form layout="inline">
                    <div>
                        <span style={{display: 'inline-block', width: '100px', textAlign: 'center'}}>奖励编号</span>
                        <span style={{display: 'inline-block', width: '100px', marginLeft: '170px', textAlign: 'center'}}>额外触发值</span>
                        <span style={{display: 'inline-block', width: '100px', textAlign: 'center'}}>奖励类型</span>
                        <span style={{display: 'inline-block', width: '280px', textAlign: 'center'}}>选择奖励规则</span>
                        <span style={{display: 'inline-block', width: '100px', textAlign: 'center'}}>奖励数值</span>
                        <span style={{display: 'inline-block', width: '100px', textAlign: 'center'}}>奖励名称</span>
                    </div>
                    <div className="clear20"></div>
                    {formItems}
                    <FormItem>
                        <Button type="dashed" onClick={this.add} style={{ width: '140px' }}>
                            <Icon type="plus" /> 添加表单
                        </Button>
                    </FormItem>
                </Form>
                { isOpenBonusDialog && <BonusRulesDialog parentActions={this} parent={this.state} actions={actions} store={store}/> }
            </div>  
        );
    }
}

const BonusRewardForm = Form.create()(DynamicFieldSet);
export default BonusRewardForm;