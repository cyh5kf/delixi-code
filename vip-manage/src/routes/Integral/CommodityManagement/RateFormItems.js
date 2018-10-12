import { Row, Col, Card, Form, Input, Select, Radio, Icon, Button, Dropdown, InputNumber, Upload } from 'antd';
import styles from './index.less';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;
const RadioGroup = Radio.Group;

const RateFormItems = (props) => {
    const { form, formItemLayout } = props;
    const { getFieldDecorator, getFieldValue } = form;

    return (
        <>
            <FormItem
                {...formItemLayout}
                label="加息券名称"
            >
                {getFieldDecorator('title', {
                    rules: [{
                        required: true, message: '请输入加息券名称',
                    }],
                })(
                    <Input placeholder="请输入加息券名称" />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="加息利率"
            >
                {getFieldDecorator('weight', {
                    rules: [{
                        required: true, message: '请输入加息利率',
                    }],
                })(
                    <InputNumber placeholder="请输入" min={0} />
                )}
                <span>%</span>
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="标的期限限制"
            >
                {getFieldDecorator('radio-group')(
                    <RadioGroup>
                        <Row type="flex" justify="start">
                            <Col>
                                <Radio className={styles.radioStyle} value="0">天标</Radio>
                            </Col>
                            {
                                getFieldValue('radio-group') === '0' && (
                                    <>
                                        <Col style={{marginRight: '10px'}}>
                                            <FormItem
                                            >
                                                {getFieldDecorator('compare', {
                                                    initialValue: "0",
                                                })(
                                                    <Select
                                                        style={{ width: 80 }}
                                                        showSearch={false}
                                                        placeholder="请输入"
                                                    >
                                                        <Option value="0">大于</Option>
                                                        <Option value="1">大于等于</Option>
                                                        <Option value="3">等于</Option>
                                                        <Option value="4">小于等于</Option>
                                                        <Option value="5">小于</Option>
                                                    </Select>
                                                )}
                                            </FormItem>
                                        </Col>
                                        <Col>
                                            <FormItem
                                            >
                                                {getFieldDecorator('tianbiao', {
                                                    rules: [{
                                                        required: true, message: '请输入天标',
                                                    }],
                                                })(
                                                    <InputNumber placeholder="请输入" />
                                                )}
                                                <span>天标可用</span>
                                            </FormItem>
                                        </Col>
                                    </>
                                )
                            }
                        </Row>
                        <Row type="flex" justify="start">
                            <Col>
                                <Radio className={styles.radioStyle} value="1">天标区间</Radio>
                            </Col>
                            {
                                getFieldValue('radio-group') === '1' && (
                                    <>
                                        <Col style={{marginRight: '10px'}}>
                                            <FormItem
                                            >
                                                {getFieldDecorator('tianbiaostart', {
                                                    rules: [{
                                                        required: true, message: '请输入天标',
                                                    }],
                                                })(
                                                    <InputNumber placeholder="请输入" />
                                                )}
                                                <span>天标至</span>
                                            </FormItem>
                                        </Col>
                                        <Col>
                                            <FormItem
                                            >
                                                {getFieldDecorator('tianbiaoend', {
                                                    rules: [{
                                                        required: true, message: '请输入天标',
                                                    }],
                                                })(
                                                    <InputNumber placeholder="请输入" />
                                                )}
                                                <span>天标可用</span>
                                            </FormItem>
                                        </Col>
                                    </>
                                )
                            }
                        </Row>
                        <Radio className={styles.radioStyle} value="2">无天数限制</Radio>
                    </RadioGroup>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="加息金额"
            >
                {getFieldDecorator('rate-money')(
                    <RadioGroup>
                        <Row type="flex" justify="start">
                            <Col>
                                <Radio className={styles.radioStyle} value="0">最多</Radio>
                            </Col>
                            {
                                getFieldValue('rate-money') === '0' && (
                                    <Col>
                                        <FormItem
                                        >
                                            {getFieldDecorator('max-money', {
                                                rules: [{
                                                    required: true, message: '请输入金额',
                                                }],
                                            })(
                                                <InputNumber placeholder="请输入" />
                                            )}
                                            <span>元</span>
                                        </FormItem>
                                    </Col>
                                )
                            }
                        </Row>
                        <Radio className={styles.radioStyle} value="1">不限金额</Radio>
                    </RadioGroup>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="加息天数"
            >
                {getFieldDecorator('rate-days')(
                    <RadioGroup>
                        <Row type="flex" justify="start">
                            <Col>
                                <Radio className={styles.radioStyle} value="0">最多</Radio>
                            </Col>
                            {
                                getFieldValue('rate-days') === '0' && (
                                    <Col>
                                        <FormItem
                                        >
                                            {getFieldDecorator('max-day', {
                                                rules: [{
                                                    required: true, message: '请输入金额',
                                                }],
                                            })(
                                                <InputNumber placeholder="请输入" />
                                            )}
                                            <span>天</span>
                                        </FormItem>
                                    </Col>
                                )
                            }
                        </Row>
                        <Radio className={styles.radioStyle} value="1">全程加息</Radio>
                    </RadioGroup>
                )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="加息券描述"
            >
              {getFieldDecorator('standard', {
                rules: [{
                  required: true, message: '请输入加息券描述',
                }],
              })(
                <TextArea style={{ minHeight: 32 }} placeholder="请输入加息券描述" rows={4} />
              )}
            </FormItem>
        </>
    );
};

export default RateFormItems;