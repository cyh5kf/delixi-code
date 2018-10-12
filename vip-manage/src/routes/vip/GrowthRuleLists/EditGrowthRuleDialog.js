/**
 * Created by wy on 2018/3/1 0001.
 */

import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message } from 'antd';
import {Fragment} from 'react';
const FormItem = Form.Item;
const Option = Select.Option;

const EditGrowthRuleDialog = Form.create({
    mapPropsToFields(props) {
        return {
            name: Form.createFormField({
                ...props.name,
                value: props.name.value,
            }),
            value:Form.createFormField({
                ...props.value,
                value: props.value.value,
            }),
            status:Form.createFormField({
                ...props.status,
                value: props.status.value,
            }),
            time_limit:Form.createFormField({
            ...props.time_limit,
            value: props.time_limit.value,
        }),
        };
    },
})((props) => {
    const { modalVisible, form, handleAdd, handleModalVisible,name={value:''} } = props;
    const okHandle = () => {
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            handleAdd(fieldsValue);
        });
    };

    const { getFieldDecorator } = form;

    return (
        <Modal
            title={`${name?'编辑':'添加'}会员成长值规则`}
            visible={modalVisible}
            onOk={okHandle}
            onCancel={() => handleModalVisible(null,false)}
            okText="保存"
        >
            <FormItem label="规则名称"
                      labelCol={{ span: 5 }}
                      wrapperCol={{ span: 10 }}>
                {getFieldDecorator('name',{
                    rules: [
                        {required:true, message: `规则名称不能为空`},
                    ],
                })(
                    <Input disabled={name.value?true:false} placeholder="请输入规则名称"/>
                )}
            </FormItem>
            <Row gutter={{md: 24, lg: 24, xl: 24}}>
                <Col md={12} sm={12}>
                    <FormItem label="兑换比例"
                              labelCol={{ span: 10 }}
                              wrapperCol={{ span: 14 }}>
                        {getFieldDecorator('rateStart')(
                            <Input disabled placeholder="1"/>
                        )}
                    </FormItem>
                </Col>

                <Col md={11} sm={11}>
                    <FormItem label="比"
                              colon={false}
                              labelCol={{ span: 6 }}
                              wrapperCol={{ span: 18 }}>
                        {getFieldDecorator('value',{
                            rules: [
                                {
                                    required:true,
                                    message: `兑换比例不能为空`
                                },
                            ],
                        })(
                            <InputNumber placeholder="1" precision='2'/>
                        )}
                    </FormItem>
                </Col>
            </Row>
            <FormItem label="状态"
                      labelCol={{ span: 5 }}
                      wrapperCol={{ span: 15 }}>
                {getFieldDecorator('status', {
                    initialValue: "1",
                })(
                    <Select
                        style={{ width: 120 }}
                        showSearch={false}
                        disabled={name.value?true:false}
                    >
                        <Option key={'启用'} value={'1'}>启用</Option>
                        <Option key={'停用'} value={'2'}>停用</Option>
                    </Select>
                )}
            </FormItem>
            <FormItem label="限制次数"
                      labelCol={{ span: 5 }}
                      wrapperCol={{ span: 10 }}>
                {getFieldDecorator('time_limit',{
                    rules: [
                        {required:true, message: `限制次数不能为空`},
                    ],
                })(
                    <Input  placeholder="请输入限制次数"/>
                )}
            </FormItem>
        </Modal>
    );
});

export default EditGrowthRuleDialog;