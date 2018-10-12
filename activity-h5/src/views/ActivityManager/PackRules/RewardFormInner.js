import React from 'react';
import { Form, Row, Col, Input, message, Icon, Button, Select, TimePicker, InputNumber, Switch } from 'antd';
import moment from 'moment';
import classNames from 'classnames';
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
        const { store, actions, outerIndex, rewardInnerArray, parentActions, rewardTypeModule } = this.props;
        const { packInfo, isOpenRewardDialog, rewardFormIndex, currentDialogType } = store;

        const formItems = rewardInnerArray.map((k, index) => {

            const { id = "新建", start_num, end_num, reward_type = "1", rule_id, rule_name, reward_money, reward_name, probability, source_id } = k;
            const innerUid = `${outerIndex}-${index}`;

            const marginLeftStyle = classNames({
                'marginLeft': index > 0 && rewardTypeModule === 'times',
                'marginLeftPackage': index > 0 && rewardTypeModule === 'package',
            })

            return (
                <div key={innerUid}>
                    {   
                        rewardTypeModule === 'times'? ( // 数据为按次数数据
                            index === 0? ( // 第一行显示
                                <FormItem
                                >
                                    {getFieldDecorator(`rewardStartNum-${innerUid}`, {
                                        initialValue: start_num,
                                        validateTrigger: ['onChange', 'onBlur'],
                                        rules: [{ required: true, message: '请输入开始次数!' }]
                                    })(
                                        <InputNumber min={0} />
                                    )}
                                    <span className="ant-form-text">至</span>
                                </FormItem>
                            ): ( // 从第二行开始隐藏，并显示数据与第一行相同
                                <FormItem
                                >
                                    {getFieldDecorator(`rewardStartNum-${innerUid}`, {
                                        initialValue: getFieldValue(`rewardStartNum-${outerIndex}-0`),
                                        validateTrigger: ['onChange', 'onBlur'],
                                        rules: [{ required: true, message: '请输入开始次数!' }]
                                    })(
                                        <InputNumber min={0} disabled={true} className="FormItemHidden" />
                                    )}
                                    <span className="ant-form-text"  className="FormItemHidden">至</span>
                                </FormItem>
                            )
                        ): ( // 数据为按礼包数据
                            index === 0? (
                            <FormItem
                                >
                                {getFieldDecorator(`source_id-${innerUid}`, {
                                    initialValue: source_id? source_id: `新建-${outerIndex}`,
                                    validateTrigger: ['onChange', 'onBlur'],
                                    rules: [{ required: true, message: '请输入礼包编号!' }]
                                })(
                                    <Input min={0} disabled={true} style={{'width': '88px'}} />
                                )}
                            </FormItem>
                            ): (
                                <FormItem
                                >
                                    {getFieldDecorator(`source_id-${innerUid}`, {
                                        initialValue: getFieldValue(`source_id-${outerIndex}-0`),
                                        validateTrigger: ['onChange', 'onBlur'],
                                        rules: [{ required: true, message: '请输入礼包编号!' }]
                                    })(
                                        <Input min={0} disabled={true} className="FormItemHidden" style={{'width': '88px'}} />
                                    )}
                                </FormItem>
                            )
                        )
                    }
                    {
                        rewardTypeModule === 'times' && ( // 数据为按次数
                            index === 0? (
                                <FormItem
                                >
                                    {getFieldDecorator(`rewardEndNum-${innerUid}`, {
                                        initialValue: end_num,
                                        validateTrigger: ['onChange', 'onBlur'],
                                        rules: [{ required: true, message: '请输入结束次数!' }]
                                    })(
                                        <InputNumber min={0} />
                                        )}
                                </FormItem>
                            ): (
                                <FormItem
                                >
                                    {getFieldDecorator(`rewardEndNum-${innerUid}`, {
                                        initialValue: getFieldValue(`rewardEndNum-${outerIndex}-0`),
                                        validateTrigger: ['onChange', 'onBlur'],
                                        rules: [{ required: true, message: '请输入结束次数!' }]
                                    })(
                                        <InputNumber min={0} disabled={true} className="FormItemHidden" />
                                        )}
                                </FormItem>
                            )
                        )
                    }
                    <FormItem
                    >
                        {getFieldDecorator(`rewardId-${innerUid}`, {
                            initialValue: id
                        })(
                            <Input style={{ width: 100 }} disabled={true} className={marginLeftStyle} />
                        )}
                    </FormItem>
                    <FormItem
                    >
                        {getFieldDecorator(`rewardTypeCustom-${innerUid}`,{
                            initialValue: { rewardType: reward_type }})(
                            <RewardTypeForm  rewardTypeModule={rewardTypeModule} outerIndex={outerIndex} innerIndex={index} actions={actions} store={store} />
                        )}
                    </FormItem>
                    <FormItem
                    >
                        {getFieldDecorator(`rewardRuleCustom-${innerUid}`,{
                            initialValue: {rewardRuleId: rule_id, rewardMoney: reward_money, rewardName: reward_name, rule_name: rule_name}
                        })(
                            <RewardCustomForm rewardTypeModule={rewardTypeModule} reward_type={k.reward_type} outerIndex={outerIndex} innerIndex={index} actions={actions} store={store}/>
                        )}
                    </FormItem>
                    <FormItem
                    >
                        {getFieldDecorator(`rewardProbabilityCustom-${innerUid}`, {
                            initialValue: { rewardProbability: probability }
                        })(
                            <ProbabilityForm rewardTypeModule={rewardTypeModule} outerIndex={outerIndex} innerIndex={index} actions={actions} store={store}/>
                            )}
                    </FormItem>
                    {rewardInnerArray.length > 1 && (
                        <Icon
                            className="dynamic-delete-button"
                            type="minus-circle-o"
                            disabled={rewardInnerArray.length === 1}
                            onClick={() => parentActions.innerRemove(outerIndex, index)}
                        />
                    )}
                    <div className="clear20"></div>
                </div>
            );
        });

        return (
            <Row>
                <Form layout="inline">
                    {formItems}
                </Form>
                {currentDialogType === rewardTypeModule && isOpenRewardDialog && <RewardRulesDialog rewardTypeModule={rewardTypeModule} actions={actions} store={store}/>}
            </Row>
        );
    }
}

