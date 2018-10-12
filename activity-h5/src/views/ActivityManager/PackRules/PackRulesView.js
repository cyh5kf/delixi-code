import React from 'react';
import _ from 'underscore';
import moment from 'moment';
import classNames from 'classnames';
import { Form, Row, Col, Select, Switch, Card, Button, message, Spin, Checkbox, InputNumber, Radio } from 'antd';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;

import PacksForm from './PacksForm';
import BonusRewardForm from './BonusRewardForm';
import RewardTimesForm from './RewardTimesForm';
import RewardPackageForm from './RewardPackageForm';
import './PackRulesView.less';
import { getFormArray, getRewardArray } from 'utils/utils';

const format = 'HH:mm';

class TheForm extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    getOptions = (products) => {
        const children = [];
        for(let key in products){
            children.push(<Option key={key}>{products[key]}</Option>);
        }
        return children;
    }

    render() {
        const { store, actions } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { products, limitProductId } = store;
        const children = this.getOptions(products);

        return (
            <Form>
                <FormItem
                    hasFeedback
                >
                    {getFieldDecorator('limitProductId', {
                            initialValue: limitProductId
                        })(
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="请选择限投标的类型"
                        >
                            {
                                products? (
                                    children
                                ): null
                            }
                        </Select>
                        )}
                </FormItem>
            </Form>
        );
    }

}

const LimitProductForm = Form.create()(TheForm);

export default class PackRulesView extends React.Component {

    constructor(props) {
        super(props);
        this.state={
        }
    }

    // 是否开启额外奖励开关switch
    onChangeSwitch = (checked) => {
        const { actions } = this.props;
        actions.onChangeBonusSwitch(checked);
    }

    // 限投标的修改多选框
    onChangeCheckbox = (e, type) => {
        const { actions } = this.props;
        actions.onChangeLimit(e.target.checked, type);
    }

    // 修改任务礼包个数
    onChangeOpenNumber = (value) => {
        const { actions } = this.props;
        actions.onChangeOpenNumber(value);
    }

    // 修改奖励类型单选框值
    onChangeRwardType = (e) => {
        const { actions } = this.props;
        actions.onChangeRwardType(e.target.value);
    }

    // 礼包个数和开启条件表单提交
    handlePacksFormSubmit = () => {
        const packsForm = this.refs['packsForm'];
        const { actions } = this.props;
        packsForm.validateFieldsAndScroll((err, fieldsValue) => {
            if (err) {
                return;
            }
            const packsFormValue = getFormArray(fieldsValue);
            actions.handlePacksFormSubmit(packsFormValue);
            this.handleLimitProductFormSubmit();
        });
    }

    // 限投标的表单提交
    handleLimitProductFormSubmit = () => {
        const limitProductForm = this.refs['limitProductForm'];
        var { actions } = this.props;
        limitProductForm.validateFieldsAndScroll((err, fieldsValue) => {
            if (err) {
                return;
            }
            let limitProductIdStr = "";
            if(!fieldsValue.limitProductId) {
                limitProductIdStr = "";
            } else if (Array.isArray(fieldsValue.limitProductId)) {
                limitProductIdStr = fieldsValue.limitProductId.join(",");
            } else {
                limitProductIdStr = fieldsValue.limitProductId;
            }
            actions.handlelimitProductFormSubmit(limitProductIdStr);
            this.handleBonusRewardFormSubmit();
        });
    }

    // 额外奖励表单提交
    handleBonusRewardFormSubmit = () => {
        const bonusRewardForm = this.refs['bonusRewardForm'];
        const { actions, store } = this.props;
        
        const { bonus } = store.packsFormData;
        const switchStatus = bonus === "0"? false: true;
        if(switchStatus) {  // 如果额外奖励开关关闭，则额外奖励不传值，为空
            bonusRewardForm.validateFieldsAndScroll((err, bonusValue) => {
                if (err) {
                    return;
                }
                const bonusRewardFormValue = getFormArray(bonusValue);
                actions.handleBonusRewardFormSubmit(bonusRewardFormValue);
                this.handleRewardFormSubmit();
            });
        } else {
            actions.handleBonusRewardFormSubmit(null);
            this.handleRewardFormSubmit();
        }
        
    }

