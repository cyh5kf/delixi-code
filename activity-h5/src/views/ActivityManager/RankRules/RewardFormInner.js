import React from 'react';
import { Form, Row, Col, Input, message, Icon, Button, Select, TimePicker, InputNumber, Switch } from 'antd';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
import RewardRulesDialog from './RewardRulesDialog';
import RewardCustomForm from './RewardCustomForm';
import '../ActivityListView.less';

const format = 'HH:mm';
class DynamicFieldSet extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const { store, actions, outerIndex, rewardInnerArray, parentActions } = this.props;
        const { rankInfo, isOpenRewardDialog, rewardFormIndex, rewardOutArray } = store;

        const formItems = rewardInnerArray.map((k, index) => {

            const { id = "新建", No = outerIndex + 1, reward_type = "1", rule_id, rule_name, reward_money, reward_name, probability } = k;
            const innerUid = `${outerIndex}-${index}`;

            return (
                <div key={innerUid}>
                    {
                        index === 0? (
                            <FormItem
                            >
                                {getFieldDecorator(`No-${innerUid}`, {
                                    initialValue: No,
                                    validateTrigger: ['onChange', 'onBlur'],
                                    rules: [{ required: true, message: '请输入排名！!' }]
                                })(
                                    <InputNumber min={0} />
                                )}
                            </FormItem>
                        ): (
                            <FormItem
                            >
                                {getFieldDecorator(`No-${innerUid}`, {
                                    initialValue: getFieldValue(`No-${outerIndex}-0`),
                                    validateTrigger: ['onChange', 'onBlur'],
                                    rules: [{ required: true, message: '请输入排名！' }]
                                })(
                                    <InputNumber min={0} disabled={true} className="FormItemHidden" />
                                )}
                            </FormItem>
                        )
                    }
                    <FormItem
                    >
                        {getFieldDecorator(`rewardId-${innerUid}`, {
                            initialValue: id
                        })(
                            <Input style={{ width: 100 }} disabled={true} className={index > 0? 'marginLeftRank': ''} />
                        )}
                    </FormItem>
                    <FormItem
                    >
                        {getFieldDecorator(`rewardTypeCustom-${innerUid}`,{
                            initialValue: { rewardType: reward_type }})(
                            <RewardTypeForm outerIndex={outerIndex} innerIndex={index} actions={actions} store={store} />
                        )}
                    </FormItem>
                    <FormItem
                    >
                        {getFieldDecorator(`rewardRuleCustom-${innerUid}`,{
                            initialValue: {rewardRuleId: rule_id, rewardMoney: reward_money, rewardName: reward_name, rule_name: rule_name}
                        })(
                            <RewardCustomForm outerIndex={outerIndex} innerIndex={index} rewardType={k.reward_type} actions={actions} store={store}/>
                        )}
                    </FormItem>
                    <FormItem
                    >
                        {getFieldDecorator(`rewardProbabilityCustom-${innerUid}`, {
                            initialValue: { rewardProbability: probability }
                        })(
                            <ProbabilityForm outerIndex={outerIndex} innerIndex={index} actions={actions} store={store}/>
                            )}
                    </FormItem>
                    {rewardInnerArray.length > 1 ? (
                        <Icon
                            className="dynamic-delete-button"
                            type="minus-circle-o"
                            disabled={rewardInnerArray.length === 1}
                            onClick={() => parentActions.innerRemove(outerIndex, index)}
                        />
                    ) : null}
                    <div className="clear20"></div>
                </div>
            );
        });

        return (
            <Row>
                <Form layout="inline">
                    {formItems}
                </Form>
                { isOpenRewardDialog && <RewardRulesDialog parentActions={this} parent={this.state} actions={actions} store={store}/> }
                
            </Row>
        );
    }
}

const RewardFormInner = Form.create()(DynamicFieldSet);
export default RewardFormInner;




// 选择红包，加息券，任务。。。选项
class RewardTypeForm extends React.Component {
    constructor(props) {
        super(props);

        const value = this.props.value || {};
        this.state = {
            rewardType: value.rewardType
        };
    }

    componentWillReceiveProps(nextProps) {
        // Should be a controlled component.
        if ('value' in nextProps) {
            const value = nextProps.value;
            this.setState(value);
        }

    }

    handleSelectChange = (e, outerIndex, innerIndex) => {
        const { store, actions } = this.props;
        let { rewardOutArray } = store;
        const k = `${outerIndex}-${innerIndex}`;
        
        if(e === "99" || e === "5" || e === "6") {
            let obj = rewardOutArray[outerIndex].rewardList[innerIndex];
            // 如果选择积分，金币，谢谢惠顾，则清空后面的几项数据
            delete obj.probability;
            delete obj.reward_money;
            delete obj.reward_name;
            delete obj.rule_id;
            delete obj.rule_name;
            rewardOutArray[outerIndex].rewardList[innerIndex].reward_type = e;
            actions.handleChangeRewardOutArray(rewardOutArray);
        } else {
            actions.handleToggleRewardDialog(true, e, k);
        }
    }

    render() {
        const { outerIndex, innerIndex } = this.props;
        const { rewardType } = this.state;

        return (
            <span>
                <Select
                    style={{ width: 100 }}
                    showSearch={false}
                    placeholder="奖励类型"
                    onSelect={(e) => {this.handleSelectChange(e, outerIndex, innerIndex)}}
                    value={rewardType}
                >
                    <Option value="1">红包</Option>
                    <Option value="2">加息券</Option>
                    <Option value="3">任务</Option>
                    <Option value="5">金币</Option>
                    <Option value="6">积分</Option>
                    <Option value="99">谢谢惠顾</Option>
                </Select>
            </span>
        );
    }
}




// 概率input
class ProbabilityForm extends React.Component {
    constructor(props) {
        super(props);

        const value = this.props.value || {};
        this.state = {
            rewardProbability: value.rewardProbability
        };
    }

    componentWillReceiveProps(nextProps) {
        // Should be a controlled component.
        if ('value' in nextProps) {
            const value = nextProps.value;
            this.setState(value);
        }

    }

    // 修改概率值
    onChangeProbability = (value, outerIndex, innerIndex) => {
        const { store, actions } = this.props;
        let { rewardOutArray } = store;
        const rewardProbability = parseInt(value);
        rewardOutArray[outerIndex].rewardList[innerIndex].probability = value;
        actions.handleChangeRewardOutArray(rewardOutArray);
    }

    render() {
        const { outerIndex, innerIndex } = this.props;
        const { rewardProbability } = this.state;

        return (
            <span>
                <InputNumber style={{marginLeft: '15px'}} onChange={(e) => {this.onChangeProbability(e, outerIndex, innerIndex)}} value={rewardProbability} min={0} max={100} step={1} precision={0} />
            </span>
        );
    }
}