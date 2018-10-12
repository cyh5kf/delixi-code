import React from 'react';
import { Form, Row, Col, Input, message, Icon, Button, Select, TimePicker, InputNumber, DatePicker, Checkbox, Radio } from 'antd';
const RadioGroup = Radio.Group;
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
import '../ActivityListView.less';

const formatHM = 'HH:mm';
const formatYMD = 'YYYY-MM-DD HH:mm:ss';

class TheForm extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false
        }
    }

    getOptions = (products) => {
        const children = [];
        for(let key in products){
            children.push(<Option key={key}>{products[key]}</Option>);
        }
        return children;
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    // 限制天数校验，后面的天数必须大于前面的天数
    checkAround = (rule, value, callback) => {
        const form = this.props.form;
        const endValue = parseInt(value);
        const startValue = parseInt(form.getFieldValue('tenderStartDay'));
        if (endValue && endValue < startValue) {
            callback('后面的天数必须比前面的天数大');
        } else {
            callback();
        }
    }

    checkConfirm = (rule, value, callback, k) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['tenderEndDay'], { force: true });
        }
        callback();
    }

    // 修改发送奖励方式
    onChangeSendRewardType = (e) => {
        const { actions } = this.props;
        actions.onChangeSendRewardType(e.target.value);
    }

    render() {
        const { store, actions } = this.props;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const { rankInfo, products, rewardOutArray, send_reward_type } = store;
        let { type = "1", rank_type = "1", start_time = moment(new Date(), formatYMD), end_time = moment(new Date(), formatYMD), limit_novice = "0", limit_transfer = "0", limit_product_id, tender_start_day = 0, tender_end_day = 0, num }  = rankInfo.rules.base;
        const limitNoviceChecked = limit_novice === "0"? false: true;
        const limitTransferChecked = limit_transfer === "0"? false: true;
        limit_product_id = !limit_product_id? []: limit_product_id;
        const children = this.getOptions(products);
        if (rewardOutArray.length !== 0 && send_reward_type === "0") {
            num = rewardOutArray.length;
        }

        return (
            <Form layout="inline">
                <Row>
                    <Col style={{ marginTop: '6px', textAlign: 'right', paddingRight: '10px'}} span={2}>
                    排行榜类型：
                    </Col>
                    <Col span={22}>
                        <FormItem
                            hasFeedback
                        >
                            {getFieldDecorator('type', {
                                    initialValue: type
                                })(
                                <Select
                                    style={{ width: 150 }}
                                    placeholder="排行榜类型"
                                >
                                    <Option key="1">投资排行榜</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            hasFeedback
                        >
                            {getFieldDecorator('rankType', {
                                    initialValue: rank_type
                                })(
                                <Select
                                    style={{ width: 150 }}
                                    placeholder="排行榜类型"
                                >
                                    <Option key="1">每日投资统计</Option>
                                    <Option key="2">区间投资统计</Option>
                                </Select>
                            )}
                        </FormItem>
                        {
                            getFieldValue('rankType') === "2" ? (
                                <FormItem
                                    hasFeedback
                                    label="开启时段："
                                >
                                    {getFieldDecorator('startTime', {
                                        initialValue: moment(start_time, formatYMD),
                                        validateTrigger: ['onChange'],
                                        rules: [{ required: true, message: '请输入开始时间!' }]
                                    })(
                                        <DatePicker style={{ width: 200 }} showTime format={formatYMD} />
                                    )}
                                </FormItem>
                            ) : null
                        }
                        {
                            getFieldValue('rankType') === "2" ? (
                                <FormItem
                                    label="至："
                                    hasFeedback
                                >
                                    {getFieldDecorator('endTime', {
                                        initialValue: moment(end_time, formatYMD),
                                        validateTrigger: ['onChange'],
                                        rules: [{ required: true, message: '请输入结束时间!' }]
                                    })(
                                        <DatePicker style={{ width: 200 }} showTime format={formatYMD} />
                                    )}
                                </FormItem>
                            ) : null
                        }
                    </Col>
                </Row>

                <div className="clear20"></div>

                <Row>
                    <Col style={{marginTop: '6px', textAlign: 'right', paddingRight: '10px'}} span={2}>
                    排行榜统计人数：
                    </Col>
                    <Col span={22}>
                        <FormItem
                            hasFeedback
                        >
                            {getFieldDecorator('num', {
                                initialValue: num
                            })(
                                <InputNumber min={0} disabled={send_reward_type === "0"} />
                            )}
                        </FormItem>
                    </Col>
                </Row>

                <div className="clear20"></div>

                <Row>
                    <Col style={{marginTop: '6px', textAlign: 'right', paddingRight: '10px'}} span={2}>
                    限投标的：
                    </Col>
                    <Col span={22}>
                        <FormItem
                        >
                            {getFieldDecorator('limitProductId', {
                                    initialValue: limit_product_id
                                })(
                                <Select
                                    mode="multiple"
                                    style={{ width: '300px' }}
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
                    </Col>
                </Row>

                <div className="clear20"></div>

                <Row>
                    <Col style={{marginTop: '6px', textAlign: 'right', paddingRight: '10px'}} span={2}>
                    标的限制：
                    </Col>
                    <Col span={22}>
                        <FormItem
                        >
                            {getFieldDecorator('limitNovice', {
                                valuePropName: 'checked',
                                initialValue: limitNoviceChecked
                            })(
                                <Checkbox >新手标</Checkbox>
                            )}
                        </FormItem>
                    </Col>
                </Row>

                <div className="clear20"></div>

                <Row>
                    <Col style={{marginTop: '6px', textAlign: 'right', paddingRight: '10px'}} span={2}>
                    区间限制：
                    </Col>
                    <Col span={22}>
                        <FormItem
                        >
                            {getFieldDecorator(`tenderStartDay`, {
                                initialValue: parseInt(tender_start_day),
                                validateTrigger: ['onChange', 'onBlur'],
                                rules: [{
                                        required: true, message: '请输入开始天数!' 
                                    }, {
                                        validator: (rule, value, callback) => this.checkConfirm(rule, value, callback)
                                    }]
                            })(
                                <InputNumber min={0} />
                                )}
                            <span className="ant-form-text"> 天</span>
                            <span className="width10"></span>
                            <span className="ant-form-text">至 </span>
                        </FormItem>
                        <FormItem
                        >
                            {getFieldDecorator(`tenderEndDay`, {
                                initialValue: parseInt(tender_end_day),
                                validateTrigger: ['onChange', 'onBlur'],
                                rules: [{ 
                                    required: true, message: '请输入结束天数!'
                                }, {
                                    validator: (rule, value, callback) => this.checkAround(rule, value, callback)
                                }]
                            })(
                                <InputNumber min={0}  onBlur={this.handleConfirmBlur} />
                                )}
                            <span className="ant-form-text"> 天</span>
                            
                        </FormItem>
                    </Col>
                </Row>

                <div className="clear20"></div>

                <Row>
                    <Col style={{marginTop: '6px', textAlign: 'right', paddingRight: '10px'}} span={2}>
                    奖励发放方式：
                    </Col>
                    <Col span={22}>
                        <FormItem
                        >
                            {getFieldDecorator('send_reward_type', {
                                initialValue: send_reward_type
                            })(
                                <RadioGroup onChange={this.onChangeSendRewardType}>
                                    <Radio value="0">线上发放</Radio>
                                    <Radio value="1">线下发放</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                
            </Form>
        );
    }

}

const RankTopForm = Form.create()(TheForm);
export default RankTopForm;