    // 奖励表单提交
    handleRewardFormSubmit = () => {
        const rewardTimesForm = this.refs['rewardTimesForm'].refs.rewardFormOuter.refs;
        const rewardPackageForm = this.refs['rewardPackageForm'].refs.rewardFormOuter.refs;
        const { actions, store } = this.props;
        const { reward_type } = store.packsFormData;
        let rewardFormValue = [];
        let timesError = false;
        let packageError = false;
        for(let i in rewardTimesForm) {
            rewardTimesForm[i].validateFieldsAndScroll((err, fieldsValue) => {
                if (err) {
                    timesError = true;
                    if(reward_type === "1") {
                        return false;
                    }
                    
                }
                const result = getRewardArray(fieldsValue, rewardFormValue, timesError);
                rewardFormValue = result.rewardFormValue;
                timesError = reward_type === "1"? result.isError: false; // 当奖励模块为根据次数时，需要校验根据次数的数据，而不需要校验根据礼包的数据
            });
        }
        for(let i in rewardPackageForm) {
            rewardPackageForm[i].validateFieldsAndScroll((err, fieldsValue) => {
                if (err) {
                    packageError = true;
                    if(reward_type === "2") {
                        return false;
                    }
                }
                const result = getRewardArray(fieldsValue, rewardFormValue, packageError);
                rewardFormValue = result.rewardFormValue;
                packageError = reward_type === "2"? result.isError: false; // 当奖励模块为根据次数时，需要校验根据礼包的数据，而不需要校验根据次数的数据
            });
        }
        if(!timesError && !packageError) {
            actions.handleRewardFormSubmit(rewardFormValue);
        } else {
            message.error("请注意填写奖励规则，奖励数值，奖励名称以及概率值，不能为空！");
        }
        
    }

    // 整个页面表单总的提交
    handleSubmit = (e) => {
        e.preventDefault();
        this.handlePacksFormSubmit();
    }

    render() {
        const {store, actions} = this.props;
        const { loading, packInfo, submitLoading, packsFormData } = store;
        const { bonus, limitNovice, limitTransfer, openNumber, reward_type } = packsFormData;
        const switchStatus = bonus === "0"? false: true;
        const limitNoviceChecked = limitNovice === "0"? false: true;
        const limitTransferChecked = limitTransfer === "0"? false: true;
        const rewardTimesStyle = classNames({
            'tabs-tabpane': true,
            'tabpane-active': reward_type === "1",
            'tabpane-inactive': reward_type !== "1"
        })
        const rewardPackageStyle = classNames({
            'tabs-tabpane': true,
            'tabpane-active': reward_type === "2",
            'tabpane-inactive': reward_type !== "2"
        })

        return (
            <div className="packRulesView">
                <Card loading={loading} >
                    <Spin tip="提交中..." spinning={submitLoading}>
                        <Row>
                            <Col style={{textAlign: 'right', paddingRight: '10px'}} span={2}>
                                任务礼包个数：
                            </Col>
                            <Col span={22}>
                                <InputNumber min={0} value={openNumber} onChange={this.onChangeOpenNumber} />
                            </Col>
                        </Row>
                        <div className="clear60"></div>
                        { packInfo && <PacksForm ref="packsForm" actions={actions} store={store} /> }
                        <div className="clear60"></div>
                        <Row>
                            <Col style={{textAlign: 'right', paddingRight: '10px'}} span={2}>
                                限投标的：
                            </Col>
                            <Col span={22}>
                                <LimitProductForm ref="limitProductForm" actions={actions} store={store} />
                            </Col>
                        </Row>
                        <div className="clear60"></div>
                        <Row>
                            <Col style={{textAlign: 'right', paddingRight: '10px'}} span={2}>
                                标的限制：
                            </Col>
                            <Col span={22}>
                                <Checkbox checked={limitNoviceChecked} onChange={(e) => {this.onChangeCheckbox(e, 'limitNovice')}}>新手标</Checkbox>
                                <Checkbox checked={limitTransferChecked} onChange={(e) => {this.onChangeCheckbox(e, 'limitTransfer')}}>债权转让</Checkbox>
                            </Col>
                        </Row>
                        <div className="clear60"></div>
                        <Row>
                            <Col style={{textAlign: 'right', paddingRight: '10px'}} span={2}>
                                额外奖励开关：
                            </Col>
                            <Col span={22}>
                                <Switch checked={switchStatus} onChange={this.onChangeSwitch} />
                                <div className="clear20"></div>
                                { packInfo && switchStatus && <BonusRewardForm ref="bonusRewardForm" actions={actions} store={store} /> }
                            </Col>
                        </Row>

                        <div className="clear60"></div>
                        <Row>
                            <Col style={{textAlign: 'right', paddingRight: '10px'}} span={2}>
                                奖励类型：
                            </Col>
                            <Col span={22}>
                                <RadioGroup onChange={this.onChangeRwardType} value={reward_type}>
                                    <Radio value="1">根据次数</Radio>
                                    <Radio value="2">根据礼包</Radio>
                                </RadioGroup>
                            </Col>
                        </Row>
                        
                        <div className="clear60"></div>
                        { packInfo && 
                            <div className="rewardContent" style={{marginLeft: reward_type === "1"? "0%": "-100%"}}>
                                <div className={rewardTimesStyle}>
                                    <RewardTimesForm ref="rewardTimesForm" actions={actions} store={store} />
                                </div>
                                <div className={rewardPackageStyle}>
                                    <RewardPackageForm ref="rewardPackageForm" actions={actions} store={store} />
                                </div>
                            </div>
                        }
                        
                        <div className="clear60"></div>
                        <div className="submitContent">
                            <Button type="primary" onClick={this.handleSubmit}  className="submitBtn" loading={submitLoading}>
                                保存
                            </Button>
                        </div>
                    </Spin>
                </Card>
            </div>
        );
    }
}