const RewardFormInner = Form.create()(DynamicFieldSet);
export default RewardFormInner;



// 选择红包，加息券，现金，任务。。。选项
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
        const { store, actions, rewardTypeModule } = this.props;
        const { reward_times, reward_package } = store;
        let rewardOutArray = rewardTypeModule === 'times'? reward_times: reward_package;
        const k = `${outerIndex}-${innerIndex}`;
        
        if(e === "99" || e === "4" || e === "5" || e === "6") {
            let obj = rewardOutArray[outerIndex].rewardList[innerIndex];
            // 如果选择现金，积分，金币，谢谢惠顾，则清空后面的几项数据
            delete obj.probability;
            delete obj.reward_money;
            delete obj.reward_name;
            delete obj.rule_id;
            delete obj.rule_name;
            rewardOutArray[outerIndex].rewardList[innerIndex].reward_type = e;
            actions.handleChangeRewardArray(rewardOutArray, rewardTypeModule);
        } else {
            actions.handleToggleRewardDialog(true, e, k, rewardTypeModule);
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
                    <Option value="4">现金</Option>
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
        const { store, actions, rewardTypeModule } = this.props;
        const { reward_times, reward_package } = store;
        let rewardOutArray = rewardTypeModule === 'times'? reward_times: reward_package;
        const rewardProbability = parseInt(value);
        rewardOutArray[outerIndex].rewardList[innerIndex].probability = value;
        actions.handleChangeRewardArray(rewardOutArray, rewardTypeModule);
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