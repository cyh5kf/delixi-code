import React from 'react';
import { Form, Row, Col, Input, message, Icon, Button, Select, TimePicker, InputNumber } from 'antd';
import moment from 'moment';
const FormItem = Form.Item;
import '../ActivityListView.less';

let uuid = 1;
const format = 'HH:mm';
class DynamicFieldSet extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            packsArray: [], // 拆礼包数据
            confirmDirty: false
        }
    }

    componentDidMount() {
        const { packInfo } = this.props.store;
        let { packsArray } = this.state;
        let packsList = packInfo ? packInfo.rules.packs : [];
        if (packInfo && packsList.length !== 0) { //如果列表存在数据
            uuid = 0;
            for (let item of packsList) {
                uuid++;
                item.keys = uuid;
            }
            this.setState({ packsArray: packsList });
        } else {
            packsArray = packsArray.concat({keys: uuid});
            this.setState({ packsArray });
        }
    }

    // 删除一行
    remove = (k, index) => {
        let { packsArray } = this.state;
        const { store, actions } = this.props;
        let { reward_package } = store;
        if (packsArray.length === 1) {
            return;
        }
        if (reward_package.length === 1) {
            return;
        }
        reward_package.splice(index, 1);
        packsArray = packsArray.filter(key => key.keys !== k)
        this.setState({ packsArray });
        actions.handleChangeRewardArray(reward_package, 'package'); 
    }

    // 添加一行
    add = () => {
        uuid++;
        let { packsArray } = this.state;
        const { store, actions } = this.props;
        let { reward_package } = store;
        reward_package.push({rewardList:[{}]});
        packsArray = packsArray.concat({keys: uuid});
        this.setState({ packsArray });
        actions.handleChangeRewardArray(reward_package, 'package');
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    // 限制天数校验，后面的天数必须大于前面的天数
    checkAround = (rule, value, callback, k) => {
        const form = this.props.form;
        const endValue = parseInt(value);
        const startValue = parseInt(form.getFieldValue(`tenderStartDay-${k}`));
        if (endValue && endValue < startValue) {
            callback('后面的天数必须比前面的天数大');
        } else {
            callback();
        }
    }

    checkConfirm = (rule, value, callback, k) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields([`tenderEndDay-${k}`], { force: true });
        }
        callback();
    }

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const { store, actions } = this.props;
        const { isSubmitForm } = store;
        const { packsArray } = this.state;
        
        const formItems = packsArray.map((k, index) => {
            
            const { id = "新建", activityPackRuleBetweenTime = 1, start_time = moment("0", format), end_time = moment("0", format), activation_mode = "1", tender_amount = 0, tender_start_day = 0, tender_end_day = 0 } = k;
            
            return (
                <div key={k.keys}>
                    <FormItem
                    >
                        {getFieldDecorator(`activityPackRuleId-${k.keys}`, {
                            initialValue: id === '新建'? `新建-${index}`: id
                        })(
                            <Input style={{ width: 100 }} disabled={true} />
                            )}
                    </FormItem>
                    <FormItem
                        hasFeedback
                    >
                        {getFieldDecorator(`activityPackRuleBetweenTime-${k.keys}`,
                            { initialValue: activityPackRuleBetweenTime.toString(), validateTrigger: ['onChange'], })(
                            <Select
                                style={{ width: 120 }}
                                showSearch={false}
                                placeholder="时间段限制"
                            >
                                <Select.Option value="0">不限时段</Select.Option>
                                <Select.Option value="1">固定时段</Select.Option>
                            </Select>
                            )}
                    </FormItem>
                    {
                        getFieldValue(`activityPackRuleBetweenTime-${k.keys}`) === "1" ? (
                            <FormItem
                                hasFeedback
                            >
                                {getFieldDecorator(`startTime-${k.keys}`, {
                                    initialValue: moment(start_time, format),
                                    validateTrigger: ['onChange'],
                                    rules: [{ required: true, message: '请输入开始时间!' }]
                                })(
                                    <TimePicker format={format} style={{ width: 120 }} />
                                )}
                            </FormItem>
                        ) : null
                    }
                    {
                        getFieldValue(`activityPackRuleBetweenTime-${k.keys}`) === "1" ? (
                            <FormItem
                                label="至："
                                hasFeedback
                            >
                                {getFieldDecorator(`endTime-${k.keys}`, {
                                    initialValue: moment(end_time, format),
                                    validateTrigger: ['onChange'],
                                    rules: [{ required: true, message: '请输入结束时间!' }]
                                })(
                                    <TimePicker format={format} style={{ width: 120 }} />
                                )}
                            </FormItem>
                        ) : null
                    }

                    <FormItem
                    >
                        {getFieldDecorator(`activationMode-${k.keys}`, { initialValue: activation_mode, validateTrigger: ['onChange'], })(
                            <Select
                                style={{ width: 100 }}
                                showSearch={false}
                                placeholder="投资类型"
                            >
                                <Select.Option value="0">不限</Select.Option>
                                <Select.Option value="1">单笔投资</Select.Option>
                            </Select>
                        )}
                    </FormItem>
                    {
                        getFieldValue(`activationMode-${k.keys}`) === "1" ? (
                            <FormItem
                            >
                                {getFieldDecorator(`tenderAmount-${k.keys}`, {
                                    initialValue: parseInt(tender_amount),
                                    validateTrigger: ['onChange', 'onBlur'],
                                    rules: [{ required: true, message: '请输入投资金额!' }]
                                })(
                                    <InputNumber min={0} />
                                    )}
                            </FormItem>
                        ): null
                    }
                    {
                        getFieldValue(`activationMode-${k.keys}`) === "1" ? (
                            <FormItem
                            >
                                {getFieldDecorator(`tenderStartDay-${k.keys}`, {
                                    initialValue: parseInt(tender_start_day),
                                    validateTrigger: ['onChange', 'onBlur'],
                                    rules: [{
                                            required: true, message: '请输入开始天数!' 
                                        }, {
                                            validator: (rule, value, callback) => this.checkConfirm(rule, value, callback, k.keys)
                                        }]
                                })(
                                    <InputNumber min={0} />
                                    )}
                                <span className="ant-form-text"> 天</span>
                                <span className="width10"></span>
                                <span className="ant-form-text">至 </span>
                            </FormItem>
                        ): null
                    }
                    {
                        getFieldValue(`activationMode-${k.keys}`) === "1" ? (
                            <FormItem
                            >
                                {getFieldDecorator(`tenderEndDay-${k.keys}`, {
                                    initialValue: parseInt(tender_end_day),
                                    validateTrigger: ['onChange', 'onBlur'],
                                    rules: [{ 
                                        required: true, message: '请输入结束天数!'
                                    }, {
                                        validator: (rule, value, callback) => this.checkAround(rule, value, callback, k.keys)
                                    }]
                                })(
                                    <InputNumber min={0}  onBlur={this.handleConfirmBlur} />
                                    )}
                                <span className="ant-form-text"> 天</span>
                                
                            </FormItem>
                        ): null
                    }
                    {packsArray.length > 1 ? (
                        <Icon
                            className="dynamic-delete-button"
                            type="minus-circle-o"
                            disabled={packsArray.length === 1}
                            onClick={() => this.remove(k.keys, index)}
                        />
                    ) : null}
                    <div className="clear20"></div>
                </div>
            );
        });
        return (
            <Row>
                <Col span={2}>
                    礼包个数和开启条件：
                </Col>
                <Col span={22}>
                    <Form layout="inline">
                        <div>
                            <span style={{display: 'inline-block', width: '100px', textAlign: 'center'}}>礼包编号</span>
                            <span style={{display: 'inline-block', width: '440px', textAlign: 'center'}}>开启时段</span>
                            <span style={{display: 'inline-block', width: '100px', textAlign: 'center'}}>开启条件</span>
                            <span style={{display: 'inline-block', width: '100px', textAlign: 'center'}}>投资金额</span>
                            <span style={{display: 'inline-block', width: '300px', textAlign: 'center'}}>期限限制</span>
                        </div>
                        <div className="clear20"></div>
                        {formItems}
                        <FormItem>
                            <Button type="dashed" onClick={this.add} style={{ width: '140px' }}>
                                <Icon type="plus" /> 添加表单
                            </Button>
                        </FormItem>
                    </Form>
                </Col>
            </Row>
        );
    }
}

const PacksForm = Form.create()(DynamicFieldSet);
export default PacksForm;